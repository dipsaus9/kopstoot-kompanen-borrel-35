---
id: BORREL-1.5
title: 'Add GitHub Actions CI (lint, typecheck, test)'
status: Done
assignee: []
created_date: '2026-08-14 13:47'
updated_date: '2026-08-14 19:57'
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
- [x] #1 .github/workflows/ci.yml triggers on pull_request to main
- [x] #2 CI installs with bun and runs lint, typecheck and test
- [x] #3 Workflow is valid YAML and passes on this repo
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
Write ci.yml using oven-sh/setup-bun, bun install, then bun run lint/typecheck/test as steps.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Verify: workflow YAML parses; jobs mirror local verify. Depends on BORREL-1.4 (test script must exist).

Added .github/workflows/ci.yml: triggers on pull_request to main; job on ubuntu-latest uses actions/checkout@v4 + oven-sh/setup-bun@v2 (bun-version latest), runs bun install --frozen-lockfile then bun run lint/typecheck/test. Verified locally: lint, typecheck, test (2/2) all green; YAML parses via js-yaml.

Review gate (dipsaus-ai:story-reviewer): verdict=pass. All 3 acceptance criteria met, no scope violations, no findings.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added .github/workflows/ci.yml — a GitHub Actions workflow triggering on pull_request to main that checks out the repo, sets up Bun via oven-sh/setup-bun, installs with bun install --frozen-lockfile, then runs bun run lint, typecheck and test as separate steps, mirroring the local verify. Verified locally (lint/typecheck/test all green) and YAML validated.
<!-- SECTION:FINAL_SUMMARY:END -->
