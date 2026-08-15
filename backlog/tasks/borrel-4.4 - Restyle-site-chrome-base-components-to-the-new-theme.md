---
id: BORREL-4.4
title: Restyle site chrome & base components to the new theme
status: Done
assignee: []
created_date: '2026-08-15 07:50'
updated_date: '2026-08-15 09:49'
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
- [x] #1 app/layout.tsx and components/site/ (header + nav) are restyled to the graffiti/anime look; the nav works on mobile (touch-friendly / collapsible)
- [x] #2 The nav links all primary routes: / , /typetjes, /vind-jezelf, /vergelijk, /superlatieven, /gemiddelde
- [x] #3 components/ui/button.tsx supports the new look and recolors to a per-type accent via the BORREL-4.1 theming contract
- [x] #4 A11Y preserved: visible focus, WCAG AA contrast, keyboard-navigable nav
- [x] #5 bun run lint, typecheck and build pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Restyled global chrome and base button to the graffiti/anime theme, consuming only BORREL-4.1 tokens/utilities (no hardcoded type colours). app/layout.tsx gained a skip-link + flex-column shell; site-header wears a giraffe-spots/ink-outline sticker mark and a thick ink underline; site-nav is now a client component with a desktop pill row and a touch-sized (44px) collapsible mobile menu (aria-expanded/controls/label, aria-current, Escape + route-change close). nav-items lists all six primary routes (/, /gemiddelde, /vind-jezelf, /vergelijk, /typetjes, /superlatieven). button.tsx variants take the sticker look (rounded-pill, ink border, sticker-shadow, min-h-tap) and recolour per type via bg-primary/text-primary-foreground under the [data-type] contract. lint + typecheck + build all green. story-reviewer verdict: pass, no findings, no scope violations.
<!-- SECTION:NOTES:END -->
