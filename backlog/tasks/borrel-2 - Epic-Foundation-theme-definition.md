---
id: BORREL-2
title: 'Epic: Foundation & theme definition'
status: To Do
assignee: []
created_date: '2026-08-14 14:07'
labels:
  - epic
dependencies: []
ordinal: 8000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Establish the locked product direction and the build-enabling artifacts for the Kopstoot Kompanen Borrel 35 site, so the four build epics (Average Kompaan profile, Find-yourself lookup, Archetypes gallery, Superlatives/leaderboards) can be planned and delivered in parallel before Borrel 35 on 2026-08-29 (15:00, Griftpark).

Approach C (hybrid) chosen over A (a large spike-only research epic — too slow, forces future sessions to re-interview) and B (write decisions to memory only — untracked, no deliverables): product decisions are locked in this planning session and recorded in memory + docs, while the foundation work is tracked as deliverable stories that fan out.

Locked decisions: site is a static explorer of the committed Google-Form CSV (no on-site quiz — the quiz lives in an external Google Form; no live submission); individuals shown fully open with real names on the public Vercel URL; archetypes derived via build-time data-driven clustering; no final responses yet so everything is built against a mock CSV; playful/bold/vertical giraffe design; MVP = the four core views. Sits on top of the BORREL-1 boilerplate epic.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Locked product decisions recorded in memory and docs/ (data model, privacy, clustering, design vibe, MVP scope, mock-data approach, deadline)
- [ ] #2 Typed data schema, mock CSV, and a build-time parser are available for build epics
- [ ] #3 Clustering approach is decided and documented, with archetype assignments generated from the mock data
- [ ] #4 Named archetypes and promo imagery (banners) are generated from the clustering output
- [ ] #5 Design-system tokens and spec are available and wired into the app theme
- [ ] #6 docs/roadmap.md enumerates the four follow-up build epics with scope boundaries and the spec each consumes
<!-- AC:END -->
