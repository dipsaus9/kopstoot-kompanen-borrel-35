/**
 * The showcase quote slideshow (BORREL-3.6).
 *
 * Renders the precomputed {@link ShowcaseQuote}s — the free-text answers
 * (kompaanIfSentence, heightRemark) — as an auto-advancing carousel of attributed
 * quote cards with real names, one at a time, rather than one long grid. These
 * questions are showcase-only and never clustered; here they are simply
 * celebrated in the club's own words. The quotes are embedded at build time by
 * the server page; only the slideshow itself is interactive, so this is the one
 * client island on the otherwise-static Toppers view.
 *
 * The carousel auto-advances but pauses on hover/focus, honours
 * `prefers-reduced-motion` (no auto-advance), and takes ←/→ keys.
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { ShowcaseQuote } from "./leaderboards";

export interface QuoteStripProps {
  /** The precomputed showcase quotes to render. */
  readonly quotes: readonly ShowcaseQuote[];
}

/** Milliseconds each quote stays on screen before auto-advancing. */
const ADVANCE_MS = 6000;

export function QuoteStrip({ quotes }: QuoteStripProps) {
  const count = quotes.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + count) % count),
    [count],
  );
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  // Keep the index in range if the quote set ever shrinks between renders.
  useEffect(() => {
    setIndex((i) => (i >= count ? 0 : i));
  }, [count]);

  // Auto-advance, unless paused, single-slide, or the visitor prefers less motion.
  useEffect(() => {
    if (count <= 1 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), ADVANCE_MS);
    return () => clearInterval(timer);
  }, [count, paused]);

  if (count === 0) return null;
  const quote = quotes[Math.min(index, count - 1)];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Antwoorden in hun eigen woorden"
      className="flex flex-col gap-stack-md"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") prev();
        else if (event.key === "ArrowRight") next();
      }}
    >
      <div aria-live="polite" aria-atomic="true">
        <figure
          key={quote.id}
          className="sticker flex min-h-[14rem] flex-col justify-center gap-stack-sm rounded-3xl bg-card p-stack-lg text-center"
        >
          <figcaption className="flex items-center justify-center gap-2 text-caption font-bold tracking-eyebrow text-muted-foreground uppercase">
            <span aria-hidden className="text-body-lg leading-none">
              {quote.emoji}
            </span>
            {quote.label}
          </figcaption>
          <blockquote className="text-title font-black leading-heading tracking-heading text-foreground text-balance">
            “{quote.text}”
          </blockquote>
          <p className="text-caption font-black tracking-eyebrow text-primary uppercase">
            — {quote.author}
          </p>
        </figure>
      </div>

      {count > 1 && (
        <div className="flex items-center justify-center gap-stack-md">
          <button
            type="button"
            onClick={prev}
            aria-label="Vorige opmerking"
            className="sticker-sm flex size-11 items-center justify-center rounded-pill bg-card text-foreground transition-transform hover:-translate-y-0.5"
          >
            <ChevronLeft aria-hidden className="size-5" />
          </button>
          <p
            aria-hidden
            className="min-w-16 text-center text-caption font-black tracking-eyebrow text-muted-foreground tabular-nums uppercase"
          >
            {index + 1} / {count}
          </p>
          <button
            type="button"
            onClick={next}
            aria-label="Volgende opmerking"
            className="sticker-sm flex size-11 items-center justify-center rounded-pill bg-card text-foreground transition-transform hover:-translate-y-0.5"
          >
            <ChevronRight aria-hidden className="size-5" />
          </button>
        </div>
      )}
    </section>
  );
}
