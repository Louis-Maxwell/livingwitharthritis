import { useState } from "react";

/**
 * Honest view counts only.
 *
 * There is currently no live view-count API wired up. Returning `null`
 * (instead of inventing or zero-padding a number) keeps the UI from
 * showing fabricated engagement metrics. When a real counter is added,
 * set state from that source and BlogPost will render only when > 0.
 */
export function useBlogViews(_slug: string | undefined) {
  const [viewCount] = useState<number | null>(null);
  return viewCount;
}

export function useBlogViewCounts(_slugs: string[]) {
  const [counts] = useState<Record<string, number>>({});
  return counts;
}
