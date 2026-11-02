---
name: Line Fortier Coiffure Elle & Lui
description: A daylight walk through the salon itself, rebuilt in 3D, with solid paper panels that stop at each place where the work happens.
colors:
  cuivre: "#b4441d"
  cuivre-fonce: "#973818"
  ecume: "#f2b49a"
  papier: "#f6f5f2"
  teinte: "#ebebe9"
  lac: "#1f1c1a"
  gris: "#5e5853"
  nuit: "#1a1614"
  nuit-carte: "#2a2421"
  sur-nuit: "#bdb4ab"
  blanc: "#ffffff"
  filet: "rgba(31, 28, 26, .16)"
  filet-clair: "rgba(246, 245, 242, .18)"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(40px, 4.6vw, 64px)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 62"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(32px, 5vw, 64px)"
    fontWeight: 900
    lineHeight: 0.95
    fontVariation: "'wdth' 75"
  numeral:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(28px, 2.6vw, 36px)"
    fontWeight: 900
    lineHeight: 1.05
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 112"
  subhead:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(17px, 1.4vw, 20px)"
    fontWeight: 700
    lineHeight: 1.3
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 800
    lineHeight: 1.3
  lede:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: 1.5
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 700
    lineHeight: 1
  label:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.14em"
rounded:
  focus: "4px"
  sm: "8px"
  field: "12px"
  card: "16px"
  call-card: "18px"
  panel-mobile: "20px"
  panel: "22px"
  pill: "999px"
spacing:
  gouttiere: "max(20px, env(safe-area-inset-left, 0px))"
  hh: "64px"
  hh-mobile: "58px"
  panel-pad: "clamp(24px, 2.6vw, 36px)"
  panel-pad-mobile: "22px"
  panel-width: "min(500px, 100%)"
  panel-width-contact: "min(560px, 100%)"
  stop: "190vh"
  stop-entree: "150vh"
components:
  button-cuivre:
    backgroundColor: "{colors.cuivre}"
    textColor: "{colors.blanc}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "52px"
  button-cuivre-hover:
    backgroundColor: "{colors.cuivre-fonce}"
  button-encre:
    backgroundColor: "{colors.lac}"
    textColor: "{colors.papier}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "52px"
  button-clair:
    backgroundColor: "transparent"
    textColor: "{colors.papier}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "52px"
  button-petit:
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "42px"
  panel:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.lac}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel-pad}"
    width: "{spacing.panel-width}"
  panel-nuit:
    backgroundColor: "{colors.nuit}"
    textColor: "{colors.papier}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel-pad}"
    width: "{spacing.panel-width-contact}"
  call-card:
    backgroundColor: "{colors.nuit-carte}"
    textColor: "{colors.papier}"
    typography: "{typography.numeral}"
    rounded: "{rounded.call-card}"
    padding: "18px 20px"
  tab:
    backgroundColor: "transparent"
    textColor: "{colors.gris}"
    rounded: "{rounded.pill}"
    height: "44px"
  tab-selected:
    backgroundColor: "{colors.lac}"
    textColor: "{colors.papier}"
  chip-type:
    backgroundColor: "transparent"
    textColor: "{colors.papier}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  chip-type-checked:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.lac}"
  input-field:
    backgroundColor: "{colors.nuit-carte}"
    textColor: "{colors.papier}"
    rounded: "{rounded.field}"
    padding: "0 14px"
    height: "52px"
  hotspot:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.lac}"
    rounded: "{rounded.pill}"
    padding: "0 16px 0 6px"
    height: "44px"
  hotspot-pressed:
    backgroundColor: "{colors.lac}"
    textColor: "{colors.papier}"
---

# Design System: Line Fortier Coiffure Elle & Lui

## Overview

**Creative North Star: "The Daylight Visit"**

The site is the salon itself, by day. A fixed WebGL scene rebuilds the real room (white walls, a grey painted-brick back wall with the sign, brown 30 cm floor tiles, two black quilted barber chairs marked Elle and Lui, bonnet dryers along the windows, moulded shell waiting chairs, big windows with sky and the boulevard behind). Scrolling walks the camera from the sidewalk through six stops: entrance, chairs, salon, waiting corner, counter, contact. At each stop one solid paper panel holds the words. The panel sits on the left or the right, and the camera shifts the room away from it.

Density is low: one panel per stop, about 500px wide, with long scroll between stops so the room carries the page. Everything in a panel is plain, matte paper with charcoal ink and one copper accent. The only dark surface is the contact panel (and the footer and mobile menu that extend it). The room stays in daylight even at the contact stop. One variable family, Archivo, carries every voice on its width axis. Section titles follow the house standard: three fitted uppercase lines, the second outlined and the third in copper, under a small copper kicker. The imagery is the rendered room. There are no salon photos, no video and no old logo.

**Key Characteristics:**
- A daylight 3D room fills the viewport; solid paper panels float over it, never glass.
- One typeface, many widths: Archivo variable (wdth 62 to 125, wght 100 to 900), self-hosted.
- Fitted three-line titles: solid, outlined, copper.
- Copper is the action colour: pill buttons, kicker, rules that fill, the call icon.
- Night lives only in the contact panel, the footer and the mobile menu.
- The phone number is tabular, never wraps, and is reachable from every viewport.

## Colors

A daylight paper palette: warm off-white paper and charcoal ink, one copper accent for action, a pale copper foam for accents on night, and a deep brown-black night kept for the contact panel.

### Primary
- **Salon Copper** (cuivre): every primary action (the pill buttons, the header "Rendez-vous", the mobile "Appeler"), the kicker and its 22px dash, the third title line, link underlines, FAQ chevrons, star fill, the filling line of the method timeline, the active carousel dot, the hotspot marker, the round call icon, the caret and the global focus outline. White on it measures 5.55:1, and it measures 5.09:1 as text on paper.
- **Copper Pressed** (cuivre-fonce): the hover fill of copper buttons (white on it 7.25:1). Never a resting colour.

### Secondary
- **Copper Foam** (ecume): copper's stand-in on night: the kicker, the third title line, link underlines, the active nav underline and reading-progress line in the dark header, the brand subline, the field focus and error border, the error message, chip focus rings. Also the text-selection colour. On night it measures 10.07:1.

### Neutral
- **Panel Paper** (papier): every daylight panel, the dialog, the hotspots, the loading and scroll-cue chips; text on night and on copper-free dark buttons.
- **Shop Tint** (teinte): the page body under the scene, the Elle/Lui tab track, review cards.
- **Charcoal Ink** (lac): all text on paper, the ink pill button, the selected tab, the pressed hotspot, the method step rings, the review initial. The header and mobile bar use it translucent (rgba(31, 28, 26, .82) and .9).
- **Soft Grey** (gris): secondary text on paper: notes, FAQ answers, unselected tabs (6.43:1 on paper).
- **Contact Night** (nuit): the contact panel, the footer, the full-screen mobile menu, and the dialog backdrop at 60%.
- **Night Card** (nuit-carte): the raised surface inside the night panel: the call card and the form fields. In the build this is a literal, not a `:root` property.
- **Night Muted** (sur-nuit): secondary text on night: call-card label, status, coordinates, consent, footer, inactive header links (8.8:1 on night).
- **Card White** (blanc): text and icon on copper only.
- **Hairline** (filet) and **Night Hairline** (filet-clair): 1px rules under section heads, between rate rows and FAQ items, behind the method timeline; on night, the borders of chips, fields and the copy button.

### Named Rules
**The Copper Acts Rule.** Copper marks what you can do or where you are: buttons, the kicker, underlines, the filling timeline, the active dot. It is never a panel or section fill.

**The Foam On Night Rule.** On night surfaces every copper role switches to Copper Foam. Copper text on night measures 3.24:1 and is not used. The copper call icon on the night card is a filled graphic with a white glyph, not text.

**The Night Is Contained Rule.** The world is light. Night is a panel, never the room: the contact stop keeps the 3D salon in daylight, and only the contact panel, footer and mobile menu turn dark.

## Typography

**Display Font:** Archivo (with Helvetica Neue, Arial, sans-serif), self-hosted variable woff2 in two unicode-range files, wght 100 to 900, wdth 62 to 125, `font-display: swap`.
**Body Font:** Archivo, same files.

**Character:** One grotesque made to speak in several voices by width alone: condensed black capitals stretched to fit for titles, extended black for the brand and the phone number, regular width for reading.

### Hierarchy
- **Display** (900, uppercase, line-height 0.88, -0.01em): the three-line fitted title in every panel. Each line starts at clamp(40px, 4.6vw, 64px) (52px on phones) and wdth 62. A script then sets its width between 62% and 125%, and its size if needed, so the line fills the panel column exactly. Line 1 is solid Ink, line 2 is outlined (2px stroke in Ink, Paper on night), line 3 is Copper (Foam on night).
- **Headline** (900, wdth 75, uppercase, line-height 0.95 to 1): the footer title at clamp(32px, 5vw, 64px), the mobile menu links at clamp(40px, 12vw, 64px), the dialog title at 32px. The Google score uses the same voice at 44px.
- **Numeral** (900, wdth 112, tabular, clamp(28px, 2.6vw, 36px), line-height 1.05): the phone number in the call card, clamp(22px, 7vw, 30px) on phones. The brand mark in the header uses 900 wdth 112 at 19px.
- **Subhead** (700, clamp(17px, 1.4vw, 20px), line-height 1.3, sentence case, wdth 100): the line inside the h1 under the fitted title ("Salon de coiffure mixte à Beauharnois").
- **Title** (800, 17 to 18px): FAQ questions, method step leads, the Elle/Lui tabs (800 17px, wdth 112, uppercase).
- **Lede** (500, 18px, line-height 1.5): the standfirst under each panel's title.
- **Body** (400, 17px, line-height 1.6): running text. Notes and small labels drop to 14px, legal and consent text to 13px.
- **Button** (700, 17px, line-height 1; 15px in the small pill).
- **Label** (700, 13px, uppercase, 0.14em): the kicker, preceded by a 22 x 2px rule in the same colour; the scroll cue uses the same voice. The brand subline is 600 12px wdth 87 at 0.12em.

### Named Rules
**The One Family Rule.** Every voice is Archivo. Contrast comes from width (wdth 62 to 125) and weight, never from a second typeface or a system display face.

**The Fitted Title Rule.** Every panel's title is exactly three lines, each fitted to the column width: solid, outlined, accent. Set it with the `.ajuste` fitting script; never with a fixed width or by hand.

**The Kicker Rule.** Per the user's house standard (site-3d-interactif-pme), each fitted title sits under one kicker: a short copper dash and a place or role in spaced capitals ("749, boulevard Cadieux", "Les deux chaises"). One kicker per panel, and it names the stop, not a marketing tag.

**The Tabular Phone Rule.** Phone numbers and durations are tabular and never wrap.

## Layout

The page is a stack of six tall stops (190vh, the entrance 150vh, the contact sized to content) over a fixed full-viewport canvas. Each stop holds one panel, aligned left or right (`droite`) with an outer margin of clamp(0px, 3vw, 48px) inside the gutters (max(20px, safe area)). On desktop the panel is sticky 24px under the 64px header, 26vh down the stop (the entrance sits just under the header), so it holds still while the camera travels. The 3D camera shifts the room away from whichever side the panel is on. The contact panel is not sticky and is wider (560px).

At 1020px and below the header's menu, phone link and small pill hide behind a burger that opens a full-screen night menu. At 760px and below the header is 58px. Stops drop their fixed heights, panels go full width and non-sticky, and each panel starts about 64vh down (the entrance 44vh) so the room shows above it. Panel padding becomes 22px and radius 20px, fields stack to one column, and the scroll cue hides. A sticky mobile call bar slides up from the bottom once the first viewport has passed, and the footer reserves 96px of padding for it.

## Elevation & Depth

Depth is real: the room is a lit 3D space, and the interface floats above it. Panels are opaque paper and lift with a soft, wide ambient shadow tinted Ink. Smaller floating chips (loading counter, scroll cue, hotspots) use tighter versions of the same shadow. The two chrome bars (header and mobile call bar) are the only translucent surfaces: Ink at 82% and 90% with a 14px backdrop blur, per the house standard. No hard offset shadows anywhere.

### The 3D world (salon.js, chaise-modele.js)
- **Room materials:** walls #f1efeb (roughness .9), ceiling #f7f6f3, scene background #eeebe6. The back wall is painted brick drawn on canvas (grey #a7a7a3 mortar, bricks around rgb(150-172, 151-173, 148-168), offset courses). The floor is brown 30 cm tiles (rgb(104-122, 70-82, 50-59) with grey #7b6f66 joints and a soft per-tile highlight, roughness .38). The counter has grey lambris panelling, there is a #9b9690 sidewalk, light wood #c7a47d, dark wood #4a3022, dark granite #2f2520, and products on the shelves in mixed colours. The windows show a painted outside view: sky #bcd8ee to #eaf2f6, trees, lawn and the boulevard.
- **Barber chairs:** procedural, two copies (Elle at z -0.6, Lui at z 1.9) facing mirrors. The upholstery is black hexagon-quilted capitonné (physical material #1a1a1a with a normal map, light sheen and clearcoat), with #151515 leather, chrome #e6e6e6 and a black lacquered base. A black #161616 round mat sits under each chair, and an Ink plaque reading ELLE or LUI sits above each mirror. On the chairs stop the chosen chair swivels three-quarters toward the visitor.
- **Waiting corner:** moulded one-piece shell chairs (black #161616, off-white #f1f0ec, black) on thin wood legs, and a light-wood coffee table with magazines.
- **Bonnet dryers:** two smooth black vinyl dryer chairs (never quilted) with copper-metal hoods #b07a45 (metalness .5) on chrome stems.
- **Lighting:** daylight. A hemisphere light (white sky, #8a6a55 ground, 1.3) and a warm sun (#fff4e6, 1.35) come in from the window side. Warm ceiling point lights (#fff6ea) and a RoomEnvironment reflection map (intensity .55) fill in, with ACES Filmic tone mapping at exposure .98 and sRGB output.
- **Shadows:** VSM soft shadows from the sun (2048 map, radius 10, 16 blur samples), so there are no stair-step edges. `autoUpdate` is off: the shadow map is recomputed only when a chair swivels. The render loop stops once the camera has been still for about 30 frames.
- **Light path (max-width 900px or coarse pointer):** pixel ratio capped at 1.5 (2 otherwise), no antialiasing, no shadow maps, mirrors as metal planes instead of live reflectors, and a single ceiling light at 6 instead of 9 + 5. Portrait screens widen the field of view from 52 to 66 degrees.
- **Fallback:** `demarrage.js` imports the scene module and, if it fails (or WebGL is missing), keeps the rendered poster `img/salon-entree.webp` in place (`sans-3d`). The poster also shows until the first frame paints, then fades over .8s.

### Shadow Vocabulary
- **Panel** (`box-shadow: 0 1px 2px rgba(31, 28, 26, .1), 0 18px 48px rgba(31, 28, 26, .16)`): every content panel.
- **Floating chip** (`box-shadow: 0 4px 14px rgba(31, 28, 26, .14)`; .12 for the scroll cue): the loading counter and the scroll cue.
- **Hotspot** (`box-shadow: 0 6px 18px rgba(31, 28, 26, .22)`): the Elle/Lui markers pinned to the chair seats.
- **Dialog** (`box-shadow: 0 24px 64px rgba(0, 0, 0, .3)`) over a night backdrop at 60%.

### Named Rules
**The Solid Panel Rule.** Content panels are opaque paper (or opaque night). Never put glass or blur behind words over the scene. Translucency belongs to the header and the mobile call bar alone.

**The Daylight Room Rule.** The 3D room is always lit by day, at every stop, including contact. Mood never comes from darkening the scene.

## Shapes

Soft, rounded objects floating over a hard-edged room. Panels have 22px corners (20px on phones), the call card 18px, review cards 16px, fields 12px, and the skip link 8px. Every button, tab track, tab, chip, hotspot, loading and scroll-cue chip is a full pill (999px). Icons, step numbers, carousel arrows and dots, the call icon, and the status light are circles. Rules are 1px hairlines; the kicker dash and the method timeline are 2px. The FAQ chevron is a 2.5px copper corner that turns open. Focus is a 3px outline offset 3px with 4px rounding.

## Components

### Buttons
Warm and direct: every action is a pill.
- **Shape:** full pill (999px), 52px tall, 0 24px; small variant 42px, 0 18px, 15px text; 48px in the mobile bar.
- **Copper (primary):** Salon Copper fill, white 700 17px text, often with a stroked phone icon or a trailing arrow. Used for the phone call and every "Rendez-vous" / "Prendre rendez-vous" / submit.
- **Ink (secondary):** Charcoal Ink fill, Paper text ("Entrer dans le salon", "Lire les avis sur Google").
- **Clear (on dark):** transparent with a 1.5px inset Paper ring, Paper text; the mobile bar's second action.
- **Hover / Focus:** with a fine pointer, copper deepens to Copper Pressed, ink to pure black, and the trailing arrow slides 4px right (.25s). Every button presses to scale(.97). Focus is a 3px Copper outline at 3px offset.

### Cards / Containers
- **Panel:** Panel Paper, 22px corners, clamp(24px, 2.6vw, 36px) padding, panel shadow. It fades and rises 28px into view over .9s, once. It opens with the section head: kicker, fitted title, then a 1px hairline 18px below.
- **Night panel:** the contact panel in Contact Night, with Foam accents, Paper outline strokes and Night Hairline rules.
- **Review card:** Shop Tint, 16px corners, 20px padding, an Ink initial disc, "Prénom N." and "Avis Google". Hidden until real review texts exist.

### Call Card (signature)
A whole-surface `tel:` link on the night panel: Night Card fill, 18px corners, a 54px copper disc with a white phone glyph and a slow pulse ring (2.4s), the "Appelez-nous directement" label in Night Muted, the number in the Numeral voice, and a live status line. A green dot (#5fd38a with a soft halo) shows when the salon is open, a muted dot when it is closed. Status is computed in America/Toronto. Hover lightens the fill (#352d29) and press scales to .98. Below it, the coordinates come with a pill "Copier" button and Foam-underlined links.

### Tabs (Elle / Lui)
A two-column pill track in Shop Tint with 5px inset. Tabs are 44px, 800 17px wdth 112 uppercase in Soft Grey. The selected tab fills with Ink and Paper text. Choosing a tab, or tapping its hotspot in the room, swings the camera to that chair. Below the tabs, the rate list is hairline-ruled rows with a tabular 800 duration at right.

### Chips (service type)
Radio pills on the night form, 44px, 1.5px Night Hairline border, 600 15px. The checked chip fills Paper with Ink text. Focus is a 3px Foam ring.

### Inputs / Fields
- **Style:** 52px tall, Night Card fill, 1.5px Night Hairline border, 12px corners, 600 16px Paper text; 700 14px label above.
- **Focus:** the border turns Copper Foam; no glow.
- **Error / Disabled:** invalid fields keep a Foam border and the message turns Foam; the disabled submit drops to 60% opacity with a progress cursor.

### Navigation
- **Header:** fixed 64px bar in translucent Ink with a 14px blur. Brand at left in 900 wdth 112 uppercase over a Foam 12px subline. Links are 600 15px in Night Muted; hover and current turn white, and current gets a 2px inset Foam underline. The phone and a small copper pill sit at right. A 2px Foam reading-progress line runs along the bottom edge.
- **Mobile:** at 1020px and below a burger (two bars that cross) opens a full-screen Contact Night menu of condensed uppercase links with a copper call pill at the foot.
- **Mobile call bar (signature):** at 760px and below, a fixed two-up bar in Ink at 90% with blur: copper "Appeler" and clear "Rendez-vous". It slides up from below (translateY 110% to 0, .3s) after 80% of the first viewport has scrolled.

### Hotspots (signature)
Paper pills pinned in screen space to each barber chair seat: a 32px copper target dot and an 800 15px uppercase name (ELLE, LUI), with the hotspot shadow. They show only on the chairs stop, hide when they would sit under the panel, and turn Ink when pressed.

### Method Timeline
A numbered list of three steps. A 2px Hairline track runs behind 32px Paper discs ringed in Ink, and a Copper line fills down the track as the visitor scrolls (fully filled under reduced motion).

### FAQ
Hairline-ruled `details` rows with an 800 18px question and a Copper chevron that rotates open (.25s). Answers are in Soft Grey, and phone links in them are bold Ink.

### Motion
One easing, `cubic-bezier(.22, .8, .24, 1)`, for every transition. Panels reveal over .9s, button press takes .16s, colour changes take .2s, the arrow nudge .25s, and the mobile bar .3s. The camera eases between stops with a smoothstep over the middle 80% of each stop, then damps toward the target. With a fine pointer it drifts slightly with the mouse. Reduced motion removes every transition and animation, jumps the camera between stops, and shows panels at rest.

## Do's and Don'ts

### Do:
- **Do** put every block of words on one solid paper panel (Panel Paper, 22px corners, panel shadow) over the 3D room, aligned left or right, one panel per stop.
- **Do** head each panel with one copper kicker and a three-line fitted title: solid, outlined, copper (Foam on night).
- **Do** make every action a pill: Copper for the call and booking, Ink for moving on, Clear on dark.
- **Do** switch every copper role to Copper Foam on night surfaces.
- **Do** keep the phone number tabular, unwrapped, and one tap away on every viewport (header, hero, call card, mobile bar).
- **Do** change voice through Archivo's width axis: condensed and fitted for titles, extended for the brand and the number.
- **Do** keep the room in daylight at every stop and keep the lighter mobile 3D path (no shadow maps, pixel ratio 1.5, metal-plane mirrors, one ceiling light).
- **Do** use the single easing `cubic-bezier(.22, .8, .24, 1)` and honour reduced motion everywhere.

### Don't:
- **Don't** put glass, blur or translucency behind panel text; translucency is for the header and mobile bar only.
- **Don't** darken the room or make night the world; night is the contact panel, the footer and the mobile menu.
- **Don't** add a second typeface or fall back to a system display face.
- **Don't** set Copper text on night (3.24:1); use Copper Foam.
- **Don't** fill a panel or section with copper.
- **Don't** quilt the dryer chairs; capitonné belongs to the two barber chairs.
- **Don't** add hard offset shadows; elevation is the soft Ink-tinted ambient shadow.
- **Don't** introduce salon photos, video or the old logo, and never present renders as real work; the imagery is the rendered room.
- **Don't** invent reviews, ratings, years or services; the review carousel stays hidden until exact review texts are supplied, and every figure must be one the salon has confirmed.
