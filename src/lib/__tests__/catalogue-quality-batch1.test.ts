import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const load = (slug: string) => JSON.parse(readFileSync(`src/content/blog/posts/${slug}.json`, "utf8"));
const slugs = ["best-supplement-for-knee-joint", "swimming-exercises-hip-osteoarthritis"];

describe("catalogue quality batch one", () => {
  for (const slug of slugs) {
    it(`${slug} keeps access and marks the substantive revision pending review`, () => {
      const post = load(slug);
      expect(post.slug).toBe(slug);
      expect(post.is_published).toBe(true);
      expect(post.reviewed_by).toBeNull();
      expect(post.reviewer_credentials).toBeNull();
      expect(post.last_reviewed).toBeUndefined();
      expect(post.editorial_review_note).toContain("not yet had a fresh clinical review");
      expect(post.content).toContain("17 November 2026");
      expect(post.citations.length).toBeGreaterThanOrEqual(4);
    });
  }
  it("swimming avoids a universal stroke ranking and unsourced fixed exercise prescription", () => {
    const post = load("swimming-exercises-hip-osteoarthritis");
    expect(post.content).toContain("There is no single swimming stroke");
    expect(post.content).toContain("2016 Cochrane review");
    expect(post.content).toContain("small, short-term");
    expect(post.content).not.toMatch(/8.?12 repetitions|about 10 each way|often the most comfortable stroke|Aquatic therapy setting/);
    expect(post.meta_description).not.toContain("Backstroke is often");
    expect(post.content).toContain("999 or go to A&amp;E");
    expect(post.content).toContain("NHS 111");
  });
  it("knee supplements cite actual guidance and interaction advice without product endorsement", () => {
    const post = load("best-supplement-for-knee-joint");
    expect(post.content).toContain("1.4.6 and 1.4.7");
    expect(post.content).toContain("Specialist Pharmacy Service");
    expect(post.content).toContain("111 now");
    expect(post.content).toContain("does not name a winning brand");
  });
});
