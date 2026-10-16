import { describe, expect, it } from "vitest";
import { filterBlogRows, sortBlogRows } from "@/lib/blog/blogIndexFilter";

const rows = [
  { slug: "a", title: "Knee exercises for arthritis", excerpt: "", category: "Exercise", date: "2026-03-01" },
  { slug: "b", title: "Turmeric guide", excerpt: "Curcumin", category: "Supplements", date: "2026-05-01" },
  { slug: "c", title: "Sleep tips", excerpt: "", category: "Sleep", date: "2025-01-01" },
  { slug: "a", title: "Knee exercises for arthritis", excerpt: "", category: "Exercise", date: "2026-03-01" },
];

describe("blog index filter", () => {
  it("sorts newest and oldest by publish date", () => {
    expect(sortBlogRows(rows.slice(0, 3), "newest").map((r) => r.slug)).toEqual(["b", "a", "c"]);
    expect(sortBlogRows(rows.slice(0, 3), "oldest").map((r) => r.slug)).toEqual(["c", "a", "b"]);
  });

  it("matches all search words in any order", () => {
    expect(filterBlogRows(rows, { topic: "All", query: "arthritis knee", sort: "newest" }).map((r) => r.slug)).toEqual(["a"]);
  });

  it("returns nothing for a query with no matches", () => {
    expect(filterBlogRows(rows, { topic: "All", query: "zzqqxx", sort: "newest" })).toHaveLength(0);
  });

  it("maps raw categories onto topics (Sleep is Lifestyle)", () => {
    expect(filterBlogRows(rows, { topic: "Lifestyle", query: "", sort: "newest" }).map((r) => r.slug)).toEqual(["c"]);
  });

  it("never lists the same slug twice", () => {
    expect(filterBlogRows(rows, { topic: "All", query: "", sort: "newest" })).toHaveLength(3);
  });
});
