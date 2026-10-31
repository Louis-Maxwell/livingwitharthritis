# Enterprise SEO, AEO and GEO implementation plan

This document records the implementation contract for the Living With Arthritis visibility programme. It is intentionally staged: clinical, indexation and rendering changes must be validated before large-scale content changes.

## Release gates

Every production release affecting medical content must pass:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run seo:schema`
- `npm run seo:redirects`
- `npm run seo:ai-identity`
- `npm run links:check`
- `npm run test:a11y-smoke`
- `npm run test:dependency-security`

A medical page must have a named reviewer, HCPC/CSP or other verifiable credential where applicable, a visible review date, a next-review date, sources, red flags and the standard disclaimer. Build output must fail when any required field is missing.

## P0 implementation order

1. Generate a complete route inventory: status, canonical, indexability, sitemap membership, title, description, H1, schema and internal-link count.
2. Select one canonical page for each intent, starting with arthritis flare-ups.
3. Remove or repair conflicting clinical-review metadata and empty review dates.
4. Validate raw HTML and prerendered HTML for every indexable route.
5. Standardise MedicalWebPage, Article, Organisation, Person, BreadcrumbList and visible FAQ schema.
6. Audit medical claims against NHS, NICE, GOV.UK and primary research.
7. Add automated checks for broken links, redirect chains, orphan pages, duplicate titles and missing image dimensions.
8. Fix Core Web Vitals: LCP image delivery, CLS reservations, JavaScript route cost and unused third-party scripts.
9. Correct analytics events and mark only completed donations, downloads, sign-ups, tool completions and contact submissions as conversions.
10. Rebuild the ten priority topic pillars and link every supporting article to exactly one primary hub.

## Clinical content contract

Each medical page must show:

- Written by
- Clinically reviewed by
- Qualification and registration
- Last reviewed
- Next review due
- Sources
- Scope and limitations
- When to seek urgent help
- Medical disclaimer

Do not publish unsupported claims about supplements, medicine equivalence, cure, inflammation reduction or individual treatment outcomes. Use evidence labels: strong, moderate, limited, mixed or insufficient.

## Flare-up authority page

The canonical target is `/arthritis-flare-ups`. Supporting pages must link to it and must not compete with it for the same primary query. The page must contain:

- A direct answer in the opening paragraph
- Red-flag triage
- Heat, cold, rest and gentle movement guidance
- Medication safety wording
- NHS 111 and 999 escalation guidance
- A printable action plan
- Visible reviewer/date/source metadata
- MedicalWebPage, FAQPage and BreadcrumbList JSON-LD where applicable

## Measurement

Track:

- `newsletter_signup`
- `contact_submitted`
- `donation_started`
- `donation_completed`
- `pdf_download`
- `tool_started`
- `tool_completed`
- `outbound_nhs_click`
- `outbound_govuk_click`
- `outbound_nice_click`

Attach `page_type`, `content_cluster`, `condition`, `resource_type`, `review_status`, `cta_location` and `destination` parameters. Do not count scroll depth or duplicate enhanced-measurement events as primary conversions.

## Acceptance criteria

A change is ready for review only when:

- The affected route renders complete HTML without JavaScript.
- Canonical, sitemap and redirect behaviour agree.
- Schema is valid and describes visible content.
- Accessibility smoke tests pass.
- Medical claims have an identified source or are explicitly qualified.
- No existing published article is deleted without an explicit, separately approved migration.
- The change is isolated in a focused commit and accompanied by a test result.

## Next implementation batch

The next code batch should add the typed clinical-page validation and CI checks, then remediate the flare-up cluster. Large-scale title rewrites and new articles should follow those gates rather than precede them.
