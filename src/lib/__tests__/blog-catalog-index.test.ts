import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import mostRead from "@/data/blogMostRead.generated.json";
import { getBlogCatalog } from "@/lib/blog/catalog";
import {
  getPublishedBlogList as getPublishedBlogListLight,
  getStaticBlogListItem,
  loadBlogArticleBody,
} from "@/lib/blogCatalogIndex";
import { PUBLISHED_BLOG_POSTS } from "@/test/blogPosts";

const REGEN = "Run `npm run blog:catalog` and commit the result.";

describe("blog catalog index (performance split)", () => {
  it("footer most-read list matches the catalog top 5", () => {
    const expected = getBlogCatalog()
      .slice(0, 5)
      .map((a) => ({ slug: a.slug, title: a.title }));
    expect(mostRead, REGEN).toEqual(expected);
  });

  it("compat list API equals the catalog and carries no bodies", () => {
    const list = getPublishedBlogListLight();
    expect(list.map((a) => a.slug)).toEqual(getBlogCatalog().map((a) => a.slug));
    expect(list.every((a) => !("content" in a))).toBe(true);
    expect(getStaticBlogListItem(list[0].slug)?.slug).toBe(list[0].slug);
  });

  it("loads a full article body by slug", async () => {
    const sample = PUBLISHED_BLOG_POSTS[0];
    const article = await loadBlogArticleBody(sample.slug);
    expect(article?.slug).toBe(sample.slug);
    expect(article?.content).toBe(sample.content);
    expect(await loadBlogArticleBody("this-slug-does-not-exist-xyz")).toBeNull();
  });

  it("no app module statically imports guide bodies", () => {
    const root = resolve(__dirname, "../..");
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const name = entry.name;
        const abs = join(dir, name);
        if (entry.isDirectory()) {
          if (name === "__tests__" || name === "test") continue;
          walk(abs);
          continue;
        }
        if (!/\.(ts|tsx)$/.test(name) || /\.test\.tsx?$/.test(name)) continue;
        const rel = abs.slice(root.length + 1).replace(/\\/g, "/");
        const src = readFileSync(abs, "utf8");
        if (/from\s+["']@\/content\/blog\/posts\/[^"']+["']/.test(src)) offenders.push(rel);
        if (/import\.meta\.glob[^(]*\([^)]*content\/blog\/posts[^)]*eager\s*:\s*true/s.test(src)) {
          offenders.push(`${rel} (eager glob)`);
        }
      }
    };
    walk(root);
    expect(offenders).toEqual([]);
  });
});
