
# Comprehensive Improvement Plan — Phased Execution

Your 6-dimension brief is ~10 weeks of work. I won't try to ship it in one turn — that produces shallow changes across the board. Instead I'll execute it phase-by-phase, starting with **Phase 1 (Critical)** which I can complete now. After each phase you approve the next.

## Assumption
You want me to start with Phase 1 and return for approval before Phase 2. Tell me if you'd rather I batch Phases 1+2 together or reorder.

---

## PHASE 1 — CRITICAL (this execution)

Scope chosen because these items are (a) shippable from code, (b) don't need external services, and (c) unblock everything else.

### 1.1 Broken-link / 404 sweep
- Run `node scripts/audit-sitemap.mjs https://livingwitharthritis.org.uk` against the live site.
- Cross-reference `.preflight-reports/audit-sitemap-report.json` with `src/App.tsx` routes.
- Fix: missing routes → add lazy route + page stub; dead sitemap entries → remove from `public/sitemap.xml` + localized sitemaps.

### 1.2 Accessibility — WCAG 2.1 AA pass on shared chrome
Targeted, not site-wide (site-wide audit = Phase 4). Focus on components rendered on every route:
- `Header.tsx`, `Footer.tsx`, `StickyDonateBar.tsx`, `LanguageSwitcher.tsx`, mega-menu.
- Checks: icon-only button labels, single `<main>`, focus-visible rings, 44×44 tap targets, color-contrast tokens, `aria-hidden` + focusable conflicts (already fixed on donate bar — verify others), keyboard nav for mega menu close.
- Drive Playwright headless against `localhost:8080` to capture before/after screenshots at mobile + desktop viewports.

### 1.3 Security headers + CSP audit
- Review `public/_headers` for: `Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy` (allow GA4, Stripe, Supabase, Unsplash, Resend pixel).
- Add any missing; tighten CSP without breaking GA4/Stripe (per existing `tech/seo/analytics` memory).

### 1.4 Edge function input validation spot-check
Confirm every public edge function under `supabase/functions/` that accepts a body uses `parseWithSchema` from `_shared/validation.ts`. Patch the ones that don't (likely: `submit-contact`, `submit-fundraising`, `book-appointment`, `request-buddy-match`, `confirm-newsletter`).

### 1.5 Dependency vulnerability scan
- Run `code--dependency_scan`. Patch any high/critical via `bun update <pkg>`.

### 1.6 Rate limiting — scoped clarification
Workspace policy (`no-backend-rate-limiting`): backend has no standard rate-limit primitive. The `_shared/rate-limiter.ts` in-memory limiter is **per-instance only** and resets on cold start — not a real limit. I will NOT add ad-hoc limits unless you explicitly confirm that tradeoff. Default = leave as-is and document the gap in `docs/SITE-AUDIT-2026.md`.

### Deliverables
- Code patches + Playwright screenshots inline.
- Updated `docs/SITE-AUDIT-2026.md` with: findings table, what was fixed, what was deferred and why.
- `seo_chat--update_findings` calls for anything that maps to existing SEO findings.

---

## PHASES 2–6 (queued, ~1 turn each on approval)

| Phase | Focus | Key deliverables |
|---|---|---|
| 2. Performance | LCP, lazy loading, bundle | `vite-imagetools` for hero/landing, route-level `React.lazy` audit, manual chunks review, PSI rerun |
| 3. Content QA | Metadata + freshness | Unique-meta-description sweep across 200+ articles, `Last updated` audit, dead internal-link check |
| 4. Testing | Vitest + Playwright | Lift coverage on `src/hooks` + `src/lib`, E2E for donate / contact / search flows, wire into existing `e2e/` |
| 5. Monitoring | Sentry + uptime | Sentry already connected — add release tagging, sourcemaps, `ErrorBoundary` reporting; document UptimeRobot setup (external) |
| 6. Ongoing | Cadence | Weekly/monthly checklist committed to `docs/MAINTENANCE.md` |

---

## What I will NOT do without explicit go-ahead
- Add Redis / read replicas / WAF / CDN swap (infra outside Lovable Cloud — needs your account + budget).
- Add a backend rate limiter (see 1.6).
- Add PWA / service worker (per workspace PWA default).
- Add dark mode (no user demand stated; would clash with the locked black-on-white palette in memory).
- Run Copyscape / Grammarly API audits (paid third-party, not wired up).

---

## Technical notes
- All edits stay in frontend/presentation + edge-function validation. No schema migrations in Phase 1.
- Canonical/SEO work continues using the existing `SeoDefaults` + `CanonicalEnforcer` pattern — no new abstractions.
- Verification: build runs automatically; I'll additionally run `tsgo` typecheck and a Playwright smoke against `localhost:8080` before reporting back.

---

**Approve to start Phase 1**, or tell me to (a) reorder, (b) batch 1+2, or (c) drop/add items from the Phase 1 list above.
