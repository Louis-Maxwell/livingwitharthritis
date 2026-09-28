/**
 * Review metadata for the article page: the catalog's derived review date
 * and pending flag, without importing the full listing catalog.
 * Generated alongside the catalog by scripts/generate-blog-catalog.ts.
 */
import reviewIndex from "@/data/blogReviewIndex.generated.json";

export interface BlogReviewMeta {
  last_reviewed: string;
  reviewStatus?: "pending";
}

const LAST_REVIEWED: Readonly<Record<string, string>> = reviewIndex.lastReviewed;
const PENDING = new Set<string>(reviewIndex.pending);

export function getBlogReviewMeta(slug: string | undefined | null): BlogReviewMeta | undefined {
  if (!slug) return undefined;
  const lastReviewed = LAST_REVIEWED[slug];
  if (!lastReviewed) return undefined;
  return PENDING.has(slug)
    ? { last_reviewed: lastReviewed, reviewStatus: "pending" }
    : { last_reviewed: lastReviewed };
}
