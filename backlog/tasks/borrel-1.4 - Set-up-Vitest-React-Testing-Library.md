---
id: BORREL-1.4
title: Set up Vitest + React Testing Library
status: In Progress
assignee: []
created_date: '2026-08-14 13:47'
updated_date: '2026-08-14 19:31'
labels:
  - story
dependencies:
  - BORREL-1.3
references:
  - package.json
  - tsconfig.json
  - vitest.config.ts
  - vitest.setup.ts
  - test/
  - bun.lock
parent_task_id: BORREL-1
type: chore
ordinal: 5000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Set up Vitest with React Testing Library and a passing sample test so units and components are testable.

Type: deliverable
Branch: BORREL-1.4/setup-vitest
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Vitest, @testing-library/react and jsdom installed
- [ ] #2 vitest.config.ts and vitest.setup.ts present; tsconfig includes vitest types
- [ ] #3 package.json has a test script
- [ ] #4 One sample test passes via bun run test
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
Install vitest + testing-library + jsdom; add vitest.config.ts, vitest.setup.ts; add test script; write and run one sample test.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Verify: bun run lint && bun run typecheck && bun run test. Depends on BORREL-1.3 (shared package.json/tsconfig).
<!-- SECTION:NOTES:END -->
