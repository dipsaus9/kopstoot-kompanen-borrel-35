import type { Metadata } from "next";

import { ArchetypeGallery, getArchetypeGallery } from "@/components/archetypes";

/**
 * The typetjes view (BORREL-3.4): a gallery of the six named Kompaan archetypes
 * as giraffe-voiced character cards. A server component that resolves the
 * archetypes and their members at build/server time via `getArchetypeGallery()`
 * (no runtime fetch, no client data). Each card is individually deep-linkable —
 * the target the find-yourself archetype badge points into.
 */
export const metadata: Metadata = {
  title: "Typetjes",
  description:
    "De zes borrel-archetypes van Borrel 35 als giraffe-typetjes: naam, kenmerken en de Kompanen die erbij horen.",
};

export default function TypetjesPage() {
  const entries = getArchetypeGallery();

  return (
    <div className="mx-auto w-full max-w-6xl px-stack-md py-stack-lg">
      <ArchetypeGallery entries={entries} />
    </div>
  );
}
