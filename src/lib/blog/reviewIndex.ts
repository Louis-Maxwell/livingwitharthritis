/** Explicit clinical review dates, generated from source articles. */
import reviewIndex from "@/data/blogReviewIndex.generated.json";

export interface BlogReviewMeta {
  last_reviewed?: string;
}

const LAST_REVIEWED: Readonly<Record<string, string | null>> = reviewIndex.lastReviewed;

export function getBlogReviewMeta(slug: string | undefined | null): BlogReviewMeta | undefined {
  if (!slug || !Object.prototype.hasOwnProperty.call(LAST_REVIEWED, slug)) return undefined;
  const meta: BlogReviewMeta = {};
  if (LAST_REVIEWED[slug]) meta.last_reviewed = LAST_REVIEWED[slug]!;
  return meta;
}
