# Unpublished technical SEO repair

Medical and benefits article wording was not rewritten. No publication,
deployment, hosting move or external search-console submission was performed.
The exact public brand is Living With Arthritis.

## Item-by-item outcome

1. **Structured data:** removed speakable from sitewide source graphs and
   introduced recursive static/runtime schema sanitation. Removed unsupported
   MedicalAudience/specialty properties and Article reviewedBy placement.
   Generated head checks parsed every JSON-LD block without errors. This is
   not a complete schema.org or Google Rich Results validation verdict.
2. **Speed:** lazy/deferred article footer loading, faster alias resolution,
   removal of guessed nonexistent WebP sibling requests, and duplicate source
   markup removal. Existing route splitting/font preload/image lazy loading
   were retained. The reported 675 slow pages have not been remeasured under
   Semrush conditions; no claim that their timings are fixed.
3. **Crawl failures:** generated metadata/content checks pass for the four
   supplied examples. Alias browser navigation was verified. The other 58
   affected URLs and public HTTP statuses require the full audit export and
   a later authorised deployment; they are not verified as repaired.
4. **Hreflang:** static English/default clusters deduplicate and self-reference;
   query-page annotations are suppressed; runtime query handling matches.
5. **Duplicates:** category-specific titles/descriptions remain in place;
   author/reviewer role metadata is differentiated; daily-living/health-tips
   pages now use distinct existing content, titles and headings.
6. **Sitemap:** removed the noncanonical knee exercise alias from both sitemap
   surfaces. Regeneration produced 1,001 sitemap entries and 527 image pages.
   Canonical catalogue assertions now allow redirects rather than requiring
   noncanonical URLs to reappear. All public 200 responses remain unverified.
7. **External links:** Threads and WhatsApp contact links are restricted to
   footer placement and nofollow/noopener protection. Browser checks found
   one wa.me contact link and one threads.com profile link per checked page.
   WhatsApp sharing uses a plain API share URL, not a third-party script.
   This does not eliminate external rate limiting or establish that all
   1,645 reported external failures are resolved.
8. **HTML bloat:** removed duplicated references; preserved complete article
   text and embedded article data needed by the first-load renderer. No
   complete text-to-HTML ratio improvement or SVG-bloat reduction is claimed.
9. **H1/title duplicates:** static article templates retain one H1; subordinate
   body H1s become H2s without changing words. Identical title/headline pairs
   receive a distinct search title. Runtime article rendering matches.
10. **Long titles:** all 1,029 generated route-head checks produced nonempty
    titles within 60 decoded characters. Search titles may lose the brand
    suffix to stay within the length limit; the trademark is never shortened.
11. **Missing H1:** generated checks found one H1 per tested route. Named
    daily-tip pages were repaired; supplied condition/city/article examples
    showed headings in the browser. This is not a full rendered-site H1 scan.
12. **Thin pages:** flagged for owner expansion, not filled with invented
    medical text and not newly noindexed. Generated body word counts include
    navigation: advocacy 386, Worcester 384, ask-the-physio 953, splints 501.
    These counts do not prove substantive editorial completeness. The other
    affected URLs need the full list. Existing /buddy noindex policy remains.
13. **Internal UTMs:** cleaned ClinicPack internal page links and PIP diary
    navigation. Printed QR attribution URLs remain intentionally tagged;
    canonical/share helpers strip query strings and fragments.
14. **City crawl blocks:** robots permits general crawling. Current explicit
    route-noindex data contains 16 city routes; existing policy describes
    near-duplicate templates. No policy was reversed. The reported 93 blocked
    URLs cannot be reconciled without their exact list and scanner evidence.
15. **Discovery:** added existing daily-tip pages to the guides hub and the
    exercise campaign to the exercise hub. Existing catalogue hub links were
    retained. /buddy remains a paused/noindex route, not newly promoted.
16. **Real redirects:** added/synchronised four exact rules in public/_redirects
    and verified client alias navigation. Current hosting does not execute
    Netlify-format rules. Meta-refresh/static redirect stubs remain a fallback;
    true HTTP 301s are NOT implemented on this host. Hosting-level support is
    required; no unauthorised hosting change was made.

## Social previews and sharing

Static head finalisation supplies singular per-route OG/Twitter/canonical tags
using existing metadata, including retained snapshots and city documents.
Blog routes use article type. Existing cover image mappings are preserved;
pages without a specific image retain the existing generic site share image,
so unique route imagery is not guaranteed. No images were invented or generated.
The named aliases redirect to the destination rather than publishing duplicate
articles. Accurate alias HTTP status remains a hosting limitation.

Facebook, WhatsApp, Pinterest, LinkedIn, X and copy link are available on blog
and guide-family pages. Existing email/native sharing remains. No social
tracking scripts were introduced. Copy link and all requested link targets
were verified on a real blog and knee guide. Phone/desktop screenshots were
inspected; phone buttons were stacked to prevent text overlap. No runtime
errors or horizontal page overflow were observed in these checks.

## Verification and remaining gates

- Latest preview build log: build OK.
- Focused SEO tests: 86/86 passed; native static SEO tests: 8/8 passed.
- Dependency security tests: 30 passed, one skipped, none failed.
- Initial full suite: 909 passed, 12 failed. Catalogue/canonical and title
  assertions were corrected and passed focused reruns. Head-data and article
  timing tests passed independently. Sharing test expected the old Twitter
  label; updated for X plus Pinterest/LinkedIn.
- Five backend-removal assertions conflict with existing restored integration
  files/dependencies. They remain unresolved rather than weakened or bypassed.
- A complete full-suite rerun and production artifact verification have not
  been completed. Generated-source checks do not verify served build output.
- No fresh Semrush scan or full affected-URL export was available. Original
  reported counts are not represented as current passing scanner results.

## Files changed

Shared rules: src/lib/technicalSeo.mjs, technicalSeo.d.mts, seoMeta.ts,
rootOrganizationSchema.ts, seoRedirects.ts, index.html.

Static pipeline: scripts/lib/technical-head.mjs, meta-lengths.mjs,
english-alternates.mjs; scripts/inject-canonicals.mjs,
static-article-html.mjs, route-head-fallback.mjs,
generate-editorial-head-data.ts, write-city-hub-html.mjs.

Page controls: src/components/SocialShareButtons.tsx, PageShareButtons.tsx,
SocialLinks.tsx, Footer.tsx, HelplineWidget.tsx, landing/ContactSection.tsx,
SeoHead.tsx, SeoDefaults.tsx, SeoRedirectGate.tsx,
ui/OptimizedImage.tsx; src/pages/BlogPost.tsx, AuthorProfile.tsx,
DailyTipDetail.tsx, resources/ClinicPack.tsx, resources/PipEvidenceDiary.tsx;
src/data/hub-spotlight.json.

Generated outputs: editorial-head-data.json, public/sitemap.xml,
sitemap-index.xml, sitemap-images.xml, public/_redirects,
src/data/blog-slugs.generated.json, prerender-routes.generated.json.

Regression files: technicalSeo.test.ts, seo-redirects.test.ts,
static-blog-html.test.ts, blog-catalog-integrity.test.ts,
guide-orphans.test.ts, BlogPost.share-buttons.test.tsx,
scripts/tests/semrush-repair.test.mjs. Project guidance: AGENTS.md,
roadmap.md and this report. Exact brand/preservation preferences saved in
project memory. GuideLayout was touched during placement work but its
temporary share-control placement was removed to avoid duplication.