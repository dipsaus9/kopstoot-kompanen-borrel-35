import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getArchetypeGallery,
  type ArchetypeGalleryEntry,
} from "@/components/archetypes";
import { ARCHETYPES } from "@/content/archetypes";
import { TypePage } from "@/components/type-page";

/**
 * The per-type page (BORREL-4.6) — the centerpiece of the rebrand.
 *
 * A dynamic route that renders ONE Kompaan _type_ per slug, dressed entirely in
 * that type's own sub-theme (BORREL-4.2). All six slugs are statically generated
 * at build time via {@link generateStaticParams}; an unknown slug falls through
 * to `notFound()` (a 404). Everything is resolved at build/server time via
 * `getArchetypeGallery()` (no runtime fetch, no client data): the archetype's
 * full written identity, its defining traits, an image slot, and the LIST OF
 * MEMBERS with that type, all handed to the presentational {@link TypePage}.
 */

type TypePageRouteParams = {
  readonly slug: string;
};

/** Look up one type's live gallery entry by slug (nearest-centroid members). */
async function entryForSlug(
  slug: string,
): Promise<ArchetypeGalleryEntry | undefined> {
  const entries = await getArchetypeGallery();
  return entries.find((entry) => entry.archetype.id === slug);
}

/** Statically generate every known type slug (unknown slugs 404 at request). */
export function generateStaticParams(): TypePageRouteParams[] {
  return ARCHETYPES.map((archetype) => ({ slug: archetype.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<TypePageRouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await entryForSlug(slug);

  if (!entry) {
    return { title: "Type niet gevonden" };
  }

  const { archetype } = entry;
  return {
    title: archetype.name,
    description: archetype.description,
  };
}

export default async function TypeSlugPage({
  params,
}: {
  params: Promise<TypePageRouteParams>;
}) {
  const { slug } = await params;
  const entry = await entryForSlug(slug);

  if (!entry) {
    notFound();
  }

  return <TypePage entry={entry} />;
}
