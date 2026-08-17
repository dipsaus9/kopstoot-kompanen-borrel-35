/**
 * Build-time dataset for the compare view (BORREL-4.8).
 *
 * `getComparePeople()` turns every canonical {@link SurveyResponse} into a
 * self-contained, serialisable {@link ComparePerson}: their resolved archetype
 * (linked to its own `/typetjes/<id>` page, BORREL-4.6), how far they deviate
 * from the Average Kompaan (score + the traits where they diverge most, via
 * `deviationAgainst`, BORREL-4.3), plus a per-question answer row aligned to the
 * shared {@link COMPARE_ROWS} order so several people line up cleanly side by
 * side.
 *
 * Everything is computed here at build/server time over `getResponses()` and the
 * frozen archetype assignments — no runtime fetch and no DB (the static
 * explorer, per the locked decision). The client selector receives the finished
 * array as a prop and holds no server data of its own. Real names are embedded
 * verbatim (locked decision). Rows are keyed by their positional `id`
 * (`p<index>`) so duplicate names never collide. The shapes and the row config
 * live in `./rows.ts` (runtime-dependency-free) so the client can share them
 * without pulling this module's `node:fs` data loader into the browser.
 */

import {
  deviationAgainst,
  getAggregate,
  resolveArchetype,
  type Aggregate,
} from "@/lib/aggregate";
import { getResponses } from "@/lib/data";
import type { SurveyResponse } from "@/lib/data";

import { COMPARE_ROWS, type CompareCell, type ComparePerson } from "./rows";

/** How many divergent traits the deviation summary lists per person. */
const TOP_DIVERGENT = 3;

/**
 * Per-archetype accent, mirroring the "one accent per archetype family" mapping
 * in `app/theme/tokens.css` (and the find-yourself/archetype views). Kept local
 * so the compare view owns its presentation without reaching into another view.
 */
const ARCHETYPE_PRESENTATION: Readonly<
  Record<string, { emoji: string; hueVar: string }>
> = {
  parkborrelprofessional: { hueVar: "--brand-park", emoji: "🌳" },
  "festival-flamingo": { hueVar: "--brand-flamingo", emoji: "🦩" },
  "salmari-soldaat": { hueVar: "--brand-liquorice", emoji: "🖤" },
  "lange-nachtbraker": { hueVar: "--brand-night", emoji: "🌙" },
  "verantwoordelijke-kompaan": { hueVar: "--brand-park", emoji: "🏡" },
  "bedtijd-baron": { hueVar: "--brand-wine", emoji: "🛏️" },
};

/** Giraffe-gold fallback, should an archetype id ever lack an accent. */
const FALLBACK_PRESENTATION = { hueVar: "--brand-giraffe", emoji: "🦒" };

/** Round a numeric answer to a clean whole-number headline. */
function formatStat(value: number): string {
  return Math.round(Number(value)).toString();
}

/**
 * Build one {@link ComparePerson} from a canonical response and its positional
 * index. The aggregate is passed in so the caller computes it once for the whole
 * set, and so each cell's `isAverage` flag reuses the same modal profile the
 * deviation is measured against.
 */
function buildPerson(
  response: SurveyResponse,
  index: number,
  aggregate: Aggregate,
): ComparePerson {
  const archetype = resolveArchetype(response);
  const presentation =
    ARCHETYPE_PRESENTATION[archetype.id] ?? FALLBACK_PRESENTATION;

  const deviation = deviationAgainst(response, aggregate);

  const cells: CompareCell[] = COMPARE_ROWS.map((row) => {
    const raw = response[row.key];
    if (row.numeric) {
      return { key: row.key, value: formatStat(Number(raw)), isAverage: false };
    }
    const value = String(raw);
    const modal = aggregate.modes[row.key];
    return { key: row.key, value, isAverage: modal?.option === value };
  });

  return {
    id: `p${index}`,
    name: response.name,
    archetype: {
      id: archetype.id,
      name: archetype.name,
      emoji: presentation.emoji,
      hueVar: presentation.hueVar,
      href: `/typetjes/${archetype.id}`,
    },
    deviation: {
      score: deviation.score,
      match: deviation.match,
      divergentCount: deviation.divergentCount,
      total: deviation.total,
      keyDivergences: deviation.divergent.slice(0, TOP_DIVERGENT),
    },
    cells,
  };
}

/**
 * Every respondent as a precomputed {@link ComparePerson}, in dataset order.
 * Reads `getResponses()` and the frozen archetype assignments at build/server
 * time only — no runtime fetch, no browser access, fully deterministic.
 */
export async function getComparePeople(): Promise<readonly ComparePerson[]> {
  const responses = await getResponses();
  const aggregate = await getAggregate();
  return responses.map((response, index) =>
    buildPerson(response, index, aggregate),
  );
}
