---
id: BORREL-3
title: 'Epic: Launch build — core views & analytics'
status: Done
assignee: []
created_date: '2026-08-14 21:00'
updated_date: '2026-08-14 21:51'
labels:
  - epic
dependencies: []
ordinal: 15000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Turn the committed foundation (data schema/loader, clustering output, named archetypes, design system) into the shippable Borrel 35 site: the four core views plus Vercel Web Analytics. Scope, per-epic boundaries and foundation dependencies are frozen in docs/roadmap.md (BORREL-2.4).

Chosen approach: a SINGLE lean launch epic rather than four separate build epics — the deadline (2026-08-29) is tight and each view is one page plus helpers (story-sized), so one epic keeps the dependency graph and PR flow simple. Locked decisions apply throughout: static CSV explorer (build-time data via getResponses(), no runtime fetch/DB), real names shown openly, build-time clustering, mock data until the real Google-Form CSV lands.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 All four core views are delivered: Average Kompaan profile, Find-yourself lookup, Archetypes gallery, Superlatives/leaderboards
- [ ] #2 The site shell replaces the create-next-app boilerplate and renders in the BORREL-2.3 design system with navigation between the four views
- [ ] #3 Vercel Web Analytics is wired into the deployed app
- [ ] #4 Every view reads survey data at build time via getResponses() (no runtime data fetch), consistent with the static-explorer decision
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Launch build epic delivered: aggregation & match library (3.1), themed site shell + Dutch nav (3.2), average Kompaan landing (3.3), archetypes gallery /typetjes (3.4), find-yourself /vind-jezelf (3.5), superlatives /superlatieven (3.6), Vercel Analytics (3.7). All server components, build-time data, static-explorer.
<!-- SECTION:FINAL_SUMMARY:END -->
