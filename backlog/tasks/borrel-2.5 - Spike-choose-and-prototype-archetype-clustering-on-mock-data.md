---
id: BORREL-2.5
title: 'Spike: choose and prototype archetype clustering on mock data'
status: To Do
assignee: []
created_date: '2026-08-14 14:08'
labels:
  - needs-info
dependencies:
  - BORREL-2.2
references:
  - scripts/archetypes/
  - docs/archetype-approach.md
  - package.json
  - bun.lock
parent_task_id: BORREL-2
type: spike
ordinal: 13000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Choose and prototype an approach for deriving archetypes by clustering respondents at build time, run it on the mock CSV, emit archetype assignments as JSON, and write up the decision, so the downstream archetype-generation story implements against a settled algorithm instead of guessing.

Type: spike
Branch: BORREL-2.5/archetype-clustering-spike
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 A clustering approach (algorithm, feature encoding, cluster count) is chosen and justified in docs/archetype-approach.md
- [ ] #2 A build-time prototype clusters the mock respondents deterministically (seeded)
- [ ] #3 Archetype assignments (respondent -> cluster) are emitted as JSON
- [ ] #4 The doc records how clusters get human-friendly names and how to retune on real data
- [ ] #5 bun run lint and bun run typecheck pass
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Encode categorical answers to feature vectors. 2. Try candidate algorithms (k-means / hierarchical) seeded on the mock data. 3. Evaluate cluster separation + interpretability, pick one. 4. Emit assignments JSON. 5. Write docs/archetype-approach.md.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Spike justification: the clustering choice (algorithm, encoding, cluster count) needs code experimentation and measurement on the real data shape — it cannot be settled from the desk. needs-info: mock data only until the real CSV arrives; retune on real data. Only clusters the closed questions (open questions are showcase-only). bun.lock listed per repo rule. Verify: bun run lint && bun run typecheck.
<!-- SECTION:NOTES:END -->
