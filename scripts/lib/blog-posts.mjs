/**
 * Node-side reader for the single blog source of truth:
 *   src/content/blog/posts/<slug>.json   (one file per guide)
 *
 * Every build script (catalog, head data, sitemap, search index, llms) reads
 * guides through here so there is exactly one place that knows the layout.
 * Schema: src/lib/blog/schema.ts (validated by scripts/generate-blog-catalog.ts
 * and src/lib/__tests__/blog-catalog-integrity.test.ts).
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";

export const BLOG_POSTS_DIR = "src/content/blog/posts";
export const BLOG_CATALOG_PATH = "src/content/blog/catalog.generated.json";
export const WORDS_PER_MINUTE = 200;

/** Read every guide file, sorted by slug. Throws on unparsable JSON. */
export function readAllBlogPosts(root = process.cwd()) {
  const dir = resolve(root, BLOG_POSTS_DIR);
  if (!existsSync(dir)) return [];
  const posts = [];
  for (const name of readdirSync(dir).sort()) {
    if (!name.endsWith(".json")) continue;
    const file = join(dir, name);
    let post;
    try {
      post = JSON.parse(readFileSync(file, "utf8"));
    } catch (err) {
      throw new Error(`[blog] ${BLOG_POSTS_DIR}/${name} is not valid JSON: ${err.message}`);
    }
    const expected = name.replace(/\.json$/, "");
    if (post?.slug !== expected) {
      throw new Error(`[blog] ${BLOG_POSTS_DIR}/${name}: slug "${post?.slug}" must match file name "${expected}"`);
    }
    posts.push(post);
  }
  return posts;
}

/** Published guides only. */
export function readPublishedBlogPosts(root = process.cwd()) {
  return readAllBlogPosts(root).filter((p) => p.is_published !== false);
}

/** Plain-text word count of an HTML/Markdown body. */
export function countWords(body) {
  if (!body) return 0;
  const text = String(body).replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/gi, " ");
  return (text.match(/[A-Za-z][A-Za-z'-]*/g) ?? []).length;
}

export function readingMinutes(words) {
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** Listing order used everywhere: display_order desc, then newest date. */
export function compareBlogOrder(a, b) {
  const order = (b.display_order ?? 0) - (a.display_order ?? 0);
  if (order !== 0) return order;
  const d = String(b.date ?? "").localeCompare(String(a.date ?? ""));
  if (d !== 0) return d;
  return String(a.slug).localeCompare(String(b.slug));
}

/** Read the committed metadata index (no bodies). */
export function readBlogCatalog(root = process.cwd()) {
  const file = resolve(root, BLOG_CATALOG_PATH);
  if (!existsSync(file)) return [];
  return JSON.parse(readFileSync(file, "utf8"));
}
