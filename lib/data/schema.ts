/**
 * Survey response schema — the single source of truth for the Borrel 35 dataset.
 *
 * Every option tuple and question here mirrors the ACTUAL published Google Form
 * (verbatim Dutch option text, emoji and trailing ellipsis stripped so the live
 * loader can match exactly). The registry drives the parser (`parse.ts`), the
 * mock generator (`scripts/mock/generate.ts`) and the live loader (`live.ts`),
 * so the schema, the data and the types can never drift apart.
 *
 * NOTE: this file was realigned to the real form after launch. The form has no
 * ochtend/avond, hoofdstoten, weer-reactie, app-groep-rol, dansvloer or
 * "ultieme eigenschap" question, so those fields were removed; the form's
 * "borrel-superkracht" question was added as {@link BORREL_SUPERPOWER}. When the
 * form changes again, revisit ONLY the option tuples and `QUESTIONS` — the
 * parser, loader, types, aggregate and clustering all follow automatically.
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
  "Ik ben nog in onderhandeling met mijn verantwoordelijkheden",
  "Ik wil graag, maar durf nog niet (app Biko, Jolie, Iris, Cait of Emma)",
  "Mijn agenda zegt misschien, mijn hart zegt Salmari",
  "Helaas niet",
] as const;

// Multi-select on the form; the loader keeps the first chosen option.
export const TALL_STRUGGLE = [
  "Te weinig beenruimte",
  "Spiegels waarin je alleen je torso ziet",
  "Concertbezoekers achter mij die mijn bestaan persoonlijk opvatten",
  "Bedden waar m'n voeten uitsteken",
  "'Jeetje, wat ben jij lang!', bedankt, was me nog niet opgevallen",
  "Mensen die vragen of ik basketbal speel",
  "Broeken: hoogwater of een circustent",
  "Auto instappen en eerst de stoel van een kabouter moeten verbouwen",
  "Foto's: hurken of onthoofd worden op de uiteindelijke foto",
  "Douchekoppen op tepelhoogte",
  "Deurposten die onverwacht geweld gebruiken",
] as const;

export const PLANE_SEAT = [
  "Nooduitgang, take my money",
  "Gangpad",
  "In het midden",
  "Raam",
  "Maakt niet uit, ik lijd toch wel",
  "Dichtbij het toilet",
] as const;

// Ordinal: meest → minst vaak gevraagd
export const HEIGHT_QUESTION_FREQ = [
  "Meerdere keren per week",
  "Wekelijks",
  "Een paar keer per maand",
  "Alleen wanneer ik nieuwe mensen ontmoet",
  "Bijna nooit",
  "Ik hoor het niet eens meer; mijn brein filtert het automatisch weg",
] as const;

export const TALL_ADVANTAGE = [
  "Overal bij kunnen",
  "Nooit iemand vóór je bij een concert",
  "Gratis menselijke herkenningspaal op festivals",
  "Mensen zijn automatisch onder de indruk",
  "Groepsfoto? Ik weet waar ik moet staan",
  "Voordeel? Ik betaal extra voor beenruimte... >:(",
  "Mijn vrienden vinden mij altijd terug in de menigte",
  "De bovenste plank is gewoon een normale plank",
] as const;

// Ordinal: eersten → allerlaatste
export const BORREL_ARRIVAL = [
  "Als één van de eersten",
  "Keurig op tijd",
  "Fashionably late (okay diva)",
  "'Ik kom eraan!' terwijl ik nog thuis ben",
  "Als allerlaatste",
] as const;

export const BORREL_ENDING = [
  "Keurig en verantwoord naar huis",
  "Nog even één drankje (en dat zes keer)",
  "SHOTJESS",
  "Bij de snackbar of El Greco",
  "Ik heb gaten in mijn brein...",
  "Op een after waarvan ik het bestaan twee uur geleden nog niet kende",
  "Niet in mijn eigen bed (oops overkomt de beste)",
] as const;

export const IDEAL_BORREL = [
  "Parkborrel",
  "Kroegborrel",
  "Themaborrel",
  "Gala",
  "Feestborrel",
] as const;

export const BORREL_ROLE = [
  "De social butterfly: praat met iedereen",
  "De vaste-kliek-hanger: eenmaal geland verschuif ik geen meter",
  "De regelaar: heeft pleisters, een powerbank en weet waar iedereen is",
  "De verdwijntruc: ineens drie uur spoorloos",
  'De slechte invloed: "Shotje???"',
  "De filosoof: om 21:00 ineens gesprekken over de zin van het leven",
  "De adoptieouder: ziet een nieuweling en neemt die meteen mee",
  "De wandelende podcast: stopt simpelweg niet met praten",
  "De zwerver: begon bij groep A en is inmiddels door zes vriendengroepen geadopteerd",
] as const;

export const DRINK = [
  "Bier",
  "Wijn",
  "Mijn geheime homemade mix",
  "Shotjes",
  "Fris, ik heb geen alcohol nodig voor mijn persoonlijkheid",
  "Salmari. Geen verdere vragen.",
  "Water, hydratatiekoning(in) that I am",
  "Alles wat iedereen mij in mijn handen duwt",
] as const;

export const EARLY_BED_LATE = [
  "Lekker vroeg onder de wol en morgen fris en fruitig",
  "Maximaal een paar drankjes",
  "Dat zei ik vorige keer ook...",
  "Tot iemand met shotjes aankomt",
  "Helemaal niets. In mijn woordenboek is dit een betekenisloze zin.",
  "Dat meen ik daadwerkelijk en iedereen lacht me uit",
] as const;

export const BORREL_SUPERPOWER = [
  "Nooit meer een kater",
  "Altijd gratis drankjes",
  "Iedereen zijn naam onthouden",
  "Nooit mijn borrel-besties kwijtraken",
  "Teleporteren naar huis",
  "Altijd zichtbaar op de groepsfoto",
  "Mijn jas, telefoon én waardigheid nooit meer kwijtraken",
] as const;

export const CITY_NATURE = ["Stad", "Natuur", "Mijn bank"] as const;
export const PLAN_SPONTANEOUS = ["Plannen", "Spontaan"] as const;
export const FESTIVAL_TERRACE = ["Festival", "Terras"] as const;

export const CUISINE = [
  "Italiaans",
  "Japans",
  "Thais",
  "Chinees",
  "Nederlands",
  "Grieks",
  "Mexicaans",
  "Alles",
  "Anders",
] as const;

// --- The typed survey response (one CSV row) --------------------------------

/**
 * A single validated survey response. Field order mirrors the form and the CSV
 * column order (see `CSV_COLUMNS`). Closed answers are string-literal unions
 * derived from the option tuples above; numeric stats are `number`; open
 * showcase answers are free `string`.
 */
export interface SurveyResponse {
  /** identity · open — bijnaam */
  name: string;
  /** stat · number — leeftijd in hele jaren */
  age: number;
  /** stat · number — lichaamslengte in cm (~100–230) */
  heightCm: number;
  /** stat · single */
  province: (typeof PROVINCES)[number];
  /** stat · number — aantal borrels */
  borrelCount: number;
  /** stat (RSVP) · single — excluded from clustering + % match */
  rsvp: (typeof RSVP)[number];
  /** cluster · nominal */
  tallStruggle: (typeof TALL_STRUGGLE)[number];
  /** cluster · nominal */
  planeSeat: (typeof PLANE_SEAT)[number];
  /** cluster · ordinal */
  heightQuestionFreq: (typeof HEIGHT_QUESTION_FREQ)[number];
  /** cluster · nominal */
  tallAdvantage: (typeof TALL_ADVANTAGE)[number];
  /** cluster · ordinal */
  borrelArrival: (typeof BORREL_ARRIVAL)[number];
  /** cluster · nominal */
  borrelEnding: (typeof BORREL_ENDING)[number];
  /** cluster · nominal */
  idealBorrel: (typeof IDEAL_BORREL)[number];
  /** cluster · nominal (strong archetype signal) */
  borrelRole: (typeof BORREL_ROLE)[number];
  /** cluster · nominal (+ superlatief) */
  drink: (typeof DRINK)[number];
  /** cluster · nominal */
  earlyBedLate: (typeof EARLY_BED_LATE)[number];
  /** cluster · nominal (strong archetype signal) */
  borrelSuperpower: (typeof BORREL_SUPERPOWER)[number];
  /** cluster · nominal */
  cityNature: (typeof CITY_NATURE)[number];
  /** cluster · binary */
  planSpontaneous: (typeof PLAN_SPONTANEOUS)[number];
  /** cluster · binary */
  festivalTerrace: (typeof FESTIVAL_TERRACE)[number];
  /** cluster · nominal (low weight / droppable) */
  cuisine: (typeof CUISINE)[number];
  /** showcase · open — never clustered */
  kompaanIfSentence: string;
  /** showcase · open — never clustered */
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
 * The questions in form order. `key` is the CSV header and the `SurveyResponse`
 * property; `options` drives closed-value validation.
 */
export const QUESTIONS: readonly QuestionField[] = [
  { key: "name", number: 1, label: "Wat is je bijnaam of hoe mogen we je noemen?", role: "identity", type: "open" },
  { key: "age", number: 2, label: "Hoe jong ben je?", role: "stat", type: "number", min: 16, max: 120 },
  { key: "heightCm", number: 3, label: "Hoe lang ben je in centimeters?", role: "stat", type: "number", min: 100, max: 230 },
  { key: "province", number: 4, label: "In welke provincie woon je?", role: "stat", type: "single", encoding: "nominal", options: PROVINCES },
  { key: "borrelCount", number: 5, label: "Hoeveel borrels heb jij inmiddels op je naam staan?", role: "stat", type: "number", min: 0, max: 1000 },
  { key: "rsvp", number: 6, label: "Kom je borrelen zaterdag 29 augustus?", role: "stat", type: "single", encoding: "none", options: RSVP },
  { key: "tallStruggle", number: 7, label: "Wat is jouw grootste lange-mensen-struggle?", role: "cluster", type: "single", encoding: "nominal", options: TALL_STRUGGLE },
  { key: "planeSeat", number: 8, label: "Waar zit jij het liefst in een vliegtuig?", role: "cluster", type: "single", encoding: "nominal", options: PLANE_SEAT },
  { key: "heightQuestionFreq", number: 9, label: "Hoe vaak krijg jij de vraag 'Hoe lang ben jij?'?", role: "cluster", type: "single", encoding: "ordinal", options: HEIGHT_QUESTION_FREQ },
  { key: "tallAdvantage", number: 10, label: "Wat is het grootste voordeel van lang zijn?", role: "cluster", type: "single", encoding: "nominal", options: TALL_ADVANTAGE },
  { key: "borrelArrival", number: 11, label: "Wanneer maak jij meestal je entree op een borrel?", role: "cluster", type: "single", encoding: "ordinal", options: BORREL_ARRIVAL },
  { key: "borrelEnding", number: 12, label: "Hoe eindigt jouw gemiddelde kompanenborrel?", role: "cluster", type: "single", encoding: "nominal", options: BORREL_ENDING },
  { key: "idealBorrel", number: 13, label: "Wat is jouw ideale borrel?", role: "cluster", type: "single", encoding: "nominal", options: IDEAL_BORREL },
  { key: "borrelRole", number: 14, label: "Op een borrel ben ik meestal…", role: "cluster", type: "single", encoding: "nominal", options: BORREL_ROLE },
  { key: "drink", number: 15, label: "Wat is jouw vaste borreldrankje?", role: "cluster", type: "single", encoding: "nominal", options: DRINK },
  { key: "earlyBedLate", number: 16, label: "Je zegt: 'ik doe deze borrel rustig aan'. Wat betekent dat?", role: "cluster", type: "single", encoding: "nominal", options: EARLY_BED_LATE },
  { key: "borrelSuperpower", number: 17, label: "Kies je borrel-superkracht", role: "cluster", type: "single", encoding: "nominal", options: BORREL_SUPERPOWER },
  { key: "cityNature", number: 18, label: "Kies je habitat", role: "cluster", type: "single", encoding: "nominal", options: CITY_NATURE },
  { key: "planSpontaneous", number: 19, label: "Afspraken plannen of spontaan afspreken?", role: "cluster", type: "single", encoding: "binary", options: PLAN_SPONTANEOUS },
  { key: "festivalTerrace", number: 20, label: "Waar vinden we jou op een vrije zomerdag?", role: "cluster", type: "single", encoding: "binary", options: FESTIVAL_TERRACE },
  { key: "cuisine", number: 21, label: "Wat is je lievelingskeuken?", role: "cluster", type: "single", encoding: "nominal", options: CUISINE },
  { key: "kompaanIfSentence", number: 22, label: "Maak de zin af: Je weet dat je een Kompaan bent als…", role: "showcase", type: "open" },
  { key: "heightRemark", number: 23, label: "Welke lengte-opmerking mag wat jou betreft per direct met pensioen?", role: "showcase", type: "open" },
] as const;

/** Ordered CSV column headers, used by the parser and generator. */
export const CSV_COLUMNS: readonly SurveyResponseKey[] = QUESTIONS.map((q) => q.key);
