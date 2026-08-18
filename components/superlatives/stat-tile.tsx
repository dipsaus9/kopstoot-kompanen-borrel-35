/**
 * A single at-a-glance stat tile for the Toppers view.
 *
 * Presentational only: renders one precomputed {@link ShowcaseStat} as a playful
 * giraffe sticker card — an emoji-badged eyebrow, one big headline value and a
 * supporting caption. Unlike a {@link LeaderboardTile} it shows a single
 * club-wide figure (the biggest archetype group, the average Kompaan) rather
 * than a ranked top-N. Data is embedded at build time by the server page.
 */

import type { ShowcaseStat } from "./leaderboards";

export interface StatTileProps {
  /** The precomputed stat to render. */
  readonly stat: ShowcaseStat;
}

export function StatTile({ stat }: StatTileProps) {
  const { id, emoji, label, value, caption } = stat;

  return (
    <article
      id={id}
      className="sticker flex flex-col items-center gap-stack-sm rounded-3xl bg-card p-stack-lg text-center"
    >
      <span
        aria-hidden
        className="text-title leading-none"
      >
        {emoji}
      </span>
      <p className="text-caption font-bold tracking-eyebrow text-muted-foreground uppercase">
        {label}
      </p>
      <p className="text-headline font-black leading-heading tracking-heading text-primary text-balance">
        {value}
      </p>
      <p className="text-body font-medium leading-body text-muted-foreground text-pretty">
        {caption}
      </p>
    </article>
  );
}
