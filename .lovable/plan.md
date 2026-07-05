## Import bundle 9 (v10 additions) into the project

Lovable ↔ GitHub sync is automatic, so committing these into the project publishes them to `Louis-Maxwell/livingwitharthritis` within seconds — no separate GitHub step.

### Files to add (net-new)

| File | Notes |
|---|---|
| `public/data/keywords-40000.json` | 6.8 MB static asset (39,928 keywords). Served on-demand, kept out of the JS bundle. |
| `src/hooks/useKeywords40k.ts` | Lazy-load hook mirroring existing `useKeywords30k.ts`. |
| `src/data/keywords-paid.generated.ts` | 50 Ad Grants (paid) keywords mapped to conversion pages. |
| `src/data/article-scaffolds.generated.ts` | 25 topic stubs. Intentionally **not** routed — needs clinical review. |
| `scripts/faq-schema-helper.mjs` | FAQPage JSON-LD helper that refuses placeholder text. |
| `.github/workflows/codeql-scan.yml` | New free GitHub-native code vulnerability scan. |
| `src/pages/KeywordStrategyV2.NEW.tsx` | Staging admin page (`.NEW.tsx`), deliberately **not** wired into the router. |

### Files to overwrite

- `.github/workflows/ci.yml` — bundle version renames the job to match the live `build-and-audit` required check, replaces the blind `sleep 3` with a readiness poll, and adds a 5-minute timeout (fixes the 20-min hang the bundle notes).

### Files intentionally skipped

- `public/data/keywords-30000.json`, `src/data/keywords.generated.*`, `src/hooks/useKeywords30k.ts`, pets/glossary/comparison/city generated data, `.NEW.tsx` pages other than `KeywordStrategyV2`, all v1–v9 docs — already present in the project (verified).
- `public/_headers` — project's live version is larger/more complete than the bundle's; do not overwrite (same rule applied in earlier bundles).
- `index.html` — do not blanket-overwrite; project version already has the AI-crawler and GA changes plus later edits (title, preconnects, JSON-LD hooks).
- `scripts/inject-canonicals.mjs`, `scripts/ai-head-data.json`, `scripts/generate-keywords*.py`, `SECURITY.md`, `.github/dependabot.yml`, `.github/workflows/regenerate-lockfile.yml` — already imported in prior bundles; not re-copied unless newer content is detectable (none of these changed in v10).

### Not done automatically (out of scope for this import)

Per the bundle's own README:
- Renaming `KeywordStrategyV2.NEW.tsx` → real route and wiring it into `App.tsx` / admin nav.
- Wiring `useKeywords40k` or the paid-keywords dataset into any dashboard.
- Turning `article-scaffolds.generated.ts` stubs into real articles (needs clinical review).
- Filling any remaining `TODO:` values in earlier `.NEW.tsx` pages.

I'll flag these in the closing message so you can decide when to activate them.

### Verification after import

1. Typecheck passes (auto-run by the harness).
2. Grep confirms `KeywordStrategyV2.NEW.tsx` is not imported anywhere.
3. `.github/workflows/ci.yml` diff shows the job-name + timeout change only.
4. GitHub sync surfaces the commit on `main` within seconds.
