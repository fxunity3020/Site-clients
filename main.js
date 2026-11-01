/* Lenis + GSAP ScrollTrigger — modèle de départ */

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.getElementById("year").textContent = new Date().getFullYear();

/* 1. LENIS : défilement fluide synchronisé avec GSAP */
let lenis = null;
if (!reduceMotion) {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* Liens d'ancre (#services, #contact…) avec défilement fluide */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    lenis ? lenis.scrollTo(target, { offset: 0 }) : target.scrollIntoView();
  });
});

if (reduceMotion) {
  // Mouvement réduit : on affiche les chiffres finaux et on s'arrête là.
  document.querySelectorAll("[data-count]").forEach((el) => (el.textContent = el.dataset.count));
} else {

  /* 2. HÉROS : titre qui monte ligne par ligne */
  gsap.from(".hero__title .line > span", {
    yPercent: 110, duration: 1.2, ease: "power4.out", stagger: 0.12, delay: 0.2,
  });

  /* 3. PARALLAXE : tout élément avec data-speed */
  document.querySelectorAll("[data-speed]").forEach((el) => {
    const speed = parseFloat(el.dataset.speed);
    gsap.to(el, {
      yPercent: speed * 100, ease: "none",
      scrollTrigger: { trigger: el.closest("section"), start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  /* 4. APPARITIONS : éléments .reveal */
  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.from(el, {
      y: 40, opacity: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });

  /* 5. COMPTEURS animés */
  document.querySelectorAll("[data-count]").forEach((el) => {
    const obj = { v: 0 };
    gsap.to(obj, {
      v: +el.dataset.count, duration: 2, ease: "power2.out",
      onUpdate: () => (el.textContent = Math.round(obj.v).toLocaleString("fr-CA")),
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });

  /* 6. SERVICES : défilement horizontal épinglé */
  const track = document.querySelector(".services__track");
  gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: ".services",
      pin: ".services__pin",
      start: "top top",
      end: () => "+=" + (track.scrollWidth - window.innerWidth),
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  /* 7. APPROCHE : le texte s'illumine mot par mot */
  const text = document.querySelector(".approach__text");
  text.innerHTML = text.textContent.trim().split(/\s+/)
    .map((w) => `<span class="word">${w}</span>`).join(" ");
  gsap.to(".approach__text .word", {
    opacity: 1, stagger: 0.1, ease: "none",
    scrollTrigger: { trigger: ".approach", start: "top 70%", end: "bottom 60%", scrub: true },
  });
}
