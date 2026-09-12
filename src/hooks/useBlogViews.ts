import { useMemo } from "react";

/**
 * Blog view counts are not tracked without a backend.
 * Always returns null / {} — never invents engagement metrics.
 * Hook is kept so BlogPost and listing pages can call it safely.
 */
export function useBlogViews(_slug: string | undefined): number | null {
  return null;
}

export function useBlogViewCounts(_slugs: string[]): Record<string, number> {
  return useMemo(() => ({} as Record<string, number>), []);
}
