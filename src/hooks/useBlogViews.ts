import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";

interface BlogView {
  slug: string;
  view_count: number;
}

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
  const slugKey = useMemo(() => slugs.join(","), [slugs]);

  useEffect(() => {
    if (!slugs.length) return;
    supabase
      .from("blog_views")
      .select("slug, view_count")
      .in("slug", slugs)
      .then(({ data }) => {
        if (data) {
          const map: Record<string, number> = {};
          const records = data as BlogView[];
          records.forEach((r) => { map[r.slug] = r.view_count; });
          setCounts(map);
        }
      });
  }, [slugKey]);

  return counts;
}
