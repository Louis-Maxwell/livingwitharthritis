import { describe, expect, it } from "vitest";
import { filterSearchItems, getBakedSearchIndex } from "../search";
import { aiConfigured } from "../chat";

describe("health-related shapes", () => {
  it("aiConfigured reports booleans without secrets", () => {
    expect(aiConfigured({})).toEqual({ workersAi: false, openai: false });
    expect(aiConfigured({ OPENAI_API_KEY: "sk-test" })).toEqual({
      workersAi: false,
      openai: true,
    });
    expect(aiConfigured({ AI: { run: async () => "" } })).toEqual({
      workersAi: true,
      openai: false,
    });
  });
});

describe("search filter", () => {
  it("loads baked index with items", () => {
    const idx = getBakedSearchIndex();
    expect(idx.version).toBe(1);
    expect(idx.items.length).toBeGreaterThan(10);
  });

  it("filters by query and topic", () => {
    const items = getBakedSearchIndex().items;
    const pip = filterSearchItems(items, { q: "pip", topic: "Finances & Benefits" });
    expect(pip.length).toBeGreaterThan(0);
    expect(pip.every((i) => i.topic === "Finances & Benefits")).toBe(true);
  });

  it("filters word buckets", () => {
    const items = getBakedSearchIndex().items;
    const under = filterSearchItems(items, { words: "under1000" });
    expect(under.every((i) => i.wordCount > 0 && i.wordCount < 1000)).toBe(true);
  });

  it("ranks title matches above excerpt-only hits", () => {
    const items = getBakedSearchIndex().items;
    const ranked = filterSearchItems(items, { q: "pip" });
    expect(ranked.length).toBeGreaterThan(0);
    const top = ranked.slice(0, 5);
    expect(top.some((i) => i.title.toLowerCase().includes("pip"))).toBe(true);
  });

});
