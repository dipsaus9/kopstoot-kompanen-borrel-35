/**
 * Survey response schema — the single source of truth for the Borrel 35 dataset.
 *
 * Every field here is derived directly from `docs/survey-final-questions.md`
 * (BORREL-2.1, the frozen question contract). The 28 questions map to 28 CSV
 * columns in question order (Q1..Q28); the parser (`parse.ts`) and the mock
 * generator (`scripts/mock/generate.ts`) both read this registry so the schema,
 * the data and the types can never drift apart.
 *
 * When the real Google-Form CSV lands, revisit ONLY the option tuples and the
 * `QUESTIONS` registry — the parser, loader and types follow automatically.
 */

// --- Analytic roles (see docs/survey-final-questions.md §Legend) -------------

/** identity = who the row is · stat = aggregate profile number/category ·
 *  cluster = feeds archetype clustering + % match · showcase = free-text quote. */
export type QuestionRole = "identity" | "stat" | "cluster" | "showcase";

/** How a closed answer is encoded for clustering (BORREL-2.5). */
export type Encoding = "nominal" | "ordinal" | "binary" | "none";

// --- Closed-question option tuples (verbatim Dutch form text) ----------------

export const PROVINCES = [
  "Groningen",
  "Friesland",
  "Drenthe",
  "Overijssel",
  "Flevoland",
  "Gelderland",
  "Utrecht",
  "Noord-Holland",
  "Zuid-Holland",
  "Zeeland",
  "Noord-Brabant",
  "Limburg",
  "Buiten Nederland",
] as const;

export const RSVP = [
  "Uiteraard. Mijn kleedje ligt al klaar!",
  "Ik ben nog in onderhandeling met mijn verantwoordelijkheden…",
  "Ik wil graag, maar durf nog niet (app Biko, Jolie, Iris, Cait of Emma)",
  "Ik moet de haren op mijn hoofd tellen",
  "Ik ben verhinderd door een ernstig geval van slechte prioriteiten",
] as const;

export const TALL_STRUGGLE = [
  "Te weinig beenruimte",
  "Kleding die nooit lang genoeg is",
  "Douchekoppen op borsthoogte",
  "Bedden waar mijn voeten uitsteken",
  'Altijd "hoe lang ben jij?" horen',
  "Mensen die vragen of ik basketbal",
] as const;

export const PLANE_SEAT = [
  "Nooduitgang",
  "Gangpad",
  "Raam",
  "In het midden",
  "Maakt niet uit, ik lijd toch",
] as const;

// Ordinal: Dagelijks → Nooit
export const HEIGHT_QUESTION_FREQ = [
  "Dagelijks",
  "Wekelijks",
  "Regelmatig",
  "Bijna nooit meer",
  "Nooit",
] as const;

export const TALL_ADVANTAGE = [
  "Overal bij kunnen",
  "Altijd goed zicht",
  "Mensen terugvinden op festivals",
  "Indrukwekkend zijn zonder iets te doen",
  "Welk voordeel?",
] as const;

// Ordinal: eersten → allerlaatste
export const BORREL_ARRIVAL = [
  "Als één van de eersten",
  "Keurig op tijd",
  "Modieus te laat",
  '"Ik kom eraan!" terwijl ik nog thuis ben',
  "Als allerlaatste",
] as const;

export const BORREL_ENDING = [
  "Verantwoord naar huis",
  "Nog even één drankje",
  "SHOTJESS",
  "Met eten",
  "Geen idee meer",
] as const;

export const IDEAL_BORREL = [
  "Parkborrel",
  "Kroegborrel",
  "Themaborrel",
  "Gala",
  "Feestborrel",
] as const;

export const BORREL_ROLE = [
  "De sociale butterfly",
  "De vaste-kliek-hanger",
  "De organisator",
  "De verdwijntruc",
  "Degene die iedereen drank geeft",
  "Degene die ineens een diep gesprek heeft",
] as const;

export const PLAN_SPONTANEOUS = ["Plannen", "Spontaan"] as const;
export const CITY_NATURE = ["Stad", "Natuur"] as const;
export const FESTIVAL_TERRACE = ["Festival", "Terras"] as const;
export const EARLY_BED_LATE = [
  "Vroeg naar bed",
  "We zien wel waar dit eindigt",
] as const;
export const CUISINE = [
  "Italiaanse",
  "Aziatische",
  "Nederlandse",
  "Mexicaanse",
  "Anders",
] as const;
export const MORNING_EVENING = ["Ochtendmens", "Avondmens"] as const;

// Ordinal: Dagelijks → Nooit (head-bumping)
export const HEAD_BUMP = [
  "Dagelijks",
  "Wekelijks",
  "Alleen bij lage deuren",
  "Nooit, ik duik automatisch",
] as const;

export const WEATHER_REACTION = [
  "Lach maar mee",
  "Negeren",
  "Gevat terugkaatsen",
  "Elke keer verzin ik wat nieuws",
  "Ik glimlach en sterf vanbinnen",
] as const;

export const DRINK = [
  "Bier",
  "Wijn",
  "Shot(s)",
  "Fris/0.0",
  "Cocktail",
  "Wat er maar is",
] as const;

export const APP_GROUP_ROLE = [
  "De planner",
  "De ghost",
  "De meme-spammer",
  'Het "ik-kom-eraan"-liegbeest',
  "De sfeermaker",
] as const;

export const DANCE_SIDELINE = ["Dansvloer", "Zijlijn"] as const;

// --- The typed survey response (one CSV row) --------------------------------

/**
 * A single validated survey response. Field order mirrors Q1..Q28 and the CSV
 * column order (see `CSV_COLUMNS`). Closed answers are string-literal unions
 * derived from the option tuples above; numeric stats are `number`; open
 * showcase answers are free `string`.
 */
export interface SurveyResponse {
  /** Q1 · identity · open */
  name: string;
  /** Q2 · stat · number — leeftijd in hele jaren */
  age: number;
  /** Q3 · stat · number — lichaamslengte in cm (~100–230) */
  heightCm: number;
  /** Q4 · stat · single */
  province: (typeof PROVINCES)[number];
  /** Q5 · stat · number — aantal borrels */
  borrelCount: number;
  /** Q6 · stat (RSVP) · single — excluded from clustering + % match */
  rsvp: (typeof RSVP)[number];
  /** Q7 · cluster · nominal */
  tallStruggle: (typeof TALL_STRUGGLE)[number];
  /** Q8 · cluster · nominal */
  planeSeat: (typeof PLANE_SEAT)[number];
  /** Q9 · cluster · ordinal */
  heightQuestionFreq: (typeof HEIGHT_QUESTION_FREQ)[number];
  /** Q10 · cluster · nominal */
  tallAdvantage: (typeof TALL_ADVANTAGE)[number];
  /** Q11 · cluster · ordinal */
  borrelArrival: (typeof BORREL_ARRIVAL)[number];
  /** Q12 · cluster · nominal */
  borrelEnding: (typeof BORREL_ENDING)[number];
  /** Q13 · cluster · nominal */
  idealBorrel: (typeof IDEAL_BORREL)[number];
  /** Q14 · cluster · nominal (strong archetype signal) */
  borrelRole: (typeof BORREL_ROLE)[number];
  /** Q15 · cluster · binary */
  planSpontaneous: (typeof PLAN_SPONTANEOUS)[number];
  /** Q16 · cluster · binary */
  cityNature: (typeof CITY_NATURE)[number];
  /** Q17 · cluster · binary */
  festivalTerrace: (typeof FESTIVAL_TERRACE)[number];
  /** Q18 · cluster · binary */
  earlyBedLate: (typeof EARLY_BED_LATE)[number];
  /** Q19 · cluster · nominal (low weight / droppable) */
  cuisine: (typeof CUISINE)[number];
  /** Q20 · cluster · binary */
  morningEvening: (typeof MORNING_EVENING)[number];
  /** Q21 · showcase · open — never clustered */
  kompaanIfSentence: string;
  /** Q22 · showcase · open — never clustered */
  ultimateKompaanTrait: string;
  /** Q23 · stat (superlatief) · ordinal */
  headBump: (typeof HEAD_BUMP)[number];
  /** Q24 · cluster · nominal */
  weatherReaction: (typeof WEATHER_REACTION)[number];
  /** Q25 · cluster · nominal (+ superlatief) */
  drink: (typeof DRINK)[number];
  /** Q26 · cluster · nominal (strong archetype signal) */
  appGroupRole: (typeof APP_GROUP_ROLE)[number];
  /** Q27 · cluster · binary */
  danceSideline: (typeof DANCE_SIDELINE)[number];
  /** Q28 · showcase · open — never clustered */
  heightRemark: string;
}

export type SurveyResponseKey = keyof SurveyResponse;

// --- Question registry (metadata driving parse + generate) ------------------

type OpenField = {
  key: SurveyResponseKey;
  number: number;
  label: string;
  role: QuestionRole;
  type: "open";
};

type NumberField = {
  key: SurveyResponseKey;
  number: number;
  label: string;
  role: QuestionRole;
  type: "number";
  /** Inclusive sanity range for validation. */
  min: number;
  max: number;
};

type SingleField = {
  key: SurveyResponseKey;
  number: number;
  label: string;
  role: QuestionRole;
  type: "single";
  encoding: Encoding;
  /** Allowed verbatim option values. */
  options: readonly string[];
};

export type QuestionField = OpenField | NumberField | SingleField;

/**
 * The 28 questions in form order. `key` is the CSV header and the
 * `SurveyResponse` property; `options` drives closed-value validation.
 */
export const QUESTIONS: readonly QuestionField[] = [
  { key: "name", number: 1, label: "Hoe mogen we je noemen?", role: "identity", type: "open" },
  { key: "age", number: 2, label: "Hoe jong ben je?", role: "stat", type: "number", min: 16, max: 120 },
  { key: "heightCm", number: 3, label: "Hoe lang ben je in centimeters?", role: "stat", type: "number", min: 100, max: 230 },
  { key: "province", number: 4, label: "Uit welke provincie kom je?", role: "stat", type: "single", encoding: "nominal", options: PROVINCES },
  { key: "borrelCount", number: 5, label: "Hoeveel borrels heb jij inmiddels op je naam staan?", role: "stat", type: "number", min: 0, max: 1000 },
  { key: "rsvp", number: 6, label: "Kom je borrelen zaterdag 29 augustus?", role: "stat", type: "single", encoding: "none", options: RSVP },
  { key: "tallStruggle", number: 7, label: "Wat is jouw grootste lange-mensen-struggle?", role: "cluster", type: "single", encoding: "nominal", options: TALL_STRUGGLE },
  { key: "planeSeat", number: 8, label: "Waar zit jij het liefst in een vliegtuig?", role: "cluster", type: "single", encoding: "nominal", options: PLANE_SEAT },
  { key: "heightQuestionFreq", number: 9, label: 'Hoe vaak krijg jij de vraag "Hoe lang ben jij?"?', role: "cluster", type: "single", encoding: "ordinal", options: HEIGHT_QUESTION_FREQ },
  { key: "tallAdvantage", number: 10, label: "Wat is het grootste voordeel van lang zijn?", role: "cluster", type: "single", encoding: "nominal", options: TALL_ADVANTAGE },
  { key: "borrelArrival", number: 11, label: "Hoe laat ben jij normaal op een borrel?", role: "cluster", type: "single", encoding: "ordinal", options: BORREL_ARRIVAL },
  { key: "borrelEnding", number: 12, label: "Hoe eindigt jouw gemiddelde Kompanenborrel?", role: "cluster", type: "single", encoding: "nominal", options: BORREL_ENDING },
  { key: "idealBorrel", number: 13, label: "Wat is jouw ideale borrel?", role: "cluster", type: "single", encoding: "nominal", options: IDEAL_BORREL },
  { key: "borrelRole", number: 14, label: "Op een borrel ben ik meestal…", role: "cluster", type: "single", encoding: "nominal", options: BORREL_ROLE },
  { key: "planSpontaneous", number: 15, label: "Plannen of spontaan?", role: "cluster", type: "single", encoding: "binary", options: PLAN_SPONTANEOUS },
  { key: "cityNature", number: 16, label: "Stad of natuur?", role: "cluster", type: "single", encoding: "binary", options: CITY_NATURE },
  { key: "festivalTerrace", number: 17, label: "Festival of terras?", role: "cluster", type: "single", encoding: "binary", options: FESTIVAL_TERRACE },
  { key: "earlyBedLate", number: 18, label: "Vroeg naar bed of doorgaan?", role: "cluster", type: "single", encoding: "binary", options: EARLY_BED_LATE },
  { key: "cuisine", number: 19, label: "Favoriete keuken?", role: "cluster", type: "single", encoding: "nominal", options: CUISINE },
  { key: "morningEvening", number: 20, label: "Ochtend- of avondmens?", role: "cluster", type: "single", encoding: "binary", options: MORNING_EVENING },
  { key: "kompaanIfSentence", number: 21, label: 'Maak de zin af: "Je weet dat je een Kompaan bent als…"', role: "showcase", type: "open" },
  { key: "ultimateKompaanTrait", number: 22, label: "Welke eigenschap MOET de ultieme Kompaan volgens jou hebben?", role: "showcase", type: "open" },
  { key: "headBump", number: 23, label: "Hoe vaak stoot je je hoofd?", role: "stat", type: "single", encoding: "ordinal", options: HEAD_BUMP },
  { key: "weatherReaction", number: 24, label: 'Jouw standaard reactie op "hoe is het weer daarboven?"', role: "cluster", type: "single", encoding: "nominal", options: WEATHER_REACTION },
  { key: "drink", number: 25, label: "Jouw vaste borrel-drankje?", role: "cluster", type: "single", encoding: "nominal", options: DRINK },
  { key: "appGroupRole", number: 26, label: "Jouw rol in de app-groep?", role: "cluster", type: "single", encoding: "nominal", options: APP_GROUP_ROLE },
  { key: "danceSideline", number: 27, label: "Dansvloer of zijlijn?", role: "cluster", type: "single", encoding: "binary", options: DANCE_SIDELINE },
  { key: "heightRemark", number: 28, label: "Meest gehoorde lengte-opmerking waar je klaar mee bent?", role: "showcase", type: "open" },
] as const;

/** Ordered CSV column headers (Q1..Q28), used by the parser and generator. */
export const CSV_COLUMNS: readonly SurveyResponseKey[] = QUESTIONS.map((q) => q.key);
