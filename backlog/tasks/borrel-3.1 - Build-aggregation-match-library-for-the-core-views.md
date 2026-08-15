---
id: BORREL-3.1
title: Build aggregation & match library for the core views
status: Done
assignee: []
created_date: '2026-08-14 21:01'
updated_date: '2026-08-14 21:14'
labels:
  - story
dependencies: []
references:
  - lib/aggregate/
parent_task_id: BORREL-3
type: feature
ordinal: 16000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Pure, build-time functions over getResponses() that the profile and find-yourself views reuse: the Average Kompaan aggregate (means for numeric stats, modal answer per closed question), a per-person "% gemiddelde Kompaan" match score plus the list of matched traits vs the aggregate, and a name-to-archetype lookup (resolve a response to its named archetype via the cluster assignment). No runtime data path — everything runs at build/server time.

Type: deliverable
Branch: BORREL-3.1/aggregation-match-library
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 getAggregate() returns means for age, heightCm and borrelCount plus the modal answer for each closed (stat/cluster) question
- [x] #2 computeMatch(response) returns a 0-100 "% gemiddelde Kompaan" score and the list of traits matching the aggregate
- [x] #3 resolveArchetype(response) returns the named archetype for a response via its cluster assignment
- [x] #4 Unit tests cover getAggregate, computeMatch and resolveArchetype
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. getAggregate over getResponses(): numeric means + per-question mode. 2. computeMatch: compare a response's tracked answers to the aggregate, share matched -> score + trait list. 3. resolveArchetype: map response -> cluster (scripts/archetypes/archetypes.json) -> ARCHETYPES (content/archetypes). 4. Vitest unit tests.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Pure functions, build-time only (server components / build step call these; never the browser). Reads getResponses() from lib/data and the archetype map from content/archetypes + scripts/archetypes/archetypes.json (read-only, not in scope to modify). Uses the mock CSV until the real Google-Form CSV lands. Verify: bun run lint, bun run typecheck, bun run test.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added lib/aggregate/ build-time library over getResponses(): getAggregate() (numeric means for age/heightCm/borrelCount + modal answer per closed stat/cluster question), computeMatch() (0-100 % gemiddelde Kompaan score + matched traits vs the aggregate, RSVP excluded), and resolveArchetype() (response -> positional cluster assignment -> named archetype). Pure/server-only, no runtime fetch. 13 Vitest unit tests under test/aggregate.test.ts; lint+typecheck+test green. Reviewer verdict: pass.
<!-- SECTION:FINAL_SUMMARY:END -->
