---
id: BORREL-3.6
title: Build the Superlatives / leaderboards view
status: Done
assignee: []
created_date: '2026-08-14 21:02'
updated_date: '2026-08-14 21:47'
labels:
  - story
dependencies:
  - BORREL-3.2
  - BORREL-2.3
references:
  - app/superlatieven/
  - components/superlatives/
  - test/superlatives.test.ts
parent_task_id: BORREL-3
type: feature
ordinal: 21000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The playful-records view: a set of superlative tiles and small leaderboards celebrating extremes and fun cuts of the dataset — tallest/shortest, most borrels, earliest/latest arriver, head-bump champion, most spontaneous — plus a showcase strip of open-answer quotes. Named people against playful categories; the club is the star, not statistics. Real names shown openly.

Type: deliverable
Branch: BORREL-3.6/superlatives-leaderboards
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 A curated set of superlative categories renders at /superlatieven, each with a short top-N and real names
- [x] #2 Numeric/ordinal extremes (e.g. height, borrel count, head-bump frequency, arrival time) are ranked from the response data
- [x] #3 A showcase strip renders the open-answer quotes (kompaanIfSentence, ultimateKompaanTrait, heightRemark)
- [x] #4 The view is a server component reading data at build time (no runtime fetch)
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Rank getResponses() over numeric/ordinal fields for each curated category. 2. Build components/superlatives/ leaderboard + quote tiles. 3. Compose app/superlatieven/ with the showcase quote strip.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Delivered /superlatieven as a server component. components/superlatives/leaderboards.ts computes 6 curated superlative leaderboards over getResponses() at build time — tallest (heightCm) and most borrels (borrelCount) numeric; head-bump champion, earliest & latest arriver, and most-asked height question ordinal via schema option tuples — each a deterministic top-5 with real names. QuoteStrip showcases the three free-text answers (kompaanIfSentence, ultimateKompaanTrait, heightRemark), attributed and interleaved. Styled with BORREL-2.3 tokens (giraffe hues, giraffe-spots hero). Reviewer verdict: pass on all 4 ACs, no scope violations; one advisory (unknown-option filtering on the latest-arriver metric) fixed. lint/typecheck/test(24)/build all green; route prerendered static (0 B client JS).
<!-- SECTION:NOTES:END -->
