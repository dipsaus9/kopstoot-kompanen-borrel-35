---
id: BORREL-4.1
title: Graffiti/anime design language + per-type theming mechanism
status: Done
assignee: []
created_date: '2026-08-15 07:49'
updated_date: '2026-08-15 09:29'
labels:
  - story
dependencies: []
references:
  - app/theme/tokens.css
  - app/globals.css
  - app/theme/design-system-preview.tsx
  - docs/design-system.md
parent_task_id: BORREL-4
type: feature
ordinal: 24000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Retheme the design tokens and globals into a loud graffiti/anime look and add a per-type theming contract so a type's palette can recolor base components. This is the shared foundation every other rebrand story builds on.
Type: deliverable
Branch: BORREL-4.1/anime-design-foundation
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 app/theme/tokens.css + app/globals.css deliver a graffiti/anime look: bold palette, display/graffiti type scale, thick outlines, cel-shade gradients, sticker/tag + speed-line motifs (CSS/SVG)
- [x] #2 A per-type theming contract exists: setting a type theme (data-attribute or wrapper class) recolors base components (e.g. button accent) via CSS custom properties, without hardcoding a specific type
- [x] #3 Mobile-first baseline: responsive scales and touch-sized targets
- [x] #4 A11Y: text/background contrast meets WCAG AA, focus states are visible, prefers-reduced-motion is respected
- [x] #5 docs/design-system.md documents the new look and the per-type theming contract
- [x] #6 bun run lint, typecheck and build pass
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Delivered (BORREL-4.1). Retheme + per-type theming contract on the shared branch. tokens.css: loud OKLCH marker palette (kept token names stable so existing components recolour for free), fluid clamp() display/graffiti type scale, --outline-1/2/3 ink weights, --sticker-shadow*, speed-line geometry, --tap-min 44px, and neutral --type-accent* defaults. globals.css: cel-shade/sticker/ink-outline/tag-ink/speed-lines motif utilities, AA-safe accent-foreground, always-visible :focus-visible ring, prefers-reduced-motion guard, and the per-type theming mechanism ([data-type], .type-theme remap --primary/--accent/--ring/--sidebar-* to var(--type-accent, default) — mechanism + neutral defaults only, no type data hardcoded; that is 4.2). design-system-preview.tsx exercises the look and recolours the real shadcn Button under data-type demo scopes. docs/design-system.md documents the graffiti language + the 3-knob contract. lint/typecheck/build all green. Reviewer verdict: pass (1 advisory re --type-accent-strong reserved, addressed in docs).
<!-- SECTION:NOTES:END -->
