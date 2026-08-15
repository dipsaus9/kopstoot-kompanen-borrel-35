---
id: BORREL-4.5
title: Restyle the type index gallery and link to per-type pages
status: To Do
assignee: []
created_date: '2026-08-15 07:50'
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
- [ ] #1 /typetjes (app/typetjes/page.tsx + components/archetypes/) is restyled to the anime look as an index of the 6 types
- [ ] #2 Each type card uses its own theme (from BORREL-4.2) and links to its per-type page at /typetjes/<slug> (slug = archetype id)
- [ ] #3 Mobile-first responsive grid; A11Y (contrast, focus, semantic headings)
- [ ] #4 bun run lint, typecheck and build pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
The per-type page route is built in BORREL-4.6; link to /typetjes/[slug] by archetype id. Verify: bun run lint && bun run typecheck && bun run build.
<!-- SECTION:NOTES:END -->
