/**
 * The per-type page (BORREL-4.6) — the centerpiece of the rebrand.
 *
 * Renders ONE Kompaan _type_ (archetype) as a full character page, dressed
 * entirely in that type's own sub-theme: the page root carries `data-type="<id>"`
 * and projects the BORREL-4.2 colour data onto the `--type-accent*` knobs of the
 * BORREL-4.1 per-type theming contract (via {@link typeThemeVars}), so every
 * accent surface inside recolours to the type for free.
 *
 * It surfaces the type's full written identity: an image slot (real art later —
 * a themed placeholder box sized for it now), the full description, the defining
 * traits, the signature colours, and the LIST OF MEMBERS with that type. Body
 * copy stays on the paper/ink semantics so text contrast never rides on the
 * accent; only the loud accent surfaces use `bg-type` + AA-tuned `text-type-ink`.
 *
 * Presentational only: the resolved entry (archetype + members) is loaded at
 * build/server time by `app/typetjes/[slug]/page.tsx` and handed down as a prop.
 */

import Link from "next/link";
import type { CSSProperties } from "react";

import {
  getTypeTheme,
  typeThemeVars,
  type ArchetypeId,
} from "@/app/theme/type-themes";
import type { ArchetypeGalleryEntry } from "@/components/archetypes";

export interface TypePageProps {
  /** The archetype resolved to its members + badge emoji, from the gallery. */
  readonly entry: ArchetypeGalleryEntry;
}

/**
 * The optional hero illustration for an archetype. The `image` field is reserved
 * on the content model for real art later; until it lands we read it defensively
 * (undefined ⇒ a themed placeholder box, sized for the future art).
 */
function archetypeImage(entry: ArchetypeGalleryEntry): string | undefined {
  const src = (entry.archetype as { image?: string }).image;
  return typeof src === "string" && src.length > 0 ? src : undefined;
}

export function TypePage({ entry }: TypePageProps) {
  const { archetype, members, memberCount, emoji } = entry;

  // Dress the whole page in this type's own theme via the 4.1 contract. The
  // load-time guard in app/theme/type-themes.ts keeps the theme map exhaustive
  // over the archetype ids, so the id maps to a theme by construction.
  const themeStyle = typeThemeVars(
    getTypeTheme(archetype.id as ArchetypeId),
  ) as CSSProperties;

  const image = archetypeImage(entry);
  const memberLabel = memberCount === 1 ? "Kompaan" : "Kompanen";

  return (
    <article
      data-type={archetype.id}
      style={themeStyle}
      className="mx-auto w-full max-w-5xl px-stack-md py-stack-lg"
    >
      <nav aria-label="Kruimelpad" className="mb-stack-md">
        <Link
          href="/typetjes"
          className="inline-flex min-h-tap items-center gap-2 text-caption font-bold uppercase tracking-eyebrow text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground"
        >
          <span aria-hidden>&larr;</span>
          Alle typetjes
        </Link>
      </nav>

      {/* Hero — the image slot beside the type's name + description. */}
      <header className="grid gap-stack-lg lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <div className="order-2 lg:order-1">
          <p className="text-caption font-bold uppercase tracking-eyebrow text-muted-foreground">
            Borrel-type
          </p>
          <h1 className="mt-stack-sm text-display font-black leading-display tracking-display text-foreground text-balance">
            {archetype.name}
          </h1>
          <p className="mt-stack-md max-w-[52ch] text-body-lg font-medium leading-body text-foreground text-pretty">
            {archetype.description}
          </p>

          <p className="mt-stack-md inline-flex items-baseline gap-2">
            <span className="text-display-sm font-black leading-none text-foreground">
              {memberCount}
            </span>
            <span className="text-caption font-bold uppercase tracking-eyebrow text-muted-foreground">
              {memberLabel} met dit type
            </span>
          </p>
        </div>

        {/* Image slot — real art later; a themed placeholder box sized for it now. */}
        <div className="order-1 lg:order-2">
          <figure className="sticker relative overflow-hidden rounded-4xl">
            <div className="aspect-[4/5] w-full">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element -- art assets are static, not from next/image pipeline (yet)
                <img
                  src={image}
                  alt={`Illustratie van ${archetype.name}`}
                  className="size-full object-cover"
                />
              ) : (
                <div
                  aria-hidden
                  className="cel-shade flex size-full flex-col items-center justify-center gap-stack-sm text-type-ink"
                >
                  <span className="text-colossus leading-none">{emoji}</span>
                  <span className="text-caption font-black uppercase tracking-eyebrow">
                    Illustratie volgt
                  </span>
                </div>
              )}
            </div>
          </figure>
        </div>
      </header>

      {/* Defining traits — the survey signature that drives the vibe. */}
      <section aria-labelledby="kenmerken-heading" className="mt-stack-xl">
        <h2
          id="kenmerken-heading"
          className="text-headline font-black leading-heading tracking-heading text-foreground"
        >
          Kenmerken
        </h2>
        <ul className="mt-stack-md grid gap-stack-sm sm:grid-cols-2">
          {archetype.definingTraits.map((trait) => (
            <li
              key={trait}
              className="sticker-sm flex items-start gap-stack-sm rounded-2xl bg-card p-stack-md text-body font-medium leading-body text-card-foreground"
            >
              <span
                aria-hidden
                className="mt-[0.4em] size-3 shrink-0 rounded-pill bg-type"
              />
              <span className="text-pretty">{trait}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Colours — the type's signature spray-can hue + its deeper hover tone. */}
      <section aria-labelledby="kleuren-heading" className="mt-stack-xl">
        <h2
          id="kleuren-heading"
          className="text-headline font-black leading-heading tracking-heading text-foreground"
        >
          Kleuren
        </h2>
        <div className="mt-stack-md flex flex-wrap gap-stack-md">
          <div className="sticker flex min-h-tap items-center gap-stack-sm rounded-pill bg-type px-stack-md py-stack-sm text-type-ink">
            <span
              aria-hidden
              className="size-6 shrink-0 rounded-pill border-2 border-[var(--brand-cocoa-deep)]"
              style={{ background: "var(--type-accent)" }}
            />
            <span className="text-caption font-black uppercase tracking-eyebrow">
              Signatuurkleur
            </span>
          </div>
          <div className="ink-outline flex min-h-tap items-center gap-stack-sm rounded-pill bg-card px-stack-md py-stack-sm text-card-foreground">
            <span
              aria-hidden
              className="size-6 shrink-0 rounded-pill border-2 border-[var(--brand-cocoa-deep)]"
              style={{ background: "var(--type-accent-strong)" }}
            />
            <span className="text-caption font-black uppercase tracking-eyebrow">
              Dieper / hover
            </span>
          </div>
        </div>
      </section>

      {/* Members — the Kompanen who tekenen this type, real names (locked decision). */}
      <section aria-labelledby="kompanen-heading" className="mt-stack-xl">
        <h2
          id="kompanen-heading"
          className="text-headline font-black leading-heading tracking-heading text-foreground"
        >
          De Kompanen
        </h2>
        <p className="mt-stack-sm text-body font-medium leading-body text-muted-foreground text-pretty">
          {memberCount} {memberLabel} tekenen op de borrel hetzelfde als{" "}
          {archetype.name}.
        </p>
        {members.length > 0 ? (
          <ul className="mt-stack-md flex flex-wrap gap-stack-sm">
            {members.map((name, index) => (
              <li
                key={`${name}-${index}`}
                className="ink-outline inline-flex min-h-tap items-center rounded-pill bg-card px-stack-md py-stack-xs text-body font-bold text-card-foreground"
              >
                {name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-stack-md text-body font-medium leading-body text-muted-foreground">
            Nog geen Kompanen in dit type.
          </p>
        )}
      </section>
    </article>
  );
}
