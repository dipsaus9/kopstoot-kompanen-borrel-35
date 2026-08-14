/**
 * Public data access for the Borrel 35 survey dataset.
 *
 * `getResponses()` is the typed accessor app code consumes. It reads
 * `data/responses.csv` from disk once at build/server time (no runtime DB),
 * validates it through the schema, and memoises the parsed result. Because the
 * read happens through `node:fs`, callers must be server components / build-time
 * code — never the browser.
 */

import { readFileSync } from "node:fs";
import path from "node:path";

import { parseResponses } from "./parse";
import type { SurveyResponse } from "./schema";

export type { SurveyResponse, SurveyResponseKey } from "./schema";
export { QUESTIONS, CSV_COLUMNS } from "./schema";
export { SurveyDataError } from "./parse";

const CSV_PATH = path.join(process.cwd(), "data", "responses.csv");

let cache: readonly SurveyResponse[] | null = null;

/**
 * Load, validate and return every survey response. The dataset is read and
 * parsed once, then served from an in-memory cache for the rest of the process.
 */
export function getResponses(): readonly SurveyResponse[] {
  if (cache === null) {
    const csv = readFileSync(CSV_PATH, "utf8");
    cache = Object.freeze(parseResponses(csv));
  }
  return cache;
}

/** Total number of responses in the dataset. */
export function getResponseCount(): number {
  return getResponses().length;
}
