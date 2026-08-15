import Link from "next/link";

import { SiteNav } from "./site-nav";

/**
 * The themed global site header in the graffiti/anime voice: a sticker giraffe
 * mark + loud wordmark, a thick ink underline, and the primary-route navigation
 * (collapsible on mobile). Sticks to the top and consumes the BORREL-4.1 design
 * tokens.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-[var(--brand-cocoa-deep)] bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-stack-sm px-stack-md py-stack-sm">
        <Link
          href="/"
          className="group inline-flex min-h-tap items-center gap-stack-sm rounded-pill focus-visible:outline-none"
        >
          <span
            aria-hidden
            className="inline-block size-7 shrink-0 rounded-pill giraffe-spots ink-outline transition-transform group-hover:-rotate-6 group-hover:scale-110"
          />
          <span className="text-title font-black uppercase tracking-heading text-foreground">
            Borrel 35
          </span>
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
