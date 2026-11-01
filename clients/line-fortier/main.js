/* Line Fortier Coiffure Elle & Lui : couverture, en-tête courant, formulaire. */
(function () {
  const body = document.body;
  document.getElementById('annee').textContent = new Date().getFullYear();

  /* La couverture s'assemble même si la 3D ne démarre pas */
  setTimeout(() => body.classList.add('pret'), 1600);

  /* Pastille : étoile à 24 pointes */
  (function () {
    const n = 24, R = 99, r = 89, pts = [];
    for (let i = 0; i < n * 2; i++) {
      const a = (Math.PI / n) * i - Math.PI / 2, rr = i % 2 ? r : R;
      pts.push((100 + rr * Math.cos(a)).toFixed(1) + ' ' + (100 + rr * Math.sin(a)).toFixed(1));
    }
    document.getElementById('etoile').setAttribute('d', 'M' + pts.join('L') + 'Z');
  })();

  /* Code-barres décoratif de l'encadré prix (tiré du numéro de téléphone) */
  (function () {
    const svg = document.querySelector('.codebarre'); if (!svg) return;
    const chiffres = '4504292222749'.split('').map(Number);
    let x = 0, out = '';
    const barre = w => { out += `<rect x="${x}" y="0" width="${w}" height="40"/>`; x += w; };
    barre(1.5); x += 1.5; barre(1.5); x += 2;
    chiffres.forEach((c, i) => { barre(1 + (c % 3) * .8); x += 1.2 + ((c + i) % 4) * .7; barre(1 + ((c * 7) % 3) * .6); x += 1.4; });
    x += 1; barre(1.5); x += 1.5; barre(1.5);
    svg.setAttribute('viewBox', `0 0 ${x.toFixed(1)} 40`);
    svg.innerHTML = out;
  })();

  /* Services : la couverture répond dans la pastille ; chaise.js fait tourner la chaise */
  const SERVICES = [
    { nom: 'Coupes femme', lignes: [['Coupe et brushing', '45 min'], ['Mise en plis', '30 min']] },
    { nom: 'Couleur', lignes: [['Coloration', '1 h 30'], ['Mèches, balayage', '2 h']] },
    { nom: 'Coupes homme', lignes: [['Aux ciseaux', '30 min'], ['Jeunesse', '25 min']] },
    { nom: 'Dégradés', lignes: [['Low, mid ou skin', '40 min'], ['Contour et nuque', '15 min']] },
  ];
  const boutons = [...document.querySelectorAll('.titre-couv')];
  const pastille = document.getElementById('pastille-texte');
  const defaut = pastille.innerHTML;
  let actif = -1;
  function choisir(i) {
    actif = actif === i ? -1 : i;
    boutons.forEach((b, k) => b.setAttribute('aria-pressed', String(k === actif)));
    if (actif < 0) pastille.innerHTML = defaut;
    else {
      const s = SERVICES[actif];
      pastille.innerHTML = `<span class="p-service">${s.nom}</span>` + s.lignes.map(([q, d]) => `<span class="p-ligne">${q}<b>${d}</b></span>`).join('');
    }
    pastille.style.animation = 'none'; void pastille.offsetWidth; pastille.style.animation = '';
    window.dispatchEvent(new CustomEvent('lf:service', { detail: actif }));
  }
  boutons.forEach((b, i) => b.addEventListener('click', () => choisir(i)));

  /* En-tête courant : visible après la couverture ; rubrique active */
  const entete = document.getElementById('entete');
  const couverture = document.getElementById('couverture');
  new IntersectionObserver(([e]) => {
    entete.classList.toggle('visible', !e.isIntersecting);
  }, { threshold: 0, rootMargin: '-64px 0px 0px 0px' }).observe(couverture);
  const liens = [...document.querySelectorAll('.entete-nav a')];
  const rubriques = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) liens.forEach(a => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + e.target.id)));
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['dossier', 'portrait', 'courrier', 'carte'].forEach(id => rubriques.observe(document.getElementById(id)));

  /* Carte-réponse : envoi à /api/rappel ; sans Turnstile (aperçu), rien n'est envoyé */
  const form = document.getElementById('formulaire');
  const msg = document.getElementById('message');
  const bouton = form.querySelector('.envoyer');
  const nomEl = document.getElementById('f-nom'), telEl = document.getElementById('f-tel');
  function dire(t, erreur) { msg.hidden = false; msg.textContent = t; msg.classList.toggle('erreur', !!erreur); }
  [nomEl, telEl].forEach(el => el.addEventListener('input', () => el.removeAttribute('aria-invalid')));
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (document.getElementById('f-site').value) return;
    const nom = nomEl.value.trim(), tel = telEl.value.trim();
    const telOk = tel.replace(/\D/g, '').length >= 10;
    if (!nom) nomEl.setAttribute('aria-invalid', 'true');
    if (!telOk) telEl.setAttribute('aria-invalid', 'true');
    if (!nom || !telOk) {
      dire(!nom ? 'Écrivez votre nom pour que le salon sache qui rappeler.' : 'Le numéro doit avoir 10 chiffres, par exemple 450 555-1234.', true);
      (!nom ? nomEl : telEl).focus();
      return;
    }
    if (!document.querySelector('.cf-turnstile')) {
      dire(`Merci ${nom}. Sur le site en ligne, le salon recevrait votre demande et vous rappellerait au ${tel}. (Aperçu : rien n'a été envoyé.)`);
      return;
    }
    bouton.disabled = true; bouton.textContent = 'Envoi en cours…';
    try {
      const r = await fetch('/api/rappel', { method: 'POST', body: new FormData(form) });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.ok) { dire(`Merci ${nom}. Le salon vous rappellera au ${tel}.`); form.reset(); }
      else dire(d.message || "La demande n'est pas partie. Appelez le salon au 450 429-2222.", true);
    } catch (err) {
      dire("La demande n'est pas partie. Appelez le salon au 450 429-2222.", true);
    } finally {
      bouton.disabled = false; bouton.textContent = 'Demander un rappel';
      if (window.turnstile) window.turnstile.reset();
    }
  });
})();
