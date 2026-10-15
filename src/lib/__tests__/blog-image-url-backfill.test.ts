import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import blogSlugs from "@/data/blog-slugs.generated.json";
import blogCoverMap from "@/data/blog-cover-map.generated.json";
import { getBlogCatalog, getBlogMeta } from "@/lib/blog/catalog";
import { PUBLISHED_BLOG_POSTS } from "@/test/blogPosts";

const OPENVERSE_DIR = join(process.cwd(), "public", "openverse");

describe("published blog covers (single source: post.cover)", () => {
  const map = blogCoverMap as Record<string, string>;
  const slugs = blogSlugs as string[];

  it("has a cover-map entry and on-disk file for every published slug", () => {
    expect(slugs.length).toBe(PUBLISHED_BLOG_POSTS.length);
    expect(Object.keys(map).length).toBe(slugs.length);
    const missingMap: string[] = [];
    const missingFile: string[] = [];
    for (const slug of slugs) {
      const file = map[slug];
      if (!file) {
        missingMap.push(slug);
        continue;
      }
      if (!existsSync(join(OPENVERSE_DIR, file))) missingFile.push(`${slug} => ${file}`);
    }
    expect(missingMap).toEqual([]);
    expect(missingFile).toEqual([]);
  });

  it("keeps the generated cover map identical to each post's cover field", () => {
    const bad = PUBLISHED_BLOG_POSTS.filter((p) => map[p.slug] !== p.cover).map((p) => p.slug);
    expect(bad).toEqual([]);
  });

  it("exposes a non-null /openverse image_url for every catalog row", () => {
    const bad = getBlogCatalog()
      .filter((row) => row.image_url !== `/openverse/${map[row.slug]}`)
      .map((row) => `${row.slug}: ${row.image_url}`);
    expect(bad, bad.slice(0, 10).join("\n")).toEqual([]);
  });

  it("keeps the partner sample cover on disk and in the catalog", () => {
    const slug = "supporting-a-partner-with-arthritis-strategies";
    const file = map[slug];
    expect(file).toBe("lwa-supporting-a-partner-with-arthritis-strategies.webp");
    expect(existsSync(join(OPENVERSE_DIR, file))).toBe(true);
    expect(getBlogMeta(slug)?.image_url).toBe(`/openverse/${file}`);
  });
});
