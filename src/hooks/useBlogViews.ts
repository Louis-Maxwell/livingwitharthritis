import { useEffect, useState, useMemo } from "react";

interface BlogView {
  slug: string;
  view_count: number;
}

export function useBlogViews(slug: string | undefined) {
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;
    setViewCount(0);
  }, [slug]);

  return viewCount;
}

export function useBlogViewCounts(slugs: string[]) {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!slugs.length) return;
    setCounts({});
  }, [slugs]);

  return counts;
}
