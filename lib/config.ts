/**
 * Site-wide configuration: the single source of truth for external URLs.
 *
 * Keep the loader, the meta tags and the survey call-to-action pointing here
 * instead of at scattered string literals.
 */

/** The live Google Form the survey call-to-action links to. */
export const SURVEY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeQGd8Si8eW3M7GYQAOUiEP4VoYmEFTxk9L4PLzPXDquMuRCg/viewform" as const;

/** The published CSV export of the responses sheet, read at build time. */
export const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1YYezJMAoCWaM_YQ8wbvhXLTvHnbvHu36D0PYoCGkEdU/export?format=csv&gid=890280148" as const;

/**
 * The production base URL, used for absolute links in meta tags.
 *
 * Derived from Vercel's `VERCEL_PROJECT_PRODUCTION_URL` (a bare host such as
 * `my-app.vercel.app`, so we prepend `https://`), falling back to the local dev
 * server when the env var is absent.
 */
export const SITE_URL: string = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";
