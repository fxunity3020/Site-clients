/* Line Fortier Coiffure : le salon en 3D, de jour.
   Unités : mètres. Pièce de x -4 (vitrines) à 4 (postes), z -4 (mur de brique) à 4,5 (entrée), plafond à 3 m.
   Le défilement promène la caméra d'un arrêt à l'autre ; main.js envoie « lf:onglet » (elle / lui). */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { createBarberChair } from './chaise-modele.js';

const body = document.body;
const canvas = document.getElementById('scene');
const pourcent = document.getElementById('pourcent');
const etat = n => { if (pourcent) pourcent.textContent = n + ' %'; };
const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
const leger = matchMedia('(max-width: 900px), (pointer: coarse)').matches;

let renderer;
try { renderer = new THREE.WebGLRenderer({ canvas, antialias: !leger, powerPreference: 'high-performance' }); }
catch (e) { body.classList.add('sans-3d', 'fin-chargement'); throw e; }
renderer.setPixelRatio(Math.min(devicePixelRatio, leger ? 1.5 : 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = .98;
renderer.shadowMap.enabled = !leger;
renderer.shadowMap.type = THREE.VSMShadowMap; // ombres floues : pas de marches d'escalier au soleil
renderer.shadowMap.autoUpdate = false;           // le soleil ne bouge pas : on recalcule seulement quand une chaise pivote
renderer.shadowMap.needsUpdate = true;
etat(10);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeebe6);
const pm = new THREE.PMREMGenerator(renderer);
scene.environment = pm.fromScene(new RoomEnvironment(renderer), .04).texture; pm.dispose();
scene.environmentIntensity = .55;
const camera = new THREE.PerspectiveCamera(52, innerWidth / innerHeight, .05, 40);

/* ---------- Outils ---------- */
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const boite = (w, h, d, r = .02, s = 3) => new RoundedBoxGeometry(w, h, d, s, r);
function toile(w, h, dessin, srgb = true) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  dessin(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); if (srgb) t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
const mat = (color, roughness = .6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness, ...extra });
function mesh(geo, m, pos = [0, 0, 0], rot = [0, 0, 0], parent = scene, ombre = true) {
  const o = new THREE.Mesh(geo, m); o.position.set(...pos); o.rotation.set(...rot);
  o.castShadow = ombre && !leger; o.receiveShadow = !leger; parent.add(o); return o;
}
// petit générateur pseudo-aléatoire stable (mêmes bouteilles à chaque visite)
let graine = 7; const hasard = () => ((graine = (graine * 16807) % 2147483647) / 2147483647);

/* ---------- Textures dessinées ---------- */
const tuiles = toile(1024, 1024, (g, w) => {        // tuiles brunes de 30 cm, joints gris
  g.fillStyle = '#7b6f66'; g.fillRect(0, 0, w, w);
  const n = 8, s = w / n;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const v = hasard();
    g.fillStyle = `rgb(${104 + v * 18 | 0},${70 + v * 12 | 0},${50 + v * 9 | 0})`;
    g.fillRect(i * s + 3, j * s + 3, s - 6, s - 6);
    const r = g.createRadialGradient(i * s + s * .3, j * s + s * .3, 4, i * s + s / 2, j * s + s / 2, s * .7);
    r.addColorStop(0, 'rgba(255,230,210,.10)'); r.addColorStop(1, 'rgba(0,0,0,.06)');
    g.fillStyle = r; g.fillRect(i * s + 3, j * s + 3, s - 6, s - 6);
  }
});
tuiles.wrapS = tuiles.wrapT = THREE.RepeatWrapping; tuiles.repeat.set(8 / 2.4, 8.5 / 2.4);

const briques = toile(1024, 1024, (g, w) => {       // brique peinte en gris, rangs décalés
  g.fillStyle = '#a7a7a3'; g.fillRect(0, 0, w, w);
  const bh = w / 16, bw = w / 4;
  for (let r = 0; r < 16; r++) for (let c = -1; c < 5; c++) {
    const x = c * bw + (r % 2 ? bw / 2 : 0), v = hasard();
    g.fillStyle = `rgb(${150 + v * 22 | 0},${151 + v * 22 | 0},${148 + v * 20 | 0})`;
    g.fillRect(x + 4, r * bh + 4, bw - 8, bh - 8);
  }
});
briques.wrapS = briques.wrapT = THREE.RepeatWrapping; briques.repeat.set(3.2 / 1.2, 3 / 1.2);

const lambris = toile(512, 512, (g, w) => {         // lambris gris du comptoir
  g.fillStyle = '#bfc3c4'; g.fillRect(0, 0, w, w);
  for (let x = 0; x < w; x += 32) { g.fillStyle = 'rgba(40,45,48,.35)'; g.fillRect(x, 0, 3, w); g.fillStyle = 'rgba(255,255,255,.35)'; g.fillRect(x + 3, 0, 2, w); }
});
lambris.wrapS = THREE.RepeatWrapping; lambris.repeat.set(4, 1);

const dehors = toile(2048, 1024, (g, w, h) => {     // la vue des vitrines : ciel, arbres, pelouse, boulevard
  const ciel = g.createLinearGradient(0, 0, 0, h * .5); ciel.addColorStop(0, '#bcd8ee'); ciel.addColorStop(1, '#eaf2f6');
  g.fillStyle = ciel; g.fillRect(0, 0, w, h);
  for (let i = 0; i < 46; i++) { const x = hasard() * w, r = 50 + hasard() * 90, y = h * .42 - hasard() * 60; g.fillStyle = `rgb(${70 + hasard() * 40 | 0},${110 + hasard() * 40 | 0},${60 + hasard() * 25 | 0})`; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); }
  g.fillStyle = '#9cbf72'; g.fillRect(0, h * .5, w, h * .14);
  g.fillStyle = '#9a9c9d'; g.fillRect(0, h * .64, w, h * .24);
  g.fillStyle = '#e8e3c9'; for (let x = 0; x < w; x += 160) g.fillRect(x, h * .755, 90, 8);
  g.fillStyle = '#c9c6c0'; g.fillRect(0, h * .88, w, h * .12);
});

/* ---------- Matériaux ---------- */
const M = {
  sol: new THREE.MeshStandardMaterial({ map: tuiles, roughness: .38, envMapIntensity: .5 }),
  mur: mat(0xf1efeb, .9), plafond: mat(0xf7f6f3, .95),
  brique: new THREE.MeshStandardMaterial({ map: briques, roughness: .92 }),
  noir: mat(0x151414, .45, { metalness: .15 }), bois: mat(0xc7a47d, .55), boisFonce: mat(0x4a3022, .5),
  granit: mat(0x2f2520, .25, { metalness: .1 }), lambris: new THREE.MeshStandardMaterial({ map: lambris, roughness: .7 }),
  blanc: mat(0xf4f3f0, .35), chrome: new THREE.MeshStandardMaterial({ color: 0xe8e8e8, roughness: .1, metalness: 1 }),
  cuivre: mat(0xb07a45, .35, { metalness: .55 }), tissu: mat(0xf7f5f0, .95, { side: THREE.DoubleSide }),
  plante: mat(0x3f6b3a, .7), dehors: new THREE.MeshBasicMaterial({ map: dehors, toneMapped: false }),
  lumiere: new THREE.MeshBasicMaterial({ color: 0xfffaf0, toneMapped: false }),
};
etat(25);

/* ---------- La pièce ---------- */
mesh(new THREE.PlaneGeometry(8, 8.5), M.sol, [0, 0, .25], [-Math.PI / 2, 0, 0], scene, false);
mesh(new THREE.PlaneGeometry(8, 3), M.mur, [0, 1.5, -4], [0, 0, 0], scene, false);
mesh(new THREE.PlaneGeometry(3.2, 3), M.brique, [0, 1.5, -3.99], [0, 0, 0], scene, false);
mesh(new THREE.PlaneGeometry(8.5, 3), M.mur, [4, 1.5, .25], [0, -Math.PI / 2, 0], scene, false);
mesh(new THREE.PlaneGeometry(8, 8.5), M.plafond, [0, 3, .25], [Math.PI / 2, 0, 0], scene, false);
// mur des vitrines (x = -4) : allège sous les fenêtres, linteau au-dessus, piliers
mesh(new THREE.PlaneGeometry(8.5, .55), M.mur, [-4, .275, .25], [0, Math.PI / 2, 0], scene, true);
mesh(new THREE.PlaneGeometry(8.5, .4), M.mur, [-4, 2.8, .25], [0, Math.PI / 2, 0], scene, true);
mesh(new THREE.PlaneGeometry(3.2, 2.05), M.mur, [-4, 1.575, -2.4], [0, Math.PI / 2, 0], scene, true);
mesh(new THREE.PlaneGeometry(6.2, 2.05), M.dehors, [-4.6, 1.575, 1.75], [0, Math.PI / 2, 0], scene, false);
for (let z = -.8; z <= 4.5; z += 1.32) mesh(new THREE.BoxGeometry(.12, 2.05, .07), M.blanc, [-3.98, 1.575, z]);
mesh(new THREE.BoxGeometry(.2, .05, 5.3), M.blanc, [-3.92, .57, 1.85]);
// façade (z = 4,5) : vitrine, porte vitrée ; vue de l'intérieur et du trottoir
const facade = new THREE.MeshStandardMaterial({ color: 0xf1efeb, roughness: .9, side: THREE.DoubleSide });
mesh(new THREE.PlaneGeometry(14, 4), M.sol.clone(), [0, -.001, 6.5], [-Math.PI / 2, 0, 0], scene, false).material.color.setHex(0x9b9690); // trottoir
const vueRue = mesh(new THREE.PlaneGeometry(9, 2.6), M.dehors, [0, 1.45, 5.1], [0, Math.PI, 0], scene, false);
[[-3.8, .4, 3], [.9, .6, 3], [3.1, 1.8, 3]].forEach(([x, w, h]) => mesh(new THREE.PlaneGeometry(w, h), facade, [x, h / 2, 4.5], [0, Math.PI, 0], scene, false));
mesh(new THREE.PlaneGeometry(4.2, .55), facade, [-1.5, .275, 4.5], [0, Math.PI, 0], scene, false);
mesh(new THREE.PlaneGeometry(4.2, .4), facade, [-1.5, 2.8, 4.5], [0, Math.PI, 0], scene, false);
mesh(new THREE.PlaneGeometry(1, .7), facade, [1.7, 2.65, 4.5], [0, Math.PI, 0], scene, false);
[-3.6, -2.2, -.8, .6].forEach(x => mesh(new THREE.BoxGeometry(.1, 2.05, .07), M.blanc, [x, 1.575, 4.48]));
mesh(new THREE.BoxGeometry(4.3, .05, .2), M.blanc, [-1.5, .57, 4.42]);
[1.2, 2.2].forEach(x => mesh(new THREE.BoxGeometry(.08, 2.3, .08), M.noir, [x, 1.15, 4.48]));
mesh(new THREE.BoxGeometry(1.08, .08, .08), M.noir, [1.7, 2.3, 4.48]);
mesh(new THREE.BoxGeometry(.03, .5, .03), M.chrome, [2.05, 1.05, 4.44]);
// rideaux
[-.55, 1.45, 3.95].forEach(z => {
  const g = new THREE.PlaneGeometry(.55, 2.3, 24, 1), p = g.attributes.position;
  for (let i = 0; i < p.count; i++) p.setZ(i, Math.sin(p.getX(i) * 34) * .035);
  g.computeVertexNormals();
  mesh(g, M.tissu, [-3.85, 1.6, z], [0, Math.PI / 2, 0]);
});
// plinthes
mesh(new THREE.BoxGeometry(8, .09, .02), M.noir, [0, .045, -3.98], [0, 0, 0], scene, false);
mesh(new THREE.BoxGeometry(.02, .09, 8.5), M.noir, [3.99, .045, .25], [0, 0, 0], scene, false);
// plafonniers encastrés
for (let x = -2.4; x <= 2.4; x += 2.4) for (let z = -2.6; z <= 3.4; z += 2) mesh(new THREE.CircleGeometry(.11, 24), M.lumiere, [x, 2.995, z], [Math.PI / 2, 0, 0], scene, false);
etat(40);

/* ---------- Mur de brique : l'enseigne et l'horloge ---------- */
let enseigne;
async function dessinerEnseigne() {
  try { await document.fonts.load('900 120px Archivo'); } catch (e) {}
  const t = toile(2048, 640, (g, w, h) => {
    g.clearRect(0, 0, w, h); g.fillStyle = '#1f1c1a'; g.textAlign = 'center';
    g.font = '900 250px Archivo, Arial Black, sans-serif'; g.fillText('LINE FORTIER', w / 2, 300);
    g.fillStyle = '#b4441d'; g.font = '800 110px Archivo, Arial, sans-serif'; g.fillText('COIFFURE ELLE & LUI', w / 2, 470);
  });
  if (enseigne) { enseigne.material.map = t; enseigne.material.needsUpdate = true; }
}
enseigne = mesh(new THREE.PlaneGeometry(2.6, .81), new THREE.MeshStandardMaterial({ transparent: true, roughness: .5 }), [0, 2.2, -3.96], [0, 0, 0], scene, false);
dessinerEnseigne();
{ const h = new THREE.Group(); h.position.set(1.15, 2.72, -3.95); scene.add(h);
  mesh(new THREE.CylinderGeometry(.17, .17, .04, 40), M.noir, [0, 0, 0], [Math.PI / 2, 0, 0], h);
  mesh(new THREE.CircleGeometry(.145, 40), M.blanc, [0, 0, .021], [0, 0, 0], h);
  mesh(new THREE.BoxGeometry(.012, .1, .005), M.noir, [0, .04, .026], [0, 0, 0], h);
  mesh(new THREE.BoxGeometry(.012, .07, .005), M.noir, [.024, -.02, .026], [0, 0, -1.2], h); }

/* ---------- Étagères de produits (fond, de chaque côté de la brique) ---------- */
{
  const pos = [], couleurs = [];
  const teintes = [0x1b1b1b, 0xf2efe9, 0x2f7f8f, 0xd9a441, 0x8d2f4a, 0x6c8f3a, 0xe8e2d6, 0x3d4f9a, 0xc95f3a];
  [-2.55, 2.55].forEach(cx => {
    mesh(new THREE.BoxGeometry(1.35, 2.1, .03), M.noir, [cx, 1.05, -3.955]);                  // fond
    [-.66, .66].forEach(dx => mesh(new THREE.BoxGeometry(.03, 2.1, .38), M.noir, [cx + dx, 1.05, -3.79])); // côtés
    mesh(new THREE.BoxGeometry(1.35, .04, .38), M.noir, [cx, 2.1, -3.79]);                     // dessus
    mesh(new THREE.BoxGeometry(1.35, .12, .38), M.noir, [cx, .06, -3.79]);                     // socle
    [.55, 1.0, 1.45, 1.9].forEach(y => {
      mesh(new THREE.BoxGeometry(1.25, .025, .34), M.boisFonce, [cx, y, -3.76]);
      for (let k = 0; k < 9; k++) {
        const hh = .12 + hasard() * .12;
        pos.push([cx - .54 + k * .135 + hasard() * .02, y + .013 + hh / 2, -3.72 + hasard() * .06, hh]);
        couleurs.push(teintes[(hasard() * teintes.length) | 0]);
      }
    });
  });
  const inst = new THREE.InstancedMesh(new THREE.CylinderGeometry(.033, .037, 1, 14), mat(0xffffff, .3), pos.length);
  const m = new THREE.Matrix4(), c = new THREE.Color();
  pos.forEach(([x, y, z, hh], i) => { m.compose(V(x, y, z), new THREE.Quaternion(), V(1, hh, 1)); inst.setMatrixAt(i, m); inst.setColorAt(i, c.setHex(couleurs[i])); });
  inst.castShadow = !leger; scene.add(inst);
}
// plante
mesh(new THREE.CylinderGeometry(.16, .12, .34, 24), M.blanc, [3.45, .17, -3.45]);
for (let i = 0; i < 9; i++) mesh(new THREE.ConeGeometry(.06, .7 + hasard() * .3, 6), M.plante, [3.45 + (hasard() - .5) * .14, .7, -3.45 + (hasard() - .5) * .14], [(hasard() - .5) * .5, 0, (hasard() - .5) * .5]);
etat(55);

/* ---------- Le comptoir (gauche, au fond) ---------- */
{
  const g = new THREE.Group(); g.position.set(-2.1, 0, -2.25); scene.add(g);
  mesh(new THREE.BoxGeometry(2.1, 1.02, .55), M.lambris, [0, .51, 0], [0, 0, 0], g);
  mesh(boite(2.24, .06, .68, .012), M.granit, [0, 1.05, -.03], [0, 0, 0], g);
  mesh(boite(.7, .12, .2, .01), M.blanc, [.4, 1.14, -.1], [0, 0, 0], g);          // boîte de cartes
  mesh(new THREE.CylinderGeometry(.06, .07, .22, 18), M.boisFonce, [-.6, 1.19, -.12], [0, 0, 0], g); // bouteille
  mesh(new THREE.SphereGeometry(.1, 18, 12), mat(0xe9d7e0, .8), [-.25, 1.14, -.12], [0, 0, 0], g);   // fleurs
}

/* ---------- Deux postes : Elle (z -0,6) et Lui (z 1,9) ---------- */
const POSTES = { elle: -.6, lui: 1.9 };
const modele = createBarberChair(THREE, RoundedBoxGeometry, { pass: 'material' });
const chaises = {};
Object.entries(POSTES).forEach(([nom, z], i) => {
  const W = 1.0, H = 1.4, y = 1.55;
  mesh(boite(W + .1, H + .1, .04, .01), M.noir, [3.97, y, z], [0, -Math.PI / 2, 0], scene, false);
  const miroir = leger
    ? new THREE.Mesh(new THREE.PlaneGeometry(W, H), new THREE.MeshStandardMaterial({ color: 0xbfc4c6, metalness: 1, roughness: .05 }))
    : new Reflector(new THREE.PlaneGeometry(W, H), { textureWidth: 640, textureHeight: 900, color: 0xb9b9b9, clipBias: .003 });
  miroir.position.set(3.945, y, z); miroir.rotation.y = -Math.PI / 2; scene.add(miroir);
  mesh(boite(.3, .04, 1.1, .01), M.blanc, [3.83, .92, z]);
  // petite plaque « ELLE » / « LUI » au-dessus du miroir
  const plaque = toile(512, 160, (g, w, h) => { g.fillStyle = '#1f1c1a'; g.fillRect(0, 0, w, h); g.fillStyle = '#f6f5f2'; g.textAlign = 'center'; g.font = '900 104px Archivo, Arial Black, sans-serif'; g.fillText(nom.toUpperCase(), w / 2, 118); });
  mesh(new THREE.PlaneGeometry(.5, .156), new THREE.MeshStandardMaterial({ map: plaque, roughness: .6 }), [3.97, 2.45, z], [0, -Math.PI / 2, 0], scene, false);
  mesh(new THREE.CircleGeometry(.62, 48), mat(0x161616, .9), [2.95, .004, z], [-Math.PI / 2, 0, 0], scene, false); // tapis
  const c = i === 0 ? modele.group : modele.group.clone(true);
  c.position.set(2.95, 0, z); c.rotation.y = Math.PI / 2;
  c.traverse(o => { if (o.isMesh) { o.castShadow = !leger; o.receiveShadow = !leger; } });
  scene.add(c); chaises[nom] = c.getObjectByName('swivel');
});
etat(70);

/* ---------- Sécheuses à casque (le long des vitrines, au fond) ---------- */
[-.25, .75].forEach(z => {
  const g = new THREE.Group(); g.position.set(-3.35, 0, z); g.rotation.y = Math.PI / 2; scene.add(g);
  mesh(boite(.62, .14, .58, .05), M.noir, [0, .45, 0], [0, 0, 0], g);
  mesh(boite(.62, .7, .12, .05), M.noir, [0, .82, -.28], [-.12, 0, 0], g);
  [-.32, .32].forEach(x => mesh(boite(.08, .26, .56, .03), M.noir, [x, .6, 0], [0, 0, 0], g));
  mesh(boite(.5, .3, .5, .04), M.noir, [0, .22, 0], [0, 0, 0], g);
  mesh(new THREE.CylinderGeometry(.025, .025, 1.0, 10), M.chrome, [0, 1.2, -.42], [0, 0, 0], g);
  const casque = mesh(new THREE.SphereGeometry(.26, 32, 16, 0, Math.PI * 2, 0, Math.PI * .5), new THREE.MeshStandardMaterial({ color: 0xb07a45, roughness: .35, metalness: .5, side: THREE.DoubleSide }), [0, 1.3, -.16], [-.35, 0, 0], g);
  casque.scale.set(1, 1.15, 1);
  mesh(new THREE.TorusGeometry(.26, .018, 10, 40), M.noir, [0, 1.3, -.16], [Math.PI / 2 - .35, 0, 0], g);
  mesh(new THREE.CylinderGeometry(.02, .02, .2, 8), M.chrome, [0, 1.62, -.3], [-.6, 0, 0], g);
});

/* ---------- Coin d'attente (devant les vitrines) ---------- */
function chaiseCoque(couleur, x, z) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = Math.PI / 2; scene.add(g);
  const profil = [[0, 0], [.14, .005], [.2, .03], [.235, .09], [.25, .16]].map(p => new THREE.Vector2(...p));
  const coque = new THREE.LatheGeometry(profil, 40);
  coque.scale(1, 1, .92);
  const c = mesh(coque, mat(couleur, .28, { side: THREE.DoubleSide }), [0, .44, -.02], [0, 0, 0], g);
  // dossier relevé, légèrement courbé
  const dos = new THREE.CylinderGeometry(.27, .27, .3, 32, 1, true, Math.PI * .72, Math.PI * .56);
  mesh(dos, mat(couleur, .28, { side: THREE.DoubleSide }), [0, .74, .06], [-.18, 0, 0], g);
  [[-.15, -.15], [.15, -.15], [-.15, .15], [.15, .15]].forEach(([a, b]) => mesh(new THREE.CylinderGeometry(.013, .011, .46, 8), M.bois, [a * 1.2, .22, b * 1.2], [b * .4, 0, -a * .4], g));
  mesh(new THREE.TorusGeometry(.16, .006, 6, 24), M.chrome, [0, .25, 0], [Math.PI / 2, 0, 0], g);
}
chaiseCoque(0x161616, -3.45, 2.0); chaiseCoque(0xf1f0ec, -3.45, 2.65); chaiseCoque(0x161616, -3.45, 3.3);
{
  const t = new THREE.Group(); t.position.set(-2.45, 0, 2.65); scene.add(t);
  mesh(boite(.55, .05, 1.1, .01), M.bois, [0, .42, 0], [0, 0, 0], t);
  mesh(boite(.55, .04, 1.1, .01), M.bois, [0, .14, 0], [0, 0, 0], t);
  [-.25, .25].forEach(x => mesh(new THREE.BoxGeometry(.04, .32, 1.1), M.blanc, [x, .28, 0], [0, 0, 0], t));
  [[0xc95f3a, -.25], [0x2f7f8f, .05], [0xf2efe9, .3]].forEach(([c, z], k) => mesh(new THREE.BoxGeometry(.21, .012, .28), mat(c, .5), [-.05 + k * .03, .452 + k * .012, z], [0, k * .3, 0], t));
}
etat(82);

/* ---------- Lumière de jour ---------- */
scene.add(new THREE.HemisphereLight(0xffffff, 0x8a6a55, 1.3));
const soleil = new THREE.DirectionalLight(0xfff4e6, 1.35);
soleil.position.set(-9, 5.5, 3); soleil.target.position.set(0, 0, .5);
if (!leger) {
  soleil.castShadow = true; soleil.shadow.mapSize.set(2048, 2048); soleil.shadow.bias = -.0004; soleil.shadow.normalBias = .03; soleil.shadow.radius = 10; soleil.shadow.blurSamples = 16;
  Object.assign(soleil.shadow.camera, { left: -4.6, right: 4.6, top: 4.2, bottom: -4.2, near: 4, far: 17 });
}
scene.add(soleil, soleil.target);
const plafond = new THREE.PointLight(0xfff6ea, leger ? 6 : 9, 9, 1.6); plafond.position.set(1, 2.8, 0); scene.add(plafond);
if (!leger) { const p2 = new THREE.PointLight(0xfff6ea, 5, 7, 1.6); p2.position.set(-1, 2.8, -2.6); scene.add(p2); }

/* ---------- Les arrêts de la caméra ---------- */
let onglet = 'elle';
addEventListener('lf:onglet', e => { onglet = e.detail; demander(); });
const ARRETS = {
  entree: () => [V(-1.4, 1.62, 6.6), V(.3, 1.3, -4)],   // sur le trottoir, devant la vitrine
  services: () => onglet === 'lui' ? [V(.9, 1.7, .25), V(3.0, 1.1, 1.95)] : [V(.9, 1.7, 1.0), V(3.0, 1.1, -.65)],
  salon: () => [V(.7, 1.65, 1.5), V(-.4, 1.55, -4)],
  avis: () => [V(.9, 1.55, 1.1), V(-3.2, .75, 2.9)],
  questions: () => [V(.1, 1.65, .7), V(-2.1, 1.0, -2.35)],
  contact: () => [V(.8, 1.7, -2.2), V(-1.2, 1.3, 4.5)],
};
const etapes = [...document.querySelectorAll('[data-arret]')];
// côté du panneau : +1 = panneau à gauche (le salon se décale à droite), -1 = à droite
const COTE = Object.fromEntries(etapes.map(e => [e.dataset.arret, e.classList.contains('droite') ? -1 : 1]));
let ancres = [];
function mesurer() { ancres = etapes.map(e => e.offsetTop + Math.min(e.offsetHeight, innerHeight * 1.6) / 2 - innerHeight / 2); }
const lisse = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
function voulu() {
  const y = scrollY; let i = 0;
  while (i < ancres.length - 2 && y > ancres[i + 1]) i++;
  const f = ancres.length > 1 ? (y - ancres[i]) / (ancres[i + 1] - ancres[i]) : 0;
  const k = reduit ? (f < .5 ? 0 : 1) : lisse(.1, .9, f);
  const a0 = etapes[i].dataset.arret, a1 = etapes[Math.min(i + 1, etapes.length - 1)].dataset.arret;
  const [p0, t0] = ARRETS[a0](), [p1, t1] = ARRETS[a1]();
  return [p0.lerp(p1, k), t0.lerp(t1, k), k < .5 ? a0 : a1, COTE[a0] + (COTE[a1] - COTE[a0]) * k];
}

/* ---------- Taille, points cliquables, boucle ---------- */
const points = [...document.querySelectorAll('.point')].map(el => ({ el, v: V(...el.dataset.point.split(',').map(Number)), arret: el.dataset.pour }));
const souris = new THREE.Vector2();
if (matchMedia('(hover: hover) and (pointer: fine)').matches && !reduit) addEventListener('pointermove', e => { souris.set(e.clientX / innerWidth * 2 - 1, -(e.clientY / innerHeight * 2 - 1)); demander(); }, { passive: true });
let portrait = false;
const pos = V(-1.4, 1.62, 6.6), cible = V(.3, 1.3, -4), par = V();
let decal = 0, tPrec = performance.now(), enCours = false, calme = 0, actuelPrec = '';
function demander() { calme = 0; if (!enCours) { enCours = true; tPrec = performance.now(); requestAnimationFrame(image); } }
function taille() {
  const w = innerWidth, h = innerHeight; portrait = w / h < .9;
  renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = portrait ? 66 : 52; camera.updateProjectionMatrix();
  mesurer(); demander();
}
addEventListener('resize', taille);
addEventListener('scroll', demander, { passive: true });
taille();


function image(t) {
  const dt = Math.min(.05, (t - tPrec) / 1000); tPrec = t;
  const [p, c, actuel, cote] = voulu();
  const k = reduit ? 1 : 1 - Math.exp(-dt * 3.4);
  if (portrait) c.y -= .22;
  pos.lerp(p, k); cible.lerp(c, k);
  decal += (cote - decal) * k;
  if (!reduit) par.lerp(V(souris.x * .12, souris.y * .06, 0), 1 - Math.exp(-dt * 2.5));
  const w = innerWidth, h = innerHeight;
  // téléphone : panneau en bas, le salon monte ; tablette debout : panneau en haut, le salon descend
  if (portrait) camera.setViewOffset(w, h, w > 760 ? -decal * w * .2 : 0, w > 760 ? -h * .16 : h * .2, w, h);
  else camera.setViewOffset(w, h, -decal * w * .12, 0, w, h);
  camera.position.copy(pos).add(par); camera.lookAt(cible);

  // la chaise choisie pivote vers le visiteur
  ['elle', 'lui'].forEach(n => {
    const s = chaises[n]; if (!s) return;
    let vise = 0;
    if (actuel === 'services' && onglet === n) {
      // le siège (axe +z local, chaise tournée de 90°) se tourne de trois quarts vers la caméra
      const cz = POSTES[n], ang = Math.atan2(camera.position.x - 2.95, camera.position.z - cz) - Math.PI / 2;
      vise = Math.atan2(Math.sin(ang + .45), Math.cos(ang + .45));
    }
    let d = vise - s.rotation.y; d = Math.atan2(Math.sin(d), Math.cos(d));
    s.rotation.y += d * (reduit ? 1 : 1 - Math.exp(-dt * 4));
    if (Math.abs(d) > .002) renderer.shadowMap.needsUpdate = true;
  });

  // points cliquables projetés sur les chaises
  const pan = document.querySelector(`#${actuel} .panneau`), zone = pan ? pan.getBoundingClientRect() : null;
  points.forEach(pt => {
    const v = pt.v.clone().project(camera);
    const sx = (v.x * .5 + .5) * w, sy = (-v.y * .5 + .5) * h;
    const sous = zone && sx > zone.left - 80 && sx < zone.right + 80 && sy > zone.top - 30 && sy < zone.bottom + 30;
    const vis = pt.arret === actuel && !sous && v.z < 1 && Math.abs(v.x) < .9 && Math.abs(v.y) < .85;
    pt.el.classList.toggle('visible', vis);
    if (vis) pt.el.style.transform = `translate(${sx}px, ${sy}px)`;
  });
  if (actuel !== actuelPrec) { body.dataset.arret = actuel; actuelPrec = actuel; }

  renderer.render(scene, camera);
  // on s'arrête quand la caméra est immobile depuis un moment (économie de batterie)
  const bouge = pos.distanceToSquared(p) + cible.distanceToSquared(c) > 1e-7 || Math.abs(cote - decal) > 1e-3;
  calme = bouge ? 0 : calme + 1;
  if (calme > 30) { enCours = false; return; }
  requestAnimationFrame(image);
}

etat(100);
document.fonts && document.fonts.ready.then(() => { mesurer(); dessinerEnseigne(); demander(); });
requestAnimationFrame(t => { tPrec = t; enCours = true; image(t); body.classList.add('rendu'); });
