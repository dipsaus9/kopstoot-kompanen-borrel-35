---
id: BORREL-3.3
title: Build the Average Kompaan profile landing view
status: To Do
assignee: []
created_date: '2026-08-14 21:01'
updated_date: '2026-08-14 21:01'
labels:
  - story
dependencies:
  - BORREL-3.1
  - BORREL-3.2
  - BORREL-2.3
references:
  - app/page.tsx
  - components/profile/
parent_task_id: BORREL-3
type: feature
ordinal: 18000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The landing view: one composite "Jan Kompaan Modaal" card that renders the Average aggregate as playful giraffe-themed tiles — headline numeric stats (age, height, borrel count) plus a curated set of the most-picked fun answers. Visual and playful, never "38% picked this". This is the home route and the reference profile the find-yourself view compares against.

Type: deliverable
Branch: BORREL-3.3/average-kompaan-profile
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 The home route (app/page.tsx) renders the Average Kompaan aggregate from the aggregation library
- [ ] #2 Numeric stats (age, height, borrel count) and the modal closed answers are shown as giraffe-themed tiles
- [ ] #3 Presentation is visual/playful — no raw percentage breakdowns
- [ ] #4 The view is a server component reading data at build time (no runtime fetch)
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Call getAggregate() from lib/aggregate. 2. Build components/profile/ tiles for numeric stats + curated fun answers. 3. Compose the landing page in app/page.tsx using design-system tokens.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Depends on BORREL-3.1 (aggregate), BORREL-3.2 (shell/nav) and BORREL-2.3 (design tokens). Server component, build-time data via getResponses(); mock data until the real CSV. Verify: bun run lint, bun run typecheck, bun run test.
<!-- SECTION:NOTES:END -->
