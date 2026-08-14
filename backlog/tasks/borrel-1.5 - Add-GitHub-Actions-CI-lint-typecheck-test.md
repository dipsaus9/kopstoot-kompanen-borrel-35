---
id: BORREL-1.5
title: 'Add GitHub Actions CI (lint, typecheck, test)'
status: To Do
assignee: []
created_date: '2026-08-14 13:47'
labels:
  - story
dependencies:
  - BORREL-1.4
references:
  - .github/workflows/ci.yml
parent_task_id: BORREL-1
type: chore
ordinal: 6000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add a GitHub Actions workflow that runs lint, typecheck and test on pull requests to main.

Type: deliverable
Branch: BORREL-1.5/github-actions-ci
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 .github/workflows/ci.yml triggers on pull_request to main
- [ ] #2 CI installs with bun and runs lint, typecheck and test
- [ ] #3 Workflow is valid YAML and passes on this repo
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
Write ci.yml using oven-sh/setup-bun, bun install, then bun run lint/typecheck/test as steps.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Verify: workflow YAML parses; jobs mirror local verify. Depends on BORREL-1.4 (test script must exist).
<!-- SECTION:NOTES:END -->
