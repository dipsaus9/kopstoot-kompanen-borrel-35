/**
 * The composite superlatives view (BORREL-3.6).
 *
 * Turns one {@link Superlatives} payload into the playful-records page: a
 * giraffe-patch hero, a grid of superlative {@link LeaderboardTile}s (tallest,
 * most borrels, head-bump champion, earliest/latest arriver, most-asked "hoe
 * lang ben jij?") and the showcase {@link QuoteStrip}. Presentational — the
 * payload is loaded at build time by the server component in
 * `app/superlatieven/page.tsx` and handed down as a prop.
 */

import { LeaderboardTile } from "./leaderboard-tile";
import type { Superlatives } from "./leaderboards";
import { QuoteStrip } from "./quote-strip";

export interface SuperlativesViewProps {
  /** The precomputed superlatives payload to render. */
  readonly superlatives: Superlatives;
}

export function SuperlativesView({ superlatives }: SuperlativesViewProps) {
  const { count, leaderboards, quotes } = superlatives;

  return (
    <div className="flex flex-col gap-stack-lg">
      <header className="sr-only">
        <p className="text-caption font-bold tracking-eyebrow uppercase">
          De uitschieters en records
        </p>
        <h1 className="mt-stack-sm text-display font-black leading-colossus tracking-display text-balance">
          Superlatieven
        </h1>
        <p className="mt-stack-md max-w-[46ch] text-body-lg font-medium leading-body text-pretty">
          De langste, de vroegste, de fanatiekste hoofdstoter — {count} Kompanen,
          een handvol eretitels en de mooiste antwoorden in hun eigen woorden.
        </p>
      </header>

      <section aria-labelledby="records-heading">
        <h2
          id="records-heading"
          className="mb-stack-md text-headline font-black tracking-heading text-foreground"
        >
          De erelijsten
        </h2>
        <div className="grid grid-cols-1 gap-stack-md sm:grid-cols-2 lg:grid-cols-3">
          {leaderboards.map((leaderboard) => (
            <LeaderboardTile key={leaderboard.id} leaderboard={leaderboard} />
          ))}
        </div>
      </section>

      {quotes.length > 0 && (
        <section aria-labelledby="quotes-heading">
          <h2
            id="quotes-heading"
            className="mb-stack-md text-headline font-black tracking-heading text-foreground"
          >
            In hun eigen woorden
          </h2>
          <QuoteStrip quotes={quotes} />
        </section>
      )}
    </div>
  );
}
