# Living With Arthritis — 692-article remediation execution

## Running without Lovable credits

From the repository root run `node scripts/audit-catalog-remediation.mjs` (Node 22+). This creates a JSON/CSV per-article inventory and a summary in `docs/audits/`. The GitHub Actions **Blog remediation inventory** workflow can be run manually and provides the reports as downloadable artifacts. No API keys, Lovable credits, or database required.

## Interpretation

The source catalogue is authoritative; the number of published posts may differ from the earlier 692 figure. Counts are recalculated every run. Image HTML counts do **not** prove image relevance, ownership or loading. A source entry does **not** prove the referenced claim is supported. A recorded reviewer/date does **not** prove a review was performed. These require evidence.

## Batch process

1. Start with the first 50 highest-scored published articles from the manifest. Save rights evidence (source, creator, licence, permitted use, attribution) for one cover plus 2–3 distinct topic-relevant inline images. Do not use unrelated stock imagery to fill gaps.
2. Review important claims against primary clinical guidance and attach claim-specific citations. Escalate medication, pregnancy, emergency symptoms and other high-risk claims for qualified human clinical review. Never invent reviewer sign-off.
3. Record reviewer, credentials, date, change log and evidence only after actual review. Preserve article slugs, canonical URLs and search metadata.
4. Verify the shared PDF download button and downloadable content for each batch. The current main-branch PDF export is **text only**; image-inclusive PDF is a separate enhancement.
5. Test mobile/desktop rendering, keyboard navigation, links, images, PDF downloads, console errors, accessibility and SEO. Fix failures before release.
6. Repeat in batches of 50. Re-run the inventory after each batch and compare blocker counts.

## Release gates

- Required clinical review and licence evidence actually obtained.
- Article content checks and high-risk escalation complete.
- Production build, typecheck, tests and browser smoke checks passing.
- All relevant GitHub PR conflicts resolved; no bypass of security checks.
- Site backup/rollback plan available; publish only reviewed changes.
- Verify production pages and downloads after publication.

## Known limitations

The audit is intentionally read-only and does not modify articles. It does not fetch copyrighted photos, certify clinical content, validate licence ownership, or publish the site. The `pdf_button_expected_from_shared_blogpost` field describes the shared template; `pdf_download_browser_verified` stays false until tested. This workflow is separate from Lovable and does not claim its unmerged commits are on GitHub main.
