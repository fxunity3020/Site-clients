/* Line Fortier Coiffure : la chaise 3D, vedette de la couverture.
   Lumière de jour de studio sur fond rouge ; les titres de couverture font tourner la chaise. */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// Chaise de barbier procédurale (img2threejs, spec object-sculpt-spec.json).
// Unités : mètres, y vers le haut, la chaise regarde vers +z, son côté gauche est -x.
// createBarberChair(THREE, RoundedBoxGeometry, opts) -> { group, pivots, materials, dispose }
//   opts.pass : 'blockout' | 'structure' | 'form' | 'material' (défaut : tout)

function createBarberChair(THREE, RoundedBoxGeometry, opts = {}) {
  const pass = opts.pass || 'material';
  const order = ['blockout', 'structure', 'form', 'material'];
  const lvl = order.indexOf(pass);
  const hasStructure = lvl >= 1, hasForm = lvl >= 2, hasMaterial = lvl >= 3;

  /* ---------- Textures procédurales : capitonnage hexagonal ---------- */
  function hexMaps(size = 1024, cells = 6) {
    const h = document.createElement('canvas'); h.width = h.height = size;
    const g = h.getContext('2d');
    g.fillStyle = '#000'; g.fillRect(0, 0, size, size);
    const r = size / cells / Math.sqrt(3) * 1.02;      // rayon de cellule (sommet)
    const w = Math.sqrt(3) * r, vs = 1.5 * r;
    for (let row = -1; row * vs < size + r; row++) {
      for (let col = -1; col * w < size + w; col++) {
        const cx = col * w + (row % 2 ? w / 2 : 0), cy = row * vs;
        const grad = g.createRadialGradient(cx, cy - r * .15, r * .1, cx, cy, r * .92);
        grad.addColorStop(0, '#fff'); grad.addColorStop(.62, '#d8d8d8'); grad.addColorStop(1, '#202020');
        g.fillStyle = grad; g.beginPath();
        for (let k = 0; k < 6; k++) { const a = Math.PI / 3 * k + Math.PI / 6; g.lineTo(cx + Math.cos(a) * r * .9, cy + Math.sin(a) * r * .9); }
        g.closePath(); g.fill();
      }
    }
    const hd = g.getImageData(0, 0, size, size).data;
    const n = document.createElement('canvas'); n.width = n.height = size;
    const ng = n.getContext('2d'); const nd = ng.createImageData(size, size);
    const H = (x, y) => hd[(((y + size) % size) * size + ((x + size) % size)) * 4] / 255;
    const strength = 7;
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const dx = (H(x + 1, y) - H(x - 1, y)) * strength, dy = (H(x, y + 1) - H(x, y - 1)) * strength;
      const l = Math.hypot(dx, dy, 1), i = (y * size + x) * 4;
      nd.data[i] = (-dx / l * .5 + .5) * 255; nd.data[i + 1] = (dy / l * .5 + .5) * 255; nd.data[i + 2] = (1 / l * .5 + .5) * 255; nd.data[i + 3] = 255;
    }
    ng.putImageData(nd, 0, 0);
    // rugosité : creux plus mats, cellules plus satinées ; AO : creux sombres
    const rgh = document.createElement('canvas'); rgh.width = rgh.height = size;
    const rg = rgh.getContext('2d'); const rd = rg.createImageData(size, size);
    for (let i = 0; i < hd.length; i += 4) { const v = hd[i] / 255; const ao = .45 + .55 * Math.min(1, v * 1.4); const ro = .62 - v * .2;
      rd.data[i] = ao * 255; rd.data[i + 1] = ro * 255; rd.data[i + 2] = 0; rd.data[i + 3] = 255; }
    rg.putImageData(rd, 0, 0);
    const mk = (c, srgb) => { const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4; if (srgb) t.colorSpace = THREE.SRGBColorSpace; return t; };
    return { normal: mk(n), aoRough: mk(rgh) };
  }

  /* ---------- Matériaux ---------- */
  const flat = c => new THREE.MeshStandardMaterial({ color: c, roughness: .6, metalness: 0 });
  let M;
  if (!hasMaterial) {
    M = { leather: flat(0x3a3a3a), quilt: flat(0x4a4a4a), chrome: flat(0x9a9a9a), metal: flat(0x2a2a2a) };
  } else {
    const hx = hexMaps();
    const quilt = (rep) => {
      const nm = hx.normal.clone(); nm.repeat.set(rep[0], rep[1]); nm.needsUpdate = true;
      const ar = hx.aoRough.clone(); ar.repeat.set(rep[0], rep[1]); ar.needsUpdate = true;
      return new THREE.MeshPhysicalMaterial({ color: 0x1a1a1a, roughness: .5, metalness: 0, normalMap: nm, normalScale: new THREE.Vector2(1.6, 1.6),
        roughnessMap: ar, aoMap: ar, aoMapIntensity: .9, sheen: .25, sheenColor: 0x2a2a2a, clearcoat: .08, clearcoatRoughness: .5, envMapIntensity: .4 });
    };
    M = {
      leather: new THREE.MeshPhysicalMaterial({ color: 0x151515, roughness: .5, metalness: 0, clearcoat: .12, clearcoatRoughness: .5, sheen: .2, sheenColor: 0x303030, envMapIntensity: .45 }),
      quiltBack: quilt([1.7, 1.7]), quiltSeat: quilt([1.55, 1.55]), quiltSide: quilt([1.6, 1.6]), quiltPost: quilt([.45, .6]),
      chrome: new THREE.MeshStandardMaterial({ color: 0xe6e6e6, roughness: .08, metalness: 1 }),
      metal: new THREE.MeshPhysicalMaterial({ color: 0x111111, roughness: .38, metalness: .35, clearcoat: .4, clearcoatRoughness: .3, envMapIntensity: .5 }),
    };
  }
  const Q = k => hasMaterial ? M[k] : M.quilt;

  const root = new THREE.Group(); root.name = 'root';
  const pivots = {};
  const add = (parent, mesh, name, pos = [0, 0, 0], rot = [0, 0, 0]) => {
    mesh.name = name; mesh.position.set(...pos); mesh.rotation.set(...rot);
    mesh.castShadow = mesh.receiveShadow = true;
    if (mesh.geometry && mesh.geometry.attributes.uv && !mesh.geometry.attributes.uv2) mesh.geometry.setAttribute('uv2', mesh.geometry.attributes.uv);
    parent.add(mesh); return mesh;
  };
  const rbox = (w, h, d, r, seg = 4) => (hasForm ? new RoundedBoxGeometry(w, h, d, seg, r) : new THREE.BoxGeometry(w, h, d));

  /* ---------- Base disque + colonne (pivot de rotation) ---------- */
  const baseProfile = [[0, 0], [.33, 0], [.342, .008], [.342, .022], [.33, .034], [.12, .036], [0, .036]].map(p => new THREE.Vector2(...p));
  add(root, hasStructure ? new THREE.Mesh(new THREE.LatheGeometry(baseProfile, 72), M.metal) : new THREE.Mesh(new THREE.CylinderGeometry(.342, .342, .036, 48), M.metal), 'base', hasStructure ? [0, 0, 0] : [0, .018, 0]);

  const swivel = new THREE.Group(); swivel.name = 'swivel'; root.add(swivel); pivots.swivel = swivel;
  const colProfile = [[0, .036], [.12, .036], [.115, .05], [.085, .085], [.078, .1], [.078, .33], [.094, .345], [.094, .38], [0, .38]].map(p => new THREE.Vector2(...p));
  add(swivel, hasStructure ? new THREE.Mesh(new THREE.LatheGeometry(colProfile, 48), M.metal) : new THREE.Mesh(new THREE.CylinderGeometry(.08, .08, .34, 32), M.metal), 'column', hasStructure ? [0, 0, 0] : [0, .2, 0]);

  /* ---------- Siège ---------- */
  const seat = new THREE.Group(); seat.name = 'seat'; seat.position.set(0, .38, 0); swivel.add(seat); pivots.lift = seat;
  add(seat, new THREE.Mesh(rbox(.5, .13, .52, .04), M.leather), 'seat-body', [0, .1, 0]);
  add(seat, new THREE.Mesh(rbox(.46, .075, .46, .035, 5), Q('quiltSeat')), 'seat-cushion', [0, .19, .01]);

  /* Panneaux latéraux en D (profil dans le plan z-y, extrudé en x) */
  function sidePanelGeo() {
    const s = new THREE.Shape();
    // z vers l'avant (+), y vers le haut ; coin arrière-haut à (-.27,.30), avant arrondi en grand rayon jusqu'au bas
    s.moveTo(-.27, .04); s.lineTo(-.27, .29); s.quadraticCurveTo(-.27, .32, -.24, .32);
    s.lineTo(.17, .32); s.quadraticCurveTo(.25, .32, .25, .24);
    s.lineTo(.25, .02); s.bezierCurveTo(.25, -.16, .12, -.21, -.02, -.21);
    s.bezierCurveTo(-.2, -.21, -.27, -.12, -.27, .04);
    const g = new THREE.ExtrudeGeometry(s, { depth: .07, bevelEnabled: hasForm, bevelThickness: .018, bevelSize: .018, bevelSegments: 4, curveSegments: 28 });
    g.rotateY(-Math.PI / 2); g.translate(.035, 0, 0);
    // UV : coordonnées z-y en mètres -> répéter ~ 1 texture / 0,5 m
    const p = g.attributes.position, uv = g.attributes.uv;
    for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getZ(i) + .3) * 2, (p.getY(i) + .25) * 2);
    return g;
  }
  const panelGeo = hasStructure ? sidePanelGeo() : new THREE.BoxGeometry(.07, .5, .52);
  [-1, 1].forEach(sx => {
    const panel = add(seat, new THREE.Mesh(panelGeo, hasStructure ? [Q('quiltSide'), M.leather] : Q('quiltSide')), sx < 0 ? 'side-panel-L' : 'side-panel-R', [sx * .285, .02, 0]);
    /* Accoudoir : montant capitonné + coussin */
    const arm = new THREE.Group(); arm.name = sx < 0 ? 'armrest-L' : 'armrest-R'; arm.position.set(sx * .285, .27, 0); seat.add(arm);
    add(arm, new THREE.Mesh(rbox(.075, .12, .09, .02), Q('quiltPost')), 'armrest-post', [0, .05, .01]);
    add(arm, new THREE.Mesh(rbox(.1, .065, .5, .028), M.leather), 'armrest-pad', [0, .13, .0]);
    if (hasStructure) add(arm, new THREE.Mesh(new THREE.BoxGeometry(.068, .008, .1), M.chrome), 'armrest-plate', [0, .166, .17]);
  });

  /* ---------- Dossier (pivot d'inclinaison à l'arrière du siège) ---------- */
  const recline = new THREE.Group(); recline.name = 'backrest'; recline.position.set(0, .2, -.24); recline.rotation.x = -.24; seat.add(recline); pivots.recline = recline;
  function backShape(w0, w1, h, rTop) { // plus large aux épaules
    const s = new THREE.Shape();
    s.moveTo(-w0 / 2, 0); s.lineTo(w0 / 2, 0); s.lineTo(w1 / 2, h - rTop);
    s.quadraticCurveTo(w1 / 2, h, w1 / 2 - rTop, h); s.lineTo(-w1 / 2 + rTop, h); s.quadraticCurveTo(-w1 / 2, h, -w1 / 2, h - rTop); s.closePath();
    return s;
  }
  const backGeo = hasStructure
    ? new THREE.ExtrudeGeometry(backShape(.5, .56, .47, .1), { depth: .1, bevelEnabled: hasForm, bevelThickness: .03, bevelSize: .03, bevelSegments: 5, curveSegments: 16 })
    : new THREE.BoxGeometry(.54, .47, .12);
  if (!hasStructure) backGeo.translate(0, .235, .06);
  add(recline, new THREE.Mesh(backGeo, M.leather), 'backrest-shell', [0, 0, -.1]);
  if (hasStructure) {
    // panneau capitonné inférieur avec bord supérieur en V
    const q = new THREE.Shape();
    q.moveTo(-.215, .06); q.lineTo(.215, .06); q.lineTo(.235, .3); q.lineTo(0, .23); q.lineTo(-.235, .3); q.closePath();
    const qg = new THREE.ExtrudeGeometry(q, { depth: .012, bevelEnabled: hasForm, bevelThickness: .01, bevelSize: .01, bevelSegments: 3 });
    const p = qg.attributes.position, uv = qg.attributes.uv;
    for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) + .25) * 2, p.getY(i) * 2);
    add(recline, new THREE.Mesh(qg, [Q('quiltBack'), M.leather]), 'backrest-quilt', [0, 0, .028]);
    // passepoil le long du V
    const pip = new THREE.CatmullRomCurve3([[-.245, .305, .05], [0, .235, .052], [.245, .305, .05]].map(v => new THREE.Vector3(...v)), false, 'catmullrom', 0);
    add(recline, new THREE.Mesh(new THREE.TubeGeometry(pip, 40, .006, 8), M.leather), 'v-seam');
    // bombé de la partie lisse supérieure
  }
  /* Appuie-tête */
  const head = new THREE.Group(); head.name = 'headrest'; head.position.set(0, .52, -.03); recline.add(head); pivots.headrest = head;
  add(head, new THREE.Mesh(rbox(.28, .11, .1, .04), M.leather), 'headrest-pad', [0, .04, 0]);
  if (hasStructure) add(head, new THREE.Mesh(new THREE.CylinderGeometry(.008, .008, .08, 12), M.chrome), 'headrest-rod', [0, -.03, -.02]);

  /* ---------- Repose-jambes (pivot à l'avant du siège) ---------- */
  const legrest = new THREE.Group(); legrest.name = 'legrest'; legrest.position.set(0, .1, .265); legrest.rotation.x = .06; seat.add(legrest); pivots.legrest = legrest;
  [-1, 1].forEach(sx => add(legrest, new THREE.Mesh(rbox(.235, .36, .13, hasForm ? .06 : 0, 6), M.leather), sx < 0 ? 'legrest-roll-L' : 'legrest-roll-R', [sx * .114, -.18, -.01]));
  /* Repose-pieds rainuré + patte */
  const foot = new THREE.Group(); foot.name = 'footplate'; foot.position.set(0, -.345, .03); foot.rotation.x = -.06; legrest.add(foot);
  add(foot, new THREE.Mesh(rbox(.44, .022, .3, .008, 2), M.metal), 'footplate-plate', [0, 0, .15]);
  if (hasStructure) {
    for (let i = -3; i <= 3; i++) add(foot, new THREE.Mesh(new THREE.BoxGeometry(.012, .006, .2), M.metal), 'footplate-groove', [i * .055, .013, .13]);
    const legH = .08;
    add(foot, new THREE.Mesh(new THREE.CylinderGeometry(.011, .011, legH, 14), M.metal), 'footplate-leg', [0, -legH / 2, .27]);
    add(foot, new THREE.Mesh(new THREE.CylinderGeometry(.022, .026, .014, 20), M.metal), 'footplate-foot', [0, -legH, .27]);
    // charnière chromée
    [-1, 1].forEach(sx => add(foot, new THREE.Mesh(new THREE.CylinderGeometry(.009, .009, .012, 12), M.chrome), 'hinge-bolt', [sx * .17, .005, .0], [0, 0, Math.PI / 2]));
  }

  /* ---------- Quincaillerie chromée ---------- */
  if (hasStructure) {
    // levier en J sur la face extérieure du panneau gauche
    const lever = new THREE.CatmullRomCurve3([[0, .24, .02], [0, .06, .02], [0, -.02, .03], [.0, -.035, .06], [0, -.02, .085]].map(v => new THREE.Vector3(...v)));
    const lev = new THREE.Group(); lev.name = 'recline-lever'; lev.position.set(-.345, .0, -.02); seat.add(lev); pivots.lever = lev;
    add(lev, new THREE.Mesh(new THREE.TubeGeometry(lever, 48, .007, 10), M.chrome), 'lever-rod');
    add(lev, new THREE.Mesh(new THREE.SphereGeometry(.014, 16, 12), M.chrome), 'lever-tip', [0, .245, .02]);
    add(lev, new THREE.Mesh(new THREE.CylinderGeometry(.018, .018, .014, 24), M.chrome), 'lever-knob', [-.006, -.02, .085], [0, 0, Math.PI / 2]);
    // tige de pompe hydraulique, du pied de colonne vers le dessous du siège (côté gauche avant)
    const pump = new THREE.CatmullRomCurve3([[-.07, .07, .06], [-.13, .2, .12], [-.17, .35, .17]].map(v => new THREE.Vector3(...v)));
    add(swivel, new THREE.Mesh(new THREE.TubeGeometry(pump, 24, .008, 10), M.chrome), 'pump-arm');
    add(swivel, new THREE.Mesh(new THREE.CylinderGeometry(.015, .015, .02, 16), M.chrome), 'pump-pivot', [-.07, .07, .06], [0, 0, Math.PI / 2]);
  }

  return {
    group: root, pivots, materials: M,
    dispose() { root.traverse(o => { if (o.geometry) o.geometry.dispose(); }); Object.values(M).forEach(m => { if (!m.dispose) return; ['map', 'normalMap', 'roughnessMap', 'aoMap'].forEach(k => m[k] && m[k].dispose()); m.dispose(); }); }
  };
}

/* ---------- Mise en scène de couverture ---------- */
const scene3d = document.getElementById('scene');
const canvas = document.getElementById('chaise');
const repere = document.getElementById('repere');
const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
const tactile = matchMedia('(pointer: coarse)').matches;

/* Vues de caméra par service : [azimut, inclinaison], et la pièce de la chaise qu'on pointe */
const VUES = [
  { vue: [.55, .98], piece: 'headrest-pad', dir: [0, 1, .4] },     // Coupes femme : l'appuie-tête
  { vue: [2.6, 1.12], piece: 'backrest-shell', dir: [0, .2, -1] }, // Couleur : le dossier
  { vue: [-.4, .92], piece: 'seat-cushion', dir: [0, 1, .3] },     // Coupes homme : le siège
  { vue: [-1.45, 1.05], piece: 'armrest-pad', dir: [0, 1, 0] },    // Dégradés : l'accoudoir
];
const REPOS = [.62, 1.2];

let renderer = null;
try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' }); } catch (e) { renderer = null; }

if (!renderer) {
  canvas.hidden = true;
  document.body.classList.add('pret');
} else {
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), .04).texture;
  scene.environmentIntensity = 1;

  /* Lumière de jour : grande source douce en haut à droite, débouchage chaud par le fond rouge */
  const cle = new THREE.DirectionalLight(0xffffff, 2.6);
  cle.position.set(2.2, 3.6, 2.4); cle.castShadow = true;
  cle.shadow.mapSize.set(2048, 2048); cle.shadow.bias = -.0004; cle.shadow.radius = 8;
  Object.assign(cle.shadow.camera, { left: -1.2, right: 1.2, top: 1.2, bottom: -1.2, near: .5, far: 10 });
  scene.add(cle);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xe04a26, 1.1));
  const rebond = new THREE.DirectionalLight(0xffb59a, .9); rebond.position.set(-2.4, 1, -1.6); scene.add(rebond);

  const chaise = createBarberChair(THREE, RoundedBoxGeometry, { pass: 'material' });
  chaise.group.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  scene.add(chaise.group);
  chaise.group.updateMatrixWorld(true);
  const boite = new THREE.Box3().setFromObject(chaise.group);
  const centre = boite.getCenter(new THREE.Vector3());
  const rayon = boite.getSize(new THREE.Vector3()).length() / 2;

  /* Sol de studio : seulement l'ombre, teintée du rouge du fond */
  const sol = new THREE.Mesh(new THREE.CircleGeometry(rayon * 3, 64), new THREE.ShadowMaterial({ color: 0x5a1405, opacity: .42 }));
  sol.rotation.x = -Math.PI / 2; sol.position.y = boite.min.y + .001; sol.receiveShadow = true; scene.add(sol);

  const camera = new THREE.PerspectiveCamera(30, 1, .05, 50);
  const controles = new OrbitControls(camera, canvas);
  controles.target.copy(centre);
  controles.enableDamping = true; controles.dampingFactor = .08;
  controles.enablePan = false; controles.enableZoom = false;
  controles.minPolarAngle = .35; controles.maxPolarAngle = 1.45;
  controles.autoRotate = !reduit; controles.autoRotateSpeed = .7;
  /* Au doigt, la couverture doit défiler : la chaise tourne seule et au choix d'un service */
  if (tactile) { controles.enableRotate = false; canvas.style.touchAction = 'pan-y'; }
  else scene3d.classList.add('tournable');

  let DIST = rayon * 4;
  function placer(az, pol, d = DIST) {
    camera.position.set(centre.x + d * Math.sin(pol) * Math.sin(az), centre.y + d * Math.cos(pol), centre.z + d * Math.sin(pol) * Math.cos(az));
  }

  /* Points d'ancrage des services, posés sur la surface de chaque pièce */
  const ray = new THREE.Raycaster();
  const meshes = []; chaise.group.traverse(o => o.isMesh && meshes.push(o));
  VUES.forEach(p => {
    const obj = chaise.group.getObjectByName(p.piece);
    const b = new THREE.Box3().setFromObject(obj), c = b.getCenter(new THREE.Vector3());
    const d = new THREE.Vector3(...p.dir).normalize();
    ray.set(c.clone().addScaledVector(d, 2), d.clone().negate());
    const hit = ray.intersectObject(obj, true)[0];
    p.pos = hit ? hit.point.clone().addScaledVector(d, .012) : c;
  });

  let vol = null, actif = -1, minuterie;
  let visible = true, enCours = false, premier = true;
  function voler([az, pol]) {
    const s = new THREE.Spherical().setFromVector3(camera.position.clone().sub(centre));
    let da = az - s.theta; da = Math.atan2(Math.sin(da), Math.cos(da));
    vol = { t0: performance.now(), a0: s.theta, da, p0: s.phi, dp: pol - s.phi, r0: s.radius, dr: DIST - s.radius, duree: reduit ? 1 : 1200 };
    controles.autoRotate = false;
  }
  function reprendre() { clearTimeout(minuterie); if (!reduit && actif < 0) minuterie = setTimeout(() => { controles.autoRotate = true; }, 5000); }
  window.addEventListener('lf:service', e => {
    actif = e.detail;
    voler(actif < 0 ? REPOS : VUES[actif].vue);
    reprendre(); lancer();
  });
  controles.addEventListener('start', () => { controles.autoRotate = false; vol = null; clearTimeout(minuterie); });
  controles.addEventListener('end', reprendre);

  /* Cadrage : ordinateur, chaise à droite devant la manchette ; téléphone, chaise au centre */
  let portrait = null;
  function taille() {
    const w = scene3d.clientWidth, h = scene3d.clientHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h;
    const pt = w / h < .9;
    camera.fov = pt ? 34 : 30;
    if (pt) camera.setViewOffset(w, h, w * .04, h * .07, w, h);
    else camera.setViewOffset(w, h, -w * .17, -h * .06, w, h);
    camera.updateProjectionMatrix();
    if (pt !== portrait) {
      portrait = pt; DIST = rayon * (pt ? 7.4 : 4.2);
      if (!vol) placer(...(actif < 0 ? REPOS : VUES[actif].vue));
    }
    lancer();
  }
  new ResizeObserver(taille).observe(scene3d); taille();

  const v = new THREE.Vector3(), dirCam = new THREE.Vector3();
  function majRepere() {
    if (actif < 0) { repere.classList.remove('visible'); return; }
    const p = VUES[actif].pos;
    v.copy(p).project(camera);
    repere.style.transform = `translate(${(v.x * .5 + .5) * scene3d.clientWidth}px,${(-v.y * .5 + .5) * scene3d.clientHeight}px)`;
    dirCam.copy(p).sub(camera.position); const dist = dirCam.length();
    ray.set(camera.position, dirCam.normalize());
    const hit = ray.intersectObjects(meshes, false)[0];
    repere.classList.toggle('visible', !vol && !(hit && hit.distance < dist - .03));
  }

  function lancer() { if (visible && !document.hidden && !enCours) { enCours = true; requestAnimationFrame(boucle); } }
  new IntersectionObserver(es => { visible = es[0].isIntersecting; lancer(); }).observe(scene3d);
  document.addEventListener('visibilitychange', lancer);
  function boucle() {
    if (!visible || document.hidden) { enCours = false; return; }
    if (vol) {
      const k = Math.min(1, (performance.now() - vol.t0) / vol.duree), e = 1 - Math.pow(1 - k, 4);
      placer(vol.a0 + vol.da * e, vol.p0 + vol.dp * e, vol.r0 + vol.dr * e);
      if (k >= 1) vol = null;
    }
    controles.update();
    renderer.render(scene, camera);
    majRepere();
    if (premier) { premier = false; requestAnimationFrame(() => document.body.classList.add('pret', 'rendu')); }
    /* Immobile (mouvement réduit, rien à animer) : on s'arrête jusqu'au prochain geste */
    if (!vol && !controles.autoRotate && reduit) { enCours = false; return; }
    requestAnimationFrame(boucle);
  }
  controles.addEventListener('change', lancer);
}
