---
id: BORREL-2.2
title: 'Define response schema, mock CSV and build-time parser'
status: To Do
assignee: []
created_date: '2026-08-14 14:08'
labels:
  - needs-info
dependencies:
  - BORREL-2.1
  - BORREL-1.4
references:
  - data/
  - lib/data/
  - scripts/mock/
  - package.json
  - bun.lock
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
- [ ] #1 A typed schema/model covers every finalized question (closed + open), matching docs/survey-final-questions.md
- [ ] #2 data/responses.csv contains a plausible mock dataset (>= 30 rows) conforming to the schema
- [ ] #3 A build-time loader parses the CSV into validated, typed records
- [ ] #4 The loader exposes a typed accessor consumable by app code
- [ ] #5 bun run lint and bun run typecheck pass
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Encode the finalized questions as a field schema (types, options). 2. Write a seeded mock generator under scripts/mock producing data/responses.csv. 3. Build lib/data parser/loader with runtime validation. 4. Export a typed accessor.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
needs-info: real Google Form responses not final; schema mirrors the finalized questions and must be revisited when the real CSV arrives. Parsing stays at build time — no runtime DB. Dep on BORREL-1.4 is a serialization edge (shared package.json/bun.lock/lib with the boilerplate installers), not a functional need for Vitest. bun.lock listed per repo rule. Verify: bun run lint && bun run typecheck.
<!-- SECTION:NOTES:END -->
