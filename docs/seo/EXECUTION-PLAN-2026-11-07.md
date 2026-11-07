# Technical SEO / AEO / GEO execution plan

Updated: 2026-11-07

## Completed

1. Priority route audit for PIP, hip replacement, supplements and exercise pages.
2. Prerender parity gate for H1, visible content, canonical, hreflang and JSON-LD.
3. CI validation for metadata length, brand identity, FAQ parity and invalid `speakable` placement.

## Current slice

The sitemap integrity gate validates both public XML sitemaps before deployment. It catches:

- duplicate URLs across sitemap files;
- non-HTTPS or non-canonical hosts;
- query strings, fragments and tracking-like paths;
- known redirect-source URLs;
- missing or empty sitemap documents.

## Next slices

1. Run the sitemap and internal-link gates against the generated build.
2. Review remaining priority-route failures, especially FAQ/HowTo parity and external-link attributes.
3. Improve internal linking between condition hubs, exercise programmes, benefits guidance and supplements content.
4. Add only clinically verified answer blocks, tables and FAQs where the source content supports them.
5. Re-run build, prerender, schema, link, security and performance checks before merge.

All content changes must preserve the Living With Arthritis brand string, British English, the verified Louis Maxwell clinician identity, and evidence-based UK clinical governance.
