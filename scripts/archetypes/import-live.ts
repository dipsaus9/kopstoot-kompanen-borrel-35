/**
 * One-off: refresh the committed `data/responses.csv` from the live Google-Form
 * sheet so the build-time clustering (`cluster.ts`) is derived from the REAL
 * answers instead of the uniform-random mock.
 *
 * Fetches {@link SHEET_CSV_URL}, maps the Dutch form columns onto the typed
 * schema with the same pure {@link parseLiveResponses} the runtime loader uses,
 * then serialises the validated rows back out in canonical `CSV_COLUMNS` order.
 *
 * Run:  bun run scripts/archetypes/import-live.ts
 * Then: bun run archetypes   (re-derive the six centroids from this data)
 */

import { writeFileSync } from "node:fs";
import path from "node:path";

import { SHEET_CSV_URL } from "../../lib/config";
import { toCsv } from "../../lib/data/csv";
import { parseLiveResponses } from "../../lib/data/live";
import { CSV_COLUMNS } from "../../lib/data/schema";

async function main(): Promise<void> {
  const response = await fetch(SHEET_CSV_URL);
  if (!response.ok) {
    throw new Error(`live sheet returned HTTP ${response.status}`);
  }

  const rows = parseLiveResponses(await response.text());
  if (rows.length === 0) {
    throw new Error("live sheet yielded 0 valid rows — refusing to overwrite.");
  }

  const header = [...CSV_COLUMNS];
  const body = rows.map((row) => CSV_COLUMNS.map((key) => String(row[key])));
  const csv = toCsv([header, ...body]);

  const target = path.join(process.cwd(), "data", "responses.csv");
  writeFileSync(target, csv, "utf8");
  console.log(`Wrote ${rows.length} live responses to data/responses.csv`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
