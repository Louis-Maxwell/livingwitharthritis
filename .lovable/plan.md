## Full-Site Audit & Remediation Plan — Living With Arthritis

A two-phase plan: **(1) Audit** the live app across 10 dimensions and produce a severity-ranked report, then **(2) Fix** issues in priority order with your approval at each gate.

---

### Phase 1 — Audit (read-only, ~0.4 credits)

I'll inspect the codebase and live preview and produce a single Markdown report at `docs/SITE-AUDIT-2026.md` with findings tagged **Critical / High / Medium / Low**, each including: file path, evidence, user impact, recommended fix, estimated effort.

**Scope per dimension:**

1. **Code quality & performance**
   - Bundle analysis (heavy lazy chunks, duplicate deps)
   - Re-render hotspots in `Index.tsx`, `Header.tsx` (549 lines), `App.tsx` (467 lines, 100+ routes)
   - Unused imports / dead routes / orphan stub pages
   - Image weights vs. served formats (webp coverage)
   - Run `tsgo` for type errors, `rg` for `console.log`, `any`, `TODO`, `@ts-ignore`

2. **UI/UX & visual consistency**
   - Hardcoded colour audit (`text-gray-*`, `bg-white`, hex literals) vs. semantic tokens (memory rule)
   - Typography scale drift, button variant misuse, spacing inconsistencies
   - Header mega-menu behaviour, mobile drawer, focus traps

3. **Content**
   - Typos / grammar (en-GB spellcheck pass on top 30 pages)
   - Forbidden terms: any lingering "NHS", "AI", "AI-powered", robot iconography (memory rules)
   - Address still present anywhere (memory: removed)
   - Duplicate / placeholder copy

4. **Functionality**
   - Playwright smoke against `localhost:8080`: nav, mega-menu, symptom checker flow, newsletter signup, donate CTA, exercise video playback, blog post render, helpline links (tel:/mailto:/wa.me)
   - Capture console errors + failed network requests per page
   - Edge-function preflight reports already show `process-donation` + `process-email-queue` failing — investigate

5. **Mobile responsiveness**
   - Playwright at 375×812 and 768×1024: tap targets ≥44px, overflow, sticky header collision, mega-menu→drawer swap

6. **SEO & metadata**
   - Run `seo_chat--trigger_scan` for fresh findings (1 stale low finding already shows Azathioprine — likely fixed, will verify and mark)
   - Validate JSON-LD with `scripts/validate-jsonld.mjs`
   - Canonical/og:url self-reference check (`scripts/check-canonicals.mjs`)
   - Sitemap parity vs. `App.tsx` routes (`scripts/audit-sitemap.mjs`)
   - Title/description length per route

7. **Accessibility**
   - Apply `skill/accessibility` checklist: alt text, icon-button labels, heading order, single `<main>`, `h-screen`→`h-dvh`, focus-visible, colour-contrast on the new `#EF4444` primary
   - Run axe via Playwright on 8 key routes

8. **Missing features**
   - Cross-reference the roadmap items deferred in earlier turns (newsletter confirmation email, Find-a-Specialist data source, Connect Groups moderation, podcasts/events/webinars, weather widget, header helpline badge) and list status

9. **Integrations**
   - Stripe donation flow (`create-donation-checkout` + `process-donation` edge fn)
   - GA4 firing under consent gate, bot-filter integrity
   - Supabase RLS via `security--run_security_scan`
   - Resend / email queue (`process-email-queue` preflight failure)
   - Shopify product feed

10. **Browser compatibility**
    - Playwright on Chromium + Firefox + WebKit for homepage, blog post, symptom checker, donate
    - Check `clamp()`, `:has()`, `aspect-*`, `h-dvh` fallbacks

**Tooling I'll run during audit:**
`tsgo`, `rg`, `scripts/audit-sitemap.mjs`, `scripts/check-canonicals.mjs`, `scripts/check-social-meta.mjs`, `scripts/validate-jsonld.mjs`, Playwright (3 browsers, 2 viewports), `seo_chat--trigger_scan`, `security--run_security_scan`, `supabase--linter`, `supabase--edge_function_logs` for the two failing functions.

**Deliverable:** `docs/SITE-AUDIT-2026.md` — a severity-ranked checklist with one row per issue. No code changes in Phase 1.

---

### Phase 2 — Remediation (gated on your approval)

After you read the audit, I'll propose a fix batch grouped by severity:

- **Batch A — Critical** (broken donation/email functions, runtime errors, accessibility blockers, exposed secrets) — fix immediately
- **Batch B — High** (SEO regressions, mobile layout breaks, content rule violations) — single pass
- **Batch C — Medium** (perf, code-quality refactors, missing alt text) — single pass
- **Batch D — Low** (polish, deferred-feature stubs, nice-to-haves) — optional

Each batch ships with verification: rerun the relevant audit check, screenshot diff for UI, type-check pass.

---

### What I need from you before starting

1. **Approve Phase 1 scope** (or trim — e.g. skip Firefox/WebKit if Chromium-only is fine, skip Shopify if not in use right now).
2. **Edge-function fixes** — the preflight reports show `process-donation` and `process-email-queue` already failing. Want me to treat those as in-scope Critical for Batch A, or are they known/intentional?
3. **Browser matrix** — confirm Chromium + Firefox + WebKit, or narrower?

Reply "approve audit" and I'll execute Phase 1 and come back with the report.