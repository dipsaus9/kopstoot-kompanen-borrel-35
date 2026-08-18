/**
 * Live Google-Form CSV loader (BORREL-5.2).
 *
 * The published survey lives in a Google Form whose responses sheet is exported
 * as a public CSV ({@link SHEET_CSV_URL}). Its columns are the Dutch *question
 * texts* and its answers are the verbatim *form* option texts — neither of which
 * line up 1:1 with the frozen {@link SurveyResponse} schema. This module bridges
 * the two:
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
 * Some schema fields have no matching form column (the form diverged from the
 * frozen questionnaire): those are filled with a documented neutral default in
 * {@link FIELD_DEFAULTS} so the row still satisfies the type. Some form columns
 * (timestamp, consent checkboxes, the "echte naam" field, the open "grootste
 * zonde") have no schema field and are simply dropped.
 */

import { SHEET_CSV_URL } from "@/lib/config";

import { parseCsv } from "./csv";
import { validateCell } from "./parse";
import {
  BORREL_ARRIVAL,
  BORREL_ENDING,
  BORREL_ROLE,
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

/** Strip emoji, variation selectors and ZWJ, then trim surrounding whitespace. */
function clean(raw: string): string {
  return raw
    .replace(/[\p{Extended_Pictographic}️‍]/gu, "")
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

/** Multi-select column: pick the first comma-separated token that maps. */
function firstOf(options: readonly string[], aliases = {}): Normaliser {
  const match = optionMatcher(options, aliases);
  return (raw) => {
    for (const token of raw.split(", ")) {
      const mapped = match(token);
      if (mapped) return mapped;
    }
    return "";
  };
}

const identity: Normaliser = (raw) => raw.trim();
const numeric: Normaliser = (raw) => raw.trim();

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
  const n = Number(raw.trim());
  return Number.isFinite(n) ? String(n) : "";
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
  // Prefer the "bijnaam / hoe mogen we je noemen" column over the real name.
  { key: "name", header: "bijnaam", normalise: identity },
  { key: "age", header: "hoe jong ben je", normalise: numeric },
  { key: "heightCm", header: "hoe lang ben je in centimeters", normalise: numeric },
  { key: "province", header: "provincie", normalise: optionMatcher(PROVINCES) },
  { key: "borrelCount", header: "hoeveel borrels", normalise: dutchOrdinal },
  { key: "rsvp", header: "kom je borrelen", normalise: optionMatcher(RSVP) },
  { key: "tallStruggle", header: "lange-mensen-struggle", normalise: firstOf(TALL_STRUGGLE) },
  { key: "planeSeat", header: "vliegtuig", normalise: optionMatcher(PLANE_SEAT) },
  {
    key: "heightQuestionFreq",
    header: "hoe vaak krijg jij de vraag",
    normalise: optionMatcher(HEIGHT_QUESTION_FREQ, {
      "Alleen wanneer ik nieuwe mensen ontmoet": "Bijna nooit meer",
      "Een paar keer per maand": "Regelmatig",
      "Bijna nooit": "Bijna nooit meer",
    }),
  },
  {
    key: "tallAdvantage",
    header: "grootste voordeel van lang",
    normalise: optionMatcher(TALL_ADVANTAGE, {
      "De bovenste plank is gewoon een normale plank": "Overal bij kunnen",
      "Nooit iemand vóór je bij een concert": "Altijd goed zicht",
    }),
  },
  { key: "borrelArrival", header: "wanneer maak jij meestal je entree", normalise: optionMatcher(BORREL_ARRIVAL) },
  {
    key: "borrelEnding",
    header: "hoe eindigt jouw gemiddelde",
    normalise: optionMatcher(BORREL_ENDING, {
      "Keurig en verantwoord naar huis": "Verantwoord naar huis",
    }),
  },
  { key: "idealBorrel", header: "ideale borrel", normalise: optionMatcher(IDEAL_BORREL) },
  {
    key: "borrelRole",
    header: "op een borrel ben ik meestal",
    normalise: optionMatcher(BORREL_ROLE, {
      "De regelaar: heeft pleisters, een powerbank en weet waar iedereen is": "De organisator",
      "De adoptieouder: ziet een nieuweling en neemt die meteen mee": "De sociale butterfly",
    }),
  },
  {
    key: "drink",
    header: "vaste borreldrankje",
    normalise: optionMatcher(DRINK, {
      "Mijn geheime homemade mix": "Cocktail",
      "Alles wat iedereen mij in mijn handen duwt": "Wat er maar is",
    }),
  },
  {
    // No literal "vroeg naar bed of doorgaan" column; the "ik doe rustig aan"
    // question captures the same take-it-easy / go-all-out signal.
    key: "earlyBedLate",
    header: "rustig aan",
    normalise: optionMatcher(EARLY_BED_LATE, {
      "Dat meen ik daadwerkelijk en iedereen lacht me uit": "Vroeg naar bed",
      "Helemaal niets. In mijn woordenboek is dit een betekenisloze zin.": "We zien wel waar dit eindigt",
      "Dat zei ik vorige keer ook...": "We zien wel waar dit eindigt",
    }),
  },
  { key: "cityNature", header: "kies je habitat", normalise: optionMatcher(CITY_NATURE) },
  { key: "planSpontaneous", header: "plannen of spontaan afspreken", normalise: optionMatcher(PLAN_SPONTANEOUS) },
  { key: "festivalTerrace", header: "vrije zomerdag", normalise: optionMatcher(FESTIVAL_TERRACE) },
  { key: "cuisine", header: "lievelingskeuken", normalise: optionMatcher(CUISINE, { ALLES: "Anders" }) },
  { key: "kompaanIfSentence", header: "je weet dat je een kompaan bent als", normalise: identity },
  { key: "heightRemark", header: "met pensioen", normalise: identity },
  // NOTE: the published form has no "ultieme Kompaan-eigenschap" question, so
  // `ultimateKompaanTrait` is intentionally NOT mapped — it must NOT borrow the
  // open "tips/tops/mededelingen" feedback column (those are loose remarks, not a
  // trait). It defaults to empty below, which the showcase strip then omits.
];

/**
 * Schema fields with no corresponding form column. The published form diverged
 * from the frozen questionnaire, so these get a documented neutral default to
 * keep the row valid until the form is realigned (or the schema trimmed).
 */
const FIELD_DEFAULTS: Readonly<Partial<Record<SurveyResponseKey, string>>> = {
  morningEvening: "Ochtendmens",
  headBump: "Dagelijks",
  weatherReaction: "Lach maar mee",
  appGroupRole: "De planner",
  danceSideline: "Dansvloer",
  // No form column for this showcase question; it is no longer surfaced anywhere
  // (dropped from the Toppers quote strip), so this neutral value is never shown —
  // it only keeps the row valid (every schema field must be non-empty).
  ultimateKompaanTrait: "—",
};

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

  const out: SurveyResponse[] = [];
  rows.slice(1).forEach((cells, i) => {
    // Skip fully blank rows (trailing newline, cleared submissions).
    if (cells.every((c) => c.trim() === "")) return;

    const raw: Record<string, string> = {};
    for (const mapping of MAPPINGS) {
      const index = columnByKey.get(mapping.key);
      raw[mapping.key] = index === undefined ? "" : mapping.normalise(cells[index] ?? "");
    }
    for (const [key, value] of Object.entries(FIELD_DEFAULTS)) {
      raw[key] = value as string;
    }

    try {
      const record: Record<string, string | number> = {};
      for (const field of QUESTIONS) {
        record[field.key] = validateCell(field, raw[field.key] ?? "", i + 2);
      }
      out.push(record as unknown as SurveyResponse);
    } catch {
      // Unmappable / invalid row — drop it rather than fail the whole dataset.
    }
  });

  return out;
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
