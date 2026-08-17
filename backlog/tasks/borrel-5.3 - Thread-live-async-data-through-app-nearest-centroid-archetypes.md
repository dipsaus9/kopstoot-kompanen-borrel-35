---
id: BORREL-5.3
title: Thread live async data through app + nearest-centroid archetypes
status: Done
assignee: []
created_date: '2026-08-17 07:36'
updated_date: '2026-08-17 08:27'
labels:
  - story
dependencies:
  - BORREL-5.2
references:
  - lib/aggregate/
  - components/find-yourself/people.ts
  - components/compare/people.ts
  - components/superlatives/leaderboards.ts
  - components/archetypes/members.ts
  - app/page.tsx
  - app/gemiddelde/
  - app/typetjes/
  - app/vergelijk/
  - app/toppers/
  - scripts/archetypes/
  - test/aggregate.test.ts
parent_task_id: BORREL-5
type: feature
ordinal: 36000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Adapt the whole data-consuming layer to the now-async live loader so every view reflects the real answers (a new gemiddelde Kompaan), and make archetype resolution robust to respondents that were never in the baked clustering by assigning each to the nearest of the six fixed type centroids.
Type: deliverable
Branch: BORREL-5.3/live-data-wiring
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Every data builder and page awaits the async loader; /gemiddelde, /vind-jezelf (/), /typetjes, /vergelijk and /toppers all render from the live answers
- [x] #2 resolveArchetype assigns any response to the nearest of the six fixed cluster centroids (encoded feature-space distance), instead of a baked positional lookup; the six named typetjes + their character art stay fixed
- [x] #3 scripts/archetypes emits the cluster centroids into archetypes.json for the nearest-centroid assignment
- [x] #4 bun run lint, typecheck, test and build pass; the live pages prerender/stream without runtime errors
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
getResponses/getAggregate become async — thread await through the per-view builders and the pages. Overlaps BORREL-5.1 on app/page.tsx with NO dependency edge (intentional): the collision is resolved at PR-open by merging the latest base and resolving conflicts, not by a dep. Heaviest story in the epic. Verify: bun run lint && bun run typecheck && bun run test && bun run build.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Nearest-centroid archetype resolution: live respondents are assigned to the nearest of the six fixed type centroids (emitted into archetypes.json), removing the mock-row-aligned staleness throw. Async live data flows through all builders + pages (new gemiddelde Kompaan from real answers). Verify green: lint, typecheck, test (44), build (17 pages, no archetype throw on live data). Reviewer: pass.
<!-- SECTION:FINAL_SUMMARY:END -->
