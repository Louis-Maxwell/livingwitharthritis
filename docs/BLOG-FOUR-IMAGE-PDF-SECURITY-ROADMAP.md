# Four-image blog template, downloadable articles and repository security

Baseline: 16 October 2026. Catalogue contains 692 published entries (recalculate before execution). This document is a plan, not evidence of completed migrations or resolved vulnerabilities.

## Source template
The supplied `vitamin_d_autism_blog (1).zip` contains `article.md`, SEO metadata and four SVG **placeholder** illustrations. The article uses introduction, explanatory sections, qualified evidence, UK guidance, practical actions, FAQs, conclusion, references and disclaimer. Do not publish placeholder SVGs as clinical images or copy generic images across unrelated posts.

## Required article presentation
1. Existing canonical slug and metadata, title, dated authorship and real review information (do not manufacture review).
2. Introduction and clear direct answer, meaningful H2/H3 sections, balanced evidence, practical UK-specific guidance, FAQs (when genuinely useful), conclusion, sources, and tailored disclaimer.
3. Exactly four meaningful, distinct images in the presentation: one existing unique cover plus three inline images. Each must be relevant to the specific article, sourced or commissioned with recorded licence/permission, photographer/source credit, accurate alt text, width/height, responsive srcset when available and lazy-loading below the fold. No medical image that implies unverified anatomy or diagnoses. Where four defensible images are unavailable, block article approval rather than inserting irrelevant images.
4. Existing PDF download button retained, improved to export the **full article**, headings, relevant images with alt/captions, sources, author/date, disclaimer and original URL. Include printable alternative. Test long pages, mobile, Unicode, page breaks and file size.
5. Citations tied to consequential claims, publisher/title/date/URL, checked for relevance and current guidance. Existing `citations` arrays are not proof of clinical verification.
6. No claim of clinician sign-off unless reviewed and dated.

## Existing code observations
- `src/pages/BlogPost.tsx` already renders a cover, chooses up to two body images via `pickArticleImages`, includes FAQs and references when present, and shows PDF/print controls.
- `src/components/BlogPdfDownload.tsx` currently extracts plain text and links; it does **not** export article images or a fully formatted article.
- `src/lib/blog/schema.ts` has citations but no image provenance array.
- `.github/dependabot.yml` already updates npm and GitHub Actions weekly.
- Security findings require scanning and verification, not assumptions based on package version strings.

## Implementation stages
### Stage A — Baseline and audit
Run non-destructive inventory for all published JSON files; identify missing citations, inline images, FAQs, disclaimers, review metadata and stale SEO. Record baseline performance and indexing. Classify medical-risk pages and licensing status.

### Stage B — Schema and media pipeline
Add optional backward-compatible `article_images` metadata for three inline images, with `src`, `alt`, `credit`, `licence`, `source_url`, `width`, `height`, `placement`. Verify image assets and licences; do not reuse covers as inline pictures. Keep existing cover uniqueness and generated catalogue invariants.

### Stage C — Shared rendering
Extend the existing shared editorial component; render one cover + three explicit, unique, approved body images at useful paragraph boundaries. Preserve existing links, headings, URLs and metadata. Avoid double rendering images embedded in legacy HTML. Use accessible captions and responsive lazy loading.

### Stage D — Download
Upgrade `BlogPdfDownload` to use a safe export route or client renderer that includes all article text, four images, source list, publication/review dates and disclaimer. Sanitize article HTML, prohibit remote active content, enforce image size and time limits, and use a print fallback.

### Stage E — Evidence and clinical quality
Create a claim-to-source checklist per article. Verify NHS/NICE/BNF/GOV.UK and suitable peer-reviewed sources where applicable. Ensure medication, red-flag and treatment advice receives appropriately qualified human review. Never auto-mark content as reviewed.

### Stage F — Batch rollout
Pilot five diverse articles. After review, proceed in batches: 1–50, 51–100, then groups of 50 through 651–692. Reconcile existing draft PRs before merging. For each batch require images, licences, citation relevance, SEO checks, PDF QA, accessibility, build and clinical/editorial approval. Track PR, deployment and rollback.

## GitHub and application security hardening
1. Inventory current GitHub code scanning, Dependabot alerts, dependency review, secret scanning, branch protection, environment permissions and open security PRs. Do not claim vulnerabilities fixed without alert IDs and test evidence.
2. Keep Dependabot; enable grouped updates with bounded PR volume and review all lockfile changes. Prioritize exploitable runtime vulnerabilities.
3. Add least-privilege GitHub Actions permissions (`contents: read` by default), pin third-party actions to full immutable commit SHAs after verifying provenance, restrict workflow triggers, avoid untrusted PR scripts with write tokens, and add concurrency controls.
4. Add read-only CI security gates: dependency audit, secret detection, CodeQL where supported, dependency review for PRs, and existing typecheck/lint/tests/build. Configure explicit exceptions with expiry and justification rather than bypassing gates.
5. Protect `main`: required checks, PR reviews, dismiss stale approvals, block force pushes and direct pushes; enable signed commits if supported. Settings require repository admin permissions.
6. Audit client PDF and HTML sanitisation for injection, unsafe URL protocols, memory exhaustion and malicious remote assets. Verify DOMPurify policy and security headers (CSP, HSTS, Referrer-Policy, X-Content-Type-Options).
7. Inventory and rotate exposed secrets via provider controls, do not store credentials in source or CI logs, scope deployment tokens and separate staging/production.
8. Add SBOM, licence review and reproducible build controls where feasible. Monitor Dependabot/CodeQL results and retest after patches.

## Definition of done
All catalogue articles render consistently, have four genuinely relevant rights-cleared images, complete accessible PDFs, accurate references and clinical review status, pass automated checks and editorial approval, and deploy without SEO or performance regressions. Security alerts are triaged with evidence of remediation, not merely hidden. Publish exact progress metrics per merged batch.
