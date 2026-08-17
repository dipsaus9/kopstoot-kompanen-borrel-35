/**
 * Nearest-centroid archetype resolution for a response (BORREL-3.1, BORREL-5.3).
 *
 * `resolveArchetype(response)` returns the named {@link Archetype} for ANY
 * response — including live respondents who were never part of the baked
 * clustering — by assigning it to the nearest of the six FIXED type centroids in
 * encoded feature space:
 *
 *   response ──encode──▶ vector ──nearest centroid──▶ cluster ──▶ ARCHETYPES
 *
 * The six centroids are frozen at build time by the clustering step
 * (`scripts/archetypes/cluster.ts`, BORREL-2.5) into
 * `scripts/archetypes/archetypes.json`, computed over the committed mock CSV.
 * They — and the human-named archetypes in `content/archetypes` they map to —
 * are the settled identity: this module only decides which of the six a given
 * respondent is closest to, using the exact same feature encoding
 * (`scripts/archetypes/encode.ts`) the centroids were built from.
 *
 * Pure and side-effect-free: distance is computed from the response alone, so it
 * works for the canonical `getResponses()` rows and for any freshly built
 * response object alike.
 */

import type { SurveyResponse } from "../data";
import { ARCHETYPES, type Archetype } from "../../content/archetypes";
import { encodeResponses } from "../../scripts/archetypes/encode";
import archetypeData from "../../scripts/archetypes/archetypes.json";

/** A cluster's id and its centroid vector in encoded feature space. */
interface ClusterCentroid {
  readonly id: number;
  readonly centroid: readonly number[];
}

/** The six fixed type centroids to measure each response against. */
const CENTROIDS = archetypeData.clusters as readonly ClusterCentroid[];

/** Archetype per source cluster id, built once from the content map. */
const ARCHETYPE_BY_CLUSTER = new Map<number, Archetype>(
  ARCHETYPES.map((archetype) => [archetype.sourceClusterId, archetype]),
);

/** Squared Euclidean distance — monotone in distance, so fine for argmin. */
function squaredDistance(a: readonly number[], b: readonly number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i += 1) {
    const d = a[i] - b[i];
    sum += d * d;
  }
  return sum;
}

/**
 * Resolve a response to its named archetype: the type whose centroid is nearest
 * to the response in encoded feature space.
 *
 * @param response Any valid {@link SurveyResponse}.
 * @throws If no centroid is available, or the nearest cluster has no named
 *   archetype in `content/archetypes` (a mapping bug to fix, not to swallow).
 */
export function resolveArchetype(response: SurveyResponse): Archetype {
  const [vector] = encodeResponses([response]).matrix;

  let bestCluster = -1;
  let bestDistance = Infinity;
  for (const { id, centroid } of CENTROIDS) {
    const distance = squaredDistance(vector, centroid);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestCluster = id;
    }
  }

  const archetype = ARCHETYPE_BY_CLUSTER.get(bestCluster);
  if (archetype === undefined) {
    throw new Error(
      `resolveArchetype: nearest cluster ${bestCluster} has no named ` +
        "archetype in content/archetypes.",
    );
  }
  return archetype;
}
