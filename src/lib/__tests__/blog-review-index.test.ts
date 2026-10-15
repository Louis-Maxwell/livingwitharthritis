import { describe, expect, it } from "vitest";
import { getBlogCatalog } from "@/lib/blog/catalog";
import { getBlogReviewMeta } from "@/lib/blog/reviewIndex";

describe("blog review index", () => {
  it("matches the catalog's review date and pending flag for every guide", () => {
    const catalog = getBlogCatalog();
    expect(catalog.length).toBeGreaterThan(0);
    for (const row of catalog) {
      const meta = getBlogReviewMeta(row.slug);
      expect(meta, row.slug).toBeDefined();
      expect(meta?.last_reviewed, row.slug).toBe(row.last_reviewed);
      expect(meta?.reviewStatus, row.slug).toBe(row.reviewStatus === "pending" ? "pending" : undefined);
    }
  });

  it("returns nothing for unknown slugs", () => {
    expect(getBlogReviewMeta("not-a-real-guide")).toBeUndefined();
    expect(getBlogReviewMeta(undefined)).toBeUndefined();
  });
});
