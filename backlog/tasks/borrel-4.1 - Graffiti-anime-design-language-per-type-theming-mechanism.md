---
id: BORREL-4.1
title: Graffiti/anime design language + per-type theming mechanism
status: To Do
assignee: []
created_date: '2026-08-15 07:49'
labels:
  - story
dependencies: []
references:
  - app/theme/tokens.css
  - app/globals.css
  - app/theme/design-system-preview.tsx
  - docs/design-system.md
parent_task_id: BORREL-4
type: feature
ordinal: 24000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Retheme the design tokens and globals into a loud graffiti/anime look and add a per-type theming contract so a type's palette can recolor base components. This is the shared foundation every other rebrand story builds on.
Type: deliverable
Branch: BORREL-4.1/anime-design-foundation
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 app/theme/tokens.css + app/globals.css deliver a graffiti/anime look: bold palette, display/graffiti type scale, thick outlines, cel-shade gradients, sticker/tag + speed-line motifs (CSS/SVG)
- [ ] #2 A per-type theming contract exists: setting a type theme (data-attribute or wrapper class) recolors base components (e.g. button accent) via CSS custom properties, without hardcoding a specific type
- [ ] #3 Mobile-first baseline: responsive scales and touch-sized targets
- [ ] #4 A11Y: text/background contrast meets WCAG AA, focus states are visible, prefers-reduced-motion is respected
- [ ] #5 docs/design-system.md documents the new look and the per-type theming contract
- [ ] #6 bun run lint, typecheck and build pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Keep the shadcn semantic layering. Do NOT define per-type color DATA here (that is BORREL-4.2) — only the mechanism/contract. Verify: bun run lint && bun run typecheck && bun run build.
<!-- SECTION:NOTES:END -->
