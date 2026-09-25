#!/usr/bin/env bun
/**
 * Blog catalog generator — the only step needed after adding or editing a guide.
 *
 * Reads:  src/content/blog/posts/<slug>.json   (single source of truth)
 * Checks: every file against blogPostSchema (src/lib/blog/schema.ts), plus
 *         unique slugs, unique titles, and unique covers.
 * Writes: src/content/blog/catalog.generated.json  — metadata-only index for listings
 *         src/data/blog-cover-map.generated.json   — slug → cover file (articleImages.ts)
 *         src/data/contentStats.generated.json     — honest count + word counts
 *         src/data/blogMostRead.generated.json     — footer "Most read" top 5 (tiny, no catalog import)
 *
 * Runs automatically in `predev` / `prebuild`. Downstream generators
 * (blog head data, sitemap/slug list, prerender routes, llms, search index)
 * read the posts/catalog after this.
 *
 *   bun scripts/generate-blog-catalog.ts          # write
 *   bun scripts/generate-blog-catalog.ts --check  # fail if committed files are stale
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import {
  BLOG_CATALOG_PATH,
  compareBlogOrder,
  countWords,
  readAllBlogPosts,
  readingMinutes,
} from "./lib/blog-posts.mjs";
import {
  BLOG_META_FIELDS,
  blogMetaSchema,
  blogPostSchema,
  type BlogMeta,
  type BlogPost,
} from "../src/lib/blog/schema";

export const COVER_MAP_PATH = "src/data/blog-cover-map.generated.json";
export const CONTENT_STATS_PATH = "src/data/contentStats.generated.json";
export const MOST_READ_PATH = "src/data/blogMostRead.generated.json";

export interface BlogCatalogArtifacts {
  catalog: BlogMeta[];
  coverMap: Record<string, string>;
  contentStats: { blogArticleCount: number; wordCounts: Record<string, number> };
  mostRead: { slug: string; title: string }[];
  errors: string[];
}

export function toBlogMeta(post: BlogPost): BlogMeta {
  const meta = {} as Record<string, unknown>;
  for (const key of BLOG_META_FIELDS) meta[key] = post[key];
  const words = countWords(post.content);
  meta.last_reviewed = post.last_reviewed ?? post.updated_at.slice(0, 10);
  meta.image_url = `/openverse/${post.cover}`;
  meta.word_count = words;
  meta.reading_minutes = readingMinutes(words);
  return meta as BlogMeta;
}

export function buildBlogCatalogArtifacts(root = process.cwd()): BlogCatalogArtifacts {
  const errors: string[] = [];
  const raw = readAllBlogPosts(root) as unknown[];
  const posts: BlogPost[] = [];
  for (const row of raw) {
    const parsed = blogPostSchema.safeParse(row);
    const slug = (row as { slug?: string })?.slug ?? "(unknown)";
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        errors.push(`${slug}: ${issue.path.join(".") || "(root)"} — ${issue.message}`);
      }
      continue;
    }
    posts.push(parsed.data);
  }

  const published = posts.filter((p) => p.is_published);
  const seenTitle = new Map<string, string>();
  const seenCover = new Map<string, string>();
  for (const p of published) {
    const t = p.title.trim().toLowerCase();
    if (seenTitle.has(t)) errors.push(`${p.slug}: duplicate title with ${seenTitle.get(t)}`);
    else seenTitle.set(t, p.slug);
    if (!existsSync(resolve(root, "public/openverse", p.cover))) {
      errors.push(`${p.slug}: cover file public/openverse/${p.cover} does not exist`);
    }
    if (seenCover.has(p.cover)) errors.push(`${p.slug}: cover ${p.cover} already used by ${seenCover.get(p.cover)}`);
    else seenCover.set(p.cover, p.slug);
  }

  const catalog = published.map(toBlogMeta).sort(compareBlogOrder);
  for (const row of catalog) {
    const res = blogMetaSchema.safeParse(row);
    if (!res.success) errors.push(`${row.slug}: catalog row invalid — ${res.error.issues[0]?.message}`);
  }
  const bySlug = [...published].sort((a, b) => a.slug.localeCompare(b.slug));
  const coverMap = Object.fromEntries(bySlug.map((p) => [p.slug, p.cover]));
  const wordCounts = Object.fromEntries(bySlug.map((p) => [p.slug, countWords(p.content)]));
  return {
    catalog,
    coverMap,
    contentStats: { blogArticleCount: published.length, wordCounts },
    mostRead: catalog.slice(0, 5).map((row) => ({ slug: row.slug, title: row.title })),
    errors,
  };
}

export function serializeArtifacts(a: BlogCatalogArtifacts): Record<string, string> {
  return {
    [BLOG_CATALOG_PATH]: `${JSON.stringify(a.catalog, null, 1)}\n`,
    [COVER_MAP_PATH]: `${JSON.stringify(a.coverMap, null, 2)}\n`,
    [CONTENT_STATS_PATH]: `${JSON.stringify(a.contentStats, null, 2)}\n`,
    [MOST_READ_PATH]: `${JSON.stringify(a.mostRead, null, 2)}\n`,
  };
}

function main() {
  const check = process.argv.includes("--check");
  const artifacts = buildBlogCatalogArtifacts();
  if (artifacts.errors.length) {
    console.error(`[blog-catalog] ${artifacts.errors.length} problem(s):`);
    for (const e of artifacts.errors.slice(0, 50)) console.error(`  ✗ ${e}`);
    process.exit(1);
  }
  let stale = 0;
  for (const [rel, body] of Object.entries(serializeArtifacts(artifacts))) {
    const file = resolve(rel);
    const current = existsSync(file) ? readFileSync(file, "utf8") : "";
    if (current === body) continue;
    stale++;
    if (check) console.error(`[blog-catalog] stale: ${rel} — run bun scripts/generate-blog-catalog.ts`);
    else {
      writeFileSync(file, body);
      console.log(`[blog-catalog] wrote ${rel}`);
    }
  }
  console.log(`[blog-catalog] ${artifacts.catalog.length} published guides${stale ? "" : " (up to date)"}`);
  if (check && stale) process.exit(1);
}

if ((import.meta as ImportMeta & { main?: boolean }).main) main();
