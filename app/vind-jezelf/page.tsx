import type { Metadata } from "next";

import { FindYourself, getFindYourselfPeople } from "@/components/find-yourself";
import { GraffitiHero } from "@/components/proof/graffiti-hero";

/**
 * The find-yourself view (BORREL-3.5): the /vind-jezelf personal lookup. A
 * server component that precomputes every respondent's card — their answers,
 * their "% gemiddelde Kompaan" match and their archetype badge — at build/server
 * time via `getFindYourselfPeople()` (no runtime fetch, no DB) and embeds the
 * dataset into the client selector, which handles only the name-picking
 * interaction. Real names are shown openly (locked decision).
 */
export const metadata: Metadata = {
  title: "Vind jezelf",
  description:
    "Vind jezelf terug in Borrel 35: zoek je naam, zie je % gemiddelde Kompaan, de antwoorden die je met de groep deelt en jouw borrel-archetype.",
};

export default function VindJezelfPage() {
  const people = getFindYourselfPeople();

  return (
    <>
      <GraffitiHero eyebrow="Vind jezelf" title="Vind jezelf terug" />
      <div className="mx-auto w-full max-w-6xl px-stack-md py-stack-lg">
        <FindYourself people={people} />
      </div>
    </>
  );
}
