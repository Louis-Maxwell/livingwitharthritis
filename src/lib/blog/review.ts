/**
 * Clinical review helpers. All published blog guides were clinically reviewed
 * by Louis Maxwell (HCPC PH128483) in October 2026, so blog guides no longer
 * carry a pending state. `BlogReviewStatus` remains for the separate library
 * topic review flow (src/data/libraryReview.ts).
 */
export const BLOG_REVIEW_STATUSES = ["reviewed", "pending"] as const;
export type BlogReviewStatus = (typeof BLOG_REVIEW_STATUSES)[number];

/** Byline used by library topics still awaiting review (not used for blog guides). */
export const PENDING_REVIEW_TEXT =
  "Clinical review status: not yet recorded";

/**
 * Review-related JSON-LD fields for a blog guide: `reviewedBy` only for the
 * verified clinician, plus `lastReviewed` when a real review date is known.
 */
export function blogReviewSchemaFields<R extends object>(opts: {
  reviewStatus?: BlogReviewStatus;
  reviewedBy: R | null;
  lastReviewed?: string | null;
}): { reviewedBy?: R; lastReviewed?: string } {
  if (opts.reviewStatus === "pending" || !opts.reviewedBy) return {};
  return {
    reviewedBy: opts.reviewedBy,
    ...(opts.lastReviewed ? { lastReviewed: opts.lastReviewed } : {}),
  };
}
