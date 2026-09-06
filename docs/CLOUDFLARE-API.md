# Cloudflare Worker API - Living With Arthritis

Worker entry: worker/index.ts. Config: wrangler.jsonc (assets ./dist, 404-page, run_worker_first /api/*, AI binding).
Non-API paths stay asset-first with real HTTP 404. Do not enable SPA mode.

## Endpoints
- GET /api/health - smoke JSON without leaking secrets (`Cache-Control: public, max-age=10, stale-while-revalidate=30`)
- GET /api/search?q=&topic=&words= - baked public/search-index.json (`max-age=300, stale-while-revalidate=3600`); `q` capped at 200 chars
- POST /api/contact, /api/appointment - Resend; optional Turnstile; honeypot. **503** when Resend missing; **502** on provider failure; success only on HTTP 2xx. Worker never fakes mailto success.
- POST /api/chat (alias `/api/chat/stream`) - Workers AI then OpenAI fallback SSE
- POST /api/indexnow - optional; requires INDEXNOW_KEY (503 if unset); prefer scripts/indexnow-ping.mjs

All /api responses set `x-request-id` (and include `requestId` in JSON bodies). CORS exposes `x-request-id` and `Retry-After`. Client success only on HTTP 2xx/stream.
Known paths with the wrong HTTP method return **405** `{ ok:false, error, code:"method_not_allowed" }` plus an `Allow` header.
Unhandled exceptions return **500** `{ code:"internal_error" }` without leaking internals.
POST bodies over 64KB return **413** `{ code:"payload_too_large" }` (Content-Length and actual bytes checked).
Helpers: src/lib/formApi.ts, useContact, useAppointment, useStreamingChat.

## Scripts
- see package.json search index and cf scripts
- cf:dev, cf:deploy, api:health, search index generator

## Rate limiting
In-memory by default. Optional RATE_LIMIT and SUBMISSIONS KV with real ids only.
429 responses use `{ ok:false, error, code:"rate_limited", retryAfterSec }` and a `Retry-After` header.
Client form helpers surface that wait time in the error string and do not open mailto for rate limits.

## Config
Set Resend and optional OpenAI / Turnstile / IndexNow via Wrangler secrets (or vars). AI binding needs none.
Do not invent fake KV namespace IDs - create then paste real ones into wrangler.jsonc.

## Chat
POST /api/chat JSON: `{ messages: [{role, content}], profileSummary?: string }` (or `{ message: string }`).
`profileSummary` is optional client-side About You text (joints/conditions) for personalisation — sanitised, max 500 chars, not stored server-side.
SSE events: `{type:"token", content}`, `{type:"done"}`, `{type:"error", error}` (client-safe; no provider internals).
SSE headers: `Cache-Control: no-cache, no-store, no-transform`, `X-Accel-Buffering: no`, plus `x-request-id`.
JSON error bodies use `{ok:false, error, code, requestId?}` (429 `rate_limited`, 400 `message_too_long` / `bad_request`, 503 `not_configured`, 502 `provider_error`).
Max 2000 chars/message (rejected, not silently truncated), 10 history, 25s provider timeout (connect + stream). UK NICE-aligned prompt (charity 1218461, Oswestry; independent of Arthritis UK; HCPC PH128483; no prescribing). Mailto is client fallback only when the API fails - never toasted as success.

## Tests and CORS
Vitest worker tests (worker/__tests__). CORS allows production domain and localhost 8787/8080; preflight OPTIONS returns 204.

## Forms
Appointment preferredDate should be YYYY-MM-DD (400 invalid_date otherwise).
Resend uses a 15s abort timeout; provider detail stays in Worker logs.

## Deploy
Push to main first; run the package cf:deploy script only when Wrangler auth is already present.

## Out of scope
No Supabase/Vercel re-add. No workflow edits. No frontend redesign beyond formApi/hooks.

See also docs/SPEED-NOTES.md.
