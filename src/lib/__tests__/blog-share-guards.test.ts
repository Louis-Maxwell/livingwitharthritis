import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import blogSlugs from "@/data/blog-slugs.generated.json";
import blogCoverMap from "@/data/blog-cover-map.generated.json";
import blogArticles from "@/data/blogArticles.json";
import blogList from "@/data/blogList.json";

const SITE = "https://livingwitharthritis.org.uk";
const OPENVERSE_DIR = join(process.cwd(), "public", "openverse");
const CONTENT_DIR = resolve("src/content/blog");
const HEAD_PATH = resolve("scripts/blog-head-data.json");
const AWKWARD_TITLE_RE =
  /(?:\bWith\s*\|\s*|\bAnd\s*\|\s*|\bFor\s*\|\s*|\bThe\s*\|\s*|\|\s*$)/i;

type Row = { slug?: string; image_url?: string | null; is_published?: boolean };

function loadContent(): Row[] {
  const rows: Row[] = [];
  for (const name of readdirSync(CONTENT_DIR)) {
    if (!name.endsWith(".json")) continue;
    const raw = JSON.parse(readFileSync(join(CONTENT_DIR, name), "utf8"));
    const batch = Array.isArray(raw) ? raw : [raw];
    for (const row of batch) {
      if (row?.slug && row?.is_published !== false) rows.push(row);
    }
  }
  return rows;
}

describe("blog share / cover regression guards", () => {
  const slugs = blogSlugs as string[];
  const map = blogCoverMap as Record<string, string>;
  const heads = JSON.parse(readFileSync(HEAD_PATH, "utf8")) as Record<
    string,
    { title?: string; ogImage?: string }
  >;
  const articles = blogArticles as Row[];
  const list = blogList as Row[];
  const content = loadContent();

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

  it("keeps published image_url non-null and map-aligned (articles + content + list)", () => {
    const published = new Map<string, string | null | undefined>();
    for (const row of [...articles, ...content]) {
      if (row.slug) published.set(row.slug, row.image_url);
    }
    const bad: string[] = [];
    for (const slug of slugs) {
      const expected = `/openverse/${map[slug]}`;
      const iu = published.get(slug);
      if (!iu || iu !== expected) bad.push(`${slug}: ${String(iu)} !== ${expected}`);
    }
    expect(bad, bad.slice(0, 10).join("\n")).toEqual([]);

    const badList: string[] = [];
    for (const row of list) {
      if (!row.slug || !(row.slug in map)) continue;
      const expected = `/openverse/${map[row.slug]}`;
      if (!row.image_url || row.image_url !== expected) {
        badList.push(`${row.slug}: ${String(row.image_url)}`);
      }
    }
    expect(badList, badList.slice(0, 10).join("\n")).toEqual([]);
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
