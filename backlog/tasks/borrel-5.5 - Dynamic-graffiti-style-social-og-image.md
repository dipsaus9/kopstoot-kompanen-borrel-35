---
id: BORREL-5.5
title: Dynamic graffiti-style social (og) image
status: To Do
assignee: []
created_date: '2026-08-17 07:37'
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
- [ ] #1 app/opengraph-image.tsx uses next/og (ImageResponse) to render a 1200x630 image in the graffiti style: dark ink background, yellow display title 'Welk type Kompaan ben jij?', type-colour paint splashes
- [ ] #2 app/twitter-image.tsx renders the same (or re-exports it) so the WhatsApp/Twitter preview matches
- [ ] #3 The generated image is reachable and correctly referenced by the metadata; bun run lint, typecheck and build pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
next/og runs on the edge; embed the display font if needed (fetch the Bangers woff at build) or fall back to a bold system font. Keep it text + shapes (no raster character art) so it renders fast and deterministically. Verify: bun run lint && bun run typecheck && bun run build.
<!-- SECTION:NOTES:END -->
