import { describe, expect, it } from "vitest";
import { getPublishedBlogList } from "@/lib/staticBlogCatalog";
import {
  chronologicalArchiveSlugs,
  groupPostsByYearMonth,
  type ArchiveListItem,
} from "@/lib/blogArchive";
import blogSlugs from "@/data/blog-slugs.generated.json";

describe("blog archive grouping", () => {
  const list = getPublishedBlogList() as ArchiveListItem[];

  it("lists every published catalog slug exactly once", () => {
    const catalogSlugs = new Set(list.map((p) => p.slug));
    const expected = blogSlugs as string[];
    expect(catalogSlugs.size).toBeGreaterThan(400);
    expect(catalogSlugs.size).toBe(expected.length);

    const missing = expected.filter((s) => !catalogSlugs.has(s));
    expect(missing, missing.slice(0, 10).join(", ")).toEqual([]);

    const chrono = chronologicalArchiveSlugs(list);
    expect(new Set(chrono).size).toBe(chrono.length);
    expect(chrono.length).toBe(list.length);
    for (const slug of expected) {
      expect(chrono).toContain(slug);
    }
  });

  it("groups by year/month without dropping posts", () => {
    const groups = groupPostsByYearMonth(list);
    expect(groups.length).toBeGreaterThan(0);

    const fromGroups: string[] = [];
    for (const year of groups) {
      expect(year.year).toBeGreaterThanOrEqual(1970);
      for (const month of year.months) {
        expect(month.key).toMatch(/^\d{4}-\d{2}$/);
        expect(month.posts.length).toBeGreaterThan(0);
        for (const post of month.posts) {
          fromGroups.push(post.slug);
        }
      }
    }

    expect(fromGroups.length).toBe(list.length);
    expect(new Set(fromGroups).size).toBe(list.length);
  });

  it("orders years and months newest-first", () => {
    const groups = groupPostsByYearMonth(list);
    for (let i = 1; i < groups.length; i++) {
      expect(groups[i - 1].year).toBeGreaterThanOrEqual(groups[i].year);
    }
    for (const year of groups) {
      for (let i = 1; i < year.months.length; i++) {
        expect(year.months[i - 1].key >= year.months[i].key).toBe(true);
      }
    }
  });
});
