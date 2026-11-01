# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, in this order:

1. **The site builder (owner of this repository).** Duplicates this template for each new small-business (PME) client in Québec, swaps in the client's colors, fonts, copy and photos, and deploys it. Their job: deliver a polished, distinctive scroll-driven site fast, without a build step.
2. **Visitors of each client site.** Local people in Québec, French-speaking (`fr-CA`), often on a phone, deciding whether to trust and contact a local business. Their situation and goal change with each client.

Client sectors are not fixed: the template must serve any kind of PME (trades and construction, restaurants and shops, tourism and leisure, professional services, and others).

## Product Purpose

A reusable starting point for "scroll-action" small-business websites: smooth scrolling (Lenis) and scroll-triggered animation (GSAP ScrollTrigger) already wired up, so each client site starts from a working, accessible, high-end base instead of from scratch. Success means a client site can be adapted and shipped quickly and still feels made for that client, not stamped out of a template.

## Positioning

Small Québec businesses get the kind of scroll-driven, immersive experience usually reserved for big brands, delivered as a plain static site: no framework, no build, hosted on Cloudflare Pages.

## Operating Context

- Per-client workflow (from README.md): change colors in `:root` of `style.css`, change fonts via the Google Fonts link in `index.html`, replace copy, replace the `.g1/.g2/.g3` gradient placeholders with real photos, and add `data-speed` or `class="reveal"` to animate elements.
- Local testing: open `index.html` or run `npx serve .`.
- Deployment: Cloudflare Pages, "Upload assets", drag the folder in.

## Capabilities and Constraints

- Static HTML/CSS/JS only: `index.html`, `style.css`, `main.js`. No build step; this is a hard constraint.
- Libraries loaded from jsDelivr: Lenis 1.x, GSAP 3.x with ScrollTrigger.
- Built-in sections: hero (line-by-line title reveal, parallax background), animated counters (`data-count`), pinned horizontal services track, word-by-word "approach" text, parallax gallery (`data-speed`), contact call to action.
- Language: French (Canada), `lang="fr-CA"`, numbers formatted with `fr-CA`.
- The primary visitor action **varies per client** (call / quote request, booking, visit in person, etc.) and is decided on each project. The current "Appeler maintenant" / "Soumission" pair is only the default.
- Undecided per client: sections kept or dropped, contact method, proof elements.

## Brand Commitments

None at the template level. Each client brings their own name, voice, colors, fonts and assets; "Votre Entreprise" and the current palette are placeholders, not a brand.

## Evidence on Hand

- No real client content in this repository: all copy is placeholder.
- The stats (25 years, 1,200 projects, 98 % satisfied) and "Valleyfield · Depuis 1998" are **placeholder figures**. Future work must never present them, or any invented testimonial, client, review or number, as real; each client site uses only the client's confirmed facts.
- No photos yet: the gallery uses gradient placeholders.

## Product Principles

1. **Each site belongs to its client.** The template is a mechanism, not a look; adapting it must produce a site that feels specific to that business.
2. **Stay static and simple.** Anything added must keep working with no build step and deploy by drag-and-drop on Cloudflare Pages.
3. **Motion serves the content.** Scroll effects exist to make the business's story memorable, never to slow down finding the phone number, hours or booking action.
4. **Real proof only.** Numbers, reviews and claims come from the client, or they don't appear.
5. **Easy to adapt.** Changes per client should stay concentrated in a few obvious places (tokens in `:root`, copy, images, data attributes).

## Accessibility & Inclusion

- `prefers-reduced-motion` must keep being respected: with reduced motion, Lenis and the animations are off and final values are shown.
- Visitors are largely on mobile; every section must work at phone width.
