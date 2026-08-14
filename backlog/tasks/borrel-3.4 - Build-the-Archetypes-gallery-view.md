---
id: BORREL-3.4
title: Build the Archetypes gallery view
status: Done
assignee: []
created_date: '2026-08-14 21:02'
updated_date: '2026-08-14 21:30'
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
- [x] #1 All six ARCHETYPES render as character cards at /typetjes
- [x] #2 Each card shows the archetype name, description and defining traits
- [x] #3 Each card shows its member count/list, resolved from the cluster assignments
- [x] #4 Each archetype is individually deep-linkable (target for the find-yourself badge)
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Read ARCHETYPES from content/archetypes. 2. Resolve members per archetype via sourceClusterId against scripts/archetypes/archetypes.json + getResponses(). 3. Build components/archetypes/ card + gallery. 4. Compose app/typetjes/ with per-archetype anchors/links.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Delivered /typetjes: six ARCHETYPES render as giraffe-voiced character cards (components/archetypes/) with name, description and defining traits. Member count/list resolved from scripts/archetypes/archetypes.json assignments grouped by cluster and matched via sourceClusterId (members.ts). Each card is deep-linkable (id=archetype slug + scroll-mt + :target ring; jump-links nav). Server component, build-time data, no runtime fetch (/typetjes prerenders Static). Styled with BORREL-2.3 tokens, each archetype's mapped brand hue as decorative accent. No archetype.image referenced. Green: lint, typecheck, test (13), build. Reviewer: pass, no findings, no scope violations.
<!-- SECTION:NOTES:END -->
