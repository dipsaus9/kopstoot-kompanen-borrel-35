---
id: BORREL-5.5
title: Dynamic graffiti-style social (og) image
status: Done
assignee: []
created_date: '2026-08-17 07:37'
updated_date: '2026-08-17 08:37'
labels:
  - story
dependencies: []
references:
  - app/opengraph-image.tsx
  - app/twitter-image.tsx
parent_task_id: BORREL-5
type: feature
ordinal: 38000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Render the social-share image in code in the current graffiti/anime style, so every shared link (WhatsApp, etc.) shows an on-brand 1200x630 preview instead of nothing.
Type: deliverable
Branch: BORREL-5.5/og-social-image
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 app/opengraph-image.tsx uses next/og (ImageResponse) to render a 1200x630 image in the graffiti style: dark ink background, yellow display title 'Welk type Kompaan ben jij?', type-colour paint splashes
- [x] #2 app/twitter-image.tsx renders the same (or re-exports it) so the WhatsApp/Twitter preview matches
- [x] #3 The generated image is reachable and correctly referenced by the metadata; bun run lint, typecheck and build pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Delivered: app/opengraph-image.tsx renders the 1200x630 social card with next/og ImageResponse (dark ink #1a1120 ground, type-colour paint splashes, hot-pink BORREL 35 wordmark sticker, gold Bangers display title 'Welk type Kompaan ben jij?'). app/twitter-image.tsx re-exports it so the WhatsApp/Twitter summary_large_image preview matches. Both routes auto-wired by Next.js file convention (layout metadataBase already set). Bangers ttf fetched at build with system-font fallback. lint + typecheck + build all green; build registers /opengraph-image and /twitter-image as static. Reviewer: PASS (1 advisory: could vendor the font for full determinism).
<!-- SECTION:NOTES:END -->
