import { supabase } from "@/integrations/supabase/client";
import { memo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";

// Supabase client removed - functionality to be restored later

interface PopularArticle {
  slug: string;
  title: string | null;
  view_count: number;
}

/**
 * FooterMostRead
 *
 * Lightweight "Most read this week" rail driven by blog_views.
 * Surfaces the strongest internal-link gravity at the very end of every
 * page — the bottom of the page is currently a dead end (1.17 pages/visit).
 *
 *  - Joins blog_views → articles (when title available)
 *  - Caches for 30 min, no skeleton flash if cache warm
 *  - Silently renders nothing if there's no data or the query fails
 */
const FooterMostRead = memo(() => {
  const { data } = useQuery<PopularArticle[]>({
    queryKey: ["footer-most-read"],
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    queryFn: async () => {
      // Get top 5 most-viewed slugs, then fetch their titles in one round-trip.
      const { data: views, error: vErr } = await supabase
        .from("blog_views")
        .select("slug, view_count")
        .order("view_count", { ascending: false })
        .limit(5);
      if (vErr || !views?.length) return [];

      const slugs = views.map((v) => v.slug);
      const { data: posts } = await supabase
        .from("blog_articles")
        .select("slug, title")
        .in("slug", slugs);

      const titleBySlug = new Map((posts ?? []).map((p) => [p.slug, p.title]));
      return views.map((v) => ({
        slug: v.slug,
        title: titleBySlug.get(v.slug) ?? humanise(v.slug),
        view_count: v.view_count,
      }));
    },
  });

  if (!data?.length) return null;

  return (
    <section
      aria-labelledby="footer-most-read-heading"
      className="border-t border-border/15 bg-muted/20"
    >
      <div className="container mx-auto px-6 md:px-12 py-10">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-4 h-4 text-primary" aria-hidden="true" />
          <h2
            id="footer-most-read-heading"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
          >
            Most read this week
          </h2>
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {data.map((a, i) => (
            <li key={a.slug}>
              <Link
                to={`/blog/${a.slug}`}
                className="group block rounded-lg p-3 -m-3 hover:bg-card transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <span className="text-[11px] font-bold text-primary tabular-nums">
                  0{i + 1}
                </span>
                <p className="mt-1 text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                  {a.title}
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
});

function humanise(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

FooterMostRead.displayName = "FooterMostRead";
export default FooterMostRead;
