/* Line Fortier Coiffure Elle & Lui · le héros qui descend vers la chaise, et le reste de la page. */
(() => {
  'use strict';
  const VIDEO_URL = 'assets/hero-scrub.mp4';
  const VIDEO_BYTES = 2680765; // taille réelle de assets/hero-scrub.mp4
  const POSTER_URL = 'assets/hero-poster.jpg';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const smoothstep = (p, e0, e1) => { const t = clamp((p - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
  const rng = seed => { let s = seed >>> 0; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; };

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Découpage des titres en mots et lettres (une seule fois) ---------- */
  $$('.split[data-text]').forEach((el, n) => {
    const r = rng(7 + n * 31), words = el.dataset.text.split(' ');
    const total = el.dataset.text.replace(/ /g, '').length; let ci = 0;
    const spread = parseFloat(el.closest('.band').dataset.spread || '0.45');
    el.innerHTML = '';
    words.forEach((w, wi) => {
      const ws = document.createElement('span'); ws.className = 'w';
      ws.style.setProperty('--th', (wi / words.length * 0.5).toFixed(3));
      [...w].forEach(ch => {
        const c = document.createElement('span'); c.className = 'c'; c.textContent = ch;
        c.style.setProperty('--th', (ci / total * spread + r() * 0.06).toFixed(3));
        c.style.setProperty('--jx', ((r() > .5 ? 1 : -1) * (24 + r() * 40)).toFixed(0) + 'px');
        ci++; ws.appendChild(c);
      });
      el.appendChild(ws);
      if (wi < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
  });

  /* ---------- Héros ---------- */
  const hero = $('.hero'), stage = $('#stage'), video = $('#hero'), posterLayer = $('#poster');
  const ring = $('.ring'), cue = $('.cue');
  const bands = $$('.band').map((el, i, all) => ({ el, a: +el.dataset.a, b: +el.dataset.b, ramp: el.dataset.ramp ? +el.dataset.ramp : null, first: i === 0, last: i === all.length - 1, op: -1, k: -1, on: null }));

  function heroProgress() {
    const r = hero.getBoundingClientRect(), range = hero.offsetHeight - innerHeight;
    return range > 0 ? clamp(-r.top / range, 0, 1) : 0;
  }

  let loadK = 0, loadStart = 0;
  function updateCaptions(p, now = performance.now()) {
    if (loadStart && loadK < 1) loadK = clamp((now - loadStart) / 1100, 0, 1);
    bands.forEach(b => {
      const f = Math.min(0.02, (b.b - b.a) / 3);
      let op = (b.first ? 1 : smoothstep(p, b.a, b.a + f)) * (b.last ? 1 : 1 - smoothstep(p, b.b - f, b.b));
      if (b.last) op = smoothstep(p, b.a, b.a + f);
      let k = clamp((p - b.a) / (b.ramp || Math.min(0.025, (b.b - b.a) * 0.35)), 0, 1);
      if (b.first) k = Math.max(k, 1 - (1 - loadK) ** 3);
      if (Math.abs(op - b.op) > 0.004) { b.op = op; b.el.style.opacity = op.toFixed(3); }
      if (Math.abs(k - b.k) > 0.008 || (k === 1 && b.k !== 1)) { b.k = k; b.el.style.setProperty('--k', k.toFixed(3)); }
      const on = op > 0.5;
      if (on !== b.on) { b.on = on; b.el.classList.toggle('on', on); }
    });
    const c = p > 0.04 ? 0 : 1;
    if (cue && cue._c !== c) { cue._c = c; cue.style.setProperty('--cue', c); }
  }

  /* seeks contrôlés, sans interblocage */
  let seekBusy = false, pendingTime = null;
  function requestSeek(t) {
    if (!video.duration) return;
    if (seekBusy) { pendingTime = t; return; }
    seekBusy = true; video.currentTime = t;
  }
  video.addEventListener('seeked', () => {
    seekBusy = false;
    if (pendingTime !== null) { const t = pendingTime; pendingTime = null; requestSeek(t); }
  });
  video.addEventListener('error', () => { seekBusy = false; pendingTime = null; failVideo(); });

  /* boucle lissée qui se repose */
  let target = 0, shown = 0, rafId = null, lastTick = 0, heroOnScreen = true;
  function tick(now) {
    const dt = Math.min(100, now - (lastTick || now)); lastTick = now;
    const k = 0.16;
    shown += (target - shown) * (1 - Math.pow(1 - k, dt / 16.667));
    const loading = loadK < 1;
    if (Math.abs(target - shown) < 0.0005 && !loading) { shown = target; rafId = null; lastTick = 0; }
    else rafId = requestAnimationFrame(tick);
    if (video.duration) requestSeek(shown * (video.duration - 0.05));
    updateCaptions(shown, now);
  }
  function onScroll() {
    target = heroProgress();
    if (rafId === null && heroOnScreen) rafId = requestAnimationFrame(tick);
  }
  new IntersectionObserver(([e]) => { heroOnScreen = e.isIntersecting; if (heroOnScreen) onScroll(); }).observe(hero);

  /* chargement : affiche d'abord, puis la vidéo en Blob avec l'anneau */
  let started = false, inited = false;
  function initHeroOnce() {
    if (inited) return; inited = true;
    posterLayer.style.backgroundImage = `url('${POSTER_URL}')`;
    const im = new Image(); im.onload = startBlobFetch; im.onerror = startBlobFetch; im.src = POSTER_URL;
    setTimeout(startBlobFetch, 4000);
    loadStart = performance.now(); rafId = requestAnimationFrame(tick);
  }
  function startBlobFetch() { if (started) return; started = true; loadHeroBlob().catch(failVideo); }
  async function loadHeroBlob() {
    const ctrl = new AbortController(); let watchdog = setTimeout(() => ctrl.abort(), 20000);
    const res = await fetch(VIDEO_URL, { priority: 'low', signal: ctrl.signal });
    if (!res.ok || !res.body) throw new Error('video');
    const total = Number(res.headers.get('Content-Length')) || VIDEO_BYTES;
    const reader = res.body.getReader(), chunks = []; let got = 0, lastRing = 0;
    for (;;) {
      const { done, value } = await reader.read(); if (done) break;
      clearTimeout(watchdog); watchdog = setTimeout(() => ctrl.abort(), 20000);
      chunks.push(value); got += value.length;
      const frac = Math.min(1, got / total), now = performance.now();
      if (now - lastRing > 100 || frac === 1) { lastRing = now; ring.style.setProperty('--ld', Math.round(126 * (1 - frac))); }
    }
    clearTimeout(watchdog); ring.style.setProperty('--ld', 0);
    video.src = URL.createObjectURL(new Blob(chunks, { type: 'video/mp4' })); video.load();
    video.addEventListener('canplay', () => { requestSeek(heroProgress() * (video.duration - 0.05)); stage.classList.add('video-ready'); }, { once: true });
  }
  function failVideo() { stage.classList.add('video-failed'); }

  /* les cinq portes du héros fixe, identiques au CSS, décidées en direct */
  const GATES = [
    '(max-width: 720px)',
    '(orientation: portrait) and (max-width: 1024px)',
    '(orientation: portrait) and (pointer: coarse)',
    '(orientation: landscape) and (pointer: coarse) and (max-height: 560px)',
    '(prefers-reduced-motion: reduce)'
  ];
  let scrubOn = false;
  function enableScrub() {
    if (scrubOn) return; scrubOn = true;
    initHeroOnce();
    addEventListener('scroll', onScroll, { passive: true });
    bands.forEach(b => { b.op = -1; b.k = -1; b.on = null; });
    unpinFinalStates();
    updateCaptions(heroProgress()); onScroll();
  }
  function disableScrub() {
    if (!scrubOn) return; scrubOn = false;
    removeEventListener('scroll', onScroll);
    if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
  }
  function applyHeroMode() { if (GATES.some(q => matchMedia(q).matches)) disableScrub(); else enableScrub(); }
  const MQLS = GATES.map(q => matchMedia(q));
  MQLS.forEach(m => m.addEventListener('change', applyHeroMode));

  /* ---------- Le reste de la page ---------- */
  const nav = $('#nav');
  let navSolid = null;
  function navState() { const s = scrollY > innerHeight * .6; if (s !== navSolid) { navSolid = s; nav.classList.toggle('solid', s); } }

  // apparitions
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
    if (e.target.classList.contains('board')) setTimeout(() => e.target.classList.add('fini'), 1200);
  }), { threshold: .18 });
  $$('.reveal').forEach(el => io.observe(el));

  // lignes qui se dessinent au défilement (écritures seulement quand ça change)
  const lines = $$('.fadeline').map(el => ({ el, v: -1 }));
  let pinned = false;
  function drawLines() {
    if (pinned) return;
    lines.forEach(l => {
      const r = l.el.getBoundingClientRect();
      const v = Math.round(clamp((innerHeight - r.top) / (innerHeight * .6), 0, 1) * 100) / 100;
      if (v !== l.v) { l.v = v; l.el.style.setProperty('--draw', v); }
    });
  }
  let pageRaf = null;
  addEventListener('scroll', () => { if (pageRaf === null) pageRaf = requestAnimationFrame(() => { pageRaf = null; navState(); drawLines(); }); }, { passive: true });

  // le moment interactif : choisis ton dégradé
  const H = {
    low: { y: 300, a: .06, b: .2, t: 'Le low reste bas, juste au-dessus des oreilles. Discret, ça pousse proprement.' },
    mid: { y: 262, a: .15, b: .32, t: 'Le mid commence à mi-tête. Net, propre, ça va avec presque tout.' },
    high: { y: 214, a: .3, b: .5, t: 'Le high monte haut sur les côtés. Le contraste se voit de loin.' },
    skin: { y: 250, a: .25, b: .3, t: 'Le skin descend jusqu\'à la peau. Le plus net de tous, à rafraîchir plus souvent.' }
  };
  const ordre = ['low', 'mid', 'high', 'skin'];
  const boutons = $$('.choix button'), glisse = $('#glisse'), explique = $('#explique');
  const stopA = $('#fd-a'), stopB = $('#fd-b'), ligne = $('#ligne-fondu');
  function choisir(h, depuis) {
    const d = H[h];
    boutons.forEach(b => b.setAttribute('aria-checked', String(b.dataset.h === h)));
    stopA.setAttribute('offset', d.a); stopB.setAttribute('offset', d.b);
    ligne.style.transform = `translateY(${d.y - 262}px)`;
    if (explique.textContent !== d.t) explique.textContent = d.t;
    if (depuis !== 'glisse') glisse.value = ordre.indexOf(h);
  }
  boutons.forEach(b => b.addEventListener('click', () => choisir(b.dataset.h)));
  glisse.addEventListener('input', () => choisir(ordre[+glisse.value], 'glisse'));
  $('.choix').addEventListener('keydown', e => {
    if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    e.preventDefault();
    const i = ordre.indexOf($('.choix [aria-checked="true"]').dataset.h);
    const n = ordre[(i + (e.key === 'ArrowRight' ? 1 : 3)) % 4]; choisir(n);
    $(`.choix [data-h="${n}"]`).focus();
  });

  // mouvement réduit, dans les deux sens
  function pinToFinalStates() { pinned = true; lines.forEach(l => { l.el.style.setProperty('--draw', 1); l.v = 1; }); $$('.reveal').forEach(el => el.classList.add('in')); }
  function unpinFinalStates() { if (!pinned) return; pinned = false; lines.forEach(l => { l.el.style.removeProperty('--draw'); l.v = -1; }); drawLines(); }
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', e => { if (e.matches) pinToFinalStates(); else applyHeroMode(); });

  // onglet caché : tout se met en pause
  document.addEventListener('visibilitychange', () => document.body.classList.toggle('paused', document.hidden));

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) pinToFinalStates();
  applyHeroMode(); navState(); drawLines();
})();
