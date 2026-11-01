/* Charge la scène 3D ; si le module ne peut pas être chargé (réseau, navigateur), on garde l'affiche. */
import('./salon.js').catch(() => document.body.classList.add('sans-3d', 'fin-chargement'));
