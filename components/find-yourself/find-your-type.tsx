"use client";

/**
 * The find-your-type funnel (BORREL-4.7) — the homepage's whole job.
 *
 * Pick your own name from the committed responses and get sent straight to YOUR
 * OWN type page (`/typetjes/<archetype-id>`, BORREL-4.6). A client component for
 * the name-search interaction only: it holds no data of its own — the lean
 * {@link TypeFinderOption} list is precomputed at build time by the server page
 * (`app/page.tsx`) and handed down as a prop, so nothing is fetched at runtime
 * (the static explorer, per the locked decision). Real names are listed openly
 * (locked decision). Selection is keyed on the positional `id`, so duplicate
 * names never collide.
 */

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import type { CSSProperties } from "react";

import type { PersonArchetype } from "./people";

/** One selectable respondent, resolved to the type page they funnel to. */
export interface TypeFinderOption {
  /** Stable positional id (`p<index>`), unique even for duplicate names. */
  readonly id: string;
  /** The respondent's name, verbatim (real names shown openly). */
  readonly name: string;
  /** Their resolved archetype, linked to its own per-type page. */
  readonly archetype: PersonArchetype;
}

export interface FindYourTypeProps {
  /** Every respondent, precomputed at build time, in dataset order. */
  readonly options: readonly TypeFinderOption[];
}

/** Case/diacritics-insensitive haystack for matching a typed query. */
function normalise(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

export function FindYourType({ options }: FindYourTypeProps) {
  const headingId = useId();
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const needle = normalise(query);
    if (needle === "") return options;
    return options.filter((option) => normalise(option.name).includes(needle));
  }, [options, query]);

  const selected = useMemo(
    () => options.find((option) => option.id === selectedId) ?? null,
    [options, selectedId],
  );

  return (
    <div className="flex flex-col gap-stack-lg">
      <section aria-labelledby={headingId} className="flex flex-col gap-stack-md">
        <h2
          id={headingId}
          className="text-title font-black tracking-heading text-foreground"
        >
          Zoek jezelf op
        </h2>

        <div className="flex flex-col gap-stack-xs">
          <label
            htmlFor={searchId}
            className="text-caption font-bold tracking-eyebrow text-muted-foreground uppercase"
          >
            Zoek op naam
          </label>
          <input
            id={searchId}
            type="search"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Typ je naam…"
            className="ink-outline min-h-tap w-full max-w-sm rounded-pill bg-card px-stack-md py-2 text-body font-medium text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          />
        </div>

        {filtered.length > 0 ? (
          <ul className="flex flex-wrap gap-stack-xs">
            {filtered.map((option) => {
              const isSelected = option.id === selectedId;
              return (
                <li key={option.id}>
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedId(option.id)}
                    className={`min-h-tap rounded-md border-[3px] border-[#1a1120] px-4 py-1.5 text-sm font-bold uppercase tracking-wide transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      isSelected
                        ? "bg-[#ff3d6e] text-white shadow-[3px_3px_0_#1a1120]"
                        : "bg-[#ffd45e] text-[#1a1120] shadow-[3px_3px_0_#1a1120] hover:shadow-[4px_4px_0_#1a1120]"
                    }`}
                  >
                    {option.name}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-body font-medium text-muted-foreground">
            Geen Kompaan gevonden voor “{query}”. Check de spelling of blader
            door de lijst.
          </p>
        )}
      </section>

      {selected ? (
        <TypeReveal option={selected} />
      ) : (
        <p className="ink-outline rounded-3xl border-dashed bg-card/50 p-stack-lg text-body-lg font-medium text-muted-foreground">
          Kies hierboven je naam om te ontdekken welk type Kompaan jij bent.
        </p>
      )}
    </div>
  );
}

/** The prominent CTA that funnels the picked person to their own type page. */
function TypeReveal({ option }: { option: TypeFinderOption }) {
  const { name, archetype } = option;
  const hueStyle = {
    "--archetype-hue": `var(${archetype.hueVar})`,
  } as CSSProperties;

  return (
    <article
      style={hueStyle}
      data-type={archetype.id}
      className="sticker flex flex-col gap-stack-md rounded-4xl bg-card p-stack-lg"
    >
      <p className="text-caption font-bold tracking-eyebrow text-muted-foreground uppercase">
        {name}, jouw type is
      </p>
      <div className="flex items-center gap-stack-md">
        <span
          aria-hidden
          className="ink-outline flex size-16 shrink-0 items-center justify-center rounded-pill bg-[color:var(--archetype-hue)] text-display-sm leading-none"
        >
          {archetype.emoji}
        </span>
        <h2 className="text-headline font-black leading-heading tracking-heading text-foreground text-balance">
          {archetype.name}
        </h2>
      </div>
      <Link
        href={archetype.href}
        className="sticker-sm inline-flex min-h-tap items-center justify-center gap-2 self-start rounded-pill bg-primary px-stack-lg py-stack-sm text-body font-black text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Bekijk jouw type
        <span aria-hidden>→</span>
      </Link>
    </article>
  );
}
