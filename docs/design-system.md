# Borrel 35 — Design System

> The playful, bold, **vertical**, giraffe-motif visual language for the Borrel
> 35 site. Tuned to the six Kompaan archetypes (see
> [`docs/archetypes.md`](./archetypes.md) and
> [`content/archetypes/index.ts`](../content/archetypes/index.ts)) so the
> archetype feature and the rest of the site read as one thing.
>
> **Source of truth:** the tokens live in
> [`app/theme/tokens.css`](../app/theme/tokens.css) (raw palette + scales) and are
> applied to the shadcn base variables in
> [`app/globals.css`](../app/globals.css). A living demonstration renders in
> [`app/theme/design-system-preview.tsx`](../app/theme/design-system-preview.tsx).

## Design principles

1. **Vertical before horizontal.** The giraffe is tall; so is the layout. Stack
   content in single columns, lead with oversized numbers and headings, and use
   generous vertical rhythm between sections.
2. **Bold-first.** Headings are black-weight and tightly tracked. The page should
   feel confident and loud, not corporate.
3. **Warm savanna.** Cream paper, sand surfaces and cocoa ink — never pure white
   or pure black. Giraffe gold is the one signature accent.
4. **One accent per archetype.** The chart ramp _is_ the archetype accent family,
   so a data-viz colour and an archetype card always agree.
5. **Every value is a token.** Components consume tokens (CSS custom properties or
   the generated Tailwind utilities) — no ad-hoc hex, px, or one-off colours.

## Layering on shadcn

The shadcn base theme (BORREL-1.3) defines the semantic variables
(`--background`, `--primary`, `--card`, `--chart-*`, `--radius`, …). This system
does **not** replace it — it:

- defines a raw brand layer in `app/theme/tokens.css` (`--brand-*`, `--fs-*`,
  `--lh-*`, `--ls-*`, `--fw-*`, `--stack-*`, `--radius-pill`), and
- **remaps** the shadcn semantic variables to those brand tokens in
  `app/globals.css` (`:root` = light/savanna, `.dark` = night-savanna).

Because the mapping is at the semantic-variable level, every shadcn component
(Button, Card, …) inherits the giraffe palette for free.

## Palette

Colours are authored in **OKLCH** for perceptual consistency in light and dark.

### Savanna neutrals

| Token           | Role                        | Tailwind      |
| --------------- | --------------------------- | ------------- |
| `--brand-cream` | Page paper / background     | `bg-cream`    |
| `--brand-sand`  | Muted surfaces, secondary   | `bg-sand`     |
| `--brand-tan`   | Borders, hairlines          | `border-tan`  |
| `--brand-cocoa` | Ink / text (giraffe patch)  | `text-cocoa`  |
| `--brand-cocoa-deep` | Darkest ink, dark bg   | —             |

### Giraffe gold (signature)

| Token             | Role                | Tailwind       |
| ----------------- | ------------------- | -------------- |
| `--brand-giraffe` | Primary accent, CTA | `bg-giraffe`   |
| `--brand-ochre`   | Deeper gold / hover, spot texture | `bg-ochre` |

### Archetype accent family

One hue per cluster, in the same order as the archetypes and the `--chart-*`
ramp:

| Token              | Archetype family                       | Tailwind        |
| ------------------ | -------------------------------------- | --------------- |
| `--brand-giraffe`  | De Parkborrelprofessional (gold)       | `bg-giraffe`    |
| `--brand-park`     | De Verantwoordelijke Kompaan (natuur)  | `bg-park`       |
| `--brand-flamingo` | De Festival-Flamingo (festival)        | `bg-flamingo`   |
| `--brand-night`    | De Lange Nachtbraker (nacht)           | `bg-night`      |
| `--brand-wine`     | De Bedtijd-Baron (kroeg/wijn)          | `bg-wine`       |
| `--brand-liquorice`| De Salmari-Soldaat (salmiak/stad)      | `bg-liquorice`  |

> The six archetypes map onto five chart hues plus liquorice; the preview cycles
> the accent list so every archetype gets a distinct swatch.

## Typography

An **oversized, vertical** scale. Headings default to black weight, tight
tracking and tight leading (set in `app/globals.css`). Font family stays the
shadcn `--font-sans` (Geist).

| Token / utility            | Size    | Use                              |
| -------------------------- | ------- | -------------------------------- |
| `text-colossus`            | 136px   | The vertical statement / big numbers |
| `text-display-lg`          | 96px    | Oversized numbers                |
| `text-display`             | 72px    | Hero headline                    |
| `text-display-sm`          | 48px    |                                  |
| `text-headline`            | 36px    | Section headings                 |
| `text-title`               | 28px    | Card titles                      |
| `text-lead`                | 22px    | Intros                           |
| `text-body-lg` / `text-body` | 18 / 16px | Body copy                    |
| `text-caption`             | 12px    | Eyebrows / meta                  |

Supporting utilities: line-heights `leading-colossus | display | heading | body`;
letter-spacing `tracking-display | heading | eyebrow`; weights
`font-regular | medium | bold | black`.

**Eyebrow pattern:** `text-caption font-bold uppercase tracking-eyebrow`.

## Spacing & vertical rhythm

Built on a **1.5rem baseline rhythm**. Prefer these semantic steps for vertical
stacks so the whole site breathes on the same grid. Exposed as Tailwind spacing,
so they work with `gap-*`, `space-y-*`, `p-*`, `m-*`, etc.

| Token / utility        | Value  | Use                          |
| ---------------------- | ------ | ---------------------------- |
| `stack-xs`             | 0.5rem | Tight groupings              |
| `stack-sm`             | 0.75rem| Related items                |
| `stack-md`             | 1.5rem | 1 rhythm — default gap       |
| `stack-lg`             | 3rem   | 2 rhythm                     |
| `stack-xl`             | 4.5rem | 3 rhythm                     |
| `stack-section`        | 7.5rem | 5 rhythm — between sections  |

`--measure: 60ch` caps reading width. Example: `gap-stack-section`,
`px-stack-md`, `space-y-stack-lg`.

## Radii

Extends the shadcn `--radius` scale (bumped to `0.875rem` for a friendlier feel).
`--radius-pill` (utility `rounded-pill`) fully rounds chips and primary buttons —
the playful default for interactive elements.

## Giraffe-spot motif

The signature texture. The `giraffe-spots` utility (defined in
`app/globals.css`) paints an ochre-on-gold patch pattern:

```html
<div class="giraffe-spots rounded-4xl p-stack-md">…</div>
```

Usage guidance:

- Reserve it for **hero blocks and large accents**, not small UI — the patches
  need room to read.
- Pair with `text-cocoa` for legible content on top.
- Keep it to one giraffe-spot surface per view so it stays a statement.

## Core component guidance

- **Buttons.** Primary = `bg-primary text-primary-foreground rounded-pill
  font-black`. Loud and pill-shaped. Secondary uses `bg-secondary` / `bg-sand`.
- **Chips / tags.** `rounded-pill` + eyebrow type; `bg-accent` (flamingo) for
  emphasis, `bg-sand` for neutral.
- **Cards.** `bg-card` on `rounded-2xl`+ with `stack-sm`/`stack-md` internal
  spacing; titles use `text-title`.
- **Archetype cards.** Lead with the archetype accent swatch (`rounded-pill`) and
  a bold name; reuse the accent for any chart tied to that archetype.
- **Sections.** Separate with `gap-stack-section`; single-column, vertical-first.

## Dark mode

`.dark` switches to **night-savanna**: a deep cocoa ground with the gold and
archetype accents lifted for contrast. All semantic variables are remapped in
`app/globals.css`, so components need no dark-specific classes.

## Extending

Add new raw tokens to `app/theme/tokens.css`, expose them as Tailwind theme vars
in the `@theme inline` block of `app/globals.css`, then document them here. Never
introduce a colour or size that is not a token.
