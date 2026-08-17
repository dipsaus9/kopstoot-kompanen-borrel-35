/**
 * Member resolution for the archetypes gallery (BORREL-3.4, BORREL-5.3).
 *
 * Joins the six human-named {@link Archetype}s (`content/archetypes`) to the
 * LIVE respondents, assigning each live answer to its nearest fixed type
 * centroid via {@link resolveArchetype}:
 *
 *   response ──resolveArchetype──▶ Archetype.id ──▶ member names
 *
 * Reads `getResponses()` (the live sheet, with mock fallback) at build/server
 * time only — no client fetch, no browser access. Each entry also carries its
 * presentation accent: the BORREL-2.3 brand hue token (see `app/theme/tokens.css`,
 * one accent per archetype family) and a playful badge emoji. Names are rendered
 * verbatim, so duplicates are kept as-is: the member *count* equals the number
 * of live respondents nearest to that type.
 */

import { getResponses } from "@/lib/data";
import { resolveArchetype } from "@/lib/aggregate";
import { ARCHETYPES, type Archetype } from "@/content/archetypes";

/** Per-archetype accent: a raw BORREL-2.3 brand hue token + a badge emoji. */
interface ArchetypePresentation {
  /** CSS custom-property name of the mapped brand hue (from tokens.css). */
  readonly hueVar: string;
  /** Playful badge emoji echoing the archetype's character. */
  readonly emoji: string;
}

/**
 * Accent per archetype id. Hues mirror the "one accent per archetype family"
 * mapping documented in `app/theme/tokens.css` (park-green is shared by the two
 * natuur archetypes by design).
 */
const PRESENTATION: Readonly<Record<string, ArchetypePresentation>> = {
  parkborrelprofessional: { hueVar: "--brand-park", emoji: "🌳" },
  "festival-flamingo": { hueVar: "--brand-flamingo", emoji: "🦩" },
  "salmari-soldaat": { hueVar: "--brand-liquorice", emoji: "🖤" },
  "lange-nachtbraker": { hueVar: "--brand-night", emoji: "🌙" },
  "verantwoordelijke-kompaan": { hueVar: "--brand-park", emoji: "🏡" },
  "bedtijd-baron": { hueVar: "--brand-wine", emoji: "🛏️" },
};

/** Giraffe-gold fallback, should an archetype id ever lack an accent. */
const FALLBACK: ArchetypePresentation = {
  hueVar: "--brand-giraffe",
  emoji: "🦒",
};

/** One archetype resolved to its members and presentation accent. */
export interface ArchetypeGalleryEntry {
  /** The named archetype (name, description, defining traits). */
  readonly archetype: Archetype;
  /** How many members its source cluster holds. */
  readonly memberCount: number;
  /** The member names, verbatim from the cluster assignments. */
  readonly members: readonly string[];
  /** CSS var of the mapped brand hue, e.g. `--brand-park`. */
  readonly hueVar: string;
  /** Playful badge emoji. */
  readonly emoji: string;
}

/** Group every live respondent's name under the archetype id it is nearest to. */
async function membersByArchetype(): Promise<Map<string, string[]>> {
  const responses = await getResponses();
  const byArchetype = new Map<string, string[]>();
  for (const response of responses) {
    const { id } = resolveArchetype(response);
    const list = byArchetype.get(id) ?? [];
    list.push(response.name);
    byArchetype.set(id, list);
  }
  return byArchetype;
}

/**
 * The six archetypes, in content order, each resolved to its live member
 * count/list (nearest-centroid over `getResponses()`) and accent.
 * Build/server-time only.
 */
export async function getArchetypeGallery(): Promise<
  readonly ArchetypeGalleryEntry[]
> {
  const byArchetype = await membersByArchetype();
  return ARCHETYPES.map((archetype) => {
    const members = byArchetype.get(archetype.id) ?? [];
    const presentation = PRESENTATION[archetype.id] ?? FALLBACK;
    return {
      archetype,
      memberCount: members.length,
      members,
      hueVar: presentation.hueVar,
      emoji: presentation.emoji,
    };
  });
}
