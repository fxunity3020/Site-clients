---
version: 1
slug: "clients-line-fortier-index-html"
primary_target: "clients/line-fortier/index.html"
related_targets: []
---

# Surface brief: Line Fortier Coiffure Elle & Lui (site client)

Scope: one-page site for the salon at 749, boulevard Cadieux, Beauharnois. Mode: Persuade.
Audience: Beauharnois locals, women and men, families and long-time clients, mostly on phones in daylight.
Action: call the salon (450 429-2222). The callback form is secondary.
Proof on hand: 30+ years on boulevard Cadieux, 5,0 Google (60 avis), all from the previous version, to reconfirm. No review texts yet (ask the salon for screenshots). Services and durations are examples to confirm. Hours unknown.
Constraints: static HTML/CSS/JS, no build, Cloudflare Pages; light, never dark overall (user); keep the 3D barber chair (user); no salon photos, video or old logo (user); fr-CA; reduced motion respected. House standard: the user's own skill "site-3d-interactif-pme" (Quais 4 Saisons) is binding where it is explicit (Archivo only, 3-line fitted titles with kicker, max 7 sections, call card with live status, sticky mobile call bar, Loi 25 dialog); it overrides Impeccable defaults (including the kicker ban).
Supersedes: the "magazine" direction (commit 0cfbeca), replaced at the user's request.

## Direction contract

THESIS: The site is a daylight visit of the salon itself, rebuilt in 3D: the visitor walks in from boulevard Cadieux and the camera stops at each place where the salon's work happens. It refuses the category default of a hero photo over a row of service cards, and the dark luxe salon.

OWN-WORLD: The real room by day: white walls, a grey painted-brick back wall, brown 30 cm floor tiles, black capitonné chairs, bonnet dryers, Eames-style shell chairs, light-wood coffee table, big windows with daylight. Copper-red accent (#b4441d) for actions, charcoal ink, a deep brown-black night for the contact panel. Archivo only, uppercase condensed titles stretched to the panel width, line 2 in outline, line 3 in copper. Solid paper panels, never glass over the scene.

STORY: A neighbour recognises the room, sees the two chairs (Elle and Lui), learns the services and the 30 years, reads what the salon answers, and calls.

FIRST VIEWPORT: The camera stands on the sidewalk at the open front, looking through the room to the brick wall and its sign. A paper panel on the left holds the kicker, the fitted 3-line title (LINE FORTIER / ELLE & LUI / COIFFURE), the h1 line "Salon de coiffure mixte à Beauharnois", and two buttons: call 450 429-2222 (primary, copper) and "Entrer dans le salon". A scroll cue at the foot.

FORM: Salon 3D visit, pinned by the user over the roll; seed:14c4a39d1dba4d82 (direction pinned by the user over the roll). Signature interaction: scroll walks the camera between six stops (entrée from the sidewalk, chaises, salon, attente, comptoir, contact); on the chairs stop the Elle/Lui tabs and the hotspots pinned on each chair seat swing the camera to that chair and swivel it three-quarter toward the visitor. Capitonné belongs to the two barber chairs; the dryer chairs stay smooth black vinyl as in the real salon. The contact stop keeps the room in daylight (user: never too dark); the night lives only in the contact panel.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
