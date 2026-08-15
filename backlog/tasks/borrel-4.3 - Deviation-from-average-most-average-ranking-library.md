---
id: BORREL-4.3
title: Deviation-from-average + most-average ranking library
status: Done
assignee: []
created_date: '2026-08-15 07:49'
updated_date: '2026-08-15 09:42'
labels:
  - story
dependencies: []
references:
  - lib/aggregate/
  - test/deviation.test.ts
parent_task_id: BORREL-4
type: feature
ordinal: 26000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add build-time functions that express how far each person is from the average Kompaan and who is the most average of all, so the person views and the /gemiddelde reveal can show meaningful deviation and a ranking.
Type: deliverable
Branch: BORREL-4.3/deviation-library
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 lib/aggregate exposes a per-person deviation score (100 - match%) plus the traits where the person differs most from the average Kompaan
- [x] #2 lib/aggregate exposes a most-average ranking: people sorted by highest match / lowest deviation, including the single most-average person
- [x] #3 Functions are pure/build-time over getResponses()/getAggregate(), deterministic
- [x] #4 Unit tests cover deviation and the ranking
- [x] #5 bun run lint, typecheck and test pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Delivered: lib/aggregate/deviation.ts adds computeDeviation/deviationAgainst (score = 100 - match%, divergent traits = unshared modal answers ordered by modal share desc) and getAverageRanking/rankByAverage (people sorted match desc / deviation asc, index tie-break, exposes mostAverage). Exported via lib/aggregate/index.ts, reuses matchAgainst/getAggregate, pure over getResponses()/getAggregate(). test/deviation.test.ts covers deviation + ranking. lint, typecheck, 36 tests green. Independent story-reviewer: PASS, no findings.
<!-- SECTION:NOTES:END -->
