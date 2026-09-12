import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";

const SESSION_PREFIX = "lwa_blog_viewed:";

/**
 * Honest view counts from public.blog_views only.
 * Increments once per browser session per slug via SECURITY DEFINER RPC.
 * Returns null when Supabase is unset or the row has no count yet —
 * never invents or zero-pads engagement metrics.
 */
export function useBlogViews(slug: string | undefined) {
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    if (!slug || !isSupabaseConfigured || !supabase) {
      setViewCount(null);
      return;
    }

    let cancelled = false;
    const key = `${SESSION_PREFIX}${slug}`;

    const run = async () => {
      try {
        let already = false;
        try {
          already = sessionStorage.getItem(key) === "1";
        } catch {
          already = false;
        }

        if (!already) {
          const { data, error } = await supabase.rpc("increment_blog_view", {
            p_slug: slug,
          });
          if (!cancelled && !error && typeof data === "number") {
            setViewCount(data > 0 ? data : null);
            try {
              sessionStorage.setItem(key, "1");
            } catch {
              /* ignore */
            }
            return;
          }
          // If RPC failed, fall through to read-only select
        }

        const { data, error } = await supabase
          .from("blog_views")
          .select("view_count")
          .eq("slug", slug)
          .maybeSingle();

        if (cancelled) return;
        if (error || data == null || data.view_count == null) {
          setViewCount(null);
          return;
        }
        const n = Number(data.view_count);
        setViewCount(Number.isFinite(n) && n > 0 ? n : null);
      } catch {
        if (!cancelled) setViewCount(null);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return viewCount;
}

export function useBlogViewCounts(slugs: string[]) {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!slugs.length || !isSupabaseConfigured || !supabase) {
      setCounts({});
      return;
    }

    let cancelled = false;
    const run = async () => {
      try {
        const { data, error } = await supabase
          .from("blog_views")
          .select("slug, view_count")
          .in("slug", slugs);
        if (cancelled || error || !data) {
          if (!cancelled) setCounts({});
          return;
        }
        const map: Record<string, number> = {};
        for (const row of data) {
          const n = Number(row.view_count);
          if (row.slug && Number.isFinite(n) && n > 0) map[row.slug] = n;
        }
        setCounts(map);
      } catch {
        if (!cancelled) setCounts({});
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [slugs.join("|")]);

  return counts;
}
