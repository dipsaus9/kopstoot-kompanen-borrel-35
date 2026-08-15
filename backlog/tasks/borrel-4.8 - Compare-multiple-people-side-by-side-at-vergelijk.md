---
id: BORREL-4.8
title: Compare multiple people side by side at /vergelijk
status: Done
assignee: []
created_date: '2026-08-15 07:51'
updated_date: '2026-08-15 10:17'
labels:
  - story
dependencies:
  - BORREL-4.1
  - BORREL-4.3
  - BORREL-4.4
references:
  - app/vergelijk/
  - components/compare/
parent_task_id: BORREL-4
type: feature
ordinal: 31000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add a compare view where you pick several kompanen and see their types, deviation from the average and their answers next to each other, working well on a phone.
Type: deliverable
Branch: BORREL-4.8/compare-people
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 /vergelijk (app/vergelijk/) lets the visitor multi-select several kompanen
- [x] #2 Selected people are shown side by side: type, deviation-from-average and answers
- [x] #3 Mobile-first: usable on a narrow screen (horizontal scroll or stacked); A11Y
- [x] #4 Build-time data, deterministic
- [x] #5 bun run lint, typecheck and build pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Delivered /vergelijk: multi-select compare view. app/vergelijk/page.tsx (server) precomputes the dataset via components/compare/getComparePeople() over getResponses()/getAggregate() at build time and passes it to the CompareView client selector (holds no server data). Reuses BORREL-4.3 deviationAgainst for score + key divergences and BORREL-4.6 /typetjes/<id> archetype links. Selected people become columns of one aligned table (question per row), horizontally scrollable in a labelled keyboard-focusable region with a sticky row-header column; per-cell dot marks answers shared with the Average Kompaan and fully-agreed rows are flagged. Shapes + row config live in components/compare/rows.ts (type-only lib imports) so node:fs never enters the client bundle. lint/typecheck/build green; /vergelijk prerenders static. Reviewer verdict: pass (5/5 ACs, no scope violations).
<!-- SECTION:NOTES:END -->
