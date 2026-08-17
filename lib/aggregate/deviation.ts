/**
 * Per-person deviation from the Average Kompaan + a most-average ranking
 * (BORREL-4.3).
 *
 * Two build-time views layered on top of the existing aggregation library:
 *
 *   · computeDeviation(response) — how *far* one person sits from the Average
 *     Kompaan: a 0–100 deviation score (the mirror of the % match) plus the
 *     traits where they diverge most, i.e. the modal answers they do NOT share,
 *     ranked by how dominant that average answer is.
 *   · getAverageRanking()        — every person ordered from most to least
 *     average (highest match / lowest deviation), exposing the single most
 *     average Kompaan of all.
 *
 * Both reuse {@link matchAgainst}/{@link getAggregate} and are pure over
 * `getResponses()`/`getAggregate()` — no runtime fetch, no browser, and fully
 * deterministic: every ordering has an explicit, data-independent tie-break, so
 * the result never depends on row ordering beyond the dataset itself.
 */

import { aggregateResponses, getAggregate, type Aggregate } from "./aggregate";
import { matchAgainst, MATCH_FIELDS, type MatchResult } from "./match";
import { getLoadedResponses, getResponses } from "../data";
import type { SurveyResponse } from "../data";

/** One tracked question on which a person diverges from the Average Kompaan. */
export interface DivergentTrait {
  /** The response property / question key. */
  readonly key: (typeof MATCH_FIELDS)[number]["key"];
  /** The human-readable question label (from the schema). */
  readonly label: string;
  /** This person's own answer (verbatim form text). */
  readonly value: string;
  /** The Average Kompaan's modal answer they do not share. */
  readonly modal: string;
  /** The modal answer's share of the dataset, in [0, 1] — higher = bigger miss. */
  readonly modalShare: number;
}

/** The result of measuring one response's distance from the aggregate. */
export interface DeviationResult {
  /** Deviation score: `100 - match%`, an integer 0–100. */
  readonly score: number;
  /** The person's underlying "% gemiddelde Kompaan" match, an integer 0–100. */
  readonly match: number;
  /** Number of tracked questions on which the person diverges. */
  readonly divergentCount: number;
  /** Number of tracked questions considered. */
  readonly total: number;
  /**
   * The diverging questions, most-different first: ordered by the modal answer's
   * share descending (missing the strongest consensus deviates most), with
   * schema order as a deterministic tie-break.
   */
  readonly divergent: readonly DivergentTrait[];
}

/** One person's standing in the most-average ranking. */
export interface RankedPerson {
  /** Position in `getResponses()` (stable identity of the row). */
  readonly index: number;
  /** The person's name (verbatim). */
  readonly name: string;
  /** Their "% gemiddelde Kompaan" match, an integer 0–100. */
  readonly match: number;
  /** Their deviation score (`100 - match`), an integer 0–100. */
  readonly deviation: number;
  /** 1-based rank, 1 = most average. */
  readonly rank: number;
}

/** The whole dataset ordered from most to least average. */
export interface AverageRanking {
  /** Everyone, most-average first (highest match / lowest deviation). */
  readonly people: readonly RankedPerson[];
  /** The single most-average Kompaan, or `null` for an empty dataset. */
  readonly mostAverage: RankedPerson | null;
}

/**
 * Measure a response against a given aggregate. Pure — takes the aggregate
 * explicitly so callers can reuse one aggregate across many responses.
 * {@link computeDeviation} is the convenience loader.
 */
export function deviationAgainst(
  response: SurveyResponse,
  aggregate: Aggregate,
): DeviationResult {
  const match: MatchResult = matchAgainst(response, aggregate);

  const divergent: DivergentTrait[] = [];
  for (const field of MATCH_FIELDS) {
    const modal = aggregate.modes[field.key];
    if (modal === undefined) continue;
    const value = String(response[field.key]);
    if (value !== modal.option) {
      divergent.push({
        key: field.key,
        label: field.label,
        value,
        modal: modal.option,
        modalShare: modal.share,
      });
    }
  }

  // Most-different first: biggest missed consensus (modal share) leads; ties
  // fall back to schema order (the push order above), kept via a stable sort.
  divergent.sort((a, b) => b.modalShare - a.modalShare);

  return {
    score: 100 - match.score,
    match: match.score,
    divergentCount: divergent.length,
    total: match.total,
    divergent,
  };
}

/**
 * Measure one response's distance from the whole dataset's Average Kompaan.
 * Build/server-time only.
 */
export function computeDeviation(response: SurveyResponse): DeviationResult {
  return deviationAgainst(response, aggregateResponses(getLoadedResponses()));
}

/**
 * Rank an explicit response set from most to least average against a given
 * aggregate. Pure and deterministic: sorted by match descending (deviation
 * ascending), with the dataset index as a stable tie-break so equally-average
 * people always order the same way. {@link getAverageRanking} is the loader.
 */
export function rankByAverage(
  responses: readonly SurveyResponse[],
  aggregate: Aggregate,
): AverageRanking {
  const scored = responses.map((response, index) => {
    const match = matchAgainst(response, aggregate).score;
    return { index, name: response.name, match, deviation: 100 - match };
  });

  // Highest match first; ties resolve on the original dataset index (ascending).
  scored.sort((a, b) => b.match - a.match || a.index - b.index);

  const people: RankedPerson[] = scored.map((person, position) => ({
    ...person,
    rank: position + 1,
  }));

  return { people, mostAverage: people[0] ?? null };
}

/**
 * The whole dataset ranked from most to least average against its own Average
 * Kompaan aggregate. Build/server-time only.
 */
export async function getAverageRanking(): Promise<AverageRanking> {
  return rankByAverage(await getResponses(), await getAggregate());
}
