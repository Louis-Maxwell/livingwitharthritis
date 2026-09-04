import { describe, expect, it } from "vitest";
import { coverImage } from "@/lib/articleImages";
import blogSlugs from "@/data/blog-slugs.generated.json";
import blogCoverMap from "@/data/blog-cover-map.generated.json";

describe("coverImage uniqueness", () => {
  it("maps every blog slug to a cover path", () => {
    const slugs = blogSlugs as string[];
    expect(slugs.length).toBeGreaterThan(400);
    for (const slug of slugs) {
      const cover = coverImage("general", slug, slug);
      expect(cover.src).toMatch(/^\/openverse\/.+\.webp$/);
      expect(cover.src.length).toBeGreaterThan("/openverse/x.webp".length);
    }
  });

  it("gives unique coverImage paths for unique slugs", () => {
    const slugs = blogSlugs as string[];
    const paths = slugs.map((slug) => coverImage("general", slug, slug).src);
    expect(new Set(paths).size).toBe(slugs.length);
  });

  it("keeps the generated cover map 1:1 and deterministic", () => {
    const map = blogCoverMap as Record<string, string>;
    const slugs = blogSlugs as string[];
    expect(Object.keys(map).sort()).toEqual([...slugs].sort());
    const files = Object.values(map);
    expect(new Set(files).size).toBe(files.length);
    const sample = slugs[0];
    expect(coverImage("x", "y", sample).src).toBe(coverImage("x", "y", sample).src);
    expect(coverImage("x", "y", sample).src).toBe(`/openverse/${map[sample]}`);
  });
});
