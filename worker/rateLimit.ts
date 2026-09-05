/**
 * Rate limiting for charity-scale form/chat traffic.
 *
 * Prefer Durable Object / KV when bindings exist (cross-isolate).
 * Without RATE_LIMIT KV, falls back to a clearer in-memory limiter
 * (per isolate — fine for low traffic; add KV in production).
 *
 * To add KV (dashboard or CLI, then paste real IDs into wrangler.jsonc):
 *   npx wrangler kv namespace create RATE_LIMIT
 *   npx wrangler kv namespace create SUBMISSIONS
 * Do not invent fake account/namespace IDs.
 */

export type RateLimitResult = { ok: true } | { ok: false; retryAfterSec: number };

export type KvLike = {
  get: (key: string) => Promise<string | null>;
  put: (
    key: string,
    value: string,
    options?: { expirationTtl?: number },
  ) => Promise<void>;
};

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 5_000;

/** In-memory sliding fixed-window limiter (per Worker isolate). */
export function rateLimit(
  key: string,
  max: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);
  if (!existing || now >= existing.resetAt) {
    if (buckets.size >= MAX_BUCKETS) pruneRateLimits(true);
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  if (existing.count >= max) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }
  existing.count += 1;
  return { ok: true };
}

/** Drop expired buckets; optionally force-clear oldest half when at capacity. */
export function pruneRateLimits(forceHalf = false): void {
  const now = Date.now();
  for (const [k, v] of buckets) {
    if (now >= v.resetAt) buckets.delete(k);
  }
  if (forceHalf && buckets.size >= MAX_BUCKETS) {
    const keys = [...buckets.keys()];
    for (let i = 0; i < Math.floor(keys.length / 2); i++) {
      buckets.delete(keys[i]!);
    }
  }
}

/** Expose size for tests. */
export function rateLimitBucketCount(): number {
  return buckets.size;
}

export function resetRateLimitBucketsForTests(): void {
  buckets.clear();
}

/**
 * KV-backed fixed window when binding present; otherwise in-memory.
 * Key format: `${route}:${ip}` — value is JSON `{ count, resetAt }`.
 */
export async function rateLimitDurable(
  kv: KvLike | undefined,
  key: string,
  max: number,
  windowMs: number,
): Promise<RateLimitResult> {
  if (!kv) {
    pruneRateLimits();
    return rateLimit(key, max, windowMs);
  }

  const now = Date.now();
  const ttlSec = Math.max(60, Math.ceil(windowMs / 1000));
  try {
    const raw = await kv.get(`rl:${key}`);
    let count = 0;
    let resetAt = now + windowMs;
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as { count?: number; resetAt?: number };
        if (
          typeof parsed.resetAt === "number" &&
          parsed.resetAt > now &&
          typeof parsed.count === "number"
        ) {
          count = parsed.count;
          resetAt = parsed.resetAt;
        }
      } catch {
        // treat as empty
      }
    }

    if (count >= max) {
      return {
        ok: false,
        retryAfterSec: Math.max(1, Math.ceil((resetAt - now) / 1000)),
      };
    }

    count += 1;
    const remainingTtl = Math.max(1, Math.ceil((resetAt - now) / 1000));
    await kv.put(`rl:${key}`, JSON.stringify({ count, resetAt }), {
      expirationTtl: Math.min(ttlSec, remainingTtl + 1),
    });
    return { ok: true };
  } catch (err) {
    console.error("RATE_LIMIT KV failed; falling back to memory", err);
    pruneRateLimits();
    return rateLimit(key, max, windowMs);
  }
}
