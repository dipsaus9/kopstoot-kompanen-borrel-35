/**
 * Per-person "% gemiddelde Kompaan" match score (BORREL-3.1).
 *
 * `computeMatch(response)` compares one response's tracked answers against the
 * {@link Aggregate} modal profile and returns a 0–100 score — the share of
 * tracked questions on which this person matches the Average Kompaan — plus the
 * list of the traits that matched. The find-yourself view renders both.
 *
 * Tracked questions are the closed `stat`/`cluster` questions that also feed
 * clustering: the RSVP question (encoding `none`) is deliberately excluded, per
 * the schema, since it says nothing about who someone is. Numeric stats
 * (age/heightCm/borrelCount) are continuous means, not options, so they are not
 * part of the categorical match.
 */

import { aggregateResponses, type Aggregate } from "./aggregate";
import { getLoadedResponses, QUESTIONS } from "../data";
import type { SurveyResponse } from "../data";
import type { QuestionField } from "../data/schema";

/** A closed, single-choice question. */
type SingleField = Extract<QuestionField, { type: "single" }>;

/** One question on which a person matches the Average Kompaan. */
export interface MatchedTrait {
  /** The response property / question key. */
  readonly key: SingleField["key"];
  /** The human-readable question label (from the schema). */
  readonly label: string;
  /** The shared answer (verbatim form text). */
  readonly value: string;
}

/** The result of scoring one response against the aggregate. */
export interface MatchResult {
  /** "% gemiddelde Kompaan": matched share as an integer 0–100. */
  readonly score: number;
  /** Number of tracked questions that matched the modal answer. */
  readonly matchedCount: number;
  /** Number of tracked questions considered. */
  readonly total: number;
  /** The matched questions, in schema order. */
  readonly matched: readonly MatchedTrait[];
}

/**
 * The closed questions the match score is computed over: `stat`/`cluster`
 * single-choice questions, excluding the RSVP question (`encoding: "none"`),
 * which the schema keeps out of clustering and % match.
 */
export const MATCH_FIELDS: readonly SingleField[] = QUESTIONS.filter(
  (q): q is SingleField =>
    q.type === "single" &&
    (q.role === "stat" || q.role === "cluster") &&
    q.encoding !== "none",
);

/**
 * Score a response against a given aggregate. Pure — takes the aggregate
 * explicitly so callers can reuse one aggregate across many responses (and so
 * it is trivially testable). {@link computeMatch} is the convenience loader.
 */
export function matchAgainst(
  response: SurveyResponse,
  aggregate: Aggregate,
): MatchResult {
  const matched: MatchedTrait[] = [];

  for (const field of MATCH_FIELDS) {
    const modal = aggregate.modes[field.key];
    if (modal === undefined) continue;
    if (String(response[field.key]) === modal.option) {
      matched.push({ key: field.key, label: field.label, value: modal.option });
    }
  }

  const total = MATCH_FIELDS.length;
  const matchedCount = matched.length;
  const score = total === 0 ? 0 : Math.round((matchedCount / total) * 100);

  return { score, matchedCount, total, matched };
}

/**
 * Compute the "% gemiddelde Kompaan" match for one response against the whole
 * dataset's Average Kompaan aggregate. Build/server-time only.
 */
export function computeMatch(response: SurveyResponse): MatchResult {
  return matchAgainst(response, aggregateResponses(getLoadedResponses()));
}
