/**
 * Shared shapes and row configuration for the compare view (BORREL-4.8).
 *
 * Deliberately runtime-dependency-free: it imports only *types* from the data
 * and aggregate layers (erased at build), so the client selector
 * (`compare-view.tsx`) can consume {@link COMPARE_ROWS} and these interfaces
 * without dragging the build-time `node:fs` data loader into the browser bundle.
 * The build-time dataset builder lives in `./people.ts`.
 */

import type { DivergentTrait } from "@/lib/aggregate";
import type { SurveyResponseKey } from "@/lib/data";

/** One question shown as a comparison row (shared across all people). */
export interface CompareRow {
  /** The response property / question key. */
  readonly key: SurveyResponseKey;
  /** Emoji badge echoing the question's theme. */
  readonly emoji: string;
  /** Short caption naming the question. */
  readonly label: string;
  /** Whether the answer is a numeric stat (rendered with a trailing unit). */
  readonly numeric: boolean;
  /** Trailing unit for numeric rows (e.g. "jaar", "cm"). */
  readonly unit?: string;
}

/** One person's answer to a single {@link CompareRow}, aligned by position. */
export interface CompareCell {
  /** The row / question key this cell answers. */
  readonly key: SurveyResponseKey;
  /** The person's verbatim (or rounded, for numeric) answer. */
  readonly value: string;
  /**
   * Whether this closed answer matches the Average Kompaan's modal choice.
   * Always `false` for numeric rows (a mean has no single option to share).
   */
  readonly isAverage: boolean;
}

/** This person's resolved archetype, ready to render as a linked badge. */
export interface CompareArchetype {
  /** Archetype slug (the per-type page route id). */
  readonly id: string;
  /** Playful display name. */
  readonly name: string;
  /** Badge emoji echoing the archetype's character. */
  readonly emoji: string;
  /** CSS custom-property name of the mapped brand hue (from tokens.css). */
  readonly hueVar: string;
  /** Link into the archetype's own per-type page (`/typetjes/<id>`). */
  readonly href: string;
}

/** How far one person sits from the Average Kompaan (BORREL-4.3), summarised. */
export interface CompareDeviation {
  /** Deviation score: `100 - match%`, an integer 0–100. */
  readonly score: number;
  /** "% gemiddelde Kompaan" match, an integer 0–100. */
  readonly match: number;
  /** Number of tracked questions on which the person diverges. */
  readonly divergentCount: number;
  /** Number of tracked questions considered. */
  readonly total: number;
  /** The traits where they diverge most, most-different first (curated top N). */
  readonly keyDivergences: readonly DivergentTrait[];
}

/** One respondent, fully precomputed for the compare table. */
export interface ComparePerson {
  /** Stable positional id (`p<index>`), unique even for duplicate names. */
  readonly id: string;
  /** The respondent's name, verbatim (real names shown openly). */
  readonly name: string;
  /** The resolved archetype badge, linked to its per-type page. */
  readonly archetype: CompareArchetype;
  /** Their distance from the Average Kompaan (score + key divergences). */
  readonly deviation: CompareDeviation;
  /** Their answers, in {@link COMPARE_ROWS} order so columns line up per row. */
  readonly cells: readonly CompareCell[];
}

/**
 * The questions compared, in row order: the three headline numeric stats first,
 * then a curated spread of closed answers (borrel character, then the quick
 * either/or picks) so two people's profiles read side by side at a glance.
 */
export const COMPARE_ROWS: readonly CompareRow[] = [
  { key: "age", emoji: "🎂", label: "Leeftijd", numeric: true, unit: "jaar" },
  { key: "heightCm", emoji: "🦒", label: "Lengte", numeric: true, unit: "cm" },
  { key: "borrelCount", emoji: "🍻", label: "Borrels op de teller", numeric: true, unit: "borrels" },
  { key: "borrelRole", emoji: "🎉", label: "Op een borrel meestal", numeric: false },
  { key: "drink", emoji: "🍷", label: "Vaste borrel-drankje", numeric: false },
  { key: "idealBorrel", emoji: "✨", label: "Ideale borrel", numeric: false },
  { key: "borrelEnding", emoji: "🌙", label: "Zo eindigt de borrel", numeric: false },
  { key: "borrelArrival", emoji: "⏰", label: "Hoe laat op een borrel", numeric: false },
  { key: "tallStruggle", emoji: "📏", label: "Grootste lange-mensen-struggle", numeric: false },
  { key: "borrelSuperpower", emoji: "⚡", label: "Gekozen borrel-superkracht", numeric: false },
  { key: "planSpontaneous", emoji: "🗓️", label: "Plannen of spontaan", numeric: false },
  { key: "cityNature", emoji: "🌳", label: "Kies je habitat", numeric: false },
  { key: "festivalTerrace", emoji: "🎪", label: "Festival of terras", numeric: false },
  { key: "earlyBedLate", emoji: "😴", label: "'Rustig aan' betekent", numeric: false },
];
