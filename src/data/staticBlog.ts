import blogList from "./blogList.json";
import { getClustersForArticle, scoreCandidate } from "@/lib/relatedClusters";
import { canonicalBlogCategoryKey, blogCategoryAliases } from "@/data/blogCategories";

export interface BlogArticleCitation {
  label: string;
  url: string;
  publisher?: string;
}

export interface DBBlogArticle {
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
  citations?: BlogArticleCitation[] | null;
}

export type BlogListItem = Pick<
  DBBlogArticle,
  | "slug"
  | "title"
  | "meta_title"
  | "excerpt"
  | "date"
  | "category"
  | "image_url"
  | "display_order"
  | "keywords"
  | "direct_answer"
>;

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

const LIST = (blogList as BlogListItem[]).slice().sort((a, b) => {
  if ((b.display_order ?? 0) !== (a.display_order ?? 0)) {
    return (b.display_order ?? 0) - (a.display_order ?? 0);
  }
  return (b.date ?? "").localeCompare(a.date ?? "");
});

export function listPublishedArticles(): BlogListItem[] {
  return LIST;
}

export function listArticlesByCategory(categories: string[], limit = 4): BlogListItem[] {
  if (categories.length === 0) return LIST.slice(0, limit);
  const aliases = new Set(expandCategoryAliases(categories));
  return LIST.filter((a) => aliases.has(a.category)).slice(0, limit);
}

export function getListItem(slug: string): BlogListItem | null {
  return LIST.find((a) => a.slug === slug) ?? null;
}

export function nextArticle(currentSlug: string): { slug: string; title: string } | null {
  const current = getListItem(currentSlug);
  if (!current) return null;
  const older = LIST.filter((a) => a.slug !== currentSlug && a.date < current.date);
  if (older.length) return { slug: older[0].slug, title: older[0].title };
  const newest = LIST.find((a) => a.slug !== currentSlug);
  return newest ? { slug: newest.slug, title: newest.title } : null;
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

export function relatedArticles(
  currentSlug: string,
  options: RelatedArticlesOptions = {},
): RelatedArticle[] {
  const { seedClusters, seedCategory, seedTitle, seedExcerpt, seedKeywords } = options;
  let sourceClusters: string[] = seedClusters ?? [];
  let sourceCategory: string | null = seedCategory ?? null;
  const current = getListItem(currentSlug);
  if (current && (sourceClusters.length === 0 || !sourceCategory)) {
    sourceCategory = sourceCategory ?? current.category ?? null;
    if (sourceClusters.length === 0) {
      sourceClusters = getClustersForArticle(current);
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

  const candidates = LIST.filter((a) => a.slug !== currentSlug).slice(0, 30) as RelatedArticle[];
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
}

export async function getPublishedArticle(slug: string): Promise<DBBlogArticle | null> {
  const all = (await import("./blogArticles.json")).default as DBBlogArticle[];
  return all.find((a) => a.slug === slug && a.is_published) ?? null;
}
