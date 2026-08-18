/**
 * Deterministic mock-data generator for the Borrel 35 survey.
 *
 * Emits `data/responses.csv` (>= 30 rows) that conforms exactly to the schema
 * in `lib/data/schema.ts`, so every data-consuming epic has real-shaped data to
 * build against before the actual Google-Form responses exist. Seeded, so the
 * output is stable across runs (rerun to regenerate identically).
 *
 * Run:  bun run scripts/mock/generate.ts
 */

import { writeFileSync } from "node:fs";
import path from "node:path";

import { toCsv } from "../../lib/data/csv";
import {
  CSV_COLUMNS,
  QUESTIONS,
  type QuestionField,
} from "../../lib/data/schema";

const ROW_COUNT = 40;
const SEED = 0x20260829; // borrel date, for a memorable deterministic seed.

/** mulberry32 — small, fast, deterministic PRNG. */
function makeRng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = makeRng(SEED);

const pick = <T>(items: readonly T[]): T =>
  items[Math.floor(rng() * items.length)];

const int = (min: number, max: number): number =>
  min + Math.floor(rng() * (max - min + 1));

// --- Free-text pools for the showcase (open) questions ----------------------

const FIRST_NAMES = [
  "Biko", "Jolie", "Iris", "Cait", "Emma", "Sanne", "Daan", "Bram", "Lieke",
  "Tijn", "Fenna", "Sven", "Nora", "Joost", "Maud", "Ravi", "Isa", "Teun",
  "Roos", "Mees", "Julia", "Lars", "Noor", "Gijs", "Fleur", "Stijn", "Anouk",
  "Wies", "Boaz", "Sam", "Puck", "Loes", "Koen", "Marit", "Ruben", "Femke",
  "Bas", "Hanna", "Thijs", "Elin",
];

const KOMPAAN_IF = [
  "…je op elke groepsfoto de rest overschaduwt.",
  "…je hoofd de rooktmelder activeert.",
  "…je bij IKEA de bovenste plank pakt voor vreemden.",
  "…je broek altijd een enkelbroek wordt.",
  "…je een borrel meet in shotjes, niet in uren.",
  "…je 'even bukken' als begroeting ziet.",
  "…je op festivals het levende ontmoetingspunt bent.",
  "…je nog rekt terwijl de deur al te laag is.",
];

const HEIGHT_REMARK = [
  "Hoe is het weer daarboven?",
  "Speel je basketbal?",
  "Wow, wat ben jij lang!",
  "Pas je wel in een normaal bed?",
  "Kun je dat even voor me pakken?",
  "Je bent vast nooit een sneeuwpop kwijt.",
  "Stoot je je hoofd niet constant?",
  "Groei je nog steeds?",
];

const OPEN_POOLS: Record<string, readonly string[]> = {
  kompaanIfSentence: KOMPAAN_IF,
  heightRemark: HEIGHT_REMARK,
};

// --- Row generation ---------------------------------------------------------

function cellFor(field: QuestionField): string {
  switch (field.type) {
    case "open":
      if (field.key === "name") return pick(FIRST_NAMES);
      return pick(OPEN_POOLS[field.key] ?? ["—"]);
    case "number": {
      // Tall-crowd flavoured ranges kept well inside the schema bounds.
      if (field.key === "age") return String(int(19, 68));
      if (field.key === "heightCm") return String(int(178, 208));
      if (field.key === "borrelCount") return String(int(1, 60));
      return String(int(field.min, field.max));
    }
    case "single":
      return pick(field.options);
  }
}

function main(): void {
  const header = [...CSV_COLUMNS];
  const rows: string[][] = [header];

  for (let i = 0; i < ROW_COUNT; i += 1) {
    rows.push(QUESTIONS.map((field) => cellFor(field)));
  }

  const outPath = path.join(process.cwd(), "data", "responses.csv");
  writeFileSync(outPath, toCsv(rows), "utf8");
  console.log(`Wrote ${ROW_COUNT} mock responses to ${outPath}`);
}

main();
