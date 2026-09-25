/// <reference types="node" />
/**
 * Blog catalog integrity (never-break). Run by CI "Keep green (integrity)".
 *
 * Single source of truth: src/content/blog/posts/<slug>.json.
 * Everything else (listing index, cover map, content stats, head data,
 * slug list, sitemap, prerender routes, site search) must agree with it.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import blogSlugs from "@/data/blog-slugs.generated.json";
import blogCoverMap from "@/data/blog-cover-map.generated.json";
import contentStats from "@/data/contentStats.generated.json";
import { BLOG_SLUG_REDIRECTS } from "@/data/blogRedirects";
import { blogMetaSchema, blogPostSchema, ISO_DATE_PATTERN } from "@/lib/blog/schema";
import { getBlogCatalog, loadBlogPost } from "@/lib/blog/catalog";
import { getPublishedBlogList } from "@/lib/staticBlogCatalog";
import { getSiteSearchCatalog } from "@/lib/siteSearchCatalog";
import { ALL_BLOG_POSTS, BLOG_POSTS_BY_SLUG, PUBLISHED_BLOG_POSTS } from "@/test/blogPosts";
import { PRERENDER_ROUTES } from "../../../scripts/prerender-routes.mjs";
import {
  buildBlogCatalogArtifacts,
  serializeArtifacts,
} from "../../../scripts/generate-blog-catalog";

type HeadEntry = {
  title?: string;
  description?: string;
  ogImage?: string;
  article?: { slug?: string; title?: string; content?: string };
};

const HOMEPAGE_SHELL_TITLES = new Set([
  "Living With Arthritis",
  "Living With Arthritis UK",
  "Living With Arthritis | Living With Arthritis UK",
]);

const root = process.cwd();
const read = (rel: string) => readFileSync(resolve(root, rel), "utf8");

describe("blog source of truth: src/content/blog/posts/*.json", () => {
  it("validates every guide file against the zod schema", () => {
    expect(ALL_BLOG_POSTS.length).toBeGreaterThan(400);
    const bad: string[] = [];
    for (const post of ALL_BLOG_POSTS) {
      const res = blogPostSchema.safeParse(post);
      if (!res.success) {
        for (const issue of res.error.issues) {
          bad.push(`${post.slug}: ${issue.path.join(".")} — ${issue.message}`);
        }
      }
    }
    expect(bad, bad.slice(0, 15).join("\n")).toEqual([]);
  });

  it("has unique slugs, titles and covers", () => {
    const dupes: string[] = [];
    for (const key of ["slug", "title", "cover"] as const) {
      const seen = new Map<string, string>();
      for (const post of PUBLISHED_BLOG_POSTS) {
        const value = String(post[key]).trim().toLowerCase();
        const prior = seen.get(value);
        if (prior) dupes.push(`duplicate ${key} "${value}" on ${prior} and ${post.slug}`);
        else seen.set(value, post.slug);
      }
    }
    expect(dupes, dupes.slice(0, 15).join("\n")).toEqual([]);
  });

  it("requires title, description, date, last reviewed, category and cover on every guide", () => {
    const bad: string[] = [];
    for (const row of getBlogCatalog()) {
      const post = BLOG_POSTS_BY_SLUG.get(row.slug)!;
      const description = String(post.meta_description || post.excerpt || "").trim();
      if (!row.title.trim()) bad.push(`${row.slug}: title`);
      if (description.length < 50) bad.push(`${row.slug}: description length ${description.length}`);
      if (String(post.excerpt).trim().length < 100) bad.push(`${row.slug}: excerpt < 100 chars`);
      if (!ISO_DATE_PATTERN.test(row.date) || Number.isNaN(Date.parse(row.date))) bad.push(`${row.slug}: date ${row.date}`);
      if (!ISO_DATE_PATTERN.test(row.last_reviewed) || Number.isNaN(Date.parse(row.last_reviewed))) {
        bad.push(`${row.slug}: last_reviewed ${row.last_reviewed}`);
      }
      if (row.last_reviewed < row.date) bad.push(`${row.slug}: last_reviewed before publish date`);
      if (!row.category.trim()) bad.push(`${row.slug}: category`);
      if (!row.cover) bad.push(`${row.slug}: cover`);
    }
    expect(bad, bad.slice(0, 15).join("\n")).toEqual([]);
  });

  it("keeps the committed listing index, cover map and content stats in sync (run bun scripts/generate-blog-catalog.ts)", () => {
    const artifacts = buildBlogCatalogArtifacts(root);
    expect(artifacts.errors).toEqual([]);
    for (const [rel, body] of Object.entries(serializeArtifacts(artifacts))) {
      expect(read(rel) === body, `${rel} is stale — run bun scripts/generate-blog-catalog.ts`).toBe(true);
    }
  });

  it("ships a metadata-only listing index (no article bodies) with valid rows", () => {
    const catalog = getBlogCatalog();
    expect(catalog.length).toBe(PUBLISHED_BLOG_POSTS.length);
    expect(getPublishedBlogList()).toBe(catalog);
    const bad: string[] = [];
    for (const row of catalog) {
      if ("content" in row) bad.push(`${row.slug}: body leaked into listing index`);
      const res = blogMetaSchema.safeParse(row);
      if (!res.success) bad.push(`${row.slug}: ${res.error.issues[0]?.message}`);
    }
    expect(bad, bad.slice(0, 10).join("\n")).toEqual([]);
  });

  it("lazy-loads a full guide body by slug and returns null for unknown slugs", async () => {
    const sample = getBlogCatalog()[0];
    const post = await loadBlogPost(sample.slug);
    expect(post?.slug).toBe(sample.slug);
    expect(String(post?.content ?? "").length).toBeGreaterThan(200);
    expect(await loadBlogPost("this-slug-does-not-exist-xyz")).toBeNull();
  });
});

describe("generated surfaces agree with the catalog", () => {
  const catalogSlugs = getBlogCatalog().map((a) => a.slug).sort();
  const slugs = blogSlugs as string[];
  const coverMap = blogCoverMap as Record<string, string>;
  const heads = JSON.parse(read("scripts/blog-head-data.json")) as Record<string, HeadEntry>;
  const sitemapXml = read("public/sitemap.xml");

  it("keeps blog-slugs.generated.json, cover map and head-data as the same set as the catalog", () => {
    expect(new Set(slugs).size).toBe(slugs.length);
    expect([...slugs].sort()).toEqual(catalogSlugs);
    expect(Object.keys(coverMap).sort()).toEqual(catalogSlugs);
    const headSlugs = Object.keys(heads)
      .filter((k) => k.startsWith("/blog/"))
      .map((k) => k.slice("/blog/".length))
      .sort();
    expect(headSlugs).toEqual(catalogSlugs);
  });

  it("ships unique head titles/descriptions/ogImages (not homepage shell) with nested body", () => {
    const bad: string[] = [];
    const seenTitles = new Map<string, string>();
    for (const slug of catalogSlugs) {
      const entry = heads[`/blog/${slug}`];
      if (!entry) {
        bad.push(`${slug}: missing head entry`);
        continue;
      }
      const title = String(entry.title ?? "").trim();
      const description = String(entry.description ?? "").trim();
      const ogImage = String(entry.ogImage ?? "").trim();
      if (!title || HOMEPAGE_SHELL_TITLES.has(title)) bad.push(`${slug}: shell/empty title=${title}`);
      if (title.toLowerCase().includes("page not found")) bad.push(`${slug}: 404 title`);
      if (description.length < 50) bad.push(`${slug}: thin description ${description.length}`);
      if (!ogImage.includes("/openverse/") && !ogImage.includes("/og/")) bad.push(`${slug}: weak ogImage=${ogImage}`);
      const bodyLen = String(entry.article?.content ?? "").trim().length;
      if (bodyLen < 200) bad.push(`${slug}: nested head body ${bodyLen}`);
      if (entry.article?.title && entry.article.title !== BLOG_POSTS_BY_SLUG.get(slug)?.title) {
        bad.push(`${slug}: head nested title drifted from catalog`);
      }
      const prior = seenTitles.get(title);
      if (prior) bad.push(`duplicate head title "${title}" on ${prior} and ${slug}`);
      else seenTitles.set(title, slug);
    }
    expect(bad, bad.slice(0, 15).join("\n")).toEqual([]);
  });

  it("includes every published slug in public/sitemap.xml", () => {
    const missing = catalogSlugs.filter(
      (slug) => !sitemapXml.includes(`https://livingwitharthritis.org.uk/blog/${slug}<`),
    );
    expect(missing, missing.slice(0, 10).join("\n")).toEqual([]);
  });

  it("lists every published slug on PRERENDER_ROUTES", () => {
    const missing = catalogSlugs.filter((slug) => !PRERENDER_ROUTES.includes(`/blog/${slug}`));
    expect(missing).toEqual([]);
  });

  it("includes every published slug in site search catalog blog hrefs", () => {
    const hrefs = new Set(
      getSiteSearchCatalog()
        .filter((item) => item.href.startsWith("/blog/"))
        .map((item) => item.href),
    );
    const missing = catalogSlugs.filter((slug) => !hrefs.has(`/blog/${slug}`));
    expect(missing).toEqual([]);
  });

  it("keeps contentStats count and wordCounts aligned with the catalog", () => {
    expect(contentStats.blogArticleCount).toBe(catalogSlugs.length);
    expect(Object.keys(contentStats.wordCounts).sort()).toEqual(catalogSlugs);
  });

  it("keeps every legacy redirect pointing at a live guide (and never shadowing one)", () => {
    const live = new Set(catalogSlugs);
    const bad = Object.entries(BLOG_SLUG_REDIRECTS)
      .filter(([from, to]) => live.has(from) || !live.has(to))
      .map(([from, to]) => `${from} -> ${to}`);
    expect(bad).toEqual([]);
  });
});

describe("champion guides", () => {
  it("keeps high-intent champion posts cited with UK sources in body + citations", () => {
    const needHosts = ["nice.org.uk", "nhs.uk", "versusarthritis.org"];
    for (const slug of ["best-walking-shoes-arthritis-uk", "turmeric-for-arthritis"]) {
      const row = BLOG_POSTS_BY_SLUG.get(slug);
      expect(row, slug).toBeTruthy();
      const body = String(row?.content ?? "").toLowerCase();
      for (const host of needHosts) expect(body, `${slug} missing ${host}`).toContain(host);
      const cites = row?.citations ?? [];
      expect(cites.length, `${slug} citations`).toBeGreaterThanOrEqual(3);
      const citeHosts = cites.map((c) => String(c.url)).join(" ");
      for (const host of needHosts) expect(citeHosts, `${slug} citation ${host}`).toContain(host);
      expect(String(row?.excerpt ?? "").trim().length).toBeGreaterThanOrEqual(100);
      expect(String(row?.content ?? "").trim().length).toBeGreaterThan(5000);
    }
  });
});
