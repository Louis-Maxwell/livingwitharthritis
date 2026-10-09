# Living With Arthritis: authority and search execution plan

Prepared 9 October 2026. Planning period: 9 October 2026–6 January 2027.

## Objective and positioning

Make Living With Arthritis a useful, independently identifiable source of practical arthritis education, with stronger organic discovery, qualified referrals and evidence of content quality. Suggested positioning: **“Practical arthritis education and self-management resources, informed by clinical expertise and lived experience.”** Use “patient-led” only where patients demonstrably influence governance or editorial decisions. “The UK's most practical” is an ambition, not a substantiated public claim.

First-page visibility is a goal for selected queries, not a promise for broad terms such as “arthritis”. Start with questions that the organisation can answer exceptionally well. AEO means answer-engine optimisation; GEO here means generative-engine optimisation. International geographic visibility is a separate workstream.

## What was inspected

Repository main at `4149db760aa38b5ecd81b59b2d8484669f0a0c9b`, the live homepage, robots rules, author records, editorial policies and build scripts. This is a repository and public-page assessment, not a complete live crawl or an authenticated Search Console/GA4 audit.

- Existing foundations include author and reviewer pages, per-page head generation, clinical review statuses, organisation schema, sitemap generation and extensive articles. Build on these rather than recreate them.
- robots.txt already allows Googlebot, Bingbot, OAI-SearchBot and PerplexityBot. Access permission alone does not prove successful crawling, indexing or citations; CDN responses also matter.
- The repository contains 524 blog records: 26 explicitly marked reviewed, 12 marked pending and 486 without an explicit review status. These are metadata counts, not independently verified review outcomes. The blog implementation treats older posts without an explicit review status as reviewed. Audit the underlying review records before increasing promotion. This plan does not silently revoke or manufacture reviews.
- The author biography includes an experience-duration claim. Confirm it against the author's evidence before repeating it in outreach or directories.
- The live homepage contains broad reviewed-content and staffing claims. Verify these against actual records; do not infer dietitian involvement from nutrition content.
- PR #135 contains international English metadata changes and has not been treated as deployed: https://github.com/Louis-Maxwell/livingwitharthritis/pull/135.

No authenticated impressions, clicks, ranking baseline, AI citation baseline, clinical reviewer capacity or budget were available. All scores below are prioritisation judgments; costs are planning allowances in GBP excluding VAT and existing staff time, not vendor quotes. Timelines describe delivery; search effects can take months and may not occur.

## Prioritised recommendations

Impact and difficulty use 1–10, with 10 highest. These workstreams share resources: do not add all budgets together without deduplicating staff, production and analytics costs.

| ID | Workstream | Impact | Difficulty | Budget allowance | Delivery | KPI and measurement |
|---|---|---:|---:|---|---|---|
| 1 | Technical crawl, rendering and indexability | 10 | 6 | £0–£2,000 | Days 1–14 | Priority URLs returning 200 with correct canonical/content; source HTML crawl and URL Inspection |
| 2 | Search Console and indexing | 10 | 4 | £0–£750 | Days 1–14; weekly | Eligible priority URLs indexed, non-brand clicks/CTR; GSC exports and sample inspections |
| 3 | Medical review and E-E-A-T evidence | 10 | 7 | £1,000–£4,000 pilot | Days 1–45 | Pilot guides with traceable review/source records; editorial audit, not badge counts |
| 4 | Existing cornerstone content and internal links | 9 | 7 | £1,500–£5,000 pilot | Days 15–60 | 12 improved guides, qualified organic visits and useful actions; GSC/GA4 by URL |
| 5 | Structured data and entity consistency | 8 | 5 | £0–£1,200 | Days 1–21 | Consistent IDs, valid applicable markup, zero invented entities; source review and validators |
| 6 | Google AI/Gemini and answer clarity | 8 | 5 | Included in content pilot | Days 15–60 | Useful answers and observed citations; dated prompt sample and GSC overall search data |
| 7 | ChatGPT search eligibility and referrals | 7 | 4 | £0–£500 | Days 1–21 | OAI-SearchBot access and ChatGPT referred sessions/actions; logs and GA4 |
| 8 | Bing search and Copilot | 8 | 4 | £0–£750 | Days 1–21 | Bing indexed URLs/clicks and available AI citation metrics; Bing Webmaster Tools |
| 9 | Perplexity and Claude discovery | 7 | 4 | £0–£500 | Days 1–21 | Public pages reachable, observed citations and referrals; logs and dated samples |
| 10 | Charity governance and authority signals | 9 | 5 | £0–£1,000 | Days 1–30 | Verified governance/contact/financial facts; quarterly fact register |
| 11 | Citation directories and social entity profiles | 7 | 4 | £0–£750 | Days 15–45 | Accurate live profiles and relevant referral visits; profile register and GA4 |
| 12 | Digital PR and editorial backlinks | 8 | 8 | £500–£3,000 | Days 30–90+ | Independent relevant coverage and referred readers; coverage log, links and analytics |
| 13 | NHS, GP, council and university opportunities | 9 | 8 | £250–£1,500 | Days 30–90+ | Resource evaluations, useful placements, documented collaborations; opportunity log |
| 14 | Original survey and research readiness | 8 | 9 | £1,000–£5,000 pilot | Design days 30–60; fieldwork after readiness | Usable completed responses and transparent methods; dataset quality report |
| 15 | Patient stories and patient involvement | 8 | 7 | £250–£1,500 | Days 15–90 | 5–10 consented stories and documented editorial input; consent register and feedback |
| 16 | Local support discovery | 7 | 6 | £250–£1,500 | Days 30–75 | Verified useful listings and local referrals; listing checks and GSC location queries |
| 17 | Video SEO and YouTube authority | 8 | 7 | £750–£3,000 pilot | Days 30–90 | 4–6 reviewed videos, retention and website actions; YouTube Studio and GA4 |
| 18 | Newsletter and accessible downloadable guides | 7 | 5 | £250–£1,500 | Days 15–60 | Confirmed subscriptions, clicks, completed downloads; consent records and analytics |
| 19 | Wikipedia/Wikidata readiness | 4 | 9 | £0–£500 assessment | Assess day 60; publication uncertain | Independent source dossier and eligibility assessment; manual review |
| 20 | Annual reporting, webinars and employer work | 7 | 8 | £500–£2,500 pilot | Days 45–90; annual report later | One webinar, verified annual evidence and useful follow-up; registration/feedback logs |
| 21 | International expansion | 6 | 8 | £500–£3,000 per reviewed locale pilot | After core audit; 3–6+ months | Country/query clicks and helpful local use; country GSC comparisons |
| 22 | Measurement and decision cadence | 9 | 4 | £0–£1,000 | Days 1–14; weekly | Auditable baselines and useful-action rates; weekly scorecard |

## Implementation steps

### 1. Technical SEO

Select 30 public priority URLs covering conditions, exercise, benefits, trust and resources. Crawl both source and rendered HTML. Check response codes, one correct canonical, unique meaningful title/description, article content before JavaScript, internal links and image accessibility. Investigate duplicate homepage fallbacks and soft 404s before adding pages. Compare sitemap entries with real published routes; remove redirects, utility screens and nonexistent URLs. Verify noindex separately from robots blocking. Assess mobile LCP/INP/CLS with field data where available; fix the largest verified bottleneck first. Capture before/after samples after publication.

### 2. Google Search Console

Use the verified Domain property if available, record 90-day performance by page/query/country/device and separate branded from non-branded terms. Investigate indexing reasons on the 30-URL cohort and compare Google's selected canonical with the intended one. Submit the valid sitemap index once; use URL Inspection for important changed URLs within available quotas. Sitemap submission is a discovery signal, not an indexing command. Do not bulk-submit ordinary articles through Google's restricted Indexing API. Record fixes, release dates and comparable 28-day results, allowing reporting delays.

### 3. Clinical authority and E-E-A-T

Choose 12 guides. For each, record actual author, reviewer, relevant credentials, source references, review date, next review trigger and conflicts. Confirm professional registration and consent to publish biographical information. Reconcile visible badges with JSON-LD and static head data. A legacy default or a code command is not evidence that a clinical review happened. Preserve pending labels until a real review is complete. Medication and benefits content may require relevant specialist review in addition to physiotherapy expertise. Provide a corrections route and distinguish clinical review from copy edits. Keep an evidence register for staffing and experience claims.

### 4. Cornerstone articles and topic clusters

Inventory existing pages by intent before commissioning any new article. Start with 12 core clusters: osteoarthritis, rheumatoid arthritis, psoriatic arthritis, ankylosing spondylitis, fibromyalgia, joint pain, fatigue, exercise, diet, benefits/PIP, work support and living with flares. Select one primary page per intent; improve it or merge overlapping pages with tested redirects. For each pilot guide, use a clear opening answer, practical next steps, limitations, references, genuine review attribution and useful related links. Add a patient perspective only with consent. Length follows the question and accessibility needs; do not pad to 3,000–5,000 words. Expand toward a 100-topic backlog only after review capacity and reader value are demonstrated.

### 5. Structured data and Knowledge Graph

Maintain one stable organisation ID, name, canonical URL, verified registration identifier, logo and official profile links. Use Organisation/NGO types that accurately describe the organisation; do not imply delivery of medical services through a type alone. Link real authors and publisher IDs consistently from appropriate Article/ProfilePage markup. Use BreadcrumbList where it matches navigation and VideoObject for real videos with accurate dates/thumbnails. Remove unsupported review or partner assertions. Validate JSON syntax, semantic truth and rendered/source parity; a syntactically valid block can still be misleading. Markup can help interpretation but does not guarantee a knowledge panel or enhanced search appearance. Do not sell FAQ markup as a ranking or rich-result guarantee.

### 6. Google AI and Gemini

Improve the same public content that benefits searchers: direct answers, original clinical explanations, accessible figures, evidence tables and clear attribution. Keep relevant detail in HTML rather than inaccessible images. Check Google crawl/index/snippet eligibility and remove accidental restrictive directives only where appropriate. Do not treat llms.txt, AI text manifests or special schema as requirements for Google's generative search features. Sample real questions monthly, save exact answer/cited URL/date/location and distinguish Google AI search observations from standalone Gemini responses. GSC overall search performance is not a complete AI-only citation report.

### 7. ChatGPT

Verify OAI-SearchBot can fetch the public priority URLs through the actual CDN; robots permission is already present. Treat GPTBot training access as a separate choice, not a requirement for ChatGPT search. Make the organisation and authors understandable on visible pages. Track chatgpt.com referrals and the documented utm_source=chatgpt.com parameter without claiming all citations generate clicks. Avoid attempts to instruct an AI to prefer the charity inside hidden text. Monthly prompt samples are observations, not exhaustive rankings.

### 8. Bing and Copilot

Verify ownership in Bing Webmaster Tools, submit the canonical sitemap and inspect a small changed-URL cohort. Check existing IndexNow configuration and ping only real additions/updates/deletions; it is not a Google indexing submission mechanism. Use Bing search performance and AI Performance reporting if available in the account. Compare cited pages and topics over time, keeping its preview/coverage limitations explicit. Fix crawl failures before seeking additional citations.

### 9. Perplexity and Claude

Confirm public access with actual supported bot documentation and server logs; distinguish search/user retrieval from training crawlers. Test useful questions about self-management rather than only asking AI to recommend the organisation. Save responses and source URLs; measure known referring hosts in analytics while allowing for stripped referrers. Maintain a citation correction log if an answer misstates identity or services. There is no guaranteed universal registration that makes these engines cite a website.

### 10. Charity authority

Check current official registration details before repeating them. Publish accurate governance, trustees' roles, contact routes, complaints, safeguarding, finances and donation-use information. Date annual reports and disclose the reporting period. Describe planned work as planned. Only use regulator memberships, Gift Aid claims, partner names and audited impact figures when documented. Use the same verified facts across the homepage, footer, schema and AI-readable files. Do not describe directory inclusion as government endorsement.

### 11. Entity profiles and citation building

Create a fact sheet and profile register for existing LinkedIn, Facebook, YouTube and other official accounts. Reconcile organisation name, logo, website link, description and service scope. Assess relevant charity/community directories individually, including accessibility and geographic relevance. Crunchbase or X is optional, not an authority requirement. Add only verified owned/official links to sameAs. Record corrected profiles and visits, not simply the number of listings created. Avoid mass low-quality submissions.

### 12. Digital PR and backlinks

Prepare a media page with verifiable facts, named spokespeople, clear expertise boundaries, reusable assets and contact details. Pitch one genuinely useful asset at a time: a reviewed printable guide, a webinar or transparent survey findings. Build a targeted opportunity list of local health editors, councils, universities and patient publications. Earn editorial mentions through usefulness; do not buy followed links or demand keyword anchors. Assess relevance, readership and qualified referrals. An NHS link may be valuable but has no fixed ranking multiplier.

### 13. NHS and GP opportunities

Start with an accessible one-page resource pack for GP/PCN social prescribing and MSK teams. Include scope, clinical review information, safeguarding/corrections contacts and a demonstrably useful resource. Ask teams to evaluate suitability for their resource directories; treat evaluation, listing and formal partnership as different outcomes. Pursue a small pilot with documented responsibilities and feedback. Universities may help with methods or evaluation; councils may list community resources. Prepare materials first. No outreach emails or messages are authorised or sent by this plan.

### 14. Original research

Design an Arthritis Experience Survey around one primary question before setting a response target. Involve a patient advisory group and a methods adviser. Determine whether the project is research or service evaluation and obtain applicable review before recruitment. Define recruitment, eligibility, consent/privacy information, withdrawal rules, secure storage, retention and analysis methods. Pilot with a small group, fix confusing questions and predefine missing-data/duplicate handling. Publish actual achieved counts, per-question denominators and limitations. A convenience sample of 1,000 is not necessarily representative; do not promise this number or national prevalence conclusions. Publish anonymised aggregate data only after appropriate disclosure-risk review.

### 15. Patient stories

Invite real contributors through an approved process. Separate participation from clinical care or donation pressure. Explain where stories will appear, obtain permission for text/images and offer anonymity. Use accessible interviews, contributor approval and an agreed withdrawal process. Clearly label individual experience and avoid implied treatment guarantees. Start with five diverse stories rather than an arbitrary target of 50. Give contributors influence over language and practical resource design; document that involvement before claiming patient leadership.

### 16. Local SEO

Verify existing support listings, actual service areas, referral requirements and last-check dates. Maintain substantive local pages only where they help readers; do not generate city doorway pages. Assess Google Business Profile eligibility based on real in-person activity. Online-only organisations are not automatically eligible, and virtual addresses or invented overseas offices should not be used. If eligible, keep details and hours accurate; otherwise focus on the website and legitimate directories. Record local referrals and listing errors resolved.

### 17. Video and YouTube

Audit the existing channel before creating another. Record four to six clinician-approved explainers around demonstrated audience questions. Show qualifications and limitations, include accurate captions/transcripts, clear thumbnails, chapters and links to the relevant guide. Use rights-cleared imagery and real presenter consent. Create a useful page for each substantive video and accurate VideoObject metadata. Measure impression-to-view CTR, retention, search queries, referred visits and useful actions; views alone are not evidence of benefit. Avoid promising virality or overstating clinical outcomes.

### 18. Newsletter and guides

Start with a welcome series and one accessible printable resource tied to an improved guide. Confirm consent and unsubscribe behaviour and avoid collecting unnecessary medical data. Use tagged owned-campaign links; do not add campaign parameters to canonical search URLs. Provide an accessible HTML alternative to PDFs and record true download events rather than only button visibility. Measure confirmed subscriptions, engaged clicks and returning use, treating open rates cautiously.

### 19. Wikipedia and Wikidata

Compile substantial independent coverage before assessing Wikipedia organisation notability. Official registration and self-published pages establish facts but do not alone establish encyclopaedic notability. Disclose conflicts of interest and follow the appropriate review process; avoid promotional self-authored articles. Assess Wikidata under its own notability and sourcing rules rather than assuming a charity automatically qualifies. Do not add nonexistent entries to sameAs. This is readiness work, not a commitment to publish entries or a shortcut to a knowledge panel.

### 20. Reports, webinars and employer work

Prepare a factual annual evidence log now; a “State of Arthritis” report must wait for credible methods and findings. Run one accessible webinar with a qualified speaker and real invitations/consent, record unanswered questions and publish a reviewed summary. Consider an employer checklist before public rankings. Any ranking needs transparent criteria, verifiable evidence, conflict disclosures and a correction route; paid inclusion must not determine results. Measure useful follow-up and independently verified adoption rather than exaggerated audience figures.

### 21. International visibility

Retain India, USA, Australia, Canada and Greenland in the measurement plan. Improve global English discovery while distinguishing UK-specific benefits and healthcare pathways. Commission real local content and review before region-specific pages or hreflang clusters. French matters for Canadian reach; Greenlandic/Danish content may be needed for Greenland; Indian language priorities should follow audience evidence. The .org.uk domain retains a UK signal. A generic-domain migration needs a separate business decision and tested redirect/canonical/Search Console plan, not a rushed name change.

### 22. Measurement

Freeze a baseline before interpreting changes. Maintain a 30-URL cohort, a fixed set of 20 non-brand queries and 20 realistic AI questions, a release log and a weekly scorecard. Track GSC clicks/impressions/CTR/position, indexability, verified review coverage, organic useful actions, known AI referrals, qualified placements and observed citations. Segment country and device. Define useful actions as guide downloads, confirmed subscriptions and appropriate contact/resource clicks; distinguish donation clicks from completed donations. Record unavailable data as unavailable, never zero. Compare like periods and seasonality; attribution and AI observations remain incomplete.

## 90-day delivery sequence

| Period | Deliverables | Acceptance criteria |
|---|---|---|
| Days 1–14, 9–22 October | 30-URL audit, account/data baseline, fact register, priority review inventory | Evidence saved; key technical failures assigned; no invented baseline |
| Days 15–30, 23 October–7 November | First four improved guides, clear review claims, profile corrections, first resource draft | Real review/source records; source/rendered parity; accessible resource |
| Days 31–60, 8 November–7 December | Remaining eight pilot guides, first videos, partner-ready resource pack, survey pilot design | Quality gate passed; methods and consent ready before recruitment |
| Days 61–90, 8 December–6 January | One webinar, additional videos/stories, PR-ready asset, measured content decisions | Published work genuinely reviewed; actual outcomes reported; next-quarter priorities evidence-led |

Stretch activity depends on reviewer and contributor capacity. Do not substitute 50 unreviewed articles for 12 genuinely useful reviewed guides. Set traffic growth targets after the baseline; first-quarter delivery targets above are proposed, not completed results.

## Initial 30-URL audit cohort

Select actual URLs from the router/sitemap, not fabricated locations. Include the homepage; about, trust, governance, finances, editorial standards and claims policy; the six principal condition guides; exercise/diet/pain/fatigue/benefits/work pages; three useful resource pages; and the strongest existing blog guides according to impressions and review evidence. Resolve overlaps before finalising the exact list. The live homepage links can seed discovery; authenticated GSC should determine opportunity order.

## Decisions and dependencies

- Confirm reviewer time, existing credential evidence, verified service/charity facts and spending capacity.
- Use authenticated Search Console, Bing and analytics access to obtain baselines; no settings were changed during preparation of this plan.
- Confirm patient advisory participation and consent processes before stories or research recruitment.
- Repository changes need green checks and the established Lovable publish process. This document is not a deployment or an outreach authorisation.
- Treat “100 articles”, “1,000 responses”, “50 stories” and “first page” as possible later ambitions, never current public facts.

## Primary guidance consulted

1. Google AI search guidance: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
2. Google people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
3. Organisation markup: https://developers.google.com/search/docs/appearance/structured-data/organization
4. Author/profile markup: https://developers.google.com/search/docs/appearance/structured-data/profile-page
5. OpenAI publisher FAQ: https://help.openai.com/en/articles/12627856-publishers-and-developers-faq
6. Bing AI Performance: https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/
7. Google Business Profile eligibility: https://support.google.com/business/answer/13763036
8. Wikipedia organisation notability: https://en.wikipedia.org/wiki/Wikipedia:Notability_(organizations_and_companies)
9. Wikipedia conflicts of interest: https://en.wikipedia.org/wiki/Wikipedia:Conflict_of_interest
10. International search: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites

Scores, costs, delivery targets and the selected pilot size are this plan's estimates, not claims made by those sources.
