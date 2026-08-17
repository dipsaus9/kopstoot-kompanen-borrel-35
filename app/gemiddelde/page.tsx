import type { Metadata } from "next";

import { AverageProfile, MostAverage } from "@/components/profile";
import { GraffitiHero } from "@/components/proof/graffiti-hero";
import { getAggregate, getAverageRanking } from "@/lib/aggregate";

/**
 * The average-Kompaan view (BORREL-4.7): the Average Kompaan profile — "Jan
 * Kompaan Modaal" — moved here off the homepage, plus the reveal of the single
 * most-average Kompaan of all and a short closest-to-average ranking. A server
 * component that reads the survey aggregate and the most-average ranking at
 * build/server time via `getAggregate()` / `getAverageRanking()` (no runtime
 * fetch, no client data) and renders them as playful giraffe tiles.
 */
export const metadata: Metadata = {
  title: "Het gemiddelde",
  description:
    "Het gemiddelde Borrel 35-profiel — Jan Kompaan Modaal: gemiddelde leeftijd, lengte en borrelteller, de meest gekozen antwoorden, en wie van alle Kompanen het meest gemiddeld is.",
};

export default async function GemiddeldePage() {
  const aggregate = await getAggregate();
  const ranking = await getAverageRanking();

  return (
    <>
      <GraffitiHero eyebrow="Het gemiddelde" title="Jan Kompaan Modaal" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-stack-xl px-stack-md py-stack-lg">
        <AverageProfile aggregate={aggregate} />
        <MostAverage ranking={ranking} />
      </div>
    </>
  );
}
