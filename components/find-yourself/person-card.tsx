/**
 * The personal find-yourself card (BORREL-3.5, restyled + deviation in BORREL-4.7).
 *
 * Presentational only: renders one precomputed {@link Person} as their own
 * sticker card — the "% gemiddelde Kompaan" hero with its matched-trait readout,
 * a deviation-from-average readout (their distance from the Average Kompaan plus
 * the traits where they diverge most, BORREL-4.3), their headline stats and
 * answers (reusing the profile tiles), their free-text quotes, and the archetype
 * badge linked to its own per-type page (BORREL-4.6). All data is embedded at
 * build time by the server page; nothing is fetched here.
 *
 * The archetype's mapped brand hue (BORREL-2.3) is bound to a local
 * `--archetype-hue` custom property used only as decoration (the badge disc, the
 * score ring, the matched-trait bullets), so text contrast never depends on the
 * light/dark-varying accent colour.
 */

import Link from "next/link";
import type { CSSProperties } from "react";

import { AnswerTile, StatTile } from "@/components/profile";

import type { Person } from "./people";

export interface PersonCardProps {
  /** The precomputed person to render. */
  readonly person: Person;
}

/** How many divergent traits the deviation readout lists. */
const TOP_DIVERGENT = 3;

export function PersonCard({ person }: PersonCardProps) {
  const { name, match, deviation, archetype, stats, answers, quotes } = person;
  const hueStyle = {
    "--archetype-hue": `var(${archetype.hueVar})`,
  } as CSSProperties;

  const topDivergent = deviation.divergent.slice(0, TOP_DIVERGENT);

  return (
    <article
      style={hueStyle}
      className="sticker flex flex-col gap-stack-lg rounded-4xl border-t-[6px] border-t-[color:var(--archetype-hue)] bg-card p-stack-lg"
    >
      <header className="flex flex-col gap-stack-xs">
        <p className="text-caption font-bold tracking-eyebrow text-muted-foreground uppercase">
          Jouw Kompaan-kaart
        </p>
        <h2 className="text-headline font-black leading-heading tracking-heading text-foreground text-balance">
          {name}
        </h2>
      </header>

      {/* % gemiddelde Kompaan hero + matched-trait readout */}
      <section
        aria-labelledby="match-heading"
        className="ink-outline flex flex-col gap-stack-md rounded-3xl bg-secondary/40 p-stack-md"
      >
        <div className="flex items-center gap-stack-md">
          <p className="flex items-baseline gap-1">
            <span className="text-display font-black leading-display tracking-display text-primary">
              {match.score}
            </span>
            <span className="text-headline font-black leading-none text-primary">
              %
            </span>
          </p>
          <div className="min-w-0">
            <h3
              id="match-heading"
              className="text-lead font-black leading-heading text-foreground text-balance"
            >
              gemiddelde Kompaan
            </h3>
            <p className="text-body font-medium leading-body text-muted-foreground">
              Je deelt {match.matchedCount} van de {match.total} antwoorden met
              de gemiddelde Kompaan.
            </p>
          </div>
        </div>

        <div>
          <h4 className="mb-stack-sm text-caption font-bold tracking-eyebrow text-muted-foreground uppercase">
            Wat je deelt met de groep
          </h4>
          {match.matched.length > 0 ? (
            <ul className="flex flex-col gap-stack-xs">
              {match.matched.map((trait) => (
                <li
                  key={trait.key}
                  className="flex gap-stack-sm text-body font-medium leading-body text-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-[0.5em] size-2 shrink-0 rounded-pill bg-[color:var(--archetype-hue)]"
                  />
                  <span className="text-pretty">
                    <span className="text-muted-foreground">{trait.label}: </span>
                    <span className="font-bold">{trait.value}</span>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-body font-medium text-muted-foreground">
              Op geen enkel antwoord kies je hetzelfde als de gemiddelde
              Kompaan — heerlijk eigenzinnig.
            </p>
          )}
        </div>
      </section>

      {/* Deviation-from-average readout (AC #2, BORREL-4.3) */}
      <section
        aria-labelledby="deviation-heading"
        className="ink-outline flex flex-col gap-stack-md rounded-3xl bg-secondary/40 p-stack-md"
      >
        <div className="flex items-center gap-stack-md">
          <p className="flex items-baseline gap-1">
            <span className="text-display font-black leading-display tracking-display text-accent">
              {deviation.score}
            </span>
            <span className="text-headline font-black leading-none text-accent">
              %
            </span>
          </p>
          <div className="min-w-0">
            <h3
              id="deviation-heading"
              className="text-lead font-black leading-heading text-foreground text-balance"
            >
              afwijking van gemiddeld
            </h3>
            <p className="text-body font-medium leading-body text-muted-foreground">
              Op {deviation.divergentCount} van de {deviation.total} antwoorden
              wijk je af van de gemiddelde Kompaan.
            </p>
          </div>
        </div>

        <div>
          <h4 className="mb-stack-sm text-caption font-bold tracking-eyebrow text-muted-foreground uppercase">
            Waar je het meest afwijkt
          </h4>
          {topDivergent.length > 0 ? (
            <ul className="flex flex-col gap-stack-sm">
              {topDivergent.map((trait) => (
                <li
                  key={trait.key}
                  className="text-body font-medium leading-body text-foreground"
                >
                  <p className="text-pretty">
                    <span className="font-bold text-foreground">
                      {trait.value}
                    </span>
                    <span className="text-muted-foreground">
                      {" "}
                      — de groep koos meestal{" "}
                    </span>
                    <span className="font-bold text-foreground">
                      {trait.modal}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-body font-medium text-muted-foreground">
              Je kiest overal hetzelfde als de gemiddelde Kompaan — nul afwijking.
            </p>
          )}
        </div>
      </section>

      {/* Archetype badge, linked to its own per-type page (AC #2) */}
      <section aria-labelledby="archetype-heading">
        <h3
          id="archetype-heading"
          className="mb-stack-sm text-caption font-bold tracking-eyebrow text-muted-foreground uppercase"
        >
          Jouw borrel-type
        </h3>
        <Link
          href={archetype.href}
          className="ink-outline group inline-flex min-h-tap items-center gap-stack-sm rounded-pill bg-card py-2 pl-2 pr-stack-md transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--archetype-hue)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span
            aria-hidden
            className="flex size-11 shrink-0 items-center justify-center rounded-pill bg-[color:var(--archetype-hue)] text-title leading-none"
          >
            {archetype.emoji}
          </span>
          <span className="flex flex-col text-left">
            <span className="text-lead font-black leading-heading text-foreground">
              {archetype.name}
            </span>
            <span className="text-caption font-bold tracking-eyebrow text-muted-foreground uppercase group-hover:text-foreground">
              Bekijk jouw type →
            </span>
          </span>
        </Link>
      </section>

      {/* The person's own answers */}
      <section aria-labelledby="stats-heading">
        <h3 id="stats-heading" className="sr-only">
          Jouw cijfers
        </h3>
        <div className="grid grid-cols-1 gap-stack-md sm:grid-cols-3">
          {stats.map((stat) => (
            <StatTile
              key={stat.key}
              emoji={stat.emoji}
              value={stat.value}
              unit={stat.unit}
              label={stat.label}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="answers-heading">
        <h3
          id="answers-heading"
          className="mb-stack-md text-title font-black tracking-heading text-foreground"
        >
          Zo borrel jij
        </h3>
        <div className="grid grid-cols-1 gap-stack-md sm:grid-cols-2 lg:grid-cols-3">
          {answers.map((answer) => (
            <AnswerTile
              key={answer.key}
              emoji={answer.emoji}
              caption={answer.caption}
              answer={answer.value}
            />
          ))}
        </div>
      </section>

      {quotes.length > 0 && (
        <section aria-labelledby="quotes-heading">
          <h3
            id="quotes-heading"
            className="mb-stack-md text-title font-black tracking-heading text-foreground"
          >
            In jouw eigen woorden
          </h3>
          <ul className="flex flex-col gap-stack-md">
            {quotes.map((quote) => (
              <li
                key={quote.label}
                className="ink-outline rounded-2xl bg-card p-stack-md"
              >
                <p className="mb-stack-xs text-caption font-bold tracking-eyebrow text-muted-foreground uppercase">
                  {quote.label}
                </p>
                <p className="text-body-lg font-medium leading-body text-foreground text-pretty">
                  “{quote.text}”
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
