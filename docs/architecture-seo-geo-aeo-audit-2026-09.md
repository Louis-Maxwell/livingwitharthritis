# Living With Arthritis UK — Full-stack SEO/GEO/AEO architecture audit

Date: 12 September 2026  
Repository: `Louis-Maxwell/livingwitharthritis`  
Default branch audited: `main`

## Executive assessment

The codebase is materially more mature than a typical Vite/React content site. It already contains route-level SEO metadata, prerender/static-HTML safeguards, sitemap generation, AI/LLM discovery files, JSON-LD, Core Web Vitals telemetry, Sentry, security headers, image audits, Lighthouse CI, accessibility tooling, E2E tests and content-quality gates.

The dominant risk is therefore **not missing SEO tags**. It is maintaining a very large, SPA-based publishing system without allowing route catalogues, static HTML, metadata, redirects, sitemap membership, internal links and content inventories to drift apart.

The highest-value strategy is to make the existing safeguards authoritative and CI-enforced, while reducing the amount of duplicate route/content logic and increasing health-content editorial governance.

## Current architecture observed

- React 18 + TypeScript + Vite + Tailwind.
- React Router with extensive lazy-loaded route modules.
- React Helmet Async for route metadata.
- Optional Puppeteer prerendering for production-like crawler HTML.
- A post-build static HTML/canonical injection pipeline used by the normal publish build.
- Supabase integration, React Query, Sentry and consent-gated analytics.
- Generated sitemap, route/head-data, blog, condition and library inventories.
- Dedicated SEO/AEO scripts and tests, including canonical, headings, metadata, image, JSON-LD, redirect and AI-identity checks.
- Security automation: CodeQL, Gitleaks, Dependabot and security headers.
- Lighthouse CI with mobile and desktop budgets.

## Critical findings

### P0 — publishing/crawl integrity

The repository has previously experienced Google Search Console soft-404/indexing-rejection problems caused by SPA fallback HTML, thin library/condition pages and route/catalogue drift. The merged September 2026 work substantially addresses these issues by generating static article/head data and improving first-response HTML.

**Required operating rule:** every indexable URL must have, in the first response, a unique title, H1, canonical, indexable robots directive and meaningful route-specific content. A route should never ship the homepage shell merely because React failed to hydrate or a content lookup failed.

### P0 — single source of truth for published content

The recent blog audit identified historical splits between the 505-post catalogue and older 238/267-post surfaces. The repository now moves toward one published list, but this must remain a hard invariant.

**Acceptance rule:** one generated published-post inventory should feed sitemap generation, search, footer/home previews, related content, prerender routes, word counts, social sharing and smoke tests.

### P1 — health-content accuracy and E-E-A-T

The site is a health information resource and therefore requires a stricter editorial model than ordinary affiliate/content SEO. Every medical claim should have an owner, clinical reviewer, last-reviewed date and source trail. Avoid implying diagnosis, guaranteed outcomes or treatment superiority without appropriate evidence.

Recommended content metadata:

- author
- clinical reviewer
- professional role/registration where appropriate
- published date
- last medically reviewed date
- next review due date
- source list
- evidence level / claim class
- jurisdiction (UK-wide, England, Scotland, Wales, Northern Ireland)
- emergency/escalation guidance where relevant

### P1 — performance budget coverage

Lighthouse CI exists and already audits mobile/desktop, LCP, CLS, TBT and resource budgets. Its route set is intentionally small. That is useful for speed, but insufficient for a site whose largest traffic surface is condition, guide, blog and conversion content.

The performance suite should cover representative templates, not every URL:

1. homepage
2. condition hub
3. condition subpage
4. pillar guide
5. blog listing
6. blog article
7. library topic
8. FAQ article
9. donation page
10. community/support page
11. interactive tool

### P1 — CSP/security hardening

HTTP security headers are present and materially useful. The CSP still permits `unsafe-inline` and `unsafe-eval`, plus several broad third-party host patterns. These should be reduced incrementally rather than removed blindly, because analytics, payment and hosted integrations depend on some of them.

Target state:

- nonce/hash-based scripts where feasible
- eliminate `unsafe-eval` if dependencies permit
- narrow wildcard third-party domains
- maintain `frame-ancestors 'none'`
- keep HSTS and nosniff
- review Permissions-Policy against actual browser APIs used
- add automated CSP/header regression tests

## SEO architecture

### Metadata

The central `SeoHead` component is a good foundation. Continue enforcing title/description length and uniqueness, but treat those as quality signals rather than hard ranking formulas. Avoid generating keyword-stuffed titles or descriptions.

### Canonicals

Canonical injection is essential while the application remains SPA-first. Canonical generation should remain deterministic from the route manifest and should never depend on client-side data fetching.

### Sitemap

Sitemap generation should include only canonical, indexable, HTTP-200 URLs with substantial unique content. Redirect sources, thin doorway pages, admin/auth pages and duplicate variants must remain excluded.

### Structured data

Use JSON-LD where it accurately represents visible content. Priority types:

- Organization / NGO for the charity identity
- MedicalWebPage for substantial health information pages
- Article for editorial content
- BreadcrumbList for hierarchical pages
- Person for genuine author profiles
- FAQPage only where the same FAQs are visibly present
- Review only for genuine, attributable reviews that meet Google's policies

Do **not** add schema simply to increase markup volume. Unsupported or invisible claims can reduce trust and create eligibility issues.

## GEO / AEO architecture

The repository already exposes `llms.txt`, `ai.txt`, AI identity/citation pages and answer-oriented content. The next stage is not more crawler files; it is **citation-quality source content**.

Every major hub should have this machine-readable semantic pattern:

1. one-sentence definition
2. direct answer to the primary question
3. key takeaways
4. who the information is for
5. evidence/review metadata
6. practical next steps
7. red flags / escalation
8. related authoritative pages
9. sources
10. last-reviewed date

For AI systems, entity consistency matters. Keep the charity name, legal identity, registration number, domain, author identity, medical-review identity and UK scope identical across page copy, JSON-LD, `about` pages, `humans.txt`, `llms.txt` and social profiles.

## Accessibility

The project already has skip navigation, route focus management, an accessibility page/tooling and automated testing. The next audit should concentrate on real rendered templates:

- keyboard-only completion of every interactive flow
- visible focus states
- focus trapping/restoration in dialogs
- form error association via `aria-describedby`
- accessible names for icon-only buttons
- reduced-motion support
- 200%/400% zoom
- text reflow without horizontal scrolling
- contrast in disabled/error/success states
- charts and exercise illustrations with non-visual equivalents
- dynamic announcements for async results

Do not rely on ARIA where native HTML semantics are sufficient.

## Conversion architecture

Primary conversion paths should be treated as separate funnels:

### Help funnel
Search → direct answer → related guide → self-help/tool → support/contact.

### Donation funnel
Story/problem → trust evidence → impact → amount selection → payment → thank-you → retention.

### Community funnel
Problem/condition → useful guide → community explanation → moderated participation.

### Volunteer funnel
Mission → specific roles → eligibility/time → low-friction application.

Each funnel should have one dominant CTA per page and secondary CTAs that remain contextually relevant. Avoid competing donation, chat, quiz and newsletter prompts above the fold on informational pages.

## Content gap strategy

Priority clusters:

1. Arthritis — broad pillar and terminology hub.
2. Osteoarthritis — symptoms, diagnosis, exercise, pain, weight, surgery and self-management.
3. Rheumatoid arthritis — early symptoms, flare management, medicines, fatigue and work.
4. Psoriatic arthritis — symptoms, skin/nail links, treatment and exercise.
5. Arthritis pain — practical relief, flare-ups, sleep and pacing.
6. Arthritis exercise — joint-specific exercise, strength, walking, swimming and safety.
7. Arthritis diet — Mediterranean pattern, weight, protein, supplements and evidence quality.
8. Vitamin D and arthritis — deficiency vs treatment claims, testing, supplements and evidence.
9. Joint health — prevention, mobility, strength, falls and ageing.
10. Self-management — diagnosis, flare plan, symptom tracking, appointments and work.

Content should be mapped to search intent, not just keywords. Each cluster needs one authoritative hub plus supporting pages with distinct intent. Do not create city × condition doorway pages solely for geographic keyword coverage.

## 12-month roadmap

### Q1 — technical trust
- Lock route/content single-source invariants.
- Expand Lighthouse template coverage.
- Add static-HTML crawl tests to CI.
- Complete WCAG 2.2 AA template audit.
- Harden CSP.
- Establish medical editorial review workflow.

### Q2 — authority hubs
- Upgrade arthritis, OA, RA and PsA pillars.
- Build exercise, diet, pain and self-management clusters.
- Add strong author/reviewer/source modules.
- Improve internal-link graph and breadcrumbs.

### Q3 — evidence and experience
- Research summaries with transparent methodology.
- Clinician interviews.
- Patient/lived-experience stories with consent and editorial safeguards.
- Exercise programmes with accessibility alternatives.
- UK pathway explainers by nation where rules genuinely differ.

### Q4 — scale and conversion
- Refresh declining pages from Search Console data.
- Consolidate cannibalising pages.
- Improve donation/newsletter/volunteer funnels.
- Build digital PR and authoritative UK backlinks.
- Measure AI citations and referral traffic separately from traditional search.

## Prioritised implementation matrix

| Priority | Work | Impact | Effort |
|---|---|---:|---:|
| P0 | Single published-content inventory invariant | Very high | Medium |
| P0 | First-response static HTML gate for every indexable template | Very high | Medium |
| P0 | Remove thin/duplicate/doorway URLs from sitemap | Very high | Low |
| P0 | Clinical review/source metadata model | Very high | Medium |
| P1 | Lighthouse representative-template expansion | High | Low |
| P1 | WCAG template-level regression suite | High | Medium |
| P1 | CSP tightening and header regression tests | High | Medium |
| P1 | Internal-link graph rules | High | Medium |
| P1 | Conversion funnel instrumentation | High | Medium |
| P2 | WebP/AVIF source generation and responsive image policy | Medium-high | Medium |
| P2 | Automated content cannibalisation detection | Medium-high | Medium |
| P2 | AI citation monitoring dashboard | Medium | High |
| P3 | Advanced prefetch/prerender tuning | Medium | Medium |
| P3 | Fine-grained design-system cleanup | Medium | High |

## Technical debt

- Very large route/component surface area increases regression probability.
- Generated files and source files can drift unless generation is mandatory in CI.
- SPA + static fallback + optional prerender creates three rendering states that must remain equivalent.
- Large dependency graph should be periodically reviewed with bundle analysis; avoid manually assigning shared chunks that cause universal preloads.
- Admin and public routes share one application shell; keep admin code and data fetching isolated from public critical paths.
- Third-party integrations should be loaded only on routes that need them and only after consent where analytics applies.

## Definition of done

A release is SEO-safe only when:

- build passes
- lint/typecheck passes
- unit/integration/E2E tests pass
- all indexable routes have unique first-response metadata and content
- no indexable route resolves to the homepage shell
- sitemap contains only canonical indexable URLs
- JSON-LD validates and represents visible content
- accessibility checks pass for representative templates
- mobile Lighthouse budgets pass
- desktop Lighthouse budgets pass
- security/header checks pass
- published content inventory is internally consistent
- redirect sources never appear in sitemap

## Important limitation

A repository audit can identify and implement technical controls, but it cannot guarantee Lighthouse 95+/SEO 100, Google rankings, AI citations or traffic growth without measuring the deployed site with real-user data, Search Console, analytics and production response headers. Those outcomes should be treated as targets with ongoing measurement rather than as code-level guarantees.
