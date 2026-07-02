## Plan: five-item SEO/AEO/security execution

I'll ship all five in one pass. Item 5 (AEO sweep) is the biggest — 40 pages — so I'm handling it via a shared component + codemod rather than 40 hand edits, which is faster, safer, and preserves existing content.

### 1. Chat auth
- Add `[functions.chat] verify_jwt = true` to `supabase/config.toml`.
- In `supabase/functions/chat/index.ts`: validate the JWT via `getClaims()`, return 401 for anonymous. Keep rate limiting + safety.
- `src/pages/Chat.tsx` + `src/components/ChatBot.tsx`: when no session, render a friendly sign-in / sign-up card instead of the composer; send `Authorization: Bearer <access_token>` on invoke.

### 2. OG images (build-time, satori + resvg)
- Add `satori`, `@resvg/resvg-js`, `yoga-wasm-web` as devDeps.
- New `scripts/generate-og-images.ts`: iterates blog articles + guide/condition pages, renders 1200×630 branded PNG (title, category chip, `livingwitharthritis.org.uk` footer) into `public/og/<slug>.png`. Idempotent (skips existing unless `--force`).
- Wire into `prebuild` (after sitemap) and `predev` (best-effort).
- New helper `src/lib/ogImage.ts` → `getOgImageUrl(slug)`. Update `SeoHead` / page templates to prefer per-slug OG.

### 3. RLS + security migration
- Inspect current policies on `buddy_profiles`, `contact_inquiries`, `chat_messages`, `profiles`.
- Migration:
  - Tighten `buddy_profiles` SELECT so non-owners only see the fields needed for matching (via a `public.buddy_profile_match_view` SECURITY INVOKER view or a policy that restricts to matched pairs + owner + admin).
  - Restrict `contact_inquiries` SELECT to admins + submitter (if user_id present).
  - Revoke `EXECUTE ... FROM PUBLIC` on SECURITY DEFINER functions that don't need public execution (`increment_blog_view` stays public; `move_to_dlq`, `enqueue_email`, `email_queue_wake`, `email_queue_dispatch`, `read_email_batch`, `delete_email` restricted to `service_role`).
  - Add index: `CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation_id ON public.chat_messages(conversation_id)` (matches the RLS subquery).

### 4. Dependency upgrades
- `bun add -d vitest@latest @vitest/coverage-v8@latest jsdom@latest picomatch@latest`
- `bun add jspdf@latest` — read `src/lib/generatePdf.ts`, adapt to v3 API (jsPDF export shape changed only mildly: `import { jsPDF } from 'jspdf'` still works; `autoTable` is separate — check).
- Run `tsgo` + `bun run build` to verify.

### 5. AEO sweep across ~40 pages
- New `src/components/seo/AeoEnhancement.tsx` — a single drop-in wrapping:
  - `AnswerBox` (answer-first summary)
  - `LastUpdated` line + `MedicallyReviewed` badge
  - optional `FAQ` list rendered as accordion + injects FAQPage JSON-LD
  - optional definition/stat callout slots
- New `src/data/page-aeo.ts` — a map of `route → { answer, faqs, reviewer, updatedAt, definition? }` for the 40 target pages (16 conditions + ~11 guides + 13 top blog/hub pages).
- `scripts/apply-aeo.mjs` — codemod that scans `src/pages/conditions/*.tsx`, `src/pages/guides/*.tsx`, and a whitelisted set of hub pages; inserts `<AeoEnhancement route={...} />` immediately after the first `<h1>` if not already present. Idempotent.
- Run the codemod once, verify a sample renders, commit.

### Verification
- `bun run seo:audit` and `bun run seo:schema` at the end.
- Typecheck + build must stay green.

### Deliverables
- Files: `supabase/config.toml`, `supabase/functions/chat/index.ts`, `src/pages/Chat.tsx`, `src/components/ChatBot.tsx`, one migration, `scripts/generate-og-images.ts`, `src/lib/ogImage.ts`, `src/components/seo/AeoEnhancement.tsx`, `src/data/page-aeo.ts`, `scripts/apply-aeo.mjs`, 40 touched page files, `package.json`.
- New npm scripts: `og:generate`, `aeo:apply`.
