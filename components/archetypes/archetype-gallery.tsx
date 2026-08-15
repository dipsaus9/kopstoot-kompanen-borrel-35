/**
 * The archetypes gallery (BORREL-3.4) — the /typetjes view.
 *
 * Composes a bold, vertical intro with the six {@link ArchetypeCard}s in a
 * responsive grid. Presentational: the resolved entries are loaded at build time
 * by the server component in `app/typetjes/page.tsx` and handed down as a prop.
 * The jump-links row exposes each card's anchor so the individual archetypes are
 * discoverable and directly linkable (the find-yourself badge deep-links the
 * same anchors).
 */

import type { ArchetypeGalleryEntry } from "./members";
import { ArchetypeCard } from "./archetype-card";

export interface ArchetypeGalleryProps {
  /** The six archetypes resolved to members + accent, in content order. */
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
        <p className="text-caption font-bold tracking-eyebrow text-muted-foreground uppercase">
          De borrel-archetypes
        </p>
        <h1 className="mt-stack-sm text-display-sm font-black leading-display tracking-display text-foreground text-balance">
          De typetjes van Borrel 35
        </h1>
        <p className="mt-stack-md max-w-[46ch] text-body-lg font-medium leading-body text-muted-foreground text-pretty">
          {entries.length} giraffe-typetjes, samengesteld uit {totalMembers}{" "}
          ingevulde enquêtes. Elk type verzamelt de Kompanen die op de borrel
          hetzelfde tekenen — vind jezelf terug.
        </p>

        <nav aria-label="Spring naar een typetje" className="mt-stack-md">
          <ul className="flex flex-wrap gap-stack-xs">
            {entries.map((entry) => (
              <li key={entry.archetype.id}>
                <a
                  href={`#${entry.archetype.id}`}
                  className="inline-flex items-center gap-2 rounded-pill border border-border bg-card px-stack-sm py-1 text-caption font-bold text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  <span aria-hidden>{entry.emoji}</span>
                  {entry.archetype.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <section aria-label="De zes typetjes">
        <ul className="grid grid-cols-1 gap-stack-md md:grid-cols-2 xl:grid-cols-3">
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
