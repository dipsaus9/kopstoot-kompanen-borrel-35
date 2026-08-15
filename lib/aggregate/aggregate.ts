/**
 * The "Average Kompaan" aggregate over the survey dataset (BORREL-3.1).
 *
 * `getAggregate()` reduces every {@link SurveyResponse} into one build-time
 * profile: the arithmetic **mean** for each numeric stat (age, heightCm,
 * borrelCount) and the **modal answer** (most common option) for every closed
 * stat/cluster question. The profile and find-yourself views read this once at
 * build/server time — it never runs in the browser and never fetches at
 * runtime.
 *
 * Honesty note: the numbers below are derived from the *mock* CSV
 * (`data/responses.csv`, uniform-random) until the real Google-Form CSV lands.
 * The functions are stable; only the data underneath changes.
 */

import { getResponses, QUESTIONS } from "../data";
import type { SurveyResponse, SurveyResponseKey } from "../data";
import type { QuestionField } from "../data/schema";

/** The numeric stat questions whose aggregate is a mean. */
export type NumericStatKey = "age" | "heightCm" | "borrelCount";

/** A closed, single-choice question — the only kind with a modal answer. */
type SingleField = Extract<QuestionField, { type: "single" }>;

/** The most common answer to one closed question across the dataset. */
export interface ModalAnswer {
  /** The winning option (verbatim form text). */
  readonly option: string;
  /** How many responses chose it. */
  readonly count: number;
  /** Its share of the dataset, in [0, 1]. */
  readonly share: number;
}

/** The build-time "Average Kompaan" profile. */
export interface Aggregate {
  /** Number of responses the aggregate is computed over. */
  readonly count: number;
  /** Arithmetic mean per numeric stat question. */
  readonly means: Readonly<Record<NumericStatKey, number>>;
  /** Modal answer per closed (stat/cluster) question, keyed by question key. */
  readonly modes: Readonly<Partial<Record<SurveyResponseKey, ModalAnswer>>>;
}

/** Numeric stat questions (age, heightCm, borrelCount), sourced from the schema. */
const NUMERIC_FIELDS = QUESTIONS.filter(
  (q): q is Extract<QuestionField, { type: "number" }> => q.type === "number",
);

/**
 * Closed (single-choice) questions that carry a modal answer: every `stat` or
 * `cluster` question. Showcase free-text and the open identity name are
 * excluded — a "most common quote" is meaningless.
 */
export const MODAL_FIELDS: readonly SingleField[] = QUESTIONS.filter(
  (q): q is SingleField =>
    q.type === "single" && (q.role === "stat" || q.role === "cluster"),
);

/** Mean of the given numeric field across all responses (0 when empty). */
function meanOf(
  responses: readonly SurveyResponse[],
  key: SurveyResponseKey,
): number {
  if (responses.length === 0) return 0;
  let total = 0;
  for (const response of responses) total += Number(response[key]);
  return total / responses.length;
}

/**
 * Most common option for one closed question. Ties break deterministically on
 * the option's declared order in the schema (earliest option wins), so the
 * result never depends on row ordering.
 */
function modalAnswer(
  responses: readonly SurveyResponse[],
  field: SingleField,
): ModalAnswer {
  const counts = new Map<string, number>();
  for (const response of responses) {
    const value = String(response[field.key]);
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  let option = "";
  let count = -1;
  // Walk options in schema order so the first, highest-count option wins ties.
  for (const candidate of field.options) {
    const candidateCount = counts.get(candidate) ?? 0;
    if (candidateCount > count) {
      count = candidateCount;
      option = candidate;
    }
  }

  return {
    option,
    count: Math.max(count, 0),
    share: responses.length === 0 ? 0 : Math.max(count, 0) / responses.length,
  };
}

/**
 * Compute the "Average Kompaan" aggregate over an explicit response set. Pure —
 * no I/O — so it is trivially testable; {@link getAggregate} is the loader that
 * feeds it `getResponses()`.
 */
export function aggregateResponses(
  responses: readonly SurveyResponse[],
): Aggregate {
  const means = {} as Record<NumericStatKey, number>;
  for (const field of NUMERIC_FIELDS) {
    means[field.key as NumericStatKey] = meanOf(responses, field.key);
  }

  const modes: Partial<Record<SurveyResponseKey, ModalAnswer>> = {};
  for (const field of MODAL_FIELDS) {
    modes[field.key] = modalAnswer(responses, field);
  }

  return { count: responses.length, means, modes };
}

/**
 * The "Average Kompaan" aggregate over the whole dataset: numeric means plus
 * the modal answer per closed question. Reads `getResponses()` at build/server
 * time.
 */
export function getAggregate(): Aggregate {
  return aggregateResponses(getResponses());
}
