/**
 * A single type index tile (BORREL-4.5).
 *
 * The /typetjes index is a loud, graffiti/anime gallery of the six Kompaan
 * _types_; this is one tile in it. The whole card is a {@link Link} into that
 * type's own page at `/typetjes/<id>` (the per-type route lands in BORREL-4.6),
 * so the gallery is the jumping-off point for the type-centric site.
 *
 * Each tile wears its OWN type theme: it sets `data-type="<id>"` and projects the
 * BORREL-4.2 colour data onto the `--type-accent*` knobs of the BORREL-4.1
 * per-type theming contract (via {@link typeThemeVars}). Everything inside then
 * recolours to the type for free — the accent band (`bg-type` + AA-tuned
 * `text-type-ink`), the trait bullets and the "bekijk"-affordance — while the
 * body copy stays on the paper/ink semantics so text contrast never rides on the
 * accent.
 */

import Link from "next/link";
import type { CSSProperties } from "react";

import {
  getTypeTheme,
  typeThemeVars,
  type ArchetypeId,
} from "@/app/theme/type-themes";

import type { ArchetypeGalleryEntry } from "./members";

export interface ArchetypeCardProps {
  /** The archetype, its member count and badge emoji to render. */
  readonly entry: ArchetypeGalleryEntry;
}

export function ArchetypeCard({ entry }: ArchetypeCardProps) {
  const { archetype, memberCount, emoji } = entry;

  // Dress this tile in its own type theme via the 4.1 contract: the guard in
  // app/theme/type-themes.ts keeps the theme map exhaustive over the archetype
  // ids, so the id maps to a theme by construction.
  const themeStyle = typeThemeVars(
    getTypeTheme(archetype.id as ArchetypeId),
  ) as CSSProperties;

  return (
    <Link
      href={`/typetjes/${archetype.id}`}
      id={archetype.id}
      data-type={archetype.id}
      style={themeStyle}
      aria-label={`Bekijk het type ${archetype.name}`}
      className="group sticker flex h-full w-full scroll-mt-32 flex-col overflow-hidden rounded-3xl bg-card text-left transition-all duration-150 target:ring-2 target:ring-[color:var(--type-accent)] target:ring-offset-2 target:ring-offset-background hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--sticker-shadow-pop)] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:shadow-[var(--sticker-shadow-pop)] active:translate-x-0 active:translate-y-0 active:shadow-none"
    >
      {/* Accent band — solid type colour with AA-tuned ink on top. */}
      <div className="flex items-center gap-stack-sm border-b-[3px] border-[var(--brand-cocoa-deep)] bg-type px-stack-md py-stack-sm text-type-ink">
        <span
          aria-hidden
          className="sticker-sm flex size-14 shrink-0 items-center justify-center rounded-pill bg-card text-title leading-none transition-transform duration-150 group-hover:-rotate-6 group-hover:scale-110"
        >
          {emoji}
        </span>
        <div className="min-w-0">
          <p className="text-caption font-bold uppercase tracking-eyebrow opacity-90">
            Borrel-type
          </p>
          <h2 className="hyphens-auto text-title font-black leading-heading tracking-heading break-words text-balance">
            {archetype.name}
          </h2>
        </div>
      </div>

      {/* Body — paper/ink semantics, so contrast never rides on the accent. */}
      <div className="flex flex-1 flex-col gap-stack-md p-stack-md">
        <p className="text-body-lg font-medium leading-body text-foreground text-pretty">
          {archetype.description}
        </p>

        <div>
          <h3 className="mb-stack-sm text-caption font-bold uppercase tracking-eyebrow text-muted-foreground">
            Kenmerken
          </h3>
          <ul className="flex flex-col gap-stack-xs">
            {archetype.definingTraits.map((trait) => (
              <li
                key={trait}
                className="flex gap-stack-sm text-body font-medium leading-body text-foreground"
              >
                <span
                  aria-hidden
                  className="mt-[0.5em] size-2 shrink-0 rounded-pill bg-type"
                />
                <span className="text-pretty">{trait}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer — member-count stat + the "into the type page" affordance. */}
        <div className="mt-auto flex items-end justify-between gap-stack-sm border-t border-border pt-stack-md">
          <p className="flex items-baseline gap-2">
            <span className="text-display-sm font-black leading-none text-foreground">
              {memberCount}
            </span>
            <span className="text-caption font-bold uppercase tracking-eyebrow text-muted-foreground">
              {memberCount === 1 ? "Kompaan" : "Kompanen"}
            </span>
          </p>
          <span className="ink-outline inline-flex min-h-tap items-center gap-2 rounded-pill bg-type px-stack-sm text-caption font-black uppercase tracking-eyebrow text-type-ink transition-transform duration-150 group-hover:translate-x-0.5">
            Bekijk type
            <span aria-hidden>&rarr;</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
