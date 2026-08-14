---
id: BORREL-2.2
title: 'Define response schema, mock CSV and build-time parser'
status: In Progress
assignee: []
created_date: '2026-08-14 14:08'
updated_date: '2026-08-14 19:56'
labels: []
dependencies:
  - BORREL-2.1
references:
  - data/
  - lib/data/
  - scripts/mock/
  - package.json
  - bun.lock
  - >-
    backlog/tasks/borrel-2.2 -
    Define-response-schema-mock-CSV-and-build-time-parser.md
parent_task_id: BORREL-2
type: feature
ordinal: 10000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Define a typed schema for a survey response derived from the finalized question list, a representative mock data/responses.csv, and a build-time loader that parses the CSV into validated typed records, so every data-consuming build epic has real-shaped data to build against before the actual form responses exist.

Type: deliverable
Branch: BORREL-2.2/data-schema-mock-csv
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 A typed schema/model covers every finalized question (closed + open), matching docs/survey-final-questions.md
- [x] #2 data/responses.csv contains a plausible mock dataset (>= 30 rows) conforming to the schema
- [x] #3 A build-time loader parses the CSV into validated, typed records
- [x] #4 The loader exposes a typed accessor consumable by app code
- [x] #5 bun run lint and bun run typecheck pass
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. lib/data/schema.ts: single source of truth — option const tuples + QUESTIONS registry (Q1-Q28 from docs/survey-final-questions.md) + derived SurveyResponse type. 2. lib/data/csv.ts: RFC4180 CSV parse/serialize (quoted fields, embedded commas/quotes). 3. lib/data/parse.ts: parseResponses(csv) with per-field runtime validation, throws on invalid row/column. 4. lib/data/index.ts: getResponses() typed accessor reading data/responses.csv at build time via fs, memoized. 5. scripts/mock/generate.ts: seeded (mulberry32) deterministic mock generator emitting >=30 rows to data/responses.csv. No new deps (hand-rolled parser/validation) to avoid package.json/bun.lock churn during concurrent BORREL-1.4.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
needs-info: real Google Form responses not final; schema mirrors the finalized questions and must be revisited when the real CSV arrives. Parsing stays at build time — no runtime DB. Dep on BORREL-1.4 is a serialization edge (shared package.json/bun.lock/lib with the boilerplate installers), not a functional need for Vitest. bun.lock listed per repo rule. Verify: bun run lint && bun run typecheck.

Implemented with zero new deps (hand-rolled RFC4180 CSV parser + runtime validation) so package.json/bun.lock stay untouched during concurrent BORREL-1.4 lockfile work. Schema (lib/data/schema.ts) is the single source of truth: option const tuples + QUESTIONS registry drive types, parser and generator. data/responses.csv = 40 seeded mock rows (>=30). getResponses() in lib/data/index.ts is the memoised, build-time typed accessor. Verify: bun run lint && bun run typecheck both green.

Review round 1 (dipsaus-ai:story-reviewer): all 5 ACs met=true, zero code findings. Verdict=block solely on a mechanical scope flag for the backlog task file (status/plan/AC bookkeeping) — which is required-on-branch delivery machinery per the git contract (Step 5.3), committed in separate chore(backlog) commits, not product scope. Re-reviewing round 2 with code-only scope framing.
<!-- SECTION:NOTES:END -->
