---
id: BORREL-4.3
title: Deviation-from-average + most-average ranking library
status: To Do
assignee: []
created_date: '2026-08-15 07:49'
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
- [ ] #1 lib/aggregate exposes a per-person deviation score (100 - match%) plus the traits where the person differs most from the average Kompaan
- [ ] #2 lib/aggregate exposes a most-average ranking: people sorted by highest match / lowest deviation, including the single most-average person
- [ ] #3 Functions are pure/build-time over getResponses()/getAggregate(), deterministic
- [ ] #4 Unit tests cover deviation and the ranking
- [ ] #5 bun run lint, typecheck and test pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Reuse computeMatch/getAggregate from the existing lib/aggregate. Verify: bun run lint && bun run typecheck && bun run test.
<!-- SECTION:NOTES:END -->
