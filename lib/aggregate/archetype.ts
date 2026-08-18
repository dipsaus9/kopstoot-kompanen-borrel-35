/**
 * Signature-based archetype resolution for a response (BORREL-3.1, BORREL-5.3).
 *
 * `resolveArchetype(response)` returns the named {@link Archetype} for ANY
 * response by scoring it against each type's declared defining answers
 * (`signature` in `content/archetypes`) and picking the strongest match:
 *
 *   response ──score vs each signature──▶ highest total weight ──▶ ARCHETYPES
 *
 * This replaced the earlier nearest-centroid classifier. On the real
 * Google-Form crowd the six k-means clusters barely separate (almost everyone is
 * terras + verantwoord), so distance-to-centroid assigned people to types whose
 * *character* they did not share. Keying each type to the answers its name
 * actually promises (Salmari → Salmari-Soldaat, festival + eerst → Flamingo)
 * makes the match legible and stable regardless of how the live data is skewed.
 *
 * Pure and side-effect-free: the score depends on the response alone, so it
 * works for the canonical `getResponses()` rows and for any freshly built
 * response object alike.
 */

import type { SurveyResponse } from "../data";
import { ARCHETYPES, type Archetype } from "../../content/archetypes";

/**
 * Fallback when a response hits no defining answer of any type. The real crowd
 * is overwhelmingly the responsible, terras-going middle, so an unmatched
 * respondent reads most honestly as the Verantwoordelijke Kompaan.
 */
const FALLBACK_ID = "verantwoordelijke-kompaan";

/** Total signature weight this response scores for one archetype. */
function scoreArchetype(
  response: SurveyResponse,
  archetype: Archetype,
): number {
  let score = 0;
  for (const trait of archetype.signature) {
    const answer = String(response[trait.key]);
    if (trait.options.includes(answer)) score += trait.weight;
  }
  return score;
}

/**
 * Resolve a response to its named archetype: the type whose defining answers the
 * respondent hits hardest. Ties break by declaration order in {@link ARCHETYPES}
 * (deterministic); a zero score — no defining answer of any type — falls back to
 * {@link FALLBACK_ID}.
 *
 * @param response Any valid {@link SurveyResponse}.
 * @throws If the fallback archetype is missing from `content/archetypes` (a
 *   content bug to fix, not to swallow).
 */
export function resolveArchetype(response: SurveyResponse): Archetype {
  let best: Archetype | undefined;
  let bestScore = 0;
  for (const archetype of ARCHETYPES) {
    const score = scoreArchetype(response, archetype);
    // Strict `>` keeps the earliest-declared type on a tie.
    if (score > bestScore) {
      bestScore = score;
      best = archetype;
    }
  }

  if (best !== undefined) return best;

  const fallback = ARCHETYPES.find((a) => a.id === FALLBACK_ID);
  if (fallback === undefined) {
    throw new Error(
      `resolveArchetype: fallback archetype "${FALLBACK_ID}" is missing ` +
        "from content/archetypes.",
    );
  }
  return fallback;
}
