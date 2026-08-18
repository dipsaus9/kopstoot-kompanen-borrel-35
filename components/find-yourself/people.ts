/**
 * Build-time dataset for the find-yourself view (BORREL-3.5).
 *
 * `getFindYourselfPeople()` turns every canonical {@link SurveyResponse} into a
 * self-contained, serialisable {@link Person}: the respondent's own answers,
 * their "% gemiddelde Kompaan" match (via `matchAgainst`, BORREL-3.1), how far
 * they deviate from the Average Kompaan (via `deviationAgainst`, BORREL-4.3), and
 * their resolved archetype (via `resolveArchetype`, BORREL-3.1) linked to its own
 * per-type page (`/typetjes/<archetype-id>`, BORREL-4.6).
 *
 * Everything is computed here at build/server time and handed to the client
 * selector as a plain array — there is no runtime fetch and no DB (the static
 * explorer, per the locked decision). Real names are embedded verbatim (locked
 * decision), so people can find themselves openly. Rows are keyed by their
 * positional `id` (`p<index>`) so duplicate names never collide, matching the
 * positional archetype assignment.
 */

import {
  deviationAgainst,
  getAggregate,
  matchAgainst,
  resolveArchetype,
  type DeviationResult,
  type MatchResult,
} from "@/lib/aggregate";
import { getResponses } from "@/lib/data";
import type { SurveyResponse, SurveyResponseKey } from "@/lib/data";

/** A single closed answer of this person, framed as a trait. */
export interface PersonAnswer {
  /** The response property / question key. */
  readonly key: SurveyResponseKey;
  /** Emoji badge echoing the question's theme. */
  readonly emoji: string;
  /** Playful caption naming the question. */
  readonly caption: string;
  /** The person's verbatim answer. */
  readonly value: string;
}

/** A headline numeric stat of this person. */
export interface PersonStat {
  /** The numeric stat key. */
  readonly key: SurveyResponseKey;
  /** Emoji badge. */
  readonly emoji: string;
  /** The already-formatted value (e.g. "35"). */
  readonly value: string;
  /** Trailing unit (e.g. "jaar", "cm"). */
  readonly unit: string;
  /** Short caption naming the number. */
  readonly label: string;
}

/** One of this person's free-text showcase answers. */
export interface PersonQuote {
  /** Caption framing the quote. */
  readonly label: string;
  /** The verbatim free-text answer. */
  readonly text: string;
}

/** This person's resolved archetype, ready to render as a linked badge. */
export interface PersonArchetype {
  /** Archetype slug (the per-type page route id). */
  readonly id: string;
  /** Playful display name. */
  readonly name: string;
  /** Badge emoji echoing the archetype's character. */
  readonly emoji: string;
  /** CSS custom-property name of the mapped brand hue (from tokens.css). */
  readonly hueVar: string;
  /** Link into the archetype's own per-type page (`/typetjes/<id>`, BORREL-4.6). */
  readonly href: string;
}

/** One respondent, fully precomputed for the find-yourself card. */
export interface Person {
  /** Stable positional id (`p<index>`), unique even for duplicate names. */
  readonly id: string;
  /** The respondent's name, verbatim (real names shown openly). */
  readonly name: string;
  /** The "% gemiddelde Kompaan" score and matched-trait readout. */
  readonly match: MatchResult;
  /**
   * How far this person diverges from the Average Kompaan: the deviation score
   * plus the traits where they differ most (BORREL-4.3).
   */
  readonly deviation: DeviationResult;
  /** The resolved archetype badge, linked to its per-type page. */
  readonly archetype: PersonArchetype;
  /** The three headline numeric stats. */
  readonly stats: readonly PersonStat[];
  /** A curated set of the person's closed answers, framed as traits. */
  readonly answers: readonly PersonAnswer[];
  /** The person's free-text showcase answers (non-empty ones only). */
  readonly quotes: readonly PersonQuote[];
}

/** The three headline numeric stats, in reading order. */
const STAT_CONFIG: readonly Omit<PersonStat, "value">[] = [
  { key: "age", emoji: "🎂", unit: "jaar", label: "Leeftijd" },
  { key: "heightCm", emoji: "🦒", unit: "cm", label: "Lengte" },
  { key: "borrelCount", emoji: "🍻", unit: "borrels", label: "Borrels op de teller" },
];

/** The curated closed questions shown as the person's own traits. */
const ANSWER_CONFIG: readonly Omit<PersonAnswer, "value">[] = [
  { key: "borrelRole", emoji: "🎉", caption: "Op een borrel meestal" },
  { key: "drink", emoji: "🍷", caption: "Vaste borrel-drankje" },
  { key: "idealBorrel", emoji: "✨", caption: "Ideale borrel" },
  { key: "borrelEnding", emoji: "🌙", caption: "Zo eindigt de borrel" },
  { key: "tallStruggle", emoji: "📏", caption: "Grootste lange-mensen-struggle" },
  { key: "borrelSuperpower", emoji: "⚡", caption: "Gekozen borrel-superkracht" },
];

/** The free-text showcase questions, shown as the person's own quotes. */
const QUOTE_CONFIG: readonly { key: SurveyResponseKey; label: string }[] = [
  { key: "kompaanIfSentence", label: "Je weet dat je een Kompaan bent als…" },
  { key: "heightRemark", label: "Lengte-opmerking waar ik klaar mee ben" },
];

/**
 * Per-archetype accent, mirroring the "one accent per archetype family" mapping
 * in `app/theme/tokens.css` (and the archetypes gallery, BORREL-3.4). Kept local
 * so the find-yourself view owns its presentation without reaching into the
 * gallery's internals.
 */
const ARCHETYPE_PRESENTATION: Readonly<
  Record<string, { emoji: string; hueVar: string }>
> = {
  parkborrelprofessional: { hueVar: "--brand-park", emoji: "🌳" },
  "festival-flamingo": { hueVar: "--brand-flamingo", emoji: "🦩" },
  "salmari-soldaat": { hueVar: "--brand-liquorice", emoji: "🖤" },
  "lange-nachtbraker": { hueVar: "--brand-night", emoji: "🌙" },
  "verantwoordelijke-kompaan": { hueVar: "--brand-park", emoji: "🏡" },
  "bedtijd-baron": { hueVar: "--brand-wine", emoji: "🛏️" },
};

/** Giraffe-gold fallback, should an archetype id ever lack an accent. */
const FALLBACK_PRESENTATION = { hueVar: "--brand-giraffe", emoji: "🦒" };

/** Round a numeric answer to a clean whole-number headline. */
function formatStat(value: number): string {
  return Math.round(value).toString();
}

/**
 * Build one {@link Person} from a canonical response and its positional index.
 * The aggregate is passed in so the caller computes it once for the whole set.
 */
function buildPerson(
  response: SurveyResponse,
  index: number,
  aggregate: Awaited<ReturnType<typeof getAggregate>>,
): Person {
  const archetype = resolveArchetype(response);
  const presentation =
    ARCHETYPE_PRESENTATION[archetype.id] ?? FALLBACK_PRESENTATION;

  const stats: PersonStat[] = STAT_CONFIG.map((stat) => ({
    ...stat,
    value: formatStat(Number(response[stat.key])),
  }));

  const answers: PersonAnswer[] = ANSWER_CONFIG.map((answer) => ({
    ...answer,
    value: String(response[answer.key]),
  })).filter((answer) => answer.value !== "");

  const quotes: PersonQuote[] = QUOTE_CONFIG.map((quote) => ({
    label: quote.label,
    text: String(response[quote.key]).trim(),
  })).filter((quote) => quote.text !== "");

  return {
    id: `p${index}`,
    name: response.name,
    match: matchAgainst(response, aggregate),
    deviation: deviationAgainst(response, aggregate),
    archetype: {
      id: archetype.id,
      name: archetype.name,
      emoji: presentation.emoji,
      hueVar: presentation.hueVar,
      href: `/typetjes/${archetype.id}`,
    },
    stats,
    answers,
    quotes,
  };
}

/**
 * Every respondent as a precomputed {@link Person}, in dataset order. Reads
 * `getResponses()` and the frozen archetype assignments at build/server time
 * only — no runtime fetch, no browser access.
 */
export async function getFindYourselfPeople(): Promise<readonly Person[]> {
  const responses = await getResponses();
  const aggregate = await getAggregate();
  return responses.map((response, index) =>
    buildPerson(response, index, aggregate),
  );
}
