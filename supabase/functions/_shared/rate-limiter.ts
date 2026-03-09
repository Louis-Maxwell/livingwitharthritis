/**
 * Rate limiter for edge functions using in-memory Map.
 * Tracks requests per IP with a sliding window.
 *
 * Usage:
 *   const limiter = createRateLimiter({ windowMs: 60000, maxRequests: 10 });
 *   if (!limiter.check(ip)) return new Response("Too many requests", { status: 429 });
 */

interface RateLimiterConfig {
  windowMs: number;   // Time window in milliseconds
  maxRequests: number; // Max requests per window
}

interface RateEntry {
  count: number;
  resetAt: number;
}

const stores = new Map<string, Map<string, RateEntry>>();

export function createRateLimiter(config: RateLimiterConfig) {
  const storeKey = `${config.windowMs}-${config.maxRequests}`;
  if (!stores.has(storeKey)) {
    stores.set(storeKey, new Map());
  }
  const store = stores.get(storeKey)!;

  // Periodic cleanup every 5 minutes
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (now > entry.resetAt) store.delete(key);
    }
  }, 300_000);

  return {
    check(identifier: string): boolean {
      const now = Date.now();
      const entry = store.get(identifier);

      if (!entry || now > entry.resetAt) {
        store.set(identifier, { count: 1, resetAt: now + config.windowMs });
        return true;
      }

      if (entry.count >= config.maxRequests) {
        return false;
      }

      entry.count++;
      return true;
    },

    remaining(identifier: string): number {
      const now = Date.now();
      const entry = store.get(identifier);
      if (!entry || now > entry.resetAt) return config.maxRequests;
      return Math.max(0, config.maxRequests - entry.count);
    },
  };
}

/** Extract client IP from request headers (works behind proxies) */
export function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

/** Standard 429 response with rate limit headers */
export function rateLimitResponse(
  corsHeaders: Record<string, string>,
  retryAfterSeconds = 60
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
    }
  );
}
