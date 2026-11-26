import { useQuery } from "@tanstack/react-query";
import { relatedBlogPosts } from "@/lib/relatedBlogPosts.mjs";
import type { BlogPost } from "@/lib/blog/schema";

export { readEmbeddedBlogArticle } from "@/lib/embeddedBlogArticle";
export type { BlogCitation as BlogArticleCitation, BlogListItem } from "@/lib/blog/catalog";
/** Full guide record (kept under its historic name for existing callers). */
export type DBBlogArticle = BlogPost;

export { useBlogArticle } from "./useBlogArticle";

/** All published articles (metadata only), ordered by display_order then date. */
export function useBlogArticlesList() {
  return useQuery({
    queryKey: ["blog_articles_list"],
    queryFn: async () => (await import("@/lib/blog/catalog")).getListedBlogCatalog(),
  });
}

/** Top editor's-pick articles for the featured strip. */
export function useFeaturedArticles(limit = 3) {
  return useQuery({
    queryKey: ["blog_articles_featured", limit],
    queryFn: async () => (await import("@/lib/blog/catalog")).getListedBlogCatalog().slice(0, limit),
  });
}

/** Recent articles filtered by one or more categories — used on condition/category pages. */
export function useConditionArticles(categories: string[] = [], limit = 4) {
  return useQuery({
    queryKey: ["blog_articles_by_categories", categories, limit],
    queryFn: async () => {
      const { expandCategoryAliases, getListedBlogCatalog } = await import("@/lib/blog/catalog");
      const aliases = expandCategoryAliases(categories);
      return getListedBlogCatalog()
        .filter((article) => (categories.length === 0 ? true : aliases.has(article.category)))
        .slice(0, limit);
    },
  });
}

/** Next article for the continue-reading bar. */
export function useNextArticle(currentSlug: string) {
  return useQuery({
    queryKey: ["next_article", currentSlug],
    queryFn: async () => (await import("@/lib/blog/catalog")).nextBlogPost(currentSlug),
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
      const { getListedBlogCatalog, getBlogMeta } = await import("@/lib/blog/catalog");
      const current = getBlogMeta(currentSlug) ?? {
        slug: currentSlug, title: seedTitle || '', excerpt: seedExcerpt || '',
        category: seedCategory || '', keywords: seedKeywords || '',
      };
      return relatedBlogPosts(current, getListedBlogCatalog());
    },
  });
}
