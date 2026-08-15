/**
 * The type index gallery (BORREL-4.5) — the /typetjes view.
 *
 * A loud, graffiti/anime INDEX of the six Kompaan _types_: a bold vertical intro
 * over a mobile-first responsive grid of {@link ArchetypeCard} tiles. Each tile
 * wears its own type theme and links through to that type's page at
 * `/typetjes/<id>` (per-type route in BORREL-4.6), so the gallery is the
 * jumping-off point for the type-centric site.
 *
 * Presentational: the resolved entries are loaded at build time by the server
 * component in `app/typetjes/page.tsx` and handed down as a prop.
 */

import type { ArchetypeGalleryEntry } from "./members";
import { ArchetypeCard } from "./archetype-card";

export interface ArchetypeGalleryProps {
  /** The six archetypes resolved to member count + accent, in content order. */
  readonly entries: readonly ArchetypeGalleryEntry[];
}

export function ArchetypeGallery({ entries }: ArchetypeGalleryProps) {
  const totalMembers = entries.reduce(
    (sum, entry) => sum + entry.memberCount,
    0,
  );

  return (
    <div className="flex flex-col gap-stack-lg">
      <header>
        <p className="text-caption font-bold uppercase tracking-eyebrow text-muted-foreground">
          De borrel-types
        </p>
        <h1 className="mt-stack-sm text-display font-black leading-display tracking-display text-foreground text-balance">
          De typetjes van Borrel 35
        </h1>
        <p className="mt-stack-md max-w-[46ch] text-body-lg font-medium leading-body text-muted-foreground text-pretty">
          {entries.length} typetjes, samengesteld uit {totalMembers} ingevulde
          enquêtes. Tik op een type en duik in de Kompanen die op de borrel
          hetzelfde tekenen — vind jezelf terug.
        </p>
      </header>

      <section aria-label="De zes typetjes">
        <ul className="grid grid-cols-1 gap-stack-md sm:grid-cols-2">
          {entries.map((entry) => (
            <li key={entry.archetype.id} className="flex">
              <ArchetypeCard entry={entry} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
