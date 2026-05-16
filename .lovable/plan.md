# Fix "Arthritis AI – Failed to fetch"

## What's actually happening

The chat backend (`supabase/functions/chat/index.ts`) is already a working, well-structured edge function:
- Uses Lovable AI Gateway with `google/gemini-3-flash-preview`
- Streams responses via SSE
- Has rate limiting, input validation, red-flag/PII safety, and a strong system prompt
- `LOVABLE_API_KEY` is configured

The recent network log shows **every** Supabase request from the preview fails with `Failed to fetch` — not just `/chat`, but also basic REST reads (`face_stories`, `donations`, `blog_views`, etc.). That's the **Lovable preview iframe fetch-proxy issue**, not a backend bug. The edge function never even receives the request (logs are empty).

This typically works fine on the published URL (`livingwitharthritis.lovable.app` / `livingwitharthritis.org.uk`).

## Plan

### 1. Verify on the published URL first
Open the chat on `https://www.livingwitharthritis.org.uk/chat` and send a message. If it streams a reply → the backend is fine and only the preview environment is affected (expected). If it also fails → continue with step 2.

### 2. Make the client more resilient (only if needed)
Two small client-side changes in `src/hooks/useStreamingChat.ts`:

- **Better error surfacing**: when `fetch` throws (TypeError: Failed to fetch), show a friendly toast explaining it's a network/preview issue and suggest trying the published site, instead of a bare "Failed to fetch".
- **Add `?stream=0` JSON fallback**: if the SSE stream throws mid-read, retry once with a non-streaming JSON request. Some proxies mangle SSE but pass JSON.

### 3. Add a non-streaming branch to the edge function (only if needed)
In `supabase/functions/chat/index.ts`, when the request has `?stream=0` (or `Accept: application/json`):
- Call the gateway with `stream: false`
- Return `{ ok: true, data: { content } }` as plain JSON
- Reuse all existing safety/rate-limit/validation logic

This gives the chat a robust fallback for any environment where SSE is blocked, without changing the default streaming UX.

### 4. No model/prompt changes
The current model (`google/gemini-3-flash-preview`) and system prompt are appropriate and align with the project's medical-safety memory. No edits to either.

## Files touched (if step 2/3 are needed)
- `src/hooks/useStreamingChat.ts` — friendlier error + JSON fallback retry
- `supabase/functions/chat/index.ts` — optional non-streaming JSON branch

## Out of scope
- Database / RLS changes
- New secrets (LOVABLE_API_KEY already present)
- UI redesign of the chat page

**Recommended next step:** test the chat on the published URL. If it works there, no code changes are needed — the preview "Failed to fetch" is a known Lovable platform quirk. If it also fails on production, approve this plan and I'll implement steps 2 + 3.
