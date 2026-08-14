---
id: BORREL-3.7
title: Wire in Vercel Web Analytics
status: Done
assignee: []
created_date: '2026-08-14 21:03'
updated_date: '2026-08-14 21:50'
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
- [x] #1 @vercel/analytics is added to package.json dependencies and reflected in bun.lock
- [x] #2 The <Analytics/> component (from @vercel/analytics/next) is mounted in app/layout.tsx
- [x] #3 bun run build passes with analytics wired in
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. bun add @vercel/analytics. 2. Import Analytics from @vercel/analytics/next and render it in the root layout body. 3. bun run build to confirm.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Installed @vercel/analytics ^2.0.1 (package.json + bun.lock) and mounted <Analytics/> from @vercel/analytics/next in app/layout.tsx root body. Layout stays a server component; Analytics is client-tagged by the package. Verified green: lint, typecheck, test (24 passed), build. story-reviewer verdict: pass (all 3 ACs met, no scope violations).
<!-- SECTION:NOTES:END -->
