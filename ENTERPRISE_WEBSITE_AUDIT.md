# Living With Arthritis — enterprise audit and implementation
Date: 11 October 2026. Website: https://livingwitharthritis.org.uk  
Review: https://github.com/Louis-Maxwell/livingwitharthritis/pull/157

## 1. Complete audit and priorities
The baseline covered every first-response HTML page in the live sitemap (1,030 URLs) and all 568 published source blogs. The implementation covered 1,048 canonical build URLs. This is complete inventory coverage within that scope, not a clinical approval, field-performance certification or rendered audit of every page.

| Priority | Finding / action | Impact | Effort | Status |
|---|---|---|---|---|
| Critical | Confirm provenance of 448 records whose omitted review status defaults to reviewed | Healthcare trust | Clinical/editorial | Owner verification required |
| High | Publish validated crawler HTML and sitemap changes | Discovery / duplicate content | Low | Review branch; not yet deployed |
| High | Complete 99 pending clinical reviews; address 202 posts without structured references | Evidence quality | High | Per-post backlog identified |
| High | Clinically align 64 falls articles with NG249 after replacing CG161 references | Factual currency | High | References updated; advice review outstanding |
| High | Reduce measured mobile LCP on condition/blog templates | Speed | Medium | Initial lab warnings around 5.9s / 5.1s; headline visibility fixed, new measurement required |
| Medium | Assess short first-response copy, overlap and repetitive introductions against actual intent | Content usefulness | Medium/high | Screening, not proof of thinness |
| Medium | Verify mobile, forms, keyboard, contrast and assistive technology | Accessibility/UX | Medium | Five-width template regression suite added |
| Low | Review long title pixel width and CTR using Search Console evidence | Snippet quality | Low | Word-boundary clipping improved |

## 2. Implementation report
Implemented crawler-safe replacement of nested homepage shells; full article H1s; author/reviewer attribution without invented approvals; explicit recorded review dates; escaped JSON-LD; proper general versus medical page types; removal of stale route schemas; FAQ deduplication; visible references; and existing FAQ/glossary copy in static HTML.

Every blog receives canonical category/archive links and relevant peers. Section directories and bridges from canonical guide hubs connect all indexable pages. Search initially renders 50 results with Show more. Shared tables preserve captions/header semantics and support keyboard scrolling. Contents links focus destinations, touch controls are enlarged, reduced motion is respected, and progress updates use transforms with animation cleanup.

IndexNow reads deduplicated same-origin sitemap pages, excludes image/query URLs, verifies the published key, handles 10,000-URL batches and runs explicitly after publication. Builds do not announce unpublished HTML.

Follow-up: repaired the obsolete hard-coded IndexNow test without removing its priority-URL assertions; synchronized current repository maintenance; added TypeScript declarations and five-width browser checks; removed the osteoarthritis hero's transparent entrance; fixed hidden Lighthouse artifact uploads and added numeric lab-result summaries.

## 3. Page-by-page SEO report
The complete 1,048-row inventory and 568-row blog inventory are in the saved **Living-With-Arthritis-Complete-Audit.html** report from the initial implementation. They contain URL, title, description, H1, words, schema, flags, live baseline and blog review/reference details.

Reproduce current per-page evidence from the code:
```sh
npm run build
npm run seo:enterprise
```
Output: `artifacts/enterprise-seo/enterprise-audit.json`.

The validated implementation had one H1, correct canonicals, titles/descriptions, no sitemap noindex flags and no missing image alt attributes on all 1,048 URLs. All were reachable from the built homepage within four link steps; zero measured orphans. Alt-attribute presence is not a claim that every description is appropriate. First-response word-count screening identified 327 short pages; definitions and interactive tools may legitimately be concise. Review rendered intent before expansion.

## 4. Every-blog audit
568 published posts: 99 explicitly pending; 21 explicitly reviewed; 448 unspecified with an existing reviewed default. 114 have no named reviewer field; 202 lack structured citations. Inline references may still exist. 47 bodies contain a repeated generic introductory phrase; this is a similarity candidate, not a duplicate-content verdict.

Full source H1s, word-boundary metadata clipping, Article relationships, references and topic/peer navigation are implemented. FAQ markup reuses supported visible questions. Content should be rewritten only after factual verification, with specific answer-first openings, primary claim-level evidence and authentic review provenance. No fabricated medical statistics, physician credentials, ratings or completed reviews were added.

## 5. Technical SEO report
Canonical XML and embedded image sitemap generation retained and refreshed. Private/utility exclusions retained. Existing robots rules allow Googlebot, Bingbot and the named AI search crawlers. Hreflang variants were not fabricated without genuine equivalent translations.

- Google Search Console: verify/select the property, submit the canonical sitemap, inspect priority/new URLs and investigate exclusion reasons/selected canonicals. Account access/submission is not completed.
- Bing Webmaster Tools: verify/import property and submit sitemap; inspect crawl/index reports.
- IndexNow: after publication run `npm run indexnow`; dry run selects 1,048 canonical page URLs.
- Merchant Center: not configured; no qualifying retail catalog was established by this audit.
- Indexability and notification do not guarantee search-engine inclusion or ranking.

Validated artifact checks: zero broken sitemap targets; no detected source internal-link failures; blog HTML gate passed; redirect guards found no chains/loops; no generic homepage metadata regressions.

## 6. Structured data / healthcare report
Validated build: 568 Article pages, 813 MedicalWebPage pages, 619 FAQPage pages, 1,047 BreadcrumbList pages and 27 indexed DefinedTerm pages. Existing organization/publisher identity retained. JSON-LD validation reported zero error/warning routes; this is not a Google rich-result eligibility certificate.

Actual profile routes /authors/maxwell and /reviewers/maxwell are used. Pending records omit completed-review claims. A source-recorded reviewer/date is required for lastReviewed; an editorial update is not clinical review. Verify practitioner and charity claims with authoritative registers. Physician/Review schema is inappropriate without the corresponding genuine entity or review evidence.

64 NICE CG161 labels/URLs now point to NG249, without assigning clinical-review dates to editorial reference updates. Removed 64 dates inferred during this implementation; preserve only the 26 explicitly recorded source dates. The catalog and runtime no longer substitute publication/update dates for clinical review. This does not certify that the underlying advice meets the replacement guideline.

## 7. Core Web Vitals / mobile / accessibility report
Measured desktop Lighthouse: home Performance 100; osteoarthritis 96–97; blog 98. All measured Accessibility, Best Practices and SEO categories scored 100. Desktop LCP ranged 0.61–1.34s, TBT 0–5.5ms and CLS 0–0.0023. Mobile warnings remain: osteoarthritis LCP ~5.58s and blog ~5.04s. These mobile targets are not achieved. Retained artifacts and numeric logs provide lab evidence; no field-CWV claim is made. Before the final review-date correction, CI passed 663 Vitest tests and 44 Playwright checks (6 existing screenshot checks skipped), including all 35 checks at the five requested widths. The final corrected commit must pass CI again.

Acceptance targets: field LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at the 75th percentile. Lighthouse SEO has a maximum score of 100; >100 is impossible. Lab TBT is not field INP. No live CrUX score or WCAG certification is claimed.

New browser checks cover 320, 375, 768, 1024 and 1440px across homepage, guide hub, archive, article, condition guide, search and contact templates. They test rendering, horizontal overflow and uncaught JavaScript exceptions. Existing Playwright checks also cover landing layout. Automated sampled tests do not certify every page or WCAG 2.2 AA.

Remaining: manual screen reader, zoom, contrast, keyboard/dialog/form validation; field data; measured critical image/font/CDN costs. Lazy splitting and modern covers already exist. Avoid guessed preloads, DNS hints or blanket lazy loading of LCP assets.

## 8. AI visibility report
Full readable first-response content, citations, canonical identities, author/reviewer relationships, topic navigation and honest llms-full summaries improve extractability. Existing crawler policies support ChatGPT search, Bing/Copilot, Perplexity, Claude and Google discovery. Training bots and search bots are separate purposes. Neither schema nor llms.txt guarantees citations.

Measure a fixed patient-question panel by engine/date, cited URL, factual correctness and privacy-safe referral engagement. Improve evidence and original expertise rather than inserting unsupported authority claims.

## 9. Keyword opportunities / 20-topic plan
Candidate angles, not verified search-volume forecasts. Compare against existing content and Search Console first; update/consolidate an existing URL when intent overlaps. New medical copy needs qualified review.

| Priority | Angle / candidate keyword | Intent | Internal linking |
|---|---|---|---|
| P1 | knee arthritis exercise pain next day | Decision aid | Exercise / OA hubs |
| P1 | seated arthritis strength progression | How-to | Exercise / guides |
| P1 | walking or cycling osteoarthritis | Comparison | Exercise / existing activity posts |
| P2 | arthritis physiotherapy appointment questions | Preparation | Guides / triage glossary |
| P2 | arthritis daily function diary | Tool-led | Guides / conditions |
| P1 | NICE NG249 falls prevention arthritis | Guideline explainer | Guides / updated falls articles |
| P1 | arthritis dizziness medicines review questions | Safety/preparation | Medicines / falls articles |
| P1 | arthritis after fall follow up checklist | Decision aid | Falls clinic / guides |
| P2 | arthritis living alone falls alarm checklist | Comparison | Living-alone / alarms |
| P2 | osteoarthritis osteoporosis frailty differences | Comparison | Condition / bone-health hubs |
| P1 | arthritis supplements evidence comparison | Evidence table | Supplements / diet |
| P1 | new arthritis medicine questions pharmacist | Preparation | Treatment / condition guides |
| P2 | arthritis treatment study evidence quality | Education | Glossary / editorial standards |
| P2 | rheumatoid arthritis review symptom diary | How-to | RA / flare guides |
| P2 | arthritis nutrition food vs supplements | Comparison | Diet / supplements |
| P1 | arthritis PIP evidence daily function | How-to | Benefits / existing PIP guides |
| P1 | arthritis surgery waiting list preparation | Preparation | Waiting-list / guides |
| P2 | arthritis reasonable adjustments meeting checklist | How-to | Work-rights posts |
| P2 | arthritis occupational therapy home assessment | Preparation | Home adaptations / guides |
| P2 | arthritis frailty carer independence support | Decision aid | Carer / frailty guides |

## 10. Content gaps and remaining opportunities
Use existing canonical blog categories plus editorial silos for exercise, falls/frailty, evidence/treatment and UK support. Link up to a hub, sideways to relevant peers and onward to practical next steps. Consolidate regional near-duplicates only after intent and query evidence.

Priorities: explicit review provenance, claim-level citations, NG249 clinical alignment, original experience, useful comparison tables and supported answers. Validate about/contact/governance claims rather than inventing trust signals. Define search-success, useful-guide completion and voluntary-support conversion metrics before A/B testing.

Expected ranking/AI/conversion impact is qualitative; percentages and timelines cannot be responsibly forecast from these checks. Production publication, search submissions and live validation remain separate release steps. Current GitHub Actions, including the newly expanded checks, are the authority for validation status:
https://github.com/Louis-Maxwell/livingwitharthritis/actions

Official references: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl · https://www.indexnow.org/documentation · https://www.nice.org.uk/guidance/ng249 · https://web.dev/articles/vitals · https://www.w3.org/TR/WCAG22/

## Release follow-up — 11 October 2026

Resolved conflicts with the subsequent metadata, entity, keyword-search, media-sitemap and topic-cluster changes on main, preserving both implementations. Regenerated affected catalogs, static article data, search and crawler files. Explicit review status is now carried through all article surfaces: missing approval defaults to pending, with 546 pending records and 22 explicitly recorded completed statuses in the current 568-post inventory. Historical names without a recorded approval were moved to the review backlog rather than being presented as completed reviews. Source-recorded approvals and review dates were retained; these are records, not independent credential verification. The per-post queue is `docs/seo/clinical-review-backlog.csv`; completing it requires actual qualified review.

Added first-response route/dependency preloads for /blog and /conditions/osteoarthritis, and independent retention of mobile and desktop Lighthouse artifacts. The previous mobile LCP baseline was about 5.04s and 5.58s. Local Chrome could not launch because the execution environment denied its process-singleton socket; GitHub Lighthouse CI is the measurement authority for the new release. No new mobile score is claimed without its report.

Google sign-in still returns 502 Bad Gateway / connection refused in the Cloud Browser, so authenticated Search Console submissions cannot be completed in that environment. Publication and real IndexNow submission are to be verified after the release. The sitemap and page count can vary across generated HTML, redirect stubs and canonical indexable routes; these counts must not be conflated.
