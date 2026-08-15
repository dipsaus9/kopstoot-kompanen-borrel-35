---
id: BORREL-4.7
title: 'Find-your-type landing, lookup & most-average reveal'
status: To Do
assignee: []
created_date: '2026-08-15 07:51'
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
- [ ] #1 / (app/page.tsx) is fully a find-your-type flow: a prominent name search that funnels the visitor to their own type page
- [ ] #2 /vind-jezelf is restyled (find yourself and others) and shows, per person, their type and a deviation-from-average readout (score + top differences, from BORREL-4.3)
- [ ] #3 The average-Kompaan profile moves to /gemiddelde (app/gemiddelde/) in the new look
- [ ] #4 /gemiddelde reveals the most-average Kompaan (highest match, from BORREL-4.3) plus a short closest-to-average ranking
- [ ] #5 Mobile-first; A11Y
- [ ] #6 bun run lint, typecheck and build pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Build-time data only (static explorer). Reuse computeMatch + deviation + most-average ranking from BORREL-4.3. Funnel target = /typetjes/<archetype-id>. Verify: bun run lint && bun run typecheck && bun run build.
<!-- SECTION:NOTES:END -->
