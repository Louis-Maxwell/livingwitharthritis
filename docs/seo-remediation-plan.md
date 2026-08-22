# Living With Arthritis SEO and Technical Remediation Plan

Status: implementation plan based on the repository and production audit on 22
August 2026. Hosting remediation is now implemented as a Cloudflare Worker and
awaits account authentication/domain cutover.

## Architecture and content sources

- Frontend: React 18, TypeScript, React Router and Tailwind CSS, built by Vite.
- Hosting: Cloudflare Worker with Static Assets, configured in `wrangler.jsonc`.
- Rendering: client-side SPA plus Puppeteer prerendering during the production build.
- Primary routes: declared in `src/App.tsx`; many condition, guide and exercise pages are React components.
- Blog CMS: published rows in the Supabase `public.blog_articles` table, queried by slug in `src/hooks/useBlogArticles.ts`.
- Generated content: daily tips, glossary entries, condition subpages, exercise matrices, comparisons, city pages and pet pages are generated from files under `src/data`.
- SEO: `SeoHead`, `SeoDefaults`, `CanonicalEnforcer`, page-specific Helmet blocks, JSON-LD components and post-build scripts.
- Discovery: `scripts/generate-sitemap.ts`, checked-in sitemap files and generated prerender route lists.
- Deployment and checks: Cloudflare Workers Builds, Vitest, Playwright,
  Lighthouse and repository SEO scripts.
- Integrations: Supabase, Sentry, GA4, Stripe, Resend, Shopify, PageSpeed and Lovable APIs. Secret values remain outside source control.

## Confirmed production defects

1. The named blog URLs return HTTP 200 with homepage fallback HTML to non-JavaScript clients. This includes:
   - `/blog/knee-arthritis-exercises-uk`
   - `/blog/knee-osteoarthritis-exercises`
   - `/blog/knee-exercises-arthritis`
   - `/blog/anti-inflammatory-diet`
   - `/blog/ginger-root-natural-anti-inflammatory`
   - `/blog/arthritis-pain-management`
2. A deliberately invalid URL also returns the same homepage HTML with HTTP 200. The custom React 404 cannot alter the HTTP status.
3. The homepage and fallback responses currently emit `/regions/northern-ireland` as their canonical URL.
4. The two legacy knee URLs use React `<Navigate>` only. They are not HTTP 301 redirects.
5. A local isolated prerender reproduced the canonical corruption. `/regions/northern-ireland` is in the curated prerender list but is not a valid regional hub. Its component navigates to `/`; the prerender plugin writes that redirected render over the root output.
6. Sitemap generation silently drops all database-backed blog routes when build-time Supabase environment variables are missing or a query fails. It then overwrites the checked-in blog slug snapshot with an empty list. This explains why deployment can omit static blog output.
7. The current prerender regression baseline permits up to 964 pages with generic homepage metadata, so CI can pass a broadly broken output.
8. Production has 254 published blog rows and unique visible titles, but 33 articles have no `meta_title`.
9. Nine published articles contain the obvious placeholder credential `PH123456`. Generic claims such as “Clinical Advisory Panel” also lack a verifiable person/profile relationship. These must not be presented as named medical review.
10. The dedicated knee destination exists as a substantial React page, and the two legacy slugs are already excluded from the generated sitemap. Its medical claims and reviewer attribution still require clinical verification before content expansion or redirection.
11. Lovable managed hosting currently applies a catch-all SPA 200 response. The repository has no supported server-status/redirect configuration that the live host demonstrably honours. A real 301/404 solution therefore requires a supported Lovable routing feature or a controlled move/proxy to infrastructure with edge redirects.

## SEO safety gates

- Preserve the supplied Search Console measurements as the pre-change baseline.
- Do not change the URLs of ranking condition or guide pages.
- Do not issue a knee-cluster redirect until the destination content, claims, canonical, internal links and rendered status have passed review.
- Do not delete database rows as part of consolidation. Retain source content and record the redirect decision.
- Do not fabricate clinicians, registrations, charity facts, evidence, statistics or legal/medical guidance.
- Treat a sitemap loss above 5% as a build failure; treat any unexplained URL loss as a release blocker.
- Treat any unexpected canonical change, indexable soft 404, redirect chain or redirect loop as a release blocker.
- Keep each implementation phase in a separate logical commit and make it independently reversible.
- Compare production and proposed outputs before deployment.

## Implementation phases

### Phase 1 — routing and content delivery

1. Remove invalid/redirecting paths from the prerender input so they cannot overwrite destination output.
2. Make sitemap/blog route generation fail-safe: preserve the last known canonical blog inventory when Supabase is unavailable and fail on unexplained mass loss.
3. Ensure priority blog routes produce route-specific static HTML rather than the homepage shell.
4. Add production-shape tests for the root canonical and required priority route outputs.
5. Improve missing-content handling in dynamic page families so they render the 404 component rather than navigating to the homepage.

Release gate: priority URLs render their intended H1, title and self-canonical in built HTML; root remains self-canonical; no route collision occurs.

### Phase 2 — HTTP status, canonical, sitemap, robots and redirects

1. Create one central, machine-readable redirect map with reason and evidence fields.
2. Implement real edge/server 301s only on hosting that supports them; test without following redirects.
3. Implement a server-level 404 response while preserving direct navigation to valid SPA routes.
4. Remove redirected/noindex/unknown URLs from sitemaps.
5. Make sitemap generation deterministic and split it only if every child sitemap is non-empty and validated.
6. Reduce redundant `robots.txt` declarations while retaining deliberate crawler policy.
7. Add redirect-chain, loop, canonical-target and HTTP-status tests.

Release gate: real HTTP 301s and 404s are observed in production-like hosting, not inferred from React navigation.

### Phase 3 — metadata, headings, breadcrumbs and structured data

1. Build a route inventory and audit actual rendered title, description, H1, canonical and robots values.
2. Replace the permissive generic metadata baseline with a zero-regression allowlist and then drive the allowlist to zero.
3. Standardise visible and structured breadcrumbs for indexable content.
4. Consolidate duplicate page schemas; emit only types supported by visible content.
5. Remove auto-generated/fallback FAQ schema that is not backed by genuine visible questions.
6. Connect WebPage/Article, Organization, Person and reviewer entities only where verified.

Release gate: priority pages have one title, one H1, one canonical and valid non-duplicated JSON-LD.

### Phase 4 — knee exercise consolidation

1. Preserve `/blog/knee-arthritis-exercises-uk` as the destination unless stronger authority evidence emerges.
2. Compare and merge useful source material without inventing medical claims.
3. Verify exercise instructions, numeric claims, contraindications, references and reviewer credentials clinically.
4. Update internal links to the destination.
5. Add two documented 301s:
   - `/blog/knee-osteoarthritis-exercises` → `/blog/knee-arthritis-exercises-uk`
   - `/blog/knee-exercises-arthritis` → `/blog/knee-arthritis-exercises-uk`
6. Keep legacy database records for audit/rollback while excluding them from navigation and discovery.

Release gate: destination is complete and reviewed; redirects are single-hop HTTP 301; old URLs are absent from sitemap and internal links.

### Phase 5 — protect and improve ranking opportunities

Work in descending risk-adjusted priority:

1. Protect `/conditions/osteoarthritis`, `/conditions/gout`, `/guides/hip-exercises-for-osteoarthritis`, `/guides/shoulder-pain-relief` and `/guides/paracetamol-vs-ibuprofen-for-arthritis`.
2. Improve the cycling, fall prevention, hand osteoarthritis, frailty and walking opportunities with metadata, verified references and relevant links before substantive rewriting.
3. Rebuild diet, pain, workplace, PMR, tai chi, surgery, glucosamine, medication, TENS, enthesitis, sarcopenia and mental-health resources only after editorial/clinical source review.

Release gate: no protected URL or primary intent changes without an explicit before/after record.

### Phase 6 — information architecture and internal links

- Establish clear Conditions, Exercises, Diet and Living with Arthritis parent hubs.
- Add 3–8 manually relevant contextual links per major page.
- Detect orphan pages, redirect links and broken links automatically.
- Avoid programmatic doorway pages and broad irrelevant link blocks.

### Phase 7 — author and reviewer trust architecture

- Separate editorial authorship from clinical review.
- Publish profile pages only for real people whose identity, role, qualification, registration and consent are verified.
- Remove placeholder credentials from production presentation.
- Add review dates and article relationships.
- Use explicit editorial-review placeholders where a verified reviewer is unavailable.

### Phase 8 — accessibility and performance

- Address duplicate skip targets, route focus, reduced motion, keyboard operation, labels, contrast and mobile tap/padding issues.
- Measure LCP, INP/TBT and CLS on representative templates before optimising.
- Optimise only measured bottlenecks: image dimensions/formats, hero priority, font loading, route JavaScript and consent-gated third parties.
- The Chrome DevTools MCP integration is not available in the current environment; use the repository Lighthouse workflow and Playwright/browser traces unless it becomes available.

### Phase 9 — regression crawl

Generate before/after exports of URL, status, title, description, H1, canonical, robots, schema types and internal links. Fail on:

- unexpected URL loss;
- any priority URL becoming non-200;
- unknown URLs returning an indexable homepage;
- canonical targets that redirect or 404;
- sitemap URLs that are redirected, non-canonical, noindex or non-200;
- redirect chains/loops;
- duplicate priority titles/H1s;
- malformed or unsupported JSON-LD.

### Phase 10 — reporting

Produce:

- `docs/seo/change-report.csv`
- `docs/seo/redirect-map.csv`
- `docs/seo/content-inventory.csv`
- `docs/seo/technical-test-report.md`
- `docs/seo/remaining-risks.md`

Each modified URL will record its old state, new state, action, evidence, target intent, redirect status and links added.

## Human approval required

- Clinical approval for medical instructions, contraindications, red flags, medication and supplement claims.
- Verification and consent for every named clinician and professional credential.
- Legal/editorial approval for workplace, Equality Act and benefits guidance.
- Hosting decision if Lovable cannot provide path-level HTTP 301 and genuine 404 handling.
- Search Console and backlink review before any additional URL consolidation beyond the two owner-approved knee URLs.
- Confirmation of official charity/contact details before schema or footer claims are changed.
