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
    <header className="sticky top-0 z-50 border-b-[5px] border-[#ffd45e] bg-[#1a1120]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-stack-sm px-stack-md py-2">
        <Link
          href="/"
          className="group inline-flex min-h-tap items-center gap-2 focus-visible:outline-none"
        >
          <span
            aria-hidden
            className="inline-block size-8 shrink-0 rounded-md border-[3px] border-[#1a1120] bg-[#ff3d6e]"
            style={{ boxShadow: "3px 3px 0 #ffd45e" }}
          />
          <span
            className="text-4xl uppercase leading-none text-[#ffd45e]"
            style={{
              fontFamily: "var(--font-display), Impact, sans-serif",
              WebkitTextStroke: "1.5px #1a1120",
              letterSpacing: "0.03em",
            }}
          >
            Borrel 35
          </span>
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
