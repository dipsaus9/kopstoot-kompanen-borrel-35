/**
 * Build-time archetype clustering prototype (BORREL-2.5 spike).
 *
 * Loads the validated survey responses, encodes ONLY the closed cluster-role
 * questions, runs seeded k-means at a pinned cluster count (silhouette is
 * uninformative on the uniform-random mock data, so the design-desired count is
 * pinned; override with ARCHETYPE_K), and writes the respondent→cluster
 * assignments plus a per-cluster answer signature to
 * `scripts/archetypes/archetypes.json`.
 *
 * Deterministic: the same `data/responses.csv` + SEED always produce identical
 * output. Rerun with:  bun run archetypes  (or: bun run scripts/archetypes/cluster.ts)
 *
 * The emitted `signature` (each cluster's dominant answer per question) is the
 * raw material a human uses to name the archetype — see docs/archetype-approach.md.
 */

import { writeFileSync } from "node:fs";
import path from "node:path";

import { getResponses, type SurveyResponse } from "../../lib/data";
import { CLUSTER_FIELDS, encodeResponses } from "./encode";
import { kmeans } from "./kmeans";

/** Seed = borrel date, matching the mock generator, for a memorable constant. */
const SEED = 0x20260829;
const RESTARTS = 10;
/** Candidate cluster counts to sweep; the giraffe design wants a handful. */
const K_CANDIDATES = [3, 4, 5, 6] as const;

const OUTPUT_PATH = path.join(
  process.cwd(),
  "scripts",
  "archetypes",
  "archetypes.json",
);
const SOURCE = "data/responses.csv";

interface KEvaluation {
  readonly k: number;
  readonly silhouette: number;
  readonly inertia: number;
}

interface ClusterSignatureEntry {
  readonly option: string;
  /** Share of the cluster's members giving this dominant answer, in [0, 1]. */
  readonly share: number;
}

interface ClusterSummary {
  readonly id: number;
  readonly size: number;
  /** Human-friendly archetype name — filled in by a human (see the doc). */
  readonly name: null;
  /** Dominant answer per cluster question — the naming raw material. */
  readonly signature: Record<string, ClusterSignatureEntry>;
}

interface Assignment {
  readonly index: number;
  readonly name: string;
  readonly cluster: number;
}

/** Most frequent option (and its share) among the given members for one field. */
function dominantAnswer(
  responses: readonly SurveyResponse[],
  members: readonly number[],
  fieldKey: keyof SurveyResponse,
): ClusterSignatureEntry {
  const counts = new Map<string, number>();
  for (const index of members) {
    const value = String(responses[index][fieldKey]);
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  let option = "";
  let top = -1;
  // Iterate in insertion order for a deterministic tie-break (first seen wins).
  for (const [value, count] of counts) {
    if (count > top) {
      top = count;
      option = value;
    }
  }
  return { option, share: members.length === 0 ? 0 : top / members.length };
}

function main(): void {
  const responses = getResponses();
  const { matrix, dimensions, featureLabels } = encodeResponses(responses);

  // Sweep candidate k and select the highest mean silhouette (tie → smallest k).
  const evaluations: KEvaluation[] = K_CANDIDATES.map((k) => {
    const result = kmeans(matrix, k, { seed: SEED, restarts: RESTARTS });
    return { k, silhouette: result.silhouette, inertia: result.inertia };
  });

  // On the uniform-random mock data every k scores ≈equally (silhouette ≈0.05),
  // so silhouette selection is uninformative — pin the design-desired archetype
  // count (6 giraffe archetypes). `ARCHETYPE_K` overrides for experimentation.
  // Retune (and let silhouette actually decide) once the real CSV lands.
  const DEFAULT_K = 6;
  const envK = Number(process.env.ARCHETYPE_K);
  const selectedK =
    Number.isInteger(envK) && envK >= 2 && envK <= responses.length
      ? envK
      : DEFAULT_K;

  // Re-run the winning k to get its assignments (same seed → same clustering).
  const final = kmeans(matrix, selectedK, { seed: SEED, restarts: RESTARTS });

  const members: number[][] = Array.from({ length: selectedK }, () => []);
  final.assignments.forEach((cluster, index) => members[cluster].push(index));

  const clusters: ClusterSummary[] = members.map((memberIndices, id) => {
    const signature: Record<string, ClusterSignatureEntry> = {};
    for (const field of CLUSTER_FIELDS) {
      signature[field.key] = dominantAnswer(
        responses,
        memberIndices,
        field.key,
      );
    }
    return { id, size: memberIndices.length, name: null, signature };
  });

  const assignments: Assignment[] = responses.map((response, index) => ({
    index,
    name: response.name,
    cluster: final.assignments[index],
  }));

  const output = {
    generatedBy: "scripts/archetypes/cluster.ts",
    generatedFrom: SOURCE,
    algorithm: "seeded k-means (k-means++ init, mulberry32 PRNG)",
    seed: SEED,
    restarts: RESTARTS,
    respondents: responses.length,
    featureDimensions: dimensions,
    featureLabels,
    clusterQuestions: CLUSTER_FIELDS.map((f) => f.key),
    kSweep: evaluations,
    selectedK,
    selectedSilhouette: final.silhouette,
    clusters,
    assignments,
  };

  writeFileSync(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`, "utf8");

  const sweep = evaluations
    .map((e) => `k=${e.k} sil=${e.silhouette.toFixed(3)}`)
    .join("  ");
  console.log(
    `Clustered ${responses.length} respondents on ${dimensions} features.`,
  );
  console.log(`k sweep: ${sweep}`);
  console.log(
    `Selected k=${selectedK} (silhouette ${final.silhouette.toFixed(3)}).`,
  );
  console.log(`Wrote ${OUTPUT_PATH}`);
}

main();
