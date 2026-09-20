import { describe, expect, it } from "vitest";
import { BLOG_SITE_ORIGIN, buildCanonicalBlogUrl } from "../blogShareUrl";

describe("buildCanonicalBlogUrl", () => {
  it("builds the canonical /blog/{slug} URL from a bare slug", () => {
    expect(buildCanonicalBlogUrl("turmeric-for-arthritis")).toBe(
      `${BLOG_SITE_ORIGIN}/blog/turmeric-for-arthritis`,
    );
  });

  it("strips a leading blog/ prefix and surrounding slashes", () => {
    expect(buildCanonicalBlogUrl("/blog/knee-arthritis-exercises-uk/")).toBe(
      `${BLOG_SITE_ORIGIN}/blog/knee-arthritis-exercises-uk`,
    );
  });

  it("trims whitespace", () => {
    expect(buildCanonicalBlogUrl("  omega-3-foods-for-joints  ")).toBe(
      `${BLOG_SITE_ORIGIN}/blog/omega-3-foods-for-joints`,
    );
  });

  it("handles an empty slug without inventing a path segment", () => {
    expect(buildCanonicalBlogUrl("")).toBe(`${BLOG_SITE_ORIGIN}/blog/`);
    expect(buildCanonicalBlogUrl("   ")).toBe(`${BLOG_SITE_ORIGIN}/blog/`);
  });
});
