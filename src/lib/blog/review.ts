/**
 * Clinical-review state of a blog guide (runtime-safe: no zod here).
 *
 * `reviewStatus` is optional on every post JSON. Omitted (or "reviewed") means
 * Louis Maxwell has clinically reviewed the guide, which is how every guide
 * published before 25 Sep 2026 behaves. "pending" means the guide was written
 * by the team and is awaiting that review: the page shows PENDING_REVIEW_TEXT
 * and the JSON-LD must not claim a completed review (no reviewedBy /
 * lastReviewed). Flip a guide with `npm run blog:mark-reviewed -- <slug>`.
 */
export const BLOG_REVIEW_STATUSES = ["reviewed", "pending"] as const;
export type BlogReviewStatus = (typeof BLOG_REVIEW_STATUSES)[number];
export const DEFAULT_BLOG_REVIEW_STATUS: BlogReviewStatus = "reviewed";

/** Exact byline shown on a guide awaiting clinical review. */
export const PENDING_REVIEW_TEXT =
  "Written by the Living With Arthritis team · pending clinical review by Louis Maxwell (HCPC PH128483)";

type MaybeReviewStatus = { reviewStatus?: string | null } | null | undefined;

/**
 * Resolve a guide's review state. The first source that sets the field wins
 * (e.g. the full post, then its catalog row); anything else is "reviewed".
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
