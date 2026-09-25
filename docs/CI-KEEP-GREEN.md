# CI keep-green (Grok Bot owns this)

**Dependabot is off.** Dependency bumps and CI-break fixes are owned by **Grok Bot**, not Dependabot. Upgrades are handled manually when CI fails or security needs demand it. Do not restore Dependabot.

## Honest limit

**We cannot guarantee the site will never break.** Keep-green and required checks raise the cost of shipping known classes of breakage; they do not prove every page, publish path, or third-party tool is forever safe. Lovable edits, dual lockfiles, skipped publishes, and new bug classes can still go red or ship wrong.

## Required status checks on `main`

These must pass before merges land on `main` (strict: branch up to date):

- `Keep green (integrity)` — fast integrity gate (this doc)
- `build-and-audit`
- `ESLint`
- `Build Check`
- `Blog smoke (Playwright, must pass)`
- `Vitest (unit + a11y)`
- `Scan for leaked secrets`
- `analyze (javascript-typescript)`

## Advisory (not required)

- **Lighthouse** — performance budget workflow is advisory (`continue-on-error`); regressions are noted but do not block `main`.
- Deploy / Vercel / Supabase Preview — not required gates (and backends must stay removed).

When CI goes red on a required check, fix it (or roll back) before treating `main` as green again. **Grok Bot watches red CI** — do not create Dependabot to “fix” alerts.

## What `Keep green (integrity)` runs

Workflow: `.github/workflows/keep-green.yml` (job name = check context).

On push/PR to `main`, Node **20**, `npm ci` only:

1. **Lockfile guard** — `scripts/check-lockfile-ci.mjs` fails if `package-lock.json` is missing. CI truth is `npm ci`. `bun.lock` may exist for local/Lovable but must not replace the npm lock as CI source of truth.
2. **Typecheck** — `tsc --noEmit` (included while the tree stays clean enough; if it becomes too noisy, skip in the workflow and note here).
3. **Integrity Vitest slices** (must fail the job):
   - `no-removed-backends` — no supabase / vercel / wrangler / `@supabase` resurrection
   - `blog-catalog-integrity`
   - soft-404 / redirect safety (`seo-build-safety`, `host-redirects`, `seo-redirects`)
   - `seo-identity`
   - `social-media` — Facebook URL must remain `profile.php?id=61583723925315`

## Known failure modes (not exhaustive)

| Failure mode | Why it hurts |
| --- | --- |
| Lovable (or a human) re-adds Supabase / Vercel / Wrangler | Restores removed backends; `no-removed-backends` should go red |
| Dual lockfile drift (`bun.lock` vs `package-lock.json`) | CI and local install different trees; keep-green enforces `npm ci` + committed `package-lock.json` |
| Wrong Facebook vanity URL | Breaks charity social identity; social-media slice fails |
| Catalog / soft-404 / SEO identity regressions | Broken blogs, soft 404s, wrong AI/site identity |
| Skipping required checks / force-merge | Defeats keep-green; do not bypass without Louis asking |

## Node version

Pinned in `.nvmrc` (`20`); every workflow uses `node-version-file: .nvmrc`, and `package.json` `engines` is `>=20`.

## Deploy

Nothing in GitHub Actions deploys the site. Louis publishes from Lovable. `publish-readiness.yml` ("Publish readiness (Lovable)") only reports whether a `main` commit passed every gate ("SAFE TO PUBLISH"). The old `deploy-to-lovable.yml` curl step (404, false green) was retired. See `docs/NEVER-BREAKS-PLAN.md`.

## Code review bots
- **Use Grok Bot** for review and CI break fixes.
- **Do not use CodeRabbit AI.** `.coderabbit.yaml` disables auto-review; uninstall the CodeRabbit GitHub App from the repo so `coderabbitai[bot]` stops commenting.
- **Do not use Dependabot PRs** (removed); Grok Bot owns dependency triage.
