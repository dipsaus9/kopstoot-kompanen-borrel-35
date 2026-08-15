# Borrel 35 — Design System

> The **graffiti / anime** visual language for the Borrel 35 site (BORREL-4
> rebrand): a loud marker palette, near-black ink outlines, cel-shade gradients
> and sticker / speed-line motifs — centred on the six Kompaan _types_
> (archetypes; see [`docs/archetypes.md`](./archetypes.md) and
> [`content/archetypes/index.ts`](../content/archetypes/index.ts)).
>
> **Source of truth:** the tokens live in
> [`app/theme/tokens.css`](../app/theme/tokens.css) (raw palette + scales +
> graffiti hardware) and are applied to the shadcn base variables in
> [`app/globals.css`](../app/globals.css) (which also holds the per-type theming
> mechanism and the motif utilities). A living demonstration renders in
> [`app/theme/design-system-preview.tsx`](../app/theme/design-system-preview.tsx).

## Design principles

1. **Loud, not corporate.** Bold marker inks, near-black outlines, hard sticker
   shadows. The page should read like a wall of tags, not a SaaS dashboard.
2. **Vertical before horizontal.** Stack content in single columns, lead with
   oversized numbers and headings, and use generous vertical rhythm.
3. **Ink everything.** Thick blue-black outlines (`--outline-*`) and hard offset
   drop shadows (`--sticker-shadow*`) are the connective tissue of the look.
4. **Cel-shade + speed-lines.** Flat two-tone anime gradients and diagonal motion
   streaks supply the energy; motion is opt-out (see [A11Y](#accessibility-a11y)).
5. **The type is the hero.** One saturated hue per archetype, and any surface can
   be recoloured to a type via the [per-type theming contract](#per-type-theming-contract).
6. **Every value is a token.** Components consume tokens (CSS custom properties or
   the generated Tailwind utilities) — no ad-hoc hex, px, or one-off colours.

## Layering on shadcn

The shadcn base theme (BORREL-1.3) defines the semantic variables
(`--background`, `--primary`, `--card`, `--chart-*`, `--radius`, …). This system
does **not** replace it — it:

- defines a raw brand layer in `app/theme/tokens.css` (`--brand-*`, `--fs-*`,
  `--lh-*`, `--ls-*`, `--fw-*`, `--stack-*`, `--outline-*`, `--sticker-shadow*`,
  `--type-accent*`, `--radius-pill`), and
- **remaps** the shadcn semantic variables to those brand tokens in
  `app/globals.css` (`:root` = light/paper, `.dark` = neon-night).

Because the mapping is at the semantic-variable level, every shadcn component
(Button, Card, …) inherits the graffiti palette for free — and recolours per
type without touching component code (see below).

> **Token API is stable.** The rebrand kept the previous token/utility _names_
> (`bg-giraffe`, `text-cocoa`, `border-tan`, `giraffe-spots`, the type scale, the
> `stack-*` rhythm) and only changed their _values_, so existing components
> recolour for free.

## Per-type theming contract

The headline mechanism of the rebrand. **Set `data-type="<id>"` (or the class
`.type-theme`) on any element** — a page wrapper, a card, a section — and every
base component inside it that reads the accent semantics recolours to that type:
the shadcn `Button` (`bg-primary`), the focus `--ring`, `bg-accent` chips, and
the `bg-type` / `text-type` utilities.

### The three knobs

A type theme supplies colour DATA by setting these custom properties; the
mechanism in `app/globals.css` reads them:

| Custom property        | Role                                           |
| ---------------------- | ---------------------------------------------- |
| `--type-accent`        | Base accent colour for this type               |
| `--type-accent-strong` | Strong / hover variant (optional)              |
| `--type-accent-ink`    | Text/ink colour that sits legibly ON the accent |

Each is optional: unset, it falls back (via `var(--type-accent, …)`) to the
neutral defaults `--type-accent-default` / `--type-accent-ink-default` (the
signature pop). So a bare `data-type` with no matching data rule is still valid
and simply shows the default accent.

### Where the mechanism ends and the data begins

`app/theme/tokens.css` + `app/globals.css` define **only the mechanism and the
neutral defaults — no type is hardcoded**. The per-type colour DATA is a separate
concern (BORREL-4.2), added as one rule per type:

```css
/* BORREL-4.2 — one rule per type, colour data only */
[data-type="festival-flamingo"] {
  --type-accent: var(--brand-flamingo);
  --type-accent-ink: var(--brand-cocoa-deep);
}
```

Usage in markup:

```tsx
// Everything inside recolours to the type's accent.
<section data-type="festival-flamingo">
  <Button>Doe de test</Button>   {/* pink primary */}
  <span className="bg-type …" /> {/* pink swatch  */}
</section>
```

The preview's "Per-type theming contract" section demonstrates this by setting
the knobs inline as example values on a `data-type` wrapper.

## Palette

Colours are authored in **OKLCH** for perceptual consistency in light and dark.

### Paper + ink neutrals

| Token                | Role                        | Tailwind     |
| -------------------- | --------------------------- | ------------ |
| `--brand-cream`      | Page paper / background     | `bg-cream`   |
| `--brand-sand`       | Muted surfaces, secondary   | `bg-sand`    |
| `--brand-tan`        | Thick **ink outlines** / borders | `border-tan` |
| `--brand-cocoa`      | Ink / text                  | `text-cocoa` |
| `--brand-cocoa-deep` | Darkest ink, dark bg, sticker shadow | — |

### Signature pop (marker yellow-gold)

| Token             | Role                | Tailwind     |
| ----------------- | ------------------- | ------------ |
| `--brand-giraffe` | Primary accent, CTA | `bg-giraffe` |
| `--brand-ochre`   | Deeper pop / hover, spot texture | `bg-ochre` |

### Type accent family

One saturated hue per cluster, in the same order as the archetypes and the
`--chart-*` ramp:

| Token               | Type family                            | Tailwind       |
| ------------------- | -------------------------------------- | -------------- |
| `--brand-giraffe`   | De Parkborrelprofessional (pop gold)   | `bg-giraffe`   |
| `--brand-park`      | De Verantwoordelijke Kompaan (acid green) | `bg-park`   |
| `--brand-flamingo`  | De Festival-Flamingo (hot pink)        | `bg-flamingo`  |
| `--brand-night`     | De Lange Nachtbraker (electric indigo) | `bg-night`     |
| `--brand-wine`      | De Bedtijd-Baron (pop red)             | `bg-wine`      |
| `--brand-liquorice` | De Salmari-Soldaat (electric grape)    | `bg-liquorice` |

Plus `bg-type` / `text-type` / `border-type`: utilities bound to the **live**
per-type accent (they resolve `--type-accent`, neutral pop by default).

## Typography

An **oversized, vertical, fluid** scale. Display tiers use `clamp()` so the
biggest type never overflows a phone and grows toward its ceiling on larger
viewports (mobile-first). Headings default to black weight, tight tracking and
tight leading (set in `app/globals.css`). Font family stays the shadcn
`--font-sans` (Geist).

| Token / utility              | Size (ceiling) | Use                              |
| ---------------------------- | -------------- | -------------------------------- |
| `text-colossus`              | 136px          | The vertical statement / big numbers |
| `text-display-lg`            | 96px           | Oversized numbers                |
| `text-display`               | 72px           | Hero headline                    |
| `text-display-sm`            | 48px           |                                  |
| `text-headline`              | 36px           | Section headings                 |
| `text-title`                 | 28px           | Card titles                      |
| `text-lead`                  | 22px           | Intros                           |
| `text-body-lg` / `text-body` | 18 / 16px      | Body copy                        |
| `text-caption`               | 12px           | Eyebrows / meta                  |

Supporting utilities: line-heights `leading-colossus | display | heading | body`;
letter-spacing `tracking-display | heading | eyebrow`; weights
`font-regular | medium | bold | black`.

**Eyebrow pattern:** `text-caption font-bold uppercase tracking-eyebrow`.

## Spacing & vertical rhythm

Built on a **1.5rem baseline rhythm**. Prefer these semantic steps for vertical
stacks. Exposed as Tailwind spacing, so they work with `gap-*`, `space-y-*`,
`p-*`, `m-*`, etc.

| Token / utility | Value   | Use                          |
| --------------- | ------- | ---------------------------- |
| `stack-xs`      | 0.5rem  | Tight groupings              |
| `stack-sm`      | 0.75rem | Related items                |
| `stack-md`      | 1.5rem  | 1 rhythm — default gap       |
| `stack-lg`      | 3rem    | 2 rhythm                     |
| `stack-xl`      | 4.5rem  | 3 rhythm                     |
| `stack-section` | 7.5rem  | 5 rhythm — between sections  |
| `tap`           | 2.75rem | **44px min touch target** (`min-h-tap`, `min-w-tap`) |

`--measure: 60ch` caps reading width.

## Radii + graffiti hardware

- **Radii** extend the shadcn `--radius` scale (`0.875rem`); `rounded-pill` fully
  rounds chips and primary buttons.
- **Ink outlines** — `--outline-1|2|3` (2 / 3 / 5px) are the marker-line weights.
- **Sticker shadows** — `--sticker-shadow-sm | (default) | -pop` are hard,
  blur-free offset drops in `--brand-cocoa-deep`.

## Motif utilities

All defined in `app/globals.css`:

| Utility                | Effect                                                     |
| ---------------------- | ---------------------------------------------------------- |
| `sticker` / `sticker-sm` | Thick ink border **+** hard offset drop shadow (die-cut sticker) |
| `ink-outline`          | Marker outline only (no shadow)                            |
| `cel-shade`            | Flat two-tone anime cel gradient, tinted by the current `--primary` |
| `speed-lines`          | Diagonal repeating motion streaks (decorative; add `aria-hidden`) |
| `speed-lines-animate`  | Drifts the speed-lines — **only** when motion is allowed    |
| `tag-ink`              | Sticker-style ink text outline for short display words     |
| `giraffe-spots`        | The signature pop-patch texture for hero blocks / large accents |

Guidance: reserve `giraffe-spots` for **hero blocks and large accents**, pair it
with `text-cocoa`, and keep it to one surface per view so it stays a statement.

## Core component guidance

- **Buttons.** Primary = `bg-primary text-primary-foreground rounded-pill
  font-black` with `min-h-tap`. Recolours per type automatically under
  `data-type`. Outline/secondary variants get the `ink-outline`/`sticker` look.
- **Chips / tags.** `rounded-pill` + eyebrow type; `bg-accent` for emphasis,
  `bg-sand` for neutral.
- **Cards.** `bg-card` on `rounded-2xl`+, wear a `sticker`/`sticker-sm`, with
  `stack-sm`/`stack-md` internal spacing; titles use `text-title`.
- **Type cards.** Lead with the type accent swatch (`bg-type` or the family
  token, `rounded-pill ink-outline`) and a bold name; wrap in `data-type` so any
  buttons/charts inside inherit the accent.
- **Sections.** Separate with `gap-stack-section`; single-column, vertical-first.

## Accessibility (A11Y)

- **Contrast (WCAG AA).** Semantic pairs are tuned to meet AA: ink
  (`--foreground` / `*-foreground`) on the pop and paper surfaces, and the
  neon-night dark theme lifts accents for contrast on the deep ink ground. When
  wiring a per-type theme, choose `--type-accent-ink` (ink for light accents,
  cream for dark ones) so text on the accent stays AA.
- **Focus.** A bold, always-visible focus ring (`:focus-visible { outline:
  var(--outline-2) solid var(--ring) }`) sits on top of shadcn's component-level
  rings; the ring recolours per type.
- **Touch targets.** `--tap-min` (44px) via `min-h-tap` / `min-w-tap` keeps
  interactive elements thumb-sized on mobile.
- **Reduced motion.** All decorative motion (speed-lines drift, transitions) is
  disabled under `@media (prefers-reduced-motion: reduce)`; `speed-lines-animate`
  only animates under `prefers-reduced-motion: no-preference`.

## Dark mode

`.dark` switches to **neon-night**: a deep ink ground with the pop and type
accents lifted for contrast. All semantic variables are remapped in
`app/globals.css`, so components need no dark-specific classes.

## Extending

Add new raw tokens to `app/theme/tokens.css`, expose them as Tailwind theme vars
in the `@theme inline` block of `app/globals.css`, then document them here. To
add a type theme, set the `--type-accent*` knobs on `[data-type="<id>"]`
(BORREL-4.2) — do not touch the mechanism. Never introduce a colour or size that
is not a token.
