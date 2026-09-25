#!/usr/bin/env node
/**
 * Blog catalog split (performance).
 *
 * The full blog corpus (src/content/blog/*-batch.json, ~3 MB of article
 * bodies) used to be statically imported by the footer "Most read" strip,
 * site search and every related-article widget, so every condition and blog
 * page shipped a ~3.4 MB (≈470 KB gzipped) JS chunk before it could paint.
 *
 * This script derives three lightweight artefacts from the source batches:
 *
 *   1. src/data/blogCatalogIndex.generated.json  (committed)
 *      List fields only (no `content`) for every published batch article —
 *      the same shape as getStaticBlogList() in src/lib/staticBlogCatalog.ts.
 *   2. src/data/blogMostRead.generated.json       (committed)
 *      The 5 items shown in the footer "Most read this week" strip —
 *      identical to getPublishedBlogList().slice(0, 5).
 *   3. src/data/generated/blog-articles/<slug>.json (gitignored, build-time)
 *      One full article per file so a blog page lazy-loads only its own body
 *      (see loadBlogArticleBody in src/lib/blogCatalogIndex.ts). When these
 *      files are absent (unit tests, PRERENDER builds that skip prebuild) the
 *      loader falls back to the full catalog, so behaviour is unchanged.
 *
 * Runs in `prebuild` and `predev`. Re-run after editing blog batches:
 *   node scripts/generate-blog-catalog-index.mjs
 * src/lib/__tests__/blog-catalog-index.test.ts fails if 1/2 drift.
 */
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => JSON.parse(readFileSync(join(ROOT, rel), "utf8"));

const BATCHES = ["src/content/blog/frailty-batch.json", "src/content/blog/phase2-batch.json"];

// Mirrors STATIC_ARTICLES in src/lib/staticBlogCatalog.ts
const staticArticles = BATCHES.flatMap((rel) => read(rel)).filter(
  (a) => a?.is_published && typeof a.slug === "string" && a.slug.length > 0,
);

// Mirrors getStaticBlogList()
const staticList = staticArticles.map((a) => ({
  slug: a.slug,
  title: a.title,
  meta_title: a.meta_title,
  excerpt: a.excerpt,
  date: a.date,
  category: a.category,
  image_url: a.image_url,
  display_order: a.display_order,
  author: a.author,
  updated_at: a.updated_at ?? null,
  keywords: a.keywords,
}));

// Mirrors listPublishedArticles() in src/data/staticBlog.ts
const legacyList = read("src/data/blogList.json")
  .slice()
  .sort((a, b) => {
    if ((b.display_order ?? 0) !== (a.display_order ?? 0)) {
      return (b.display_order ?? 0) - (a.display_order ?? 0);
    }
    return (b.date ?? "").localeCompare(a.date ?? "");
  });

// Mirrors mergePreferStatic() + sortBlogList() → getPublishedBlogList()
const merged = new Map();
for (const item of legacyList) if (item?.slug) merged.set(item.slug, item);
for (const item of staticList) merged.set(item.slug, item);
const published = [...merged.values()].sort((a, b) => {
  const order = (b.display_order ?? 0) - (a.display_order ?? 0);
  if (order !== 0) return order;
  return (b.date ?? "").localeCompare(a.date ?? "");
});
const mostRead = published.slice(0, 5).map((a) => ({ slug: a.slug, title: a.title }));

const writeJson = (rel, data) => {
  const abs = join(ROOT, rel);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, JSON.stringify(data, null, 2) + "\n");
};

writeJson("src/data/blogCatalogIndex.generated.json", staticList);
writeJson("src/data/blogMostRead.generated.json", mostRead);

// Per-article bodies. Precedence matches useBlogArticle(): batch article
// first, then the published legacy snapshot (src/data/blogArticles.json).
const OUT_DIR = join(ROOT, "src/data/generated/blog-articles");
rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });
const bodies = new Map();
for (const a of read("src/data/blogArticles.json")) {
  if (a?.is_published && typeof a.slug === "string" && a.slug && !bodies.has(a.slug)) {
    bodies.set(a.slug, a);
  }
}
for (const a of staticArticles) bodies.set(a.slug, a);
for (const [slug, article] of bodies) {
  writeFileSync(join(OUT_DIR, `${encodeURIComponent(slug)}.json`), JSON.stringify(article));
}

console.log(
  `[blog-catalog-index] ${staticList.length} index rows, ${mostRead.length} most-read, ` +
    `${readdirSync(OUT_DIR).length} per-article files`,
);
