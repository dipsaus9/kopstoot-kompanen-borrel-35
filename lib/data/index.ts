/**
 * Public data access for the Borrel 35 survey dataset.
 *
 * `getResponses()` is the typed accessor app code consumes. It reads the live
 * Google-Form CSV export at request time with Next ISR (5-minute revalidation),
 * maps and validates it onto the schema, and memoises the parsed result for the
 * current request only (never across requests). If the
 * live fetch fails or yields no valid rows, it falls back to the committed mock
 * `data/responses.csv` so the build/render never fails. The read happens on the
 * server (fetch / `node:fs`), so callers must be server components / build-time
 * code — never the browser.
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";

import { loadLiveResponses } from "./live";
import { parseResponses } from "./parse";
import type { SurveyResponse } from "./schema";

export type { SurveyResponse, SurveyResponseKey } from "./schema";
export { QUESTIONS, CSV_COLUMNS } from "./schema";
export { SurveyDataError } from "./parse";

const CSV_PATH = path.join(process.cwd(), "data", "responses.csv");

/**
 * Per-request memo slot. `cache()` returns the SAME object for every call within
 * one server render and a FRESH one on the next request, so the parsed dataset
 * is deduped inside a render but never pins across requests. A module-level
 * singleton would survive on a warm Vercel lambda and pin the very first load
 * forever — defeating the fetch's ISR revalidation (see BORREL-5.2 staleness).
 */
const requestSlot = cache(
  (): { value: readonly SurveyResponse[] | null } => ({ value: null }),
);

/**
 * Under the unit-test runner there is no React render scope, so `cache()` never
 * dedupes and every `requestSlot()` returns a fresh empty object. Back it with a
 * process-level slot in tests only (the dataset is the deterministic mock there
 * anyway). In prod/dev the request scope is real, so this stays unused and the
 * strict "await getResponses() first" guard remains in force.
 */
const isTest = process.env.VITEST === "true" || process.env.NODE_ENV === "test";
const testSlot: { value: readonly SurveyResponse[] | null } = { value: null };
function slotFor(): { value: readonly SurveyResponse[] | null } {
  return isTest ? testSlot : requestSlot();
}

/** Read and validate the committed mock CSV (the always-available fallback). */
function readMock(): SurveyResponse[] {
  return parseResponses(readFileSync(CSV_PATH, "utf8"));
}

/**
 * Load, validate and return every survey response. The live sheet is fetched
 * with ISR (5-minute revalidation) and memoised for the current request only;
 * on any live failure the committed mock is used instead.
 */
export async function getResponses(): Promise<readonly SurveyResponse[]> {
  const slot = slotFor();
  if (slot.value === null) {
    const live = await loadLiveResponses();
    slot.value = Object.freeze(live && live.length > 0 ? live : readMock());
  }
  return slot.value;
}

/**
 * The already-loaded dataset, synchronously. Throws if {@link getResponses} has
 * not resolved yet — for positional consumers (archetype resolution) that only
 * run after a server component has awaited `getResponses()`.
 */
export function getLoadedResponses(): readonly SurveyResponse[] {
  const { value } = slotFor();
  if (value === null) {
    throw new Error(
      "getLoadedResponses(): await getResponses() before reading the cache.",
    );
  }
  return value;
}

/** Total number of responses in the dataset. */
export async function getResponseCount(): Promise<number> {
  return (await getResponses()).length;
}
