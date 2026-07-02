# SEO/AEO/GEO + Security + Perf Upgrade — Scoping

This is a **very large** request (7 tracks, ~30+ discrete deliverables) touching keywords, crawler tooling, image generation, build integration, schema, content restructuring, Core Web Vitals, RLS/auth, and dependency upgrades. To deliver it well without breaking the existing app, I need to break it into shippable phases and confirm a few decisions before writing code.

The project already has substantial SEO infrastructure — I want to **extend** it, not duplicate it:

- `public/robots.txt` — full multi-bot policy already in place
- `public/sitemap-index.xml` + `sitemap.xml` + locale sitemaps (es/fr/de/pt)
- `scripts/generate-sitemap.ts`, `scripts/audit-sitemap.mjs`, `scripts/check-canonicals.mjs`, `scripts/check-social-meta.mjs`, `scripts/validate-jsonld.mjs`, `scripts/prerender-routes.mjs`
- `src/components/SeoHead.tsx`, `src/components/seo/PageSchema.tsx` (BreadcrumbList / FAQPage / MedicalWebPage / HowTo / Speakable), `AnswerBox.tsx`
- `src/data/keyword-taxonomy.json`, `keyword-content-map.json` (5,000-keyword taxonomy), `KeywordTargeting.tsx`, `useKeywordData` hook, `/admin/rank-tracker`
- `public/llms.txt`, `public/llms-full.txt`, `public/.well-known/ai.txt`
- Medical reviewer identity baked into `PageSchema` (HCPC PH128483)

So a fair amount of the ask is **already implemented**. I'll flag what exists vs. what's genuinely new.

## Proposed phased plan

### Phase 1 — Keyword strategy (net-new)
- Add `src/data/keywords-1000.ts` with **1000 UK arthritis keywords**, 500 organic + 500 PPC, typed `{ keyword, intent, category, targetPage, group: "organic" | "paid" }`.
- Build `/admin/keyword-strategy` dashboard (admin-gated via existing `useAdmin`) with filter by group/intent/category, search, CSV export.
- Do **not** auto-inject into every page's `<meta keywords>` — the existing `SeoHead` already accepts `keywords`, and stuffing 1000 terms hurts more than helps. Instead expose a helper `getKeywordsForPage(path)` that returns the 5-10 relevant ones.

### Phase 2 — Sitemap + robots in Vite build
- `generate-sitemap.ts` already runs via `predev`/`prebuild` (verify + wire if missing). Confirm robots.txt Sitemap: directive points at prod domain (already does).
- Add `lastmod`/`changefreq`/`priority` per route type (guide vs. condition vs. static).

### Phase 3 — SEO audit script (`npm run seo:audit`)
- New `scripts/seo-audit.ts` that composes the existing `check-canonicals`, `check-social-meta`, `audit-sitemap`, `validate-jsonld` into one pass/fail report written to `/mnt/documents/seo-audit-report.md`. Reuse, don't reimplement.

### Phase 4 — JSON-LD schema validation (`npm run seo:schema`)
- Alias `scripts/validate-jsonld.mjs` (already exists, does exactly this) to `seo:schema` in `package.json`. Extend required-field table for DonateAction / NGO / HowTo if not covered.

### Phase 5 — AEO/GEO content polish
- Audit top 20 pages (home, condition landings, top guides, FAQ, Tai Chi hub, donate). For each: ensure `AnswerBox` at top, H2 questions, FAQ block with schema, "Last updated" + reviewer badge. Existing components (`AnswerBox`, `PageSchema`, `MedicallyReviewed`) already exist — just apply consistently.
- Confirm `public/llms.txt` covers all major sections (already present — will diff and top up).

### Phase 6 — OG image generation *(decision needed — see below)*

### Phase 7 — Core Web Vitals + a11y polish
- Add `loading="lazy"`, `width`/`height`, `decoding="async"` on non-LCP images in hero/card components. Preload the LCP hero image + primary font. Verify skip-link + focus rings exist (`index.css`).
- Non-goal: full route code-splitting refactor — will code-split only the two biggest routes if bundle analysis shows a win.

### Phase 8 — Backend/security
- **Chat endpoint auth**: audit `supabase/functions/chat/index.ts`. If `verify_jwt = false`, add in-code `getClaims` gate (rate-limit anon path if the "public help chat" is intended — need decision, see below).
- **RLS review** on `buddy_profiles`, `profiles`, `contact_inquiries`, `chat_messages` via `supabase--read_query` → migration to tighten SELECT policies + add index on `chat_messages(conversation_id)` for the RLS subquery.
- **SECURITY DEFINER audit**: keep `has_role`, `is_admin`, `get_public_profile`, guard-triggers (all needed); no changes unless a specific function is over-privileged.

### Phase 9 — Dependency upgrades
- `bun update jsdom jspdf vitest picomatch` to patched majors. Run typecheck + vitest. If jspdf major bump breaks `src/lib/generatePdf.ts`, patch call sites.

## Decisions I need from you before I start

1. **OG image generation** — three options, pick one:
   - **(a) Build-time static generation** via `satori` + `@resvg/resvg-js` — renders 1200×630 PNGs for every article/guide into `public/og/`. Zero runtime cost. Adds ~50MB to repo if you have hundreds of articles. **My recommendation.**
   - **(b) Runtime edge function** (`supabase/functions/og-image/`) that renders on demand and caches. No repo bloat but cold-start latency on first share.
   - **(c) Skip** — hosting already injects a default social preview; per-article branded images are nice-to-have.

2. **Chat endpoint** — is `/chat` (Help & Support) intended to be **usable by anonymous visitors** or **signed-in users only**? Current code deploys with `verify_jwt = false`. If anonymous is intentional, I'll keep it open but harden with rate limiting + Turnstile / hCaptcha. If signed-in only, I'll require auth in-code.

3. **Scope of Phase 5 content edits** — do you want me to touch **all** condition and guide pages, or a **top-20 priority list**? Full-site sweep is significantly more work.

4. **Keyword dataset source** — should I generate the 1000 keywords from the existing 5,000-keyword taxonomy (`keyword-taxonomy.json`) by classifying entries into organic vs. paid intent, or hand-curate a fresh 1000? First option keeps a single source of truth; second gives cleaner PPC intent.

5. **Delivery cadence** — I recommend shipping this in **3 PRs** (Phase 1-4 tooling → Phase 5 content + 6 OG → Phase 7-9 perf/security/deps) rather than one giant change, so each is reviewable and the build stays green. OK?

Once you answer these five, I'll execute end-to-end.
