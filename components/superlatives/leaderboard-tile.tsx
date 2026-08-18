/**
 * A single superlative leaderboard tile (BORREL-3.6).
 *
 * Presentational only: renders one precomputed {@link Leaderboard} as a playful
 * giraffe card — an emoji-badged header, a one-line blurb and the ranked top-N
 * with real names and their headline value. All data is embedded at build time
 * by the server page; nothing is fetched here.
 *
 * Graffiti/anime look (BORREL-4.9): the whole card wears a die-cut `sticker`
 * (thick ink outline + hard offset shadow); the category's mapped brand hue
 * (BORREL-2.3) is bound to a local `--tile-hue` and used ONLY as decoration on
 * the aria-hidden emoji badge, so text contrast never rides on the
 * light/dark-varying accent. Ranked rows keep the AA-safe paper/ink + neutral
 * `secondary` rank discs used across the rebranded surfaces.
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
      className="sticker flex scroll-mt-32 flex-col gap-stack-md rounded-3xl bg-card p-stack-md"
    >
      <header className="flex items-start gap-stack-sm">
        <span
          aria-hidden
          className="sticker-sm flex size-12 shrink-0 items-center justify-center rounded-pill bg-[color:var(--tile-hue)] text-title leading-none"
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
              className="ink-outline flex items-center gap-stack-sm rounded-2xl bg-secondary/50 px-stack-sm py-2"
            >
              <span
                aria-hidden
                className="flex size-7 shrink-0 items-center justify-center rounded-pill bg-secondary text-caption font-black leading-none text-secondary-foreground"
              >
                {entry.rank}
              </span>
              <span className="min-w-0 flex-1 truncate text-body font-bold leading-body text-foreground">
                {entry.name}
              </span>
              <span className="min-w-0 max-w-[55%] break-words text-right text-body font-black leading-body tabular-nums text-primary">
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
