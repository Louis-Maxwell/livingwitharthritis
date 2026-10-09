# Living With Arthritis: technical SEO checklist

Audit date: 9 October 2026. Repository baseline: `4149db760aa38b5ecd81b59b2d8484669f0a0c9b`.

Scores: **3** = verified live in the stated scope; **2** = implemented/verified in source or the tested build, deployment still required; **1** = partial evidence or coverage; **0** = confirmed missing; **U** = requires account access, field measurements, external verification or editorial assessment. This is a delivery tracker, not a ranking score. Critical items are due now, Important by 8 November 2026, Growth by 7 January 2027. An implementation score does not verify clinical accuracy or confer search-engine authority.

## Work completed

- Fixed `/blog/archive`: the static-head generator mistook the archive for an unknown article slug, emitted a not-found title and noindex. It now emits archive metadata and a chronological list linking the 524 published guides. Unknown article slugs remain noindex.
- Added 524 existing WebP cover images to the XML sitemap. Generation verifies mapped files exist, rejects unsafe filenames and can run repeatedly without duplicate image records. Integrated with sitemap, development and production-build commands.
- Made sitemap audits fail on detected issues or empty sitemaps, and added checks for noindex, duplicate canonicals and non-HTML responses. The audit now selects the actual article heading rather than a hidden homepage boot hero.
- Corrected the composite SEO audit to use the configured local build URL instead of silently crawling production during CI.
- Tightened build metadata validation: a not-found template in the sitemap can no longer bypass the noindex check.
- Extended the existing Monday health workflow to check hosting, deep-link redirects, unknown URL status and every sitemap page; JSON evidence is retained for 30 days.
- Added automated regression checks for archive indexing, noindex, redirect/error responses, duplicate canonicals, hidden shell headings and image sitemap safety. Corrected source comments that overstated hosting behaviour and schema benefits.

## Validation and limits

- Production build passed, including its 15 existing blog guard tests.
- Lint and both TypeScript projects passed.
- 49 existing SEO identity/build-safety/redirect tests passed; three new Node regression tests passed.
- Static image audit: zero critical findings and zero warnings. This audits source attributes, not the relevance of every alt description or real visual CLS.
- Built internal links: 1,078 unique paths checked, zero broken links.
- Built schema validator: zero reported errors/warnings. This does not replace clinical verification or Google's Rich Results Test.
- Built metadata validator: zero generic heads or sitemap noindex failures after the archive fix.
- Built sitemap crawl: 1,004 unique canonical page URLs, zero detected failures.
- Live sitemap crawl: 1,004 unique page URLs, one failure (`/blog/archive`, noindex/not-found). The source fix is tested but is not yet published.
- Live host: HTTPS, HSTS, robots and sitemap verified. `http://livingwitharthritis.org.uk/conditions/osteoarthritis` redirects permanently to the matching HTTPS path. Both www variants preserve the path but use temporary 302 redirects. Unknown paths return homepage HTML with HTTP 200.

The live sitemap contains 1,006 URL elements; the regenerated sitemap has 1,010 elements before deduplication and 1,004 unique URLs. Raw entry counts and unique page counts are different quantities. Homepage response HTML contained no HTTP asset references; this is not a browser-wide mixed-content assessment.

## Scored checklist

| Item | Priority | Score | Evidence / remaining action |
|---|---|---:|---|
| Active HTTPS certificate | Critical | 3 | TLS requests completed without disabling certificate verification. |
| Force HTTP to HTTPS | Critical | 1 | Non-www is 301; www is 302. Hosting provider must make both www redirects permanent. |
| Mixed-content warnings | Critical | 1 | No HTTP assets in homepage response HTML; browser/runtime assessment outstanding. |
| HSTS | Critical | 3 | Live max-age=31536000; includeSubDomains. |
| Single canonical host | Critical | 1 | One destination, but www redirects remain temporary. |
| robots.txt reachable | Critical | 3 | Live HTTP 200, sitemap directive present. |
| Public blog/condition/resource crawl permission | Critical | 2 | Public wildcard and search/AI crawler groups allow content; private utility paths restricted. |
| Pages/articles XML sitemap | Critical | 3 | Live XML reachable; 1,004 unique pages crawled. |
| Image sitemap | Important | 2 | Added 524 real covers; publish required. |
| Video sitemap | Growth | U | Requires complete real video metadata and page-level visibility checks. Do not invent upload dates. |
| Google sitemap submission | Critical | U | Search Console account operation not performed. |
| Bing sitemap submission | Critical | U | Bing Webmaster account operation not performed. |
| 404 review | Critical | 1 | Sitemap crawl passed status checks; arbitrary missing path returns soft 404. |
| 500 review | Critical | 3 | No HTTP 500 in this sitemap crawl. |
| Redirect chains | Critical | 2 | Source redirect-map checks pass; live canonical sitemap has no redirect responses. Full historical URL inventory outstanding. |
| Broken internal links | Critical | 2 | Built checker passed 1,078 unique paths. |
| Weekly crawl monitoring | Critical | 2 | Expanded existing scheduled workflow; activation requires merge. |
| LCP <=2.5 seconds | Critical | U | No CrUX/GSC field percentile data obtained. |
| INP <=200 milliseconds | Critical | U | Field measurements required; Lighthouse cannot prove INP. |
| CLS <=0.1 | Critical | U | Field percentile measurements required. |
| Image compression/WebP | Critical | 2 | Article cover map uses real WebP files; image source audit passes. |
| Image lazy loading | Critical | 1 | Existing image components use loading hints; verify each route. Do not lazy-load the LCP image. |
| CDN | Critical | 3 | Live response served through Cloudflare. |
| JavaScript reduction/minification | Critical | 1 | Vite production minification and route splitting exist; bundle/Lighthouse optimisation requires a measured baseline. |
| Image dimensions/layout reservation | Critical | 2 | Static image audit found no missing dimensions/CLS hints. Runtime verification remains. |
| Ad/embedded-media space reservation | Critical | U | No complete runtime layout audit performed. |
| Organization schema | Critical | 2 | Existing central organisation node and static/runtime schema validated. |
| MedicalOrganization schema | Critical | 2 | Existing type in root schema. Appropriate only where it truthfully describes the organisation. |
| Article schema | Critical | 2 | Existing per-article build/runtime metadata; build schema validation passed. |
| FAQ schema | Critical | 2 | Existing FAQ builders and guide metadata; assess visible Q&A parity editorially. No rich-result promise. |
| Breadcrumb schema | Critical | 2 | Existing helpers/static heads; schema check passed. |
| Author schema and profiles | Critical | 2 | Existing Maxwell profile and author records. Credentials/experience require owner verification. |
| Named reviewer and actual review date | Critical | 1 | Metadata exists, but many records lack explicit reviewStatus. Credit only completed, documented reviews. |
| Search Console verification | Critical | U | Verify a DNS Domain property to cover http/https/www/non-www. Account status not inspected. |
| Indexed/excluded-page monitoring | Critical | U | Requires Search Console reports. Crawlable is not the same as indexed. |
| Sitemap/indexing warnings | Critical | U | Live technical evidence recorded; Search Console data outstanding. |
| Soft 404s | Critical | 1 | Archive source fixed; hosting unknown-path behaviour still unresolved. |
| Duplicates/canonical issues | Critical | 2 | Build crawl has one matching canonical per page; Search Console-selected canonicals not inspected. |
| URL inspection/indexing request | Critical | U | Account operation outstanding; prioritise changed URLs, not indiscriminate requests. |
| Consistent organisation name | Critical | 2 | Central charity configuration/schema present. External account consistency unverified. |
| Organisation address | Critical | 0 | Central address fields are empty. Publish only a confirmed appropriate public address. |
| Logo/description/founder/email | Critical | 2 | Existing central identity values; external identity verification outstanding. |
| Social-profile identity links | Critical | 1 | sameAs configuration exists; ownership/current validity not verified across platforms. |
| About mission/history | Critical | 2 | Existing About source and live unique page. No arbitrary 1,000-word padding. |
| Charity registration/governance/trustees | Critical | 1 | Existing dedicated pages and registration claims; current regulator/trustee verification outstanding. |
| Expert profiles | Critical | 1 | Existing author/reviewer routes; only create additional clinician biographies for real contributors who consent. |
| Expert qualifications/publications/LinkedIn | Critical | U | Obtain verified individual details and permission; no fabricated experts. |
| Topic clusters | Critical | 2 | Existing cluster data/navigation and resolvable-link filtering. |
| Clean descriptive URLs | Critical | 2 | Existing semantic routes and redirect map. Preserve established URLs unless a mapped migration is justified. |
| Image filenames | Important | 2 | Existing descriptive WebP cover map; no renaming of established assets without link updates. |
| Image alt text | Important | 2 | Source audit passed; human assessment of description accuracy still needed. |
| Image captions | Important | U | Not every image needs a caption; add context/attribution when useful. Editorial audit required. |
| 5–15 internal links per article | Important | 1 | Related links/clusters exist. Use relevant links; no mechanical quota. Per-article quality audit outstanding. |
| Author on each article | Important | 1 | Catalog has author metadata; assess visible byline and correct attribution per guide. |
| Reviewer on each article | Important | 1 | Named metadata is not evidence a clinical review happened. ReviewStatus inventory recorded below. |
| Published/updated dates | Important | 2 | Existing real metadata and sitemap dates; source updates are preserved rather than stamped today. |
| References on each article | Important | 1 | 290/524 records have structured citations. Expand verified references and check unsupported claims. |
| Medical disclaimer | Important | 2 | Existing educational disclaimer and static article footer. |
| Contact details | Important | 3 | Public contact email present on live homepage. |
| Symptoms sections | Important | 1 | Condition subpages exist; clinician assessment of completeness/accuracy outstanding. |
| Causes sections | Important | 1 | Existing guide content; not every article requires the same clinical template. |
| Diagnosis sections | Important | 1 | Existing condition content; clinical audit outstanding. |
| Treatment sections | Important | 1 | Existing dedicated subpages; clinical audit outstanding. |
| NHS references | Important | 1 | Present in existing content; not complete across all 524 guides. |
| NICE references | Important | 1 | Present in content; validate that guidance has not been superseded. |
| Peer-reviewed references | Important | U | Source relevance/quality and update dates need clinical assessment. |
| FAQs in treatment guides | Important | 1 | Existing FAQ metadata and page components; coverage and visible parity need editorial review. |
| LinkedIn footprint | Important | U | Organisation/account editing not performed. |
| YouTube footprint | Important | U | Channel/account verification and optimisation not performed. |
| Facebook footprint | Important | U | Page/account verification and optimisation not performed. |
| X footprint | Important | U | Account ownership/need not established. |
| Charity directories | Important | 1 | Existing directory URLs; verify actual entries and identity. |
| Wikidata | Growth | U | Create only if eligibility and independent supporting sources are established. |
| Crunchbase | Growth | U | Verify need and appropriate classification before creating an entry. |
| Google Business Profile | Important | U | Confirm eligibility and actual operating model before applying; not all online-only organisations qualify. |
| Embedded video per article | Growth | U | Existing exercise/video resources; no complete guide-to-video coverage audit. |
| Video transcripts | Growth | U | Obtain accurate, accessible transcripts for actual recordings. |
| VideoObject metadata | Growth | U | Requires real title, thumbnail, upload date and embedded content parity. |
| Expanded natural-language questions | Growth | 1 | Existing FAQ/answer-box support; select questions from patient needs and measured search demand. |
| Direct 40–60-word answers | Growth | 1 | Existing direct answers; clarity and accuracy take precedence over word count. |
| 2026 arthritis statistics report | Growth | U | Requires sourced statistics, dates, geography and methodology; never invent survey data. |
| Annual original survey | Growth | U | Requires real study design, consent, recruitment, results and methodological review. |
| Benefits/PIP guides | Growth | 2 | Existing hub and published guides. Current legal/policy accuracy requires specialist review. |
| Workplace guide | Growth | 2 | Existing workplace guides; validate current jurisdiction-specific policy. |
| Medication guide | Growth | 2 | Existing content; clinical review required for publication claims. |
| Monthly technical audit | Important | 2 | Weekly hosting/crawl checks and existing build/performance workflows cover technical regressions; account/editorial checks remain manual. |
| Manual actions review | Critical | U | Search Console access required. |
| New pillar article each month | Growth | U | Select an unmet user need; commissioning and actual clinical review required. |
| New expert content each month | Growth | U | Needs real contributor input and documented review. |
| New patient story each month | Growth | U | Requires informed permission and authentic source material. |
| Monthly organisation-schema review | Important | 2 | Central identity checks exist; change only when real details change. |
| 50 new condition pages | Growth | 1 | Existing content inventory already includes 524 guides and 64 generated condition subpages. Choose missing patient needs rather than duplicate existing coverage. |
| NHS/university/healthcare backlinks | Growth | U | Outreach not sent. Requires relevant partnerships/editorial decisions by third parties. |
| Search/AI citation measurement | Growth | U | Requires dated baseline samples and referral/search data; inclusion cannot be guaranteed. |

## Hosting actions that remain critical

1. Configure the host/edge to return permanent 301/308 redirects for both www variants, preserving pathname and query. Existing source redirects alone do not prove deployed behaviour.
2. Serve unknown paths as HTTP 404/410 with an appropriate error document. Do not blindly replace the SPA fallback without verifying that every legitimate dynamic route is served.
3. Merge the tested source changes and publish the corresponding commit. Then recrawl `/blog/archive`, the image sitemap and the deep redirect probes. Do not publish a different Lovable project revision: the plugin reported project SHA `b045f7dd0b569cd3e1ef5ccc3ca944373a0e96c0`, while the GitHub checkout baseline is different.
4. Inspect Search Console/Bing sitemap processing and representative URL indexing. No account operations were performed in this audit.

## Editorial priorities

The source contains 524 published guides: 26 explicitly marked reviewed, 12 pending, and 486 without explicit reviewStatus. 497 contain a named reviewer field; that field alone does not establish an actual review. 290 have structured citation records. These counts describe stored metadata, not clinical accuracy.

- First reconcile actual author/reviewer identities, completed reviews and dates, then align visible claims and schema to the evidence.
- Prioritise condition and medication guides for clinician-led reference review. Check current NHS/NICE sources and claim-specific research.
- Verify About, trustees, public contact/address, professional credentials and regulator details before adding further identity claims.
- Measure field Core Web Vitals at the 75th percentile by device. Existing web-vitals tracking/Lighthouse tooling is an implementation, not proof the thresholds pass.
- Plan a statistics report with a source log (metric, population, geography, year, methodology and link). Publish an original annual survey only after collecting genuine results.

## Corrections to the supplied checklist

Google documents no special schema requirement for AI features, and does not guarantee crawling, indexing or inclusion. Schema describes real visible content; it cannot establish medical authority. There is no ranking minimum of 1,000 words for About pages. A Search Console Domain property covers all domain variants. FAQ rich-result eligibility/support must be checked against current documentation; retaining accurate FAQPage markup is not a promise of search display. Avoid mass-producing interchangeable condition pages merely to meet a page-count target.

Sources:
- [Google AI features and websites](https://developers.google.com/search/docs/appearance/ai-features)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Structured-data introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Search Console Domain properties](https://developers.google.com/search/blog/2019/02/announcing-domain-wide-data-in-search)
- [Google image SEO](https://developers.google.com/search/docs/appearance/google-images)
- [Google guidance on generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)

Evidence JSON is stored alongside this report in `docs/seo/evidence/`. Raw crawl findings have narrow scope and are not a site-wide clinical, legal, accessibility or search-ranking certification.
