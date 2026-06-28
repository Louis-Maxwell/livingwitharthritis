
# Execution Plan — Semrush Audit Fixes (Today)

## Honest scoping

You uploaded two documents:

1. **WEBSITE-IMPROVEMENT-PLAN.md** — 1,785 lines, self-described as a 10-week / 240-developer-hour roadmap. This is the same brief we just executed Phase 1 against; the remaining phases are infra work (Redis, APM, Sentry release tagging, E2E expansion, content audit of 208 articles). It cannot be honestly "completed today" — anyone claiming otherwise is shipping shallow placeholders.
2. **Semrush Site Audit (June 26, 2026)** — concrete, measurable findings. **This is what I will fix today.**

I'll execute the Semrush fixes in this turn, then write a short feedback note covering what's real vs. aspirational in the MD plan. The MD's remaining phases get queued (Phase 2 Performance, Phase 3 Content QA, etc.) for subsequent turns — same cadence we already agreed.

---

## Semrush findings to fix

| # | Error | Count | Status |
|---|---|---|---|
| 1 | hreflang conflicts in source code | 107 | Likely already fixed by `SeoDefaults.tsx` in earlier session — verify, mark fixed |
| 2 | Duplicate meta descriptions | 87 | Audit `src/data/*.ts` + page components, dedupe |
| 3 | Slow page load | 18 | Identify the 18 URLs, ship LCP/preload + lazy-load fixes |
| 4 | Invalid structured data | 7 | Validate via `scripts/validate-jsonld.mjs`, patch offenders |
| 5 | Incorrect sitemap entries | 2 | Cross-check `public/sitemap.xml` against routes, remove dead entries |
| 6 | Low text/HTML ratio (warning) | 80 | Deferred — symptom not cause; not blocking rankings |
| 7 | AI Search Health 95% | — | Already excellent, no action |

Semrush's snapshot is **June 26**; we shipped hreflang/meta-description fixes after that date, so items 1+2 may already test clean — I'll verify code before re-doing the work.

---

## Execution steps (today, this turn)

### Step 1 — Verify what's already fixed
- Read `src/components/SeoDefaults.tsx` → confirm self-referencing hreflang + canonical for every locale.
- Sample 5 article pages → confirm meta descriptions are unique.
- Run `node scripts/validate-jsonld.mjs` and `node scripts/check-canonicals.mjs` to get current state.

### Step 2 — Fix Semrush Error 1 (hreflang)
If conflicts remain: ensure every page emits `<link rel="alternate" hreflang="x-default">` + `en-gb` + `es` + `fr` + `de` + `pt`, all self-referencing the matching localized URL. Canonical must point to the same-language URL, not the EN homepage.

### Step 3 — Fix Semrush Error 2 (duplicate meta descriptions)
- Grep `src/pages` + `src/data/articles.ts` + `src/data/faqArticles.ts` for repeated description strings.
- For any duplicate, regenerate a unique 140–160-char description from the article's H1 + first paragraph.
- Common offender pattern: pillar/hub pages reusing a templated "Living With Arthritis UK is a free resource…" string — replace with page-specific copy.

### Step 4 — Fix Semrush Error 3 (slow page load — 18 URLs)
The PDF lists 18 specific URLs (extractable from pages 32–35 of the report). For each:
- Add `<link rel="preload" as="image">` for the LCP photo where applicable.
- Confirm `loading="lazy"` on below-fold imagery via existing `OptimizedImage`.
- Move any heavy synchronous JSON-LD building into `useEffect` (already the pattern per `mem://`).
- Audit lazy route imports — any page importing `framer-motion`/`recharts` at top level should rely on the existing shared chunks.

### Step 5 — Fix Semrush Error 4 (7 invalid JSON-LD items)
Run validator → likely culprits: `Article` schemas missing `author.url`, `MedicalWebPage` missing `lastReviewed`, `FAQPage` answers with empty strings. Patch the schema builders in `src/lib/jsonLd.ts` + `src/components/seo/PageSchema.tsx`.

### Step 6 — Fix Semrush Error 5 (2 sitemap errors)
- Run `node scripts/audit-sitemap.mjs` against the live site.
- The 2 "incorrect" entries are usually 404s or redirects to canonical paths — remove them from `public/sitemap.xml` and any localized sitemap.

### Step 7 — Mark Semrush + SEO-chat findings fixed
- Call `seo_chat--update_findings` for each addressed finding_id (read current list first).
- Append a `Phase 1.5 — Semrush Pass` section to `docs/SITE-AUDIT-2026.md` with before/after counts.

### Step 8 — Verify
- Re-run `validate-jsonld.mjs`, `check-canonicals.mjs`, `check-social-meta.mjs`, `audit-sitemap.mjs`.
- Build passes automatically; report results inline.

---

## What I will explicitly NOT do today

- **MD plan Phases 2–6**: Sentry release tagging, Redis caching, APM, GDPR audit, 208-article fact-check, PWA, E2E expansion, Lighthouse CI pipeline. These are real work, queued for subsequent turns one phase at a time.
- **Add a real rate limiter**: workspace policy `no-backend-rate-limiting` blocks ad-hoc Postgres limiters without explicit user sign-off. Already documented in `SITE-AUDIT-2026.md`.
- **Switch CDN / add Cloudflare WAF / move to a "better host"**: infra outside Lovable Cloud, needs your account + budget. The MD's "move to a better hosting service with more resources" copy-pasted from Semrush is misleading — the slow-load fix is image preload + LCP, not a host swap.
- **Add dark mode** (locked palette per memory).
- **Copyscape / Grammarly API content audits** (paid third-party, not wired).

---

## Feedback you asked for (preview — full version after execution)

The MD plan is **structurally sound but heavily inflated**. ~60% of it duplicates work already shipped (a11y on chrome, security headers, CSP, edge function validation, hreflang, meta descriptions, JSON-LD). ~25% needs paid infra or external services that aren't connected. The remaining ~15% — Sentry sourcemaps, Lighthouse CI in GitHub Actions, expanded E2E — is genuinely valuable and worth scheduling. Treat the MD as a checklist for confirming completeness, not as a backlog to execute end-to-end. The Semrush PDF is the higher-signal document.

---

**Approve and I'll execute Steps 1–8 in this turn.**
