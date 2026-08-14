---
id: BORREL-3.2
title: Replace boilerplate with themed site shell & navigation
status: To Do
assignee: []
created_date: '2026-08-14 21:01'
updated_date: '2026-08-14 21:01'
labels:
  - story
dependencies:
  - BORREL-2.3
references:
  - app/layout.tsx
  - components/site/
parent_task_id: BORREL-3
type: feature
ordinal: 17000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Replace the create-next-app boilerplate with the real Borrel 35 shell: a giraffe-themed root layout with real site metadata and fonts, and a global navigation linking the four core views. Renders in the BORREL-2.3 design-system tokens so every view shares one visual language.

Type: deliverable
Branch: BORREL-3.2/site-shell-navigation
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 app/layout.tsx has real site metadata (title + description), not the create-next-app defaults
- [ ] #2 A global navigation component links all four view routes (/ , /vind-jezelf, /typetjes, /superlatieven)
- [ ] #3 The shell renders using the BORREL-2.3 design-system tokens
- [ ] #4 No create-next-app boilerplate remains in the root layout
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Rewrite app/layout.tsx: real metadata, fonts, themed body. 2. Build components/site/ nav linking the four Dutch routes. 3. Wire nav into the layout using design-system tokens.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Depends on BORREL-2.3 (design system: app/globals.css, app/theme/, docs/design-system.md) — do NOT modify those files, they are 2.3's scope. Server components; no runtime data fetch. Verify: bun run lint, bun run typecheck, bun run test.
<!-- SECTION:NOTES:END -->
