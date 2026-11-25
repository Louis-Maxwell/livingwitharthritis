# Two glossary placeholders: source and release notes

17 November 2026. This is a bounded response to actual Search Console examples, not a claim that every exclusion is a fault or that Google will index a page.

## Routes

- `/glossary/sulfasalazine`
- `/glossary/raynauds`

Before this change, both routes returned home-page content in the first HTTP response. After JavaScript they displayed short placeholder copy, a generic July update date and an existing `noindex,nofollow`. Both were absent from the canonical sitemap.

This change adds concise NHS-backed definitions to the existing glossary source, shows their references and actual editorial update date, and explicitly says that an independent clinical review is still pending. The existing written-definition rules then include these routes in static HTML and the sitemap and render index/follow. It does not add a restriction, remove a page, or alter redirects. Other glossary entries and existing fallback behaviour are not changed.

A narrow precedence rule keeps these explicitly updated glossary definitions ahead of older seed answers. Without it, the generated body would be current but the static opening answer could still repeat stale wording. The rule applies only to glossary entries carrying the explicit pending-review note.

## Claim-to-source checks

### Sulfasalazine

- Prescription medicine, rheumatoid arthritis/inflammatory bowel disease uses, inflammation, common side effects, orange urine and laboratory monitoring: https://www.nhs.uk/medicines/sulfasalazine/about-sulfasalazine/ . NHS reviewed 5 March 2025, next review due 5 March 2028.
- One to three months before rheumatoid arthritis symptoms improve; discuss stopping with the doctor; it is not an immediate symptom-relief medicine: https://www.nhs.uk/medicines/sulfasalazine/common-questions-about-sulfasalazine/ . NHS reviewed 6 March 2025, next review due 5 March 2028.
- Individual monitoring plan rather than a universal schedule: https://sps.nhs.uk/monitorings/sulfasalazine-monitoring/ . Last updated 7 January 2026. This source explicitly says it is awaiting alignment with newer BSR guidance. No numerical test interval, dose or lab threshold is copied into the definition.

The replacement does not repeat the old seed answer's unqualified pregnancy-safety claim. It does not give a dosing schedule or instruct readers to change medicine.

### Raynaud's phenomenon

- Circulation, cold/stress triggers, colour changes and other symptoms, warmth measures and GP thresholds: https://www.nhs.uk/conditions/raynauds/ . Fetched 17 November 2026.
- Primary versus secondary disease context and urgent assessment for ulcers/tissue loss: https://www.rightdecisions.scot.nhs.uk/nhs-tayside-refguide/medicine/rheumatology/raynauds-phenomenon/ . NHS Tayside reviewed 1 May 2025; next review 27 May 2027.

The definition avoids diagnosing an autoimmune condition from symptoms or giving vasodilator doses.

## Deliberate boundaries

The sampled `/glossary/cfs`, `/glossary/dass-score` and `/glossary/stem-cell` placeholders are not relabelled or bulk-changed. The first two abbreviations need clear intended meaning before a source-checked replacement. This small change does not establish clinical approval or complete the glossary/library review.

`/research/grants` also differed between static and hydrated output. The hydrated offer of LWA seed grants has not been established from owner evidence. This change makes no funding assertion and does not hide the page.

## Verification

- TypeScript, zero-warning lint and production build pass.
- Full suite: 197 files and 1,213 tests pass.
- Both generated HTML documents contain their own definition, source links, correct canonical, 17 November editorial update and pending-review note. No inherited clinical reviewer or pregnancy-safety claim.
- Both routes are in the generated sitemap and their built/static and hydrated robots values are index/follow.
- Local 390px and 1280px rendering checked for both routes; no horizontal overflow. Source links and the pending-review note are visible.
- External analytics transport blocked during render checks. Local IndexNow step skipped because publication opt-in was not set.

These are candidate checks. Merge, host publication, independent production validation and any targeted submission must be recorded separately after they happen.
