/**
 * Compatibility re-exports for the lightweight blog list API.
 *
 * The single source of truth is src/content/blog/posts/<slug>.json. The
 * metadata-only index (src/content/blog/catalog.generated.json) and lazy
 * per-article body loading live in src/lib/blog/catalog.ts — import from
 * there in new code. This module is kept so existing callers (homepage
 * preview, site search) keep working unchanged.
 */
import {
  getBlogCatalog,
  getBlogMeta,
  loadBlogPost,
  sortBlogList,
  type BlogListItem,
} from "@/lib/blog/catalog";

export type { BlogListItem };
export { sortBlogList };

export function mergePreferStatic<T extends { slug: string }>(
  staticItems: T[],
  remoteItems: T[] | null | undefined,
): T[] {
  const map = new Map<string, T>();
  for (const item of remoteItems ?? []) {
    if (item?.slug) map.set(item.slug, item);
  }
  for (const item of staticItems) map.set(item.slug, item);
  return [...map.values()];
}

/** Metadata for every published guide (no bodies). */
export function getStaticBlogList(): BlogListItem[] {
  return getBlogCatalog();
}

export function getStaticBlogListItem(slug: string | undefined): BlogListItem | undefined {
  return getBlogMeta(slug);
}

/** Single published list for every UI surface (metadata only). */
export function getPublishedBlogList(): BlogListItem[] {
  return getBlogCatalog();
}

/** Full guide (with `content`) for one slug, lazy-loaded. Null if unknown. */
export const loadBlogArticleBody = loadBlogPost;
