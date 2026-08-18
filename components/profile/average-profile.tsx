/**
 * The composite Average Kompaan card (BORREL-3.3).
 *
 * Turns one {@link Aggregate} into the landing view: a giraffe-patch hero, the
 * three headline numeric stats (age, height, borrel count) as oversized tiles,
 * and a curated set of the most-picked fun answers rendered as the Kompaan's
 * own traits. Presentational — the aggregate is loaded at build time by the
 * server component in `app/page.tsx` and handed down as a prop.
 */

import type { Aggregate, NumericStatKey } from "@/lib/aggregate";
import type { SurveyResponseKey } from "@/lib/data";

import { AnswerTile } from "./answer-tile";
import { ProfileHero } from "./profile-hero";
import { StatTile } from "./stat-tile";

/** One oversized numeric headline, keyed to an aggregate mean. */
interface StatConfig {
  readonly key: NumericStatKey;
  readonly emoji: string;
  readonly unit: string;
  readonly label: string;
}

/** The three headline stats, in reading order. */
const STAT_CONFIG: readonly StatConfig[] = [
  { key: "age", emoji: "🎂", unit: "jaar", label: "Gemiddelde leeftijd" },
  { key: "heightCm", emoji: "🦒", unit: "cm", label: "Gemiddelde lengte" },
  {
    key: "borrelCount",
    emoji: "🍻",
    unit: "borrels",
    label: "Borrels op de teller",
  },
];

/** One curated fun answer, keyed to a modal (most-picked) closed question. */
interface AnswerConfig {
  readonly key: SurveyResponseKey;
  readonly emoji: string;
  readonly caption: string;
}

/**
 * The curated, playful subset of closed questions shown as the Average
 * Kompaan's traits — the strongest character signals, not every field.
 */
const ANSWER_CONFIG: readonly AnswerConfig[] = [
  { key: "borrelRole", emoji: "🎉", caption: "Op een borrel meestal" },
  { key: "drink", emoji: "🍷", caption: "Vaste borrel-drankje" },
  { key: "idealBorrel", emoji: "✨", caption: "Ideale borrel" },
  { key: "borrelEnding", emoji: "🌙", caption: "Zo eindigt de borrel" },
  { key: "tallStruggle", emoji: "📏", caption: "Grootste lange-mensen-struggle" },
  { key: "borrelSuperpower", emoji: "⚡", caption: "Gekozen borrel-superkracht" },
];

/** Round a mean to a clean whole-number headline. */
function formatStat(value: number): string {
  return Math.round(value).toString();
}

export function AverageProfile({ aggregate }: { aggregate: Aggregate }) {
  const answers = ANSWER_CONFIG.map((config) => ({
    ...config,
    answer: aggregate.modes[config.key]?.option ?? null,
  })).filter(
    (entry): entry is typeof entry & { answer: string } =>
      entry.answer !== null && entry.answer !== "",
  );

  return (
    <div className="flex flex-col gap-stack-lg">
      <ProfileHero responseCount={aggregate.count} />

      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          De cijfers
        </h2>
        <div className="grid grid-cols-1 gap-stack-md sm:grid-cols-3">
          {STAT_CONFIG.map((stat) => (
            <StatTile
              key={stat.key}
              emoji={stat.emoji}
              value={formatStat(aggregate.means[stat.key])}
              unit={stat.unit}
              label={stat.label}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="traits-heading">
        <h2
          id="traits-heading"
          className="mb-stack-md text-headline font-black tracking-heading text-foreground"
        >
          Zo borrelt de gemiddelde Kompaan
        </h2>
        <div className="grid grid-cols-1 gap-stack-md sm:grid-cols-2 lg:grid-cols-3">
          {answers.map((entry) => (
            <AnswerTile
              key={entry.key}
              emoji={entry.emoji}
              caption={entry.caption}
              answer={entry.answer}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
