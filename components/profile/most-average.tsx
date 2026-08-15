/**
 * The most-average Kompaan reveal (BORREL-4.7).
 *
 * Turns an {@link AverageRanking} (BORREL-4.3) into the closing act of the
 * `/gemiddelde` page: who, of everyone, sits closest to the Average Kompaan —
 * the single highest "% gemiddelde Kompaan" — plus a short closest-to-average
 * leaderboard (top N). Presentational only: the ranking is computed at
 * build/server time by the server page and handed down as a prop. Real names are
 * shown openly (locked decision).
 */

import type { AverageRanking } from "@/lib/aggregate";

export interface MostAverageProps {
  /** The whole dataset ranked most→least average (BORREL-4.3). */
  readonly ranking: AverageRanking;
  /** How many people the short leaderboard shows. Defaults to 5. */
  readonly topN?: number;
}

export function MostAverage({ ranking, topN = 5 }: MostAverageProps) {
  const { mostAverage, people } = ranking;

  if (mostAverage === null) {
    return null;
  }

  const leaderboard = people.slice(0, Math.max(0, topN));

  return (
    <section
      aria-labelledby="most-average-heading"
      className="flex flex-col gap-stack-lg"
    >
      <div className="flex flex-col gap-stack-xs">
        <h2
          id="most-average-heading"
          className="text-headline font-black tracking-heading text-foreground"
        >
          De meest gemiddelde Kompaan
        </h2>
        <p className="max-w-[52ch] text-body font-medium leading-body text-muted-foreground text-pretty">
          Van alle Kompanen lijkt deze het meest op het gemiddelde profiel — de
          hoogste “% gemiddelde Kompaan” van de hele borrel.
        </p>
      </div>

      {/* The winner — the single most-average Kompaan. */}
      <article className="sticker cel-shade flex flex-col gap-stack-sm rounded-4xl p-stack-lg text-type-ink">
        <p className="text-caption font-black tracking-eyebrow uppercase">
          Meest gemiddeld
        </p>
        <p className="text-display font-black leading-display tracking-display text-balance">
          {mostAverage.name}
        </p>
        <p className="flex items-baseline gap-1.5 text-lead font-bold">
          <span className="text-display-sm font-black leading-none">
            {mostAverage.match}%
          </span>
          gemiddelde Kompaan
        </p>
      </article>

      {/* Short closest-to-average leaderboard. */}
      <div>
        <h3 className="mb-stack-md text-title font-black tracking-heading text-foreground">
          Dichtst bij het gemiddelde
        </h3>
        <ol className="flex flex-col gap-stack-sm">
          {leaderboard.map((person) => (
            <li
              key={person.index}
              className="ink-outline flex items-center gap-stack-md rounded-2xl bg-card p-stack-md"
            >
              <span
                aria-hidden
                className="flex size-9 shrink-0 items-center justify-center rounded-pill bg-secondary text-body font-black text-secondary-foreground"
              >
                {person.rank}
              </span>
              <span className="min-w-0 flex-1 text-body-lg font-bold text-foreground text-pretty">
                {person.name}
              </span>
              <span className="shrink-0 text-lead font-black tabular-nums text-primary">
                {person.match}%
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
