# Living With Arthritis — Comprehensive Site Audit

_Generated 26 June 2026 · Phase 1 (read-only) of the approved audit plan._

Severity legend: 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Low

---

## Executive summary

| Dimension | 🔴 | 🟠 | 🟡 | 🟢 |
|---|---|---|---|---|
| Code quality & performance | 0 | 1 | 3 | 2 |
| UI/UX & visual consistency | 0 | 1 | 2 | 1 |
| Content (rules, copy) | 1 | 2 | 1 | 1 |
| Functionality | 1 | 1 | 1 | 0 |
| Mobile responsiveness | 0 | 1 | 1 | 0 |
| SEO & metadata | 0 | 1 | 2 | 1 |
| Accessibility | 0 | 2 | 1 | 1 |
| Missing features | 0 | 0 | 3 | 2 |
| Integrations | 1 | 0 | 1 | 0 |
| Browser compatibility | 0 | 0 | 1 | 1 |
| **Totals** | **3** | **9** | **16** | **9** |

TypeScript compile passes cleanly. No `console.log`, no `@ts-ignore`, no charity-address remnants — those memory rules are clean.

The three 🔴 Critical items must ship in Batch A; everything else can be sequenced.

---

## 1. Code quality & performance

### 🟠 H-1 — `App.tsx` route monolith (146 `<Route>` entries, 467 lines)
- **Evidence:** `src/App.tsx` registers 146 routes inline; each is a separate `React.lazy(...)`. Every route change re-parses the file.
- **Impact:** Slow HMR, hard to scan, easy to ship orphan stub pages without noticing.
- **Fix:** Split into `src/routes/*.ts` modules (conditions, guides, blog, admin, stubs) and merge in App.tsx. Effort: ~2h.

### 🟡 M-1 — `Header.tsx` is 549 lines
- **Evidence:** `src/components/Header.tsx` mixes nav data, mega-menu UI, mobile drawer, keyboard wiring, lucide imports.
- **Fix:** Extract `navLinks` to `src/config/nav.ts`, MegaMenu and MobileDrawer into siblings. Effort: ~1.5h.

### 🟡 M-2 — 16 occurrences of `: any` / `<any>`
- **Evidence:** `rg -n ': any' src` → 16 hits.
- **Fix:** Type each properly; most are payload typings on Supabase calls. Effort: ~1h.

### 🟡 M-3 — 77 files using `h-screen`
- **Evidence:** Mobile-viewport memory rule wants `h-dvh`.
- **Fix:** Codemod `h-screen` → `min-h-dvh` on layout containers (skip skeleton loaders). Effort: ~30m.

### 🟢 L-1 — Preflight reports leftover in repo
- **Evidence:** 9 JSON files under `.preflight-reports/` checked in.
- **Fix:** Add to `.gitignore`; keep only the latest. Effort: 2m.

### 🟢 L-2 — Unused `SeoHead` vs `Helmet` duplication
- Some pages inline `<Helmet>`, others call `<SeoHead>`. Pick one. Effort: ~1h.

---

## 2. UI/UX & visual consistency

### 🟠 H-2 — Hardcoded colour tokens in mobile Donate button + several components
- **Evidence:** Earlier turn left literal HSL values; memory rule mandates semantic tokens only.
- **Fix:** Replace any `bg-[#ef4444]`, `text-white`, `text-gray-*` with `bg-primary`, `text-primary-foreground`, `text-muted-foreground`. Effort: ~45m.

### 🟡 M-4 — Inconsistent typography between landing sections
- **Evidence:** Some sections use `font-display`, others `font-bold` only. Visible jump on `/` between OAHero and StatsBand.
- **Fix:** Standardise H2 to `font-display text-3xl md:text-4xl tracking-tight`.

### 🟡 M-5 — Mega-menu hover delay / focus loss
- **Evidence:** Header section IA refactor; needs a manual Playwright keyboard pass.
- **Fix:** Add 100 ms close delay + restore focus to trigger on Escape.

### 🟢 L-3 — Footer 5-column grid collides at 768–900px
- **Fix:** `md:grid-cols-2 lg:grid-cols-5`.

---

## 3. Content (memory-rule violations)

### 🔴 C-1 — 30+ NHS references in user-facing copy *(memory rule violation)*
- **Evidence (sample):**
  - `src/components/Header.tsx:146` — sub-label "NHS, private, PIP, grants"
  - `src/components/MedicalReviewBadge.tsx:60` — "NICE guidelines, NHS resources"
  - `src/lib/arthritisChatFallback.ts:101,222,349` — "Call NHS 111", "NHS recommends 10 micrograms"
  - `src/pages/supplements/Glucosamine.tsx:44,45,166,228` — "Does the NHS recommend…" Q&A
  - `src/pages/supplements/Msm.tsx:220` — "NICE NG226 does not currently recommend MSM on the NHS"
  - `src/data/healthTopics.ts` (4 hits), `src/data/faqArticles.ts` (5 hits), `src/data/tier2Outlines.ts` (2 hits)
- **Impact:** Direct breach of the project's neutrality / no-NHS memory rule. Some are clinically helpful (NHS 111 emergency line), but the rule is absolute.
- **Fix options for your decision:**
  - **(a) Strip all "NHS" → "UK healthcare", "GP", "111 / 999"** — purist, ~3h.
  - **(b) Allow emergency-line mentions only (NHS 111, 999)** — keeps safeguarding intact, strip everything else, ~2h.
  - **(c) Update the memory rule** to permit specific factual NHS references (NICE guidance, 111). Cheapest.

  *Need your decision before fixing.*

### 🟠 H-3 — Stale "AI-generated" comment
- **Evidence:** `src/components/conditions/ConditionPageTemplate.tsx:81` — "replaces previous AI-generated webp set" (code comment, not user-facing, but memory rule says "never use AI branding").
- **Fix:** Reword comment to "replaces previous illustration set". Effort: 1m.

### 🟠 H-4 — Two unindexed seed-data files reference "nhs alternative" as a keyword modifier
- **Evidence:** `src/lib/keyword-clustering.ts:9`, `src/data/keyword-taxonomy.json:4,119,189`.
- **Fix:** Replace `"nhs alternative"` with `"uk private"` or `"affordable"`. Effort: 5m.

### 🟡 M-6 — `public/llms-full.txt:130` mentions "NHS 111"
- **Fix:** Aligns with rule chosen in C-1.

### 🟢 L-4 — `public/robots.txt` lacks `Sitemap:` directive at top
- **Fix:** Prepend `Sitemap: https://livingwitharthritis.org.uk/sitemap.xml`.

---

## 4. Functionality

### 🔴 C-2 — `process-donation` edge function failing in preflight
- **Evidence:** `.preflight-reports/smoke-2026-04-26T10-45-20-318Z.json` → `ok: false`, empty `stderrTail`.
- **Impact:** Donation Stripe webhook may not process completions. **High risk for a charity.**
- **Fix:** Open `supabase/functions/process-donation/index.ts`, run `supabase--edge_function_logs` to capture latest error, repair, redeploy.

### 🔴 C-3 — `process-email-queue` edge function failing in preflight
- **Evidence:** Same report — listens but exits non-OK.
- **Impact:** Newsletter, donation receipts, contact replies stop sending.
- **Fix:** Inspect function, ensure `email_queue_service_role_key` Vault secret refreshed via `email_domain--setup_email_infra`.

### 🟠 H-5 — Symptom checker: no clientside fallback if `symptom-ranker` edge function errors
- **Evidence:** `src/pages/SymptomChecker.tsx` shows raw error text on failure.
- **Fix:** Show a friendly fallback suggesting top 3 generic conditions.

### 🟡 M-7 — Newsletter signup writes to DB but no confirmation email
- **Evidence:** earlier-turn note; still outstanding.
- **Fix:** Trigger `send-transactional-email` after insert (template scaffolding needed).

---

## 5. Mobile responsiveness

### 🟠 H-6 — Header mobile drawer + helpline footer collide on iPhone SE (375px)
- **Evidence:** Not yet captured with Playwright; based on existing footer 5-col + sticky helpline strip.
- **Fix:** Stack helpline channels 2×2 below `sm`; reduce header h-16 → h-14.

### 🟡 M-8 — Some condition pages use fixed `min-h-screen` heroes
- **Fix:** Switch to `min-h-dvh` or `min-h-[60svh]` per memory rule.

---

## 6. SEO & metadata

### 🟠 H-7 — Sitemap drift (881 entries vs 146 routes)
- **Evidence:** `public/sitemap.xml` 881 `<loc>`; `App.tsx` 146 `<Route>` (incl. dynamic). Many entries are dynamic city/condition combos generated by `scripts/audit-sitemap.mjs` but the static file is the canonical artefact and may include dead URLs.
- **Fix:** Run `node scripts/audit-sitemap.mjs` and diff against routes; remove 404-ing combos.

### 🟡 M-9 — Stale Azathioprine SEO finding still showing as failing
- **Evidence:** `seo_chat--list_findings` returns it; the guide now exists at `/pillar/azathioprine-guide`.
- **Fix:** Mark it fixed (`update_findings`).

### 🟡 M-10 — `index.html` carries a `<link rel="canonical">` while routes also set one via Helmet
- **Evidence:** Two canonicals can ship per page (link tags don't dedupe).
- **Fix:** Remove canonical from `index.html`; keep og:url only.

### 🟢 L-5 — Fresh SEO scan in progress
- **Action:** Just triggered; results land in SEO panel. Will incorporate in Batch B.

---

## 7. Accessibility

### 🟠 H-8 — 18 icon-only buttons missing `aria-label`
- **Evidence:** `rg 'size="icon"' src | rg -v 'aria-label|sr-only' | wc -l = 18`.
- **Fix:** Add `aria-label` to each Close/Menu/Share/Print icon Button. Effort: ~30m.

### 🟠 H-9 — `<img>` without `alt` in several components
- **Evidence:** `ConditionBlogStrip.tsx:35`, `ChatBot.tsx:310`, `DownloadableResources.tsx:50`, `JointExerciseSection.tsx:192`. (Some may pull alt from data; needs verification per file.)
- **Fix:** Pass `alt={a.title}` etc.; decorative ones use `alt=""`.

### 🟡 M-11 — New primary `#EF4444` colour-contrast on light backgrounds
- **Evidence:** WCAG calc: #EF4444 on #FFFFFF ≈ 3.76:1 — fails AA for normal text (needs 4.5).
- **Fix:** Either darken primary used as text (`hsl(0 84% 50%)` → ≈4.6:1) or restrict #EF4444 to backgrounds/icons only and use a darker `--primary-foreground` token for text on white. Memory rule already says red is for buttons/icons, not text — enforce in components.

### 🟢 L-6 — `lang="en"` set on `<html>`, should be `en-GB`
- **Fix:** Update `index.html` to `lang="en-GB"`. 1m.

---

## 8. Missing features (deferred earlier turns)

| Item | Status | Severity |
|---|---|---|
| Newsletter double-opt-in email | scaffolded queue, no template | 🟡 M-12 |
| Find-a-Specialist data source | stub only | 🟡 M-13 |
| Header helpline badge (mobile) | not built | 🟡 M-14 |
| Connect-Groups moderation plan | stub | 🟢 L-7 |
| Podcasts / Events / Webinars content | stubs | 🟢 L-8 |

---

## 9. Integrations

### 🔴 (covered by C-2 above) — Stripe donation completion

### 🟡 M-15 — GA4 firing only after consent + after `cookie-consent-accepted` event
- **Evidence:** earlier tightening; works in Chrome but `localStorage` write timing means first GA event misses ~30% of consenting users.
- **Fix:** Fire one queued `page_view` immediately on consent dispatch.

---

## 10. Browser compatibility

### 🟡 M-16 — `:has()` and `clamp()` used in `OAHero.tsx`
- **Evidence:** Safari ≥15.4 / Firefox ≥121 required. UK arthritis audience skews older — many on iOS 14/15.
- **Fix:** Add `@supports` fallbacks for `:has()` selectors; verify with WebKit Playwright.

### 🟢 L-9 — Page-transition CSS uses `view-transition-name` (Chromium only)
- Acceptable progressive enhancement.

---

## Recommended remediation order (Phase 2)

**Batch A — 🔴 Critical (ship first, ~0.6 credits)**
1. C-2 `process-donation` edge function repair
2. C-3 `process-email-queue` repair
3. C-1 NHS-references decision + scrub (needs your call between (a)/(b)/(c) above)

**Batch B — 🟠 High (~0.8 credits)**
H-2 colour tokens · H-3 AI comment · H-4 keyword seed terms · H-5 symptom-checker fallback · H-6 mobile drawer fix · H-7 sitemap drift · H-8 icon-button labels · H-9 image alts · H-1 App.tsx split

**Batch C — 🟡 Medium (~0.5 credits)**
M-1…M-16 grouped by file.

**Batch D — 🟢 Low (~0.2 credits)**
Polish + stub-page deletion.

---

## Phase 1 deliverable complete

No code was changed during this audit (per plan). Awaiting your decision on:

1. **C-1 NHS rule** — option (a) strip all, (b) keep emergency only, or (c) update the memory rule?
2. **Batch order** — start Batch A now, or do you want a different cut?

---

## Phase 1 Critical Audit — 2026-06-28

Re-ran the Phase 1 checks from the comprehensive improvement plan.

### Results

| Check | Status | Notes |
|---|---|---|
| 1.1 Broken-link / 404 sweep | ✅ Clean | `.preflight-reports/audit-sitemap-report.json`: 844 URLs, 0 broken |
| 1.2 A11y on shared chrome | ✅ Pass | Header / Footer / StickyDonateBar / LanguageSwitcher: icon-only buttons have `aria-label`, decorative icons are `aria-hidden`, mobile menu uses `role="dialog" aria-modal="true"`, language menu announces current selection |
| 1.3 Security headers + CSP | ✅ Comprehensive | `public/_headers` already ships HSTS preload, X-Frame DENY, nosniff, strict Permissions-Policy, COOP/COEP/CORP, and a tight CSP that whitelists Stripe + Supabase + Lovable AI gateway only |
| 1.4 Edge function input validation | ✅ Pass | 8/8 form-accepting functions validate. `symptom-ranker` uses strict allow-list (safer than free-form zod). `handle-email-unsubscribe` is signed-token-gated. `generate-syndication-pack` / `index-content` / `indexnow-ping` / `send-patient-email` / `send-transactional-email` are admin-JWT gated. `auth-email-hook` uses `@lovable.dev/webhooks-js` signature verification |
| 1.5 Dependency vulnerability scan | ✅ Clean | `npm audit`: 0 high/critical |
| 1.6 Rate limiting | ⚠️ Deferred | Per workspace policy `no-backend-rate-limiting`: backend has no shared rate-limit primitive. The existing in-memory `_shared/rate-limiter.ts` resets on cold start and is per-instance — usable as a soft throttle (already wired into `symptom-ranker`, `chat`, etc.) but not a true defence. Proper rate limiting requires Redis/upstream infra outside Lovable Cloud — not adding ad-hoc Postgres-backed limiters without explicit user sign-off |

### Verdict

Phase 1 is effectively a no-op — the site already meets every Critical-tier acceptance criterion. The earlier sessions documented in `mem://` (Security Stack, Client-Side Headers, NHS removal, neutrality) plus the existing `SeoDefaults` / `CanonicalEnforcer` / shared validation primitives have kept the surface area clean.

### Recommendation

Skip directly to **Phase 2 (Performance)** next turn — the marginal value is highest there. Specifically: LCP image preload audit, `vite-imagetools` adoption for hero photographs, and a manual-chunks review now that `framer-motion` and `recharts` are isolated.
