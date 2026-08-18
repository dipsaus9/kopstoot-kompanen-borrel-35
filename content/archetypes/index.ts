/**
 * Named Kompaan archetypes for Borrel 35.
 *
 * Each archetype is one human-named character. Matching is **signature-based**
 * (`lib/aggregate/archetype.ts`): every type declares a handful of defining
 * answers (`signature`) and a respondent is assigned to the type whose defining
 * answers they hit hardest. This replaced the earlier nearest-centroid
 * classifier — on the real Google-Form crowd the six k-means clusters barely
 * separate (almost everyone is terras + verantwoord), so distance-to-centroid
 * matched people to types whose *character* they did not share (a shotjes-lover
 * landing on "De Verantwoordelijke"). Keying each type to the answers its name
 * actually promises makes the match legible and stable regardless of how the
 * live data is skewed.
 *
 * `sourceClusterId` is retained only as provenance — the k-means cluster in
 * `scripts/archetypes/archetypes.json` that originally inspired the type; it no
 * longer drives resolution. `image` is the character illustration shown on the
 * per-type page, in `public/archetypes/<id>.jpeg`. See `docs/archetypes.md`.
 */

import type { SurveyResponse } from "../../lib/data";

/**
 * One defining answer for an archetype: hitting any of `options` on question
 * `key` adds `weight` to that type's score. Weights let a type's signature
 * answer (e.g. Salmari for the Salmari-Soldaat) outrank common filler answers
 * that many respondents share.
 */
export interface SignatureTrait {
  /** The cluster-role question this trait keys on. */
  readonly key: keyof SurveyResponse;
  /** Answers (schema option values) that count as a hit; any one matches. */
  readonly options: readonly string[];
  /** Score added when the respondent gives one of `options`. */
  readonly weight: number;
}

export interface Archetype {
  /** Stable slug, safe for URLs and asset filenames. */
  readonly id: string;
  /** Playful Dutch display name, on the vertical/giraffe borrel theme. */
  readonly name: string;
  /** One- or two-sentence character sketch. */
  readonly description: string;
  /** Character illustration, served from `public/` (e.g. `/archetypes/<id>.jpeg`). */
  readonly image: string;
  /** Human-readable defining traits shown on the per-type page. */
  readonly definingTraits: readonly string[];
  /** Defining answers that score a respondent onto this type. */
  readonly signature: readonly SignatureTrait[];
  /** k-means cluster in `archetypes.json` that inspired the type (provenance only). */
  readonly sourceClusterId: number;
}

export const ARCHETYPES: readonly Archetype[] = [
  {
    id: "parkborrelprofessional",
    name: "De Parkborrelprofessional",
    description:
      "De tas met benodigdheden voor het geval dat zit vol, de Aperol staat koud en op mysterieuze wijze weet deze Kompaan altijd waar alles en iedereen is. Zelf stress? Nee joh. Naamstickers? Check. Vuilniszakken? Check. Pleisters? Waarschijnlijk ook. Een bak zin? CHECK!",
    image: "/archetypes/parkborrelprofessional.jpeg",
    definingTraits: [
      "De regelaar met pleisters, powerbank en het overzicht",
      "Plant álles tot in de puntjes",
      "Parkborrel-connaisseur op het terras",
      "Raakt jas, telefoon én waardigheid nooit kwijt",
    ],
    signature: [
      {
        key: "borrelRole",
        options: [
          "De regelaar: heeft pleisters, een powerbank en weet waar iedereen is",
        ],
        weight: 3,
      },
      { key: "planSpontaneous", options: ["Plannen"], weight: 1 },
      { key: "idealBorrel", options: ["Parkborrel"], weight: 1 },
      {
        key: "borrelSuperpower",
        options: ["Mijn jas, telefoon én waardigheid nooit meer kwijtraken"],
        weight: 1,
      },
    ],
    sourceClusterId: 1,
  },
  {
    id: "festival-flamingo",
    name: "De Festival-Flamingo",
    description:
      "Borrel? De Festival-Flamingo is daar! Spontaan, enthousiast en niet bepaald moeilijk op gang te krijgen. Een zonnetje, muziek en een groep Kompanen is ruim voldoende. Is als eerste aanwezig en heeft bij aankomst al meer energie dan de rest na drie drankjes. Buideltasje om, drankje erin en gáááán!",
    image: "/archetypes/festival-flamingo.jpeg",
    definingTraits: [
      "Festivalbeest in hart en nieren",
      "Spontaan en dol op een feestborrel",
      "Als één van de eersten binnen, energie op tien",
      "Superkracht: nooit de borrel-besties kwijtraken",
    ],
    signature: [
      { key: "festivalTerrace", options: ["Festival"], weight: 3 },
      { key: "idealBorrel", options: ["Feestborrel"], weight: 1 },
      { key: "planSpontaneous", options: ["Spontaan"], weight: 1 },
      { key: "borrelArrival", options: ["Als één van de eersten"], weight: 1 },
      {
        key: "borrelSuperpower",
        options: ["Nooit mijn borrel-besties kwijtraken"],
        weight: 1,
      },
    ],
    sourceClusterId: 3,
  },
  {
    id: "salmari-soldaat",
    name: "De Salmari-Soldaat",
    description:
      "Begint de borrel nog heel onschuldig met een drankje. Maar waar de Salmari verschijnt, is de Salmari-Soldaat nooit ver weg. Met de fles in de aanslag en shotglaasjes binnen handbereik wordt zonder enige twijfel doorgeschonken. Deelt uit, proost mee en is niet vies van nog een rondje. Gaat lekker lang door, zolang je hem tenminste niet ineens ergens onderweg kwijtraakt.",
    image: "/archetypes/salmari-soldaat.jpeg",
    definingTraits: [
      "Fles in de aanslag, shotglaasjes binnen handbereik",
      "Eindigt de avond standaard bij de SHOTJESS",
      'De slechte invloed: "Shotje???"',
      "Rustig aan? Tot iemand met shotjes aankomt",
    ],
    signature: [
      {
        key: "drink",
        options: ["Salmari. Geen verdere vragen.", "Shotjes"],
        weight: 3,
      },
      { key: "borrelEnding", options: ["SHOTJESS"], weight: 2 },
      {
        key: "borrelRole",
        options: ['De slechte invloed: "Shotje???"'],
        weight: 2,
      },
      {
        key: "earlyBedLate",
        options: ["Tot iemand met shotjes aankomt"],
        weight: 1,
      },
    ],
    sourceClusterId: 2,
  },
  {
    id: "lange-nachtbraker",
    name: "De Lange Nachtbraker",
    description:
      "De zon zakt, de telefoon zit op 3% en het biertje is alweer bijna op, precies zoals de Lange Nachtbraker het graag ziet. Waar anderen voorzichtig over naar huis gaan beginnen, verschijnt hier vooral een tevreden glimlach: we zijn toch nét lekker bezig? Zolang er ergens nog een drankje mogelijk is, is er hoop. Naar huis kan morgen ook.",
    image: "/archetypes/lange-nachtbraker.jpeg",
    definingTraits: [
      "Eindigt op een after — of in elk geval niet thuis",
      "'Rustig aan' bestaat niet in zijn woordenboek",
      "Echte stadsmens",
      "Roept 'ik kom eraan!' terwijl hij nog thuis is",
    ],
    signature: [
      {
        key: "borrelEnding",
        options: [
          "Op een after waarvan ik het bestaan twee uur geleden nog niet kende",
          "Niet in mijn eigen bed (oops overkomt de beste)",
          "Ik heb gaten in mijn brein...",
        ],
        weight: 2,
      },
      {
        key: "earlyBedLate",
        options: [
          "Helemaal niets. In mijn woordenboek is dit een betekenisloze zin.",
        ],
        weight: 2,
      },
      {
        key: "borrelArrival",
        options: [
          "Als allerlaatste",
          "'Ik kom eraan!' terwijl ik nog thuis ben",
        ],
        weight: 1,
      },
      { key: "cityNature", options: ["Stad"], weight: 1 },
    ],
    sourceClusterId: 4,
  },
  {
    id: "verantwoordelijke-kompaan",
    name: "De Verantwoordelijke Kompaan",
    description:
      "Komt voor de borrelbesties, de gezelligheid en een goede middag samen en heeft ondertussen prima door hoe laat de laatste fatsoenlijke trein gaat. Houdt een oogje op de rest, helpt waar nodig, zorgt dat iedereen veilig thuiskomt en blijft opvallend fris en fruitig tussen alle chaos. Heeft het uitstekend naar de zin, maar weet ook wanneer het mooi is geweest. Zwaait gedag terwijl de rest nét aan een slecht idee begint.",
    image: "/archetypes/verantwoordelijke-kompaan.jpeg",
    definingTraits: [
      "Gaat keurig en verantwoord naar huis",
      "De adoptieouder die nieuwelingen meteen meeneemt",
      "Doet het écht rustig aan: maximaal een paar drankjes",
      "Onthoudt iedereens naam tussen alle chaos",
    ],
    signature: [
      {
        key: "borrelEnding",
        options: ["Keurig en verantwoord naar huis"],
        weight: 2,
      },
      {
        key: "borrelRole",
        options: ["De adoptieouder: ziet een nieuweling en neemt die meteen mee"],
        weight: 2,
      },
      {
        key: "earlyBedLate",
        options: ["Maximaal een paar drankjes"],
        weight: 1,
      },
      {
        key: "borrelSuperpower",
        options: ["Iedereen zijn naam onthouden"],
        weight: 1,
      },
    ],
    sourceClusterId: 5,
  },
  {
    id: "bedtijd-baron",
    name: "De Bedtijd-Baron",
    description:
      "Een goed glas wijn verdient tijd en aandacht. Bedtijd trouwens ook. De Bedtijd-Baron geniet waardig van de borrel, het gezelschap en vooral van wat er in het glas zit, maar laat zich door niemand verleiden tot nachtelijke uitspattingen of slechte ideeën. Eén blik op het horloge en het vonnis staat vast. Gezelligheid kent geen tijd, maar de Bedtijd-Baron wel.",
    image: "/archetypes/bedtijd-baron.jpeg",
    definingTraits: [
      "Een goed glas wijn, met tijd en aandacht",
      "Lekker vroeg onder de wol, morgen fris en fruitig",
      "Het liefst dicht bij huis en de eigen bank",
      "Als één van de eersten binnen",
    ],
    signature: [
      { key: "drink", options: ["Wijn"], weight: 2 },
      {
        key: "earlyBedLate",
        options: [
          "Lekker vroeg onder de wol en morgen fris en fruitig",
          "Dat meen ik daadwerkelijk en iedereen lacht me uit",
        ],
        weight: 2,
      },
      { key: "cityNature", options: ["Mijn bank"], weight: 1 },
      { key: "borrelArrival", options: ["Als één van de eersten"], weight: 1 },
    ],
    sourceClusterId: 0,
  },
];
