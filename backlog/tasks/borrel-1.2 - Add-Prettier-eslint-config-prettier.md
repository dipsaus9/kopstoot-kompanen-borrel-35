---
id: BORREL-1.2
title: Add Prettier + eslint-config-prettier
status: To Do
assignee: []
created_date: '2026-08-14 13:47'
labels:
  - story
dependencies:
  - BORREL-1.1
references:
  - package.json
  - eslint.config.mjs
  - .prettierrc.json
  - .prettierignore
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
- [ ] #1 Prettier and eslint-config-prettier installed as devDependencies
- [ ] #2 .prettierrc.json and .prettierignore present
- [ ] #3 ESLint config extends prettier so there are no formatting rule conflicts
- [ ] #4 package.json has a format script and bun run lint still passes
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
Install prettier + eslint-config-prettier; add .prettierrc.json and .prettierignore; extend prettier in eslint.config.mjs; add format script.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Verify: bun run lint && bun run typecheck. Shares package.json + eslint.config.mjs with BORREL-1.1 — depends on it.
<!-- SECTION:NOTES:END -->
