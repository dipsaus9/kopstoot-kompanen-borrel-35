---
id: BORREL-4.2
title: 'Per-type visual identity: docs spec + typed theme data'
status: To Do
assignee: []
created_date: '2026-08-15 07:49'
labels:
  - story
dependencies:
  - BORREL-4.1
references:
  - docs/type-visual-specs.md
  - app/theme/type-themes.ts
parent_task_id: BORREL-4
type: feature
ordinal: 25000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Write a full visual identity per type (look, traits, colors, vibe, image direction) and encode it as typed theme data that implements the 4.1 theming contract, so every type page and card can dress itself in its own colors and the docs and code stay in lockstep.
Type: deliverable
Branch: BORREL-4.2/per-type-visual-identity
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 docs/type-visual-specs.md describes, for each of the 6 types: appearance, defining traits, colors, vibe and image direction
- [ ] #2 app/theme/type-themes.ts exports a typed theme map keyed by archetype id (palette/accent tokens) that matches the docs 1:1
- [ ] #3 The theme map implements the per-type theming contract from BORREL-4.1
- [ ] #4 bun run lint and typecheck pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Keys = archetype ids from content/archetypes (read-only). Colors must satisfy WCAG AA against their intended text. Verify: bun run lint && bun run typecheck.
<!-- SECTION:NOTES:END -->
