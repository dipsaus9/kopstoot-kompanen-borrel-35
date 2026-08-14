import { ARCHETYPES } from "@/content/archetypes";

/**
 * DesignSystemPreview — the living demonstration of the Borrel 35 design system
 * (BORREL-2.3). It renders the tokens defined in `app/theme/tokens.css` and
 * exposed through `app/globals.css`: the oversized vertical type scale, the
 * giraffe/borrel palette, the vertical-rhythm spacing and the giraffe-spot
 * motif. It is intentionally self-contained and dependency-light so it can be
 * dropped into any route (e.g. a `/design` preview page) without pulling in app
 * chrome.
 *
 * Every colour, size and gap below comes from a token — there are no ad-hoc
 * values — so this doubles as a visual regression surface for the system.
 */

/** The archetype accent family, paired 1:1 with the chart ramp (cluster order). */
const ARCHETYPE_ACCENTS = [
  "bg-giraffe",
  "bg-park",
  "bg-flamingo",
  "bg-night",
  "bg-wine",
  "bg-cocoa",
] as const;

export default function DesignSystemPreview() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-stack-section px-stack-md py-stack-xl">
      {/* Hero — oversized vertical statement with the giraffe-spot motif. */}
      <section className="flex flex-col gap-stack-md">
        <span className="text-caption font-bold uppercase tracking-eyebrow text-muted-foreground">
          Borrel 35 · Design System
        </span>
        <h1 className="text-display leading-display tracking-display text-foreground">
          Sta op,
          <br />
          borrel mee.
        </h1>
        <div className="giraffe-spots flex min-h-40 items-end rounded-4xl p-stack-md">
          <span className="text-display-sm font-black leading-display tracking-display text-cocoa">
            🦒
          </span>
        </div>
      </section>

      {/* Type scale — top to bottom, biggest to smallest. */}
      <section className="flex flex-col gap-stack-sm">
        <h2 className="text-title text-foreground">Type scale</h2>
        <p className="text-colossus leading-colossus tracking-display text-giraffe">
          35
        </p>
        <p className="text-headline leading-heading tracking-heading text-foreground">
          Headline — de kompanen
        </p>
        <p className="text-lead leading-body text-muted-foreground">
          Lead — een borrel voor elk beest.
        </p>
        <p className="text-body leading-body text-foreground">
          Body — de vaste kliek, van parkborrel tot bedtijd.
        </p>
      </section>

      {/* Palette — the shared borrel neutrals + giraffe gold. */}
      <section className="flex flex-col gap-stack-sm">
        <h2 className="text-title text-foreground">Palette</h2>
        <div className="flex flex-wrap gap-stack-sm">
          <Swatch className="bg-cream border" label="Cream" />
          <Swatch className="bg-sand" label="Sand" />
          <Swatch className="bg-giraffe" label="Giraffe" />
          <Swatch className="bg-ochre" label="Ochre" />
          <Swatch className="bg-cocoa" label="Cocoa" dark />
        </div>
      </section>

      {/* Archetype accents — one hue per Kompaan archetype. */}
      <section className="flex flex-col gap-stack-sm">
        <h2 className="text-title text-foreground">Archetype accents</h2>
        <ul className="flex flex-col gap-stack-xs">
          {ARCHETYPES.map((archetype, i) => (
            <li
              key={archetype.id}
              className="flex items-center gap-stack-sm rounded-2xl bg-card p-stack-sm"
            >
              <span
                className={`size-10 shrink-0 rounded-pill ${
                  ARCHETYPE_ACCENTS[i % ARCHETYPE_ACCENTS.length]
                }`}
                aria-hidden
              />
              <span className="text-body-lg font-bold text-card-foreground">
                {archetype.name}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Components — the giraffe voice applied to a button + chip. */}
      <section className="flex flex-col gap-stack-sm">
        <h2 className="text-title text-foreground">Components</h2>
        <div className="flex flex-wrap items-center gap-stack-sm">
          <button
            type="button"
            className="rounded-pill bg-primary px-stack-md py-stack-xs text-body font-black text-primary-foreground"
          >
            Doe de test
          </button>
          <span className="rounded-pill bg-accent px-stack-sm py-stack-xs text-caption font-bold uppercase tracking-eyebrow text-accent-foreground">
            Nieuw
          </span>
        </div>
      </section>
    </div>
  );
}

function Swatch({
  className,
  label,
  dark = false,
}: {
  className: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex size-24 items-end rounded-2xl p-stack-xs ${className}`}
    >
      <span
        className={`text-caption font-bold ${dark ? "text-cream" : "text-cocoa"}`}
      >
        {label}
      </span>
    </div>
  );
}
