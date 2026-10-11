/**
 * Clinical-review state recorded by the editor. Missing approval is pending;
 * a publication/update timestamp never establishes a completed review.
 * Only a qualified reviewer should use blog:mark-reviewed after reviewing.
 */
export const BLOG_REVIEW_STATUSES = ["reviewed", "pending"] as const;
export type BlogReviewStatus = (typeof BLOG_REVIEW_STATUSES)[number];
export const DEFAULT_BLOG_REVIEW_STATUS: BlogReviewStatus = "pending";

/** Exact byline shown on a guide awaiting clinical review. */
export const PENDING_REVIEW_TEXT =
  "Written by the Living With Arthritis team · pending clinical review by Louis Maxwell (HCPC PH128483)";

type MaybeReviewStatus = { reviewStatus?: string | null } | null | undefined;

/**
 * Resolve a guide's review state. The first source that sets the field wins
 * (e.g. the full post, then its catalog row); anything else is "pending".
 */
export function resolveBlogReviewStatus(...sources: MaybeReviewStatus[]): BlogReviewStatus {
  for (const src of sources) {
    const value = src?.reviewStatus;
    if (value === "pending" || value === "reviewed") return value;
  }
  return DEFAULT_BLOG_REVIEW_STATUS;
}

export function isBlogReviewPending(...sources: MaybeReviewStatus[]): boolean {
  return resolveBlogReviewStatus(...sources) === "pending";
}

/**
 * Review-related JSON-LD fields for a blog guide. Pending guides get none, so
 * structured data never claims a review that has not happened. Reviewed guides
 * keep the existing behaviour: `reviewedBy` only for the verified clinician,
 * plus `lastReviewed` when a real review date is passed in.
 */
export function blogReviewSchemaFields<R extends object>(opts: {
  reviewStatus: BlogReviewStatus;
  reviewedBy: R | null;
  lastReviewed?: string | null;
}): { reviewedBy?: R; lastReviewed?: string } {
  if (opts.reviewStatus === "pending" || !opts.reviewedBy) return {};
  return {
    reviewedBy: opts.reviewedBy,
    ...(opts.lastReviewed ? { lastReviewed: opts.lastReviewed } : {}),
  };
}
