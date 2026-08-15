---
id: BORREL-4
title: 'Epic: Rebranding — graffiti/anime theme centered on the types'
status: To Do
assignee: []
created_date: '2026-08-15 07:48'
labels:
  - epic
dependencies: []
ordinal: 23000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Rebrand the whole Borrel 35 site into a loud, festive graffiti/anime look with the KOMPANEN TYPES as the centerpiece: a page per type with its own sub-theme, fast self-find funnelling people to their type, per-person deviation-from-average, a multi-person compare, and a 'most average Kompaan' reveal. Mobile-first and A11Y throughout.

Chosen approach (vs a monolithic rebrand): a shared design-language foundation first (retheme tokens + per-type theming contract), then restyle each surface in disjoint scopes, plus two new features (per-type pages, compare). Data/logic (lib/aggregate) and the component structure stay; we overhaul styling + IA, not a rewrite. Type images are slots (real art delivered later); background/element SVGs are in scope.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Every surface (landing, type index, per-type pages, find-yourself, compare, superlatives, gemiddelde) uses the new graffiti/anime design language
- [ ] #2 Types are the centerpiece: a page per type with its own sub-theme, and the landing funnels people to their type
- [ ] #3 New features live: per-type pages, multi-person compare, per-person deviation-from-average, and a 'most average Kompaan' reveal
- [ ] #4 Every surface is mobile-first and meets WCAG AA (contrast, focus, reduced-motion)
<!-- AC:END -->
