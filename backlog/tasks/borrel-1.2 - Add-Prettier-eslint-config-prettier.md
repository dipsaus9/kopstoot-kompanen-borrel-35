---
id: BORREL-1.2
title: Add Prettier + eslint-config-prettier
status: Done
assignee: []
created_date: '2026-08-14 13:47'
updated_date: '2026-08-14 14:08'
labels:
  - story
dependencies:
  - BORREL-1.1
references:
  - package.json
  - eslint.config.mjs
  - .prettierrc.json
  - .prettierignore
  - bun.lock
  - next.config.ts
parent_task_id: BORREL-1
type: chore
ordinal: 3000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add Prettier and eslint-config-prettier so formatting is consistent and does not fight ESLint.

Type: deliverable
Branch: BORREL-1.2/add-prettier
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Prettier and eslint-config-prettier installed as devDependencies
- [x] #2 .prettierrc.json and .prettierignore present
- [x] #3 ESLint config extends prettier so there are no formatting rule conflicts
- [x] #4 package.json has a format script and bun run lint still passes
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
Install prettier + eslint-config-prettier; add .prettierrc.json and .prettierignore; extend prettier in eslint.config.mjs; add format script.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Verify: bun run lint && bun run typecheck. Shares package.json + eslint.config.mjs with BORREL-1.1 — depends on it.

Added bun.lock (prettier install) + next.config.ts (reformatted on prettier adoption) to References. Scoped .prettierignore to exclude backlog/, .claude/ and *.md so the CLI-managed backlog files and docs are never reformatted.

Review gate: PASS, no scope violations. Advisory (next.config.ts formatting) refuted by evidence: bun run format:check passes green (idempotent), so committed form is prettier's output. Reviewer: dipsaus-ai:story-reviewer.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Adopted Prettier 3 + eslint-config-prettier 10: added .prettierrc.json and .prettierignore (scoped to skip backlog/, .claude/ and *.md so CLI-managed files are never reformatted), wired eslint-config-prettier/flat as the last ESLint flat-config entry, and added format + format:check scripts. lint, typecheck and format:check all green.
<!-- SECTION:FINAL_SUMMARY:END -->
