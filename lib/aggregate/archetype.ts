/**
 * Name-to-archetype resolution for a response (BORREL-3.1).
 *
 * `resolveArchetype(response)` returns the named {@link Archetype} for a
 * response by following its build-time cluster assignment:
 *
 *   response ──index──▶ assignment.cluster ──sourceClusterId──▶ ARCHETYPES
 *
 * The respondent→cluster assignments are pre-computed by the clustering step
 * (`scripts/archetypes/cluster.ts`, BORREL-2.5) and frozen in
 * `scripts/archetypes/archetypes.json`, row-aligned with `getResponses()`. The
 * human-named archetypes live in `content/archetypes`. Both are read-only here.
 *
 * Because the assignments are positional, this resolves the *canonical*
 * responses returned by `getResponses()` (server components / build code iterate
 * that array and call this per row). A response object that is not part of that
 * dataset has no stored assignment and raises a clear error.
 */

import { getLoadedResponses } from "../data";
import type { SurveyResponse } from "../data";
import { ARCHETYPES, type Archetype } from "../../content/archetypes";
import archetypeData from "../../scripts/archetypes/archetypes.json";

interface Assignment {
  readonly index: number;
  readonly name: string;
  readonly cluster: number;
}

const ASSIGNMENTS = archetypeData.assignments as readonly Assignment[];

/** Archetype per source cluster id, built once from the content map. */
const ARCHETYPE_BY_CLUSTER = new Map<number, Archetype>(
  ARCHETYPES.map((archetype) => [archetype.sourceClusterId, archetype]),
);

/**
 * Response → cluster id, keyed on the canonical `getResponses()` objects. Built
 * lazily (and cached) so the module has no import-time side effects. A
 * `WeakMap` keys on object identity, matching the memoised responses the loader
 * hands out.
 */
let responseCluster: WeakMap<SurveyResponse, number> | null = null;

function clusterMap(): WeakMap<SurveyResponse, number> {
  if (responseCluster === null) {
    const responses = getLoadedResponses();
    if (responses.length !== ASSIGNMENTS.length) {
      throw new Error(
        `Archetype assignments are stale: ${ASSIGNMENTS.length} assignments ` +
          `for ${responses.length} responses. Re-run \`bun run archetypes\`.`,
      );
    }
    const map = new WeakMap<SurveyResponse, number>();
    responses.forEach((response, index) => {
      map.set(response, ASSIGNMENTS[index].cluster);
    });
    responseCluster = map;
  }
  return responseCluster;
}

/**
 * Resolve a response to its named archetype via its stored cluster assignment.
 *
 * @param response A response from `getResponses()`.
 * @throws If the response is not part of `getResponses()`, or its cluster has
 *   no named archetype in `content/archetypes` (a mapping bug to fix, not to
 *   swallow).
 */
export function resolveArchetype(response: SurveyResponse): Archetype {
  const cluster = clusterMap().get(response);
  if (cluster === undefined) {
    throw new Error(
      "resolveArchetype: response is not part of getResponses(); archetype " +
        "resolution is positional over the canonical dataset.",
    );
  }

  const archetype = ARCHETYPE_BY_CLUSTER.get(cluster);
  if (archetype === undefined) {
    throw new Error(
      `resolveArchetype: cluster ${cluster} has no named archetype in ` +
        "content/archetypes.",
    );
  }
  return archetype;
}
