---
id: BORREL-5.1
title: Site config module + real survey URL
status: Done
assignee: []
created_date: '2026-08-17 07:36'
updated_date: '2026-08-17 07:47'
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
- [x] #1 lib/config.ts exports SURVEY_URL (the real Google Form), SHEET_CSV_URL (the published CSV export), and SITE_URL (production base, from VERCEL_PROJECT_PRODUCTION_URL with a localhost fallback)
- [x] #2 The survey CTA on the start page links to SURVEY_URL from config (no hardcoded # placeholder)
- [x] #3 bun run lint and typecheck pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Added lib/config.ts as the single source of truth for external URLs (SURVEY_URL Google Form, SHEET_CSV_URL published CSV, SITE_URL from VERCEL_PROJECT_PRODUCTION_URL with localhost:3000 fallback). Survey CTA in app/page.tsx now links to SURVEY_URL from @/lib/config (removed the '#' FORM_URL placeholder). lint + typecheck green; story-reviewer verdict pass.
<!-- SECTION:NOTES:END -->
