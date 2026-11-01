/* Line Fortier Coiffure : interface (menu, onglets, avis, statut, formulaire).
   La scène 3D est dans salon.js ; les deux se parlent par des événements « lf:… ». */
(function () {
  const doc = document.documentElement, body = document.body;
  const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('annee').textContent = new Date().getFullYear();

  /* ---------- Titres qui remplissent la largeur (standard Quais 4 Saisons) ---------- */
  function ajusterTitres() {
    document.querySelectorAll('.ajuste').forEach(el => {
      const W = el.parentElement.clientWidth; if (!W) return;
      el.style.fontSize = ''; el.style.fontStretch = '62%'; el.style.display = 'inline-block';
      if (el.scrollWidth > W) { const fs = parseFloat(getComputedStyle(el).fontSize); el.style.fontSize = (fs * W / el.scrollWidth * .98).toFixed(1) + 'px'; }
      let lo = 62, hi = 125; el.style.fontStretch = '125%';
      if (el.scrollWidth > W) { for (let k = 0; k < 9; k++) { const m = (lo + hi) / 2; el.style.fontStretch = m + '%'; if (el.scrollWidth > W) hi = m; else lo = m; } el.style.fontStretch = (lo * .99).toFixed(1) + '%'; }
      el.style.display = '';
    });
  }
  ajusterTitres(); addEventListener('resize', ajusterTitres);
  if (document.fonts) {
    document.fonts.load('900 64px Archivo').then(ajusterTitres, () => {});
    document.fonts.ready.then(ajusterTitres);
    document.fonts.addEventListener && document.fonts.addEventListener('loadingdone', ajusterTitres);
  }
  // filet de sécurité : la police peut arriver après le premier calcul (chargement lent, 3D lourde)
  addEventListener('load', ajusterTitres); [400, 1200, 3000].forEach(t => setTimeout(ajusterTitres, t));

  /* ---------- Apparition des panneaux ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vu'); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll('.panneau').forEach(p => io.observe(p));

  /* ---------- Rubrique active, progression, barre mobile ---------- */
  const liens = [...document.querySelectorAll('.menu a, .menu-mobile nav a')];
  const etapes = [...document.querySelectorAll('[data-arret]')];
  const sp = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    liens.forEach(a => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + e.target.id)));
  }), { rootMargin: '-45% 0px -50% 0px' });
  etapes.forEach(s => sp.observe(s));

  const prog = document.getElementById('progression'), barreMobile = document.getElementById('barre-mobile');
  const methode = document.querySelector('.methode');
  let planifie = false;
  function surDefilement() {
    planifie = false;
    const max = doc.scrollHeight - innerHeight;
    prog.style.setProperty('--p', max > 0 ? (scrollY / max).toFixed(4) : 0);
    barreMobile.classList.toggle('visible', scrollY > innerHeight * .8);
    if (methode) {
      const r = methode.getBoundingClientRect();
      const k = Math.min(1, Math.max(0, (innerHeight * .8 - r.top) / (r.height + innerHeight * .3)));
      methode.style.setProperty('--remplir', reduit ? 1 : k.toFixed(3));
    }
  }
  addEventListener('scroll', () => { if (!planifie) { planifie = true; requestAnimationFrame(surDefilement); } }, { passive: true });
  surDefilement();

  /* ---------- Menu mobile ---------- */
  const burger = document.getElementById('burger'), menuMobile = document.getElementById('menu-mobile');
  function menu(ouvert) {
    burger.setAttribute('aria-expanded', String(ouvert));
    burger.querySelector('.sr').textContent = ouvert ? 'Fermer le menu' : 'Ouvrir le menu';
    menuMobile.hidden = !ouvert; body.style.overflow = ouvert ? 'hidden' : '';
  }
  burger.addEventListener('click', () => menu(burger.getAttribute('aria-expanded') !== 'true'));
  menuMobile.addEventListener('click', e => { if (e.target.closest('a')) menu(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !menuMobile.hidden) { menu(false); burger.focus(); } });

  /* ---------- Onglets Elle / Lui (+ points sur les chaises) ---------- */
  const onglets = [...document.querySelectorAll('[role="tab"]')];
  const points = [...document.querySelectorAll('.point')];
  function choisir(nom, focus) {
    onglets.forEach(o => {
      const oui = o.dataset.onglet === nom;
      o.setAttribute('aria-selected', String(oui)); o.tabIndex = oui ? 0 : -1;
      document.getElementById(o.getAttribute('aria-controls')).hidden = !oui;
      if (oui && focus) o.focus();
    });
    points.forEach(p => p.setAttribute('aria-pressed', String(p.dataset.onglet === nom)));
    window.dispatchEvent(new CustomEvent('lf:onglet', { detail: nom }));
  }
  onglets.forEach((o, i) => {
    o.addEventListener('click', () => choisir(o.dataset.onglet));
    o.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault(); choisir(onglets[(i + (e.key === 'ArrowRight' ? 1 : onglets.length - 1)) % onglets.length].dataset.onglet, true);
    });
  });
  points.forEach(p => p.addEventListener('click', () => choisir(p.dataset.onglet)));
  choisir('elle');

  /* ---------- Compteurs ---------- */
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; cio.unobserve(e.target);
    const el = e.target, fin = +el.dataset.compte; if (reduit) return;
    const t0 = performance.now();
    (function pas(t) { const k = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(fin * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(pas); })(t0);
  }), { threshold: .6 });
  document.querySelectorAll('[data-compte]').forEach(el => cio.observe(el));

  /* ---------- Avis Google : texte exact seulement (À REMPLIR) ----------
     Exemple : { texte: "…", nom: "Prénom N." } — jamais d'avis inventé. */
  const AVIS = [];
  (function () {
    const zone = document.getElementById('carrousel'); if (!AVIS.length) return;
    zone.hidden = false;
    const piste = document.getElementById('piste'), nav = document.getElementById('points-nav');
    AVIS.forEach((a, i) => {
      const art = document.createElement('article'); art.className = 'avis-carte';
      art.setAttribute('role', 'group'); art.setAttribute('aria-label', `Avis ${i + 1} sur ${AVIS.length}`);
      const p = document.createElement('p'); p.textContent = a.texte;
      const qui = document.createElement('p'); qui.className = 'qui';
      const ini = document.createElement('span'); ini.className = 'initiale'; ini.textContent = a.nom.charAt(0);
      const n = document.createElement('span'); n.textContent = a.nom;
      const s = document.createElement('small'); s.textContent = 'Avis Google'; n.appendChild(s);
      qui.append(ini, n); art.append(p, qui); piste.appendChild(art);
    });
    const pages = AVIS.length; let page = 0, auto = null, touche = false;
    for (let i = 0; i < pages; i++) { const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Avis ' + (i + 1)); b.addEventListener('click', () => { arreter(); aller(i); }); nav.appendChild(b); }
    function aller(i) { page = (i + pages) % pages; piste.scrollTo({ left: piste.clientWidth * page, behavior: reduit ? 'auto' : 'smooth' }); maj(); }
    function maj() { [...nav.children].forEach((b, k) => b.setAttribute('aria-current', String(k === page))); }
    function arreter() { touche = true; clearInterval(auto); }
    document.getElementById('avis-prec').addEventListener('click', () => { arreter(); aller(page - 1); });
    document.getElementById('avis-suiv').addEventListener('click', () => { arreter(); aller(page + 1); });
    piste.addEventListener('scroll', () => { page = Math.round(piste.scrollLeft / piste.clientWidth); maj(); }, { passive: true });
    if (pages < 2) zone.querySelector('.carrousel-nav').hidden = true;
    else if (!reduit) {
      auto = setInterval(() => { if (!touche) aller(page + 1); }, 6000);
      ['pointerenter', 'focusin'].forEach(ev => zone.addEventListener(ev, () => clearInterval(auto)));
      ['pointerleave', 'focusout'].forEach(ev => zone.addEventListener(ev, () => { if (!touche) { clearInterval(auto); auto = setInterval(() => aller(page + 1), 6000); } }));
      piste.addEventListener('pointerdown', arreter);
    }
    maj();
  })();

  /* ---------- Statut ouvert / fermé (À REMPLIR : heures du salon) ----------
     Format : jour (0 = dimanche) -> [ouverture, fermeture] en heures décimales, ou null. */
  const HEURES = null; // ex. { 2: [9, 17], 3: [9, 20], ... }
  (function () {
    if (!HEURES) return;
    const parts = new Intl.DateTimeFormat('fr-CA', { timeZone: 'America/Toronto', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
    const jours = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
    const j = jours.indexOf(parts.find(p => p.type === 'weekday').value);
    const h = +parts.find(p => p.type === 'hour').value + parts.find(p => p.type === 'minute').value / 60;
    const plage = HEURES[j], ouvert = plage && h >= plage[0] && h < plage[1];
    const fmt = x => Math.floor(x) + ' h' + (x % 1 ? String(Math.round(x % 1 * 60)).padStart(2, '0') : '');
    document.getElementById('statut').classList.toggle('ouvert', !!ouvert);
    document.getElementById('statut-texte').textContent = ouvert ? `Ouvert maintenant · jusqu'à ${fmt(plage[1])}` : 'Fermé · laissez un message';
  })();

  /* ---------- Boutons qui présélectionnent le service ---------- */
  document.querySelectorAll('[data-type]').forEach(b => b.addEventListener('click', () => {
    const r = document.querySelector(`.types input[value="${b.dataset.type}"]`); if (r) r.checked = true;
  }));

  /* ---------- Copier l'adresse ---------- */
  document.querySelectorAll('.copier').forEach(b => b.addEventListener('click', () => {
    const el = document.getElementById(b.dataset.copie);
    const ok = () => { b.textContent = 'Copié'; setTimeout(() => b.textContent = 'Copier', 1400); };
    if (navigator.clipboard) navigator.clipboard.writeText(el.textContent).then(ok, () => {});
  }));

  /* ---------- Politique (Loi 25) ---------- */
  const dlg = document.getElementById('politique');
  document.querySelectorAll('[data-politique]').forEach(b => b.addEventListener('click', () => dlg.showModal()));

  /* ---------- Formulaire : /api/rappel (Worker) ; sans Turnstile = aperçu ---------- */
  const form = document.getElementById('formulaire'), msg = document.getElementById('message');
  const bouton = form.querySelector('[type="submit"]');
  const nomEl = document.getElementById('f-nom'), telEl = document.getElementById('f-tel');
  function dire(t, erreur) { msg.hidden = false; msg.textContent = t; msg.classList.toggle('erreur', !!erreur); }
  [nomEl, telEl].forEach(el => el.addEventListener('input', () => el.removeAttribute('aria-invalid')));
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (document.getElementById('f-site').value) return;
    const nom = nomEl.value.trim(), tel = telEl.value.trim(), telOk = tel.replace(/\D/g, '').length >= 10;
    if (!nom) nomEl.setAttribute('aria-invalid', 'true');
    if (!telOk) telEl.setAttribute('aria-invalid', 'true');
    if (!nom || !telOk) { dire(!nom ? 'Écrivez votre nom pour que le salon sache qui rappeler.' : 'Le numéro doit avoir 10 chiffres, par exemple 450 555-1234.', true); (!nom ? nomEl : telEl).focus(); return; }
    if (!document.querySelector('.cf-turnstile')) { dire(`Merci ${nom}. Sur le site en ligne, le salon recevrait votre demande et vous rappellerait au ${tel}. (Aperçu : rien n'a été envoyé.)`); return; }
    bouton.disabled = true; bouton.textContent = 'Envoi en cours…';
    try {
      const r = await fetch('/api/rappel', { method: 'POST', body: new FormData(form) });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.ok) { dire(`Merci ${nom}. Le salon vous rappellera au ${tel}.`); form.reset(); }
      else dire(d.message || "La demande n'est pas partie. Appelez le salon au 450 429-2222.", true);
    } catch (err) { dire("La demande n'est pas partie. Appelez le salon au 450 429-2222.", true); }
    finally { bouton.disabled = false; bouton.textContent = 'Demander un rappel'; if (window.turnstile) window.turnstile.reset(); }
  });
})();
