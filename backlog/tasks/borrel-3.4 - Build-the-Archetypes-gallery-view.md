---
id: BORREL-3.4
title: Build the Archetypes gallery view
status: To Do
assignee: []
created_date: '2026-08-14 21:02'
updated_date: '2026-08-14 21:02'
labels:
  - story
dependencies:
  - BORREL-3.2
  - BORREL-2.3
  - BORREL-2.6
references:
  - app/typetjes/
  - components/archetypes/
parent_task_id: BORREL-3
type: feature
ordinal: 19000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The typetjes view: a gallery of the six named Kompaan archetypes as giraffe-voiced character cards — each showing its name, description and defining traits, plus how many members it holds (and who they are). It is the deep-link target the find-yourself archetype badge points into.

Type: deliverable
Branch: BORREL-3.4/archetypes-gallery
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 All six ARCHETYPES render as character cards at /typetjes
- [ ] #2 Each card shows the archetype name, description and defining traits
- [ ] #3 Each card shows its member count/list, resolved from the cluster assignments
- [ ] #4 Each archetype is individually deep-linkable (target for the find-yourself badge)
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Read ARCHETYPES from content/archetypes. 2. Resolve members per archetype via sourceClusterId against scripts/archetypes/archetypes.json + getResponses(). 3. Build components/archetypes/ card + gallery. 4. Compose app/typetjes/ with per-archetype anchors/links.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Depends on BORREL-3.2 (shell/nav), BORREL-2.3 (tokens) and BORREL-2.6 (named archetypes: content/archetypes/index.ts, read-only). Archetype names/traits are a template derived from mock data — render ARCHETYPES as data so a retune needs no layout change. Server component, build-time data. Verify: bun run lint, bun run typecheck, bun run test.
<!-- SECTION:NOTES:END -->
