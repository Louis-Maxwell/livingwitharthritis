import { useEffect, useState, useMemo } from "react";

interface BlogView {
  slug: string;
  view_count: number;
}

export function useBlogViews(slug: string | undefined) {
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;
    // Supabase increment view RPC removed - functionality to be restored later
    setViewCount(0);
  }, [slug]);

  return viewCount;
}

export function useBlogViewCounts(slugs: string[]) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const slugKey = useMemo(() => slugs.join(","), [slugs]);

  useEffect(() => {
    if (!slugs.length) return;
    // Supabase blog views query removed - functionality to be restored later
    setCounts({});
  }, [slugKey]);

  return counts;
}
