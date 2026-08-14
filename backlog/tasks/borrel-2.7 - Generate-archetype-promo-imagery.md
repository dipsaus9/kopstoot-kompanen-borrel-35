---
id: BORREL-2.7
title: Generate archetype promo imagery
status: Done
assignee: []
created_date: '2026-08-14 20:20'
updated_date: '2026-08-14 21:14'
labels:
  - story
dependencies:
  - BORREL-2.6
references:
  - public/archetypes/
  - docs/archetypes.md
  - content/archetypes/
parent_task_id: BORREL-2
priority: high
ordinal: 15000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Generate one promo image per named Kompaan archetype (from BORREL-2.6) and store under public/archetypes/, sized/usable as banners and Borrel 35 promo material. Split off from BORREL-2.6, which delivered names + descriptions only; imagery was deferred because it needs an AI image tool or a designer, not a code agent.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 One image per named archetype is generated and stored under public/archetypes/, sized/usable as banners and promo material
- [x] #2 Imagery matches the playful/vertical/giraffe design direction and the archetype names/descriptions in content/archetypes/
- [x] #3 Images are referenced from docs/archetypes.md alongside each archetype
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
Deliver on-brand SVG promo banners (owner-approved placeholder for AI raster art). 1) 6 SVG banners at 1200x630 under public/archetypes/<id>.svg, one per ARCHETYPES entry, each in its mapped hue (gold=parkborrelprofessional, park-green=verantwoordelijke-kompaan, flamingo=festival-flamingo, night=lange-nachtbraker, wine=bedtijd-baron, liquorice=salmari-soldaat). Playful/vertical/giraffe: giraffe-spot motif, oversized name + tagline, hues from app/theme/tokens.css converted OKLCH->sRGB hex for deterministic rendering. 2) Add typed readonly image field to Archetype interface + every entry in content/archetypes/index.ts -> /archetypes/<id>.svg. 3) docs/archetypes.md: reference each banner image + add 'Image regeneration' section with per-archetype AI prompt. Verify bun run lint && typecheck && build.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Review gate (dipsaus-ai:story-reviewer): verdict=pass. All 3 acceptance criteria met, no scope violations. One advisory: docs image links use repo-relative path vs runtime /archetypes/<id>.svg URL — addressed by adding a clarifying note in docs/archetypes.md.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Shipped one on-brand promo/social banner per named Kompaan archetype: six deterministic 1200x630 SVGs under public/archetypes/ (filename === archetype id), each in its mapped design-system hue (giraffe gold, festival coral, salmiak liquorice, night indigo, park green, kroeg claret) with a giraffe-spot motif, oversized vertical name and an on-theme Dutch tagline. Added a typed readonly Archetype.image field (interface + all six entries) resolving to /archetypes/<id>.svg, and updated docs/archetypes.md to embed each banner and add an 'Image regeneration' section with a per-archetype AI prompt so real raster art can replace the placeholders later. Owner-approved SVG interpretation (a code agent cannot call an AI image model). lint + typecheck + build all green; independent review passed.
<!-- SECTION:FINAL_SUMMARY:END -->
