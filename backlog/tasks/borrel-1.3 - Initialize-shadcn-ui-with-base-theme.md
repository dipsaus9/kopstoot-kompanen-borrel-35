---
id: BORREL-1.3
title: Initialize shadcn/ui with base theme
status: Done
assignee: []
created_date: '2026-08-14 13:47'
updated_date: '2026-08-14 14:16'
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
  - bun.lock
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
- [x] #1 shadcn initialized: components.json present and cn util in lib/utils.ts
- [x] #2 Base theme CSS variables added to app/globals.css
- [x] #3 At least one shadcn primitive under components/ui (e.g. button) renders
- [x] #4 bun run lint and bun run typecheck pass
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
bunx shadcn init (choose base theme); add button primitive; verify lint + typecheck.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Verify: bun run lint && bun run typecheck. Depends on BORREL-1.2 (shared package.json).

Added bun.lock to References (shadcn install mutates lockfile).

Review gate: PASS, no scope violations. Fixed advisory: globals.css had --font-sans: var(--font-sans) (self-reference, sans font resolved to nothing); remapped --font-sans/--font-heading to var(--font-geist-sans) matching layout.tsx. Reviewer: dipsaus-ai:story-reviewer.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Initialized shadcn/ui (base-nova preset, css variables) on Next 15 + Tailwind v4: components.json, lib/utils.ts cn() helper, full oklch base theme in app/globals.css, and a Button primitive under components/ui. Fixed a self-referential --font-sans var so the Geist sans font resolves. lint, typecheck, format:check and build all green.
<!-- SECTION:FINAL_SUMMARY:END -->
