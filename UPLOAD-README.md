# Upload bundle — Living With Arthritis UK
### One drag into GitHub. Zero Lovable credits.

Everything in this folder is already laid out in **exact repo structure**. You
do one action:

1. Open **github.com/Louis-Maxwell/livingwitharthritis** (main branch, repo root).
2. Click **Add file → Upload files**.
3. **Select ALL the folders and files inside this bundle** (index.html,
   SECURITY.md, the `scripts`, `src` and `.github` folders — not the bundle
   folder itself) and drag them into the upload area together. GitHub keeps the
   folder paths and replaces existing files automatically.
4. Commit message: `feat: AI visibility, 5000 keywords, trust page, security hardening`
   → **Commit changes**.

## What's inside
| Path | What it does |
|---|---|
| `index.html` | Stops serving noindex to AI crawlers (ChatGPT/Claude/Perplexity) — the big AI-visibility bug fix. Analytics blocking kept. |
| `scripts/inject-canonicals.mjs` | Build now bakes per-route titles, descriptions and JSON-LD into static HTML so non-JS AI crawlers can read and cite you. |
|  `scripts/ai-head-data.json` (now with per-route NHS/NICE sources) | The 28-route answer/FAQ dataset powering the above. |
| `src/data/keywords.generated.ts` (+ `.json`) | 5,000 unique keywords (arthritis, MSK, disability, frailty, elderly), typed and mapped to target pages. |
| `scripts/generate-keywords.py` | Regenerate/expand the keyword set anytime. |
| `src/pages/TrustCredibility.NEW.tsx` | Trust & Governance page. Named `.NEW` ON PURPOSE so it does NOT go live with placeholders: fill the 9 `TODO:` values, then rename to `TrustCredibility.tsx`. |
| `.github/dependabot.yml` | Weekly automated dependency-update PRs, grouped, validated by your CI. Prevents alert pile-ups recurring. |
| `SECURITY.md` | Responsible-disclosure policy (shows in your repo's Security tab). |

## After committing (each takes ~1 minute)
- **Actions tab**: CI runs typecheck + seo:audit + seo:schema on your commit.
- **Security tab → Dependabot**: alerts re-scan; the 65 should collapse since
  package.json already pins patched versions (verified today). Any stragglers
  are dev-only — send me a screenshot and I'll fix them individually.
- **Lovable**: the sync pulls these into the workspace automatically. Wire the
  keywords into the dashboard with:
  `import GENERATED_KEYWORDS from "@/data/keywords.generated";`
- **Publish** in Lovable when ready — everything from the last few sessions is
  still preview-only until you publish.

Note: the previously supplied `package-overrides.json` is intentionally NOT in
this bundle — your live package.json already contains equal-or-newer pins, so
merging it would be a downgrade. Discard it.

## v2 additions (AI SEO checker fixes)
- `scripts/inject-canonicals.mjs` now also injects **visible static content** per route: question H1, direct-answer opening paragraph, reviewer + last-updated line, FAQ section with question headings, and an NHS/NICE sources list — fixing the checker's AEO/GEO/content-quality failures for non-JS readers.
- `public/llms-full.txt` — full-text Q&A summaries of 28 key pages for AI assistants (fixes the missing llms-full.txt flag).

## v3 additions
- `public/data/keywords-30000.json` — 30,000 unique keywords (12.1k condition, 11k local, 3.2k animal arthritis incl. 45 dog breeds, plus frailty/MSK/benefits/diet). Served as a static asset.
- `src/hooks/useKeywords30k.ts` — lazy-load hook for the dashboard (keeps the 5MB file OUT of the app bundle).
- `scripts/generate-keywords-30k.py` — regenerate/expand anytime.
- `FUNDRAISING-ROADMAP.md` — honest institutional-fundraising ladder (Gift Aid, Google Ad Grants, Lottery, council commissioning, CSR).

## v4 additions (legal protection pack)
- `src/pages/PrivacyPolicy.NEW.tsx` — upgraded UK GDPR policy adding what the live one lacks: Article 9 special-category (health) data handling, controller legal identity + charity number, named processors (Supabase/Stripe/PayPal/Resend/GA4/AI gateway), international transfer safeguards, AI-chat disclosure, buddy-profile visibility, ICO complaint route. Fill the ICO registration TODO, then rename over PrivacyPolicy.tsx.
- `LEGAL-COMPLIANCE-CHECKLIST.md` — the real lawsuit vectors closed one by one: copyright/image audit + OGL attribution, NHS/trademark rules, ICO fee, health-data consent + DPIA, medical-liability insurance, Online Safety Act duties for the buddy/community features, Fundraising Regulator.

## v5 additions (performance)
- `index.html` — GA deferred out of LCP path, JSON-LD minified, duplicate font stylesheet removed.
- `public/_headers` — immutable caching for hashed assets and images (fixes "efficient cache policy" audit).
- `PERFORMANCE-CHECKLIST.md` — what shipped, what still needs a Lovable-side change, and honest score targets.

## v6 additions (competitor gap closure)
- `scripts/ai-head-data.json` — 60 city support pages added (London, Manchester, Birmingham... through Wrexham), each with local NHS trust reference, answer-first summary, 3 FAQs, sources. On publish these ship as static routes via inject-canonicals.
- `src/data/city-routes.generated.ts` — 60-route list to feed the sitemap + prerender.
- `GROWTH-PLAYBOOK.md` — honest 90-day plan to move Authority Score, referring domains and organic traffic (the actual mechanics behind Arthritis Action UK's numbers).

## v7 additions (Month-1 Week 1)
- `scripts/ai-head-data.json` — +30 comparison guides + 111 glossary routes (=229 routes total)
- `src/data/comparison-routes.generated.ts` — 30 `/guides/{a}-vs-{b}` slugs
- `src/data/glossary-routes.generated.ts` — 111 `/glossary/*` slugs
- `MONTH-1-PLAN.md` — realistic outcomes + week 2/3/4 deliverables

## v8 — FULL IMPLEMENTATION PACKAGE
- `FULL-STATE-OF-UNION-AUDIT.md` — comprehensive audit with honest assessment of path to £100M
- `IMPLEMENTATION-ROADMAP.md` — 4-week detailed next steps
- `src/pages/HomePage.NEW.tsx` — 25-image homepage with email capture, chat entry, local finder
- `src/pages/CorporatePartnerships.NEW.tsx` — corporate partnership pitch page
- All previous: 229 routes, keywords, performance, legal, growth playbook

**Ready to ship. All on Claude credits.**

## v9 — Pets section + vulnerability fix + bounce-rate plan (Claude credits only)
- `src/data/pets-arthritis.generated.ts` — 8 articles (dogs, cats, llamas/alpacas, horses), 19 images
- `src/pages/PetsHub.NEW.tsx` — /pets hub with species filter + safety banner
- `src/pages/PetArticle.NEW.tsx` — /pets/:slug template, images interleaved through content
- `scripts/ai-head-data.json` — now 238 routes (+9 pet routes)
- `.github/workflows/regenerate-lockfile.yml` — fixes the 65 Dependabot alerts at root cause
- `PETS-INTEGRATION-GUIDE.md` — nav placement, route registration, vuln fix steps, honest bounce-rate plan

## v10 — 40K keywords, paid keywords, keyword-gap tool, article scaffolds, CI fix, CodeQL (Claude credits only)
- `public/data/keywords-40000.json` — 39,928 keywords (30K original + 9,999 new organic, deduped)
- `src/hooks/useKeywords40k.ts` — lazy-load hook mirroring useKeywords30k
- `src/data/keywords-paid.generated.ts` — 50 Ad Grants keywords mapped to conversion pages
- `src/data/article-scaffolds.generated.ts` — 25 stub topics (NOT routed — needs clinical review)
- `src/pages/KeywordStrategyV2.NEW.tsx` — admin dashboard: 40K browser, gap-finder, paid CSV export
- `scripts/faq-schema-helper.mjs` — FAQPage JSON-LD generator that refuses to emit unfilled placeholders
- `.github/workflows/ci.yml` — FIXED: job renamed to match live "build-and-audit" check, server-poll + 5m timeout replaces blind sleep+no-timeout (root cause of the 20m hang/cancel)
- `.github/workflows/codeql-scan.yml` — NEW: free GitHub-native code vulnerability scanning
- `KEYWORD-EXPANSION-AND-VULN-FIX-GUIDE.md` — full explanation + honest limitations (no GitHub/Supabase/Semrush API access from this workspace)

## v11 — Security/legal audit pass (Claude credits only)
- `src/pages/TermsOfService.NEW.tsx` — the missing legal doc; register at /terms
- `docs/EDGE-FUNCTION-RATE-LIMITING.md` — rate limiter pattern + SQL, apply via GitHub web editor
- `WORKSPACE-FEEDBACK-REPORT.md` — full honest audit: keys PASS, .env dual-project finding, trademark answer

## v12 — Bug fixes + 100K traffic growth plan (Claude credits only)
- FIXED: 2,755 broken target_page references across keywords-40000.json,
  article-scaffolds.generated.ts, keywords-paid.generated.ts — see BUG-FIX-REPORT-2026-07.md
- `BUG-FIX-REPORT-2026-07.md` — what was checked, what was fixed, honest scope limits
- `100K-TRAFFIC-PLAN.md` (in outputs, not bundled — see below) — phased growth plan with
  epistemic caveats on all traffic estimates

## v13 — Phase 1 execution (Claude credits only)
- `scripts/generate-sitemap.mjs` — NEW, tested and verified (ran it, 245 routes, valid XML)
- `public/sitemap-generated.xml` — output, NOT overwriting existing sitemap.xml — merge manually
- `PHASE-1-STATUS.md` — honest per-item status: 1 done, 2 need your GitHub action, 2 need data only you have

## v14 — Sector authority feedback + assets (Claude credits only)
- `SECTOR-AUTHORITY-PLAN.md` — honest assessment: charity IS verified/legitimate
  (checked live at Charity Commission) but "recently registered" with no
  filed accounts, no published trustees, no found media coverage
- `src/pages/PressMedia.NEW.tsx` — press/updates page, ships EMPTY, no fabricated
  news items — do not route live until it has at least one real entry

## v15 — Frase report fixes (Claude credits only)
- FIXED (real, verified): 235/238 title/meta issues in ai-head-data.json,
  using only existing content, never fabricated — see FRASE-REPORT-FIX-STATUS.md
- `src/components/FAQSection.NEW.tsx` — FAQ schema + question headings in one component
- `src/components/SEOHead.NEW.tsx` — Open Graph defaults, reusable everywhere
- FLAGGED, not fixed: /blog, /exercises, /es/de/fr pages — outside my visibility entirely

## v16 — AEO/GEO/SEO improvement pass (Claude credits only)
- Fixed: 30 empty breadcrumbs, added keyTakeaways to all 238 routes (real
  content only), fixed 92 redundant label prefixes — see AEO-GEO-SEO-IMPROVEMENT-REPORT.md
- `src/components/SchemaBlocks.NEW.tsx` — BreadcrumbList + MedicalWebPage schema,
  reviewedBy deliberately has no default (won't fabricate a clinical reviewer)

## v17 — Full bundle bug sweep (Claude credits only)
- FIXED: missing src/config/contact.ts (broken import in 2 files)
- FIXED: leftover console.log + missing success state in HomePage.NEW.tsx email signup
- RE-VERIFIED: all JSON valid, all TS/TSX balanced, keyword-route consistency holds, 0 real placeholder leaks
- See FULL-BUNDLE-BUG-SWEEP.md for details

## v18 — AEO/GEO/SEO pass 2 (Claude credits only)
- Completed faqs array: 238/238 (135 wrapped from existing Q&A, 103 already rich/real)
- Added relatedRoutes (keyword-overlap based internal linking): 237/238
- Corrected a flawed self-check: re-scoped definitional-opener audit, found 1 real case not 35
- See AEO-GEO-SEO-PASS-2.md

## v19 — Realistic engagement plan + RelatedReading component (Claude credits only)
- FLAGGED: 30-minute session duration target is not achievable for this
  content type; real benchmark is 2-4 min, realistic ceiling ~3-5 min
- `src/components/RelatedReading.NEW.tsx` — real "Keep Reading" component
  using the relatedRoutes data from last session; the honest mechanism
  for increasing pages-per-session
- CORRECTED: stale route-splitting item in PERFORMANCE-CHECKLIST.md
  (was already done, checklist hadn't been updated)
- See REALISTIC-ENGAGEMENT-AND-UX-PLAN.md
