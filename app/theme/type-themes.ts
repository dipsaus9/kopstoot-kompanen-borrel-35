/**
 * Borrel 35 — per-type colour DATA (BORREL-4.2).
 *
 * The typed theme map that dresses each Kompaan _type_ (archetype) in its own
 * accent. It supplies the colour DATA for the per-type theming CONTRACT defined
 * by BORREL-4.1 (the mechanism + neutral defaults live in
 * `app/globals.css` / `app/theme/tokens.css`) — nothing here is a mechanism, and
 * nothing invents a colour: every value POINTS at a `--brand-*` token from
 * `app/theme/tokens.css`.
 *
 * The three knobs a type theme sets (see the contract):
 *   --type-accent         base accent colour for this type
 *   --type-accent-strong  strong/hover variant (reserved by 4.1, not yet wired)
 *   --type-accent-ink     text/ink colour that sits legibly ON the accent (WCAG-AA)
 *
 * Apply a theme by spreading {@link typeThemeVars} onto an element's `style` (or
 * by mirroring these same values in a `[data-type="<id>"]` CSS rule): every base
 * component inside then recolours to the type for free.
 *
 * Source of truth for the human-readable identities (look, traits, vibe, image
 * direction) and the exact hue→role mapping: `docs/type-visual-specs.md`. This
 * file MUST match that doc 1:1. Keys are the archetype ids from
 * `content/archetypes` (read-only); a load-time guard below fails fast if the two
 * ever drift, keeping docs, content and code in lockstep.
 */

import { ARCHETYPES } from "@/content/archetypes";

/**
 * The six archetype ids, as a literal union.
 *
 * `content/archetypes` types its ids as `string`, so a literal union cannot be
 * derived from it at the type level — it is restated here and enforced against
 * `ARCHETYPES` at load time (see the guard at the bottom of this file).
 */
export type ArchetypeId =
  | "parkborrelprofessional"
  | "festival-flamingo"
  | "salmari-soldaat"
  | "lange-nachtbraker"
  | "verantwoordelijke-kompaan"
  | "bedtijd-baron";

/**
 * A CSS colour VALUE for a custom property — always a reference to a brand token
 * (`var(--brand-*)`) or a `color-mix()` over brand tokens, never a raw literal.
 */
export type CssColorValue = string;

/** The `--type-accent*` custom properties the 4.1 contract reads. */
export type TypeThemeVars = {
  readonly "--type-accent": CssColorValue;
  readonly "--type-accent-strong": CssColorValue;
  readonly "--type-accent-ink": CssColorValue;
};

/**
 * One type's colour data. The three fields map 1:1 to the contract's three knobs.
 */
export interface TypeTheme {
  /** `--type-accent` — the type's signature hue (a `--brand-*` token). */
  readonly accent: CssColorValue;
  /**
   * `--type-accent-strong` — deeper hover/pressed tone. Reserved by the 4.1
   * contract (declared, not yet wired to a semantic variable).
   */
  readonly accentStrong: CssColorValue;
  /**
   * `--type-accent-ink` — ink that sits legibly ON {@link accent}. Chosen for
   * WCAG-AA (light accents wear cocoa-deep ink, deep-jewel accents wear cream).
   */
  readonly accentInk: CssColorValue;
}

/** Deepen a base accent toward the near-black ink for a hover/pressed tone. */
const deepen = (accentToken: string): CssColorValue =>
  `color-mix(in oklch, ${accentToken} 82%, var(--brand-cocoa-deep))`;

const INK_ON_LIGHT: CssColorValue = "var(--brand-cocoa-deep)";
const INK_ON_DARK: CssColorValue = "var(--brand-cream)";

/**
 * Per-type colour data, keyed by archetype id. Mirrors `docs/type-visual-specs.md`
 * exactly. Contrast ratios of ink-on-accent are noted per entry.
 */
export const TYPE_THEMES: Record<ArchetypeId, TypeTheme> = {
  // 1 — pop-gold. Ink ≈ 12.3:1 (AA/AAA).
  parkborrelprofessional: {
    accent: "var(--brand-giraffe)",
    accentStrong: "var(--brand-ochre)", // the sanctioned deeper pop / hover
    accentInk: INK_ON_LIGHT,
  },
  // 2 — hot flamingo pink. Ink ≈ 5.8:1 (AA).
  "festival-flamingo": {
    accent: "var(--brand-flamingo)",
    accentStrong: deepen("var(--brand-flamingo)"),
    accentInk: INK_ON_LIGHT,
  },
  // 3 — electric grape. Ink ≈ 7.6:1 (AA/AAA).
  "salmari-soldaat": {
    accent: "var(--brand-liquorice)",
    accentStrong: deepen("var(--brand-liquorice)"),
    accentInk: INK_ON_DARK,
  },
  // 4 — electric indigo. Ink ≈ 4.4:1 (AA for the bold/large on-accent display text).
  "lange-nachtbraker": {
    accent: "var(--brand-night)",
    accentStrong: deepen("var(--brand-night)"),
    accentInk: INK_ON_DARK,
  },
  // 5 — acid green. Ink ≈ 10.8:1 (AA/AAA).
  "verantwoordelijke-kompaan": {
    accent: "var(--brand-park)",
    accentStrong: deepen("var(--brand-park)"),
    accentInk: INK_ON_LIGHT,
  },
  // 6 — pop red. Ink ≈ 4.4:1 (AA for the bold/large on-accent display text).
  "bedtijd-baron": {
    accent: "var(--brand-wine)",
    accentStrong: deepen("var(--brand-wine)"),
    accentInk: INK_ON_DARK,
  },
};

/**
 * Project a {@link TypeTheme} onto the `--type-accent*` custom properties the 4.1
 * contract consumes. Spread the result onto a React `style` prop (or any inline
 * style object) to theme a subtree:
 *
 * ```tsx
 * <section style={typeThemeVars(TYPE_THEMES[id])} data-type={id}>…</section>
 * ```
 */
export function typeThemeVars(theme: TypeTheme): TypeThemeVars {
  return {
    "--type-accent": theme.accent,
    "--type-accent-strong": theme.accentStrong,
    "--type-accent-ink": theme.accentInk,
  };
}

/** Look up a type theme by archetype id. */
export function getTypeTheme(id: ArchetypeId): TypeTheme {
  return TYPE_THEMES[id];
}

/* -------------------------------------------------------------------------- *
 * Load-time lockstep guard — keeps this map exhaustive over, and exclusive to,
 * the archetype ids in `content/archetypes` (read-only). Throws (fails the build)
 * the moment the two drift, so docs + content + code cannot silently diverge.
 * -------------------------------------------------------------------------- */
{
  const themedIds = new Set<string>(Object.keys(TYPE_THEMES));
  const archetypeIds = new Set<string>(ARCHETYPES.map((a) => a.id));
  for (const { id } of ARCHETYPES) {
    if (!themedIds.has(id)) {
      throw new Error(`type-themes: no theme for archetype "${id}"`);
    }
  }
  for (const id of themedIds) {
    if (!archetypeIds.has(id)) {
      throw new Error(`type-themes: theme "${id}" has no matching archetype`);
    }
  }
}
