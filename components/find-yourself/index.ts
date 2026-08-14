/**
 * The find-yourself view (BORREL-3.5) — the /vind-jezelf personal lookup: pick
 * your own name from the committed responses and see your Kompaan card (your
 * answers, your "% gemiddelde Kompaan" match, and your archetype badge deep-
 * linking into the typetjes gallery). Data is precomputed at build time.
 */

export { FindYourself, type FindYourselfProps } from "./find-yourself";
export { PersonCard, type PersonCardProps } from "./person-card";
export {
  getFindYourselfPeople,
  type Person,
  type PersonAnswer,
  type PersonArchetype,
  type PersonQuote,
  type PersonStat,
} from "./people";
