/**
 * Named Kompaan archetypes for Borrel 35.
 *
 * Each archetype is one human-named reading of a cluster emitted by the
 * build-time clustering prototype (`scripts/archetypes/cluster.ts`, story
 * BORREL-2.5). The `sourceClusterId` points back at the cluster in
 * `scripts/archetypes/archetypes.json`; the `definingTraits` paraphrase that
 * cluster's dominant answer signature.
 *
 * Honesty note: the current signatures come from the *mock* CSV
 * (`data/responses.csv`), whose rows are uniform-random, so the six clusters are
 * barely separated (silhouette ≈ 0.03) and the cluster count is *pinned* at 6 by
 * design, not chosen by the data. Treat the names and descriptions below as a
 * **template** to re-derive once the real Google-Form responses land — the
 * giraffe voice stays, the traits (and maybe the count) get retuned. Some
 * clusters mix contradictory answers (mock noise); each name leans on that
 * cluster's most coherent, defining signals. See `docs/archetypes.md`.
 */

export interface Archetype {
  /** Stable slug, safe for URLs and asset filenames. */
  readonly id: string;
  /** Playful Dutch display name, on the vertical/giraffe borrel theme. */
  readonly name: string;
  /** One- or two-sentence character sketch. */
  readonly description: string;
  /**
   * Human-readable defining traits, each paraphrasing a dominant answer from
   * the source cluster's signature.
   */
  readonly definingTraits: readonly string[];
  /** Cluster `id` in `scripts/archetypes/archetypes.json` this maps to. */
  readonly sourceClusterId: number;
  /**
   * Public path to this archetype's promo/social banner (1200×630 SVG under
   * `public/archetypes/`, filename === `id`). On-brand, code-generated
   * placeholder art (BORREL-2.7); swap for AI raster art via the prompts in
   * `docs/archetypes.md` → "Image regeneration".
   */
  readonly image: string;
}

export const ARCHETYPES: readonly Archetype[] = [
  {
    id: "parkborrelprofessional",
    name: "De Parkborrelprofessional",
    description:
      "Regelt de borrel alsof het een gala is: locatie in het groen, terras geclaimd, draaiboek in de hand. Torent kalm boven de chaos uit en overziet alles vanaf de zijlijn — spontaan is voor andere dieren.",
    definingTraits: [
      "Natuurmens in hart en nieren (100% Natuur boven Stad)",
      "Plant álles (71%) en is dé organisator van het gezelschap (57%)",
      "Terraskoning (71%) met een zwak voor een gala (42%)",
      "Danst vanaf de zijlijn (57%) en gaat verantwoord naar huis (57%)",
    ],
    sourceClusterId: 0,
    image: "/archetypes/parkborrelprofessional.svg",
  },
  {
    id: "festival-flamingo",
    name: "De Festival-Flamingo",
    description:
      "Lange poten, fel aanwezig, en op elk festival als eerste op de dansvloer. Roept dat-ie eraan komt, duikt spontaan op bij elke themaborrel en sluit de avond af met een hap eten.",
    definingTraits: [
      "Festivalbeest (100% Festival) en staat altijd op de dansvloer (83%)",
      "Spontaan (66%) en gek op een themaborrel (66%)",
      'Het "ik-kom-eraan"-liegbeest in de groepsapp (50%)',
      "Sluit de avond af met eten (66%)",
    ],
    sourceClusterId: 1,
    image: "/archetypes/festival-flamingo.svg",
  },
  {
    id: "salmari-soldaat",
    name: "De Salmari-Soldaat",
    description:
      "Marcheert de stad in, recht de dansvloer op, en gaat door op shots en 'nog even één drankje'. Meester van de verdwijntruc: het ene moment middenin het feest, het volgende spoorloos.",
    definingTraits: [
      "Altijd op de dansvloer (100%) en echt een stadsmens (100%)",
      "Meester van de verdwijntruc (75%) en door en door spontaan (75%)",
      "Shots (50%) en het klassieke \"nog even één drankje\" (50%)",
      "Kiest terras boven festival als het even kan (100%)",
    ],
    sourceClusterId: 2,
    image: "/archetypes/salmari-soldaat.svg",
  },
  {
    id: "lange-nachtbraker",
    name: "De Lange Nachtbraker",
    description:
      "Avondmens tot in de tenen: begint pas los te komen als de rest al gaapt, en houdt het bij 'nog even één drankje' tot diep in de nacht. Plant zijn avonden strak, maar danst het liefst vanaf de zijlijn.",
    definingTraits: [
      "Onverbeterlijke avondmens (88%)",
      'Blijft hangen voor "nog even één drankje" (77%)',
      "Plant zijn avond strak (77%) en danst vanaf de zijlijn (77%)",
      "Festivalganger als het uitkomt (66%)",
    ],
    sourceClusterId: 3,
    image: "/archetypes/lange-nachtbraker.svg",
  },
  {
    id: "verantwoordelijke-kompaan",
    name: "De Verantwoordelijke Kompaan",
    description:
      "De trouwe kompaan van de vaste kliek: komt voor de gezelligheid, gaat op tijd verantwoord naar huis en ligt vroeg op één oor. Een feestborrel in het groen, maar wel met een oogje op de klok.",
    definingTraits: [
      "Vroeg naar bed (83%) en gaat verantwoord naar huis (66%)",
      "Trouw aan de vaste kliek (50%)",
      "Natuurmens (83%) met een voorliefde voor de feestborrel (66%)",
      "De stille ghost in de groepsapp (66%)",
    ],
    sourceClusterId: 4,
    image: "/archetypes/verantwoordelijke-kompaan.svg",
  },
  {
    id: "bedtijd-baron",
    name: "De Bedtijd-Baron",
    description:
      "Brengt de sfeer, schenkt de wijn en maakt de kroegborrel — maar heerst met ijzeren hand over de eigen bedtijd. Om twaalf uur verandert deze pompoen resoluut in een uitgeruste ochtendmens.",
    definingTraits: [
      "Onwrikbaar vroeg naar bed (100%)",
      "Ochtendmens (62%) die tóch de sfeermaker is (37%)",
      "Houdt van een kroegborrel (37%) met een glas wijn (37%)",
      "Danst het liefst vanaf de zijlijn (62%)",
    ],
    sourceClusterId: 5,
    image: "/archetypes/bedtijd-baron.svg",
  },
];
