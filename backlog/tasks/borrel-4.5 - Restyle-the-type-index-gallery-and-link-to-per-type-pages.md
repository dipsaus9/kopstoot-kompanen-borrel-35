---
id: BORREL-4.5
title: Restyle the type index gallery and link to per-type pages
status: Done
assignee: []
created_date: '2026-08-15 07:50'
updated_date: '2026-08-15 09:55'
labels:
  - story
dependencies:
  - BORREL-4.1
  - BORREL-4.2
  - BORREL-4.4
references:
  - app/typetjes/page.tsx
  - components/archetypes/
parent_task_id: BORREL-4
type: feature
ordinal: 28000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Turn /typetjes into a loud anime-styled INDEX of the six types, each card wearing its own theme and linking through to its per-type page, so the gallery becomes the jumping-off point for the type-centric site.
Type: deliverable
Branch: BORREL-4.5/type-index-gallery
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 /typetjes (app/typetjes/page.tsx + components/archetypes/) is restyled to the anime look as an index of the 6 types
- [x] #2 Each type card uses its own theme (from BORREL-4.2) and links to its per-type page at /typetjes/<slug> (slug = archetype id)
- [x] #3 Mobile-first responsive grid; A11Y (contrast, focus, semantic headings)
- [x] #4 bun run lint, typecheck and build pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Delivered: /typetjes restyled to graffiti/anime INDEX of the 6 types. ArchetypeCard is now a Link to /typetjes/<id> (slug = archetype id), wearing its own type theme via data-type={id} + typeThemeVars(getTypeTheme(id)) — the BORREL-4.1 contract projecting BORREL-4.2 colour data; accent band uses bg-type + AA-tuned text-type-ink, body stays on paper/ink semantics. Mobile-first grid (grid-cols-1 sm:2 xl:3), semantic h1>h2>h3, visible focus, sticker/pop-shadow motif. Old in-page jump-nav removed (cards link to separate pages); id anchors kept so existing /typetjes#<id> deep-links still resolve. lint + typecheck + build green. Reviewer: PASS.
<!-- SECTION:NOTES:END -->
