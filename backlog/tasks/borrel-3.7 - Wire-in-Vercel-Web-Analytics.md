---
id: BORREL-3.7
title: Wire in Vercel Web Analytics
status: To Do
assignee: []
created_date: '2026-08-14 21:03'
updated_date: '2026-08-14 21:03'
labels:
  - story
dependencies:
  - BORREL-3.2
references:
  - app/layout.tsx
  - package.json
  - bun.lock
parent_task_id: BORREL-3
type: chore
ordinal: 22000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add Vercel Web Analytics so page views are collected on the Vercel deployment: install @vercel/analytics and mount the <Analytics/> component in the root layout. No custom events for launch — just baseline page-view collection.

Type: deliverable
Branch: BORREL-3.7/vercel-web-analytics
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 @vercel/analytics is added to package.json dependencies and reflected in bun.lock
- [ ] #2 The <Analytics/> component (from @vercel/analytics/next) is mounted in app/layout.tsx
- [ ] #3 bun run build passes with analytics wired in
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. bun add @vercel/analytics. 2. Import Analytics from @vercel/analytics/next and render it in the root layout body. 3. bun run build to confirm.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Depends on BORREL-3.2 — both edit app/layout.tsx, so the dependency edge serializes them (must land after the themed shell, never in parallel). bun.lock listed in References per the repo dep-install rule. Verify: bun run lint, bun run typecheck, bun run test, bun run build.
<!-- SECTION:NOTES:END -->
