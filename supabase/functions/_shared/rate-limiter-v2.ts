/**
 * Tiered, persistent rate limiter for edge functions.
 *
 * Replaces the previous in-memory Map limiter (rate-limiter.ts), which
 * reset silently whenever an edge function's isolate restarted — normal
 * serverless behaviour, but it meant limits weren't reliably enforced.
 * This version is backed by the public.rate_limits table (see migration
 * 20260721194043_rate_limits_persistent.sql), so state survives restarts
 * and is shared across concurrent isolates.
 *
 * Design, per the three requirements this was built against:
 *   1. Tiered thresholds by route sensitivity (auth/public/authenticated),
 *      configured in one place (RATE_LIMIT_TIERS below) — not hardcoded
 *      inline at each call site.
 *   2. Combined per-IP AND per-account checking: a request is limited if
 *      EITHER its IP or its account has exceeded the tier's threshold.
 *      This catches both "one IP hammering many accounts" and "one
 *      account abused from many IPs".
 *   3. Exponential backoff instead of a hard lockout: each time an
 *      identifier goes over the limit, its block window grows
 *      (baseBackoffMs * 2^consecutiveViolations, capped at
 *      maxBackoffMs) rather than resetting to the same fixed window
 *      every time. Repeated abuse costs progressively more; a single
 *      accidental burst recovers quickly.
 *
 * NOTE on auth routes specifically: this app has no custom login/signup/
 * password-reset edge functions — authentication goes through Supabase
 * Auth's own hosted endpoints, which have their own separate, built-in
 * rate limiting configured in the Supabase dashboard (Auth > Rate
 * Limits), not in this codebase. The "auth" tier below exists for any
 * custom endpoints that gate access or handle credentials-adjacent
 * flows (e.g. buddy-match requests, admin actions) — apply it there.
 */

import type { SupabaseClient } from "npm:@supabase/supabase-js@2";

export type RateLimitTier = "auth" | "public" | "authenticated";

export interface TierConfig {
  windowMs: number;       // sliding window length
  maxRequests: number;    // requests allowed per window before violation
  baseBackoffMs: number;  // backoff applied on the 1st violation
  maxBackoffMs: number;   // backoff ceiling regardless of violation count
}

/**
 * Central, configurable thresholds. Change limits here — never hardcode
 * a windowMs/maxRequests pair inline at a call site again.
 */
export const RATE_LIMIT_TIERS: Record<RateLimitTier, TierConfig> = {
  // Stricter: anything gating access, credentials-adjacent, or high
  // value for abuse (account enumeration, credential stuffing, etc.)
  auth: {
    windowMs: 60_000,
    maxRequests: 5,
    baseBackoffMs: 30_000,        // 30s
    maxBackoffMs: 60 * 60_000,    // capped at 1 hour
  },
  // Moderate: public-facing forms/endpoints anyone can hit (contact,
  // newsletter, fundraising submissions, chat).
  public: {
    windowMs: 60_000,
    maxRequests: 20,
    baseBackoffMs: 15_000,        // 15s
    maxBackoffMs: 30 * 60_000,    // capped at 30 min
  },
  // Looser: actions gated behind an existing authenticated session,
  // where the account itself is already a meaningful identity signal.
  authenticated: {
    windowMs: 60_000,
    maxRequests: 60,
    baseBackoffMs: 5_000,         // 5s
    maxBackoffMs: 10 * 60_000,    // capped at 10 min
  },
};

interface CheckResult {
  allowed: boolean;
  retryAfterSeconds?: number;
  limitedBy?: "ip" | "account";
}

async function checkKey(
  supabase: SupabaseClient,
  key: string,
  tier: TierConfig,
): Promise<{ allowed: boolean; retryAfterSeconds?: number }> {
  const now = Date.now();
  const { data } = await supabase
    .from("rate_limits")
    .select("window_start,count,consecutive_violations,blocked_until")
    .eq("key", key)
    .maybeSingle();

  // Currently serving an active backoff block.
  if (data?.blocked_until && new Date(data.blocked_until).getTime() > now) {
    const retryAfterSeconds = Math.ceil(
      (new Date(data.blocked_until).getTime() - now) / 1000,
    );
    return { allowed: false, retryAfterSeconds };
  }

  const windowExpired =
    !data || now - new Date(data.window_start).getTime() > tier.windowMs;

  if (windowExpired) {
    // Fresh window. Violation streak only resets after a clean window
    // (no block triggered) — a single successful window is treated as
    // "recovered", so a one-off burst doesn't carry a permanent penalty.
    await supabase.from("rate_limits").upsert({
      key,
      window_start: new Date(now).toISOString(),
      count: 1,
      consecutive_violations: 0,
      blocked_until: null,
      updated_at: new Date(now).toISOString(),
    });
    return { allowed: true };
  }

  const nextCount = (data!.count ?? 0) + 1;

  if (nextCount > tier.maxRequests) {
    const violations = (data!.consecutive_violations ?? 0) + 1;
    const backoffMs = Math.min(
      tier.baseBackoffMs * Math.pow(2, violations - 1),
      tier.maxBackoffMs,
    );
    const blockedUntil = new Date(now + backoffMs).toISOString();
    await supabase
      .from("rate_limits")
      .update({
        count: nextCount,
        consecutive_violations: violations,
        blocked_until: blockedUntil,
        updated_at: new Date(now).toISOString(),
      })
      .eq("key", key);
    return { allowed: false, retryAfterSeconds: Math.ceil(backoffMs / 1000) };
  }

  await supabase
    .from("rate_limits")
    .update({ count: nextCount, updated_at: new Date(now).toISOString() })
    .eq("key", key);
  return { allowed: true };
}

/**
 * Check both the per-IP and per-account limits for a given tier.
 * Denies the request if EITHER identifier has exceeded its threshold.
 * accountId is optional — pass it for authenticated routes; anonymous
 * public routes are checked on IP alone.
 */
export async function checkRateLimit(
  supabase: SupabaseClient,
  opts: { ip: string; accountId?: string | null; tier: RateLimitTier; scope: string },
): Promise<CheckResult> {
  const config = RATE_LIMIT_TIERS[opts.tier];

  const ipResult = await checkKey(supabase, `ip:${opts.scope}:${opts.ip}`, config);
  if (!ipResult.allowed) {
    return { allowed: false, retryAfterSeconds: ipResult.retryAfterSeconds, limitedBy: "ip" };
  }

  if (opts.accountId) {
    const acctResult = await checkKey(
      supabase,
      `account:${opts.scope}:${opts.accountId}`,
      config,
    );
    if (!acctResult.allowed) {
      return {
        allowed: false,
        retryAfterSeconds: acctResult.retryAfterSeconds,
        limitedBy: "account",
      };
    }
  }

  return { allowed: true };
}

/** Extract client IP from request headers (works behind proxies). */
export function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

/** Standard 429 response with rate limit headers. */
export function rateLimitResponse(
  corsHeaders: Record<string, string>,
  retryAfterSeconds = 60,
): Response {
  return new Response(
    JSON.stringify({ error: "Too many requests. Please try again later." }),
    {
      status: 429,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Retry-After": String(retryAfterSeconds),
        "X-RateLimit-Limit": "0",
        "X-RateLimit-Remaining": "0",
      },
    },
  );
}
