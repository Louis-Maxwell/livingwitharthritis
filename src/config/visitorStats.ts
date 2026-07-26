/**
 * Visitor stats — single source of truth for the homepage visitor badge,
 * meta descriptions and OG snippets.
 *
 * ⚠️  ALWAYS source `VITE_VISITOR_COUNT` from **Google Analytics 4**, never
 * from the Lovable in-app analytics panel. GA4 auto-filters known bot/spider
 * traffic; Lovable's panel counts every HTTP hit, including SEO crawlers
 * (SemrushBot, AhrefsBot, DataForSEO) and AI training bots. A single crawler
 * sweep can inflate the Lovable number by 1,000+ in an hour and make the
 * visitor badge dishonest.
 *
 * To refresh monthly:
 *   1. Open GA4 → Reports → Acquisition → Traffic acquisition
 *   2. Set date range = "Last 28 days"
 *   3. Read the "Users" column total
 *   4. Round down to the nearest hundred and update `.env`:
 *        VITE_VISITOR_COUNT="Thousands of"
 *        VITE_VISITOR_PERIOD="people across the UK"
 *        VITE_VISITOR_VERIFIED="2026-07-01"
 *
 *   Until a GA4 baseline is confirmed, the fallback stays deliberately
 *   non-numeric ("Thousands of ... people across the UK") to avoid
 *   overstating an unverified specific count.
 *
 * Later, to auto-refresh: replace this module with a hook that calls a
 * `ga-visitors` edge function (Google Analytics Data API v1beta,
 * `runReport` on metric `activeUsers` over the last 30 days), caches the
 * result in localStorage for 24h, and falls back to these defaults.
 */

const env = import.meta.env;

export const VISITOR_STATS = {
  /** Display label e.g. "Thousands of" or a verified override like "12,480". Undefined until a real VITE_VISITOR_COUNT is set. */
  count: env.VITE_VISITOR_COUNT as string | undefined,
  /** Period descriptor e.g. "people across the UK". */
  period: (env.VITE_VISITOR_PERIOD as string | undefined) ?? "people across the UK",
  /** Last manually verified against GA4 (YYYY-MM-DD), if a count has been set. */
  lastVerified: env.VITE_VISITOR_VERIFIED as string | undefined,
} as const;

/**
 * Snippet ready to drop into meta descriptions / OG copy. Empty string until
 * a real VITE_VISITOR_COUNT is verified and set (see instructions above).
 *
 * IMPORTANT: previously defaulted to "Trusted by thousands of people across
 * the UK" whenever VITE_VISITOR_COUNT was unset -- but that's still a
 * specific, falsifiable scale claim, not a safe placeholder, and no
 * VITE_VISITOR_COUNT override has ever actually been set (checked .env).
 * That sentence was live in the homepage's meta description, og:description
 * and twitter:description with no real traffic to back it.
 */
export const VISITOR_STATS_SNIPPET = VISITOR_STATS.count
  ? `Trusted by ${VISITOR_STATS.count.toLowerCase()} ${VISITOR_STATS.period}.`
  : "";
