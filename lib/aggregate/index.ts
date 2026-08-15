/**
 * Build-time aggregation & match library for the core views (BORREL-3.1).
 *
 * Pure, server/build-time functions over `getResponses()` that the profile and
 * find-yourself views reuse:
 *
 *   · getAggregate()          — the "Average Kompaan": numeric means + modal
 *                               answer per closed question.
 *   · computeMatch(response)  — a 0–100 "% gemiddelde Kompaan" score plus the
 *                               matched traits vs the aggregate.
 *   · resolveArchetype(...)   — a response's named archetype via its cluster.
 *
 * None of these fetch at runtime or touch the browser: they read the dataset
 * (and the frozen archetype assignments) at build/server time only.
 */

export {
  getAggregate,
  aggregateResponses,
  MODAL_FIELDS,
  type Aggregate,
  type ModalAnswer,
  type NumericStatKey,
} from "./aggregate";

export {
  computeMatch,
  matchAgainst,
  MATCH_FIELDS,
  type MatchResult,
  type MatchedTrait,
} from "./match";

export { resolveArchetype } from "./archetype";
