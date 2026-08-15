---
id: BORREL-4.6
title: 'Per-type page at /typetjes/[slug] with its own sub-theme'
status: Done
assignee: []
created_date: '2026-08-15 07:50'
updated_date: '2026-08-15 10:01'
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
- [x] #1 Dynamic route app/typetjes/[slug] renders a page per type styled in that type's own sub-theme (from BORREL-4.2)
- [x] #2 Shows the full type description (appearance/traits/colors per the docs), defining traits, and the list of members with that type
- [x] #3 Reserves an image slot per type (placeholder now; real art later) in the layout
- [x] #4 All type slugs are statically generated (generateStaticParams); an unknown slug returns 404
- [x] #5 Mobile-first; A11Y (contrast holds within each sub-theme)
- [x] #6 bun run lint, typecheck and build pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Delivered: dynamic route app/typetjes/[slug]/page.tsx (generateStaticParams for all 6 slugs, notFound() 404 on unknown) rendering the presentational components/type-page/TypePage. Each page is dressed entirely in its type's BORREL-4.2 sub-theme (data-type + typeThemeVars on the article root) and shows the full description, defining traits (Kenmerken), signature colours (Kleuren), a 4/5 image slot (renders archetype.image if present, else a cel-shaded 'Illustratie volgt' placeholder sized for future art) and the list of members (De Kompanen) resolved read-only via getArchetypeGallery(). Mobile-first, semantic headings, AA-tuned ink on accent surfaces. Verified green: lint, typecheck, build (all 6 [slug] paths prerender as SSG). Independent story-reviewer verdict: pass (0 findings, 0 scope violations).
<!-- SECTION:NOTES:END -->
