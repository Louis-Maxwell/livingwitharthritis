# Audit implementation batch: official source links, 19 November 2026

## Scope
Source-link maintenance only across seven existing public articles, not substantive clinical rewrites or fresh clinical review. Original routes, dates, review metadata and clinical prose retained. The scope is the existing website implementation request, including the attributed 19 November reply to the delivered audit. This ledger records scope, not a new permission grant. No tracking, spend, service-page, dependency, restriction or sitemap changes.

## Verified replacements
- Old: https://www.nidirect.gov.uk/articles/disabled-facilities-grant
  Current equivalent: https://www.nidirect.gov.uk/articles/disabled-facilities-grants
- Old: https://www.mygov.scot/equipment-and-adaptations
  Current equivalent: https://www.mygov.scot/care-equipment-adapt-home/what-you-can-get
- Old: https://www.ramblers.org.uk/walking-for-health
  Current equivalent: https://www.ramblers.org.uk/go-walking/wellbeing-walks
- Old: https://www.nhs.uk/social-care-and-support/care-services-equipment-and-care-homes/household-equipment-to-help-you/
  Current equivalent: https://www.nhs.uk/social-care-and-support/care-services-equipment-and-care-homes/household-gadgets-and-equipment-to-make-life-easier/
- Old: https://www.cqc.org.uk/care-services/care-homes
  Current equivalent: https://www.cqc.org.uk/care-services/find-care-home
- Old: https://www.gov.uk/government/publications/nhs-entitlements-migrant-health-guide
  Current equivalent: https://www.gov.uk/guidance/nhs-entitlements-migrant-health-guide
- Old: https://www.buckshealthcare.nhs.uk/pifs/cauda-equina-syndrome/
  Current equivalent: https://www.royalfree.nhs.uk/patients-and-visitors/patient-information-leaflets/cauda-equina-syndrome

The old Ramblers path returned 403 to the local client, not repeatable proof of a 404. Its current Wellbeing Walks page was read and is the appropriate current service. The other six unique old destinations returned 404 on recheck. The migrant-health link also occurred in the unpublished, redirected arthritis-new-to-uk-guide archive. It is left unchanged because it is not a current served article. Royal Free London replaces the unavailable Bucks leaflet with a directly read NHS patient leaflet covering CES signs and immediate emergency assessment. Its publisher label changes accordingly. No replacement is a search-only inference.

## Rejected leads
All six supposedly missing descriptions were present in current raw production HTML when parsed as HTML. All contain apostrophes. No title or description changes were made. No sitemap removal: the later researcher correction says none of 29 known redirect stubs are in the live sitemap. Soft-404 causes and PIP cannibalisation remain unknown. Do not merge or remove pages from those classifications.

## Local verification
Prebuild, app/node types and full zero-warning lint passed. 224 test files, 1,309 tests passed across two shards after generation. An initial test pass before regenerating tracked artifacts failed on stale data, corrected by prebuild without source changes. Repeated local production build attempts stalled at chunk rendering within the execution window; no build error surfaced. Local reportCompressedSize modification restored. Hosted full build must pass before merge. Actual 390/1280 rendered pages and repaired links checked on all seven current articles with no overflow or page errors. Local dev preview used because local production rendering stalled. Representative Ramblers mobile and cauda equina desktop pixels inspected. Hosted build/postbuild, remote PR gates and publication still required.
