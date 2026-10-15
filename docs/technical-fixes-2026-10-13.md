# Crawl, metadata and conversion fixes — 13 October 2026

## Changes

- Keep mobile help navigation dismissed for the session, including when browser storage is blocked. Use React Router links to avoid reloading the document on internal guide navigation.
- Keep secure Open Graph image URLs consistent with the current page in runtime metadata and both fresh and retained static HTML.
- Mark internal search results `noindex,follow` in response HTML and the React page. Search is already excluded from the canonical sitemap; linked guides remain discoverable.
- Change static retired-URL fallback pages to `noindex,follow` for robots and Googlebot instead of suppressing destination-link discovery.
- Label homepage GoFundMe donation click events correctly. Do not count “Other ways to help” navigation as a donation click. These events measure clicks, not completed donations.
- Make the built-site audit fail on metadata/structure regressions and unresolved links, and run it in CI.
- Detach CI preview-server streams, fail when startup is unsuccessful, clean up servers, and bound browser-test job duration. This addresses jobs remaining in the server startup step.

## Local validation

- Production Vite bundle and all route HTML postprocessing completed.
- All 1,050 canonical sitemap pages audited in built response HTML: zero reported metadata, canonical, schema or H1 issues; zero unresolved-link pages.
- Internal-link check: 1,113 unique internal paths, no broken links.
- TypeScript checks passed.
- The full local suite passed: 705 Vitest tests across 113 files. Nine Node regression tests also passed.
- GitHub build, metadata/structure, internal links, SEO, lint, dependency security and integrity checks passed on the declaration-fix commit. Browser workflow changes require a fresh CI run.
- Changed workflow YAML and startup shell syntax validated.

This covers built response HTML and component behavior, not a measured improvement to live Core Web Vitals, rankings or donation completion.

## Live hosting limitations confirmed

Read-only HTTP probes confirmed that `/blog/mindfulness-meditation-chronic-pain` and `/arthritis-support/stockport` return HTTP 200 with redirect fallback HTML rather than HTTP 301/308. An unknown URL also returns HTTP 200 with homepage metadata rather than HTTP 404/410. The `www` origins also use HTTP 302 temporary redirects, rather than permanent 301/308 redirects. The repository already contains permanent redirect rules and a generated 404 document, but this Lovable host does not apply those response-status rules.

Publishing through Lovable is required to release the source changes. Configuring real redirect and missing-page status responses requires hosting control; changing HTML cannot set an HTTP response status. The repository publish-readiness workflow checks readiness and explicitly does not deploy. No live deployment or Search Console submission is claimed.
