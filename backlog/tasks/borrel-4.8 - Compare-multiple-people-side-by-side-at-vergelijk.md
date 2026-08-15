---
id: BORREL-4.8
title: Compare multiple people side by side at /vergelijk
status: To Do
assignee: []
created_date: '2026-08-15 07:51'
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
- [ ] #1 /vergelijk (app/vergelijk/) lets the visitor multi-select several kompanen
- [ ] #2 Selected people are shown side by side: type, deviation-from-average and answers
- [ ] #3 Mobile-first: usable on a narrow screen (horizontal scroll or stacked); A11Y
- [ ] #4 Build-time data, deterministic
- [ ] #5 bun run lint, typecheck and build pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Reuse deviation/match from BORREL-4.3. Client-side selection is fine but embed the dataset at build time (no runtime fetch). Verify: bun run lint && bun run typecheck && bun run build.
<!-- SECTION:NOTES:END -->
