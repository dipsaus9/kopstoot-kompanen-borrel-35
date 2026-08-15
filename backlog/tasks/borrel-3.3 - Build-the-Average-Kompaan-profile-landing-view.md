---
id: BORREL-3.3
title: Build the Average Kompaan profile landing view
status: Done
assignee: []
created_date: '2026-08-14 21:01'
updated_date: '2026-08-14 21:22'
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
- [x] #1 The home route (app/page.tsx) renders the Average Kompaan aggregate from the aggregation library
- [x] #2 Numeric stats (age, height, borrel count) and the modal closed answers are shown as giraffe-themed tiles
- [x] #3 Presentation is visual/playful — no raw percentage breakdowns
- [x] #4 The view is a server component reading data at build time (no runtime fetch)
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Call getAggregate() from lib/aggregate. 2. Build components/profile/ tiles for numeric stats + curated fun answers. 3. Compose the landing page in app/page.tsx using design-system tokens.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Delivered on shared branch BORREL-3/launch-build. app/page.tsx is now a server component that loads getAggregate() at build time and renders the composite 'Jan Kompaan Modaal' profile via new components/profile/ tiles: ProfileHero (giraffe-spots banner), StatTile x3 (age/lengte/borrels from aggregate.means), and AnswerTile (curated modal answers from aggregate.modes, shown as traits with no percentages). Styled with BORREL-2.3 design tokens; dark-mode via semantic tokens. Verified green: lint, typecheck, test (13 pass), next build (/ prerenders static). story-reviewer verdict: pass, no findings, no scope violations.
<!-- SECTION:NOTES:END -->
