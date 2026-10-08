# International search visibility — 8 October 2026

Target audiences: India, United States, Australia, Canada and Greenland.

## Implemented technical foundation

The existing English URL is the general English (`en`) catch-all and retains
`en-GB` and `x-default`. Browser-rendered metadata and static English HTML
both carry this signal, including the root and retained article snapshots.
No country-specific URLs or translations are invented. This supports English
readers in each target country; it does not guarantee rankings or reach readers
searching only in another language.

The existing `.org.uk` domain remains the canonical host. Google treats country
code domains as a strong geographic signal. Removing UK from page titles or
URL paths does not remove that domain signal. Consider a generic domain only
as a separately planned migration with redirects, canonical updates and Search
Console verification, preserving the current site's authority.

## Country content priorities

| Audience | Next content to commission | Language needs |
|---|---|---|
| India | Locally reviewed guide to accessing arthritis support and rehabilitation | English first; Hindi and other Indian languages according to measured demand |
| United States | Locally reviewed support guide explaining referral and insurance questions | English |
| Australia | Locally reviewed guide to arthritis support and healthcare access | English |
| Canada | Locally reviewed support guide distinguishing provincial pathways | English and professionally reviewed French |
| Greenland | Locally reviewed guide to finding local support and discussing access with a health professional | Greenlandic and Danish; English is a limited starting point |

Each page needs useful country-specific content, verified local sources,
links from the guides/support navigation, a unique title and description,
a self-referencing canonical and a real indexable URL in the sitemap. Only
publish language alternates when equivalent translated pages genuinely exist.
Do not duplicate a generic article five times with country names substituted,
claim local offices or clinicians, or describe UK benefits as available abroad.

## Measurement and release

1. Merge only after required repository checks pass, then follow the existing
   Lovable publish-readiness workflow and publish through Lovable.
2. Inspect the homepage and a condition/article URL in Search Console after
   publication. Verify rendered and source HTML canonical and alternate links.
3. Compare Search Console clicks, impressions, CTR and position by each of
   the five countries over comparable 28-day periods. Record the baseline
   before assessing impact; no analytics baseline was supplied for this change.
4. Prioritize content using actual country/query impressions and engagement.
   Secure relevant local editorial links through real partnerships.

Reference: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
