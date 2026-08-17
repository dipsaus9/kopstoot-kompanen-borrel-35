---
id: BORREL-5.1
title: Site config module + real survey URL
status: To Do
assignee: []
created_date: '2026-08-17 07:36'
labels:
  - story
dependencies: []
references:
  - lib/config.ts
  - app/page.tsx
parent_task_id: BORREL-5
type: chore
ordinal: 34000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Centralise the site's external URLs and point the survey call-to-action at the real Google Form, so the loader and meta read one source of truth instead of scattered literals.
Type: deliverable
Branch: BORREL-5.1/site-config-survey-url
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 lib/config.ts exports SURVEY_URL (the real Google Form), SHEET_CSV_URL (the published CSV export), and SITE_URL (production base, from VERCEL_PROJECT_PRODUCTION_URL with a localhost fallback)
- [ ] #2 The survey CTA on the start page links to SURVEY_URL from config (no hardcoded # placeholder)
- [ ] #3 bun run lint and typecheck pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
SURVEY_URL = https://docs.google.com/forms/d/e/1FAIpQLSeQGd8Si8eW3M7GYQAOUiEP4VoYmEFTxk9L4PLzPXDquMuRCg/viewform . SHEET_CSV_URL = https://docs.google.com/spreadsheets/d/1YYezJMAoCWaM_YQ8wbvhXLTvHnbvHu36D0PYoCGkEdU/export?format=csv&gid=890280148 . app/page.tsx already has a FORM_URL const — replace it with the config import. Verify: bun run lint && bun run typecheck.
<!-- SECTION:NOTES:END -->
