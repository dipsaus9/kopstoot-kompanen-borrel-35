---
id: BORREL-2.6
title: Generate named archetypes and promo imagery
status: To Do
assignee: []
created_date: '2026-08-14 14:08'
updated_date: '2026-08-14 20:22'
labels: []
dependencies:
  - BORREL-2.5
references:
  - content/archetypes/
  - docs/archetypes.md
  - package.json
  - bun.lock
parent_task_id: BORREL-2
type: feature
ordinal: 14000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Turn the clustering output into the final set of named Kompaan archetypes (e.g. De Sociale Giraffe, De Salmari-Soldaat) with descriptions, and generate one image per archetype usable as banners and promotion material for Borrel 35, so the archetype feature and the events promo share one visual identity.

Type: deliverable
Branch: BORREL-2.6/archetype-generation
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Each cluster from the clustering output is mapped to a named archetype with a short description, stored typed under content/archetypes/
- [ ] #2 docs/archetypes.md presents the final archetypes human-readably (name, description, defining traits)
- [ ] #3 bun run lint and bun run typecheck pass
- [ ] #4 Archetype names and descriptions match the playful/vertical/giraffe design direction
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Read the clustering assignments. 2. Name + describe each cluster as an archetype. 3. Write content/archetypes + docs/archetypes.md. 4. Generate one banner image per archetype. 5. Store final assets under public/archetypes.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
needs-info: built on mock clusters until the real CSV arrives. Image-generation method (AI generation vs commissioned) left to the implementer; store final assets in public/archetypes. May install an image lib (e.g. sharp) so package.json + bun.lock are listed. public/archetypes/ overlaps BORREL-1.1 public/ but is ordered after it via the dependency chain. Promo material — schedule generation before 2026-08-29. Verify: bun run lint && bun run typecheck.

Imagery deferred to a follow-up story per owner decision (2026-08-14); this story delivers named archetypes + descriptions only. Regenerate/retune on the real Google-Form CSV.
<!-- SECTION:NOTES:END -->
