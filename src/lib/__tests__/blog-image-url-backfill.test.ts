import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import blogSlugs from "@/data/blog-slugs.generated.json";
import blogCoverMap from "@/data/blog-cover-map.generated.json";
import blogArticles from "@/data/blogArticles.json";
import blogList from "@/data/blogList.json";

const OPENVERSE_DIR = join(process.cwd(), "public", "openverse");
const CONTENT_DIR = resolve("src/content/blog");

type Row = { slug?: string; image_url?: string | null; is_published?: boolean };

function loadContentBatches(): Row[] {
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

describe("published blog image_url backfill", () => {
  const map = blogCoverMap as Record<string, string>;
  const slugs = blogSlugs as string[];
  const articles = blogArticles as Row[];
  const list = blogList as Row[];
  const content = loadContentBatches();

  it("has a cover-map entry and on-disk file for every published slug", () => {
    expect(slugs.length).toBe(505);
    expect(Object.keys(map).length).toBe(505);
    const missingMap: string[] = [];
    const missingFile: string[] = [];
    for (const slug of slugs) {
      const file = map[slug];
      if (!file) {
        missingMap.push(slug);
        continue;
      }
      if (!existsSync(join(OPENVERSE_DIR, file))) {
        missingFile.push(`${slug} => ${file}`);
      }
    }
    expect(missingMap).toEqual([]);
    expect(missingFile).toEqual([]);
  });

  it("sets non-null /openverse image_url matching the cover map on all content batches", () => {
    expect(content.length).toBeGreaterThan(200);
    const bad: string[] = [];
    for (const row of content) {
      const slug = row.slug!;
      const expected = `/openverse/${map[slug]}`;
      if (!row.image_url || row.image_url !== expected) {
        bad.push(`${slug}: ${String(row.image_url)} !== ${expected}`);
      }
    }
    expect(bad, bad.slice(0, 10).join("\n")).toEqual([]);
  });

  it("sets non-null /openverse image_url matching the cover map on blogArticles and blogList", () => {
    for (const [label, rows] of [
      ["blogArticles", articles],
      ["blogList", list],
    ] as const) {
      expect(rows.length).toBeGreaterThan(200);
      const bad: string[] = [];
      for (const row of rows) {
        const slug = row.slug!;
        const expected = `/openverse/${map[slug]}`;
        if (!row.image_url || row.image_url !== expected) {
          bad.push(`${label}/${slug}: ${String(row.image_url)} !== ${expected}`);
        }
      }
      expect(bad, bad.slice(0, 10).join("\n")).toEqual([]);
    }
  });

  it("covers every published slug across articles + content with non-null image_url", () => {
    const bySlug = new Map<string, string | null | undefined>();
    for (const row of [...articles, ...content]) {
      if (row.slug) bySlug.set(row.slug, row.image_url);
    }
    const missing: string[] = [];
    for (const slug of slugs) {
      const iu = bySlug.get(slug);
      if (!iu || !iu.startsWith("/openverse/") || iu !== `/openverse/${map[slug]}`) {
        missing.push(`${slug}: ${String(iu)}`);
      }
    }
    expect(bySlug.size).toBe(slugs.length);
    expect(missing).toEqual([]);
  });

  it("keeps the partner sample cover on disk and in content image_url", () => {
    const slug = "supporting-a-partner-with-arthritis-strategies";
    const file = map[slug];
    expect(file).toBe("lwa-supporting-a-partner-with-arthritis-strategies.webp");
    expect(existsSync(join(OPENVERSE_DIR, file))).toBe(true);
    const row = content.find((r) => r.slug === slug);
    expect(row?.image_url).toBe(`/openverse/${file}`);
  });
});
