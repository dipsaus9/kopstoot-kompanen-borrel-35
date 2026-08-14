---
id: BORREL-2.6
title: Generate named archetypes and promo imagery
status: Done
assignee: []
created_date: '2026-08-14 14:08'
updated_date: '2026-08-14 20:26'
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
- [x] #1 Each cluster from the clustering output is mapped to a named archetype with a short description, stored typed under content/archetypes/
- [x] #2 docs/archetypes.md presents the final archetypes human-readably (name, description, defining traits)
- [x] #3 bun run lint and bun run typecheck pass
- [x] #4 Archetype names and descriptions match the playful/vertical/giraffe design direction
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Read scripts/archetypes/archetypes.json (3 clusters, k=3). 2. Map each cluster to one named Kompaan archetype from its answer signature; Dutch/playful/vertical-giraffe names. 3. Store typed under content/archetypes/index.ts (Archetype[]: id,name,description,definingTraits,sourceClusterId). 4. Write docs/archetypes.md (name+description+defining traits citing dominant signatures; honesty note re mock uniform-random data, silhouette approx 0.05, retune on real CSV). 5. Verify bun run lint && bun run typecheck.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
needs-info: built on mock clusters until the real CSV arrives. Image-generation method (AI generation vs commissioned) left to the implementer; store final assets in public/archetypes. May install an image lib (e.g. sharp) so package.json + bun.lock are listed. public/archetypes/ overlaps BORREL-1.1 public/ but is ordered after it via the dependency chain. Promo material — schedule generation before 2026-08-29. Verify: bun run lint && bun run typecheck.

Imagery deferred to a follow-up story per owner decision (2026-08-14); this story delivers named archetypes + descriptions only. Regenerate/retune on the real Google-Form CSV.

Independent review (story-reviewer): verdict=pass. All 4 amended ACs met, no scope violations. Task-file edit noted as workflow bookkeeping, not a deliverable violation.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Mapped the 3 k-means clusters (scripts/archetypes/archetypes.json) to named Kompaan archetypes — De Plan-Giraffe, De Kom-Eraan-Giraffe, De Verantwoorde Reus — stored type-safe in content/archetypes/index.ts (Archetype[] with id/name/description/definingTraits/sourceClusterId) and documented human-readably in docs/archetypes.md with defining traits citing each cluster's dominant answer signatures. Reduced scope per owner decision (2026-08-14): names+descriptions only, promo imagery deferred to a follow-up story. Doc flags the mock uniform-random data (silhouette approx 0.05) as a template to retune on the real Google-Form CSV. lint + typecheck green.
<!-- SECTION:FINAL_SUMMARY:END -->
