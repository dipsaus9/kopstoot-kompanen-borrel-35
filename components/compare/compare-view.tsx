"use client";

/**
 * The compare view (BORREL-4.8): pick several kompanen by name and see their
 * type, deviation-from-average and answers side by side, aligned per question.
 *
 * A client component purely for the multi-select interaction — it holds no data
 * of its own: the full precomputed {@link ComparePerson} dataset is embedded at
 * build time by the server page (`app/vergelijk/page.tsx`) and handed down as a
 * prop, so nothing is fetched at runtime (the static explorer, per the locked
 * decision). Real names are listed openly (locked decision). Selection is keyed
 * on the positional `id`, so duplicate names never collide.
 *
 * Layout: the selected people become the columns of one aligned table (question
 * per row), which scrolls horizontally inside a labelled, keyboard-focusable
 * region on a narrow screen — the row-header column stays pinned so every answer
 * keeps its question. Each column header carries the person's archetype (linked
 * to `/typetjes/<id>`) and their deviation readout; a per-cell dot marks answers
 * shared with the Average Kompaan, and a fully-agreed row is flagged so matches
 * pop out.
 */

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

import { COMPARE_ROWS, type ComparePerson } from "./rows";

export interface CompareViewProps {
  /** Every respondent, precomputed at build time, in dataset order. */
  readonly people: readonly ComparePerson[];
}

/** Case/diacritics-insensitive haystack for matching a typed query. */
function normalise(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

export function CompareView({ people }: CompareViewProps) {
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<readonly string[]>([]);

  const filtered = useMemo(() => {
    const needle = normalise(query);
    if (needle === "") return people;
    return people.filter((person) => normalise(person.name).includes(needle));
  }, [people, query]);

  // Keep the columns in selection order so the table is stable and predictable.
  const selected = useMemo(
    () =>
      selectedIds
        .map((id) => people.find((person) => person.id === id))
        .filter((person): person is ComparePerson => person !== undefined),
    [people, selectedIds],
  );

  const toggle = (id: string) =>
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id],
    );

  // Row-level agreement: with 2+ people, a row where everyone gave the same
  // answer is the money moment of a comparison, so flag it.
  const agreed = useMemo(() => {
    return COMPARE_ROWS.map((_, rowIndex) => {
      if (selected.length < 2) return false;
      const first = selected[0].cells[rowIndex].value;
      return selected.every((person) => person.cells[rowIndex].value === first);
    });
  }, [selected]);

  return (
    <div className="flex flex-col gap-stack-lg">
      <header className="giraffe-spots sticker relative overflow-hidden rounded-4xl p-stack-lg text-cocoa">
        <p className="text-caption font-bold tracking-eyebrow uppercase">
          Zet Kompanen naast elkaar
        </p>
        <h1 className="mt-stack-sm text-display font-black leading-colossus tracking-display text-balance">
          Vergelijk de Kompanen
        </h1>
        <p className="mt-stack-md max-w-[46ch] text-body-lg font-medium leading-body">
          Kies meerdere namen en zie hun borrel-type, hoe sterk ze van de
          gemiddelde Kompaan afwijken en al hun antwoorden netjes per vraag naast
          elkaar.
        </p>
      </header>

      {/* Multi-select control */}
      <section
        aria-labelledby="picker-heading"
        className="flex flex-col gap-stack-md"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-stack-sm">
          <h2
            id="picker-heading"
            className="text-title font-black tracking-heading text-foreground"
          >
            Kies de Kompanen
          </h2>
          <p
            aria-live="polite"
            className="text-caption font-bold tracking-eyebrow text-muted-foreground uppercase"
          >
            {selected.length === 0
              ? "Nog niemand gekozen"
              : `${selected.length} gekozen`}
          </p>
        </div>

        <div className="flex flex-col gap-stack-xs">
          <label
            htmlFor="compare-search"
            className="text-caption font-bold tracking-eyebrow text-muted-foreground uppercase"
          >
            Zoek op naam
          </label>
          <input
            id="compare-search"
            type="search"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Typ een naam…"
            className="ink-outline min-h-tap w-full max-w-sm rounded-pill bg-card px-stack-md py-2 text-body font-medium text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          />
        </div>

        {filtered.length > 0 ? (
          <ul className="flex flex-wrap gap-stack-xs">
            {filtered.map((person) => {
              const isSelected = selectedIds.includes(person.id);
              return (
                <li key={person.id}>
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggle(person.id)}
                    className={`ink-outline min-h-tap rounded-pill px-stack-md py-2 text-body font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-foreground hover:bg-secondary"
                    }`}
                  >
                    <span aria-hidden className="mr-1">
                      {isSelected ? "✓" : "+"}
                    </span>
                    {person.name}
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

      {/* Side-by-side comparison */}
      {selected.length > 0 ? (
        <section aria-labelledby="compare-heading" className="flex flex-col gap-stack-md">
          <h2 id="compare-heading" className="sr-only">
            Vergelijking
          </h2>
          <div
            role="region"
            aria-labelledby="compare-heading"
            tabIndex={0}
            className="ink-outline overflow-x-auto rounded-3xl bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <table className="w-full border-separate border-spacing-0 text-left">
              <caption className="sr-only">
                Geselecteerde Kompanen per vraag naast elkaar, met hun type en
                afwijking van de gemiddelde Kompaan.
              </caption>
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky left-0 z-20 min-w-[9rem] bg-secondary p-stack-sm align-bottom text-caption font-bold tracking-eyebrow text-muted-foreground uppercase"
                  >
                    Kompaan
                  </th>
                  {selected.map((person) => {
                    const hueStyle = {
                      "--archetype-hue": `var(${person.archetype.hueVar})`,
                    } as CSSProperties;
                    return (
                      <th
                        key={person.id}
                        scope="col"
                        style={hueStyle}
                        className="min-w-[12rem] border-l border-[color:var(--border)] border-t-[6px] border-t-[color:var(--archetype-hue)] bg-secondary p-stack-sm align-top"
                      >
                        <div className="flex flex-col gap-stack-xs">
                          <div className="flex items-start justify-between gap-stack-xs">
                            <span className="text-lead font-black leading-heading text-foreground text-balance">
                              {person.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => toggle(person.id)}
                              aria-label={`${person.name} uit de vergelijking halen`}
                              className="ink-outline flex size-8 shrink-0 items-center justify-center rounded-pill bg-card text-body font-black leading-none text-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                              <span aria-hidden>×</span>
                            </button>
                          </div>

                          <Link
                            href={person.archetype.href}
                            className="ink-outline group inline-flex min-h-tap w-fit items-center gap-stack-xs rounded-pill bg-card py-1 pl-1 pr-stack-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--archetype-hue)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          >
                            <span
                              aria-hidden
                              className="flex size-8 shrink-0 items-center justify-center rounded-pill bg-[color:var(--archetype-hue)] text-body-lg leading-none"
                            >
                              {person.archetype.emoji}
                            </span>
                            <span className="text-caption font-black leading-tight text-foreground text-balance group-hover:underline">
                              {person.archetype.name}
                            </span>
                          </Link>

                          <div className="mt-stack-xs flex flex-col gap-1 text-body font-medium normal-case">
                            <p className="flex items-baseline gap-1 tracking-normal">
                              <span className="text-title font-black leading-none text-accent">
                                {person.deviation.score}%
                              </span>
                              <span className="text-caption font-bold tracking-eyebrow text-muted-foreground uppercase">
                                afwijking
                              </span>
                            </p>
                            <p className="text-caption font-medium normal-case tracking-normal text-muted-foreground">
                              {person.deviation.match}% gemiddelde Kompaan · wijkt af
                              op {person.deviation.divergentCount}/
                              {person.deviation.total}
                            </p>
                          </div>

                          {person.deviation.keyDivergences.length > 0 && (
                            <div className="mt-stack-xs">
                              <p className="text-caption font-bold tracking-eyebrow text-muted-foreground uppercase">
                                Wijkt het meest af
                              </p>
                              <ul className="mt-1 flex flex-col gap-1">
                                {person.deviation.keyDivergences.map((trait) => (
                                  <li
                                    key={trait.key}
                                    className="text-caption font-medium normal-case tracking-normal leading-tight text-foreground text-pretty"
                                  >
                                    <span className="font-bold">
                                      {trait.value}
                                    </span>
                                    <span className="text-muted-foreground">
                                      {" "}
                                      ({trait.label})
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, rowIndex) => {
                  const isAgreed = agreed[rowIndex];
                  return (
                    <tr key={row.key} className={isAgreed ? "bg-primary/10" : undefined}>
                      <th
                        scope="row"
                        className={`sticky left-0 z-10 min-w-[9rem] border-t border-[color:var(--border)] p-stack-sm align-top text-caption font-bold tracking-eyebrow text-muted-foreground uppercase ${
                          isAgreed ? "bg-primary/10" : "bg-card"
                        }`}
                      >
                        <span className="flex items-center gap-1.5 text-pretty normal-case">
                          <span aria-hidden className="text-body-lg leading-none">
                            {row.emoji}
                          </span>
                          <span className="text-caption font-bold tracking-eyebrow uppercase">
                            {row.label}
                          </span>
                        </span>
                        {isAgreed && (
                          <span className="mt-1 inline-flex items-center gap-1 rounded-pill bg-primary px-2 py-0.5 text-caption font-black normal-case tracking-normal text-primary-foreground">
                            🤝 eensgezind
                          </span>
                        )}
                      </th>
                      {selected.map((person) => {
                        const cell = person.cells[rowIndex];
                        return (
                          <td
                            key={person.id}
                            className="border-l border-t border-[color:var(--border)] p-stack-sm align-top"
                          >
                            <span className="flex items-start gap-1.5">
                              {cell.isAverage && (
                                <span
                                  aria-hidden
                                  title="Zelfde als de gemiddelde Kompaan"
                                  className="mt-[0.45em] size-2 shrink-0 rounded-pill bg-primary"
                                />
                              )}
                              <span className="text-body font-bold leading-body text-foreground text-pretty">
                                {cell.value}
                                {row.numeric && row.unit ? (
                                  <span className="font-medium text-muted-foreground">
                                    {" "}
                                    {row.unit}
                                  </span>
                                ) : null}
                                {cell.isAverage && (
                                  <span className="sr-only">
                                    {" "}
                                    (zelfde als de gemiddelde Kompaan)
                                  </span>
                                )}
                              </span>
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="text-caption font-medium text-muted-foreground">
            <span aria-hidden className="mr-1 inline-block size-2 rounded-pill bg-primary align-middle" />
            Een stip betekent: dit antwoord is gelijk aan de gemiddelde Kompaan.
            Op een smal scherm scrol je de tabel horizontaal.
          </p>
        </section>
      ) : (
        <p className="ink-outline rounded-3xl border-dashed bg-card/50 p-stack-lg text-body-lg font-medium text-muted-foreground">
          Kies hierboven twee of meer Kompanen om ze naast elkaar te zetten.
        </p>
      )}
    </div>
  );
}
