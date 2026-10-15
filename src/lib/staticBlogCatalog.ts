/**
 * Compatibility re-exports. New code should import from `@/lib/blog/catalog`.
 * Kept so existing callers (homepage preview, footer, site search) do not
 * need to change.
 */
import { getBlogCatalog, type BlogListItem } from "@/lib/blog/catalog";

export type { BlogListItem } from "@/lib/blog/catalog";
export { sortBlogList } from "@/lib/blog/catalog";

/** Single published list for every UI surface (metadata only). */
export function getPublishedBlogList(): BlogListItem[] {
  return getBlogCatalog();
}
