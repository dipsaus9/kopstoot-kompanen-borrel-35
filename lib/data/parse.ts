/**
 * Build-time parser: CSV text → validated, typed `SurveyResponse[]`.
 *
 * Validation is strict and fail-fast: a malformed header, an unknown closed
 * option, a non-numeric stat or an empty required cell throws with the exact
 * row/column so a bad dataset can never reach app code silently.
 */

import { parseCsv } from "./csv";
import {
  CSV_COLUMNS,
  QUESTIONS,
  type QuestionField,
  type SurveyResponse,
} from "./schema";

export class SurveyDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SurveyDataError";
  }
}

export function validateCell(
  field: QuestionField,
  raw: string,
  rowNumber: number,
): string | number {
  const value = raw.trim();
  const where = `row ${rowNumber}, column "${field.key}" (Q${field.number})`;

  if (value === "") {
    throw new SurveyDataError(`Empty value at ${where}; every question is required.`);
  }

  switch (field.type) {
    case "open":
      return value;
    case "number": {
      const num = Number(value);
      if (!Number.isFinite(num)) {
        throw new SurveyDataError(`Non-numeric value "${raw}" at ${where}.`);
      }
      if (num < field.min || num > field.max) {
        throw new SurveyDataError(
          `Value ${num} out of range [${field.min}, ${field.max}] at ${where}.`,
        );
      }
      return num;
    }
    case "single": {
      if (!field.options.includes(value)) {
        throw new SurveyDataError(`Unknown option "${raw}" at ${where}.`);
      }
      return value;
    }
  }
}

/**
 * Parse and validate a Borrel 35 responses CSV. The header row must list the
 * schema columns in Q1..Q28 order; every data row must satisfy the schema.
 */
export function parseResponses(csvText: string): SurveyResponse[] {
  const rows = parseCsv(csvText);
  if (rows.length === 0) {
    throw new SurveyDataError("CSV is empty; expected a header row.");
  }

  const [header, ...dataRows] = rows;
  if (header.length !== CSV_COLUMNS.length) {
    throw new SurveyDataError(
      `Header has ${header.length} columns; expected ${CSV_COLUMNS.length}.`,
    );
  }
  header.forEach((col, index) => {
    if (col.trim() !== CSV_COLUMNS[index]) {
      throw new SurveyDataError(
        `Header column ${index + 1} is "${col}"; expected "${CSV_COLUMNS[index]}".`,
      );
    }
  });

  return dataRows.map((cells, index) => {
    const rowNumber = index + 2; // 1-based, +1 for the header row.
    if (cells.length !== CSV_COLUMNS.length) {
      throw new SurveyDataError(
        `Row ${rowNumber} has ${cells.length} columns; expected ${CSV_COLUMNS.length}.`,
      );
    }

    // Build the record field-by-field from the registry, then assert the shape.
    const record: Record<string, string | number> = {};
    QUESTIONS.forEach((field, columnIndex) => {
      record[field.key] = validateCell(field, cells[columnIndex], rowNumber);
    });
    return record as unknown as SurveyResponse;
  });
}
