/**
 * A "most-picked fun answer" tile for the Average Kompaan (BORREL-3.3).
 *
 * Presentational only: it shows the modal (most-common) answer to one closed
 * survey question as the Average Kompaan's own choice — phrased as a trait, not
 * a statistic. Deliberately no counts or percentages; the aggregate's numbers
 * become the giraffe's personality.
 */

export interface AnswerTileProps {
  /** Emoji badge matching the question's theme. */
  readonly emoji: string;
  /** Playful caption framing the answer (e.g. "Vaste borrel-drankje"). */
  readonly caption: string;
  /** The verbatim winning option, shown as the Kompaan's answer. */
  readonly answer: string;
}

export function AnswerTile({ emoji, caption, answer }: AnswerTileProps) {
  return (
    <div className="ink-outline flex flex-col gap-stack-xs rounded-2xl bg-card p-stack-md">
      <p className="flex items-center gap-2 text-caption font-bold tracking-eyebrow text-muted-foreground uppercase">
        <span aria-hidden className="text-body-lg leading-none">
          {emoji}
        </span>
        {caption}
      </p>
      <p className="text-lead font-black leading-heading text-foreground text-balance">
        {answer}
      </p>
    </div>
  );
}
