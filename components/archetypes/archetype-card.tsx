/**
 * A single archetype character card (BORREL-3.4).
 *
 * Presentational only: renders one {@link ArchetypeGalleryEntry} as a playful,
 * giraffe-voiced card showing the archetype's name, description, defining
 * traits and its member count/list. The mapped brand hue (BORREL-2.3) is bound
 * to a local `--archetype-hue` custom property and used only as decoration — the
 * accent stripe, the badge disc and the trait bullets — so text contrast never
 * depends on the (light/dark-varying) accent colour.
 *
 * The card is the deep-link target for the find-yourself archetype badge: its
 * `id` is the archetype slug, it carries a scroll offset for the sticky header,
 * and the `:target` state lifts a ring in the archetype's own hue.
 */

import type { CSSProperties } from "react";

import type { ArchetypeGalleryEntry } from "./members";

export interface ArchetypeCardProps {
  /** The archetype, its members and accent to render. */
  readonly entry: ArchetypeGalleryEntry;
}

export function ArchetypeCard({ entry }: ArchetypeCardProps) {
  const { archetype, memberCount, members, hueVar, emoji } = entry;
  const hueStyle = {
    "--archetype-hue": `var(${hueVar})`,
  } as CSSProperties;

  return (
    <article
      id={archetype.id}
      style={hueStyle}
      className="group flex w-full scroll-mt-32 flex-col overflow-hidden rounded-4xl border border-t-4 border-border border-t-[color:var(--archetype-hue)] bg-card shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-[color:var(--archetype-hue)] hover:shadow-md target:ring-2 target:ring-[color:var(--archetype-hue)] target:ring-offset-2 target:ring-offset-background"
    >
      <div className="flex flex-1 flex-col gap-stack-md p-stack-md">
        <header className="flex items-center gap-stack-sm">
          <span
            aria-hidden
            className="flex size-14 shrink-0 items-center justify-center rounded-pill bg-[color:var(--archetype-hue)] text-title leading-none shadow-sm"
          >
            {emoji}
          </span>
          <div className="min-w-0">
            <p className="text-caption font-bold tracking-eyebrow text-muted-foreground uppercase">
              Borrel-archetype
            </p>
            <h2 className="text-title font-black leading-heading tracking-heading text-foreground text-balance">
              {archetype.name}
            </h2>
          </div>
        </header>

        <p className="text-body-lg font-medium leading-body text-foreground text-pretty">
          {archetype.description}
        </p>

        <div>
          <h3 className="mb-stack-sm text-caption font-bold tracking-eyebrow text-muted-foreground uppercase">
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
                  className="mt-[0.5em] size-2 shrink-0 rounded-pill bg-[color:var(--archetype-hue)]"
                />
                <span className="text-pretty">{trait}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto border-t border-border pt-stack-md">
          <h3 className="mb-stack-sm flex items-baseline gap-2 text-caption font-bold tracking-eyebrow text-muted-foreground uppercase">
            <span className="text-lead font-black leading-none text-foreground">
              {memberCount}
            </span>
            {memberCount === 1 ? "Kompaan" : "Kompanen"}
          </h3>
          {members.length > 0 ? (
            <ul className="flex flex-wrap gap-stack-xs">
              {members.map((name, index) => (
                <li
                  key={`${name}-${index}`}
                  className="rounded-pill border border-border bg-secondary px-stack-sm py-1 text-caption font-bold text-secondary-foreground"
                >
                  {name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-body font-medium text-muted-foreground">
              Nog geen Kompanen in dit type.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
