import type { Metadata } from "next";

import { GraffitiHero } from "@/components/proof/graffiti-hero";
import { SuperlativesView, getSuperlatives } from "@/components/superlatives";

/**
 * The superlatives view (BORREL-3.6): the /superlatieven playful-records page —
 * superlative leaderboards celebrating extremes of the club (tallest, most
 * borrels, head-bump champion, earliest/latest arriver, most-asked "hoe lang ben
 * jij?") plus a showcase strip of the three free-text answers. A server
 * component that computes everything at build/server time via `getSuperlatives()`
 * over `getResponses()` (no runtime fetch, no DB). Real names are shown openly
 * (locked decision): the club is the star, not the statistics.
 */
export const metadata: Metadata = {
  title: "Superlatieven",
  description:
    "De uitschieters en records van Borrel 35: de langste, de vroegste, de fanatiekste hoofdstoter en de mooiste antwoorden — met echte namen.",
};

export default function SuperlatievenPage() {
  const superlatives = getSuperlatives();

  return (
    <>
      <GraffitiHero eyebrow="Records" title="Superlatieven" />
      <div className="mx-auto w-full max-w-6xl px-stack-md py-stack-lg">
        <SuperlativesView superlatives={superlatives} />
      </div>
    </>
  );
}
