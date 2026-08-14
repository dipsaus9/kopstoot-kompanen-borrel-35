---
id: BORREL-1.6
title: Add vercel.json + deploy documentation
status: To Do
assignee: []
created_date: '2026-08-14 13:47'
labels:
  - story
dependencies:
  - BORREL-1.1
references:
  - vercel.json
  - README.md
parent_task_id: BORREL-1
type: chore
ordinal: 7000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add vercel.json and README deploy documentation so the repo deploys to Vercel repeatably.

Type: deliverable
Branch: BORREL-1.6/vercel-deploy-config
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 vercel.json present with Next.js framework and bun install/build config
- [ ] #2 README has a Deploy section covering repo connect, env vars and build settings
- [ ] #3 bun run build still succeeds locally
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
Add vercel.json (framework nextjs, bun install/build); add README Deploy section.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Verify: bun run build. Depends on BORREL-1.1 (scaffold). Touches only vercel.json + README.md — safe to run in parallel with the 1.2-1.5 chain.
<!-- SECTION:NOTES:END -->
