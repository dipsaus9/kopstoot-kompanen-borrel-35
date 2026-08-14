---
id: BORREL-1.6
title: Add vercel.json + deploy documentation
status: Done
assignee: []
created_date: '2026-08-14 13:47'
updated_date: '2026-08-14 14:29'
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
- [x] #1 vercel.json present with Next.js framework and bun install/build config
- [x] #2 README has a Deploy section covering repo connect, env vars and build settings
- [x] #3 bun run build still succeeds locally
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Add vercel.json: framework nextjs, installCommand 'bun install', buildCommand 'bun run build', outputDirectory .next. 2. Add a Deploy section to README covering connecting the repo to Vercel, env vars, and build settings. 3. Verify bun run build succeeds (plus lint/typecheck).
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Verify: bun run build. Depends on BORREL-1.1 (scaffold). Touches only vercel.json + README.md — safe to run in parallel with the 1.2-1.5 chain.

vercel.json added (framework nextjs, installCommand 'bun install', buildCommand 'bun run build', outputDirectory .next). README Deploy section covers repo connect, build settings table, and env vars. Verified: bun run build, lint, typecheck, format:check all green.

vercel.json (framework nextjs, bun install/build, .next output) + README Deploy section committed in 91fe0fd. Verified green: bun run lint (0), bun run typecheck (0), bun run build (exit 0, 5 static pages).

Review gate (dipsaus-ai:story-reviewer): PASS. All 3 criteria met, no scopeViolations, no findings.

Review gate: reviewer initially blocked AC3 (a diff cannot show a build log); re-review round 2 passed with captured 'bun run build' exit-0 evidence. Verdict: pass, no scope violations, both References in scope.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added vercel.json (framework nextjs, installCommand 'bun install', buildCommand 'bun run build', outputDirectory .next) and a README Deploy section covering repo connect, build settings and environment variables, so the repo deploys to Vercel repeatably. Verified with bun run lint/typecheck/build (all green) and passed independent review.
<!-- SECTION:FINAL_SUMMARY:END -->
