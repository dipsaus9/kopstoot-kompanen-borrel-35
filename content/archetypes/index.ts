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
      "Natuurmens in hart en nieren (100% Natuur boven Stad)",
      "Plant álles (71%) en is dé organisator van het gezelschap (57%)",
      "Terraskoning (71%) met een zwak voor een gala (42%)",
      "Danst vanaf de zijlijn (57%) en gaat verantwoord naar huis (57%)",
    ],
    sourceClusterId: 0,
  },
  {
    id: "festival-flamingo",
    name: "De Festival-Flamingo",
    description:
      "Borrel? De Festival-Flamingo is daar! Spontaan, enthousiast en niet bepaald moeilijk op gang te krijgen. Een zonnetje, muziek en een groep Kompanen is ruim voldoende. Is als eerste aanwezig en heeft bij aankomst al meer energie dan de rest na drie drankjes. Buideltasje om, drankje erin en gáááán!",
    image: "/archetypes/festival-flamingo.jpeg",
    definingTraits: [
      "Festivalbeest (100% Festival) en staat altijd op de dansvloer (83%)",
      "Spontaan (66%) en gek op een themaborrel (66%)",
      'Het "ik-kom-eraan"-liegbeest in de groepsapp (50%)',
      "Sluit de avond af met eten (66%)",
    ],
    sourceClusterId: 1,
  },
  {
    id: "salmari-soldaat",
    name: "De Salmari-Soldaat",
    description:
      "Begint de borrel nog heel onschuldig met een drankje. Maar waar de Salmari verschijnt, is de Salmari-Soldaat nooit ver weg. Met de fles in de aanslag en shotglaasjes binnen handbereik wordt zonder enige twijfel doorgeschonken. Deelt uit, proost mee en is niet vies van nog een rondje. Gaat lekker lang door, zolang je hem tenminste niet ineens ergens onderweg kwijtraakt.",
    image: "/archetypes/salmari-soldaat.jpeg",
    definingTraits: [
      "Altijd op de dansvloer (100%) en echt een stadsmens (100%)",
      "Meester van de verdwijntruc (75%) en door en door spontaan (75%)",
      "Shots (50%) en het klassieke \"nog even één drankje\" (50%)",
      "Kiest terras boven festival als het even kan (100%)",
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
      "Onverbeterlijke avondmens (88%)",
      'Blijft hangen voor "nog even één drankje" (77%)',
      "Plant zijn avond strak (77%) en danst vanaf de zijlijn (77%)",
      "Festivalganger als het uitkomt (66%)",
    ],
    sourceClusterId: 3,
  },
  {
    id: "verantwoordelijke-kompaan",
    name: "De Verantwoordelijke Kompaan",
    description:
      "Komt voor de borrelbesties, de gezelligheid en een goede middag samen en heeft ondertussen prima door hoe laat de laatste fatsoenlijke trein gaat. Houdt een oogje op de rest, helpt waar nodig, zorgt dat iedereen veilig thuiskomt en blijft opvallend fris en fruitig tussen alle chaos. Heeft het uitstekend naar de zin, maar weet ook wanneer het mooi is geweest. Zwaait gedag terwijl de rest nét aan een slecht idee begint.",
    image: "/archetypes/verantwoordelijke-kompaan.jpeg",
    definingTraits: [
      "Vroeg naar bed (83%) en gaat verantwoord naar huis (66%)",
      "Trouw aan de vaste kliek (50%)",
      "Natuurmens (83%) met een voorliefde voor de feestborrel (66%)",
      "De stille ghost in de groepsapp (66%)",
    ],
    sourceClusterId: 4,
  },
  {
    id: "bedtijd-baron",
    name: "De Bedtijd-Baron",
    description:
      "Een goed glas wijn verdient tijd en aandacht. Bedtijd trouwens ook. De Bedtijd-Baron geniet waardig van de borrel, het gezelschap en vooral van wat er in het glas zit, maar laat zich door niemand verleiden tot nachtelijke uitspattingen of slechte ideeën. Eén blik op het horloge en het vonnis staat vast. Gezelligheid kent geen tijd, maar de Bedtijd-Baron wel.",
    image: "/archetypes/bedtijd-baron.jpeg",
    definingTraits: [
      "Onwrikbaar vroeg naar bed (100%)",
      "Ochtendmens (62%) die tóch de sfeermaker is (37%)",
      "Houdt van een kroegborrel (37%) met een glas wijn (37%)",
      "Danst het liefst vanaf de zijlijn (62%)",
    ],
    sourceClusterId: 5,
  },
];
