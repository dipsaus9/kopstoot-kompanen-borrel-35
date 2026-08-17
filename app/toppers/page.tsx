import type { Metadata } from "next";

import { GraffitiHero } from "@/components/proof/graffiti-hero";
import { SuperlativesView, getSuperlatives } from "@/components/superlatives";

/**
 * The "Toppers" view (was /superlatieven): playful records — leaderboards
 * celebrating extremes of the club (tallest, most borrels, head-bump champion,
 * earliest/latest arriver, most-asked "hoe lang ben jij?") plus a showcase strip
 * of the free-text answers. A server component that computes everything at
 * build/server time via `getSuperlatives()` over `getResponses()` (no runtime
 * fetch, no DB). Real names shown openly (locked decision).
 */
export const metadata: Metadata = {
  title: "Toppers",
  description:
    "De uitschieters en records van Borrel 35: de langste, de vroegste, de fanatiekste hoofdstoter en de mooiste antwoorden — met echte namen.",
};

export default async function ToppersPage() {
  const superlatives = await getSuperlatives();

  return (
    <>
      <GraffitiHero eyebrow="Records & ranglijsten" title="Toppers" />
      <div className="mx-auto w-full max-w-6xl px-stack-md py-stack-lg">
        <SuperlativesView superlatives={superlatives} />
      </div>
    </>
  );
}
