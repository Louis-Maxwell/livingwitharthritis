import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
}

const FIELDS = "slug, title, excerpt, content, date, category, image_url, meta_title, meta_description, keywords, author, author_credentials, reviewed_by, reviewer_credentials, is_published, display_order";
const LIST_FIELDS = "slug, title, excerpt, date, category, image_url, display_order";

/** Single article by slug */
export function useBlogArticle(slug: string | undefined) {
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
      return data as DBBlogArticle;
    },
    enabled: !!slug,
  });
}

/** All published articles (list fields only) */
export function useBlogArticlesList() {
  return useQuery({
    queryKey: ["blog_articles_list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_articles")
        .select(LIST_FIELDS)
        .eq("is_published", true)
        .order("date", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Pick<DBBlogArticle, "slug" | "title" | "excerpt" | "date" | "category" | "image_url">[];
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

/** Related articles for a given slug */
export function useRelatedArticles(currentSlug: string) {
  return useQuery({
    queryKey: ["related_articles", currentSlug],
    queryFn: async () => {
      // Get current article's category
      const { data: current } = await supabase
        .from("blog_articles")
        .select("category")
        .eq("slug", currentSlug)
        .single();

      const category = current?.category;

      // Same category first
      const { data: sameCat } = await supabase
        .from("blog_articles")
        .select("slug, title, excerpt, date, category")
        .eq("is_published", true)
        .eq("category", category ?? "Health")
        .neq("slug", currentSlug)
        .order("date", { ascending: false })
        .limit(3);

      if ((sameCat?.length ?? 0) >= 3) return sameCat!;

      // Fill with other categories
      const existingSlugs = (sameCat ?? []).map((a) => a.slug);
      existingSlugs.push(currentSlug);

      const { data: others } = await supabase
        .from("blog_articles")
        .select("slug, title, excerpt, date, category")
        .eq("is_published", true)
        .not("slug", "in", `(${existingSlugs.map((s) => `"${s}"`).join(",")})`)
        .order("date", { ascending: false })
        .limit(3 - (sameCat?.length ?? 0));

      return [...(sameCat ?? []), ...(others ?? [])].slice(0, 3);
    },
  });
}
