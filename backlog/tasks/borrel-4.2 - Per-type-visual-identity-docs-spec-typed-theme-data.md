---
id: BORREL-4.2
title: 'Per-type visual identity: docs spec + typed theme data'
status: Done
assignee: []
created_date: '2026-08-15 07:49'
updated_date: '2026-08-15 09:37'
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
- [x] #1 docs/type-visual-specs.md describes, for each of the 6 types: appearance, defining traits, colors, vibe and image direction
- [x] #2 app/theme/type-themes.ts exports a typed theme map keyed by archetype id (palette/accent tokens) that matches the docs 1:1
- [x] #3 The theme map implements the per-type theming contract from BORREL-4.1
- [x] #4 bun run lint and typecheck pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Delivered on shared branch BORREL-4/launch-build. docs/type-visual-specs.md gives all 6 types a full graffiti/anime identity (appearance, defining traits, colours+roles, vibe, image direction). app/theme/type-themes.ts exports the typed TYPE_THEMES map (Record<ArchetypeId, TypeTheme>) keyed by the 6 archetype ids, each pointing only at --brand-* tokens and matching the docs 1:1; typeThemeVars() projects accent/accentStrong/accentInk onto the 4.1 contract knobs (--type-accent, --type-accent-strong, --type-accent-ink), and a load-time guard keeps the map in lockstep with content/archetypes. Ink chosen for WCAG-AA (cocoa-deep on light accents, cream on deep-jewel accents); night+wine sit at ~4.4:1, AA for the bold/large on-accent display text as documented. lint + typecheck green. Reviewer verdict: pass.
<!-- SECTION:NOTES:END -->
