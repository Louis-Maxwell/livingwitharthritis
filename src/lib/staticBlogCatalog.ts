import frailtyBatch from "@/content/blog/frailty-batch.json";
import phase2Batch from "@/content/blog/phase2-batch.json";

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

export type BlogListItem = Pick<
  StaticBlogArticle,
  "slug" | "title" | "meta_title" | "excerpt" | "date" | "category" | "image_url" | "display_order"
>;

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
  }));
}

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
