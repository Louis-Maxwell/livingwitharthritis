# Enterprise SEO implementation and audit — 11 October 2026

Website: https://livingwitharthritis.org.uk. Focus: existing-page improvements within 30–90 days. This report distinguishes repository implementation, live HTTP evidence, historical exports and actions requiring account or hosting access. Rankings, indexing, AI citations and a Lighthouse score are not guaranteed by implementation.

## 1. Complete SEO audit and priorities

| Priority | Finding | Action and acceptance test | Status |
|---|---|---|---|
| CRITICAL | Unknown live URLs return HTTP 200 with homepage metadata | Hosting must serve the generated 404 document with HTTP 404/410; retest several unknown paths without JavaScript | Hosting action outstanding |
| HIGH | Both www variants redirect with HTTP 302 | Configure host/domain permanent 301/308 redirects preserving path and query; verify one-hop destination | Hosting action outstanding |
| HIGH | Library entries without explicit review records were treated as reviewed | Require explicit reviewed status and a recorded date; otherwise show pending and no completed-review date | Implemented in this change |
| HIGH | Analytics page locations and outbound URLs could contain sensitive parameters | Strip query, fragment and embedded credentials; redact email-shaped paths from custom URL fields | Implemented; GA4 automatic measurement still needs property audit |
| HIGH | Current GSC and GA4 property reports unavailable | Restore authenticated access and complete the account checklist below | Blocked by account access |
| HIGH | Many medical articles lack recorded review status | Clinician reviews the supplied 568-row queue, records reviewer identity/date and verifies claims against primary evidence | Editorial work outstanding |
| HIGH | Actual mobile CWV and conversion funnel not measured in this session | Obtain GSC/CrUX field data and Lighthouse plus device QA; prioritize worst landing-page groups | Measurement outstanding |
| MEDIUM | Missing vitals were interpreted as passing | Require all LCP/CLS/INP measurements before all-good; prevent duplicate listener registration | Implemented |
| MEDIUM | Custom engagement event could imply native GA4 engagement | Emit active_time_ms as a separate custom metric and normalize scroll percent_scrolled | Implemented; register metric in GA4 |
| MEDIUM | Untested exercise deep links depend on React routing | Verify the seven flagged route groups in a real browser and validate static fallback where discovery matters | Outstanding; not confirmed broken links |
| MEDIUM | Keyword and authority plans already exist but need performance prioritization | Map impression-rich URLs to the existing keyword and internal-link map; improve these before new articles | Plans reused, not duplicated |
| LOW | Optional schemas/sitemaps without eligible content | Add only when real reviews, procedures, video assets or news publishing justify them | Conditional |

Evidence: the built-site audit checked 1,048 sitemap pages and found no missing/duplicate titles, missing descriptions, canonical mismatches, unexpected noindex or JSON-LD parsing errors under its implemented checks. This is not a Rich Results eligibility or medical-accuracy certification. Seven pages have unresolved links to dynamic exercise routes; router definitions exist, so these need browser verification rather than automatic deletion.

The live foundations audit passed HTTPS/HSTS, naked HTTP permanent redirect, sitemap availability (1,048 URLs), robots sitemap discovery and absence of HTTP assets in homepage HTML. It failed permanent www redirects and the unknown-page status test. See the attached JSON evidence. The completed live crawl checked all 1,048 sitemap URLs: zero failures under its response status, exact canonical, one-H1 and noindex checks; 529 pages exposed the related-reading module in response HTML. This is not browser rendering or Google index coverage.

## 2. Search Console audit

The Google Search Console entry point opened to the public signed-out page. No current property inspection, exclusion reasons, crawl stats, rich-result reports, sitemap submissions or URL Inspection actions were accessible. A sitemap URL returning 200 does not establish that its pages are indexed.

Account checklist, in this order:

1. Confirm the canonical domain property and ownership. DNS verification can be valid without an HTML verification meta tag; the diagnostic now reports unknown instead of falsely failing verification.
2. Submit `/sitemap.xml`; submit the generated image sitemap where appropriate. Check fetched status and discovered URLs, not just submission success.
3. Export Page indexing by reason and examples. Separate intentional exclusions (redirects, duplicate aliases, utility pages) from important canonical URLs excluded by noindex, robots, soft 404, server errors or canonical disagreement.
4. Inspect representative homepage, condition, library, blog, city and exercise URLs. Compare user-declared and Google-selected canonical, HTML and rendering. Request indexing after fixing important URLs; do not bulk-request every URL repeatedly.
5. Review manual actions, security issues, HTTPS and CWV reports. Export 28/90-day page-query performance and country/device segments; prioritize high impressions, positions 4–20 and weak CTR.
6. Recheck server 404 and permanent redirects after hosting release. Compare indexing and clicks weekly; indexing is controlled by search engines.

The repository contains a dated September 2026 Search Console export under `docs/exports/year0-2026-09-15/`. It covers 5–11 September 2026 and is historical evidence, not current account status. `historical-gsc-quick-wins.csv` identifies eight pages with at least 20 impressions and average position 4–20 in that export; recheck current performance before editing. No separate current mobile-usability or coverage claim has been made.

Sitemap policy: existing canonical sitemap and image sitemap generators are retained. No artificial video or news sitemap is created without eligible video assets or a qualifying news workflow. The router includes localized home and osteoarthritis routes. Validate their translation completeness and reciprocal hreflang/canonical sets before expanding them; do not label an English fallback as translated content.

## 3. GA4 audit and conversion optimization

GA4 navigation reached a Google sign-in gateway error. The property could not be opened; enhanced measurement, key-event flags, custom reports, retention and attribution settings were not changed. The code measurement ID is `G-ZLLSD3PXZ9`; its ownership and live collection require account verification.

Code changes sanitize custom page_location/page_referrer and outbound link_url, preserve consent gating, normalize scroll depth, avoid duplicate vitals listeners and distinguish active time from native GA4 engagement. Consent not yet answered now reports pending. Missing vitals no longer imply a healthy score.

Trade-off: stripping URL queries also removes campaign query values from these custom URL fields. Add only approved campaign values through a privacy-reviewed allowlist if campaign attribution requires them; never reinstate arbitrary query capture. Enhanced Measurement can independently collect URLs/search terms/form data and must be audited in GA4. This change does not establish that every analytics payload is free of personal data.

Configure after access is restored:

- Review Enhanced Measurement, especially site search and forms on a health website. Disable sensitive search/form collection and enable property email/query redaction. Do not send symptom text, diagnoses, names, email addresses or message contents.
- Check DebugView and Realtime with accepted, refused and unanswered consent; validate one page_view per route navigation and sanitized payloads. Configure cross-domain donations only for verified payment domains and remove referral contamination.
- Mark verified donation success, completed volunteering registration and confirmed newsletter signup as key events where those flows exist. Clicks and form starts are diagnostic events, not successful conversions. Deduplicate transaction IDs and record currency/value only on confirmed transactions.
- Register appropriate custom dimensions/metrics for percent_scrolled, active_time_ms, page template and web-vital name/value. Verify units, including CLS scaling. Native GA4 bounce rate remains derived from engaged sessions; custom events do not redefine it.
- Build the six supplied report definitions in `ga4-report-definitions.json`: organic traffic, blog performance, user journey, landing pages, donation funnel and device/vitals. Definitions are deliverables, not reports already created in the account.

Historical acquisition export (18 August–14 September 2026): Organic Search had 59 sessions, 47 engaged sessions (79.66%), average engagement 68.15 seconds and 89 recorded key events; revenue was zero. Organic Social had 768 sessions and 15.89% engagement. Key-event counts exceed sessions in some channels, so audit event definitions before treating these as successful conversions. This export cannot identify present high-bounce URLs, exit pages or funnel drop-offs; landing-page and event-level exports are required.

## 4. AI visibility audit

Existing `llms.txt`, expanded AI discovery content, `humans.txt`, crawlable article HTML, answer sections, citations, author references and organization identity are retained. These are discovery and clarity measures; they do not guarantee citation by ChatGPT, Copilot, Gemini, Claude or Perplexity.

Google's official AI guidance says there are no special AI schema requirements or extra machine-readable files needed for inclusion. Prioritize crawlable original evidence, clear summaries, truthful authorship, visible supporting references, conventional indexing and useful internal links. Measure actual cited landing URLs/referrals where available; a chat response mentioning a brand is not proof of index coverage.

Before release, compare robots rules with the organization's crawler policy and keep search discovery distinct from training policy. Do not blindly unblock every bot. Verify live IndexNow key-file ownership and inspect submission receipts when the existing opt-in postbuild script runs; IndexNow helps participating engines discover changes and does not submit pages to Google or guarantee AI visibility.

## 5. Technical SEO and structured data audit

Existing canonical tags, Open Graph, Twitter/X cards, article/medical-page/organization/breadcrumb data and static route generation are preserved. The all-page built audit validates implemented metadata rules and JSON parsing. Validate representative pages using Google's Rich Results Test and Schema.org validator after deployment; not every Schema.org type creates a Google rich result.

Use Article with truthful author, date and references, BreadcrumbList matching visible navigation, and MedicalWebPage on relevant medical information. Use MedicalOrganization only for a real qualifying medical organization, and Physician only for an actual physician; a physiotherapist credential is not a physician credential. Do not invent reviewers, medical approval, address, opening hours or testimonials.

FAQ markup should match visible original Q&A. Google's current documentation changelog says FAQ rich results stopped appearing on 7 May 2026 and the documentation was removed in June. Therefore no Google FAQ rich-snippet uplift is promised; useful Q&A remains worthwhile for readers and other consumers. HowTo markup is conditional on a real visible procedure and should not be presented as an available Google HowTo rich result. Add Review/AggregateRating only to eligible reviewed entities with genuine published reviews; do not fabricate organization stars or use self-serving testimonials to imply rich-result eligibility.

The existing generated 404 document and redirect rules cannot override a hosting platform that ignores them. Fixing that requires the host configuration or release pipeline. No server-level fix is claimed from client JavaScript.

## 6. Content gap analysis and keyword map

Reuse `../growth-2026-10-11/keyword-map.csv`: 1,480 keyword candidates mapped against 1,048 canonical inventory URLs and 568 articles. These are inventory-derived candidates, not validated search volumes, difficulty scores or competitor rankings. Existing deliverables include 20 pillar briefs, 100 blog ideas and 50 FAQ briefs. Keyword coverage artifacts are also under `../keyword-implementation-2026-10-11/`.

For the first 30 days, select existing condition/service pages and supporting posts using current GSC impressions. Improve titles where intent/CTR is weak, add concise answer-first introductions, remove unsupported statements and update references. Merge or redirect genuinely redundant pages only after comparing purpose, traffic and links. Do not create hundreds of thin variants from the candidate list.

E-E-A-T metadata inventory: 568 posts; 448 have no explicit review-status field, 99 are pending and 21 are marked reviewed. 366 have nonempty references/citations metadata. These counts do not verify clinical accuracy, reviewer qualifications or citation quality. The supplied `clinical-review-queue.csv` lists every post for editorial triage. Prioritize treatment, medication, urgent symptoms, exercises with contraindications and prominent high-traffic landing pages.

Library review state now defaults to pending unless an explicit reviewed record with a date exists. Broad homepage clinical-review claims were replaced with evidence-informed/physiotherapy-informed wording. Verify individual article reviewer claims against actual completed reviews; publish identifiable author/reviewer profiles and credentials only with evidence. About/Contact should clearly identify the charity, governance, editorial process and available contact routes.

## 7. Internal linking report

Existing condition-specific related-reading modules and static article links are retained. Reuse `../growth-2026-10-11/internal-link-map.csv` for supporting-post → pillar and pillar → related-post suggestions. Do not duplicate links mechanically across every page. On each selected article, add a useful contextual link to its nearest condition or service pillar and a small number of complementary resources. A commercial service link is relevant only where that service actually exists.

Anchor examples: “osteoarthritis exercises”, “rheumatoid arthritis flare guidance”, “arthritis pain relief guide”, “PIP evidence for arthritis” and “local arthritis support”. Match the target's intent and avoid repeated exact-match anchors or “click here”. Keep important hubs reachable through primary navigation and breadcrumbs; verify orphan status with a rendered crawl and inbound-link counts, not a sitemap-only audit. Static and React exercise routes need a separate deep-link rendering check.

Local SEO: existing city pages need distinct useful local resources, valid links and a truthful service area. Do not manufacture offices, medical practices, addresses or local reviews. Create/optimize a Google Business Profile only if the organization meets eligibility criteria; geographic keyword pages alone do not establish a physical location.

## 8. Backlink strategy and outreach

Reuse `../growth-2026-10-11/100-backlink-prospects.csv` and `OUTREACH.md`: 100 distinct prospect domains with organization relevance and templates. These are research prospects, not verified available placements, contacts, accepted guest posts or links secured. No outreach messages were sent.

Prioritize relevant medical/arthritis charities, universities and research bodies, physiotherapy resources, patient support directories and healthcare publications. Offer a useful free resource, an evidence-checked expert contribution or an original transparent survey with appropriate methodology. Verify each recipient and submission policy before outreach. Avoid paid ranking links, mass unsolicited emails, reciprocal link schemes and fabricated expert endorsements. Track prospect, actual resource URL, verified contact, relevance, submission policy, response and earned link separately.

## 9. Core Web Vitals and performance report

No new measured Lighthouse score, CrUX percentile or mobile viewport screenshot was obtained. Chromium downloads failed through the environment's network gateway, so 320/375/768/1024/1440px browser tests and local Lighthouse could not run. Search Console field-data access was also unavailable. Passing unit/build checks is not a 95+ performance/accessibility score or SEO 100.

The concurrently merged accessibility/mobile change adds static landmarks and reduces mobile image-priority contention; this work preserves it. Existing image sizing/lazy loading/build optimizations should be measured before further code changes. Verify LCP at the 75th percentile ≤2.5s, CLS ≤0.1 and INP ≤200ms using field data, then compare reproducible mobile lab runs. Diagnose worst templates before globally removing scripts/fonts. Record FCP/Speed Index as lab diagnostics, not Core Web Vitals.

Mobile QA release checklist: test the five requested widths, keyboard focus/skip links, touch targets, navigation and donation/forms; inspect overflow, font scaling, image dimensions, font swaps and layout shifts. Verify CDN cache/compression headers on HTML and hashed assets from the actual host. Use responsive image variants and descriptive alt text for meaningful images; leave decorative images empty-alt. Do not rename all existing image URLs without redirecting or updating consumers.

## 10. 30–90 day implementation and measurement plan

| Window | Work | Measure |
|---|---|---|
| Days 0–7 | Merge/deploy this change; repair host 404/www rules; restore account access; validate GA4 privacy and real key events | HTTP evidence, GSC sitemap fetch, DebugView payloads and consent cases |
| Days 8–30 | Triage exclusions and inspect representative URLs; update 10–20 existing impression-rich pages; contextual links and truthful reviewer attribution | Indexed canonical trend, impressions/CTR/clicks, working conversion funnel, reviewed pages |
| Days 31–60 | Resolve worst mobile CWV templates; strengthen pillar/supporting links; complete highest-risk clinical reviews; begin verified relevant outreach | 75th-percentile CWV, organic engaged sessions/key events, earned relevant links |
| Days 61–90 | Compare against dated baseline; consolidate proven overlap; expand only demonstrated gaps with clinically reviewed material | Organic growth by URL/device, conversion rate and review/indexing coverage |

Keep changes small, compare like-for-like periods and annotate releases. Seasonal demand and search updates affect results; do not attribute every traffic change to a single deployment.

## Verification and evidence

Production build passed; 1,048 built sitemap pages passed implemented metadata/JSON-LD checks. Full Vitest run passed 666 tests in 106 files before incorporating the separately merged accessibility change. Targeted analytics/review tests, TypeScript and targeted ESLint passed. After incorporating that change, the production build, both TypeScript projects and 42 targeted tests passed; the built metadata audit again passed all 1,048 sitemap pages. Live crawl summaries are supplied alongside this report. Browser viewport/Lighthouse and authenticated GSC/GA4 validation remain outstanding.

Sources and official guidance:

- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- https://developers.google.com/search/updates
- https://support.google.com/analytics/answer/6366371
- https://support.google.com/analytics/answer/13544947
- https://www.indexnow.org/documentation

This report is an implementation record and prioritized audit, not a claim that every account setting, page's clinical accuracy, server configuration, ranking or vulnerability has been resolved.
