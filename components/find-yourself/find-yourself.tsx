"use client";

/**
 * The find-yourself view (BORREL-3.5): pick your own name from the committed
 * responses and see your personal Kompaan card.
 *
 * A client component purely for the name-selection interaction — but it holds no
 * data of its own: the full precomputed {@link Person} dataset is embedded at
 * build time by the server page (`app/vind-jezelf/page.tsx`) and handed down as
 * a prop, so nothing is fetched at runtime (the static explorer, per the locked
 * decision). Real names are listed openly (locked decision). Selection is keyed
 * on the positional `id`, so duplicate names never collide.
 */

import { useMemo, useState } from "react";

import type { Person } from "./people";
import { PersonCard } from "./person-card";

export interface FindYourselfProps {
  /** Every respondent, precomputed at build time, in dataset order. */
  readonly people: readonly Person[];
}

/** Case/diacritics-insensitive haystack for matching a typed query. */
function normalise(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

export function FindYourself({ people }: FindYourselfProps) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const needle = normalise(query);
    if (needle === "") return people;
    return people.filter((person) => normalise(person.name).includes(needle));
  }, [people, query]);

  const selected = useMemo(
    () => people.find((person) => person.id === selectedId) ?? null,
    [people, selectedId],
  );

  return (
    <div className="flex flex-col gap-stack-lg">
      <header className="giraffe-spots relative overflow-hidden rounded-4xl border border-border p-stack-lg text-cocoa shadow-sm">
        <p className="text-caption font-bold tracking-eyebrow uppercase">
          Vind jezelf in de borrel
        </p>
        <h1 className="mt-stack-sm text-display font-black leading-colossus tracking-display text-balance">
          Welke Kompaan ben jij?
        </h1>
        <p className="mt-stack-md max-w-[46ch] text-body-lg font-medium leading-body">
          Zoek je eigen naam op en ontdek hoezeer je op de gemiddelde Kompaan
          lijkt, welke antwoorden je met de groep deelt en welk borrel-archetype
          bij je hoort.
        </p>
      </header>

      <section aria-labelledby="picker-heading" className="flex flex-col gap-stack-md">
        <h2
          id="picker-heading"
          className="text-title font-black tracking-heading text-foreground"
        >
          Kies jouw naam
        </h2>

        <div className="flex flex-col gap-stack-xs">
          <label
            htmlFor="find-yourself-search"
            className="text-caption font-bold tracking-eyebrow text-muted-foreground uppercase"
          >
            Zoek op naam
          </label>
          <input
            id="find-yourself-search"
            type="search"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Typ je naam…"
            className="w-full max-w-sm rounded-pill border border-input bg-card px-stack-md py-2 text-body font-medium text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          />
        </div>

        {filtered.length > 0 ? (
          <ul className="flex flex-wrap gap-stack-xs">
            {filtered.map((person) => {
              const isSelected = person.id === selectedId;
              return (
                <li key={person.id}>
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedId(person.id)}
                    className={`rounded-pill border px-stack-md py-2 text-body font-bold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary hover:bg-secondary"
                    }`}
                  >
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

      {selected ? (
        <PersonCard person={selected} />
      ) : (
        <p className="rounded-3xl border border-dashed border-border bg-card/50 p-stack-lg text-body-lg font-medium text-muted-foreground">
          Kies hierboven je naam om jouw persoonlijke Kompaan-kaart te zien.
        </p>
      )}
    </div>
  );
}
