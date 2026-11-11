import { describe, it, expect } from "vitest";
import { conditionSubpages, subpageSlugs } from "@/data/conditionSubpages";
import { conditionBySlug } from "@/data/exerciseConditionRecommendations";
import {
  conditionSubpageTitle,
  conditionSubpageDescription,
  CONDITION_TITLE_MAX,
  CONDITION_DESCRIPTION_MAX,
} from "@/data/conditionSubpageMeta";
import headData from "../../../scripts/condition-head-data.json";

const BRAND = " | Living With Arthritis";
const pages = Object.keys(conditionSubpages).flatMap((slug) => {
  const cond = conditionBySlug.get(slug);
  return cond ? subpageSlugs.map((sub) => ({ route: `/conditions/${slug}/${sub}`, name: cond.name, sub })) : [];
});

describe("condition subpage titles and descriptions", () => {
  it("covers every condition subpage", () => {
    expect(pages.length).toBeGreaterThanOrEqual(52);
  });

  it("fit without clipping, read cleanly and are unique", () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const { name, sub } of pages) {
      const t = conditionSubpageTitle(name, sub);
      const d = conditionSubpageDescription(name, sub);
      expect(t.length, t).toBeLessThanOrEqual(CONDITION_TITLE_MAX);
      expect(d.length, d).toBeLessThanOrEqual(CONDITION_DESCRIPTION_MAX);
      expect(t).not.toMatch(/…/);
      expect((t.match(/\bUK\b/g) ?? []).length, t).toBeLessThanOrEqual(1);
      expect(t).not.toMatch(/Living With Arthritis\s*\(?UK/);
      titles.add(t);
      descriptions.add(d);
    }
    expect(titles.size).toBe(pages.length);
    expect(descriptions.size).toBe(pages.length);
  });

  it("crawler head data matches the page head", () => {
    const data = headData as Record<string, { title: string; description: string }>;
    for (const { route, name, sub } of pages) {
      const entry = data[route];
      expect(entry, route).toBeTruthy();
      expect(entry.title.replace(BRAND, "")).toBe(conditionSubpageTitle(name, sub));
      expect(entry.description).toBe(conditionSubpageDescription(name, sub));
    }
  });
});
