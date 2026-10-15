# Dependency security status

Verified on 11 October 2026 against main commit `be699529b45e173d502fc464357094f5a1b02b9e`.

## Current findings

A fresh `npm audit --json` reports **0 vulnerabilities**: 0 critical, high,
moderate, low or informational findings. The audit includes development
and production dependencies (747 dependency entries reported by npm).
GitHub shows **0 open Dependabot alerts** (142 closed) and **0 open CodeQL
alerts on main** (68 closed). These are separate checks; a clean dependency
audit is not proof that application code has no undiscovered vulnerabilities.

This replaces the August report, whose summary contradicted its own table
and whose remaining-vulnerability counts no longer describe the repository.
No dependency upgrades were needed for the current npm advisory database.
The existing local braces security patch is retained and regression tested.

## Prevention

- Dependabot configuration checks npm packages and GitHub Actions weekly.
  Security fixes are grouped separately; routine minor/patch upgrades are
  grouped by runtime and tooling. Major upgrades remain separate PRs.
- The Security Audit check fails for any reported severity, including low.
- Weekly health checks audit production and development dependencies at all
  severities, rather than only high production findings.
- Existing CodeQL, Gitleaks and branch-protected review/check workflows remain
  in place. Dependency PRs must also keep npm and Bun lockfiles in sync.
- GitHub Secret Protection and push protection were enabled during this review.

## Reproduce

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm audit --audit-level=low
npm run test:dependency-security
```

GitHub security dashboards and npm advisories may change after this date.
Re-run the commands and inspect open alerts before relying on these counts.
