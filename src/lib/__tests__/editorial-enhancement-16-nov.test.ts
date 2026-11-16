import { describe, it, expect } from "vitest";
import fs from "node:fs";
import { canonicalPath } from "../technicalSeo.mjs";
const read = (p: string) => JSON.parse(fs.readFileSync(p, "utf8"));
const manifest = read("docs/editorial-enhancement-2026-11-16.json");
describe("17 editorial enhancements", () => {
  it("keeps all 17 texts on canonical, indexable destinations with truthful review provenance", () => {
    expect(manifest.articles).toHaveLength(17);
    for (const entry of manifest.articles) {
      const path = entry.path || `/blog/${entry.slug}`;
      expect(canonicalPath(path)).toBe(path);
      if (entry.slug) {
        const post = read(`src/content/blog/posts/${entry.slug}.json`);
        expect(post.is_published).toBe(true);
        expect(post.editorial_review_note).toContain("not yet had a fresh clinical review");
        expect(post.last_reviewed).toBeUndefined();
        expect(post.reviewed_by).toBeNull();
        expect(post.content).toContain("Trusted UK sources");
        expect(post.content.length).toBeGreaterThan(5000);
      } else {
        const supplement = read("src/data/kneeEditorialEnhancement.json");
        expect(supplement.note).toContain("not yet had a fresh clinical review");
        expect(supplement.html).toContain("What to avoid");
        expect(fs.readFileSync("src/pages/guides/KneeExercisesForOsteoarthritis.tsx", "utf8")).toContain("kneeEditorialEnhancement.html");
        expect(fs.readFileSync("scripts/inject-canonicals.mjs", "utf8")).toContain("knee-editorial-supplement");
      }
    }
  });
});
