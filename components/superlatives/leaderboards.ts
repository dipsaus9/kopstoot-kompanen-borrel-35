/**
 * Build-time dataset for the superlatives view (BORREL-3.6).
 *
 * `getSuperlatives()` turns the canonical {@link SurveyResponse} set into the
 * playful-records payload: a curated set of {@link Leaderboard}s celebrating
 * extremes and fun cuts of the club (tallest, most borrels, earliest/latest
 * arriver, most-asked "hoe lang ben jij?") plus a {@link ShowcaseQuote} strip of
 * the free-text answers.
 *
 * Everything is computed here at build/server time over `getResponses()` and
 * handed to the presentational components as plain, serialisable arrays — there
 * is no runtime fetch and no DB (the static explorer, per the locked decision).
 * Real names are embedded verbatim (locked decision): the club is the star, not
 * the statistics. The three showcase questions are quote-only — never clustered.
 */

import { getResponses } from "@/lib/data";
import type { SurveyResponse, SurveyResponseKey } from "@/lib/data";
import { BORREL_ARRIVAL, HEIGHT_QUESTION_FREQ } from "@/lib/data/schema";

/** One ranked person on a leaderboard. */
export interface LeaderboardEntry {
  /** 1-based position on the board. */
  readonly rank: number;
  /** The respondent's name, verbatim (real names shown openly). */
  readonly name: string;
  /** The already-formatted headline value (e.g. "198 cm", "Dagelijks"). */
  readonly value: string;
}

/** A single superlative category with its short top-N. */
export interface Leaderboard {
  /** Stable slug (anchor id / React key). */
  readonly id: string;
  /** Emoji badge that gives the tile its playful giraffe character. */
  readonly emoji: string;
  /** Playful category title (e.g. "De langste Kompanen"). */
  readonly title: string;
  /** One-line giraffe-voiced framing of the category. */
  readonly blurb: string;
  /** CSS custom-property name of the mapped brand hue (from tokens.css). */
  readonly hueVar: string;
  /** The ranked top-N, best first. */
  readonly entries: readonly LeaderboardEntry[];
}

/** One free-text showcase answer, attributed to its author. */
export interface ShowcaseQuote {
  /** Stable key (question key + author index). */
  readonly id: string;
  /** Emoji badge echoing the question. */
  readonly emoji: string;
  /** Caption framing the quote. */
  readonly label: string;
  /** The author's name (real names shown openly). */
  readonly author: string;
  /** The verbatim free-text answer. */
  readonly text: string;
}

/** The full superlatives payload for the /superlatieven view. */
export interface Superlatives {
  /** Number of responses the records are drawn from. */
  readonly count: number;
  /** The curated superlative leaderboards, in reading order. */
  readonly leaderboards: readonly Leaderboard[];
  /** The showcase quote strip (non-empty answers only). */
  readonly quotes: readonly ShowcaseQuote[];
}

/** How many people each leaderboard shows. */
const TOP_N = 5;

/**
 * One curated superlative category. `metric` is the sortable score (higher =
 * ranked first); `display` is the value shown next to the name. Ordinal
 * categories map an option's schema position to a score so the extreme end of
 * the scale (e.g. "Dagelijks", "Als één van de eersten") wins.
 */
interface Category {
  readonly id: string;
  readonly emoji: string;
  readonly title: string;
  readonly blurb: string;
  readonly hueVar: string;
  readonly metric: (response: SurveyResponse) => number;
  readonly display: (response: SurveyResponse) => string;
}

/**
 * Score an ordinal answer by its distance from the *end* of the option list, so
 * index 0 (the first / most-extreme option) scores highest. Unknown values sink.
 */
function ordinalScore(
  options: readonly string[],
  value: string,
): number {
  const index = options.indexOf(value);
  return index === -1 ? -1 : options.length - index;
}

/** The curated superlative categories, in reading order. */
const CATEGORIES: readonly Category[] = [
  {
    id: "langste",
    emoji: "🦒",
    title: "De langste Kompanen",
    blurb: "Wie torent er het hoogst boven de borrel uit?",
    hueVar: "--brand-giraffe",
    metric: (r) => r.heightCm,
    display: (r) => `${Math.round(r.heightCm)} cm`,
  },
  {
    id: "meeste-borrels",
    emoji: "🍻",
    title: "Borrelkoningen",
    blurb: "De meeste borrels ooit op de teller gezet.",
    hueVar: "--brand-ochre",
    metric: (r) => r.borrelCount,
    display: (r) => `${Math.round(r.borrelCount)} borrels`,
  },
  {
    id: "vroege-vogels",
    emoji: "⏰",
    title: "De vroege vogels",
    blurb: "Altijd al binnen voordat de eerste fles opengaat.",
    hueVar: "--brand-park",
    metric: (r) => ordinalScore(BORREL_ARRIVAL, r.borrelArrival),
    display: (r) => r.borrelArrival,
  },
  {
    id: "modieus-te-laat",
    emoji: "🌙",
    title: "Modieus te laat",
    blurb: '"Ik kom eraan!" — terwijl ze nog thuis op de bank zitten.',
    hueVar: "--brand-night",
    // Latest arriver: flip the ordinal so the last option wins. Unknown options
    // keep a negative score so the `metric >= 0` guard still drops them.
    metric: (r) => {
      const score = ordinalScore(BORREL_ARRIVAL, r.borrelArrival);
      return score < 0 ? -1 : BORREL_ARRIVAL.length + 1 - score;
    },
    display: (r) => r.borrelArrival,
  },
  {
    id: "de-vraag",
    emoji: "📏",
    title: 'Krijgt altijd "hoe lang ben jij?"',
    blurb: "Voor de zoveelste keer diezelfde ene vraag.",
    hueVar: "--brand-flamingo",
    metric: (r) => ordinalScore(HEIGHT_QUESTION_FREQ, r.heightQuestionFreq),
    display: (r) => r.heightQuestionFreq,
  },
];

/**
 * Build one leaderboard's top-N. Responses are sorted by the category metric
 * (descending); ties break deterministically on name so the board never depends
 * on row ordering. Entries whose metric is negative (an unrecognised option) are
 * dropped rather than shown as a phantom record.
 */
function buildLeaderboard(
  responses: readonly SurveyResponse[],
  category: Category,
): Leaderboard {
  const entries = responses
    .map((response) => ({
      response,
      metric: category.metric(response),
    }))
    .filter((row) => row.metric >= 0)
    .sort(
      (a, b) =>
        b.metric - a.metric || a.response.name.localeCompare(b.response.name),
    )
    .slice(0, TOP_N)
    .map((row, index) => ({
      rank: index + 1,
      name: row.response.name,
      value: category.display(row.response),
    }));

  return {
    id: category.id,
    emoji: category.emoji,
    title: category.title,
    blurb: category.blurb,
    hueVar: category.hueVar,
    entries,
  };
}

/**
 * The free-text showcase questions, in reading order. `ultimateKompaanTrait` is
 * intentionally omitted: the published form has no such question, so surfacing it
 * would only echo unrelated remarks. Add it back here if the form gains it.
 */
const QUOTE_CONFIG: readonly {
  key: SurveyResponseKey;
  emoji: string;
  label: string;
}[] = [
  {
    key: "kompaanIfSentence",
    emoji: "🦒",
    label: "Je weet dat je een Kompaan bent als…",
  },
  {
    key: "heightRemark",
    emoji: "📏",
    label: "Lengte-opmerking waar ik klaar mee ben",
  },
];

/** How many quotes, at most, to show per showcase question in the strip. */
const QUOTES_PER_QUESTION = 4;

/**
 * Collect the showcase quote strip: up to {@link QUOTES_PER_QUESTION} non-empty
 * answers per question, interleaved round-robin so every showcase question is
 * represented (rather than one long block from a single question).
 *
 * Newest respondents first: the live sheet appends new submissions at the end,
 * so we walk the responses in reverse before capping — otherwise the strip would
 * forever show the same earliest handful and never surface fresh answers.
 */
function buildQuotes(
  responses: readonly SurveyResponse[],
): readonly ShowcaseQuote[] {
  const newestFirst = [...responses].reverse();
  const perQuestion = QUOTE_CONFIG.map((config) =>
    newestFirst
      .map((response) => ({
        author: response.name,
        text: String(response[config.key]).trim(),
      }))
      .filter((row) => row.text !== "")
      .slice(0, QUOTES_PER_QUESTION)
      .map((row, index) => ({
        id: `${config.key}-${index}`,
        emoji: config.emoji,
        label: config.label,
        author: row.author,
        text: row.text,
      })),
  );

  const quotes: ShowcaseQuote[] = [];
  const maxLength = Math.max(0, ...perQuestion.map((list) => list.length));
  for (let round = 0; round < maxLength; round += 1) {
    for (const list of perQuestion) {
      const quote = list[round];
      if (quote) quotes.push(quote);
    }
  }
  return quotes;
}

/**
 * The full superlatives payload — leaderboards and the showcase quote strip —
 * computed over the whole dataset at build/server time only (no runtime fetch,
 * no browser access).
 */
export async function getSuperlatives(): Promise<Superlatives> {
  const responses = await getResponses();
  return {
    count: responses.length,
    leaderboards: CATEGORIES.map((category) =>
      buildLeaderboard(responses, category),
    ),
    quotes: buildQuotes(responses),
  };
}
