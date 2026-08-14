---
id: BORREL-3.5
title: Build the Find-yourself lookup view
status: Done
assignee: []
created_date: '2026-08-14 21:02'
updated_date: '2026-08-14 21:40'
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
- [x] #1 A visitor can select their name from the committed responses at /vind-jezelf
- [x] #2 The card shows that person's own answers
- [x] #3 The card shows their "% gemiddelde Kompaan" score and matched-trait readout from the aggregation library
- [x] #4 The card shows their archetype badge deep-linking to that archetype in the gallery
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. List names (identity field) from getResponses(). 2. On selection, render the person's answers. 3. Call computeMatch + resolveArchetype from lib/aggregate for score + archetype. 4. Build components/find-yourself/ card with the archetype badge linking to /typetjes#<slug>.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Delivered on shared branch BORREL-3/launch-build. /vind-jezelf is a server component (app/vind-jezelf/page.tsx) that precomputes every respondent via getFindYourselfPeople() over getResponses()/getAggregate() at build time and embeds the dataset into a thin client selector (components/find-yourself/find-yourself.tsx) — no runtime fetch/DB (static explorer); the route prerenders as static content. PersonCard shows the person's own stats/answers/quotes, their % gemiddelde Kompaan score + matched-trait readout (matchAgainst, BORREL-3.1), and their archetype badge as a next/link to /typetjes#<id> (resolveArchetype, BORREL-3.1 + gallery BORREL-3.4). Real names shown openly; rows keyed by positional id so duplicate names never collide. No archetype.image referenced. Green: lint, typecheck, test (18 pass incl. 5 new), build. Reviewer verdict: pass.
<!-- SECTION:NOTES:END -->
