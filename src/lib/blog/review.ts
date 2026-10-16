/**
 * Clinical-review state recorded by the editor.
 *
 * Safety rule: missing or explicit pending review metadata stays pending. A site-wide
 * owner confirmation must not silently convert individual article records to reviewed;
 * use the review workflow to stamp a documented reviewer/date on each verified guide.
 */
export const BLOG_REVIEW_STATUSES = ["reviewed", "pending"] as const;
export type BlogReviewStatus = (typeof BLOG_REVIEW_STATUSES)[number];
export const DEFAULT_BLOG_REVIEW_STATUS: BlogReviewStatus = "pending";

/** Exact byline shown on a guide awaiting clinical review. */
export const PENDING_REVIEW_TEXT =
  "Clinical review status: not yet recorded";

type MaybeReviewStatus = { reviewStatus?: string | null } | null | undefined;

/**
 * Resolve a guide's review state. The first source that explicitly sets the field wins
 * (e.g. the full post, then its catalog row); missing/invalid metadata is pending.
 */
export function resolveBlogReviewStatus(...sources: MaybeReviewStatus[]): BlogReviewStatus {
  for (const src of sources) {
    const value = src?.reviewStatus;
    if (value === "reviewed" || value === "pending") return value;
  }
  return DEFAULT_BLOG_REVIEW_STATUS;
}

export function isBlogReviewPending(...sources: MaybeReviewStatus[]): boolean {
  return resolveBlogReviewStatus(...sources) === "pending";
}

/**
 * Review-related JSON-LD fields for a blog guide. Pending guides get none, so
 * structured data never claims a review that has not happened. Reviewed guides
 * keep the existing behaviour: reviewedBy only for the verified clinician,
 * plus lastReviewed when a real review date is passed in.
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
