---
id: BORREL-2.3
title: Establish playful/vertical design system tokens and spec
status: Done
assignee: []
created_date: '2026-08-14 14:08'
updated_date: '2026-08-14 20:58'
labels:
  - story
dependencies:
  - BORREL-1.1
  - BORREL-1.3
  - BORREL-2.5
references:
  - app/globals.css
  - app/theme/
  - docs/design-system.md
parent_task_id: BORREL-2
type: feature
ordinal: 13500
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Formalize a playful, bold, vertical, giraffe-motif design system — color/type/spacing tokens and a usage spec — layered on top of the shadcn base theme and wired into the app, so every build epic renders in one consistent visual language.

Type: deliverable
Branch: BORREL-2.3/design-system-tokens
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 docs/design-system.md defines palette, type scale, spacing, giraffe-motif usage and core component guidance
- [x] #2 Design tokens are implemented under app/theme/ and applied via app/globals.css, layered over the shadcn base variables
- [x] #3 Tokens are consumable in components (CSS custom properties / Tailwind theme vars)
- [x] #4 A sample rendered element demonstrates the tokens (bold vertical layout + giraffe accent)
- [x] #5 bun run lint and bun run typecheck pass
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. app/theme/tokens.css: giraffe/borrel brand palette (OKLCH) mapped to archetype identities, oversized vertical type scale, spacing + vertical-rhythm, playful radii; plus semantic override of shadcn base vars (light+dark). 2. app/globals.css: import tokens.css after shadcn, extend @theme inline so brand color/type/spacing tokens are Tailwind-consumable (AC3). 3. docs/design-system.md: human spec — palette, type scale, spacing/rhythm, giraffe-motif usage, component guidance (AC1). 4. app/theme/design-system-preview.tsx: self-contained renderable component — bold vertical layout + giraffe accent proving the tokens (AC4), kept in-scope under app/theme/. 5. Verify bun run lint && bun run typecheck (AC5). Stay strictly within References; do not touch app/page.tsx.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
No new dependencies — CSS/token work only, so no bun.lock. Depends on BORREL-1.1 (app/) and BORREL-1.3 (shadcn base theme in app/globals.css); layers on top of shadcn rather than replacing it. Verify: bun run lint && bun run typecheck.

Reordered to follow BORREL-2.5: base design tokens/styling are defined AFTER the archetypes are settled and must visually match the archetype identities.

Implemented: app/theme/tokens.css = raw giraffe/borrel OKLCH palette (savanna neutrals + giraffe gold + one accent per archetype family = chart ramp), oversized vertical type scale (--fs-*), line-heights, weights, tracking, vertical-rhythm spacing (--stack-*), --r-pill. app/globals.css imports it, remaps the shadcn semantic vars (:root savanna / .dark night-savanna) onto the brand tokens, exposes brand tokens as Tailwind theme utilities via @theme inline (bg-giraffe, text-display, gap-stack-section, rounded-pill, tracking-eyebrow, ...), and adds a giraffe-spots motif @utility. docs/design-system.md is the spec. app/theme/design-system-preview.tsx is the sample rendered element (bold vertical layout + giraffe-spot accent) and ties the accent family to ARCHETYPES. Verify: bun run lint=0, bun run typecheck=0, bun run build OK; compiled CSS confirmed to contain giraffe-spots/bg-giraffe/text-colossus/text-display/gap-stack-section/rounded-pill/tracking-eyebrow.

Independent review (dipsaus-ai:story-reviewer): verdict=pass. All 5 acceptance criteria met, scopeViolations=none, findings=none.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Shipped the Borrel 35 playful/vertical giraffe design system. app/theme/tokens.css defines the raw token layer (giraffe/borrel OKLCH palette tuned to the six Kompaan archetypes, an oversized vertical type scale, line-heights/weights/tracking, vertical-rhythm spacing and a pill radius). app/globals.css imports it, remaps the shadcn semantic vars over the base theme (:root savanna, .dark night-savanna), exposes the tokens as Tailwind theme utilities via @theme inline, and adds a giraffe-spot motif utility plus bold heading defaults. docs/design-system.md documents palette, type scale, spacing, motif usage and component guidance. app/theme/design-system-preview.tsx is the sample rendered element (bold vertical layout + giraffe accent) tying the accent family to ARCHETYPES. Verify green: lint 0, typecheck 0, build OK, brand utilities confirmed in the compiled CSS. Independent review: pass.
<!-- SECTION:FINAL_SUMMARY:END -->
