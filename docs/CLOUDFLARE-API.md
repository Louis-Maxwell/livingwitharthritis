# Forms + chat Cloudflare API

Worker: worker/index.ts
Keeps assets 404-page; run_worker_first only /api/*.

POST /api/contact, /api/appointment, /api/chat (SSE).
Success only after confirmed 2xx/stream. Mailto never alone equals success.

Secrets: RESEND_API_KEY, RESEND_FROM, CONTACT_TO_EMAIL; optional OPENAI_*.
Deploy: npm run build && npx wrangler deploy. GitHub alone is not live.
Local: wrangler dev + npm run dev.
