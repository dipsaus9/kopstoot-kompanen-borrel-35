/**
 * The superlatives view (BORREL-3.6) — the /superlatieven playful-records page:
 * a curated set of superlative leaderboards celebrating extremes of the club
 * (tallest, most borrels, head-bump champion, earliest/latest arriver, …) with
 * real names, plus a showcase strip of the three free-text answers. Data is
 * precomputed at build time over `getResponses()`; nothing is fetched at runtime.
 */

export { SuperlativesView, type SuperlativesViewProps } from "./superlatives";
export { LeaderboardTile, type LeaderboardTileProps } from "./leaderboard-tile";
export { QuoteStrip, type QuoteStripProps } from "./quote-strip";
export {
  getSuperlatives,
  type Leaderboard,
  type LeaderboardEntry,
  type ShowcaseQuote,
  type Superlatives,
} from "./leaderboards";
