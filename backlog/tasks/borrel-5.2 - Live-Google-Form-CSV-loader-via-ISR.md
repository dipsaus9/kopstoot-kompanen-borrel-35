---
id: BORREL-5.2
title: Live Google-Form CSV loader via ISR
status: Done
assignee: []
created_date: '2026-08-17 07:36'
updated_date: '2026-08-17 08:12'
labels:
  - story
dependencies:
  - BORREL-5.1
references:
  - lib/data/
  - lib/aggregate/
  - components/find-yourself/people.ts
  - components/compare/people.ts
  - components/superlatives/leaderboards.ts
  - app/page.tsx
  - app/toppers/page.tsx
  - app/gemiddelde/page.tsx
  - app/vergelijk/page.tsx
  - scripts/archetypes/cluster.ts
  - test/aggregate.test.ts
  - test/deviation.test.ts
  - test/find-yourself.test.ts
  - test/superlatives.test.ts
  - test/live-loader.test.ts
parent_task_id: BORREL-5
type: feature
ordinal: 35000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Make the data layer read the real answers from the published Google-Sheet CSV export at request time with Next ISR, mapping the form columns onto the typed schema, so the site runs on live data that refreshes without a redeploy — with a safe fallback to the committed mock so builds never break.
Type: deliverable
Branch: BORREL-5.2/live-csv-loader
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 lib/data fetches SHEET_CSV_URL (from lib/config) with Next ISR revalidation (hourly) and parses it into validated, typed SurveyResponse records
- [x] #2 The Google-Form column headers are mapped to the schema keys and the answer texts normalised to the schema option sets; unmappable/blank rows are skipped, not crashed on
- [x] #3 getResponses is async; a fetch or parse failure falls back to the committed mock CSV (data/responses.csv) so the build/render never fails
- [x] #4 bun run lint, typecheck and test pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
The published sheet is public (CSV export returns 200); derive the exact header->key mapping and option normalisation by fetching the live CSV during delivery (headers are the Dutch question texts, e.g. Tijdstempel, 'Hoe heet je?', 'Hoe jong ben je?'). Reuse the existing RFC-4180 csv.ts + schema.ts validation. Verify: bun run lint && bun run typecheck && bun run test.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
getResponses() now fetches the published Google-Form CSV export at request time with Next ISR (revalidate 3600), maps the Dutch form columns onto the typed schema (lib/data/live.ts: header->key mapping, per-option normalisation incl. Dutch-ordinal borrel counts, multi-select first-match, emoji strip), validates each row via the shared validateCell, and skips unmappable/blank rows. Any fetch/parse failure or zero valid rows falls back to the committed mock data/responses.csv so render never fails. All 4 current live responses map cleanly. Making the accessor async rippled mechanically through its direct loader wrappers (lib/aggregate, components/*/people.ts, components/superlatives, app/*/page.tsx, scripts/archetypes/cluster.ts) and pages, which now await it; resolveArchetype stays sync via a warm-cache peek (getLoadedResponses). New test/live-loader.test.ts covers mapping/normalisation/skip/fallback. Verified green: lint, tsc --noEmit, 44 tests. Reviewer (dipsaus-ai:story-reviewer) verdict: pass, no scope violations.
<!-- SECTION:FINAL_SUMMARY:END -->
