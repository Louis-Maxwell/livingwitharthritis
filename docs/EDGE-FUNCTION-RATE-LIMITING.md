# Edge Function Rate Limiting

Rate limiting for user-facing Supabase Edge Functions. Protects against
scripted abuse (form spam, checkout hammering, chat scraping) without
adding a DB round-trip to the request hot path.

## Design

- **In-memory sliding window per IP**, implemented in
  [`supabase/functions/_shared/rate-limiter.ts`](../supabase/functions/_shared/rate-limiter.ts).
- No `public.rate_limits` table. A DB-backed limiter was considered and
  rejected: it puts a write on every request and becomes the bottleneck
  under load. The in-memory limiter is O(1) and fails open on function
  cold start (the acceptable tradeoff — first request after boot is
  never blocked).
- **Scope: user-facing functions only.** Internal / scheduled functions
  (`daily-seo-refresh`, `process-email-queue`, `generate-sitemap`,
  `seo-rank-sync`, `daily-content-freshness`, `indexnow-ping`,
  `handle-email-*`, etc.) are not rate-limited — they run on a schedule
  or from trusted webhooks, and IP-based limits would either no-op or
  break the schedule.

## Known limits of this approach

1. **Per-instance memory.** Each edge function instance keeps its own
   counter. A client hitting two warm instances gets 2× the limit.
   Fine for abuse mitigation, not a hard quota.
2. **IP is derived from headers** (`x-forwarded-for`, `x-real-ip`,
   `cf-connecting-ip`). Behind a shared NAT, users share a bucket.
3. **Not a substitute for auth / CAPTCHA** on high-value endpoints
   (donations, contact). It complements them.

If a security scanner flags "no rate limiting" on internal or scheduled
functions, treat that finding as a known gap per project policy.

## Usage

```ts
import { createRateLimiter, getClientIp } from "../_shared/rate-limiter.ts";

const limiter = createRateLimiter({ windowMs: 60_000, maxRequests: 20 });

serve(async (req) => {
  if (req.method === "OPTIONS") return preflight(req);

  if (!limiter.check(getClientIp(req))) {
    return new Response(
      JSON.stringify({ error: "Too many requests, please slow down." }),
      {
        status: 429,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Retry-After": "60",
        },
      },
    );
  }

  // ...handler
});
```

The helper also exports `rateLimitResponse(corsHeaders, retryAfterSeconds)`
for the standard 429 body + headers.

## Applied limits

| Function                    | Category      | Window  | Max requests |
| --------------------------- | ------------- | ------- | ------------ |
| `chat`                      | chat          | 1 min   | 20           |
| `submit-contact`            | feedback      | 1 min   | 10           |
| `submit-fundraising`        | feedback      | 15 min  | 5            |
| `submit-triage`             | form          | 1 min   | 10           |
| `create-donation-checkout`  | donation      | 1 min   | 10           |
| `book-appointment`          | booking       | 30 min  | 10           |
| `confirm-newsletter`        | email signup  | 1 min   | 5            |
| `request-buddy-match`       | matching      | 1 min   | 5            |
| `symptom-ranker`            | AI query      | 1 min   | 10           |

Tune by editing the `createRateLimiter({ windowMs, maxRequests })` call
at the top of the function. Keep the comment referencing this doc so
the source of truth stays discoverable.

## Adding rate limiting to a new user-facing function

1. Import the helper:
   ```ts
   import { createRateLimiter, getClientIp } from "../_shared/rate-limiter.ts";
   ```
2. Declare `const limiter = createRateLimiter({ windowMs, maxRequests });`
   at module scope with a comment linking back here.
3. Call `limiter.check(getClientIp(req))` immediately after the
   `OPTIONS` preflight and before any DB / network work.
4. Return a 429 with `Retry-After` and the shared CORS headers.
5. Update the table above.
