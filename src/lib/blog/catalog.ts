/**
 * Runtime blog catalog — the one module every blog surface reads from.
 *
 * - Listings import only the metadata index (`catalog.generated.json`,
 *   ~65 KB gzipped for 505 guides, no bodies).
 * - Article bodies are lazy-loaded per slug via `import.meta.glob`, so each
 *   guide ships as its own small chunk and no listing page pays for bodies.
 *
 * Source of truth: `src/content/blog/posts/<slug>.json`.
 * Regenerate the index with `bun scripts/generate-blog-catalog.ts`
 * (runs automatically in predev/prebuild).
 */
import catalogJson from "@/content/blog/catalog.generated.json";
import { canonicalBlogCategoryKey, blogCategoryAliases } from "@/data/blogCategories";
import type { BlogCitation, BlogMeta, BlogPost } from "./schema";

export type { BlogCitation, BlogMeta, BlogPost } from "./schema";

/** Listing row. `tags` is optional and currently unused by the data. */
export type BlogListItem = BlogMeta & { tags?: string[] | null };

const CATALOG: readonly BlogListItem[] = catalogJson as BlogListItem[];
const BY_SLUG = new Map(CATALOG.map((row) => [row.slug, row]));

const POST_LOADERS = import.meta.glob<BlogPost>("/src/content/blog/posts/*.json", {
  import: "default",
});

/** Every published guide, ordered by display_order desc then newest date. */
export function getBlogCatalog(): BlogListItem[] {
  return CATALOG as BlogListItem[];
}

export function getBlogMeta(slug: string | undefined | null): BlogListItem | undefined {
  return slug ? BY_SLUG.get(slug) : undefined;
}

export function hasBlogPost(slug: string | undefined | null): boolean {
  return !!slug && BY_SLUG.has(slug);
}

/** Lazy-load one full guide (body, citations, credentials). */
export async function loadBlogPost(slug: string | undefined | null): Promise<BlogPost | null> {
  if (!slug || !BY_SLUG.has(slug)) return null;
  const loader = POST_LOADERS[`/src/content/blog/posts/${slug}.json`];
  if (!loader) return null;
  const post = await loader();
  return post && post.is_published ? post : null;
}

export function sortBlogList<T extends { display_order?: number; date?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const order = (b.display_order ?? 0) - (a.display_order ?? 0);
    if (order !== 0) return order;
    return (b.date ?? "").localeCompare(a.date ?? "");
  });
}

export function expandCategoryAliases(categories: string[]): Set<string> {
  const expanded = new Set<string>();
  for (const c of categories) {
    const key = canonicalBlogCategoryKey(c);
    if (key) {
      for (const alias of blogCategoryAliases(key)) expanded.add(alias);
      expanded.add(key);
    }
    expanded.add(c);
  }
  return expanded;
}

/** Guides in any of the given categories (aliases included), catalog order. */
export function listBlogByCategory(categories: string[], limit = 4): BlogListItem[] {
  if (categories.length === 0) return CATALOG.slice(0, limit);
  const aliases = expandCategoryAliases(categories);
  return CATALOG.filter((a) => aliases.has(a.category)).slice(0, limit);
}

/** The next-older guide by publish date (falls back to the newest). */
export function nextBlogPost(currentSlug: string): { slug: string; title: string } | null {
  const current = BY_SLUG.get(currentSlug);
  if (!current) return null;
  const older = CATALOG.filter((a) => a.slug !== currentSlug && a.date < current.date).sort((a, b) =>
    b.date.localeCompare(a.date),
  );
  if (older[0]) return { slug: older[0].slug, title: older[0].title };
  const newest = CATALOG.find((a) => a.slug !== currentSlug);
  return newest ? { slug: newest.slug, title: newest.title } : null;
}
