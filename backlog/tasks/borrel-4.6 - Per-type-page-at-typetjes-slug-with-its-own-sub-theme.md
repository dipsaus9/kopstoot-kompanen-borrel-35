---
id: BORREL-4.6
title: 'Per-type page at /typetjes/[slug] with its own sub-theme'
status: To Do
assignee: []
created_date: '2026-08-15 07:50'
labels:
  - story
dependencies:
  - BORREL-4.2
  - BORREL-4.4
  - BORREL-4.5
references:
  - 'app/typetjes/[slug]/'
  - components/type-page/
parent_task_id: BORREL-4
type: feature
ordinal: 29000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Build a dynamic page per type that dresses itself entirely in that type's theme and shows the full written identity, defining traits, an image slot, and the list of members with that type — the centerpiece of the rebrand.
Type: deliverable
Branch: BORREL-4.6/per-type-page
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Dynamic route app/typetjes/[slug] renders a page per type styled in that type's own sub-theme (from BORREL-4.2)
- [ ] #2 Shows the full type description (appearance/traits/colors per the docs), defining traits, and the list of members with that type
- [ ] #3 Reserves an image slot per type (placeholder now; real art later) in the layout
- [ ] #4 All type slugs are statically generated (generateStaticParams); an unknown slug returns 404
- [ ] #5 Mobile-first; A11Y (contrast holds within each sub-theme)
- [ ] #6 bun run lint, typecheck and build pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Read content/archetypes + app/theme/type-themes + the members grouping logic (read-only). Verify: bun run lint && bun run typecheck && bun run build.
<!-- SECTION:NOTES:END -->
