---
id: BORREL-4.9
title: Restyle the superlatives view to the new theme
status: To Do
assignee: []
created_date: '2026-08-15 07:51'
labels:
  - story
dependencies:
  - BORREL-4.1
  - BORREL-4.4
references:
  - app/superlatieven/page.tsx
  - components/superlatives/
parent_task_id: BORREL-4
type: feature
ordinal: 32000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Bring the superlatives/leaderboards page into the new graffiti/anime look so it is consistent with the rest of the rebranded site.
Type: deliverable
Branch: BORREL-4.9/superlatives-restyle
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 /superlatieven (app/superlatieven/page.tsx + components/superlatives/) is restyled to the graffiti/anime look, consistent with the other surfaces
- [ ] #2 Mobile-first; A11Y
- [ ] #3 bun run lint, typecheck and build pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Styling only; the leaderboard data/logic stays unchanged. Verify: bun run lint && bun run typecheck && bun run build.
<!-- SECTION:NOTES:END -->
