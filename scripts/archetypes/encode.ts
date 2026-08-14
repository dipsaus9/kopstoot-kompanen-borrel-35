/**
 * Feature encoding for archetype clustering (BORREL-2.5 spike).
 *
 * Turns each validated `SurveyResponse` into a numeric feature vector built
 * ONLY from the closed questions whose analytic role is `cluster`
 * (`schema.ts`). The open free-text questions (`kompaanIfSentence`,
 * `ultimateKompaanTrait`, `heightRemark`) and the identity/stat questions
 * (name, age, heightCm, province, borrelCount, rsvp, headBump) are showcase or
 * aggregate-only and are NEVER fed into clustering.
 *
 * Encoding honours the `encoding` tag the schema already carries per question:
 *   · binary   → one dimension in {0, 1}
 *   · ordinal  → one dimension, order index scaled to [0, 1]
 *   · nominal  → one-hot block, each hot column set to 1/√2 so that two
 *                differing categories sit at Euclidean distance 1 — the same
 *                gap a binary flip produces, keeping every closed question at a
 *                comparable maximum contribution regardless of its cardinality.
 *
 * The scaling choice is a deliberate, documented default (see
 * docs/archetype-approach.md) — it is a knob to retune once the real form data
 * lands, not a hard invariant of the data model.
 */

import { QUESTIONS, type SurveyResponse } from "../../lib/data";
import type { QuestionField } from "../../lib/data/schema";

/** Distance a single differing nominal category contributes: 1/√2 per hot col. */
const NOMINAL_HOT = 1 / Math.SQRT2;

/** A closed, single-choice question — the only kind that feeds clustering. */
type ClusterField = Extract<QuestionField, { type: "single" }>;

/** The closed questions that drive clustering, in schema (form) order. */
export const CLUSTER_FIELDS: readonly ClusterField[] = QUESTIONS.filter(
  (q): q is ClusterField => q.role === "cluster" && q.type === "single",
);

/** A human-readable label per feature dimension, aligned with the matrix. */
export interface EncodedDataset {
  /** One numeric feature vector per respondent, row-aligned with the input. */
  readonly matrix: readonly (readonly number[])[];
  /** Number of feature dimensions (matrix column count). */
  readonly dimensions: number;
  /** `"<questionKey>"` or `"<questionKey>=<option>"` per dimension. */
  readonly featureLabels: readonly string[];
}

/** Encode one closed answer into its feature dimensions. */
function encodeField(field: ClusterField, value: string): number[] {
  const index = field.options.indexOf(value);
  if (index === -1) {
    throw new Error(
      `Value "${value}" is not a valid option for "${field.key}".`,
    );
  }

  switch (field.encoding) {
    case "binary":
      // Two options only; first option → 0, second → 1.
      return [index === 0 ? 0 : 1];
    case "ordinal":
      // Preserve rank order; single dimension scaled to [0, 1].
      return [
        field.options.length > 1 ? index / (field.options.length - 1) : 0,
      ];
    case "nominal": {
      // One-hot; the chosen option's column carries the weight.
      const block = new Array<number>(field.options.length).fill(0);
      block[index] = NOMINAL_HOT;
      return block;
    }
    case "none":
      // Not expected for cluster-role questions, but keep the switch total.
      return [];
  }
}

/** Build the feature dimension labels once (they are identical for every row). */
function buildFeatureLabels(): string[] {
  const labels: string[] = [];
  for (const field of CLUSTER_FIELDS) {
    switch (field.encoding) {
      case "binary":
      case "ordinal":
        labels.push(field.key);
        break;
      case "nominal":
        for (const option of field.options)
          labels.push(`${field.key}=${option}`);
        break;
      case "none":
        break;
    }
  }
  return labels;
}

/**
 * Encode every response into the clustering feature matrix. Rows stay aligned
 * with the input array so a cluster assignment maps straight back to a
 * respondent by index.
 */
export function encodeResponses(
  responses: readonly SurveyResponse[],
): EncodedDataset {
  const featureLabels = buildFeatureLabels();
  const matrix = responses.map((response) => {
    const vector: number[] = [];
    for (const field of CLUSTER_FIELDS) {
      vector.push(...encodeField(field, String(response[field.key])));
    }
    return vector;
  });

  return { matrix, dimensions: featureLabels.length, featureLabels };
}
