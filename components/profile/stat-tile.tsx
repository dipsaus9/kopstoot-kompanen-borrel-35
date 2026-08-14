/**
 * A single oversized numeric stat tile for the Average Kompaan (BORREL-3.3).
 *
 * Presentational only: it receives an already-formatted value and unit and
 * renders them as a big, playful giraffe-gold number with an emoji badge and a
 * caption. No data access, no percentages — just the headline figure.
 */

export interface StatTileProps {
  /** Emoji badge that gives the tile its playful giraffe character. */
  readonly emoji: string;
  /** The headline figure, already rounded/formatted (e.g. "35"). */
  readonly value: string;
  /** Trailing unit shown small next to the value (e.g. "jaar", "cm"). */
  readonly unit: string;
  /** Short caption naming what the number is. */
  readonly label: string;
}

export function StatTile({ emoji, value, unit, label }: StatTileProps) {
  return (
    <div className="flex flex-col gap-stack-xs rounded-3xl border border-border bg-card p-stack-md shadow-sm">
      <span aria-hidden className="text-headline leading-none">
        {emoji}
      </span>
      <p className="flex items-baseline gap-1.5">
        <span className="text-display-sm font-black leading-display tracking-display text-primary">
          {value}
        </span>
        <span className="text-lead font-bold text-muted-foreground">
          {unit}
        </span>
      </p>
      <p className="text-caption font-bold tracking-eyebrow text-muted-foreground uppercase">
        {label}
      </p>
    </div>
  );
}
