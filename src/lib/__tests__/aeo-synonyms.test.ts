import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { PAGE_AEO } from "@/data/page-aeo";

describe("cross-market terminology synonyms", () => {
  it("priority global pages carry synonym blocks", () => {
    for (const route of ["/conditions/osteoarthritis", "/conditions/knee-arthritis", "/guides/knee-exercises-for-osteoarthritis", "/guides/arthritis-pain-relief"]) {
      expect(PAGE_AEO[route]?.synonyms?.length, route).toBeGreaterThan(0);
    }
  });

  it("every synonym pair is non-empty plain text", () => {
    for (const [route, page] of Object.entries(PAGE_AEO)) {
      for (const s of page.synonyms ?? []) {
        expect(s.term.trim(), route).toBeTruthy();
        expect(s.variants.trim(), route).toBeTruthy();
        expect(s.term).not.toMatch(/[<>]/);
        expect(s.variants).not.toMatch(/[<>]/);
      }
    }
  });

  it("bridges the brief's regional terms without new clinical claims", () => {
    expect(PAGE_AEO["/guides/arthritis-pain-relief"].synonyms?.some((s) => s.term === "Paracetamol" && /acetaminophen/i.test(s.variants))).toBe(true);
    expect(PAGE_AEO["/conditions/knee-arthritis"].synonyms?.some((s) => /TKA/.test(s.term) && /knee replacement/i.test(s.variants))).toBe(true);
  });
});

describe("static prerender export", () => {
  it("scripts/aeo-synonyms.json matches PAGE_AEO exactly", () => {
    const exported = JSON.parse(readFileSync("scripts/aeo-synonyms.json", "utf8")) as Record<string, { term: string; variants: string }[]>;
    for (const [route, page] of Object.entries(PAGE_AEO)) {
      if (page.synonyms?.length) expect(exported[route], route).toEqual(page.synonyms);
    }
    for (const route of Object.keys(exported)) {
      expect(PAGE_AEO[route]?.synonyms, route).toBeTruthy();
    }
  });
});
