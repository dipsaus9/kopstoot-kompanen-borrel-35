/**
 * Public data access for the Borrel 35 survey dataset.
 *
 * `getResponses()` is the typed accessor app code consumes. It reads the live
 * Google-Form CSV export at request time with Next ISR (hourly revalidation),
 * maps and validates it onto the schema, and memoises the parsed result. If the
 * live fetch fails or yields no valid rows, it falls back to the committed mock
 * `data/responses.csv` so the build/render never fails. The read happens on the
 * server (fetch / `node:fs`), so callers must be server components / build-time
 * code — never the browser.
 */

import { readFileSync } from "node:fs";
import path from "node:path";

import { loadLiveResponses } from "./live";
import { parseResponses } from "./parse";
import type { SurveyResponse } from "./schema";

export type { SurveyResponse, SurveyResponseKey } from "./schema";
export { QUESTIONS, CSV_COLUMNS } from "./schema";
export { SurveyDataError } from "./parse";

const CSV_PATH = path.join(process.cwd(), "data", "responses.csv");

let cache: readonly SurveyResponse[] | null = null;

/** Read and validate the committed mock CSV (the always-available fallback). */
function readMock(): SurveyResponse[] {
  return parseResponses(readFileSync(CSV_PATH, "utf8"));
}

/**
 * Load, validate and return every survey response. The live sheet is fetched
 * once (with ISR), then served from an in-memory cache for the rest of the
 * request lifecycle; on any live failure the committed mock is used instead.
 */
export async function getResponses(): Promise<readonly SurveyResponse[]> {
  if (cache === null) {
    const live = await loadLiveResponses();
    cache = Object.freeze(live && live.length > 0 ? live : readMock());
  }
  return cache;
}

/**
 * The already-loaded dataset, synchronously. Throws if {@link getResponses} has
 * not resolved yet — for positional consumers (archetype resolution) that only
 * run after a server component has awaited `getResponses()`.
 */
export function getLoadedResponses(): readonly SurveyResponse[] {
  if (cache === null) {
    throw new Error(
      "getLoadedResponses(): await getResponses() before reading the cache.",
    );
  }
  return cache;
}

/** Total number of responses in the dataset. */
export async function getResponseCount(): Promise<number> {
  return (await getResponses()).length;
}
