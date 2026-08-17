---
id: BORREL-5.4
title: WhatsApp-ready meta tags + branded favicon
status: To Do
assignee: []
created_date: '2026-08-17 07:37'
labels:
  - story
dependencies:
  - BORREL-5.1
references:
  - app/layout.tsx
  - app/icon.svg
  - app/apple-icon.tsx
  - public/
parent_task_id: BORREL-5
type: feature
ordinal: 37000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Give Borrel 35 complete, correct metadata and a branded favicon so a shared link renders a proper title, description and preview — tuned for WhatsApp — instead of a bare URL.
Type: deliverable
Branch: BORREL-5.4/whatsapp-meta-favicon
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 app/layout.tsx sets metadataBase from SITE_URL (config), plus openGraph and twitter (title, description, locale nl_NL, type website, twitter card summary_large_image) and a viewport themeColor matching the dark ink brand
- [ ] #2 A branded favicon / app icon in the current graffiti/anime style replaces the default (app/icon + apple-icon), served at the right sizes
- [ ] #3 Sharing the URL on WhatsApp shows the title, description and image (verified against the tags); bun run lint, typecheck and build pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Follow the borrel-34 pattern (metadataBase, openGraph, twitter, viewport.themeColor) but in this project's voice/colours. WhatsApp reads og:title/og:description/og:image (absolute URLs — metadataBase makes the og-image from BORREL-5.5 resolve absolutely). Reuse brand colours from app/theme. Verify: bun run lint && bun run typecheck && bun run build.
<!-- SECTION:NOTES:END -->
