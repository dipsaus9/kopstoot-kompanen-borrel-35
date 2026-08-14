---
id: BORREL-1.1
title: Scaffold Next.js App Router app with Tailwind + ESLint
status: To Do
assignee: []
created_date: '2026-08-14 13:46'
labels:
  - story
dependencies: []
references:
  - package.json
  - tsconfig.json
  - next.config.ts
  - next-env.d.ts
  - eslint.config.mjs
  - postcss.config.mjs
  - .gitignore
  - app/
  - public/
parent_task_id: BORREL-1
type: chore
ordinal: 2000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Scaffold a Next.js App Router + TypeScript app with Tailwind and ESLint via create-next-app, wired for bun, without clobbering existing repo files.

Type: deliverable
Branch: BORREL-1.1/scaffold-next-app
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 create-next-app (App Router, TypeScript, Tailwind, ESLint) scaffolded at repo root
- [ ] #2 Existing README.md, .claude/, backlog/ and .git are preserved, not overwritten by the scaffold
- [ ] #3 package.json has scripts dev, build, lint and typecheck (tsc --noEmit)
- [ ] #4 bun run lint and bun run typecheck pass green
- [ ] #5 bun run build succeeds
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Run create-next-app into a temp dir (bun, App Router, TS, Tailwind, ESLint, import-alias @/*). 2. Copy generated files into repo root, skipping README.md and existing .claude/ and backlog/. 3. Add typecheck script (tsc --noEmit). 4. bun install; run lint, typecheck, build.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
create-next-app refuses a non-empty dir, so scaffold in a temp dir then merge. Do NOT overwrite the bootstrap README.md, .claude/ or backlog/. Verify: bun run lint && bun run typecheck && bun run build.
<!-- SECTION:NOTES:END -->
