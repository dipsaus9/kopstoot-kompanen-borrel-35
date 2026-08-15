import { describe, expect, it } from "vitest";

import {
  computeDeviation,
  deviationAgainst,
  getAverageRanking,
  rankByAverage,
  getAggregate,
  matchAgainst,
  MATCH_FIELDS,
} from "@/lib/aggregate";
import { getResponses, QUESTIONS } from "@/lib/data";
import type { SurveyResponse } from "@/lib/data";
import type { QuestionField } from "@/lib/data/schema";

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

/** A response whose every tracked answer equals the modal answer (100% match). */
function makeTwin(aggregate = getAggregate()): SurveyResponse {
  const overrides: Partial<SurveyResponse> = {};
  for (const field of MATCH_FIELDS) {
    (overrides as Record<string, unknown>)[field.key] =
      aggregate.modes[field.key]!.option;
  }
  return makeResponse(overrides);
}

/** A response that diverges from the modal answer on every tracked field. */
function makeOpposite(aggregate = getAggregate()): SurveyResponse {
  const overrides: Partial<SurveyResponse> = {};
  for (const field of MATCH_FIELDS) {
    const modal = aggregate.modes[field.key]!.option;
    const other = field.options.find((o) => o !== modal) ?? modal;
    (overrides as Record<string, unknown>)[field.key] = other;
  }
  return makeResponse(overrides);
}

describe("computeDeviation", () => {
  it("scores 0 with no divergent traits when the response equals the aggregate", () => {
    const aggregate = getAggregate();
    const result = deviationAgainst(makeTwin(aggregate), aggregate);

    expect(result.match).toBe(100);
    expect(result.score).toBe(0);
    expect(result.divergentCount).toBe(0);
    expect(result.divergent).toHaveLength(0);
    expect(result.total).toBe(MATCH_FIELDS.length);
  });

  it("scores 100 and diverges on every tracked field for the opposite response", () => {
    const aggregate = getAggregate();
    const result = deviationAgainst(makeOpposite(aggregate), aggregate);

    expect(result.match).toBe(0);
    expect(result.score).toBe(100);
    expect(result.divergentCount).toBe(MATCH_FIELDS.length);
    expect(result.divergent).toHaveLength(MATCH_FIELDS.length);
  });

  it("is exactly the mirror of the match score (score = 100 - match)", () => {
    for (const response of getResponses()) {
      const deviation = computeDeviation(response);
      const match = matchAgainst(response, getAggregate());
      expect(deviation.match).toBe(match.score);
      expect(deviation.score).toBe(100 - match.score);
      expect(deviation.divergentCount).toBe(match.total - match.matchedCount);
    }
  });

  it("lists only modal answers the person does not share, with their own value", () => {
    const aggregate = getAggregate();
    // Take a twin (all modal) and flip exactly one tracked field off-modal.
    const field = MATCH_FIELDS[0];
    const modal = aggregate.modes[field.key]!.option;
    const other = field.options.find((o) => o !== modal)!;
    const response = makeTwin(aggregate);
    (response as unknown as Record<string, unknown>)[field.key] = other;

    const result = deviationAgainst(response, aggregate);

    expect(result.divergentCount).toBe(1);
    const [trait] = result.divergent;
    expect(trait.key).toBe(field.key);
    expect(trait.value).toBe(other);
    expect(trait.modal).toBe(modal);
    expect(trait.value).not.toBe(trait.modal);
    expect(trait.modalShare).toBe(aggregate.modes[field.key]!.share);
  });

  it("orders divergent traits most-different first (by modal share desc)", () => {
    const result = computeDeviation(makeOpposite());
    for (let i = 1; i < result.divergent.length; i++) {
      expect(result.divergent[i - 1].modalShare).toBeGreaterThanOrEqual(
        result.divergent[i].modalShare,
      );
    }
  });

  it("returns 0-100 integer scores for every real response", () => {
    for (const response of getResponses()) {
      const { score } = computeDeviation(response);
      expect(Number.isInteger(score)).toBe(true);
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    }
  });
});

describe("getAverageRanking", () => {
  it("ranks one person per response, most average first", () => {
    const ranking = getAverageRanking();
    const responses = getResponses();

    expect(ranking.people).toHaveLength(responses.length);
    for (let i = 1; i < ranking.people.length; i++) {
      // Non-increasing match == non-decreasing deviation.
      expect(ranking.people[i - 1].match).toBeGreaterThanOrEqual(
        ranking.people[i].match,
      );
      expect(ranking.people[i - 1].deviation).toBeLessThanOrEqual(
        ranking.people[i].deviation,
      );
    }
  });

  it("assigns dense 1-based ranks and exposes the most-average person", () => {
    const ranking = getAverageRanking();

    ranking.people.forEach((person, position) => {
      expect(person.rank).toBe(position + 1);
      expect(person.deviation).toBe(100 - person.match);
    });
    expect(ranking.mostAverage).toEqual(ranking.people[0]);
    expect(ranking.mostAverage?.rank).toBe(1);
    // The most-average person truly has the maximum match of the dataset.
    const maxMatch = Math.max(...ranking.people.map((p) => p.match));
    expect(ranking.mostAverage?.match).toBe(maxMatch);
  });

  it("puts a perfect twin at the top and the opposite at the bottom", () => {
    const aggregate = getAggregate();
    const responses = [
      makeOpposite(aggregate),
      makeResponse(), // partial
      makeTwin(aggregate),
    ];

    const ranking = rankByAverage(responses, aggregate);

    expect(ranking.mostAverage?.index).toBe(2); // the twin
    expect(ranking.mostAverage?.match).toBe(100);
    expect(ranking.people[ranking.people.length - 1].match).toBe(0); // opposite
  });

  it("breaks ties deterministically on dataset index", () => {
    const aggregate = getAggregate();
    // Three identical twins → equal match; order must follow original index.
    const responses = [makeTwin(aggregate), makeTwin(aggregate), makeTwin(aggregate)];

    const ranking = rankByAverage(responses, aggregate);

    expect(ranking.people.map((p) => p.index)).toEqual([0, 1, 2]);
    expect(ranking.people.map((p) => p.rank)).toEqual([1, 2, 3]);
  });

  it("handles an empty dataset with a null most-average", () => {
    const ranking = rankByAverage([], getAggregate());
    expect(ranking.people).toHaveLength(0);
    expect(ranking.mostAverage).toBeNull();
  });

  it("is deterministic across repeated calls", () => {
    expect(getAverageRanking()).toEqual(getAverageRanking());
  });
});
