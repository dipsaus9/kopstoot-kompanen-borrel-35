---
id: BORREL-3.5
title: Build the Find-yourself lookup view
status: To Do
assignee: []
created_date: '2026-08-14 21:02'
updated_date: '2026-08-14 21:02'
labels:
  - story
dependencies:
  - BORREL-3.1
  - BORREL-3.2
  - BORREL-2.3
  - BORREL-2.6
references:
  - app/vind-jezelf/
  - components/find-yourself/
  - test/find-yourself.test.ts
parent_task_id: BORREL-3
type: feature
ordinal: 20000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The personal view: a visitor picks their name from the committed responses and gets their own card — their answers, their "% gemiddelde Kompaan" score with a matched-trait readout, and their archetype badge deep-linking into the gallery. The self-comparison hook — about belonging to the group, deliberately NOT matchmaking. Real names are shown openly (locked decision).

Type: deliverable
Branch: BORREL-3.5/find-yourself-lookup
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 A visitor can select their name from the committed responses at /vind-jezelf
- [ ] #2 The card shows that person's own answers
- [ ] #3 The card shows their "% gemiddelde Kompaan" score and matched-trait readout from the aggregation library
- [ ] #4 The card shows their archetype badge deep-linking to that archetype in the gallery
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. List names (identity field) from getResponses(). 2. On selection, render the person's answers. 3. Call computeMatch + resolveArchetype from lib/aggregate for score + archetype. 4. Build components/find-yourself/ card with the archetype badge linking to /typetjes#<slug>.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Depends on BORREL-3.1 (match/archetype fns), BORREL-3.2 (shell/nav), BORREL-2.3 (tokens), BORREL-2.6 (named archetypes). Real names shown openly. Not matchmaking — no person-to-person matching. Server component / build-time data; mock data until the real CSV. Verify: bun run lint, bun run typecheck, bun run test.
<!-- SECTION:NOTES:END -->
