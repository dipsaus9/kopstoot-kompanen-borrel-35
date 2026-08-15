---
id: BORREL-4.9
title: Restyle the superlatives view to the new theme
status: Done
assignee: []
created_date: '2026-08-15 07:51'
updated_date: '2026-08-15 10:22'
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
- [x] #1 /superlatieven (app/superlatieven/page.tsx + components/superlatives/) is restyled to the graffiti/anime look, consistent with the other surfaces
- [x] #2 Mobile-first; A11Y
- [x] #3 bun run lint, typecheck and build pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Restyled /superlatieven to the graffiti/anime theme, consistent with the rebranded surfaces. superlatives.tsx: giraffe-spots+sticker hero. leaderboard-tile.tsx: die-cut sticker cards with hue-decorated (aria-hidden) emoji badges, ink-outline ranked rows, and AA-safe neutral bg-secondary rank discs (no text on the light/dark-varying accent). quote-strip.tsx: sticker showcase cards. Styling only — leaderboards.ts data/logic unchanged. Semantic h1/article/figure headings, 44px+ tap targets preserved. lint/typecheck/build green; story-reviewer: pass, no findings.
<!-- SECTION:NOTES:END -->
