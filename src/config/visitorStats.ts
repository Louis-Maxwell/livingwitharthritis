/**
 * Visitor stats — single source of truth for the homepage visitor badge,
 * meta descriptions and OG snippets.
 *
 * Update without touching components by setting Vite env vars in `.env`:
 *   VITE_VISITOR_COUNT="Over 12,500"
 *   VITE_VISITOR_PERIOD="in the past month"
 *   VITE_VISITOR_VERIFIED="2026-07-01"
 *
 * Later, to auto-refresh from GA4: replace this module with a hook that
 * calls a `ga-visitors` edge function (Google Analytics Data API v1beta,
 * `runReport` on metric `activeUsers` over the last 30 days), caches the
 * result in localStorage for 24h, and falls back to these defaults.
 */

const env = import.meta.env;

export const VISITOR_STATS = {
  /** Display label e.g. "Over 10,000" or "12,480". */
  count: (env.VITE_VISITOR_COUNT as string | undefined) ?? "Over 10,000",
  /** Period descriptor e.g. "in the past month". */
  period: (env.VITE_VISITOR_PERIOD as string | undefined) ?? "in the past month",
  /** Last manually verified against GA4 (YYYY-MM-DD). */
  lastVerified: (env.VITE_VISITOR_VERIFIED as string | undefined) ?? "2026-06-25",
} as const;

/** Snippet ready to drop into meta descriptions / OG copy. */
export const VISITOR_STATS_SNIPPET = `Trusted by ${VISITOR_STATS.count.toLowerCase()} monthly visitors.`;
