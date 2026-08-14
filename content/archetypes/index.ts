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
 * (`data/responses.csv`), whose rows are uniform-random, so the three clusters
 * are only weakly separated (silhouette ≈ 0.05). Treat the names and
 * descriptions below as a **template** to re-derive once the real Google-Form
 * responses land — the giraffe voice stays, the traits get retuned. See
 * `docs/archetypes.md`.
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
}

export const ARCHETYPES: readonly Archetype[] = [
  {
    id: "plan-giraffe",
    name: "De Plan-Giraffe",
    description:
      "Torent kalm boven de chaos uit met een strak plan in de hand. Regelt de borrel, claimt het terras en houdt het overzicht — spontaan is voor andere dieren.",
    definingTraits: [
      'Plant álles: 100% kiest "Plannen" boven spontaan',
      "Natuurmens in hart en nieren (73% Natuur boven Stad)",
      "Terraskoning (60% Terras boven Festival)",
      "De organisator (33%) én sfeermaker (33%) van het gezelschap",
      'Komt als één van de eersten binnen (40%) en houdt het bij "nog even één drankje" (53%)',
      "Avondmens (67%), maar danst het liefst vanaf de zijlijn (60%)",
    ],
    sourceClusterId: 0,
  },
  {
    id: "kom-eraan-giraffe",
    name: "De Kom-Eraan-Giraffe",
    description:
      'Roept al een uur "Ik kom eraan!" vanaf de bank thuis. Duikt spontaan op, danst de hele avond en verdwijnt daarna zonder gedag — de vaste ster van elke themaborrel.',
    definingTraits: [
      "100% ochtendmens — vroeg wakker, laat op de borrel",
      'Het "ik-kom-eraan"-liegbeest (29%) dat roept dat-ie onderweg is terwijl-ie nog thuis zit (36%)',
      "Meester van de verdwijntruc (43%)",
      "Spontaan (64%), stadsmens (71%) en festivalganger (64%)",
      "Staat wél gewoon op de dansvloer (71%)",
      "Houdt van een themaborrel (43%) en sluit af met eten (43%)",
    ],
    sourceClusterId: 1,
  },
  {
    id: "verantwoorde-reus",
    name: "De Verantwoorde Reus",
    description:
      "Te lang voor elk bed, te verstandig voor de laatste ronde. Blijft trouw bij de vaste kliek, gaat op tijd naar huis en glimlacht dapper bij de zoveelste lengtegrap.",
    definingTraits: [
      "Gaat verantwoord naar huis (55%) en vroeg naar bed (91%)",
      "Trouw aan de vaste kliek (55%)",
      "De ghost in de groepsapp (45%)",
      "Voeten steken uit elk bed (45%) en krijgt wekelijks de lengtevraag (36%)",
      "Avondmens vanbinnen (91%), maar danst vanaf de zijlijn (64%)",
      'Glimlacht bij de zoveelste lengtegrap en "sterft vanbinnen" (27%)',
    ],
    sourceClusterId: 2,
  },
];
