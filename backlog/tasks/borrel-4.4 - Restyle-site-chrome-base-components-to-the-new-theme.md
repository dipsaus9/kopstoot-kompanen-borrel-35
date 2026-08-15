---
id: BORREL-4.4
title: Restyle site chrome & base components to the new theme
status: To Do
assignee: []
created_date: '2026-08-15 07:50'
labels:
  - story
dependencies:
  - BORREL-4.1
references:
  - app/layout.tsx
  - components/site/
  - components/ui/
parent_task_id: BORREL-4
type: feature
ordinal: 27000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Apply the new graffiti/anime look to the global chrome (root layout, site header/nav) and the base button, with the nav working on mobile and components able to take a per-type accent.
Type: deliverable
Branch: BORREL-4.4/restyle-chrome-components
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 app/layout.tsx and components/site/ (header + nav) are restyled to the graffiti/anime look; the nav works on mobile (touch-friendly / collapsible)
- [ ] #2 The nav links all primary routes: / , /typetjes, /vind-jezelf, /vergelijk, /superlatieven, /gemiddelde
- [ ] #3 components/ui/button.tsx supports the new look and recolors to a per-type accent via the BORREL-4.1 theming contract
- [ ] #4 A11Y preserved: visible focus, WCAG AA contrast, keyboard-navigable nav
- [ ] #5 bun run lint, typecheck and build pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Do not hardcode a type color; consume the theming contract. Some linked routes are built by later stories — linking ahead is fine. Verify: bun run lint && bun run typecheck && bun run build.
<!-- SECTION:NOTES:END -->
