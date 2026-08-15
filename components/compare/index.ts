/**
 * The compare view (BORREL-4.8) — the /vergelijk side-by-side lookup: multi-
 * select several kompanen and see their borrel-type (linked to their per-type
 * page), their deviation from the Average Kompaan (score + key divergences,
 * BORREL-4.3) and their answers aligned per question. Data is precomputed at
 * build time and embedded into the client selector.
 */

export { CompareView, type CompareViewProps } from "./compare-view";
export { getComparePeople } from "./people";
export {
  COMPARE_ROWS,
  type ComparePerson,
  type CompareRow,
  type CompareCell,
  type CompareArchetype,
  type CompareDeviation,
} from "./rows";
