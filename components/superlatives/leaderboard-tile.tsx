/**
 * A single superlative leaderboard tile (BORREL-3.6).
 *
 * Presentational only: renders one precomputed {@link Leaderboard} as a playful
 * giraffe card — an emoji-badged header, a one-line blurb and the ranked top-N
 * with real names and their headline value. All data is embedded at build time
 * by the server page; nothing is fetched here.
 *
 * The category's mapped brand hue (BORREL-2.3) is bound to a local `--tile-hue`
 * custom property used only as decoration (the top border, the badge disc, the
 * leading rank), so text contrast never depends on the light/dark-varying accent.
 */

import type { CSSProperties } from "react";

import type { Leaderboard } from "./leaderboards";

export interface LeaderboardTileProps {
  /** The precomputed leaderboard to render. */
  readonly leaderboard: Leaderboard;
}

export function LeaderboardTile({ leaderboard }: LeaderboardTileProps) {
  const { id, emoji, title, blurb, hueVar, entries } = leaderboard;
  const hueStyle = {
    "--tile-hue": `var(${hueVar})`,
  } as CSSProperties;

  return (
    <article
      id={id}
      style={hueStyle}
      className="flex flex-col gap-stack-md rounded-3xl border border-t-4 border-border border-t-[color:var(--tile-hue)] bg-card p-stack-md shadow-sm"
    >
      <header className="flex items-start gap-stack-sm">
        <span
          aria-hidden
          className="flex size-11 shrink-0 items-center justify-center rounded-pill bg-[color:var(--tile-hue)] text-title leading-none"
        >
          {emoji}
        </span>
        <div className="min-w-0">
          <h2 className="text-lead font-black leading-heading tracking-heading text-foreground text-balance">
            {title}
          </h2>
          <p className="text-caption font-medium leading-body text-muted-foreground text-pretty">
            {blurb}
          </p>
        </div>
      </header>

      {entries.length > 0 ? (
        <ol className="flex flex-col gap-stack-xs">
          {entries.map((entry) => (
            <li
              key={entry.rank}
              className="flex items-center gap-stack-sm rounded-2xl border border-border bg-secondary/40 px-stack-sm py-2"
            >
              <span
                aria-hidden
                className="flex size-7 shrink-0 items-center justify-center rounded-pill bg-[color:var(--tile-hue)] text-caption font-black leading-none text-cocoa"
              >
                {entry.rank}
              </span>
              <span className="min-w-0 flex-1 truncate text-body font-bold leading-body text-foreground">
                {entry.name}
              </span>
              <span className="shrink-0 text-body font-black leading-body text-primary">
                {entry.value}
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-body font-medium text-muted-foreground">
          Nog geen antwoorden voor deze categorie.
        </p>
      )}
    </article>
  );
}
