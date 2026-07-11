## Goal
Merge the contents of `github-upload-bundle_10.zip` into the project at their bundled paths. Lovable's GitHub sync will then push the changes to your connected repo automatically — I can't `git push` directly.

## What's in the bundle (54 files, no `.git` metadata)
- **Root docs** (14): `SECURITY.md`, `UPLOAD-README.md`, `GROWTH-PLAYBOOK.md`, `FUNDRAISING-ROADMAP.md`, `LEGAL-COMPLIANCE-CHECKLIST.md`, `WORKSPACE-FEEDBACK-REPORT.md`, `BUG-FIX-REPORT-2026-07.md`, `FRASE-REPORT-FIX-STATUS.md`, `IMPLEMENTATION-ROADMAP.md`, `PERFORMANCE-CHECKLIST.md`, `MONTH-1-PLAN.md`, `PETS-INTEGRATION-GUIDE.md`, `DEPENDENCY-GRAPH-REPORT.md`, `SECTOR-AUTHORITY-PLAN.md`, `PHASE-1-STATUS.md`, `KEYWORD-EXPANSION-AND-VULN-FIX-GUIDE.md`
- **`index.html`** — replaces live one (removes AI-crawler noindex, defers GA, minifies JSON-LD)
- **`scripts/`**: `generate-sitemap.mjs`, `generate-keywords-30k.py`, `generate-keywords.py`, `faq-schema-helper.mjs`, `ai-head-data.json`, `inject-canonicals.mjs`
- **`src/components/`** (2 `.NEW`): `SEOHead.NEW.tsx`, `FAQSection.NEW.tsx`
- **`src/hooks/`**: `useKeywords40k.ts`, `useKeywords30k.ts`
- **`src/data/`**: `keywords-paid.generated.ts`, `article-scaffolds.generated.ts`, `pets-arthritis.generated.ts`, `comparison-routes.generated.ts`, `glossary-routes.generated.ts`, `keywords.generated.json`, `city-routes.generated.ts`, `keywords.generated.ts`
- **`src/pages/`** (9 `.NEW`): `KeywordStrategyV2.NEW.tsx`, `PetsHub.NEW.tsx`, `PressMedia.NEW.tsx`, `PetArticle.NEW.tsx`, `CorporatePartnerships.NEW.tsx`, `TrustCredibility.NEW.tsx`, `TermsOfService.NEW.tsx`, `HomePage.NEW.tsx`, `PrivacyPolicy.NEW.tsx`
- **`public/`**: `sitemap-generated.xml`, `_headers`, `data/keywords-40000.json`, `data/keywords-30000.json`, `llms-full.txt`
- **`docs/EDGE-FUNCTION-RATE-LIMITING.md`**
- **`.github/`**: `dependabot.yml`, `workflows/ci.yml`, `workflows/codeql-scan.yml`, `workflows/regenerate-lockfile.yml`

## Approach
1. Copy every file from `/tmp/bundle/` into the repo at the same relative path, overwriting existing files where they collide (e.g. `index.html`, `SECURITY.md`, `public/_headers`, `.github/workflows/*`, several `scripts/*`, all the `src/data/*.generated.*`, the two `src/hooks/useKeywords*` files, and the root markdown reports).
2. Leave the 11 `*.NEW.tsx` files as `.NEW` per the bundle README — they contain `TODO:` placeholders and are meant to be renamed only after you fill them in. No route wiring, no imports added.
3. Do **not** copy any `.git` metadata (bundle contains none — verified).
4. Do **not** run `git` commands. Once files land, Lovable's GitHub sync pushes them to `github.com/Louis-Maxwell/livingwitharthritis` on its normal cadence.
5. Run the typecheck after copying to catch any breakage from the new `.generated.ts` / hook files (`.NEW.tsx` files aren't imported so they can't break the build).

## Not doing
- Not renaming any `.NEW.tsx` into a live route — they need your `TODO:` fills first (charity/ICO numbers, reviewer credentials, etc.).
- Not modifying `package.json` — bundle README explicitly says the old `package-overrides.json` should be discarded and isn't included.
- Not touching Supabase-generated files or `.env`.

## Risk notes
- `index.html` overwrite is meaningful — it changes crawler directives and analytics loading. If you'd rather diff first before I apply it, say so and I'll skip just that file.
- `public/data/keywords-30000.json` and `keywords-40000.json` are large static assets (multi-MB) served from `/public`; they're already gated behind lazy-load hooks so they won't hit the JS bundle.
- Overwriting `.github/workflows/*.yml` will change what CI runs on the next push — expected per the bundle's intent, flagging so it's not a surprise.
