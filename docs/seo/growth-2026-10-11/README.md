# Living With Arthritis: white-hat search growth implementation

Prepared 11 October 2026 for https://livingwitharthritis.org.uk.

## Delivered and implemented

| Deliverable | Count / result | What it means |
|---|---:|---|
| Deduplicated keyword candidates | 1,480 | Mapped to canonical URLs and intent; not measured volume or observed People Also Ask data |
| Pillar mappings and enhancement briefs | 20 | Existing hubs are strengthened instead of creating competing pillar URLs |
| Blog ideas and outlines | 100 | Commissioning backlog, with possible existing article overlap flagged |
| FAQ briefs | 50 | Draft briefs, not 50 newly published medical pages |
| Backlink prospects | 100 unique domains | Research shortlist; no link secured or outreach sent |
| Published article inventory examined | 568 | Local source inventory, not proof of Google indexation |
| Canonical source URL inventory | 1,048 | The XML inventory used for mapping, not an indexed-page count |
| Condition reading pathways | 4 added | Rheumatoid arthritis, psoriatic arthritis, ankylosing spondylitis and fibromyalgia |
| Dedicated image sitemap | 568 article landing pages | Existing cover images only; registered in sitemap-index.xml |

Changes in the codebase add condition-specific hub, symptom, treatment, exercise and diet links to the hydrated reading journeys and initial article HTML. The topic resolver now checks exact matches before parent paths. Reading-journey links are filtered against published blog and FAQ catalogues. These changes add discovery pathways without introducing keyword lists into visible medical copy or metadata.

Initial HTML now also includes Article nodes with source-derived publication dates, citations and author identity for all 568 published blogs. Pending clinical review never becomes a completed review claim. Existing full-article HTML is refreshed without duplicating Article nodes, and JSON-LD is escaped to prevent closing-script injection.

The image sitemap generator runs after cover enrichment in the existing build pipeline. It cannot advertise pages without image entries or duplicate the sitemap registration. A video sitemap is not emitted: the checkout has no playable MP4/WebM assets with complete landing-page metadata. Missing demonstration files must not be advertised as real videos.

Existing code already provides robots.txt, llms.txt, humans.txt, IndexNow, canonical generation, article/medical/breadcrumb/organisation structured data, and Open Graph/X metadata. Pending PR #156 separately improves IndexNow and discovery; it has not been silently merged or duplicated here.

## Read the files

- `keyword-map.csv`: primary, long-tail and conversational candidates grouped into 20 clusters and nine intent families. Blank volume/difficulty cells are intentional. Target assignments require section-level verification, and title similarity is only a duplicate-content warning.
- `20-pillar-briefs.csv`: existing canonical hub, reader job, required sections, source/review needs and link policy.
- `100-blog-briefs.csv`: titles, outlines, original-value requirement, possible overlap and proposed URL. Proposed URLs are not routes or sitemap entries.
- `50-faq-briefs.csv`: questions, parent hub, answer structure and publication requirements.
- `internal-link-map.csv`: deduplicated source-to-hub recommendations. These recommendations are not all automatically inserted links.
- `100-backlink-prospects.csv`: domains, qualitative authority, relevance, difficulty, priority, pitch and validation status.
- `OUTREACH.md`: draft email templates, partnership and guest contribution ideas, and acquisition roadmap.
- `live-foundations.json`: current HTTP checks and unresolved hosting faults.
- `built-schema-summary.json`: static JSON-LD parse and crawl checks.
- `summary.json`: reproducible inventory counts and scope statement.

Run `npm run seo:growth` from the repository root to refresh the maps after content changes. Re-run against an updated canonical inventory when pages are merged or redirected. Do not index the planning CSV files as patient-facing pages.

## What the keyword gap analysis establishes

This is a content inventory gap analysis. It identifies opportunities by comparing generated search intentions with the repository's canonical page inventory and published article titles. It does not establish competitor rankings, search volume, current rank positions or missing keywords in Google Search Console.

A complete measured competitor gap analysis still needs the site's current GSC query/page export and competitor keyword exports from Ahrefs, Semrush or an equivalent source. Compare arthritis-uk.org, nras.org.uk, nass.co.uk, NHS condition resources and relevant UK physiotherapy publishers. Separate sites with genuinely similar services from major institutions whose broad medical authority and scale differ.

Use one primary URL per intent. Merge overlapping answers into a useful article or hub; create a separate URL only when it serves a distinct reader task. Validate search wording, clinical relevance and demand before publication. Inflammation is a mechanism rather than an interchangeable diagnosis, and fibromyalgia must not be described as inflammatory arthritis. Juvenile arthritis content needs paediatric review and an appropriate caregiver audience.

## Priorities and content architecture

| Priority | Action | Completion criterion |
|---|---|---|
| Critical | Fix hosting's soft 404 response | An unknown URL returns HTTP 404/410, not homepage HTML with 200 |
| High | Make www canonical redirects permanent | HTTP and HTTPS www preserve the requested path and query and use 301/308 |
| High | Ship and recrawl the tested source changes | Correct new files and condition links are observed on production |
| High | Review medical attribution and overstatements | Reviewer claims, dates and credentials have documented approval |
| High | Strengthen near-page-one pages with existing impressions | Better answer, accurate title and relevant next step, measured by query/device |
| Medium | Refresh 20 mapped pillars | Each has clear summaries, useful next actions and current references |
| Medium | Publish distinct FAQ answers from the 50 briefs | Each passes overlap and clinical review; no automatic mass publication |
| Medium | Acquire editorial mentions through useful assets | Verified referral links, independent editorial choice and real partner value |
| Growth | Commission original reader research and accessible resources | Transparent methods, permissions and credible professional involvement |

Architecture: a condition hub links to symptoms, diagnosis/treatment, exercise, diet and relevant daily-life support. Supporting articles link back to that hub and to one appropriate practical resource. Exercise, nutrition, pain, benefits and flare hubs connect across conditions where the link is useful. Avoid connecting every page to every other page, or burying a long keyword list in navigation.

Start with the four newly added pathways and osteoarthritis. Use verified clinicians for explanation, welfare specialists for UK benefits, and consented lived experience for practical context. Include limitations, evidence quality and escalation guidance where clinically appropriate. Do not invent expert quotes, review approvals or dates.

## AI and search discovery

Put the direct answer near the beginning, then describe who it applies to, what the evidence can establish and the next step. References should sit next to the claim they support. Use ordinary readable HTML, descriptive headings, stable canonical URLs and matching structured data. Maintain author biographies and corrections policies with verifiable information.

MedicalWebPage is an appropriate schema.org vocabulary type where content warrants it; it is not a separate guaranteed Google rich result. Author is a property generally referencing a Person, not a standalone `Author` schema type. FAQPage can describe visible FAQs, but Google stopped showing FAQ rich results on 7 May 2026. Do not promise FAQ snippets, ranking increases or AI citations from schema.

Google says no special AI markup or AI text files are needed for its AI search features; its June 2026 guidance says llms.txt does not positively or negatively affect Google Search rankings. Keep the existing file useful for systems that elect to consume it, without treating it as a ranking lever. Check search crawler access and CDN behaviour independently of AI-training crawler preferences. IndexNow accelerates change notification to participating engines; it does not guarantee indexing or notify Google directly.

## Traffic opportunities and expected improvements

The earlier user-provided GSC window of 9 September–6 October 2026 recorded the following. These values are historical context, not a fresh account export:

| Page | Impressions | Clicks | CTR | Average position |
|---|---:|---:|---:|---:|
| `/blog/pip-for-arthritis-uk` | 2,140 | 12 | 0.6% | 9.6 |
| `/guides/benefits-pip` | 2,043 | 27 | 1.3% | 6.5 |
| `/blog/anti-inflammatory-diet-rheumatoid-arthritis` | 1,316 | 12 | 0.9% | 9.5 |
| `/blog/best-supplement-for-knee-joint` | 1,109 | 14 | 1.3% | 9.5 |

Combined: 6,608 impressions, 65 clicks, approximately 0.98% weighted CTR. With unchanged impressions, an illustrative 2% CTR would produce about 132 clicks (+67), and 3% about 198 clicks (+133), over the same-length reporting window. These are arithmetic scenarios, not forecasts. Snippet wording, position, seasonality, query mix and search result features affect results.

The most plausible first opportunities are existing relevant pages already near page one, distinct long-tail patient tasks and helpful UK-specific support information. Condition pathways should improve discovery and reader navigation; they do not establish a numerical ranking gain. Broad terms such as "arthritis" are highly competitive and cannot responsibly be assigned a promised position or traffic increase.

Track 28-day and 90-day non-branded clicks, impression-bearing relevant queries, CTR within similar position bands, indexed canonical pages, useful engagement events and referrals. Compare query/device/country segments and annotate releases. Do not equate 1,480 keyword candidates with 1,480 ranked keywords, or longer sessions with better medical outcomes.

## Performance and verification limits

No new third-party script, font, network dependency or large runtime keyword dataset is introduced. The keyword and planning files stay outside the application bundle. Production compilation, type checking, the existing unit suite and targeted build tests were run; see the validation record below.

The requested mobile/performance/accessibility 95+ and SEO 100 remain targets, not measured results. Local Lighthouse and the browser-driven schema validator could not run because Chrome is not installed. Existing CI budgets are lower than those requested and passing them would not prove a 95+ score. Keep the current regression checks intact; use the GitHub Lighthouse job to capture fresh metrics, then fix the measured LCP, blocking work, contrast, labels and asset delivery findings. Field CWV needs real-user data.

## Remaining growth work

1. Complete account-side GSC/Bing measurement and a measured competitor export comparison.
2. Resolve the two demonstrated production hosting faults and recrawl after release.
3. Review and strengthen existing hubs before adding more similar medical pages.
4. Commission the strongest distinct blog and FAQ briefs, with clinical/welfare review.
5. Create accessible downloadable assets and original, consented patient research for digital PR.
6. Validate each backlink prospect's actual relevant page, editor and policy before targeted outreach.
7. Provide real exercise videos, accurate titles, descriptions, thumbnails and dates before a video sitemap.
8. Record a stable performance baseline and work toward the requested scores using observed findings.

## Sources checked

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: documentation changes, including FAQ retirement and llms.txt clarification](https://developers.google.com/search/updates)
- [IndexNow protocol documentation](https://www.indexnow.org/documentation)
- [NHS: osteoarthritis treatment](https://www.nhs.uk/conditions/osteoarthritis/treatment/)
- [NHS: living with rheumatoid arthritis](https://www.nhs.uk/conditions/rheumatoid-arthritis/living-with/)
- [NHS: fibromyalgia self-help](https://www.nhs.uk/conditions/fibromyalgia/self-help/)
- [NHS: ankylosing spondylitis treatment](https://www.nhs.uk/conditions/ankylosing-spondylitis/treatment/)
- [NHS: psoriatic arthritis](https://www.nhs.uk/conditions/psoriatic-arthritis/)
- [NRAS](https://nras.org.uk/), [NASS](https://nass.co.uk/), [Fibromyalgia Action UK](https://www.fmauk.org/), [Arthritis UK](https://www.arthritis-uk.org/) and [NIHR](https://www.nihr.ac.uk/).

These source checks support the strategy and evidence requirements. They do not establish that an organisation will link to or endorse Living With Arthritis.

## Validation record

- TypeScript application and build-configuration checks passed.
- 661 existing/new unit tests across 105 files passed, plus 10 dependency-security tests.
- Six Node technical SEO/media/link tests passed.
- Production build and HTML postprocessing passed.
- All 1,048 source sitemap pages had built HTML, matching canonical tags and no noindex conflict; 5,343 JSON-LD blocks parsed without errors. This is static parse validation, not vocabulary or rich-result eligibility certification.
- Twenty article pages contained the newly added condition pathways in initial HTML.
- Built metadata audit found zero generic title/description/social-head regressions and zero prohibited noindex pages.
- Planning datasets passed count, uniqueness and canonical-target checks.
- Live checks passed HTTPS/HSTS, asset protocol, robots and sitemap retrieval; failed www permanent redirects and unknown-path HTTP status.
- Browser-based schema and Lighthouse scores remain unmeasured locally because Chrome is unavailable.
