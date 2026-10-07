# Independent brand enhancement — 7 October 2026

Use Living With Arthritis and livingwitharthritis.org.uk as the publisher identity. Do not add the registered-mark symbol without verification. The existing arthritis-uk-title-guard and seo-identity regression suites protect title, organisation and AI identity fields; legitimate clinical source citations remain available to readers. Branding checks are not trademark clearance.

## Measurement contract

| Requested outcome/action | Implemented canonical event | Key-event policy |
| --- | --- | --- |
| Confirmed newsletter subscriber | newsletter_signup | Yes after provider confirmation; inbox delivery is newsletter_submit |
| Accepted contact enquiry | generate_lead, lead_type=contact | Yes after backend acceptance; mailto is email_click |
| Resource/guide download | file_download | Secondary key event as requested; segment source/file type, avoid duplicate resource_download/guide_download aliases |
| Video finished | video_complete | Secondary key event as requested; one completion event, not duplicate video_completed |
| Donation handoff | donation_click | Secondary key event as requested; not verified income |
| Verified donation | purchase | Verified provider transaction, deduplicated transaction_id |
| Email/telephone link | email_click / phone_click | Secondary key events as requested; never include addresses, phone numbers or message bodies |
| Sharing | social_share | Secondary key event as requested; report method/action; opening a platform dialogue is not a confirmed posted share |
| Article scroll | content_scroll, percent_scrolled=25/50/75/90 | Engagement |
| Active reading | content_engagement and existing duration milestones | Secondary engagement; GA4 engaged sessions and returning visitors remain native metrics |

Central consent/privacy filtering applies to every custom event. Disable overlapping enhanced measurement per stream only after account configuration review. Generated downloads and ordinary file links need separate QA before enabling both manual and enhanced file tracking. Do not create sensitive health audiences from queries, conditions or visitor health classifications. Content-topic performance can use public canonical page grouping without profiling individual diagnoses.

## Search and schema acceptance

Aim for every intended public canonical guide to be technically indexable and accurately represented; exclude private, redirected, duplicate and nonexistent URLs. Google determines inclusion: 100% actual indexing cannot be guaranteed. Check complete GSC export categories, not only sitemap totals. Mobile task testing and CWV replace reliance on the retired Mobile Usability report.

Use Article/BlogPosting only for actual articles; MedicalWebPage for genuinely medical education; WebPage for benefits/contact/fundraising utilities; one shared Organisation/WebSite identity and accurate breadcrumbs. FAQPage reflects visible questions and answers but Google retired FAQ rich results in May 2026. Schema does not guarantee rich results, AI inclusion or higher CTR. Author/reviewer credentials, dates, video upload dates and images must reflect real evidence.

## Content and internal links

The six Tier 1 topics now link from the guides hub to existing canonical pages, avoiding duplicate articles. Use answer-first summaries, task-specific headings, evidence and limitations, safety/escalation guidance when relevant, genuine authorship/review and three-to-five key takeaways. Treatment/exercise headings are appropriate only when the article actually covers them; do not force a condition template onto legal or nutrition resources.

Prioritise current impression/position evidence before speculative demand. The 1,000-impression/3%-CTR rule is a candidate filter: compare country, device, intent, brand/nonbrand and position over matching periods. Never add numbered exercises or “clinically recommended” claims unless the content and genuine review support them. Prefer research-based Vitamin D titles over universal testing/treatment promises; commission pharmacy review of the existing vitamin-d-arthritis-uk article.

Use relevant contextual links plus topic-navigation links. Five-to-ten is an editorial guide, not a ranking requirement; do not link every article to all ten topics. Maintain existing psoriatic arthritis, strength, weight, joint-health and Vitamin D canonical pages rather than creating parallel intent pages.

## Performance and executive dashboard

Retain lazy loading for below-the-fold media; do not lazy-load the actual LCP hero. Verify CDN/cache behaviour on the real host before changing settings. Targets are field p75 LCP <=2.5s, CLS <=0.1 and INP <=200ms across enough valid samples. Minification/compression alone is not proof of field improvement.

Looker Studio configuration is specified in dashboard-spec.json. It is not connected or published by this branch. GA4 and Search Console need property access and a verified link; Bing needs its own verified property and authorised API/export connection. Keep separate source panels where joining dimensions would multiply totals. Show refresh timestamps and no-data states. Automated full-site schema, link, privacy and brand tests remain release requirements.

Sources: https://developers.google.com/search/updates ; https://support.google.com/analytics/answer/9216061 ; https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

## Release follow-through

The earlier PR's main CI, schema, Lighthouse, blog smoke and route smoke checks passed. Three donation E2E expectations needed updating to the accurate external GoFundMe handoff; those are corrected in this revision. Current main's approved/pending article updates are retained and generated review/sitemap files are regenerated together.

Compatible lockfile updates eliminate the critical proxy-addr finding. On 7 October, the post-update npm audit still reports 12 findings (8 high, 4 moderate; production-labelled dependency tree 5 high, 2 moderate). The remaining chains involve Tailwind's braces/micromatch/chokidar/PostCSS tooling and the prerender plugin; no blanket audit suppression or forced major upgrade is applied. Security CI can therefore remain blocked until an appropriately tested tooling migration resolves those chains. Regenerate both lockfiles consistently and repeat the security audit at release.
