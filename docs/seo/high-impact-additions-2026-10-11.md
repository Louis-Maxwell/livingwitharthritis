# High-impact SEO additions — 11 October 2026

Scope: source implementation in Louis-Maxwell/livingwitharthritis. Live publication is separate: the repository's publish-readiness workflow documents that Lovable Publish is required and does not deploy.

| Requested item | Implementation / result |
| --- | --- |
| IndexNow | Replaced fixed alias-prone list with canonical sitemap URL selection, deduplication, optional INDEXNOW_SINCE date filter, live key validation, 10,000-URL batches, timeouts and explicit rejection reporting. Explicit opt-in after publication prevents local builds announcing unpublished changes. |
| llms.txt | Existing discovery guide improved with neutral source attribution; /.well-known/llms.txt synchronized. Existing llms-full generator covers 195 condition/guide sections and 568 blog sections. These files do not force AI inclusion or citations. |
| humans.txt | Existing team, organisation, contact and standards file retained; no contributors or credentials invented. |
| Open Graph and X cards | Blog metadata already present. Author profiles now have complete OG/X titles, descriptions, images and alt metadata plus self-referencing canonical URLs. Removed a fabricated daily modification date. |
| Internal links | Blog reading journeys now render without a scroll gate; unmatched articles get a support/newly-diagnosed fallback. Every article receives a support-service link. First-response static blog HTML now includes support, guides and editorial-team links. Named, credential-matched Maxwell bylines link to the existing author profile. |
| Author pages | Existing /authors, /authors/maxwell and reviewer pages retained and strengthened; review-process copy now acknowledges pending-review content. |
| Topic hubs / pillars | Existing eight topic clusters retained: pain, osteoarthritis, exercises, diet, symptoms, treatments, flares and PIP. Existing condition and service pillars reused rather than duplicating them. |
| Local SEO | Existing city and regional hubs retained. City × condition doorway templates already redirect to city hubs. No invented branches, opening hours or local business addresses added. |
| Review schema | Deferred: this pass found no verified eligible review dataset. Clinical reviewedBy fields are not consumer Review ratings. Do not fabricate stars or add self-serving organisation rating markup. |
| FAQs | Existing visible FAQ rendering and schema retained. Google retired FAQ rich results in May 2026; FAQ content remains useful to readers. |
| Breadcrumbs | Existing static and runtime BreadcrumbList implementations retained. Author profiles already emit breadcrumbs. |
| HowTo | Existing step-based guide schemas retained. Google retired HowTo rich results in 2023; schema is not a promise of a rich snippet. |
| Images | Source image audit: zero critical issues and zero warnings for alt text, dimensions and layout sizing. Build mapped all 568 blog covers without generic OG fallback and enriched sitemap images. This is not a full visual assessment of every image or proof of optimal byte sizes. Existing filenames/references preserved to avoid broken assets. |
| Blog → service links | Added /arthritis-support to matched and unmatched articles and static first-response HTML; existing topic links continue to lead to relevant condition/guide hubs. |

## Validation and limitations

- Production build and TypeScript checks passed.
- Existing blog share/cover/head tests: 15 passed. Static article, review-status and visible-FAQ regression tests: 124 passed.
- New IndexNow tests cover filtering, deduplication, batching, live key failures and API rejections; all 3 passed with mocked HTTP responses. No actual IndexNow submission is claimed.
- Image source audit passed, 0 critical findings / 0 warnings.
- Built internal-link checker passed: 1,120 unique paths, no broken internal links.
- Static social-meta checker reports CityConditionPage.tsx because it does not recognize redirect-only pages; inspection confirms it redirects to the city hub or renders NotFound, so no extra social tags were injected into that redirect component.
- Browser JSON-LD validator could not run because its required Chromium binary is unavailable. Static/build checks do not replace browser schema validation.
- Publication and live IndexNow submission remain pending Lovable publication; GitHub commit is not a deployment.

## After publication

Run `INDEXNOW_DRY_RUN=1 node scripts/indexnow-ping.mjs` to inspect selected canonical URLs. Run `INDEXNOW=1 node scripts/indexnow-ping.mjs` only after the updated sitemap and pages are live. Set `INDEXNOW_SINCE=YYYY-MM-DD` to limit notifications to entries with a matching recent lastmod; omit to submit the sitemap inventory. HTTP 200/202 means accepted for processing, not indexed or ranked.

References:
- https://www.indexnow.org/documentation
- https://developers.google.com/search/updates (May and June 2026 FAQ retirement and llms.txt clarification)
- https://developers.google.com/search/blog/2023/08/howto-faq-changes
