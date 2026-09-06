# Cloudflare Worker API - Living With Arthritis

Worker entry: worker/index.ts. Config: wrangler.jsonc (assets ./dist, 404-page, run_worker_first /api/*, AI binding).
Non-API paths stay asset-first with real HTTP 404. Do not enable SPA mode.

## Endpoints
- GET /api/health - smoke JSON without leaking secrets (`Cache-Control: public, max-age=10, stale-while-revalidate=30`)
- GET /api/search?q=&topic=&words= - baked public/search-index.json (`max-age=300, stale-while-revalidate=3600`)
- POST /api/contact, /api/appointment - Resend; optional Turnstile; honeypot
- POST /api/chat - Workers AI then OpenAI fallback SSE
- POST /api/indexnow - optional; prefer scripts/indexnow-ping.mjs

All /api responses set `x-request-id` (and include `requestId` in JSON bodies where applicable). Client success only on HTTP 2xx/stream.
Known paths with the wrong HTTP method return **405** `{ ok:false, error, code:"method_not_allowed" }` plus an `Allow` header.
Helpers: src/lib/formApi.ts, useContact, useAppointment, useStreamingChat.

## Scripts
- see package.json search index and cf scripts
- cf:dev, cf:deploy, api:health, search index generator

## Rate limiting
In-memory by default. Optional RATE_LIMIT and SUBMISSIONS KV with real ids only.
429 responses use `{ ok:false, error, code:"rate_limited", retryAfterSec }` and a `Retry-After` header.
Client form helpers surface that wait time in the error string and do not open mailto for rate limits.

## Config
Set Resend and optional OpenAI / Turnstile / IndexNow via Wrangler secrets. AI binding needs none.

## Chat
POST /api/chat JSON: `{ messages: [{role, content}], profileSummary?: string }`.
`profileSummary` is optional client-side About You text (joints/conditions) for personalisation — sanitised, max 500 chars, not stored server-side.
SSE events: `{type:"token", content}`, `{type:"done"}`, `{type:"error", error}`.
SSE headers: `Cache-Control: no-cache, no-transform`, `X-Accel-Buffering: no`, plus `x-request-id` when available.
JSON error bodies use `{ok:false, error, code, requestId?}` (429 `rate_limited`, 503 `not_configured`, 502 `provider_error`).
Max 2000 chars/message, 10 history, 25s provider timeout. UK NICE-aligned prompt (arthritis + frailty-related mobility); no invented doses; mailto is client fallback only when the API fails.

## Tests and CORS
Vitest worker tests. CORS allows production domain and localhost 8787/8080.

## Out of scope
No Supabase/Vercel re-add. No workflow edits.

See also docs/SPEED-NOTES.md.
