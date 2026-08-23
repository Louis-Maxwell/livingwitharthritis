# Verify the SEO/AEO metadata work

All four items from the last request are present in the code:

- `src/components/SeoDefaults.tsx` prunes static duplicates for `og:type`, `og:url`,
  `og:site_name`, `og:locale`, `og:image` (+ width/height/alt), `twitter:card`,
  `twitter:image`, `twitter:image:alt`.
- `src/components/SeoHead.tsx` resolves social images to absolute URLs, emits
  `og:image:alt` and `twitter:image:alt`, and uses the full indexable robots directive.
- `index.html` has no site-wide `article:*` / `reviewedBy` tags and no
  LocalBusiness/MedicalBusiness JSON-LD; Organization + WebSite schema remain, UK geo tags remain.
- `src/components/seo/AeoEnhancement.tsx` FAQ JSON-LD has `@id`, `url`, `inLanguage: en-GB`,
  and no nested SpeakableSpecification.

What is not yet verified is the rendered output, so this plan checks the shipped HTML rather
than the source.

## Verification steps

1. Run the production build and the prerender step so real page HTML exists in `dist/`.
2. Scan the prerendered HTML for duplicate tags: assert each page has exactly one
   `<title>`, one `description`, one canonical, and one of each managed `og:*` / `twitter:*` tag.
   Sample the homepage plus a condition page, a comparison page, a city page and a blog post.
3. Confirm every `og:image` / `twitter:image` value is an absolute `https://` URL.
4. Confirm no page ships `LocalBusiness`/`MedicalBusiness` JSON-LD and that FAQ blocks
   validate as `FAQPage` with `inLanguage: en-GB`.
5. Run the existing checks already in the repo: `scripts/check-social-meta.mjs`,
   `scripts/check-canonicals.mjs`, `scripts/check-prerender-meta.mjs`, `scripts/validate-jsonld.mjs`.
6. Load the live preview and read `document.head` after hydration to confirm Helmet's
   pruning actually removes the static fallbacks in the browser (source-level pruning only
   matters if it runs).
7. Report a short pass/fail table; fix anything that fails in the same pass.

## Technical notes

No behaviour changes are planned. If a check fails, the fix stays inside `SeoDefaults.tsx`,
`SeoHead.tsx`, `index.html`, or `AeoEnhancement.tsx` — no layout, colour, or navigation edits,
and the cookie-consent analytics work is left untouched.
