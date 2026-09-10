import { useQuery } from "@tanstack/react-query";
import { getClustersForArticle, scoreCandidate } from "@/lib/relatedClusters";
import { readEmbeddedBlogArticle } from "@/lib/embeddedBlogArticle";
import {
  getStaticBlogArticle,
  getStaticBlogArticles,
  getStaticBlogList,
  mergePreferStatic,
  sortBlogList,
} from "@/lib/staticBlogCatalog";
import {
  getPublishedArticle,
  listArticlesByCategory,
  listPublishedArticles,
  nextArticle,
  type DBBlogArticle,
} from "@/data/staticBlog";
import { canonicalBlogCategoryKey, blogCategoryAliases } from "@/data/blogCategories";

export { readEmbeddedBlogArticle } from "@/lib/embeddedBlogArticle";
export type { DBBlogArticle, BlogArticleCitation } from "@/data/staticBlog";

type BlogListItem = Pick<
  DBBlogArticle,
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
> & {
  tags?: string[] | null;
};

function asArticle(row: unknown): DBBlogArticle {
  return row as DBBlogArticle;
}

function snapshotList(): BlogListItem[] {
  return sortBlogList(
    mergePreferStatic(getStaticBlogList(), listPublishedArticles() as BlogListItem[]),
  );
}

/** Single article by slug from the checked-in snapshot. */
export function useBlogArticle(slug: string | undefined) {
  const initialData =
    typeof document === "undefined"
      ? null
      : readEmbeddedBlogArticle<DBBlogArticle>(document, slug);
  return useQuery({
    queryKey: ["blog_article", slug],
    queryFn: async () => {
      if (!slug) return null;
      const catalog = getStaticBlogArticle(slug);
      if (catalog) return asArticle(catalog);
      const snapshot = await getPublishedArticle(slug);
      return snapshot ? asArticle(snapshot) : null;
    },
    enabled: !!slug,
    ...(initialData ? { initialData, initialDataUpdatedAt: Date.now() } : {}),
  });
}

/** All published articles (list fields only), ordered by display_order then date */
export function useBlogArticlesList() {
  return useQuery({
    queryKey: ["blog_articles_list"],
    queryFn: async () => snapshotList(),
  });
}

/** Top editor's-pick articles for the featured strip */
export function useFeaturedArticles(limit = 3) {
  return useQuery({
    queryKey: ["blog_articles_featured", limit],
    queryFn: async () => snapshotList().slice(0, limit),
  });
}

function expandCategoryAliases(categories: string[]): string[] {
  const expanded = new Set<string>();
  for (const c of categories) {
    const key = canonicalBlogCategoryKey(c);
    if (key) {
      for (const alias of blogCategoryAliases(key)) expanded.add(alias);
      expanded.add(key);
    }
    expanded.add(c);
  }
  return [...expanded];
}

/** Recent articles filtered by one or more categories — used on Condition pages */
export function useConditionArticles(categories: string[] = [], limit = 4) {
  return useQuery({
    queryKey: ["blog_articles_by_categories", categories, limit],
    queryFn: async () => {
      const aliases = new Set(expandCategoryAliases(categories));
      const fromSnapshot = listArticlesByCategory(categories, Math.max(limit, 30));
      const merged = snapshotList().filter((article) =>
        categories.length === 0 ? true : aliases.has(article.category),
      );
      const combined = sortBlogList(mergePreferStatic(merged, fromSnapshot)).filter((article) =>
        categories.length === 0 ? true : aliases.has(article.category),
      );
      return combined.slice(0, limit);
    },
  });
}

/** Next article for continue-reading bar */
export function useNextArticle(currentSlug: string) {
  return useQuery({
    queryKey: ["next_article", currentSlug],
    queryFn: async () => {
      const fromSnapshot = nextArticle(currentSlug);
      const list = snapshotList();
      const current = list.find((a) => a.slug === currentSlug) ?? getStaticBlogArticle(currentSlug);
      if (!current) return fromSnapshot;
      const older = list
        .filter((a) => a.slug !== currentSlug && (a.date ?? "") < (current.date ?? ""))
        .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
      if (older[0]) return { slug: older[0].slug, title: older[0].title };
      const newest = list.find((a) => a.slug !== currentSlug);
      return newest ? { slug: newest.slug, title: newest.title } : fromSnapshot;
    },
  });
}

export interface RelatedArticle {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  keywords?: string | null;
}

export interface RelatedArticlesOptions {
  seedClusters?: string[];
  seedCategory?: string;
  seedTitle?: string;
  seedExcerpt?: string;
  seedKeywords?: string;
}

export function useRelatedArticles(
  currentSlug: string,
  options: RelatedArticlesOptions = {},
) {
  const { seedClusters, seedCategory, seedTitle, seedExcerpt, seedKeywords } = options;

  return useQuery({
    queryKey: [
      "related_articles_v2",
      currentSlug,
      seedClusters ?? null,
      seedCategory ?? null,
      seedTitle ?? null,
    ],
    queryFn: async () => {
      let sourceClusters: string[] = seedClusters ?? [];
      let sourceCategory: string | null = seedCategory ?? null;

      const staticCurrent =
        getStaticBlogArticle(currentSlug) ??
        listPublishedArticles().find((a) => a.slug === currentSlug) ??
        null;
      if (currentSlug && (sourceClusters.length === 0 || !sourceCategory)) {
        if (staticCurrent) {
          sourceCategory = sourceCategory ?? staticCurrent.category ?? null;
          if (sourceClusters.length === 0) {
            sourceClusters = getClustersForArticle(staticCurrent);
          }
        }
      }

      if (sourceClusters.length === 0) {
        sourceClusters = getClustersForArticle({
          title: seedTitle,
          excerpt: seedExcerpt,
          category: sourceCategory,
          keywords: seedKeywords,
        });
      }

      const staticPool: RelatedArticle[] = [
        ...getStaticBlogArticles(),
        ...listPublishedArticles(),
      ]
        .filter((a) => a.slug !== currentSlug)
        .map((a) => ({
          slug: a.slug,
          title: a.title,
          excerpt: a.excerpt,
          date: a.date,
          category: a.category,
          keywords: a.keywords,
        }));

      const candidates = mergePreferStatic(staticPool, []).slice(0, 40);

      const scored = candidates
        .map((a) => ({
          article: a,
          score: scoreCandidate(a, sourceClusters, sourceCategory),
        }))
        .sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return (b.article.date ?? "").localeCompare(a.article.date ?? "");
        });

      const top = scored.filter((s) => s.score > 0).slice(0, 3);
      if (top.length >= 3) return top.map((s) => s.article);

      const filler = candidates
        .filter((c) => !top.find((t) => t.article.slug === c.slug))
        .slice(0, 3 - top.length);

      return [...top.map((s) => s.article), ...filler];
    },
  });
}
