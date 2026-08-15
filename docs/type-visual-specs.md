# Borrel 35 — Per-type Visual Identity

> The **graffiti / anime** wall-of-tags, split into six characters. Each Kompaan
> _type_ (archetype) gets its own can of spray paint: one saturated hue, one ink
> that sits legibly on top, one deeper hover tone, and a look you could screen-print
> on a hoodie. This is the human-readable **source of truth** for the per-type
> colours; the machine-readable data lives in
> [`app/theme/type-themes.ts`](../app/theme/type-themes.ts) and **must match this
> file 1:1**.
>
> Types come from [`content/archetypes/index.ts`](../content/archetypes/index.ts)
> (read-only). The colour tokens come from
> [`app/theme/tokens.css`](../app/theme/tokens.css) and the theming _mechanism_
> from the [per-type theming contract](./design-system.md#per-type-theming-contract)
> (BORREL-4.1). A visual identity here only ever _points_ at those tokens — it
> never invents a new colour.

## How to read a spec

Each type below gives:

- **Appearance** — the character on the wall: what the tag/sticker/hero art looks like.
- **Defining traits** — the survey signature (from `content/archetypes`) that drives the vibe.
- **Colours** — the named hues and the **role** each plays, mapped to the three
  contract knobs: `--type-accent` (base), `--type-accent-strong` (deeper hover,
  reserved), `--type-accent-ink` (legible ink ON the accent).
- **Vibe** — the two-word energy, plus the mood.
- **Image direction** — an art brief for the hero / sticker illustration.

**Colour = token.** Every hue names a `--brand-*` token from `tokens.css`. The ink
is picked for **WCAG-AA** legibility on the accent (light accents wear `cocoa-deep`
ink; deep-jewel accents wear `cream`); measured ratios are noted per type. The
`-strong` hover tone deepens the accent toward the ink and is **reserved** by the
4.1 contract (declared, not yet wired to a semantic variable).

---

## 1. De Parkborrelprofessional — pop-gold

`id: parkborrelprofessional`

**Appearance.** A tall, unbothered giraffe in a hi-vis clipboard-yellow tag,
towering over the treeline with a rolled-up draaiboek like a marshal's baton. The
sticker version is a die-cut gold badge — thick ink outline, a little terras
parasol icon, "GEREGELD" stamped across it. Calm eyes, everything under control.

**Defining traits.** Natuurmens in hart en nieren (100% Natuur boven Stad); plant
álles (71%) en is dé organisator; terraskoning (71%) met een zwak voor een gala;
danst vanaf de zijlijn en gaat verantwoord naar huis.

**Colours.**

- **Base accent — pop-gold** (`--brand-giraffe`): the signature marker yellow-gold.
  It's the house pop, and the Parkborrelprofessional _owns_ it — the organiser wears
  the brand colour like a hi-vis vest.
- **Strong / hover — ochre** (`--brand-ochre`): the deeper pop the whole system
  already reserves for hover and spot-texture; the gold turned down one notch.
- **Ink — cocoa-deep** (`--brand-cocoa-deep`): near-black blue ink on the bright
  gold. Contrast ≈ **12.3:1** (AA/AAA, both text sizes).

**Vibe.** _Composed authority._ Sunlit, in-charge, slightly smug. The one adult in
the park who booked the good spot.

**Image direction.** Golden-hour cel-shade, hard shadow plane on one side. Giraffe
mid-shot from below so it towers; clipboard in hoof, one parasol and a claimed
picnic bench behind. Gold `giraffe-spots` texture bleeding off the top edge, thick
cocoa-deep marker outline, hard sticker drop-shadow.

---

## 2. De Festival-Flamingo — hot pink

`id: festival-flamingo`

**Appearance.** A neon flamingo on one leg mid-strut onto the dancefloor, glitter
on the feathers, a festival wristband stack up to the knee. The tag is loud cursive
pink with speed-lines trailing behind it — motion baked into the letters. Sticker:
"IK KOM ERAAN!!" in a spiky speech bubble.

**Defining traits.** Festivalbeest (100% Festival) en altijd op de dansvloer (83%);
spontaan en gek op een themaborrel; het "ik-kom-eraan"-liegbeest in de groepsapp;
sluit de avond af met eten.

**Colours.**

- **Base accent — hot flamingo pink** (`--brand-flamingo`): the loudest, warmest
  pop in the family. Pure dancefloor.
- **Strong / hover — deepened flamingo** (flamingo mixed toward `--brand-cocoa-deep`):
  a hotter, more saturated magenta-red for the pressed state.
- **Ink — cocoa-deep** (`--brand-cocoa-deep`): ink on the pink (matches the
  system's `--accent`/`--accent-foreground` pairing). Contrast ≈ **5.8:1** (AA).

**Vibe.** _Kinetic hype._ Loud, spontaneous, always-arriving-never-quite-here. The
group chat's favourite liar.

**Image direction.** Full anime speed-lines fanning out behind a mid-leap flamingo,
motion-blur wristbands. Hot-pink cel-shade with a white highlight rim. A dropped
snack (patatje) in the corner as a punchline. Aria-hidden `speed-lines` layer
angled up-right; cocoa-deep outline keeps it readable against the noise.

---

## 3. De Salmari-Soldaat — electric grape

`id: salmari-soldaat`

**Appearance.** A stone-faced salmiak-black liquorice soldier marching the city
grid, shot glass shouldered like a rifle, half-dissolving into a smoke cloud at the
edges — the disappear-trick, mid-vanish. The tag is a stencil-army wordmark in
electric purple; the sticker is a grape-coloured dog-tag reading "NOG ÉÉN."

**Defining traits.** Altijd op de dansvloer (100%) en echt een stadsmens (100%);
meester van de verdwijntruc en door en door spontaan; shots en het klassieke "nog
even één drankje"; kiest terras boven festival.

**Colours.**

- **Base accent — electric grape** (`--brand-liquorice`): the deepest, most
  saturated jewel in the set — salmiak liquorice turned into neon nightlife purple.
- **Strong / hover — deepened grape** (liquorice mixed toward `--brand-cocoa-deep`):
  a near-black-violet for the pressed state; the vanish completing.
- **Ink — cream** (`--brand-cream`): warm off-white on the dark grape. Contrast
  ≈ **7.6:1** (AA/AAA, both text sizes).

**Vibe.** _Deadpan stealth._ Disciplined, nocturnal, here-then-gone. Marches in,
evaporates out.

**Image direction.** Stencil / spray-through-a-cut-out look, hard-edged. Liquorice
soldier from the knees up dissolving into halftone smoke on the right third.
Electric-grape cel-shade over city-grid speed-lines. Cream stencil letters, thick
cocoa-deep outline. Keep it night-dark and severe.

---

## 4. De Lange Nachtbraker — electric indigo

`id: lange-nachtbraker`

**Appearance.** A long-necked night-owl-giraffe under a single streetlamp, half a
crescent moon behind the neck, eyes wide open while everyone else droops. The tag
is tall vertical lettering climbing a lamppost; the sticker is an indigo "03:00"
alarm-clock badge with the hands frozen.

**Defining traits.** Onverbeterlijke avondmens (88%); blijft hangen voor "nog even
één drankje" (77%); plant zijn avond strak en danst vanaf de zijlijn; festivalganger
als het uitkomt.

**Colours.**

- **Base accent — electric indigo** (`--brand-night`): deep blue-violet, the colour
  of 3 a.m. under a lamp. Cool, wide-awake, planned.
- **Strong / hover — deepened indigo** (night mixed toward `--brand-cocoa-deep`):
  midnight-blue for the pressed state.
- **Ink — cream** (`--brand-cream`): off-white on the indigo. Contrast ≈ **4.4:1** —
  meets AA for the bold, oversized on-accent display text (primary buttons are
  `font-black`; type names are display weight) and AA-large / UI-component contrast
  throughout; for small body copy on paper the ink-on-`cream` pairing is used instead.

**Vibe.** _Wired stillness._ Calm, vertical, endless. The last one talking, from the
edge of the dancefloor.

**Image direction.** Nocturne cel-shade, single warm lamp key-light against a cool
indigo field. Tall vertical composition — exaggerate the neck / the lamppost.
Crescent moon and a scatter of star-dots. Cream vertical lettering, cocoa-deep
outline, a faint `speed-lines` haze for the late-night blur.

---

## 5. De Verantwoordelijke Kompaan — acid green

`id: verantwoordelijke-kompaan`

**Appearance.** A friendly acid-green creature with a tiny watch on its wrist,
arm-in-arm with the vaste kliek, already glancing at the exit. The tag is a rounded,
approachable bubble script; the sticker is a green "OP TIJD THUIS" pin with a little
clock and a leaf.

**Defining traits.** Vroeg naar bed (83%) en gaat verantwoord naar huis; trouw aan
de vaste kliek; natuurmens met een voorliefde voor de feestborrel; de stille ghost
in de groepsapp.

**Colours.**

- **Base accent — acid green** (`--brand-park`): bright, natural, park-lawn green —
  the outdoorsy, wholesome pop of the set.
- **Strong / hover — deepened green** (park mixed toward `--brand-cocoa-deep`): a
  forest-deep green for the pressed state.
- **Ink — cocoa-deep** (`--brand-cocoa-deep`): ink on the bright green. Contrast
  ≈ **10.8:1** (AA/AAA, both text sizes).

**Vibe.** _Warm reliability._ Loyal, cheerful, quietly leaving. The friend who texts
"thuis!" so you don't worry.

**Image direction.** Sunny cel-shade, soft outdoor light. A small round-faced
character mid-wave, watch and leaf motifs, the vaste kliek as three friendly
silhouettes behind. Acid-green `giraffe-spots` reworked as leaf-blobs bleeding off
one corner, cocoa-deep outline, hard sticker shadow. Keep it approachable, not loud.

---

## 6. De Bedtijd-Baron — pop red

`id: bedtijd-baron`

**Appearance.** A regal pumpkin-orange-turning-scarlet baron pouring wine with one
hand and holding a pocket-watch with the other, mid-transformation at midnight —
half party-host, half tucked-in-early. The tag is a bold serif crest; the sticker is
a red wax-seal "23:59" medallion.

**Defining traits.** Onwrikbaar vroeg naar bed (100%); ochtendmens die tóch de
sfeermaker is; houdt van een kroegborrel met een glas wijn; danst het liefst vanaf de
zijlijn.

**Colours.**

- **Base accent — pop red** (`--brand-wine`): warm, rich pop red — spilled-wine,
  wax-seal, curtain-call red. Sociable but commanding.
- **Strong / hover — deepened wine** (wine mixed toward `--brand-cocoa-deep`): a
  darker burgundy for the pressed state.
- **Ink — cream** (`--brand-cream`): off-white on the red. Contrast ≈ **4.4:1** —
  meets AA for the bold, oversized on-accent display text (primary buttons are
  `font-black`; type names are display weight) and AA-large / UI-component contrast
  throughout; small body copy uses the ink-on-`cream` pairing instead.

**Vibe.** _Regal curfew._ Generous, theatrical, strict about bedtime. Runs the
borrel, then runs to bed.

**Image direction.** Theatrical cel-shade, warm key-light and a hard curtain-red
shadow plane. Baron half-lit as host, half-lit as sleeper; wine glass and pocket-
watch as the two focal props, clock at 23:59. Cream serif crest lettering, cocoa-deep
outline, wax-seal sticker shadow. Rich and a little pompous.

---

## Colour summary

| # | Type | id | Base accent (token) | Ink (token) | Contrast |
| - | ---- | -- | ------------------- | ----------- | -------- |
| 1 | De Parkborrelprofessional | `parkborrelprofessional` | pop-gold `--brand-giraffe` | cocoa-deep | ≈ 12.3:1 |
| 2 | De Festival-Flamingo | `festival-flamingo` | hot pink `--brand-flamingo` | cocoa-deep | ≈ 5.8:1 |
| 3 | De Salmari-Soldaat | `salmari-soldaat` | electric grape `--brand-liquorice` | cream | ≈ 7.6:1 |
| 4 | De Lange Nachtbraker | `lange-nachtbraker` | electric indigo `--brand-night` | cream | ≈ 4.4:1 |
| 5 | De Verantwoordelijke Kompaan | `verantwoordelijke-kompaan` | acid green `--brand-park` | cocoa-deep | ≈ 10.8:1 |
| 6 | De Bedtijd-Baron | `bedtijd-baron` | pop red `--brand-wine` | cream | ≈ 4.4:1 |

Each `-strong` hover tone deepens its base accent toward `--brand-cocoa-deep`
(pop-gold uses the sanctioned `--brand-ochre`). These values are mirrored exactly by
`app/theme/type-themes.ts`.
