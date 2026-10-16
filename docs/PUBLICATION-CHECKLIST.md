# Publication checklist and rollback

Do **not** publish until every gate below is ticked by a named person.
Nothing in this repo marks a guide clinically reviewed automatically.

## 1. Automated gates (must all pass)

- [ ] `bunx vitest run` — all unit tests pass (no skips added).
- [ ] `npm run build` — production build succeeds (prebuild regenerates catalogues).
- [ ] `bunx playwright test e2e/blog-browse.spec.ts e2e/blog-smoke.spec.ts`
      against a running preview (`PLAYWRIGHT_BASE_URL=...`): search + zero
      results, category filter, sort, article render, cover loads, PDF
      download, internal links, mobile overflow, console errors.
- [ ] `node scripts/validate-ai-identity.mjs` passes.
- [ ] `bun run scripts/audit-blog-editorial.ts` re-run; the
      `reviewClaimUnsupported` count is **0**.

## 2. Human clinical gates

- [ ] Every guide changed since the last release has been read by a
      qualified clinician (currently only Louis Maxwell, HCPC PH128483, is
      verified). Record name + date in the guide (`reviewed_by`,
      `last_reviewed`) only after they have actually read it.
- [ ] Work through `docs/audits/editorial-qa.json` from the highest
      `priority`. Risk flags (medication, supplementDose, quantifiedClaim,
      cureLanguage, pregnancy, redFlag) are pointers, not verdicts — e.g.
      "there is no cure" also trips `cureLanguage`, and the shared 999/111
      safety line trips `redFlag`.
- [ ] Guides with no citations (`noCitations`) are either sourced from real
      NHS/NICE/primary evidence, or stay visibly "pending review".
- [ ] No unreviewed guide is presented as reviewed.

## 3. Images and licences

- [ ] `docs/audits/blog-asset-provenance.json`: any new picture has a full
      record in `public/openverse/ATTRIBUTION.json` (creator, licence,
      licence URL, source URL) or is the charity's own photo.
- [ ] Candidates listed in the audit are checked by a person for real
      relevance before being used. Never pad a guide with unrelated stock.

## 4. SEO safety

- [ ] No slug renamed; canonical URLs unchanged (`/blog/<slug>`).
- [ ] Sitemap count did not drop by more than 5% (enforced by
      `assertSafeBlogInventory`).

## 5. Publish

A human clicks Publish in Lovable after the gates above. GitHub pushes must
start from the latest synced version — older pushes have undone fixes before.

## Rollback

1. In Lovable, open **History**, pick the last known-good version and
   restore it, then Publish again. This puts the previous site back live.
2. If the bad change came from GitHub, revert the commit on `main`
   (`git revert <sha>`) and push; Lovable syncs it back.
3. Re-run the automated gates on the restored version.
4. Database rows are not touched by publishing, so no data rollback is
   needed for content-only releases.
