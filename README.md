# Lenis + GSAP — Modèle de départ

Modèle HTML statique pour sites « scroll-action » de PME : défilement fluide (Lenis) + animations au défilement (GSAP ScrollTrigger). Aucun build, prêt pour Cloudflare Pages.

## Ce qu'il contient
- **Héros** : titre qui monte ligne par ligne + fond en parallaxe
- **Chiffres** : compteurs animés (`data-count="25"`)
- **Services** : cartes en défilement horizontal épinglé
- **Approche** : texte qui s'illumine mot par mot
- **Galerie** : blocs en parallaxe (`data-speed="-0.15"`)
- **Contact** : appel à l'action
- Respecte `prefers-reduced-motion` (accessibilité)

## Utiliser pour un client
1. Changer les couleurs dans `:root` de `style.css`
2. Changer les polices (lien Google Fonts dans `index.html`)
3. Remplacer les textes, et les dégradés de `.g1/.g2/.g3` par de vraies photos
4. Ajouter `data-speed` ou `class="reveal"` à n'importe quel élément pour l'animer

## Tester localement
Ouvrir `index.html` dans le navigateur, ou : `npx serve .`

## Déployer
Cloudflare Pages → « Upload assets » → glisser le dossier.

## Crédits
- [Lenis](https://github.com/darkroomengineering/lenis) — darkroom.engineering (MIT)
- [GSAP](https://gsap.com) — GreenSock (gratuit, incluant ScrollTrigger)
