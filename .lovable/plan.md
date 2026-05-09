## Goal
Raise AI trust & safety across every AI surface (chat, diet, self-help/symptom tracker) — both backend hardening and frontend disclosure — without changing the editorial voice or breaking existing flows.

## Scope confirmed
- AI surfaces: site-wide (chat is the live one; diet/self-help currently use static AI-curated content but get the same disclosure treatment)
- Backend: safer prompts + disclaimers, rate limit improvements, PII redaction, content moderation
- Frontend: AI disclosure, streaming UX/error toasts, citations + reviewed-by-clinician badges, consent + emergency redirect modal

---

## Backend

### 1. Shared safety module — `supabase/functions/_shared/ai-safety.ts` (new)
- `RED_FLAG_PATTERNS` — regex list for emergency cues (chest pain, suicidal ideation, sudden severe joint pain with fever, loss of function, anaphylaxis). Returns a structured match.
- `BLOCKED_PATTERNS` — self-harm methods, illegal drug dosing, child medication overrides, requests to bypass safety.
- `redactPII(text)` — strips UK phone numbers, emails, NHS numbers (10-digit pattern), postcodes, full DOBs before logging.
- `containsBlockedContent(text)` → boolean.
- `detectRedFlags(text)` → `{ matched: boolean, category }`.
- `MEDICAL_DISCLAIMER` constant appended to every AI response when relevant.

### 2. Harden `supabase/functions/chat/index.ts`
- Tighten system prompt: explicit refusal rules (no diagnosis, no prescription dosing for new meds, no pediatric dosing, no mental-health crisis counselling — instead route to NHS 111 / Samaritans 116 123 / 999).
- Pre-flight on the latest user message:
  - If `containsBlockedContent` → return short refusal stream with safe alternatives (no gateway call).
  - If `detectRedFlags` → prepend a forced safety preamble to the response and still answer informationally.
- Tighten limits: `MAX_MESSAGE_LENGTH 10000 → 4000`, `MAX_MESSAGES 50 → 30`, rate limit 30/5min → keep but add per-message minimum 800ms gap via existing limiter window check.
- Replace `console.error` of raw input with `redactPII(...)` for any logging of message content.
- Add `X-AI-Disclosure: ai-generated` response header for transparency.

### 3. New shared rate-limit fix
- Confirm `_shared/rate-limiter.ts` is in-memory only — note in plan that this is best-effort per edge instance (workspace policy says no backend rate limiting infra; keeping existing implementation, not extending it).

---

## Frontend

### 4. New components (under `src/components/ai/`)
- **`AiDisclosureBadge.tsx`** — small pill ("AI-generated · Not medical advice") shown above every AI response and on every page that surfaces AI suggestions.
- **`AiConsentModal.tsx`** — first-use modal stored in `localStorage` (`lwa_ai_consent_v1`):
  - Plain-English summary: what the AI does, what data is sent (messages only, no account data), no diagnosis, model identity ("powered by general-purpose LLMs via Lovable AI Gateway"), retention (not stored beyond the session unless user signs in).
  - Two buttons: "I understand — continue" and "Cancel". Required before first message in `/chat`.
- **`EmergencyRedirectDialog.tsx`** — triggered when the streaming response contains a server-emitted `[[RED_FLAG:category]]` token OR client detects red-flag keywords in the user's own input. Shows: "If this is a medical emergency, call 999. For urgent advice call NHS 111. Mental-health crisis: Samaritans 116 123." with one-tap `tel:` links.
- **`ClinicalReviewBadge.tsx`** — reusable "Reviewed by HCPC-registered clinician · Last reviewed [date]" tag for content blocks and AI answers. (Already partially exists as `MedicallyReviewed` — extend, don't duplicate.)
- **`AiSourcesList.tsx`** — renders an array of `{ label, url }` citations under an AI answer when provided. Chat backend will not auto-generate citations yet; component is ready and used immediately on diet/self-help static AI cards where we know the sources.

### 5. Update chat surface
- `src/pages/Chat.tsx` + `src/components/ChatBot.tsx`:
  - Show `AiConsentModal` on first visit.
  - Render `AiDisclosureBadge` above the chat thread and inside each assistant bubble.
  - Friendly toast handling for 429 (`"Too many messages — please wait 30 seconds."`) and 402 (`"AI is temporarily unavailable — please try again later."`) using sonner.
  - Add an Abort button that cancels the in-flight `AbortController` and a Retry button on failed turns.
  - Detect emergency keywords in user input client-side and open `EmergencyRedirectDialog` before sending.
  - Fixed-position `ClinicalReviewBadge` in the chat header.

### 6. Update Diet Hub & Self-Help Tool
- `src/pages/DietHub.tsx` and `src/pages/SelfHelp*` (or equivalent): add `AiDisclosureBadge` to any "AI-suggested" cards, attach `AiSourcesList` with the sources already cited in project knowledge (NICE NG226, *J Med Food* 2016, etc.), and reuse `ClinicalReviewBadge` near each section heading.

### 7. Global "AI safety" page — `src/pages/AiSafety.tsx` (new) routed at `/ai-safety`
- Plain-English explainer: how the AI works, what it can/can't do, what data leaves the device, who reviewed it, how to report a bad answer (`info@livingwitharthritis.org.uk`), emergency contacts.
- Linked from footer + every `AiDisclosureBadge`.

---

## Out of scope
- Persistent chat history / accounts.
- Fine-tuning or switching models.
- Server-side moderation API calls (using regex patterns for now to avoid extra spend).
- Adding rate-limit infrastructure (workspace policy).

## Files touched (summary)
**New**
- `supabase/functions/_shared/ai-safety.ts`
- `src/components/ai/AiDisclosureBadge.tsx`
- `src/components/ai/AiConsentModal.tsx`
- `src/components/ai/EmergencyRedirectDialog.tsx`
- `src/components/ai/ClinicalReviewBadge.tsx`
- `src/components/ai/AiSourcesList.tsx`
- `src/pages/AiSafety.tsx`

**Edited**
- `supabase/functions/chat/index.ts`
- `src/components/ChatBot.tsx`
- `src/pages/Chat.tsx`
- `src/pages/DietHub.tsx`
- Self-help page (exact filename to confirm at edit time)
- `src/components/Footer.tsx` (add `/ai-safety` link)
- Router config (add `/ai-safety` route)
