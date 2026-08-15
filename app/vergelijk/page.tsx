import type { Metadata } from "next";

import { CompareView, getComparePeople } from "@/components/compare";

/**
 * The compare view (BORREL-4.8): the /vergelijk side-by-side lookup. A server
 * component that precomputes every respondent — their borrel-type, their
 * deviation from the Average Kompaan (score + key divergences, BORREL-4.3) and
 * their answers aligned per question — at build/server time via
 * `getComparePeople()` (no runtime fetch, no DB) and embeds the dataset into the
 * client selector, which handles only the multi-select interaction. Real names
 * are shown openly (locked decision).
 */
export const metadata: Metadata = {
  title: "Vergelijk",
  description:
    "Zet meerdere Kompanen naast elkaar: hun borrel-type, hun afwijking van de gemiddelde Kompaan en al hun antwoorden per vraag vergeleken.",
};

export default function VergelijkPage() {
  const people = getComparePeople();

  return (
    <div className="mx-auto w-full max-w-6xl px-stack-md py-stack-lg">
      <CompareView people={people} />
    </div>
  );
}
