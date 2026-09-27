/**
 * Per-topic clinical-review state for /library/<slug> pages.
 *
 * Source of truth: src/data/libraryReviewStatus.json, keyed by library slug:
 *   { "<slug>": { "reviewStatus": "pending" } }
 *   { "<slug>": { "reviewStatus": "reviewed", "lastReviewed": "YYYY-MM-DD" } }
 * Topics not listed are "reviewed" with DEFAULT_LIBRARY_LAST_REVIEWED.
 *
 * A pending topic shows LIBRARY_PENDING_REVIEW_TEXT in its review box and its
 * "About this page" note, and never claims a completed review. Flip a topic
 * after Louis has reviewed it with `npm run library:mark-reviewed -- <slug>`.
 */
import reviewStatusJson from "./libraryReviewStatus.json";
import type { BlogReviewStatus } from "@/lib/blog/review";

export interface LibraryReviewEntry {
  reviewStatus: BlogReviewStatus;
  lastReviewed?: string;
}

/** Review date shown on library topics that have no explicit entry. */
export const DEFAULT_LIBRARY_LAST_REVIEWED = "2026-09-18";

/** Review-box line on a library topic awaiting clinical review. */
export const LIBRARY_PENDING_REVIEW_TEXT =
  "Pending clinical review by Louis Maxwell (HCPC PH128483)";

export const LIBRARY_REVIEW_STATUS = reviewStatusJson as Record<string, LibraryReviewEntry>;

export function getLibraryReviewStatus(slug: string): BlogReviewStatus {
  return LIBRARY_REVIEW_STATUS[slug]?.reviewStatus === "pending" ? "pending" : "reviewed";
}

export function isLibraryReviewPending(slug: string): boolean {
  return getLibraryReviewStatus(slug) === "pending";
}

/** Real review date for a reviewed topic; null while pending. */
export function getLibraryLastReviewed(slug: string): string | null {
  if (isLibraryReviewPending(slug)) return null;
  return LIBRARY_REVIEW_STATUS[slug]?.lastReviewed ?? DEFAULT_LIBRARY_LAST_REVIEWED;
}

/**
 * "About this page" note for the expanded library topics. Pending topics say
 * so explicitly; reviewed topics drop the pending wording.
 */
export function libraryAboutNote(slug: string): { heading: string; body: string } {
  const safety =
    "This is general information, not a diagnosis. Always follow the advice of your own GP, physiotherapist or rheumatology team. For emergencies call 999; for urgent advice use NHS 111.";
  return {
    heading: "About this page",
    body: isLibraryReviewPending(slug)
      ? `Written by Louis Maxwell, First Contact Practitioner (HCPC PH128483), and pending clinical review. ${safety}`
      : `Written by Louis Maxwell, First Contact Practitioner (HCPC PH128483), and clinically reviewed. ${safety}`,
  };
}
