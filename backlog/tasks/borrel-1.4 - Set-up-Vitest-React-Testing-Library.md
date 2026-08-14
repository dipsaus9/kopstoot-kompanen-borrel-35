---
id: BORREL-1.4
title: Set up Vitest + React Testing Library
status: Done
assignee: []
created_date: '2026-08-14 13:47'
updated_date: '2026-08-14 19:50'
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
- [x] #1 Vitest, @testing-library/react and jsdom installed
- [x] #2 vitest.config.ts and vitest.setup.ts present; tsconfig includes vitest types
- [x] #3 package.json has a test script
- [x] #4 One sample test passes via bun run test
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
Install vitest, @testing-library/react, @testing-library/jest-dom, jsdom as devDeps; add vitest.config.ts (jsdom env, globals, setupFiles) and vitest.setup.ts (jest-dom import); add test script to package.json; add vitest types to tsconfig; write one passing sample test under test/; verify with bun run lint && bun run typecheck && bun run test.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Verify: bun run lint && bun run typecheck && bun run test. Depends on BORREL-1.3 (shared package.json/tsconfig).

Installed vitest@4, @testing-library/react@16, @testing-library/jest-dom@7, @testing-library/dom, @vitejs/plugin-react, jsdom (devDeps). vitest.config.ts uses jsdom env + globals + @ alias + setupFiles; vitest.setup.ts imports jest-dom/vitest and cleans up after each test. Added test + test:watch scripts; tsconfig types includes node, vitest/globals, @testing-library/jest-dom. Sample test/sample.test.tsx covers a unit (cn util) and a component render; bun run test => 2 passed. Verify lint+typecheck+test all green. Note: harmless Vite advisory warning about ESM-in-CJS config load (config kept as .ts per References).

Review gate (dipsaus-ai:story-reviewer): verdict=pass. All 4 acceptance criteria met, scopeViolations=none, findings=none.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added Vitest 4 + React Testing Library test harness: vitest.config.ts (jsdom env, globals, @ alias, setupFiles) and vitest.setup.ts (jest-dom matchers + per-test cleanup), a test script (vitest run), tsconfig vitest types, and a sample test/sample.test.tsx that exercises both a unit (cn util) and a component render. bun run lint && bun run typecheck && bun run test all green (2 tests pass).
<!-- SECTION:FINAL_SUMMARY:END -->
