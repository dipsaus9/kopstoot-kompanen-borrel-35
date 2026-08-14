/**
 * The showcase quote strip (BORREL-3.6).
 *
 * Presentational only: renders the precomputed {@link ShowcaseQuote}s — the three
 * free-text answers (kompaanIfSentence, ultimateKompaanTrait, heightRemark) — as
 * a strip of attributed quote cards with real names. These questions are
 * showcase-only and are never clustered; here they are simply celebrated in the
 * club's own words. Data is embedded at build time by the server page.
 */

import type { ShowcaseQuote } from "./leaderboards";

export interface QuoteStripProps {
  /** The precomputed showcase quotes to render. */
  readonly quotes: readonly ShowcaseQuote[];
}

export function QuoteStrip({ quotes }: QuoteStripProps) {
  if (quotes.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-stack-md sm:grid-cols-2 lg:grid-cols-3">
      {quotes.map((quote) => (
        <figure
          key={quote.id}
          className="flex flex-col gap-stack-sm rounded-3xl border border-border bg-card p-stack-md shadow-sm"
        >
          <figcaption className="flex items-center gap-2 text-caption font-bold tracking-eyebrow text-muted-foreground uppercase">
            <span aria-hidden className="text-body-lg leading-none">
              {quote.emoji}
            </span>
            {quote.label}
          </figcaption>
          <blockquote className="text-body-lg font-medium leading-body text-foreground text-pretty">
            “{quote.text}”
          </blockquote>
          <p className="text-caption font-black tracking-eyebrow text-primary uppercase">
            — {quote.author}
          </p>
        </figure>
      ))}
    </div>
  );
}
