# Cloudflare Worker API - Living With Arthritis

Worker entry: worker/index.ts. Config: wrangler.jsonc (assets ./dist, 404-page, run_worker_first /api/*, AI binding).
Non-API paths stay asset-first with real HTTP 404. Do not enable SPA mode.

## Endpoints
- GET /api/health - smoke JSON without leaking secrets
- GET /api/search?q=&topic=&words= - baked public/search-index.json
- POST /api/contact, /api/appointment - Resend; optional Turnstile; honeypot
- POST /api/chat - Workers AI then OpenAI fallback SSE
- POST /api/indexnow - optional; prefer scripts/indexnow-ping.mjs

All /api responses set x-request-id. Client success only on HTTP 2xx/stream.
Helpers: src/lib/formApi.ts, useContact, useAppointment, useStreamingChat.

## Scripts
- see package.json search index and cf scripts
- cf:dev, cf:deploy, api:health, search index generator

## Rate limiting
In-memory by default. Optional RATE_LIMIT and SUBMISSIONS KV with real ids only.

## Config
Set Resend and optional OpenAI / Turnstile / IndexNow via Wrangler secrets. AI binding needs none.

## Chat
Max 2000 chars, 10 history, 25s timeout, clear 503 if no provider. UK disclaimer; no invented doses.

## Tests and CORS
Vitest worker tests. CORS allows production domain and localhost 8787/8080.

## Out of scope
No Supabase/Vercel re-add. No workflow edits.

See also docs/SPEED-NOTES.md.
