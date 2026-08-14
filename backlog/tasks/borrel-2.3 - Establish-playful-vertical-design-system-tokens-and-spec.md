---
id: BORREL-2.3
title: Establish playful/vertical design system tokens and spec
status: To Do
assignee: []
created_date: '2026-08-14 14:08'
updated_date: '2026-08-14 14:09'
labels:
  - story
dependencies:
  - BORREL-1.1
  - BORREL-1.3
references:
  - app/globals.css
  - app/theme/
  - docs/design-system.md
parent_task_id: BORREL-2
type: feature
ordinal: 11000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Formalize a playful, bold, vertical, giraffe-motif design system — color/type/spacing tokens and a usage spec — layered on top of the shadcn base theme and wired into the app, so every build epic renders in one consistent visual language.

Type: deliverable
Branch: BORREL-2.3/design-system-tokens
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 docs/design-system.md defines palette, type scale, spacing, giraffe-motif usage and core component guidance
- [ ] #2 Design tokens are implemented under app/theme/ and applied via app/globals.css, layered over the shadcn base variables
- [ ] #3 Tokens are consumable in components (CSS custom properties / Tailwind theme vars)
- [ ] #4 A sample rendered element demonstrates the tokens (bold vertical layout + giraffe accent)
- [ ] #5 bun run lint and bun run typecheck pass
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Define tokens (color, oversized/vertical type scale, spacing, radii). 2. Implement as CSS custom properties / Tailwind theme under app/theme + globals.css, overriding shadcn base vars. 3. Document usage + motif in docs/design-system.md. 4. Add a demo element proving tokens render.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
No new dependencies — CSS/token work only, so no bun.lock. Depends on BORREL-1.1 (app/) and BORREL-1.3 (shadcn base theme in app/globals.css); layers on top of shadcn rather than replacing it. Verify: bun run lint && bun run typecheck.
<!-- SECTION:NOTES:END -->
