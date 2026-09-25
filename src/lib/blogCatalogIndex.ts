/**
 * Lightweight blog catalog for UI surfaces (lists, footer, search, related
 * articles). It never imports article bodies.
 *
 * The full corpus lives in src/content/blog/*-batch.json (~3 MB) and is only
 * reachable through src/lib/staticBlogCatalog.ts — which app code must NOT
 * import statically (it would put ~470 KB gzipped of JS on every page). Blog
 * pages load a single article body via loadBlogArticleBody().
 *
 * blogCatalogIndex.generated.json is produced by
 * scripts/generate-blog-catalog-index.mjs (prebuild/predev) and guarded by
 * src/lib/__tests__/blog-catalog-index.test.ts.
 */
import indexRows from "@/data/blogCatalogIndex.generated.json";
import { listPublishedArticles } from "@/data/staticBlog";
import type { StaticBlogArticle } from "@/lib/staticBlogCatalog";

export type BlogListItem = Pick<
  StaticBlogArticle,
  | "slug"
  | "title"
  | "meta_title"
  | "excerpt"
  | "date"
  | "category"
  | "image_url"
  | "display_order"
  | "author"
  | "updated_at"
  | "keywords"
> & {
  tags?: string[] | null;
};

const STATIC_LIST = indexRows as BlogListItem[];
const STATIC_BY_SLUG = new Map(STATIC_LIST.map((item) => [item.slug, item]));

export function mergePreferStatic<T extends { slug: string }>(
  staticItems: T[],
  remoteItems: T[] | null | undefined,
): T[] {
  const map = new Map<string, T>();
  for (const item of remoteItems ?? []) {
    if (item?.slug) map.set(item.slug, item);
  }
  for (const item of staticItems) {
    map.set(item.slug, item);
  }
  return [...map.values()];
}

export function sortBlogList<T extends { display_order?: number; date?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const order = (b.display_order ?? 0) - (a.display_order ?? 0);
    if (order !== 0) return order;
    return (b.date ?? "").localeCompare(a.date ?? "");
  });
}

/** List fields for every published batch article (no bodies). */
export function getStaticBlogList(): BlogListItem[] {
  return STATIC_LIST;
}

export function getStaticBlogListItem(slug: string | undefined): BlogListItem | undefined {
  if (!slug) return undefined;
  return STATIC_BY_SLUG.get(slug);
}

/**
 * Single published list for every UI surface: frailty + phase2 batches
 * preferred over the legacy blogList snapshot when slugs overlap.
 */
export function getPublishedBlogList(): BlogListItem[] {
  return sortBlogList(
    mergePreferStatic(getStaticBlogList(), listPublishedArticles() as BlogListItem[]),
  );
}

// One lazily-loaded JSON chunk per article, generated at build time. Empty
// when the generator has not run (unit tests, prerender builds) — then we
// fall back to the full catalog so behaviour never changes.
const ARTICLE_BODIES = import.meta.glob<{ default: StaticBlogArticle }>(
  "/src/data/generated/blog-articles/*.json",
);
const HAS_ARTICLE_BODIES = Object.keys(ARTICLE_BODIES).length > 0;

/**
 * Full article (with `content`) for one slug: batch article first, then the
 * published legacy snapshot. Returns null when no published article exists.
 */
export async function loadBlogArticleBody(
  slug: string | undefined,
): Promise<StaticBlogArticle | null> {
  if (!slug) return null;
  if (HAS_ARTICLE_BODIES) {
    const loader =
      ARTICLE_BODIES[`/src/data/generated/blog-articles/${encodeURIComponent(slug)}.json`];
    if (!loader) return null;
    const mod = await loader();
    return mod.default ?? null;
  }
  const [{ getStaticBlogArticle }, { getPublishedArticle }] = await Promise.all([
    import("@/lib/staticBlogCatalog"),
    import("@/data/staticBlog"),
  ]);
  const fromCatalog = getStaticBlogArticle(slug);
  if (fromCatalog) return fromCatalog;
  return ((await getPublishedArticle(slug)) as StaticBlogArticle | null) ?? null;
}
