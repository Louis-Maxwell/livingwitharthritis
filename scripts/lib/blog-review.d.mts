export declare function todayInLondon(now?: Date): string;
export declare function markPostPending<T extends object>(
  post: T,
): Omit<T, "reviewStatus"> & { reviewStatus: "pending" };
export declare function markPostReviewed<T extends object>(
  post: T,
  date?: string,
): Omit<T, "reviewStatus" | "last_reviewed"> & { reviewStatus: "reviewed"; last_reviewed: string };
export declare function serializePost(post: object): string;
