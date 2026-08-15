import type { Metadata } from "next";

import { ArchetypeGallery, getArchetypeGallery } from "@/components/archetypes";
import { GraffitiHero } from "@/components/proof/graffiti-hero";

/**
 * The typetjes view (BORREL-4.5): a loud graffiti/anime INDEX of the six named
 * Kompaan types. A server component that resolves the archetypes and their
 * member counts at build/server time via `getArchetypeGallery()` (no runtime
 * fetch, no client data). Each tile wears its own type theme and links through
 * to that type's page at `/typetjes/<id>` (per-type route in BORREL-4.6), so the
 * gallery is the jumping-off point for the type-centric site.
 */
export const metadata: Metadata = {
  title: "Typetjes",
  description:
    "De zes borrel-archetypes van Borrel 35 als giraffe-typetjes: naam, kenmerken en de Kompanen die erbij horen.",
};

export default function TypetjesPage() {
  const entries = getArchetypeGallery();

  return (
    <>
      <GraffitiHero eyebrow="De typetjes" title="Welk type ben jij?" />
      <div className="mx-auto w-full max-w-6xl px-stack-md py-stack-lg">
        <ArchetypeGallery entries={entries} />
      </div>
    </>
  );
}
