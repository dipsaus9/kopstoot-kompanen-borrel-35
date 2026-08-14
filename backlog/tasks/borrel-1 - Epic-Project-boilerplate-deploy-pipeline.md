---
id: BORREL-1
title: 'Epic: Project boilerplate & deploy pipeline'
status: To Do
assignee: []
created_date: '2026-08-14 13:45'
labels:
  - epic
dependencies: []
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Establish a green Next.js foundation on Vercel with fixed conventions (styling, lint/format, testing, CI) before any website feature is built.

Chosen approach: Next.js (App Router, TS) + bun, Tailwind + shadcn/ui, ESLint + Prettier, Vitest + GitHub Actions CI, vercel.json + deploy docs. This beat two alternatives: (1) folding setup into the first feature story — rejected so toolchain decisions stay out of feature work and a green deploy pipeline de-risks early; (2) a Vite static SPA — rejected because Next is Vercel-native and gives image optimization for the visual goal plus server-side CSV parsing later.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Next.js app scaffolds, builds, lints and typechecks green
- [ ] #2 Tailwind + shadcn/ui usable for building visual UI
- [ ] #3 Vitest runs and GitHub Actions CI enforces lint/typecheck/test on PRs
- [ ] #4 Repo deploys to Vercel with documented setup
<!-- AC:END -->
