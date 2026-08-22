# Supabase Edge Function Rate Limiting

The former Postgres copy-and-paste pattern in this document is retired.

Application-wide middleware now lives at:

```text
supabase/functions/_shared/rate-limit.ts
```

Production uses Redis; local development uses an in-memory store. Every
deployed Edge Function is classified and wrapped, and CI tests fail if a new
function is added without rate limiting.

See [`docs/RATE-LIMITING.md`](./RATE-LIMITING.md) for:

- endpoint categories and default limits;
- Redis and local configuration;
- environment-variable overrides;
- proxy/IP handling;
- 429 response headers and body;
- monitoring and maintenance instructions.
