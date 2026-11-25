import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
const load = (slug: string) => JSON.parse(readFileSync(`src/content/blog/posts/${slug}.json`, "utf8"));
const slugs = ["medication-supplement-interactions-arthritis", "turmeric-and-methotrexate-interaction"];
describe("medicine interaction editorial batch three", () => {
  for (const slug of slugs) {
    it(`${slug} preserves access, source support and honest review status`, () => {
      const p = load(slug);
      expect(p.slug).toBe(slug);
      expect(p.is_published).toBe(true);
      expect(p.reviewed_by).toBeNull();
      expect(p.reviewer_credentials).toBeNull();
      expect(p.last_reviewed).toBeUndefined();
      expect(p.editorial_review_note).toContain("not yet had a fresh clinical review");
      expect(p.citations.length).toBeGreaterThanOrEqual(6);
      expect(p.content).toContain("17 November 2026");
      expect(p.content).toContain("NHS 111");
      expect(p.content).toContain("999");
      expect(p.content).toContain("https://sps.nhs.uk/articles/managing-interactions-with-methotrexate/");
      expect(p.content).not.toMatch(/reviewed by a pharmacist|clinically approved|completely useless|stop the methotrexate from working entirely|rapid overdose|will know exactly/);
      expect(existsSync(`public/openverse/${p.cover}`)).toBe(true);
      const credits = JSON.parse(readFileSync("public/openverse/ATTRIBUTION.json", "utf8"));
      expect(credits[p.cover]?.credit).toBe("Image: Living With Arthritis");
    });
  }
  it("overview gives product-specific checks without unsupported cancellation and spacing claims", () => {
    const p = load(slugs[0]);
    expect(p.content).toContain("cleared mainly by the kidneys");
    expect(p.content).toContain("specialist may prescribe an NSAID");
    expect(p.content).toContain("trimethoprim or co-trimoxazole");
    expect(p.content).toContain("Follow your own prescribed dose and day");
    expect(p.content).not.toMatch(/must leave a gap of at least two hours|supplement may override the biologic|precisely which new supplement/);
    expect(p.content).toContain("/resources/symptom-flare-tracker");
  });
  it("turmeric distinguishes uncertain interaction evidence, rare liver injury and food use", () => {
    const p = load(slugs[1]);
    expect(p.content).toContain("mainly from test-tube or animal studies");
    expect(p.content).toContain("rare, unpredictable reactions");
    expect(p.content).toContain("does not appear to relate to typical dietary amounts");
    expect(p.content).toContain("do not establish a safe interval");
    expect(p.content).toContain("cleared mainly by the kidneys");
    expect(p.content).not.toMatch(/two thousand percent|primary mechanism behind|avoid taking it on the same day|clearance is primarily done by your liver/);
    expect(p.content).toContain("<h3>Turmeric used as a normal food spice</h3>");
    expect(p.content).not.toContain("<table>");
  });
});
