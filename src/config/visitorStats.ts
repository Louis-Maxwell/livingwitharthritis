/**
 * Visitor stats — manually updated from Google Analytics.
 * Update `count` and `period` after checking GA4 each month.
 *
 * To wire automatically later: replace this export with a hook that
 * reads from `supabase.functions.invoke("ga-visitors")`.
 */
export const VISITOR_STATS = {
  /** Display label e.g. "Over 10K" or "12,480". */
  count: "Over 10,000",
  /** Period descriptor e.g. "in the past month". */
  period: "in the past month",
  /** Last manually verified against GA4 (YYYY-MM-DD). */
  lastVerified: "2026-06-25",
} as const;
