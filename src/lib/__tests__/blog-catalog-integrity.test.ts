/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import blogSlugs from "@/data/blog-slugs.generated.json";
import blogCoverMap from "@/data/blog-cover-map.generated.json";
import contentStats from "@/data/contentStats.generated.json";
import blogArticles from "@/data/blogArticles.json";
import blogList from "@/data/blogList.json";
import {
  getPublishedBlogList,
  getStaticBlogArticles,
  mergePreferStatic,
  type StaticBlogArticle,
} from "@/lib/staticBlogCatalog";
import { getSiteSearchCatalog } from "@/lib/siteSearchCatalog";
import { PRERENDER_ROUTES } from "../../../scripts/prerender-routes.mjs";

type FullRow = StaticBlogArticle & {
  last_reviewed?: string | null;
  citations?: { label: string; url: string; publisher?: string }[] | null;
};

type HeadEntry = {
  title?: string;
  description?: string;
  ogImage?: string;
  article?: {
    slug?: string;
    title?: string;
    excerpt?: string;
    content?: string;
    date?: string;
    category?: string;
  };
};

const HOMEPAGE_SHELL_TITLES = new Set([
  "Living With Arthritis",
  "Living With Arthritis UK",
  "Living With Arthritis | Living With Arthritis UK",
]);

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
  ) as Record<string, HeadEntry>;
  const publishedList = getPublishedBlogList();
  const merged = loadMergedArticles();
  const bySlug = new Map(merged.map((a) => [a.slug, a]));
  const listBySlug = new Map(
    (
      blogList as Array<{
        slug: string;
        title?: string;
        excerpt?: string;
        date?: string;
        category?: string;
      }>
    ).map((a) => [a.slug, a]),
  );
  const sitemapXml = readFileSync(
    resolve(process.cwd(), "public/sitemap.xml"),
    "utf8",
  );

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

  it("requires non-empty excerpt and category on every published list + detail row", () => {
    const bad: string[] = [];
    for (const slug of slugs) {
      const row = bySlug.get(slug);
      const list = publishedList.find((a) => a.slug === slug);
      if (!row) {
        bad.push(`${slug}: missing merged row`);
        continue;
      }
      const excerpt = String(row.excerpt ?? "").trim();
      const category = String(row.category ?? "").trim();
      if (excerpt.length < 100) bad.push(`${slug}: excerpt length ${excerpt.length}`);
      if (!category) bad.push(`${slug}: missing category`);
      if (list && String(list.excerpt ?? "").trim().length < 100) {
        bad.push(
          `${slug}: list excerpt length ${String(list.excerpt ?? "").trim().length}`,
        );
      }
    }
    expect(bad, bad.slice(0, 15).join("\n")).toEqual([]);
  });

  it("keeps blogList snapshot fields aligned with blogArticles for shared slugs", () => {
    const drift: string[] = [];
    for (const article of blogArticles as FullRow[]) {
      if (!article?.slug || article.is_published === false) continue;
      const list = listBySlug.get(article.slug);
      if (!list) continue;
      for (const field of ["title", "excerpt", "date", "category"] as const) {
        const a = String(article[field] ?? "").trim();
        const b = String(list[field] ?? "").trim();
        if (a && b && a !== b) drift.push(`${article.slug}.${field}`);
      }
    }
    expect(drift, drift.slice(0, 15).join("\n")).toEqual([]);
  });

  it("ships unique head titles/descriptions/ogImages (not homepage shell) with nested body", () => {
    const bad: string[] = [];
    const seenTitles = new Map<string, string>();
    for (const slug of slugs) {
      const entry = heads[`/blog/${slug}`];
      if (!entry) {
        bad.push(`${slug}: missing head entry`);
        continue;
      }
      const title = String(entry.title ?? "").trim();
      const description = String(entry.description ?? "").trim();
      const ogImage = String(entry.ogImage ?? "").trim();
      const nested = entry.article;
      if (!title || HOMEPAGE_SHELL_TITLES.has(title)) {
        bad.push(`${slug}: shell/empty title=${title}`);
      }
      if (title.toLowerCase().includes("page not found")) {
        bad.push(`${slug}: 404 title`);
      }
      if (description.length < 50) {
        bad.push(`${slug}: thin description ${description.length}`);
      }
      if (!ogImage.includes("/openverse/") && !ogImage.includes("/og/")) {
        bad.push(`${slug}: weak ogImage=${ogImage}`);
      }
      const bodyLen = String(nested?.content ?? "").trim().length;
      if (bodyLen < 200) bad.push(`${slug}: nested head body ${bodyLen}`);
      if (
        nested?.title &&
        bySlug.get(slug)?.title &&
        nested.title !== bySlug.get(slug)?.title
      ) {
        bad.push(`${slug}: head nested title drifted from catalog`);
      }
      const prior = seenTitles.get(title);
      if (prior) bad.push(`duplicate head title "${title}" on ${prior} and ${slug}`);
      else seenTitles.set(title, slug);
    }
    expect(bad, bad.slice(0, 15).join("\n")).toEqual([]);
  });

  it("includes every published slug in public/sitemap.xml", () => {
    const missing = slugs.filter(
      (slug) =>
        !sitemapXml.includes(`https://livingwitharthritis.org.uk/blog/${slug}<`),
    );
    expect(missing, missing.slice(0, 10).join("\n")).toEqual([]);
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
    const missing = slugs.filter(
      (slug) => !PRERENDER_ROUTES.includes(`/blog/${slug}`),
    );
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

  it("keeps high-intent champion posts cited with UK sources in body + citations", () => {
    const champions = [
      "best-walking-shoes-arthritis-uk",
      "turmeric-for-arthritis",
    ] as const;
    const needHosts = ["nice.org.uk", "nhs.uk", "versusarthritis.org"];
    for (const slug of champions) {
      const row = bySlug.get(slug);
      expect(row, slug).toBeTruthy();
      const body = String(row?.content ?? "").toLowerCase();
      for (const host of needHosts) {
        expect(body, `${slug} missing ${host}`).toContain(host);
      }
      const cites = Array.isArray(row?.citations) ? row!.citations! : [];
      expect(cites.length, `${slug} citations`).toBeGreaterThanOrEqual(3);
      const citeHosts = cites.map((c) => String(c.url)).join(" ");
      for (const host of needHosts) {
        expect(citeHosts, `${slug} citation ${host}`).toContain(host);
      }
      expect(String(row?.excerpt ?? "").trim().length).toBeGreaterThanOrEqual(100);
      expect(String(row?.content ?? "").trim().length).toBeGreaterThan(5000);
    }
  });
});
