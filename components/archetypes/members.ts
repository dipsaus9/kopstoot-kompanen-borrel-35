/**
 * Build-time member resolution for the archetypes gallery (BORREL-3.4).
 *
 * Joins the six human-named {@link Archetype}s (`content/archetypes`) to the
 * frozen cluster assignments in `scripts/archetypes/archetypes.json`:
 *
 *   ARCHETYPES.sourceClusterId ──▶ assignment.cluster ──▶ member names
 *
 * The assignments are pre-computed by the clustering step
 * (`scripts/archetypes/cluster.ts`, BORREL-2.5) and read here at build/server
 * time only — no runtime fetch, no browser access. Each entry also carries its
 * presentation accent: the BORREL-2.3 brand hue token (see
 * `app/theme/tokens.css`, one accent per archetype family) and a playful badge
 * emoji. Names are rendered verbatim from the mock dataset, so duplicates are
 * kept as-is: the member *count* equals the source cluster size.
 */

import archetypeData from "@/scripts/archetypes/archetypes.json";
import { ARCHETYPES, type Archetype } from "@/content/archetypes";

interface Assignment {
  readonly index: number;
  readonly name: string;
  readonly cluster: number;
}

const ASSIGNMENTS = archetypeData.assignments as readonly Assignment[];

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

/** Group every assignment's name under its cluster id. */
function membersByCluster(): Map<number, string[]> {
  const byCluster = new Map<number, string[]>();
  for (const assignment of ASSIGNMENTS) {
    const list = byCluster.get(assignment.cluster) ?? [];
    list.push(assignment.name);
    byCluster.set(assignment.cluster, list);
  }
  return byCluster;
}

/**
 * The six archetypes, in content order, each resolved to its member count/list
 * (via `sourceClusterId`) and accent. Build/server-time only.
 */
export function getArchetypeGallery(): readonly ArchetypeGalleryEntry[] {
  const byCluster = membersByCluster();
  return ARCHETYPES.map((archetype) => {
    const members = byCluster.get(archetype.sourceClusterId) ?? [];
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
