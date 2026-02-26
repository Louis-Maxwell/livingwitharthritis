import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useBlogViews(slug: string | undefined) {
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;
    // Increment view and get count
    supabase.rpc("increment_blog_view", { p_slug: slug }).then(({ data }) => {
      if (typeof data === "number") setViewCount(data);
    });
  }, [slug]);

  return viewCount;
}

export function useBlogViewCounts(slugs: string[]) {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!slugs.length) return;
    supabase
      .from("blog_views")
      .select("slug, view_count")
      .in("slug", slugs)
      .then(({ data }) => {
        if (data) {
          const map: Record<string, number> = {};
          data.forEach((r: any) => { map[r.slug] = r.view_count; });
          setCounts(map);
        }
      });
  }, [slugs.join(",")]);

  return counts;
}
