---
id: BORREL-1.3
title: Initialize shadcn/ui with base theme
status: To Do
assignee: []
created_date: '2026-08-14 13:47'
labels:
  - story
dependencies:
  - BORREL-1.2
references:
  - package.json
  - components.json
  - lib/
  - components/
  - app/globals.css
parent_task_id: BORREL-1
type: chore
ordinal: 4000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Initialize shadcn/ui with a base theme and one sample primitive so visual components can be built.

Type: deliverable
Branch: BORREL-1.3/init-shadcn-ui
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 shadcn initialized: components.json present and cn util in lib/utils.ts
- [ ] #2 Base theme CSS variables added to app/globals.css
- [ ] #3 At least one shadcn primitive under components/ui (e.g. button) renders
- [ ] #4 bun run lint and bun run typecheck pass
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
bunx shadcn init (choose base theme); add button primitive; verify lint + typecheck.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Verify: bun run lint && bun run typecheck. Depends on BORREL-1.2 (shared package.json).
<!-- SECTION:NOTES:END -->
