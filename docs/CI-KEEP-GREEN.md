# CI keep-green (Grok Bot owns this)

**Dependabot is off.** Dependency bumps and CI-break fixes are owned by **Grok Bot**, not Dependabot. Upgrades are handled manually when CI fails or security needs demand it.

## Required status checks on `main`

These must pass before merges land on `main` (strict: branch up to date):

- `build-and-audit`
- `ESLint`
- `Build Check`
- `Blog smoke (Playwright, must pass)`
- `Vitest (unit + a11y)`
- `Scan for leaked secrets`
- `analyze (javascript-typescript)`

## Advisory (not required)

- **Lighthouse** — performance budget workflow is advisory (`continue-on-error`); regressions are noted but do not block `main`.
- Deploy / Vercel / Supabase Preview — not required gates.

When CI goes red on a required check, fix it (or roll back) before treating `main` as green again.
