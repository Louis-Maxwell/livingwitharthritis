# Technical SEO, AEO and GEO implementation matrix

Date: 7 November 2026  
Brand: Living With Arthritis  
Locale: en-GB  
Verified clinician: Louis Maxwell, HCPC PH128483

## Priority clusters

1. Benefits and PIP: `/guides/benefits-pip` and related PIP articles.
2. Hip replacement: `/blog/hip-replacement-arthritis-uk` and `/blog/hip-replacement-recovery-week-by-week`.
3. Exercise: knee, hip and ankle exercise routes, including HowTo parity.
4. Supplements: `/blog/best-supplements-arthritis-uk` and `/supplements`.

## Release gates

- Titles under 60 characters and distinct from the H1.
- Meta descriptions between 140 and 155 characters.
- The exact brand string is never followed by “UK”.
- FAQ schema exactly matches visible questions and answers.
- Exercise HowTo steps have visible names, instructions and durations.
- Canonicals are self-referential and tracking-free.
- Prerendered HTML contains H1, direct answer, main content and JSON-LD before hydration.
- Sitemap entries resolve to canonical, indexable URLs.
- Clinical claims use existing NICE, NHS or verified UK sources only.

## Implementation sequence

1. Add and run the priority metadata/FAQ audit.
2. Run prerendered static-vs-runtime parity checks.
3. Validate FAQ and HowTo graphs against visible content.
4. Audit canonical, hreflang, sitemap and external-link attributes.
5. Commit page-level copy and schema changes only after gates pass.
