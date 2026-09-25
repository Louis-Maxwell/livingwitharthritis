import frailtyBatch from "@/content/blog/frailty-batch.json";
import phase2Batch from "@/content/blog/phase2-batch.json";
import { listPublishedArticles } from "@/data/staticBlog";
import {
  mergePreferStatic,
  sortBlogList,
  type BlogListItem,
} from "@/lib/blogCatalogIndex";

/**
 * FULL blog corpus (article bodies, ~3 MB). Do NOT import this module
 * statically from app/UI code: it puts a ~470 KB gzipped chunk on every page
 * that uses it. UI surfaces use src/lib/blogCatalogIndex.ts (list fields) and
 * loadBlogArticleBody() (one article per page). Kept for scripts/tests and as
 * the dynamic-import fallback when per-article files are not generated.
 */

export { mergePreferStatic, sortBlogList, type BlogListItem };

export interface StaticBlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  keywords: string | null;
  author: string | null;
  author_credentials: string | null;
  reviewed_by: string | null;
  reviewer_credentials: string | null;
  is_published: boolean;
  display_order: number;
  updated_at?: string | null;
  direct_answer?: string | null;
  citations?: { label: string; url: string; publisher?: string }[] | null;
}

const STATIC_ARTICLES: StaticBlogArticle[] = [
  ...(frailtyBatch as StaticBlogArticle[]),
  ...(phase2Batch as StaticBlogArticle[]),
].filter(
  (article) => article?.is_published && typeof article.slug === "string" && article.slug.length > 0,
);

const BY_SLUG = new Map(STATIC_ARTICLES.map((article) => [article.slug, article]));

export function getStaticBlogArticles(): StaticBlogArticle[] {
  return STATIC_ARTICLES;
}

export function getStaticBlogArticle(slug: string | undefined): StaticBlogArticle | undefined {
  if (!slug) return undefined;
  return BY_SLUG.get(slug);
}

export function getStaticBlogList(): BlogListItem[] {
  return STATIC_ARTICLES.map((article) => ({
    slug: article.slug,
    title: article.title,
    meta_title: article.meta_title,
    excerpt: article.excerpt,
    date: article.date,
    category: article.category,
    image_url: article.image_url,
    display_order: article.display_order,
    author: article.author,
    updated_at: article.updated_at ?? null,
    keywords: article.keywords,
  }));
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
