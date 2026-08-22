# Application Rate Limiting

The backend uses Supabase Edge Functions (Deno). Every deployed function is
wrapped by `supabase/functions/_shared/rate-limit.ts`.

## Default policies

| Category | Default | Endpoints |
| --- | --- | --- |
| Authentication | 5 requests / 60 seconds | `auth-email-hook` |
| Contact and submission forms | 3 requests / 60 seconds | `submit-contact`, `submit-fundraising`, `submit-triage`, `request-buddy-match`, `book-appointment` |
| Search and AI query | 30 requests / 60 seconds | `chat`, `symptom-ranker`, `mcp` |
| General API | 100 requests / 900 seconds | Every other non-exempt Edge Function |
| Monitoring | Exempt | `run-psi-audit`, `seo-rank-sync` |

The contact tier applies to `POST` submissions. Non-POST requests on those
functions (for example appointment availability lookup) use the general tier.

Supabase-hosted login, signup, password recovery and token endpoints do not pass
through this repository's Edge Functions. Configure their equivalent
5-per-minute limits under **Supabase Dashboard → Authentication → Rate Limits**.

## Storage

Production uses a Redis-compatible REST API. Upstash Redis is supported
directly. The limiter fails closed with HTTP 503 when production Redis is
missing or unavailable; it never silently disables protection.

Local development and tests use an in-memory store. The memory store is
isolate-local by design and must not be selected in production.

Set production secrets:

```bash
supabase secrets set \
  RATE_LIMIT_STORE=redis \
  RATE_LIMIT_REDIS_URL=https://example.upstash.io \
  RATE_LIMIT_REDIS_TOKEN=... \
  RATE_LIMIT_KEY_SALT=...
```

The `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` names are accepted
as alternatives.

For local Supabase:

```text
RATE_LIMIT_STORE=memory
DENO_ENV=development
```

## Configuration

All thresholds are adjustable without code changes:

| Variable | Default |
| --- | ---: |
| `RATE_LIMIT_AUTH_REQUESTS` | `5` |
| `RATE_LIMIT_AUTH_WINDOW_SECONDS` | `60` |
| `RATE_LIMIT_CONTACT_REQUESTS` | `3` |
| `RATE_LIMIT_CONTACT_WINDOW_SECONDS` | `60` |
| `RATE_LIMIT_SEARCH_REQUESTS` | `30` |
| `RATE_LIMIT_SEARCH_WINDOW_SECONDS` | `60` |
| `RATE_LIMIT_GENERAL_REQUESTS` | `100` |
| `RATE_LIMIT_GENERAL_WINDOW_SECONDS` | `900` |
| `RATE_LIMIT_TRUST_PROXY_HOPS` | `1` |

Additional controls:

- `RATE_LIMIT_ENABLED=false` — emergency disable only.
- `RATE_LIMIT_EXEMPT_SCOPES=a,b` — temporary comma-separated exemptions.
- `RATE_LIMIT_STORE=redis|memory` — explicit backend selection.
- `RATE_LIMIT_KEY_SALT` — salts hashed IP identifiers stored in Redis.

Changes to limits take effect when Edge Function isolates reload. Keep
production values in Supabase secrets, not in frontend `VITE_*` variables.

## HTTP contract

Allowed responses include:

```text
X-RateLimit-Limit
X-RateLimit-Remaining
X-RateLimit-Reset
```

`X-RateLimit-Reset` is a Unix epoch timestamp in seconds. Browsers can read the
headers through `Access-Control-Expose-Headers`.

Exceeded limits return HTTP 429:

```json
{
  "error": "Too many requests. Please try again later."
}
```

The response also includes `Retry-After`.

## Proxy and privacy handling

Client identity is IP-based by default:

1. `CF-Connecting-IP` when supplied by Cloudflare.
2. `X-Real-IP` when supplied by the trusted edge.
3. The trusted right-hand side of `X-Forwarded-For`.

`RATE_LIMIT_TRUST_PROXY_HOPS` controls selection from proxy chains. Do not raise
it without confirming the production load-balancer topology. IP addresses are
SHA-256 hashed before storage; raw addresses are not written to Redis or
violation logs.

## Monitoring

Violations are emitted as structured warning logs:

```json
{
  "event": "rate_limit_exceeded",
  "scope": "submit-contact",
  "category": "contact",
  "identifier": "hashed identifier",
  "limit": 3,
  "reset": 1787400000
}
```

Storage failures use `event: "rate_limit_store_error"` and return HTTP 503.
Create log alerts for bursts of violations and any storage error.

## Maintenance

1. Add every new `supabase/functions/<name>/index.ts` endpoint to
   `ENDPOINT_RATE_LIMIT_CATEGORIES`.
2. Wrap its handler with `withEndpointRateLimit`.
3. Run `npx vitest run src/lib/__tests__/edgeRateLimit.test.ts`; the coverage
   test fails when a deployed function is unclassified or unwrapped.
4. Review exemptions quarterly.
5. Rotate Redis tokens and `RATE_LIMIT_KEY_SALT` using the normal secrets
   process. Salt rotation creates a fresh set of counters.

The legacy `public.rate_limits` Postgres table is no longer used by request
middleware. Retain it until a separate reviewed migration removes it.
