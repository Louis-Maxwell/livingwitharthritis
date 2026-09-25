import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import indexRows from "@/data/blogCatalogIndex.generated.json";
import mostRead from "@/data/blogMostRead.generated.json";
import {
  getPublishedBlogList as getPublishedBlogListLight,
  loadBlogArticleBody,
} from "@/lib/blogCatalogIndex";
import {
  getPublishedBlogList,
  getStaticBlogArticles,
  getStaticBlogList,
} from "@/lib/staticBlogCatalog";

const REGEN = "Run `node scripts/generate-blog-catalog-index.mjs` and commit the result.";

describe("blog catalog index (performance split)", () => {
  it("generated index matches the blog batches", () => {
    expect(indexRows, REGEN).toEqual(JSON.parse(JSON.stringify(getStaticBlogList())));
  });

  it("footer most-read list matches the published list top 5", () => {
    const expected = getPublishedBlogList()
      .slice(0, 5)
      .map((a) => ({ slug: a.slug, title: a.title }));
    expect(mostRead, REGEN).toEqual(expected);
  });

  it("light published list equals the full-catalog published list", () => {
    expect(getPublishedBlogListLight().map((a) => a.slug)).toEqual(
      getPublishedBlogList().map((a) => a.slug),
    );
  });

  it("loads a full article body by slug", async () => {
    const sample = getStaticBlogArticles()[0];
    const article = await loadBlogArticleBody(sample.slug);
    expect(article?.slug).toBe(sample.slug);
    expect(article?.content).toBe(sample.content);
    expect(await loadBlogArticleBody("this-slug-does-not-exist-xyz")).toBeNull();
  });

  it("no app module statically imports the full blog corpus", () => {
    const root = resolve(__dirname, "../..");
    const allowed = new Set(["lib/staticBlogCatalog.ts"]);
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const name of readdirSync(dir)) {
        const abs = join(dir, name);
        if (statSync(abs).isDirectory()) {
          if (name === "__tests__" || name === "generated" || name === "test") continue;
          walk(abs);
          continue;
        }
        if (!/\.(ts|tsx)$/.test(name) || /\.test\.tsx?$/.test(name)) continue;
        const rel = abs.slice(root.length + 1).replace(/\\/g, "/");
        if (allowed.has(rel)) continue;
        const src = readFileSync(abs, "utf8");
        const staticImports = src.match(/^\s*import\s+(?!type\s)[^;]*from\s+["']@\/lib\/staticBlogCatalog["']/gm);
        if (staticImports) offenders.push(rel);
        if (/from\s+["']@\/content\/blog\/[^"']+\.json["']/.test(src)) offenders.push(rel);
      }
    };
    walk(root);
    expect(offenders).toEqual([]);
  });
});
