/**
 * Named Kompaan archetypes for Borrel 35.
 *
 * Each archetype is one human-named reading of a cluster emitted by the
 * build-time clustering prototype (`scripts/archetypes/cluster.ts`, story
 * BORREL-2.5). The `sourceClusterId` points back at the cluster in
 * `scripts/archetypes/archetypes.json`; the `definingTraits` paraphrase that
 * cluster's dominant answer signature. `image` is the character illustration
 * shown on the per-type page, in `public/archetypes/<id>.jpeg`.
 *
 * Honesty note: the trait signatures come from the *mock* CSV
 * (`data/responses.csv`), whose rows are uniform-random, so the six clusters are
 * barely separated — retune once the real Google-Form responses land. The names,
 * descriptions and art are the settled identity. See `docs/archetypes.md`.
 */

export interface Archetype {
  /** Stable slug, safe for URLs and asset filenames. */
  readonly id: string;
  /** Playful Dutch display name, on the vertical/giraffe borrel theme. */
  readonly name: string;
  /** One- or two-sentence character sketch. */
  readonly description: string;
  /** Character illustration, served from `public/` (e.g. `/archetypes/<id>.jpeg`). */
  readonly image: string;
  /**
   * Human-readable defining traits, each paraphrasing a dominant answer from
   * the source cluster's signature.
   */
  readonly definingTraits: readonly string[];
  /** Cluster `id` in `scripts/archetypes/archetypes.json` this maps to. */
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
      "Plant álles tot in de puntjes (100% team plannen)",
      "Natuurmens (86%) die het terras verkiest boven het festival (86%)",
      "Imponeert automatisch met de lengte (57%)",
      "Houdt van een goede kroegborrel (57%)",
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
      "Festivalbeest in hart en nieren (83% festival boven terras)",
      "Spontaan (83%) en dol op een feestborrel (67%)",
      "Superkracht: nooit de borrel-besties kwijtraken (83%)",
      "Komt fashionably late binnenzeilen (50%)",
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
      "De social butterfly die met iedereen praat (80%)",
      "Eindigt de avond standaard bij de SHOTJESS (40%)",
      '"Ik doe rustig aan" — en iedereen lacht hem uit (60%)',
      "Kiest steevast het gangpad in het vliegtuig (60%)",
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
      "Echte stadsmens (83%)",
      'Rust pas als "iemand met shotjes aankomt" (50%)',
      "Roept 'ik kom eraan!' terwijl hij nog thuis is (50%)",
      "Hoort de lengtevraag niet eens meer; brein filtert het weg (67%)",
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
      "De adoptieouder die nieuwelingen meteen meeneemt (50%)",
      "Voor wie de bovenste plank gewoon een normale plank is (67%)",
      "Natuurmens (67%) met een zwak voor een feestje (83% festival)",
      "Neemt af en toe braaf vroeg de wol op (33%)",
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
      "Meent 'ik doe rustig aan' écht — en iedereen lacht hem uit (50%)",
      "Terrasmens pur sang (100%) en anders lekker op de eigen bank (70%)",
      "Als één van de eersten binnen (70%)",
      "Houdt het liefst dicht bij huis en bed",
    ],
    sourceClusterId: 0,
  },
];
