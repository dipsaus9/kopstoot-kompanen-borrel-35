---
id: BORREL-2.5
title: 'Spike: choose and prototype archetype clustering on mock data'
status: Done
assignee: []
created_date: '2026-08-14 14:08'
updated_date: '2026-08-14 20:13'
labels: []
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
- [x] #1 A clustering approach (algorithm, feature encoding, cluster count) is chosen and justified in docs/archetype-approach.md
- [x] #2 A build-time prototype clusters the mock respondents deterministically (seeded)
- [x] #3 Archetype assignments (respondent -> cluster) are emitted as JSON
- [x] #4 The doc records how clusters get human-friendly names and how to retune on real data
- [x] #5 bun run lint and bun run typecheck pass
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Encode the 18 role=cluster (closed) questions to numeric feature vectors honouring schema encodings (binary 0/1, ordinal normalised order index, nominal one-hot scaled). Open/showcase/identity/stat questions are excluded. 2. Implement seeded k-means (mulberry32 + k-means++, deterministic restarts) with silhouette-based k selection over k=3..6 — no runtime dependency, fully reproducible. 3. Emit respondent->cluster assignments + per-cluster dominant-answer profile to scripts/archetypes/archetypes.json. 4. Write docs/archetype-approach.md: algorithm/encoding/k justification, human-friendly naming procedure, retune-on-real-data guidance. 5. Add package.json 'archetypes' script. Verify: bun run lint && bun run typecheck.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Spike justification: the clustering choice (algorithm, encoding, cluster count) needs code experimentation and measurement on the real data shape — it cannot be settled from the desk. needs-info: mock data only until the real CSV arrives; retune on real data. Only clusters the closed questions (open questions are showcase-only). bun.lock listed per repo rule. Verify: bun run lint && bun run typecheck.

Delivered: seeded k-means (k-means++ init, mulberry32 PRNG, 10 restarts, silhouette-selected k over 3..6) with no runtime dependency. Encodes only the 18 role=cluster closed questions (binary 0/1, ordinal [0,1], nominal one-hot scaled 1/√2); open/showcase/identity/stat excluded by construction. Output: scripts/archetypes/archetypes.json (assignments + per-cluster answer signature). Finding: mock CSV is uniform-random per question so it has no latent structure — silhouette ≈0.03–0.05 for every k, selection lands on k=3. Method (not the mock numbers) is what's frozen; retune on real data per docs/archetype-approach.md §6. Determinism verified: identical JSON across consecutive runs. Follow-up: BORREL-2.6 (archetype generation) consumes this + curates human names.

Review gate (dipsaus-ai:story-reviewer): verdict=pass. All 5 acceptance criteria met, no scope violations, no findings. Constraint verified: encode filters on role==='cluster' && type==='single', excluding all open/showcase questions from clustering.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Chose and prototyped the archetype clustering method: seeded k-means (k-means++ init, mulberry32 PRNG, 10 restarts) with silhouette-selected cluster count over k∈{3..6}, implemented dependency-free under scripts/archetypes/. Encoding is schema-driven and clusters ONLY the 18 closed role=cluster questions (binary 0/1, ordinal [0,1], nominal one-hot scaled 1/√2); open/showcase/identity/stat questions are excluded by construction. The prototype loads the mock CSV via lib/data, is fully deterministic (byte-identical output across runs), and emits respondent→cluster assignments plus per-cluster answer signatures to scripts/archetypes/archetypes.json. docs/archetype-approach.md records the algorithm/encoding/k justification, the signature-driven human-naming procedure, and how to retune on the real Google-Form CSV. Honest finding: the mock data is uniform-random per question so it has no latent structure (silhouette ≈0.03–0.05, lands on k=3) — the method is what's frozen; retune on real data. lint and typecheck pass.
<!-- SECTION:FINAL_SUMMARY:END -->
