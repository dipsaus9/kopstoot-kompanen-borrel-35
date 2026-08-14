---
id: BORREL-2.4
title: Write the build-epic roadmap
status: Done
assignee: []
created_date: '2026-08-14 14:08'
updated_date: '2026-08-14 20:51'
labels:
  - story
dependencies: []
references:
  - docs/roadmap.md
parent_task_id: BORREL-2
type: docs
ordinal: 12000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Enumerate the four launch build epics (Average Kompaan profile, Find-yourself lookup, Archetypes gallery, Superlatives/leaderboards) with scope boundaries, dependencies on the foundation artifacts, and which spec each consumes, so future sessions can run backlog-plan per epic without re-deciding direction.

Type: deliverable
Branch: BORREL-2.4/build-epic-roadmap
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 docs/roadmap.md lists all four build epics with a one-paragraph scope each
- [x] #2 Each epic entry names the foundation artifact(s)/spec it depends on (schema, clustering output, archetypes, design system)
- [x] #3 Each entry states rough scope boundaries (in/out for launch)
- [x] #4 The roadmap reflects the locked decisions (static explorer, real names, clustering, mock data, deadline 2026-08-29)
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Write docs/roadmap.md: header stating locked decisions + deadline, then four build-epic sections (Average Kompaan profile, Find-yourself lookup, Archetypes gallery, Superlatives/leaderboards). 2. Each epic: one-paragraph scope, foundation deps mapped to on-main artifacts (BORREL-2.2 lib/data+schema+data/responses.csv; BORREL-2.5 scripts/archetypes; BORREL-2.6 content/archetypes+docs/archetypes.md; BORREL-2.3 design system in flight), in/out launch boundaries, cross-links to docs. 3. Self-review vs 4 ACs. 4. Commit doc + task file on branch, review gate, push.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Documentation only; no code, no install. Independent of the other stories; can run in wave 1. Verify: n/a (docs) — delivery degrades to self-review.

Review gate (dipsaus-ai:story-reviewer): verdict=pass. All 4 ACs met (one-paragraph scope per epic; foundation deps named per epic mapping BORREL-2.2/2.3/2.5/2.6; in/out launch boundaries; locked decisions incl. deadline 2026-08-29). No scope violations; only changed path docs/roadmap.md.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added docs/roadmap.md: the launch plan enumerating the four build epics (Average Kompaan profile, Find-yourself lookup, Archetypes gallery, Superlatives/leaderboards). Each epic carries a one-paragraph scope, its foundation dependencies mapped to on-main artifacts (BORREL-2.2 schema+loader, BORREL-2.5 clustering output, BORREL-2.6 named archetypes, BORREL-2.3 design system), explicit in/out launch boundaries, and a mock-data caveat. A shared 'Locked decisions' section fixes the static CSV explorer, real names, build-time clustering, mock-until-real-CSV, and the 2026-08-29 deadline, cross-linked to the foundation docs, so future backlog-plan runs proceed per epic without re-deciding direction.
<!-- SECTION:FINAL_SUMMARY:END -->
