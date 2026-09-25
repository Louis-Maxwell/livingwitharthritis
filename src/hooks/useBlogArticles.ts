import { useQuery } from "@tanstack/react-query";
import { getClustersForArticle, scoreCandidate } from "@/lib/relatedClusters";
import { readEmbeddedBlogArticle } from "@/lib/embeddedBlogArticle";
import {
  expandCategoryAliases,
  getBlogCatalog,
  getBlogMeta,
  loadBlogPost,
  nextBlogPost,
  type BlogPost,
} from "@/lib/blog/catalog";

export { readEmbeddedBlogArticle } from "@/lib/embeddedBlogArticle";
export type { BlogCitation as BlogArticleCitation, BlogListItem } from "@/lib/blog/catalog";
/** Full guide record (kept under its historic name for existing callers). */
export type DBBlogArticle = BlogPost;

/** Single article by slug — body is lazy-loaded from its own chunk. */
export function useBlogArticle(slug: string | undefined) {
  const initialData =
    typeof document === "undefined"
      ? null
      : readEmbeddedBlogArticle<DBBlogArticle>(document, slug);
  return useQuery({
    queryKey: ["blog_article", slug],
    queryFn: async () => (slug ? loadBlogPost(slug) : null),
    enabled: !!slug,
    ...(initialData ? { initialData, initialDataUpdatedAt: Date.now() } : {}),
  });
}

/** All published articles (metadata only), ordered by display_order then date. */
export function useBlogArticlesList() {
  return useQuery({
    queryKey: ["blog_articles_list"],
    queryFn: async () => getBlogCatalog(),
  });
}

/** Top editor's-pick articles for the featured strip. */
export function useFeaturedArticles(limit = 3) {
  return useQuery({
    queryKey: ["blog_articles_featured", limit],
    queryFn: async () => getBlogCatalog().slice(0, limit),
  });
}

/** Recent articles filtered by one or more categories — used on condition/category pages. */
export function useConditionArticles(categories: string[] = [], limit = 4) {
  return useQuery({
    queryKey: ["blog_articles_by_categories", categories, limit],
    queryFn: async () => {
      const aliases = expandCategoryAliases(categories);
      return getBlogCatalog()
        .filter((article) => (categories.length === 0 ? true : aliases.has(article.category)))
        .slice(0, limit);
    },
  });
}

/** Next article for the continue-reading bar. */
export function useNextArticle(currentSlug: string) {
  return useQuery({
    queryKey: ["next_article", currentSlug],
    queryFn: async () => nextBlogPost(currentSlug),
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

export function useRelatedArticles(currentSlug: string, options: RelatedArticlesOptions = {}) {
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

      const current = getBlogMeta(currentSlug) ?? null;
      if (current && (sourceClusters.length === 0 || !sourceCategory)) {
        sourceCategory = sourceCategory ?? current.category ?? null;
        if (sourceClusters.length === 0) sourceClusters = getClustersForArticle(current);
      }
      if (sourceClusters.length === 0) {
        sourceClusters = getClustersForArticle({
          title: seedTitle,
          excerpt: seedExcerpt,
          category: sourceCategory,
          keywords: seedKeywords,
        });
      }

      const candidates: RelatedArticle[] = getBlogCatalog()
        .filter((a) => a.slug !== currentSlug)
        .map((a) => ({
          slug: a.slug,
          title: a.title,
          excerpt: a.excerpt,
          date: a.date,
          category: a.category,
          keywords: a.keywords,
        }));

      const scored = candidates
        .map((article) => ({ article, score: scoreCandidate(article, sourceClusters, sourceCategory) }))
        .sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return (b.article.date ?? "").localeCompare(a.article.date ?? "");
        });

      const top = scored.filter((s) => s.score > 0).slice(0, 3);
      if (top.length >= 3) return top.map((s) => s.article);

      const picked = new Set(top.map((t) => t.article.slug));
      const filler = candidates.filter((c) => !picked.has(c.slug)).slice(0, 3 - top.length);
      return [...top.map((s) => s.article), ...filler];
    },
  });
}
