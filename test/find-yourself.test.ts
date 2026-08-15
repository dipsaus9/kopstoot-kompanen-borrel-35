import { describe, expect, it } from "vitest";

import { getFindYourselfPeople } from "@/components/find-yourself";
import { computeMatch, resolveArchetype } from "@/lib/aggregate";
import { getResponses } from "@/lib/data";

describe("getFindYourselfPeople", () => {
  const people = getFindYourselfPeople();
  const responses = getResponses();

  it("builds one person per committed response, in dataset order", () => {
    expect(people).toHaveLength(responses.length);
    people.forEach((person, index) => {
      expect(person.id).toBe(`p${index}`);
      expect(person.name).toBe(responses[index].name);
    });
  });

  it("keeps ids unique even when names repeat", () => {
    const ids = new Set(people.map((p) => p.id));
    expect(ids.size).toBe(people.length);
  });

  it("carries the % gemiddelde Kompaan match from the aggregation library", () => {
    people.forEach((person, index) => {
      const expected = computeMatch(responses[index]);
      expect(person.match.score).toBe(expected.score);
      expect(person.match.score).toBeGreaterThanOrEqual(0);
      expect(person.match.score).toBeLessThanOrEqual(100);
      expect(person.match.matched).toHaveLength(expected.matched.length);
      expect(person.match.matchedCount).toBe(expected.matchedCount);
    });
  });

  it("resolves each archetype and deep-links it into the typetjes gallery", () => {
    people.forEach((person, index) => {
      const archetype = resolveArchetype(responses[index]);
      expect(person.archetype.id).toBe(archetype.id);
      expect(person.archetype.name).toBe(archetype.name);
      expect(person.archetype.href).toBe(`/typetjes/${archetype.id}`);
      expect(person.archetype.emoji.length).toBeGreaterThan(0);
      expect(person.archetype.hueVar).toMatch(/^--brand-/);
    });
  });

  it("embeds the person's own headline stats and curated answers", () => {
    const [first] = people;
    expect(first.stats.map((s) => s.key)).toEqual([
      "age",
      "heightCm",
      "borrelCount",
    ]);
    expect(first.stats.every((s) => /^\d+$/.test(s.value))).toBe(true);
    expect(first.answers.length).toBeGreaterThan(0);
    // Every embedded answer is this person's verbatim response value.
    for (const answer of first.answers) {
      expect(answer.value).toBe(String(responses[0][answer.key]));
    }
  });
});
