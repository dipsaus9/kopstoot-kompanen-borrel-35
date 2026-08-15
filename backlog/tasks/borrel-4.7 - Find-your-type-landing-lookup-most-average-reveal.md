---
id: BORREL-4.7
title: 'Find-your-type landing, lookup & most-average reveal'
status: Done
assignee: []
created_date: '2026-08-15 07:51'
updated_date: '2026-08-15 10:09'
labels:
  - story
dependencies:
  - BORREL-4.1
  - BORREL-4.3
  - BORREL-4.4
  - BORREL-4.6
references:
  - app/page.tsx
  - app/vind-jezelf/
  - app/gemiddelde/
  - components/find-yourself/
  - components/profile/
parent_task_id: BORREL-4
type: feature
ordinal: 30000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Make the homepage all about finding your own type fast, restyle the find-yourself lookup to show each person's type and how far they deviate from the average, move the average-Kompaan profile to /gemiddelde, and reveal there who is the most average Kompaan of all.
Type: deliverable
Branch: BORREL-4.7/find-your-type-landing
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 / (app/page.tsx) is fully a find-your-type flow: a prominent name search that funnels the visitor to their own type page
- [x] #2 /vind-jezelf is restyled (find yourself and others) and shows, per person, their type and a deviation-from-average readout (score + top differences, from BORREL-4.3)
- [x] #3 The average-Kompaan profile moves to /gemiddelde (app/gemiddelde/) in the new look
- [x] #4 /gemiddelde reveals the most-average Kompaan (highest match, from BORREL-4.3) plus a short closest-to-average ranking
- [x] #5 Mobile-first; A11Y
- [x] #6 bun run lint, typecheck and build pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Build-time data only (static explorer). Reuse computeMatch + deviation + most-average ranking from BORREL-4.3. Funnel target = /typetjes/<archetype-id>. Verify: bun run lint && bun run typecheck && bun run build.

Delivered (BORREL-4.7): / is now a find-your-type funnel (FindYourType client component in components/find-yourself) — a name search that links each visitor to their own per-type page at /typetjes/<archetype-id> (the real BORREL-4.6 page, not a #anchor). /vind-jezelf restyled to the graffiti/anime look and PersonCard now shows a deviation-from-average readout (score + top divergent traits via deviationAgainst, BORREL-4.3) alongside the % match and a per-type-page archetype link. The average profile moved to the new app/gemiddelde/page.tsx (AverageProfile), where MostAverage reveals the single most-average Kompaan (highest match) plus a top-5 closest-to-average leaderboard via getAverageRanking (BORREL-4.3). Build-time data only, real names, mobile-first, A11Y (labeled search, aria-pressed toggles, min-h-tap, focus-visible, useId ids). lint + typecheck + build all green. Independent review verdict: pass, no scope violations.
<!-- SECTION:NOTES:END -->
