---
id: BORREL-5
title: 'Epic: Live data & WhatsApp-ready meta'
status: To Do
assignee: []
created_date: '2026-08-17 07:35'
labels:
  - epic
dependencies: []
ordinal: 33000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Replace the mock survey data with the real Google-Form answers and keep the site fresh automatically, wire the real survey URL into the call-to-action, and make Borrel 35 look right when it is shared — especially on WhatsApp.

Chosen approach: the loader fetches the published Google-Sheet CSV export at request time with Next ISR (revalidate), the user's pick over a build-time fetch + scheduled redeploy — data refreshes live without a deploy, at the cost of a runtime fetch (a deliberate softening of the static-explorer rule). The six typetjes stay fixed (names + character art); live respondents are assigned to the nearest of the six clusters (nearest-centroid) so new answers never break archetype resolution. Social preview is a dynamic next/og image in the current graffiti style; meta follows the borrel-34 pattern (metadataBase, openGraph, twitter, themeColor) but in this project's voice. The published sheet is public (CSV export returns 200), so no spike is needed — delivery derives the exact column->schema mapping from the live CSV.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 The real Google-Form answers drive the site (a new gemiddelde Kompaan), refreshing automatically via ISR without a redeploy; a fetch failure falls back to the committed mock so the build never breaks
- [ ] #2 The survey call-to-action links to the real Google Form; the Google-Sheet CSV export URL is configured centrally
- [ ] #3 Live respondents resolve to one of the six fixed typetjes (nearest-centroid); the named archetypes + character art stay intact
- [ ] #4 Sharing on WhatsApp shows a correct title, description and a graffiti-style social image; favicon and meta tags are branded and complete
<!-- AC:END -->
