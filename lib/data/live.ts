/**
 * Live Google-Form CSV loader (BORREL-5.2).
 *
 * The published survey lives in a Google Form whose responses sheet is exported
 * as a public CSV ({@link SHEET_CSV_URL}). Its columns are the Dutch *question
 * texts* and its answers are the verbatim *form* option texts. Since the schema
 * was realigned to the real form, every schema option tuple now equals the form
 * text (emoji / trailing ellipsis stripped), so the mapping is close to 1:1.
 * This module bridges the two:
 *
 *   1. `parseLiveResponses(csv)` — pure. Parse the export with the RFC-4180
 *      reader, map each form column onto a schema key, normalise every answer to
 *      the schema's option set, then validate the row through the same
 *      {@link validateCell} the mock parser uses. Rows that cannot be mapped or
 *      fail validation are **skipped**, never thrown on.
 *   2. `loadLiveResponses()` — async. Fetch the export at request time with Next
 *      ISR (5-minute revalidation) and hand the text to the parser. Any network /
 *      non-200 / parse failure resolves to `null` so the caller can fall back to
 *      the committed mock — a live outage must never break the build or render.
 *
 * Every schema field maps to a real form column, so there are no synthetic
 * defaults. The `name` field takes the real name ("Hoe heet je?"); the nickname
 * column is only appended in parentheses to disambiguate people who share a real
 * name (and is the fallback when the real name is blank). Other form columns
 * (timestamp, consent checkboxes, the open "grootste zonde" and "tips/tops"
 * remarks) have no schema field and are simply dropped.
 */

import { SHEET_CSV_URL } from "@/lib/config";

import { parseCsv } from "./csv";
import { validateCell } from "./parse";
import {
  BORREL_ARRIVAL,
  BORREL_ENDING,
  BORREL_ROLE,
  BORREL_SUPERPOWER,
  CITY_NATURE,
  CUISINE,
  DRINK,
  EARLY_BED_LATE,
  FESTIVAL_TERRACE,
  HEIGHT_QUESTION_FREQ,
  IDEAL_BORREL,
  PLANE_SEAT,
  PLAN_SPONTANEOUS,
  PROVINCES,
  QUESTIONS,
  RSVP,
  TALL_ADVANTAGE,
  TALL_STRUGGLE,
  type SurveyResponse,
  type SurveyResponseKey,
} from "./schema";

/** A normaliser turns one raw form cell into the string the schema expects
 *  (option value / number text / free text), or `""` when it cannot map — an
 *  empty result makes {@link validateCell} reject the row, which we skip. */
type Normaliser = (raw: string) => string;

/** Strip emoji, fold typographic quotes to ASCII (the form emits curly ‘’ “”
 *  while the schema options use straight ' "), collapse whitespace, then trim. */
function clean(raw: string): string {
  return raw
    .replace(/[\p{Extended_Pictographic}️‍]/gu, "")
    .replace(/[‘’‚‛]/g, "'")
    .replace(/[“”„‟]/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Match a raw form answer against a closed option set. Tries, in order: an
 * explicit alias, an exact (emoji-stripped) hit, then a prefix match either way
 * (the form often appends flavour text like "Nooduitgang, take my money 🤑").
 */
function optionMatcher(
  options: readonly string[],
  aliases: Readonly<Record<string, string>> = {},
): Normaliser {
  return (raw) => {
    const value = clean(raw);
    if (aliases[value] !== undefined) return aliases[value];
    if (aliases[raw] !== undefined) return aliases[raw];
    for (const option of options) if (value === option) return option;
    for (const option of options) {
      if (value.startsWith(option) || option.startsWith(value)) return option;
    }
    return "";
  };
}

/** Multi-select column: pick the first selected option that maps. Tries the
 *  whole answer first (so an option that itself contains ", " — e.g. "'Jeetje,
 *  wat ben jij lang!', bedankt, was me nog niet opgevallen" — matches by exact
 *  or prefix before we naively split), then falls back to comma-separated
 *  tokens. */
function firstOf(options: readonly string[], aliases = {}): Normaliser {
  const match = optionMatcher(options, aliases);
  return (raw) => {
    const whole = match(raw);
    if (whole) return whole;
    for (const token of raw.split(", ")) {
      const mapped = match(token);
      if (mapped) return mapped;
    }
    return "";
  };
}

const identity: Normaliser = (raw) => raw.trim();

/** Pull the first (optionally negative) integer run out of a free-text answer,
 *  or `""` if there is none. Form number fields are open text, so respondents
 *  add flourish ("35!!!!", "200cm", "ongeveer 31") that a bare `Number()` would
 *  reject — dropping the whole row. Bounds stay enforced later by validateCell. */
const numeric: Normaliser = (raw) => {
  const match = raw.match(/-?\d+/);
  return match ? match[0] : "";
};

// --- Dutch ordinal borrel-count ("Acht-en-twintigste" → 28) -----------------

const ORDINALS: Readonly<Record<string, number>> = {
  eerste: 1, tweede: 2, derde: 3, vierde: 4, vijfde: 5, zesde: 6, zevende: 7,
  achtste: 8, negende: 9, tiende: 10, elfde: 11, twaalfde: 12, dertiende: 13,
  veertiende: 14, vijftiende: 15, zestiende: 16, zeventiende: 17,
  achttiende: 18, negentiende: 19, twintigste: 20, dertigste: 30,
  veertigste: 40, vijftigste: 50, zestigste: 60, zeventigste: 70,
  tachtigste: 80, negentigste: 90, honderdste: 100,
};
const UNITS: Readonly<Record<string, number>> = {
  een: 1, "één": 1, twee: 2, drie: 3, vier: 4, vijf: 5, zes: 6, zeven: 7,
  acht: 8, negen: 9,
};
const TENS: Readonly<Record<string, number>> = {
  twintig: 20, dertig: 30, veertig: 40, vijftig: 50, zestig: 60, zeventig: 70,
  tachtig: 80, negentig: 90,
};

/** Ordinal words longest-first, so a leading ordinal is matched greedily. */
const ORDINAL_WORDS_DESC = Object.keys(ORDINALS).sort(
  (a, b) => b.length - a.length,
);

/** Parse a Dutch ordinal word (or a plain number) to its integer, or `""`. */
const dutchOrdinal: Normaliser = (raw) => {
  const s = raw.toLowerCase().trim().replace(/\s+/g, "");
  if (ORDINALS[s] !== undefined) return String(ORDINALS[s]);
  if (s.includes("-en-")) {
    const [unit, tensWord] = s.split("-en-");
    const tens = TENS[tensWord.replace(/ste$/, "")];
    if (UNITS[unit] !== undefined && tens !== undefined) {
      return String(tens + UNITS[unit]);
    }
  }
  // A leading ordinal word with trailing free text — the newcomer dropdown
  // choices "Eerste maar ik zit al in de community" / "Eerste; ik zit nog in de
  // wachtkamer" all mean this is their first borrel, so count it as that ordinal.
  for (const word of ORDINAL_WORDS_DESC) {
    if (s.startsWith(word)) return String(ORDINALS[word]);
  }
  return numeric(raw);
};

// --- Form column → schema key mapping ---------------------------------------

/** How to find a form column (by a distinctive lowercase header substring, so
 *  trailing spaces / curly quotes / emoji in the real headers can't break it)
 *  and how to normalise its answers onto one schema key. */
interface FieldMapping {
  readonly key: SurveyResponseKey;
  /** Distinctive lowercase substring of the form's question header. */
  readonly header: string;
  readonly normalise: Normaliser;
}

const MAPPINGS: readonly FieldMapping[] = [
  // Display the real name ("Hoe heet je?"); the nickname is only appended, in
  // parentheses, to disambiguate people who share a real name (see the dedup
  // pass in parseLiveResponses). Falls back to the nickname if the real name is
  // blank.
  { key: "name", header: "hoe heet je", normalise: identity },
  { key: "age", header: "hoe jong ben je", normalise: numeric },
  { key: "heightCm", header: "hoe lang ben je in centimeters", normalise: numeric },
  { key: "province", header: "provincie", normalise: optionMatcher(PROVINCES) },
  { key: "borrelCount", header: "hoeveelste borrel", normalise: dutchOrdinal },
  { key: "rsvp", header: "kom je borrelen", normalise: optionMatcher(RSVP) },
  { key: "tallStruggle", header: "lange-mensen-struggle", normalise: firstOf(TALL_STRUGGLE) },
  { key: "planeSeat", header: "vliegtuig", normalise: optionMatcher(PLANE_SEAT) },
  { key: "heightQuestionFreq", header: "hoe vaak krijg jij de vraag", normalise: optionMatcher(HEIGHT_QUESTION_FREQ) },
  { key: "tallAdvantage", header: "grootste voordeel van lang", normalise: optionMatcher(TALL_ADVANTAGE) },
  // The form dropped the schema option's leading apostrophe, so alias it back.
  { key: "borrelArrival", header: "wanneer maak jij meestal je entree", normalise: optionMatcher(BORREL_ARRIVAL, { "Ik kom eraan!' terwijl ik nog thuis ben": "'Ik kom eraan!' terwijl ik nog thuis ben" }) },
  { key: "borrelEnding", header: "hoe eindigt jouw gemiddelde", normalise: optionMatcher(BORREL_ENDING) },
  { key: "idealBorrel", header: "ideale borrel", normalise: optionMatcher(IDEAL_BORREL) },
  { key: "borrelRole", header: "op een borrel ben ik meestal", normalise: optionMatcher(BORREL_ROLE) },
  { key: "drink", header: "vaste borreldrankje", normalise: optionMatcher(DRINK) },
  { key: "earlyBedLate", header: "rustig aan", normalise: optionMatcher(EARLY_BED_LATE) },
  { key: "borrelSuperpower", header: "borrel-superkracht", normalise: optionMatcher(BORREL_SUPERPOWER) },
  { key: "cityNature", header: "kies je habitat", normalise: optionMatcher(CITY_NATURE) },
  { key: "planSpontaneous", header: "plannen of spontaan afspreken", normalise: optionMatcher(PLAN_SPONTANEOUS) },
  { key: "festivalTerrace", header: "vrije zomerdag", normalise: optionMatcher(FESTIVAL_TERRACE) },
  // The form spells "Alles" uppercase; any off-list cuisine (Surinaams, a typed
  // "Anders, namelijk…") falls back to the "Anders" option instead of dropping
  // the whole respondent.
  { key: "cuisine", header: "lievelingskeuken", normalise: (raw) => optionMatcher(CUISINE, { ALLES: "Alles" })(raw) || "Anders" },
  { key: "kompaanIfSentence", header: "je weet dat je een kompaan bent", normalise: identity },
  { key: "heightRemark", header: "met pensioen", normalise: identity },
];

/**
 * Parse the raw Google-Form CSV export into validated `SurveyResponse` rows.
 * Pure and total: unmappable or invalid rows are skipped, never thrown on.
 */
export function parseLiveResponses(csvText: string): SurveyResponse[] {
  const rows = parseCsv(csvText);
  if (rows.length < 2) return [];

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const columnByKey = new Map<SurveyResponseKey, number>();
  for (const mapping of MAPPINGS) {
    const index = header.findIndex((h) => h.includes(mapping.header));
    if (index !== -1) columnByKey.set(mapping.key, index);
  }
  const nickIndex = header.findIndex((h) => h.includes("bijnaam"));

  // Parse each row, keeping the nickname beside the record so the dedup pass
  // below can disambiguate shared real names without re-reading the CSV.
  const parsed: {
    record: Record<string, string | number>;
    nickname: string;
  }[] = [];
  let considered = 0; // non-blank submissions seen (denominator for the summary)
  rows.slice(1).forEach((cells, i) => {
    // Skip fully blank rows (trailing newline, cleared submissions).
    if (cells.every((c) => c.trim() === "")) return;
    considered += 1;

    const raw: Record<string, string> = {};
    for (const mapping of MAPPINGS) {
      const index = columnByKey.get(mapping.key);
      raw[mapping.key] = index === undefined ? "" : mapping.normalise(cells[index] ?? "");
    }

    const nickname = nickIndex === -1 ? "" : (cells[nickIndex] ?? "").trim();
    // Fall back to the nickname when the real-name cell is blank.
    if (raw.name === "") raw.name = nickname;

    try {
      const record: Record<string, string | number> = {};
      for (const field of QUESTIONS) {
        record[field.key] = validateCell(field, raw[field.key] ?? "", i + 2);
      }
      parsed.push({ record, nickname });
    } catch (error) {
      // Unmappable / invalid row — drop it rather than fail the whole dataset,
      // but log WHO fell out and WHY so form drift (a renamed option, a new
      // answer) is visible in the server logs instead of silently shrinking the
      // dataset. Stays quiet under the test runner.
      if (process.env.VITEST !== "true" && process.env.NODE_ENV !== "test") {
        const who = raw.name || nickname || `rij ${i + 2}`;
        const reason = error instanceof Error ? error.message : String(error);
        console.warn(`[data] respondent overgeslagen — ${who}: ${reason}`);
      }
    }
  });

  // Disambiguate shared real names: only when a real name occurs more than once
  // do we append that person's nickname in parentheses (e.g. "Gijs (Biko)").
  const nameCounts = new Map<string, number>();
  for (const { record } of parsed) {
    const name = String(record.name);
    nameCounts.set(name, (nameCounts.get(name) ?? 0) + 1);
  }
  for (const { record, nickname } of parsed) {
    const name = String(record.name);
    if ((nameCounts.get(name) ?? 0) > 1 && nickname && nickname !== name) {
      record.name = `${name} (${nickname})`;
    }
  }

  const skipped = considered - parsed.length;
  if (
    skipped > 0 &&
    process.env.VITEST !== "true" &&
    process.env.NODE_ENV !== "test"
  ) {
    console.warn(
      `[data] ${skipped} van ${considered} respondenten overgeslagen (zie regels hierboven).`,
    );
  }

  return parsed.map(({ record }) => record as unknown as SurveyResponse);
}

/**
 * Fetch and parse the live responses with Next ISR (5-minute revalidation).
 * Returns `null` on any network / non-200 / parse failure so the caller can
 * fall back to the committed mock — the render must never depend on the sheet
 * being reachable. Skipped entirely under the unit-test runner so tests stay
 * offline and deterministic on the committed mock.
 */
export async function loadLiveResponses(): Promise<SurveyResponse[] | null> {
  if (process.env.VITEST || process.env.NODE_ENV === "test") return null;

  try {
    const response = await fetch(SHEET_CSV_URL, { next: { revalidate: 300 } });
    if (!response.ok) {
      console.warn(
        `[data] live sheet returned ${response.status}; falling back to mock.`,
      );
      return null;
    }
    const parsed = parseLiveResponses(await response.text());
    if (parsed.length === 0) {
      console.warn("[data] live sheet yielded 0 valid rows; falling back to mock.");
      return null;
    }
    return parsed;
  } catch (error) {
    console.warn("[data] live sheet fetch failed; falling back to mock.", error);
    return null;
  }
}
