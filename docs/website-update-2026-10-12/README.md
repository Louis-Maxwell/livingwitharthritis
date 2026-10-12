# Website update: 12 October 2026

Implemented wordmark-only branding; removed remaining decorative emoji from source; added explicit Claude search/user crawler permissions and made the HTML directory crawlable. Existing Google, Bing, OpenAI and Perplexity crawler allowances remain. Refreshed sitemap, local blog catalogue, search index and AI-readable content. Search rankings, indexing and AI citations are not guaranteed.

All 570 published blog guides use the shared article template with direct searchable text PDF download and print/save-PDF for diagrams and layout. Public pages using the shared footer expose print/save-PDF and a downloadable PDF directory of sitemap URLs. The directory lists URLs, not a combined export of every page. Images and interactive answers are not included in text exports. Print/save-PDF depends on device support. Non-public/account pages are excluded.

Added cauda equina education with original labelled schematic, NHS source links, prominent emergency escalation, accessible non-diagnostic questions, no safe score, and no questionnaire answer storage/transmission. Unexplained weight loss is treated separately from specific CES signs. New articles explicitly remain pending clinical review; no clinical approval was invented.

Added a 30/60/90-day inclusive arthritis and frailty plan for everyone, with targeted access considerations for Asian communities, Muslim women, refugees and asylum seekers. Proposed sessions/translations are labelled as plans, not existing services. No guarantee of prevention is offered.

Corrected broken exercise links in seven existing articles. Removed blanket clinical-review claims from fallback metadata and a misleading free-physiotherapy promise from the footer. Added site-footer disclaimer and safety links.

Validation: production build and typecheck passed; 15 blog metadata/image guards passed; six existing technical/growth regression tests passed; two CES questionnaire safety tests passed; ten dependency recursion security tests passed; 23 catalogue/host-redirect integrity checks passed after synchronising the generated metadata and two new redirect rules. Built response-HTML audit checked 1,050 URLs with no reported metadata/schema issues or unresolved link pages; internal-link checker passed. Browser visual QA and measured mobile CWV were not performed in this run.

Live hosting still needs attention: www variants returned 302 redirects, canonical origin redirected to a condition page, and an unknown URL returned 200. A deployment and fresh response-level verification are required. See live-foundations.json. Code-level redirects/404 assets already exist; actual response status is controlled by the host.

Legal risk cannot be eliminated by software or disclaimers. Outstanding professional review includes medical accuracy across the full content catalogue; privacy/cookie and donation terms; charity/service representations; accessibility; copyright permissions; safeguarding and insurance for any delivered service. Do not describe the website as lawsuit-proof or legally certified.

GitHub: auto-merge requested for all then-open non-draft PRs; #160 (Actions updates) merged after successful checks. Older draft PRs remain drafts and may overlap or conflict with newer changes. Required checks were preserved. No unrestricted rule admitting every future commit was installed.

Clinical sources: https://www.nhs.uk/conditions/back-pain/ and https://www.chesterfieldroyal.nhs.uk/all-services-and-wards/physiotherapy-services/musculoskeletal-and-rheumatology-services/cauda-equina
Search sources: https://developers.google.com/search/docs/appearance/ai-features and https://privacy.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
