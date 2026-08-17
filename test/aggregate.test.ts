import { beforeAll, describe, expect, it } from "vitest";

import {
  aggregateResponses,
  getAggregate,
  MODAL_FIELDS,
  matchAgainst,
  computeMatch,
  MATCH_FIELDS,
  resolveArchetype,
} from "@/lib/aggregate";
import { getResponses, QUESTIONS } from "@/lib/data";
import type { SurveyResponse } from "@/lib/data";
import type { QuestionField } from "@/lib/data/schema";
import { ARCHETYPES } from "@/content/archetypes";
import archetypeData from "@/scripts/archetypes/archetypes.json";

/** Build a valid response, defaulting every closed answer to its first option. */
function makeResponse(overrides: Partial<SurveyResponse> = {}): SurveyResponse {
  const base = {} as Record<string, unknown>;
  for (const q of QUESTIONS as readonly QuestionField[]) {
    if (q.type === "number") base[q.key] = q.min;
    else if (q.type === "single") base[q.key] = q.options[0];
    else base[q.key] = `${q.key} text`;
  }
  return { ...(base as unknown as SurveyResponse), ...overrides };
}

// Warm the async dataset cache once so the synchronous accessors used below
// (getResponses cache peek via resolveArchetype) have data to read.
beforeAll(async () => {
  await getResponses();
});

describe("getAggregate", () => {
  it("returns the arithmetic mean for age, heightCm and borrelCount", () => {
    const responses = [
      makeResponse({ age: 30, heightCm: 180, borrelCount: 10 }),
      makeResponse({ age: 40, heightCm: 200, borrelCount: 20 }),
    ];

    const { means, count } = aggregateResponses(responses);

    expect(count).toBe(2);
    expect(means.age).toBe(35);
    expect(means.heightCm).toBe(190);
    expect(means.borrelCount).toBe(15);
  });

  it("returns the modal answer for each closed stat/cluster question", () => {
    // borrelRole is a closed cluster question; make one option a strict majority.
    const responses = [
      makeResponse({ borrelRole: "De organisator" }),
      makeResponse({ borrelRole: "De organisator" }),
      makeResponse({ borrelRole: "De sociale butterfly" }),
    ];

    const { modes } = aggregateResponses(responses);
    const role = modes.borrelRole;

    expect(role).toBeDefined();
    expect(role?.option).toBe("De organisator");
    expect(role?.count).toBe(2);
    expect(role?.share).toBeCloseTo(2 / 3);
  });

  it("covers every closed stat/cluster question and no open/number one", async () => {
    const { modes } = await getAggregate();

    for (const field of MODAL_FIELDS) {
      expect(modes[field.key]).toBeDefined();
    }
    // Free-text showcase questions and numeric stats carry no modal answer.
    expect(modes.name).toBeUndefined();
    expect(modes.kompaanIfSentence).toBeUndefined();
    expect(modes.age).toBeUndefined();
  });

  it("modal option is the true most-frequent option on the real dataset", async () => {
    const responses = await getResponses();
    const { modes } = await getAggregate();

    for (const field of MODAL_FIELDS) {
      const counts = new Map<string, number>();
      for (const r of responses) {
        const v = String(r[field.key]);
        counts.set(v, (counts.get(v) ?? 0) + 1);
      }
      const modal = modes[field.key];
      expect(modal).toBeDefined();
      const max = Math.max(...counts.values());
      expect(modal?.count).toBe(max);
      expect(counts.get(modal!.option)).toBe(max);
      expect(field.options).toContain(modal?.option);
    }
  });
});

describe("computeMatch", () => {
  it("scores 100 with every trait when the response equals the aggregate", async () => {
    const aggregate = await getAggregate();

    // Build a response whose every tracked answer is the modal answer.
    const overrides: Partial<SurveyResponse> = {};
    for (const field of MATCH_FIELDS) {
      (overrides as Record<string, unknown>)[field.key] =
        aggregate.modes[field.key]!.option;
    }
    const twin = makeResponse(overrides);

    const result = matchAgainst(twin, aggregate);

    expect(result.total).toBe(MATCH_FIELDS.length);
    expect(result.matchedCount).toBe(MATCH_FIELDS.length);
    expect(result.score).toBe(100);
    expect(result.matched).toHaveLength(MATCH_FIELDS.length);
    expect(result.matched[0]).toMatchObject({
      key: MATCH_FIELDS[0].key,
      label: MATCH_FIELDS[0].label,
    });
  });

  it("scores 0 when the response matches none of the modal answers", async () => {
    const aggregate = await getAggregate();

    // Pick, per tracked field, an option that is NOT the modal one.
    const overrides: Partial<SurveyResponse> = {};
    for (const field of MATCH_FIELDS) {
      const modal = aggregate.modes[field.key]!.option;
      const other = field.options.find((o) => o !== modal) ?? modal;
      (overrides as Record<string, unknown>)[field.key] = other;
    }
    const opposite = makeResponse(overrides);

    const result = matchAgainst(opposite, aggregate);

    // Every tracked field offers at least two options, so a non-modal choice is
    // always available and always differs — nothing matches.
    expect(result.score).toBe(0);
    expect(result.matchedCount).toBe(0);
    expect(result.matched).toHaveLength(0);
  });

  it("excludes the RSVP question from the tracked traits", () => {
    expect(MATCH_FIELDS.some((f) => f.key === "rsvp")).toBe(false);
  });

  it("returns a 0-100 integer score for a real response", async () => {
    const [first] = await getResponses();
    const result = computeMatch(first);

    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(Number.isInteger(result.score)).toBe(true);
    expect(result.matched.every((m) => typeof m.value === "string")).toBe(true);
  });
});

describe("resolveArchetype", () => {
  it("resolves a response to its cluster's named archetype", async () => {
    const responses = await getResponses();
    const assignments = archetypeData.assignments as ReadonlyArray<{
      readonly cluster: number;
    }>;

    responses.forEach((response, index) => {
      const archetype = resolveArchetype(response);
      const expected = ARCHETYPES.find(
        (a) => a.sourceClusterId === assignments[index].cluster,
      );
      expect(expected).toBeDefined();
      expect(archetype.id).toBe(expected!.id);
      expect(archetype.sourceClusterId).toBe(assignments[index].cluster);
    });
  });

  it("resolves the first respondent (Gijs, cluster 0) to the park professional", async () => {
    const [gijs] = await getResponses();
    expect(resolveArchetype(gijs).id).toBe("parkborrelprofessional");
  });

  it("assigns any response never in the baked clustering to a fixed type", () => {
    // A freshly built response (a stand-in for a live respondent) has no baked
    // assignment, yet nearest-centroid still maps it onto one of the six fixed
    // archetypes instead of throwing.
    const archetype = resolveArchetype(makeResponse());
    expect(ARCHETYPES).toContainEqual(archetype);
  });
});
