import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { getClustersForArticle, scoreCandidate } from "@/lib/relatedClusters";
import { readEmbeddedBlogArticle } from "@/lib/embeddedBlogArticle";

export { readEmbeddedBlogArticle } from "@/lib/embeddedBlogArticle";

// Supabase client removed - restore for database queries

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
  /** 40–60 word plain-English answer rendered in the on-page AnswerBox. */
  direct_answer?: string | null;
  /** Optional per-article citations (JSONB). When set, overrides/extends the
   *  shared NHS/NICE defaults on ArticleCitations. */
  citations?: BlogArticleCitation[] | null;
}

const FIELDS = "slug, title, excerpt, content, date, category, image_url, meta_title, meta_description, keywords, author, author_credentials, reviewed_by, reviewer_credentials, is_published, display_order, updated_at, direct_answer, citations";
const LIST_FIELDS = "slug, title, meta_title, excerpt, date, category, image_url, display_order";

/** Single article by slug */
export function useBlogArticle(slug: string | undefined) {
  const initialData =
    typeof document === "undefined"
      ? null
      : readEmbeddedBlogArticle<DBBlogArticle>(document, slug);
  return useQuery({
    queryKey: ["blog_article", slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from("blog_articles")
        .select(FIELDS)
        .eq("slug", slug)
        .eq("is_published", true)
        .single();
      if (error) throw error;
      return data as unknown as DBBlogArticle;
    },
    enabled: !!slug,
    ...(initialData
      ? { initialData, initialDataUpdatedAt: Date.now() }
      : {}),
  });
}

/** All published articles (list fields only), ordered by display_order then date */
export function useBlogArticlesList() {
  return useQuery({
    queryKey: ["blog_articles_list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_articles")
        .select(LIST_FIELDS)
        .eq("is_published", true)
        .order("display_order", { ascending: false })
        .order("date", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Pick<DBBlogArticle, "slug" | "title" | "meta_title" | "excerpt" | "date" | "category" | "image_url" | "display_order">[];
    },
  });
}

/** Top 3 editor's-pick articles for the featured strip */
export function useFeaturedArticles(limit = 3) {
  return useQuery({
    queryKey: ["blog_articles_featured", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_articles")
        .select(LIST_FIELDS)
        .eq("is_published", true)
        .order("display_order", { ascending: false })
        .order("date", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as Pick<DBBlogArticle, "slug" | "title" | "meta_title" | "excerpt" | "date" | "category" | "image_url" | "display_order">[];
    },
  });
}

/**
 * The `category` column has accumulated inconsistent labels over time
 * (e.g. "Exercise" vs "Exercises" vs "Exercise Guides" vs lowercase
 * "exercises" — confirmed via a real query against blog_articles: 11
 * published articles under Exercise-family labels and 22 under
 * Treatment-family labels were invisible to every condition page
 * requesting the canonical "Exercise"/"Treatment" category, since the
 * lookup below is an exact-match `IN` query). This expands each
 * requested category to its known real-world aliases before querying,
 * rather than requiring a data migration to fix at the source.
 */
const CATEGORY_ALIASES: Record<string, string[]> = {
  Exercise: ["Exercise", "Exercises", "Exercise Guides", "exercises"],
  Treatment: ["Treatment", "Treatment Guides", "treatments"],
};

function expandCategoryAliases(categories: string[]): string[] {
  const expanded = new Set<string>();
  for (const c of categories) {
    for (const alias of CATEGORY_ALIASES[c] ?? [c]) expanded.add(alias);
  }
  return [...expanded];
}

/** Recent articles filtered by one or more categories — used on Condition pages */
export function useConditionArticles(categories: string[] = [], limit = 4) {
  return useQuery({
    queryKey: ["blog_articles_by_categories", categories, limit],
    queryFn: async () => {
      let q = supabase
        .from("blog_articles")
        .select(LIST_FIELDS)
        .eq("is_published", true);
      if (categories.length > 0) {
        q = q.in("category", expandCategoryAliases(categories));
      }
      const { data, error } = await q
        .order("date", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as Pick<DBBlogArticle, "slug" | "title" | "meta_title" | "excerpt" | "date" | "category" | "image_url" | "display_order">[];
    },
  });
}

/** Next article for continue-reading bar */
export function useNextArticle(currentSlug: string) {
  return useQuery({
    queryKey: ["next_article", currentSlug],
    queryFn: async () => {
      // Get the current article's date
      const { data: current } = await supabase
        .from("blog_articles")
        .select("date, display_order")
        .eq("slug", currentSlug)
        .single();

      if (!current) return null;

      // Get next article by date (older)
      const { data: next } = await supabase
        .from("blog_articles")
        .select("slug, title")
        .eq("is_published", true)
        .lt("date", current.date)
        .order("date", { ascending: false })
        .limit(1)
        .single();

      if (next) return next;

      // Wrap around to newest
      const { data: first } = await supabase
        .from("blog_articles")
        .select("slug, title")
        .eq("is_published", true)
        .neq("slug", currentSlug)
        .order("date", { ascending: false })
        .limit(1)
        .single();

      return first ?? null;
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
  /** Pre-seed clusters (used by non-blog pages like /conditions/*). */
  seedClusters?: string[];
  /** Pre-seed category (used when there is no DB row to read). */
  seedCategory?: string;
  /** Pre-seed title/excerpt/keywords for cluster detection. */
  seedTitle?: string;
  seedExcerpt?: string;
  seedKeywords?: string;
}

/**
 * Related articles, scored by content-cluster overlap (knee OA, flare-ups,
 * diet, exercise, frailty, etc.) with category and recency as tiebreakers.
 */
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
      // 1. Resolve the source article's clusters + category.
      let sourceClusters: string[] = seedClusters ?? [];
      let sourceCategory: string | null = seedCategory ?? null;

      if (currentSlug && (sourceClusters.length === 0 || !sourceCategory)) {
        const { data: current } = await supabase
          .from("blog_articles")
          .select("title, excerpt, category, keywords")
          .eq("slug", currentSlug)
          .maybeSingle();

        if (current) {
          sourceCategory = sourceCategory ?? current.category ?? null;
          if (sourceClusters.length === 0) {
            sourceClusters = getClustersForArticle(current);
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

      // 2. Pull a candidate pool (one round-trip).
      const { data: pool } = await supabase
        .from("blog_articles")
        .select("slug, title, excerpt, date, category, keywords")
        .eq("is_published", true)
        .neq("slug", currentSlug)
        .order("date", { ascending: false })
        .limit(30);

      const candidates = (pool ?? []) as RelatedArticle[];

      // 3. Score + sort.
      const scored = candidates
        .map((a) => ({
          article: a,
          score: scoreCandidate(a, sourceClusters, sourceCategory),
        }))
        .sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return (b.article.date ?? "").localeCompare(a.article.date ?? "");
        });

      // 4. Fallback: if nothing scored, return latest 3.
      const top = scored.filter((s) => s.score > 0).slice(0, 3);
      if (top.length >= 3) return top.map((s) => s.article);

      const filler = candidates
        .filter((c) => !top.find((t) => t.article.slug === c.slug))
        .slice(0, 3 - top.length);

      return [...top.map((s) => s.article), ...filler];
    },
  });
}

