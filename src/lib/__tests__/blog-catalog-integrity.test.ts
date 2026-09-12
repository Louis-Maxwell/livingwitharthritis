/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import blogSlugs from "@/data/blog-slugs.generated.json";
import blogCoverMap from "@/data/blog-cover-map.generated.json";
import contentStats from "@/data/contentStats.generated.json";
import blogArticles from "@/data/blogArticles.json";
import {
  getPublishedBlogList,
  getStaticBlogArticles,
  mergePreferStatic,
  type StaticBlogArticle,
} from "@/lib/staticBlogCatalog";
import { getSiteSearchCatalog } from "@/lib/siteSearchCatalog";
import { PRERENDER_ROUTES } from "../../../scripts/prerender-routes.mjs";

type FullRow = Pick<
  StaticBlogArticle,
  "slug" | "title" | "content" | "date" | "is_published"
>;

function loadMergedArticles(): FullRow[] {
  const legacy = (blogArticles as FullRow[]).filter(
    (r) => r?.slug && r.is_published !== false,
  );
  return mergePreferStatic(getStaticBlogArticles() as FullRow[], legacy);
}

describe("blog catalog integrity (never-break)", () => {
  const slugs = blogSlugs as string[];
  const coverMap = blogCoverMap as Record<string, string>;
  const heads = JSON.parse(
    readFileSync(resolve(process.cwd(), "scripts/blog-head-data.json"), "utf8"),
  ) as Record<string, unknown>;
  const publishedList = getPublishedBlogList();
  const merged = loadMergedArticles();
  const bySlug = new Map(merged.map((a) => [a.slug, a]));

  it("keeps generated slugs, cover map, head-data, and merged catalog as the same set", () => {
    expect(slugs.length).toBeGreaterThan(400);
    expect(new Set(slugs).size).toBe(slugs.length);

    const catalogSlugs = new Set(publishedList.map((a) => a.slug));
    const mergedSlugs = new Set(merged.map((a) => a.slug));
    const headSlugs = Object.keys(heads)
      .filter((k) => k.startsWith("/blog/"))
      .map((k) => k.slice("/blog/".length));

    expect(catalogSlugs.size).toBe(slugs.length);
    expect(mergedSlugs.size).toBe(slugs.length);
    expect(headSlugs.sort()).toEqual([...slugs].sort());
    expect([...catalogSlugs].sort()).toEqual([...slugs].sort());
    expect([...mergedSlugs].sort()).toEqual([...slugs].sort());

    const missingCover = slugs.filter((s) => !coverMap[s]);
    const missingHead = slugs.filter((s) => !heads[`/blog/${s}`]);
    expect(missingCover).toEqual([]);
    expect(missingHead).toEqual([]);
  });

  it("requires every published row to have title, content, date, slug and a real body", () => {
    const bad: string[] = [];
    const emptyBody: string[] = [];
    for (const slug of slugs) {
      const row = bySlug.get(slug);
      if (!row) {
        bad.push(`${slug}: missing from merged catalog`);
        continue;
      }
      if (!row.title?.trim() || !row.date?.trim() || !row.slug?.trim()) {
        bad.push(`${slug}: missing title/date/slug`);
      }
      const len = String(row.content ?? "").trim().length;
      if (len < 200) emptyBody.push(`${slug}: content length ${len}`);
    }
    expect(bad, bad.slice(0, 10).join("\n")).toEqual([]);
    expect(emptyBody, emptyBody.slice(0, 10).join("\n")).toEqual([]);
  });

  it("has no duplicate published slugs", () => {
    const seen = new Set<string>();
    const dupes: string[] = [];
    for (const row of publishedList) {
      if (seen.has(row.slug)) dupes.push(row.slug);
      seen.add(row.slug);
    }
    expect(dupes).toEqual([]);
  });

  it("keeps contentStats count and wordCounts aligned with generated slugs", () => {
    const wordKeys = Object.keys(contentStats.wordCounts ?? {});
    expect(contentStats.blogArticleCount).toBe(slugs.length);
    expect(wordKeys.length).toBe(slugs.length);
    const missingWc = slugs.filter((s) => !(s in contentStats.wordCounts));
    expect(missingWc).toEqual([]);
  });

  it("lists every published slug on PRERENDER_ROUTES", () => {
    const missing = slugs.filter((slug) => !PRERENDER_ROUTES.includes(`/blog/${slug}`));
    expect(missing).toEqual([]);
  });

  it("includes every published slug in site search catalog blog hrefs", () => {
    const hrefs = new Set(
      getSiteSearchCatalog()
        .filter((item) => item.href.startsWith("/blog/"))
        .map((item) => item.href),
    );
    const missing = slugs.filter((slug) => !hrefs.has(`/blog/${slug}`));
    expect(missing).toEqual([]);
  });
});
