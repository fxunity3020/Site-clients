---
name: Line Fortier Coiffure Elle & Lui
description: The salon's own hairstyle magazine from the waiting-room table, a copper-red cover and plain paper inside pages.
colors:
  rouge: "#e04a26"
  rouge-encre: "#b8381a"
  rouge-ombre: "#5a1405"
  jaune: "#ffd23a"
  papier: "#f3f4f2"
  blanc: "#ffffff"
  encre: "#151515"
  encre-douce: "#4d4a47"
  filet: "rgba(21, 21, 21, .18)"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(76px, 15.2vw, 270px)"
    fontWeight: 900
    lineHeight: 0.8
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(38px, 6vw, 92px)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 100"
  coverline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(30px, 3.3vw, 50px)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 75"
  numeral:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(30px, 3.2vw, 46px)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 112"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(21px, 1.9vw, 26px)"
    fontWeight: 800
    lineHeight: 1.15
  lede:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(19px, 1.6vw, 23px)"
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.05em"
rounded:
  none: "0px"
  pill: "999px"
spacing:
  marge: "max(16px, 4vw)"
  page: "min(1240px, 100% - 2 * max(16px, 4vw))"
  page-top: "clamp(80px, 11vw, 150px)"
  gouttiere: "clamp(24px, 5vw, 80px)"
  folio-top: "clamp(56px, 8vw, 100px)"
components:
  button-call:
    backgroundColor: "{colors.encre}"
    textColor: "{colors.blanc}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "44px"
  button-call-large:
    backgroundColor: "{colors.encre}"
    textColor: "{colors.blanc}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "64px"
  price-box-call:
    backgroundColor: "{colors.blanc}"
    textColor: "{colors.encre}"
    typography: "{typography.numeral}"
    rounded: "{rounded.none}"
    padding: "12px 18px"
  price-box-call-hover:
    backgroundColor: "{colors.jaune}"
  reply-card-call:
    backgroundColor: "{colors.blanc}"
    textColor: "{colors.encre}"
    typography: "{typography.numeral}"
    rounded: "{rounded.none}"
    padding: "14px 20px"
  reply-card-call-hover:
    backgroundColor: "{colors.jaune}"
  button-submit:
    backgroundColor: "{colors.jaune}"
    textColor: "{colors.encre}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "52px"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.encre}"
    rounded: "{rounded.none}"
    padding: "0 2px"
    height: "52px"
  coverline:
    backgroundColor: "transparent"
    textColor: "{colors.encre}"
    typography: "{typography.coverline}"
    padding: "10px 14px 10px 0"
  coverline-active:
    textColor: "{colors.blanc}"
  sticker:
    backgroundColor: "{colors.jaune}"
    textColor: "{colors.encre}"
    width: "clamp(150px, 13vw, 200px)"
  salon-sheet:
    backgroundColor: "{colors.blanc}"
    textColor: "{colors.encre}"
    rounded: "{rounded.none}"
    padding: "clamp(22px, 2.6vw, 34px)"
---

# Design System: Line Fortier Coiffure Elle & Lui

## Overview

**Creative North Star: "The Waiting-Room Magazine"**

The site is set like an issue of the salon's own hairstyle magazine. The first viewport is a full-bleed cover on a saturated copper-red seamless: a white, extended-black masthead, black condensed coverlines down the left, the black leather barber chair as cover star, a yellow round sticker, and the phone number boxed where a cover price would sit. Past the cover, the inside pages are plain, matte paper with black ink and red folios, ruled like print rather than boxed like an app. The back cover returns to red.

Density is editorial: very large display type against generous page margins, then tight ruled lists (rates, table of contents, letters) with hairline rows. One variable family, Archivo, carries every voice by changing width, from 62% condensed numerals to 125% extended mastheads. The world is light only. Imagery is the rendered 3D chair and its renders; there are no salon photos.

**Key Characteristics:**
- Copper-red cover and back cover; flat light paper for every inside page.
- One typeface, many widths: Archivo variable (wdth 62 to 125, wght 100 to 900).
- Print devices used natively: folios, running head, drop cap, pull quote, double-page gutter, dotted leaders, tear-out reply card with a dashed cut line.
- Yellow is the answer colour: the sticker, and the hover state of every call surface.
- The phone number is always the loudest actionable element on the screen.

## Colors

A two-paper palette: a hot copper-red field and a cool near-white page, both printed in one near-black ink, with yellow kept for the sticker and the answer.

### Primary
- **Copper Seamless Red** (rouge): the cover and back-cover field, the browser theme colour, and red rules and underlines on paper (the 6px rule over the pull quote, link underlines, the active nav underline, the focused field's bottom border). It is a field and a rule colour, never text on paper.
- **Folio Red** (rouge-encre): every red letterform on paper: section titles of the table of contents and reply card, the giant "Elle" / "Lui", the drop cap, folio numerals, guillemets, letter signatures, field labels in the salon sheet, the running-head title. Also the error colour.
- **Studio Floor Shadow** (rouge-ombre): never painted as a surface. It tints shadows that fall on the red cover (masthead text shadow, sticker drop shadow, price-box shadow, the chair's ground shadow and the cover's floor gradient).

### Secondary
- **Sticker Yellow** (jaune): the round 24-point sticker, the active-coverline dot and the chair hotspot marker, text selection, the submit button, and the hover fill of the price box and reply-card call box.

### Neutral
- **Inside Paper** (papier): the page colour of everything between the covers, the running header, the figure caption strip. Flat and matte.
- **Card White** (blanc): objects laid on a page: the price box on the cover, the salon sheet, the reply card. Also white type on red (masthead, back-cover title, active coverline).
- **Ink** (encre): all body and headline text, the call buttons, the 1.5px rules between pages, input underlines, focus outlines.
- **Soft Ink** (encre-douce): secondary text: summary lines, captions, help text, letter answers, inactive running-head links.
- **Hairline** (filet): row dividers in lists, the double-page gutter line, the header's bottom edge, the dashed rule in the price box.

### Named Rules
**The Folio Red Rule.** Red text on paper is always Folio Red (5.3:1 on paper). Copper Seamless Red measures 3.7:1 on paper and is reserved for fields, rules and underlines.

**The White-On-Red Is Display Rule.** White type on the red field appears only at display and coverline sizes (4.1:1). Running text and small labels on red are Ink (4.5:1).

**The Yellow Answers Rule.** Yellow marks response: the sticker that answers a coverline, the hover of a call box, the submit button, the selected marker. It is never a section background.

## Typography

**Display Font:** Archivo (with Helvetica Neue, Arial, sans-serif), self-hosted variable woff2, wght 100 to 900, wdth 62 to 125.
**Body Font:** Archivo, same file.

**Character:** A single grotesque made to sound like a whole magazine by width alone: extended black for mastheads, condensed black capitals for coverlines, regular width for reading.

### Hierarchy
- **Display** (900, wdth 125, clamp(76px, 15.2vw, 270px), line-height 0.8): the cover masthead "Elle & Lui". The same voice at clamp(96px, 15vw, 230px) sets the giant "Elle" and "Lui" of the double page, the drop cap (5.1em) and the back-cover title.
- **Headline** (900, wdth 100, clamp(38px, 6vw, 92px), line-height 0.92): one per inside page. The table of contents title widens to 125%.
- **Coverline** (900, wdth 75, uppercase, clamp(30px, 3.3vw, 50px), line-height 0.92): the service buttons on the cover; on phones clamp(21px, 5.6vw, 32px). The pull quote uses a related 800 / wdth 88 voice at clamp(30px, 3.4vw, 50px).
- **Numeral** (900, wdth 112, tabular, clamp(30px, 3.2vw, 46px), line-height 1): the phone number in the price box and reply card, the sticker's "30 ans". Table-of-contents page numbers condense to wdth 62 at clamp(56px, 6vw, 84px).
- **Title** (800, clamp(21px, 1.9vw, 26px), line-height 1.15 to 1.2): table-of-contents entries and reader-letter questions.
- **Lede** (500, clamp(19px, 1.6vw, 23px), line-height 1.4, max 32ch): the standfirst under each half of the double page.
- **Body** (400, 18px, line-height 1.55; 1.6 in two-column feature text): running text, max 46 to 70ch.
- **Label** (700, 13px, uppercase, 0.04 to 0.06em): the cover dateline, the call-box instruction, salon-sheet terms, form labels (14px). Folios are 13px 600 Soft Ink with a 15px 900 Folio Red page number.

### Named Rules
**The One Family Rule.** Every voice is Archivo; contrast comes from width (wdth 62 to 125) and weight, never from a second typeface.

**The Tabular Phone Rule.** Phone numbers, durations and page numbers are tabular and never wrap.

## Layout

The cover is a full-viewport grid (5fr / 7fr columns; edition line and contents nav across the top, masthead full width, coverlines and price box stacked bottom-left, dateline ruled along the bottom). The chair sits absolutely positioned centre-right in front of the masthead; the sticker floats right, rotated -8deg. Below 900px the cover collapses to one column: the contents nav becomes a scrolling ruled strip, coverlines go to a 2-up grid without their one-line descriptions, and the price box stretches full width.

Inside pages share one measure (`page`: up to 1240px within the `marge`), open with `page-top` space, and close with a folio placed `folio-top` below the content. Consecutive pages are separated by a 1.5px Ink rule. Two-column structures (contents, double page, letters, reply card) use the `gouttiere` gap and collapse to one column under 900px; the double page draws a hairline gutter with a soft fold shadow at desktop only. Feature text sets in CSS columns (2 x 260px min, 40px gap). A running header slides in once the cover leaves the viewport (64px offset).

## Elevation & Depth

Pages are flat; depth belongs to objects placed on them. White objects (price box, salon sheet, reply card) cast soft, diffuse ambient shadows, tinted Studio Floor Shadow on the red cover and Ink on paper. The cover itself is lit like a studio seamless: a soft radial highlight upper-right and a floor shadow at the bottom. Rules, not shadows, do the structural work.

### Shadow Vocabulary
- **Cover object** (`box-shadow: 0 10px 28px rgba(90, 20, 5, .28), 0 2px 6px rgba(90, 20, 5, .18)`): the price box on red.
- **Paper object** (`box-shadow: 0 1px 2px rgba(21, 21, 21, .08), 0 12px 32px rgba(21, 21, 21, .08)`): the salon sheet; the reply card deepens the far layer to `0 14px 40px rgba(21, 21, 21, .1)`.
- **Running header** (`box-shadow: 0 1px 0 rgba(21, 21, 21, .18), 0 8px 24px rgba(21, 21, 21, .06)`).
- **Sticker** (`filter: drop-shadow(0 6px 10px rgba(90, 20, 5, .3))`).

### Named Rules
**The Flat Page Rule.** Inside pages are plain matte paper: no gloss, sheen, gradients or texture on the page itself. Only objects laid on it lift.

## Shapes

Print geometry: square corners on every paper object, field and the submit button. The only rounded forms are the pill-shaped Ink call buttons, the circular sticker (a 24-point star burst), and small yellow dots ringed in Ink. Borders are rules: 1px hairlines between rows, 1.5px Ink between pages and under the cover dateline, 2 to 3px Ink for emphasis (input underline, salon-sheet heading, call box), 6px red over the pull quote. Dotted leaders join a service to its duration; a 2px dashed outline offset 10px, with a scissors mark, is the reply card's cut line.

## Components

### Buttons
Confident and print-made: the call is a black pill, the submit is a yellow stamp.
- **Shape:** call buttons are pills (999px); the submit button is square (0).
- **Call (button-call):** Ink fill, white 800 text with a stroked phone icon, 44px in the running header, 64px large variant.
- **Submit (button-submit):** Sticker Yellow fill, 2px Ink border, 800 17px Ink text, 52px tall.
- **Hover / Focus:** call deepens to pure black and lifts 1px; submit lightens and lifts 1px; both press to scale(.97). Focus everywhere is a 3px Ink outline at 3px offset.

### Call Boxes (signature)
- **Price box** on the cover: a white box with a label line, the phone number in the Numeral voice, a decorative barcode generated from the phone digits, and a dashed-ruled "call me back" link. Hover fills the call area with Sticker Yellow.
- **Reply-card call box:** white with a 2.5px Ink border, same Numeral phone; hover fills yellow.

### Cards / Containers
- **Corner Style:** square (0).
- **Background:** Card White on Inside Paper, or on the red cover.
- **Shadow Strategy:** see Elevation (cover object or paper object).
- **Border:** the reply card adds the dashed cut-line outline; the salon sheet heads with a 3px Ink rule and hairline rows.
- **Internal Padding:** clamp(22px, 2.6vw, 34px) for the salon sheet, clamp(28px, 4.5vw, 64px) for the reply card.

### Inputs / Fields
- **Style:** transparent, square, a single 2px Ink bottom rule, 600 19px text, 52px tall; uppercase 14px label above.
- **Focus:** the rule turns Copper Seamless Red over a 5% red wash.
- **Error / Disabled:** invalid fields take a Folio Red rule and a Folio Red message; the disabled submit drops to 55% opacity.

### Navigation
- **Cover contents nav:** 600 15px Ink links that underline with a 1.5px inset rule on hover.
- **Running header:** paper bar, red extended-black title at left, 600 15px Soft Ink links; the current section turns Ink with a 2px red underline. Below 900px the links hide and only the title and call pill remain.

### Coverlines (signature)
Condensed black uppercase service names on the red cover, each a toggle button with a one-line description. Hover slides the line 6px right and turns the name white; the pressed coverline stays white with a yellow dot, turns the 3D chair to its part, and the sticker answers with the service's durations.

### Sticker (signature)
A 24-point yellow star burst rotated -8deg with a soft red-shadow drop, set in Numeral and Coverline voices; its text pops in (scale .9 to 1) whenever it answers.

### Ruled Lists
Table of contents (condensed Folio Red page numbers beside 800 titles), rates (service, dotted leader, tabular duration) and reader letters (details rows ruled 1.5px Ink with a red chevron) all share hairline or Ink rules and no fills.

### Motion
One easing, `cubic-bezier(.16, 1, .3, 1)`, for every transform; the cover assembles once (chair fades up, sticker scales in after .5s). Reduced motion removes transitions and animation and shows the cover at rest.

## Do's and Don'ts

### Do:
- **Do** set every inside page on flat Inside Paper (#f3f4f2) with Ink text, and reserve Copper Seamless Red fields for the cover and back cover (and figure plates).
- **Do** use Folio Red for any red letterform on paper; use Copper Seamless Red only for fields, rules and underlines.
- **Do** keep the phone number tabular, unwrapped, and the loudest action on every viewport.
- **Do** separate content with rules (1px hairline rows, 1.5px Ink between pages) rather than tinted boxes.
- **Do** change voice through Archivo's width axis: extended for mastheads, condensed for coverlines and numerals.
- **Do** close each inside page with a folio: Folio Red page number, Soft Ink running title.

### Don't:
- **Don't** describe or render the inside pages as glossy: no sheen, gloss gradient or texture on paper.
- **Don't** add a second typeface or fall back to a system display face.
- **Don't** put white text on red below coverline size, or Copper Seamless Red text on paper.
- **Don't** round paper objects or fields; the pill belongs to the Ink call button alone.
- **Don't** use yellow as a section background; it marks the sticker and responses.
- **Don't** go dark, and don't introduce salon photos, video or the old logo; imagery is the rendered chair.
- **Don't** add hard offset shadows or small uppercase kickers above headlines; the magazine's labels are its dateline, folios and call-box lines.
