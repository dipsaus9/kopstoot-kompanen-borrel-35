/**
 * Minimal RFC 4180 CSV reader/writer (no runtime dependency).
 *
 * Handles quoted fields, embedded commas, embedded newlines and escaped double
 * quotes (`""`) — all of which occur in the Borrel 35 option text (e.g.
 * `Maakt niet uit, ik lijd toch` and `Het "ik-kom-eraan"-liegbeest`).
 */

/** Parse CSV text into an array of rows, each row an array of string cells. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;
  // Normalise CRLF/CR to LF so newline handling stays simple.
  const src = text.replace(/\r\n?/g, "\n");

  const endField = () => {
    row.push(field);
    field = "";
  };
  const endRow = () => {
    endField();
    rows.push(row);
    row = [];
  };

  while (i < src.length) {
    const char = src[i];

    if (inQuotes) {
      if (char === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      field += char;
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }
    if (char === ",") {
      endField();
      i += 1;
      continue;
    }
    if (char === "\n") {
      endRow();
      i += 1;
      continue;
    }
    field += char;
    i += 1;
  }

  // Flush the trailing field/row unless the input ended on a bare newline.
  if (field.length > 0 || row.length > 0) {
    endRow();
  }

  return rows;
}

/** Quote a single cell only when it contains a comma, quote or newline. */
export function escapeCsvCell(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

/** Serialise rows back into RFC 4180 CSV text (LF line endings, trailing LF). */
export function toCsv(rows: readonly (readonly string[])[]): string {
  return rows.map((row) => row.map(escapeCsvCell).join(",")).join("\n") + "\n";
}
