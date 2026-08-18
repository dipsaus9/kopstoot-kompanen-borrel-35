/**
 * Build-time dataset for the superlatives view (BORREL-3.6).
 *
 * `getSuperlatives()` turns the canonical {@link SurveyResponse} set into the
 * playful-records payload: a curated set of {@link Leaderboard}s celebrating
 * numeric extremes of the club (tallest, most borrels, youngest, oldest) plus a
 * {@link ShowcaseQuote} strip of the free-text answers. Every category ranks on a
 * continuous stat so each row shows a distinct value — categorical questions
 * (arrival, "hoe lang ben jij?") are deliberately not leaderboards, since a
 * shared option would repeat the same value down the whole top-N.
 *
 * Everything is computed here at build/server time over `getResponses()` and
 * handed to the presentational components as plain, serialisable arrays — there
 * is no runtime fetch and no DB (the static explorer, per the locked decision).
 * Real names are embedded verbatim (locked decision): the club is the star, not
 * the statistics. The three showcase questions are quote-only — never clustered.
 */

import { getResponses } from "@/lib/data";
import type { SurveyResponse, SurveyResponseKey } from "@/lib/data";

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
 * One curated superlative category. `metric` is the sortable score; rows are
 * ranked by it — descending by default, or ascending when `ascending` is set (so
 * "De jonkies" can rank the youngest age first). `display` is the value shown
 * next to each name. Categories rank on a continuous stat, so every row shows a
 * distinct value.
 */
interface Category {
  readonly id: string;
  readonly emoji: string;
  readonly title: string;
  readonly blurb: string;
  readonly hueVar: string;
  readonly metric: (response: SurveyResponse) => number;
  readonly display: (response: SurveyResponse) => string;
  /** Rank smallest-first instead of largest-first. */
  readonly ascending?: boolean;
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
    id: "jongste",
    emoji: "🍼",
    title: "De jonkies",
    blurb: "Fris uit de doos en nu al niet meer weg te denken.",
    hueVar: "--brand-park",
    metric: (r) => r.age,
    display: (r) => `${Math.round(r.age)} jaar`,
    ascending: true,
  },
  {
    id: "oudste",
    emoji: "🦉",
    title: "De wijze veteranen",
    blurb: "De meeste levenswijsheid aan de borreltafel.",
    hueVar: "--brand-flamingo",
    metric: (r) => r.age,
    display: (r) => `${Math.round(r.age)} jaar`,
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
    .sort((a, b) => {
      const primary = category.ascending
        ? a.metric - b.metric
        : b.metric - a.metric;
      return primary || a.response.name.localeCompare(b.response.name);
    })
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

/**
 * Collect the showcase quote strip: every non-empty answer per question,
 * interleaved round-robin so both showcase questions stay represented (rather
 * than one long block from a single question).
 *
 * Newest respondents first: the live sheet appends new submissions at the end,
 * so we walk the responses in reverse — otherwise a newly added answer would
 * sort to the very bottom of the strip instead of showing up near the top.
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
