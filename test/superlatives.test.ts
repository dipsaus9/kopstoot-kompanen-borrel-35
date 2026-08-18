import { beforeAll, describe, expect, it } from "vitest";

import { getSuperlatives } from "@/components/superlatives";
import { getResponses } from "@/lib/data";

describe("getSuperlatives", () => {
  let superlatives: Awaited<ReturnType<typeof getSuperlatives>>;
  let responses: Awaited<ReturnType<typeof getResponses>>;

  beforeAll(async () => {
    superlatives = await getSuperlatives();
    responses = await getResponses();
  });

  it("reports the response count it is drawn from", () => {
    expect(superlatives.count).toBe(responses.length);
  });

  it("builds a curated set of non-empty leaderboards with real names", () => {
    expect(superlatives.leaderboards.length).toBeGreaterThanOrEqual(4);
    const ids = new Set(superlatives.leaderboards.map((b) => b.id));
    expect(ids.size).toBe(superlatives.leaderboards.length);

    const names = new Set(responses.map((r) => r.name));
    for (const board of superlatives.leaderboards) {
      expect(board.entries.length).toBeGreaterThan(0);
      expect(board.entries.length).toBeLessThanOrEqual(5);
      expect(board.hueVar).toMatch(/^--brand-/);
      board.entries.forEach((entry) => {
        expect(names.has(entry.name)).toBe(true);
        expect(entry.value.length).toBeGreaterThan(0);
      });
    }
  });

  it("ranks each leaderboard 1..N with sequential ranks", () => {
    for (const board of superlatives.leaderboards) {
      board.entries.forEach((entry, index) => {
        expect(entry.rank).toBe(index + 1);
      });
    }
  });

  it("ranks the tallest board by descending height", () => {
    const tallest = superlatives.leaderboards.find((b) => b.id === "langste");
    expect(tallest).toBeDefined();
    const maxHeight = Math.max(...responses.map((r) => Math.round(r.heightCm)));
    expect(tallest?.entries[0].value).toBe(`${maxHeight} cm`);
  });

  it("ranks the most-borrels board by descending borrel count", () => {
    const board = superlatives.leaderboards.find(
      (b) => b.id === "meeste-borrels",
    );
    expect(board).toBeDefined();
    const maxBorrels = Math.max(
      ...responses.map((r) => Math.round(r.borrelCount)),
    );
    expect(board?.entries[0].value).toBe(`${maxBorrels} borrels`);
  });

  it("showcases the three open-answer questions with attributed quotes", () => {
    expect(superlatives.quotes.length).toBeGreaterThan(0);
    const ids = new Set(superlatives.quotes.map((q) => q.id));
    expect(ids.size).toBe(superlatives.quotes.length);

    const names = new Set(responses.map((r) => r.name));
    for (const quote of superlatives.quotes) {
      expect(quote.text.length).toBeGreaterThan(0);
      expect(names.has(quote.author)).toBe(true);
    }

    // Every surfaced showcase question that has any non-empty answer is
    // represented. `ultimateKompaanTrait` is intentionally NOT surfaced (the form
    // has no such question), so it is excluded here.
    const showcaseKeys = ["kompaanIfSentence", "heightRemark"] as const;
    for (const key of showcaseKeys) {
      const hasAnswer = responses.some((r) => String(r[key]).trim() !== "");
      if (hasAnswer) {
        expect(superlatives.quotes.some((q) => q.id.startsWith(key))).toBe(true);
      }
    }
  });

  it("includes every non-empty showcase answer (no per-question cap)", () => {
    const showcaseKeys = ["kompaanIfSentence", "heightRemark"] as const;
    const nonEmpty = showcaseKeys.reduce(
      (total, key) =>
        total + responses.filter((r) => String(r[key]).trim() !== "").length,
      0,
    );
    expect(superlatives.quotes.length).toBe(nonEmpty);
  });

  it("surfaces the newest respondents first (so new answers appear)", () => {
    const key = "kompaanIfSentence";
    // The live sheet appends new rows, so the newest answer is the last one.
    const newestWithAnswer = [...responses]
      .reverse()
      .find((r) => String(r[key]).trim() !== "");
    const firstOfKey = superlatives.quotes.find((q) => q.id.startsWith(key));
    expect(firstOfKey?.author).toBe(newestWithAnswer?.name);
  });
});
