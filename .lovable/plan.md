## Goal

Add all 44 files from `github-upload-bundle_8.zip` into the project. Because Lovable ↔ GitHub sync is bidirectional and automatic, anything committed here appears on the connected GitHub repo within seconds — no separate "push to GitHub" step is required.

## How each file group is handled

### 1. Copy verbatim (safe, no conflicts) — 33 files
Docs, generated data, staging pages, new workflows — no live behaviour change.

- Root docs: `UPLOAD-README.md`, `DEPENDENCY-GRAPH-REPORT.md`, `FUNDRAISING-ROADMAP.md`, `GROWTH-PLAYBOOK.md`, `IMPLEMENTATION-ROADMAP.md`, `LEGAL-COMPLIANCE-CHECKLIST.md`, `MONTH-1-PLAN.md`, `PERFORMANCE-CHECKLIST.md`, `PETS-INTEGRATION-GUIDE.md`
- Root: `SECURITY.md` (in addition to existing `.github/SECURITY.md`, per bundle intent)
- Generated data: `src/data/keywords.generated.ts` (971 KB), `keywords.generated.json` (850 KB), `pets-arthritis.generated.ts`, `comparison-routes.generated.ts`, `glossary-routes.generated.ts`, `city-routes.generated.ts`
- Public data: `public/data/keywords-30000.json` (4.7 MB — stays as static asset, out of bundle), `public/llms-full.txt`
- Hooks: `src/hooks/useKeywords30k.ts`
- Staging pages (`.NEW.tsx` — intentionally NOT routed): `HomePage.NEW.tsx`, `CorporatePartnerships.NEW.tsx`, `TrustCredibility.NEW.tsx`, `PrivacyPolicy.NEW.tsx`, `PetsHub.NEW.tsx`, `PetArticle.NEW.tsx`
- Scripts: `scripts/generate-keywords.py`, `generate-keywords-30k.py`, `ai-head-data.json` (348 KB)
- GitHub: `.github/dependabot.yml`, `.github/workflows/regenerate-lockfile.yml`

### 2. Overwrite live config — 3 files (bundle is newer/expanded)

- `scripts/inject-canonicals.mjs` — bundle version (10 KB) is the v2 rewrite that injects visible static content per route; project has the earlier 2.8 KB version. Overwrite.
- `.github/workflows/ci.yml` — bundle version adds a step; overwrite.
- `index.html` — bundle version removes AI-crawler `noindex` and defers GA. **Risk:** this file has been edited by earlier Lovable sessions (head metadata rules, preconnects). I will merge rather than blanket-overwrite: apply the bundle's AI-crawler and GA changes on top of the current file, keeping existing preconnects, title/description, and JSON-LD hooks.

### 3. Do NOT overwrite — 1 file

- `public/_headers` — the project's version (2.9 KB) is larger and more complete than the bundle's (0.8 KB). Overwriting would drop live cache/security headers. **Skip.** If the user wants the bundle's immutable-asset rules merged in, I'll do that as a follow-up.

## What will NOT happen automatically

Per the bundle's own README, these need explicit follow-up work and are **out of scope for this import**:

- Renaming `*.NEW.tsx` → `*.tsx` and wiring routes (requires filling `TODO:` placeholders — charity number, ICO reg, etc.)
- Wiring the 30k-keyword hook into any dashboard
- Registering the 238 AI-head-data routes in the sitemap/prerender
- Filling the 9 `TODO:` values in `TrustCredibility.NEW.tsx`

I'll flag these in the closing message so you can decide when to activate them.

## Verification after import

1. Typecheck passes (auto-run by harness).
2. Spot-check that `.NEW.tsx` files are NOT imported anywhere (grep).
3. Confirm `index.html` still has current title/description/preconnects.
4. GitHub sync: the commit shows up on `main` within seconds of these edits landing.

## Technical notes

- Total size ~7 MB; the 4.7 MB `keywords-30000.json` sits in `public/data/` so it stays out of the JS bundle (loaded on-demand via the provided hook).
- No `package.json` changes — the bundle explicitly says its `package-overrides.json` is superseded and excluded.
- No `.git` directories in the archive (verified) — safe to copy.
