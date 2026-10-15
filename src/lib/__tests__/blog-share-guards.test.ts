import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import blogSlugs from "@/data/blog-slugs.generated.json";
import blogCoverMap from "@/data/blog-cover-map.generated.json";
import { getBlogCatalog } from "@/lib/blog/catalog";
import { PUBLISHED_BLOG_POSTS } from "@/test/blogPosts";

const SITE = "https://livingwitharthritis.org.uk";
const OPENVERSE_DIR = join(process.cwd(), "public", "openverse");
const HEAD_PATH = resolve("scripts/blog-head-data.json");
const AWKWARD_TITLE_RE =
  /(?:\bWith\s*\|\s*|\bAnd\s*\|\s*|\bFor\s*\|\s*|\bThe\s*\|\s*|\|\s*$)/i;

describe("blog share / cover regression guards", () => {
  const slugs = blogSlugs as string[];
  const map = blogCoverMap as Record<string, string>;
  const heads = JSON.parse(readFileSync(HEAD_PATH, "utf8")) as Record<
    string,
    { title?: string; ogImage?: string }
  >;
  const catalog = getBlogCatalog();

  it("maps every slug to a cover-map entry and on-disk openverse file", () => {
    expect(slugs.length).toBeGreaterThan(400);
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

  it("gives every /blog/* head entry a cover-map ogImage and a sane title", () => {
    const badOg: string[] = [];
    const badTitle: string[] = [];
    const missing: string[] = [];
    for (const slug of slugs) {
      const path = `/blog/${slug}`;
      const entry = heads[path];
      if (!entry) {
        missing.push(path);
        continue;
      }
      const expectedAbs = `${SITE}/openverse/${map[slug]}`;
      const expectedRel = `/openverse/${map[slug]}`;
      const og = String(entry.ogImage ?? "");
      if (!og || og.includes("/og/home.png") || (og !== expectedAbs && og !== expectedRel)) {
        badOg.push(`${path}: ${og || "(empty)"}`);
      }
      const title = String(entry.title ?? "");
      if (!title || title.includes("Page not found") || AWKWARD_TITLE_RE.test(title)) {
        badTitle.push(`${path}: ${title || "(empty)"}`);
      }
    }
    expect(missing, missing.slice(0, 10).join("\n")).toEqual([]);
    expect(badOg, badOg.slice(0, 10).join("\n")).toEqual([]);
    expect(badTitle, badTitle.slice(0, 10).join("\n")).toEqual([]);
  });

  it("derives every catalog image_url and post cover from the same 1:1 cover file", () => {
    const bad: string[] = [];
    for (const post of PUBLISHED_BLOG_POSTS) {
      if (map[post.slug] !== post.cover) bad.push(`${post.slug}: cover map ${map[post.slug]} !== ${post.cover}`);
    }
    for (const row of catalog) {
      const expected = `/openverse/${map[row.slug]}`;
      if (row.image_url !== expected) bad.push(`${row.slug}: ${row.image_url} !== ${expected}`);
    }
    expect(catalog.length).toBe(slugs.length);
    expect(bad, bad.slice(0, 10).join("\n")).toEqual([]);
  });

  it("keeps the partner share-preview sample intact", () => {
    const slug = "supporting-a-partner-with-arthritis-strategies";
    const entry = heads[`/blog/${slug}`];
    expect(entry?.title).toBe(
      "Supporting a Partner With Arthritis: Strategies",
    );
    expect(entry?.title).not.toMatch(/Partner With \|/);
    expect(entry?.ogImage).toBe(`${SITE}/openverse/${map[slug]}`);
  });
});
