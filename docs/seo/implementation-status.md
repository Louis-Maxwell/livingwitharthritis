# SEO implementation status — 6 October 2026

The audit and implementation cover all 45 workstreams. This branch is reviewable code, not a deployed website, completed clinical review or a claim of achieved ranking gains.

## Implemented repository changes

- Segmented sitemap retains all 1,004 canonical URLs with truthful dates and private-route exclusions.
- Full initial HTML for ten guides; readable fallback articles; consistent metadata; archive indexing correction; one H1 and one canonical per audited public URL.
- Exact snippet overrides for ten priority URLs, ten intent-owned pillar links, and generated public-page directory.
- Consent-gated, URL-sanitised analytics; no health queries/contact details; confirmed-outcome semantics; no purchases inferred from donation return URLs.
- GoFundMe handoff accurately distinguishes a click from a verified payment. Newsletter/mailto requests accurately distinguish a request from a confirmed subscription.
- Form labels/IDs, video controls/reduced motion, video milestones and scoped scroll engagement.
- PIP reliability/fluctuation wording corrected in the main guide, evidence diary and priority article. Changed priority article is explicitly pending review.
- Build/CI indexing and graph guards, schema validation, regression tests and local mobile/desktop accessibility audit.
- Complete 50-brief, 20-FAQ, ten-pillar, 100-keyword production backlog with source/review/overlap acceptance requirements.

## Validation evidence

- Unit suite: 102 files, 577 tests passed; TypeScript and lint passed.
- Production build and built internal-link audit passed.
- Built inventory: 1,004 URLs, zero indexing/metadata/H1 errors, zero graph orphan/unreachable candidates. Graph coverage does not prove Google has indexed each URL.
- 238 pages fall below a heuristic 120-word threshold; these are review candidates, not confirmed soft 404s. See built-audit.generated.json.
- Chromium/axe: seven routes at mobile and desktop widths, no serious/critical violations or page errors. Automated results do not replace manual accessibility review.
- Structured data is validated by scripts/validate-jsonld.mjs; see release validation logs before deployment.

## Account and business dependencies

1. Merge/deploy through the existing protected workflow; then verify live headers, redirects, canonical/body parity, sitemap responses and Search Console inspection before requesting validation.
2. Export the complete 426 discovered, 93 crawled and two duplicate-canonical URL lists; join against this inventory. Historical GSC totals are not a list of current sitemap faults.
3. Welfare and clinical reviewers must approve changed guidance and high-visibility medication/supplement pages. Do not mass-publish the brief backlog or invent reviewer credentials.
4. Choose/provide a real newsletter provider and confirmation API. Current FormSubmit/mailto is not a confirmed subscription service. Contact acceptance and provider integration need backend access.
5. Donation income must be reconciled with verified GoFundMe reporting; browser handoffs cannot verify a completed donation.
6. GA4 account changes prepared: remove key-event status from donation_click, begin_checkout and chat_start; retain newsletter_signup/generate_lead/purchase only for genuine confirmed outcomes. Verify GSC link and create private-data-free reports after account-specific confirmation.
7. Live mobile Lighthouse/interaction profiling and sufficient field samples are needed before claiming Core Web Vitals improvement. No-data status remains unknown.
8. Original videos/tools, member interviews, verified impact claims, genuine reviewer profiles, UK keyword volumes, partner references and monthly AI monitoring require the named owners and continuing delivery.

## Ranked workstreams

Impact / ease use relative 1–5 scores; they are not promised traffic uplift.

| ID | Recommendation | Delivery status | Impact / ease | Priority | Owner |
| --- | --- | --- | --- | --- | --- |
| R01 | Fix soft-404 template/content/status causes | Partially prepared; external data, review, production or ongoing measurement required | 5 / 3 | High | Dev + SEO |
| R07 | Correct PIP and benefit guidance | Partially prepared; external data, review, production or ongoing measurement required | 5 / 4 | High | Welfare reviewer + content |
| R08 | Repair false/duplicate outcome events | Code changes ready; live verification pending | 4 / 4 | High | GA4 + dev |
| R09 | Improve top observed low-CTR snippets | Code changes ready; live verification pending | 5 / 4 | High | SEO + content |
| R10 | Deploy tested segmented sitemap PR | Partially prepared; external data, review, production or ongoing measurement required | 3 / 5 | High | Dev + SEO |
| R11 | Strengthen contextual links to priority pages | Code changes ready; live verification pending | 5 / 4 | High | SEO + content |
| R02 | Triage 426 discovered-not-indexed URLs | Partially prepared; external data, review, production or ongoing measurement required | 5 / 3 | High | SEO + dev |
| R03 | Review 93 crawled-not-indexed URLs | Partially prepared; external data, review, production or ongoing measurement required | 5 / 3 | High | SEO + content |
| R12 | Clinical/pharmacy evidence review | Partially prepared; external data, review, production or ongoing measurement required | 5 / 3 | High | Clinical reviewers |
| R04 | Clean redirect/404 sources and chains | Partially prepared; external data, review, production or ongoing measurement required | 4 / 4 | High | Dev + SEO |
| R05 | Resolve two duplicate canonical issues | Partially prepared; external data, review, production or ongoing measurement required | 4 / 4 | High | SEO + dev |
| R13 | Improve query-matched answers/FAQs | Partially prepared; external data, review, production or ongoing measurement required | 4 / 4 | High | Content + reviewers |
| R14 | Enforce served/rendered metadata/body parity | Code changes ready; live verification pending | 5 / 2 | High | Dev |
| R15 | Implement confirmed newsletter endpoint | Partially prepared; external data, review, production or ongoing measurement required | 4 / 3 | High | Dev + CRM + GA4 |
| R16 | Confirm contact-success tracking | Code changes ready; live verification pending | 3 / 4 | High | Dev + GA4 |
| R17 | Audit crawler/host/noindex controls | Partially prepared; external data, review, production or ongoing measurement required | 4 / 4 | High | Dev + SEO |
| R18 | Establish mobile lab/CWV baseline | Partially prepared; external data, review, production or ongoing measurement required | 4 / 4 | High | Dev |
| R19 | Fix measured LCP bottlenecks | Partially prepared; external data, review, production or ongoing measurement required | 4 / 3 | High | Dev |
| R20 | Reduce measured INP/main-thread work | Partially prepared; external data, review, production or ongoing measurement required | 4 / 2 | High | Dev |
| R21 | Reserve layout space / fix measured CLS | Partially prepared; external data, review, production or ongoing measurement required | 4 / 4 | High | Dev |
| R22 | Test/fix keyboard, forms and overlays | Code changes ready; live verification pending | 4 / 3 | High | Dev + accessibility |
| R23 | Full rendered crawl and orphan join | Code changes ready; live verification pending | 4 / 3 | High | SEO |
| R24 | Resolve overlapping article intent | Partially prepared; external data, review, production or ongoing measurement required | 4 / 3 | High | SEO + content |
| R25 | Publish genuine reviewer/governance profiles | Partially prepared; external data, review, production or ongoing measurement required | 4 / 3 | High | Leadership + content |
| R26 | Verify GSC–GA4 link and dashboard definitions | Partially prepared; external data, review, production or ongoing measurement required | 3 / 4 | High | GA4 + SEO |
| R27 | Reconcile external donation reporting | Partially prepared; external data, review, production or ongoing measurement required | 3 / 3 | High | Fundraising + GA4 |
| R28 | Consent/health-data analytics review | Code changes ready; live verification pending | 3 / 3 | High | Privacy + dev |
| R29 | Organisation/article/breadcrumb graph | Code changes ready; live verification pending | 3 / 4 | Medium | Dev + SEO |
| R30 | Inspect invalid Product markup | Partially prepared; external data, review, production or ongoing measurement required | 3 / 4 | Medium | SEO + dev |
| R31 | Inspect video exclusion/create true watch assets | Partially prepared; external data, review, production or ongoing measurement required | 3 / 3 | Medium | SEO + media + dev |
| R32 | Responsive media/font delivery review | Partially prepared; external data, review, production or ongoing measurement required | 3 / 3 | Medium | Dev |
| R33 | Unify web-vitals events/units/p75 reporting | Code changes ready; live verification pending | 3 / 3 | Medium | Dev + GA4 |
| R34 | Improve newsletter/next-task proposition | Code changes ready; live verification pending | 3 / 4 | Medium | Content + UX |
| R35 | Build/refresh ten intent-owned pillars | Partially prepared; external data, review, production or ongoing measurement required | 5 / 2 | High | SEO + content |
| R36 | Produce original reviewed tools/video briefs | Partially prepared; external data, review, production or ongoing measurement required | 4 / 2 | High | Content + professionals |
| R37 | Validate 100 candidate keyword intents/demand | Partially prepared; external data, review, production or ongoing measurement required | 3 / 4 | Medium | SEO |
| R38 | Monitor Google AI report and sampled citations | Partially prepared; external data, review, production or ongoing measurement required | 3 / 4 | Medium | SEO |
| R39 | Verify search bot access/Bing change notification | Partially prepared; external data, review, production or ongoing measurement required | 3 / 4 | Medium | SEO + dev |
| R40 | Community/member research and accessibility interviews | Partially prepared; external data, review, production or ongoing measurement required | 3 / 3 | Medium | Community + UX |
| R41 | Trust/impact and fundraising journey clarity | Partially prepared; external data, review, production or ongoing measurement required | 3 / 3 | Medium | Leadership + fundraising |
| R42 | Partner resources and earned references | Partially prepared; external data, review, production or ongoing measurement required | 4 / 2 | Medium | Partnerships + content |
| R43 | Maintain medical page review metadata | Partially prepared; external data, review, production or ongoing measurement required | 2 / 4 | Medium | Dev + reviewers |
| R44 | Build event/video/download/scroll engagement reports | Code changes ready; live verification pending | 2 / 4 | Medium | GA4 + dev |
| R45 | Optional descriptive FAQ schema maintenance | Partially prepared; external data, review, production or ongoing measurement required | 1 / 4 | Low | SEO + dev |
| R06 | Monitor robots, server health and GSC alerts | Partially prepared; external data, review, production or ongoing measurement required | 3 / 5 | High | SEO + dev |

## Release and 12-month workflow

Follow twelve-month-roadmap.md and the ranked workstreams above for day 1–7, day 30, day 90 and the twelve monthly milestones. Use content-production.json as the commissioning queue. Release code first, verify live indexing, establish clean confirmed-outcome baselines, then commission reviewed content in small batches and evaluate results monthly. An improvement is complete only when its acceptance criterion and live evidence are recorded.
