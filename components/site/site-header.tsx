import Link from "next/link";

import { SiteNav } from "./site-nav";

/**
 * The themed global site header: giraffe wordmark + the four-view navigation.
 * Sticks to the top and shares the BORREL-2.3 design-system tokens.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-stack-sm px-stack-md py-stack-sm">
        <Link
          href="/"
          className="group inline-flex items-baseline gap-2 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 rounded-md"
        >
          <span
            aria-hidden
            className="inline-block size-3 rounded-full bg-primary transition-transform group-hover:scale-125"
          />
          <span className="text-title font-black tracking-heading text-foreground">
            Borrel 35
          </span>
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
