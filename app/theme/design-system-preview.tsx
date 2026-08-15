import type { CSSProperties } from "react";

import { ARCHETYPES } from "@/content/archetypes";
import { Button } from "@/components/ui/button";

/**
 * DesignSystemPreview — the living demonstration of the Borrel 35 design system
 * (graffiti / anime rebrand, BORREL-4.1). It renders the tokens from
 * `app/theme/tokens.css` exposed through `app/globals.css`: the loud marker
 * palette, the fluid oversized type scale, the ink outlines + sticker / speed-
 * line motifs, and — the headline of this story — the PER-TYPE THEMING CONTRACT.
 *
 * The theming demo sets only the documented `--type-accent*` knobs (inline, as
 * example values) on a `data-type` wrapper and shows the real shadcn `Button`
 * and accent chips recolouring for free. No per-type colour DATA is baked into
 * the token layer here — that is BORREL-4.2's job.
 */

/**
 * Local DEMO values for the per-type contract — NOT the real per-type palette
 * (that lands in BORREL-4.2). Each entry sets the three contract knobs so the
 * base components inside the wrapper recolour to that accent.
 */
const TYPE_THEME_DEMO = [
  {
    id: "signature",
    label: "Neutral (default)",
    style: {} as CSSProperties,
  },
  {
    id: "demo-park",
    label: "Park (acid green)",
    style: {
      "--type-accent": "var(--brand-park)",
      "--type-accent-ink": "var(--brand-cocoa-deep)",
    } as CSSProperties,
  },
  {
    id: "demo-flamingo",
    label: "Flamingo (hot pink)",
    style: {
      "--type-accent": "var(--brand-flamingo)",
      "--type-accent-ink": "var(--brand-cocoa-deep)",
    } as CSSProperties,
  },
  {
    id: "demo-night",
    label: "Nachtbraker (indigo)",
    style: {
      "--type-accent": "var(--brand-night)",
      "--type-accent-ink": "var(--brand-cream)",
    } as CSSProperties,
  },
  {
    id: "demo-wine",
    label: "Baron (pop red)",
    style: {
      "--type-accent": "var(--brand-wine)",
      "--type-accent-ink": "var(--brand-cream)",
    } as CSSProperties,
  },
] as const;

/** The type accent family, paired 1:1 with the chart ramp (cluster order). */
const TYPE_ACCENTS = [
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
      {/* Hero — oversized vertical statement with speed-lines + sticker tag. */}
      <section className="flex flex-col gap-stack-md">
        <span className="text-caption font-bold uppercase tracking-eyebrow text-muted-foreground">
          Borrel 35 · Graffiti Design System
        </span>
        <h1 className="text-display leading-display tracking-display text-foreground">
          Sta op,
          <br />
          borrel mee.
        </h1>
        <div className="giraffe-spots sticker relative min-h-48 overflow-hidden rounded-4xl p-stack-md">
          {/* Decorative anime speed-lines layer (aria-hidden, motion-aware). */}
          <div
            aria-hidden
            className="speed-lines speed-lines-animate pointer-events-none absolute inset-0 opacity-15"
          />
          <div className="relative flex h-full flex-col items-start justify-end gap-stack-sm">
            <span
              className="tag-ink text-display-sm font-black tracking-display"
              aria-hidden
            >
              KNAL!
            </span>
            <span className="text-body font-bold text-cocoa">
              cel-shade · ink outline · sticker shadow · speed-lines
            </span>
          </div>
        </div>
      </section>

      {/* Type scale — top to bottom, biggest to smallest (fluid). */}
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

      {/* Palette — sticker swatches over the marker palette. */}
      <section className="flex flex-col gap-stack-sm">
        <h2 className="text-title text-foreground">Palette</h2>
        <div className="flex flex-wrap gap-stack-sm">
          <Swatch className="bg-cream" label="Cream" />
          <Swatch className="bg-sand" label="Sand" />
          <Swatch className="bg-giraffe" label="Giraffe" />
          <Swatch className="bg-ochre" label="Ochre" />
          <Swatch className="bg-cocoa" label="Cocoa" dark />
        </div>
      </section>

      {/* Type accents — one hue per Kompaan archetype. */}
      <section className="flex flex-col gap-stack-sm">
        <h2 className="text-title text-foreground">Archetype accents</h2>
        <ul className="flex flex-col gap-stack-xs">
          {ARCHETYPES.map((archetype, i) => (
            <li
              key={archetype.id}
              className="sticker-sm flex items-center gap-stack-sm rounded-2xl bg-card p-stack-sm"
            >
              <span
                className={`size-10 shrink-0 rounded-pill ink-outline ${
                  TYPE_ACCENTS[i % TYPE_ACCENTS.length]
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

      {/* Components — the graffiti voice on the real shadcn Button. */}
      <section className="flex flex-col gap-stack-sm">
        <h2 className="text-title text-foreground">Components</h2>
        <div className="flex flex-wrap items-center gap-stack-sm">
          <Button className="min-h-tap rounded-pill px-stack-md font-black">
            Doe de test
          </Button>
          <Button
            variant="outline"
            className="min-h-tap rounded-pill px-stack-md font-bold"
          >
            Meer lezen
          </Button>
          <span className="rounded-pill bg-accent px-stack-sm py-stack-xs text-caption font-bold uppercase tracking-eyebrow text-accent-foreground">
            Nieuw
          </span>
        </div>
      </section>

      {/* Per-type theming contract — the same components recoloured by scope. */}
      <section className="flex flex-col gap-stack-sm">
        <h2 className="text-title text-foreground">Per-type theming contract</h2>
        <p className="max-w-[var(--measure)] text-body leading-body text-muted-foreground">
          Set <code className="font-mono font-bold">data-type</code> (or{" "}
          <code className="font-mono font-bold">.type-theme</code>) on any
          wrapper and supply the <code className="font-mono font-bold">
            --type-accent
          </code>{" "}
          knobs; every base component inside recolours. Same markup below — only
          the accent knobs differ.
        </p>
        <div className="flex flex-col gap-stack-sm">
          {TYPE_THEME_DEMO.map((theme) => (
            <div
              key={theme.id}
              data-type={theme.id}
              style={theme.style}
              className="sticker-sm flex flex-wrap items-center gap-stack-sm rounded-2xl bg-card p-stack-sm"
            >
              <span
                className="size-8 shrink-0 rounded-pill ink-outline bg-type"
                aria-hidden
              />
              <span className="min-w-40 text-body font-bold text-card-foreground">
                {theme.label}
              </span>
              <Button className="min-h-tap rounded-pill px-stack-sm font-black">
                Primary
              </Button>
              <span className="rounded-pill bg-accent px-stack-sm py-stack-xs text-caption font-bold uppercase tracking-eyebrow text-accent-foreground">
                Chip
              </span>
            </div>
          ))}
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
      className={`sticker-sm flex size-24 items-end rounded-2xl p-stack-xs ${className}`}
    >
      <span
        className={`text-caption font-bold ${dark ? "text-cream" : "text-cocoa"}`}
      >
        {label}
      </span>
    </div>
  );
}
