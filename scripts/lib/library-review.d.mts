export interface LibraryReviewEntry {
  reviewStatus: "reviewed" | "pending";
  lastReviewed?: string;
}
export declare const LIBRARY_REVIEW_STATUS_PATH: string;
export declare function markLibraryTopicReviewed(
  map: Record<string, LibraryReviewEntry>,
  slug: string,
  date: string,
): Record<string, LibraryReviewEntry>;
export declare function serializeLibraryReviewStatus(map: Record<string, LibraryReviewEntry>): string;
