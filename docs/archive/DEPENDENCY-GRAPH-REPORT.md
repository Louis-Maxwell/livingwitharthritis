# Dependency Graph Fix Report — livingwitharthritis
SBOM: GitHub Dependency Graph export, 2026-07-03T22:39:27Z — 702 resolved packages

## Root cause
**The repo's `package-lock.json` is stale.** The project builds with Bun (binary `bun.lockb`,
which GitHub cannot parse), so GitHub's dependency graph and Dependabot audit an old
`package-lock.json` from before the dependency upgrades. package.json already specifies
jspdf 4.2.1 / vite 6.4.3 / jsdom 29 / vitest 4.1.9 with a full overrides block — the graph
still shows jspdf 2.5.1, vite 5.4.19, jsdom 20.0.3, vitest 3.2.4. The alerts are firing on
versions the app no longer uses at build time in Lovable.

## Findings
| Package | In graph | Verdict | Action |
|---|---|---|---|
| jspdf | 2.5.1 | VULNERABLE — all the critical jsPDF alerts (path traversal, HTML injection, object injection, ReDoS, DoS) apply to 2.x | Lockfile regen picks up 4.2.1 from package.json |
| dompurify | 2.5.9 | VULNERABLE — old 2.x line bundled by jspdf 2.5.1; multiple bypass advisories | Disappears when jspdf resolves to 4.2.1 |
| jsdom | 20.0.3 | VULNERABLE — the form-data/ws advisory chain flagged by Dependabot lives here | Lockfile regen picks up 29.x |
| vite | 5.4.19 | VULNERABLE — server.fs.deny bypass advisories; also mismatched with package.json 6.4.3 | Lockfile regen |
| vitest + @vitest/coverage-v8 | 3.2.4 | Mismatched (package.json 4.1.9); 3.2.4 clears the critical UI advisory but regen aligns it | Lockfile regen |
| rollup | 4.24.0 | Below the ^4.24.4 override; later 4.x advisories exist — take latest 4.x | Lockfile regen + bump override to latest 4.x |
| flatted | 3.3.1 | VULNERABLE — unbounded recursion DoS in parse(), fixed 3.3.2; override exists but lockfile predates it | Lockfile regen |
| picomatch | 2.3.1 + 4.0.4 | Old 2.3.1 copy remains (ReDoS via extglob quantifiers) | Lockfile regen applies the ^4 override to all copies |
| esbuild | 0.21.5 + 0.25.0 | VULNERABLE copy — 0.21.5 dev-server CORS advisory (GHSA-67mh-4wv8-2f99), fixed 0.25.0. NO override exists for it | ADD esbuild override (included below) |
| minimatch | 3.1.2 + 9.0.5 + 10.2.5 | Old 3.x copy remains; the 2026 GLOBSTAR ReDoS advisories flagged by Dependabot target the old copies | Lockfile regen + keep >=10 override |
| glob | 10.4.5 | Dependabot flagged the glob CLI command-injection advisory on the 10.x line | Bump override to latest 11.x (dev-only exposure) |
| marked | 18.0.0 | Slightly behind package.json ^18.0.5 (OOM-recursion fix line) | Lockfile regen |
| react-router / @remix-run/router | 6.30.1 / 1.23.0 | Behind package.json ^6.30.4 (open-redirect XSS line) | Lockfile regen |
| form-data | 4.0.5 | OK — patched | None |
| ws | 8.18.3 | OK — patched | None |
| lodash | 4.17.21 | OK — patched (both alerts fixed in 4.17.21) | None |
| braces/micromatch/cross-spawn/nanoid/semver/postcss | 3.0.3/4.0.8/7.0.6/3.3.11/7.7.2/8.5.6 | OK — all at or above patched versions | None |
| tough-cookie | 4.1.4 | OK — patched | None |

## The fix (one-time, ~5 minutes, no Lovable credits)
On any machine with Node 20+ and the repo cloned (or GitHub Codespaces — free tier works):
```bash
git pull
# 1. add the missing esbuild override (see below) to package.json
# 2. regenerate the npm lockfile WITHOUT touching node_modules or running scripts:
npm install --package-lock-only --ignore-scripts
git add package.json package-lock.json
git commit -m "fix: regenerate package-lock so dependency graph matches package.json"
git push
```
GitHub re-parses the lockfile within minutes; the dependency graph updates and the stale
alerts (jsPDF criticals, vite, jsdom, flatted, picomatch, minimatch, esbuild) auto-close.

## Overrides delta to add to package.json (merge into the existing overrides + resolutions)
```json
"esbuild": "^0.25.0",
"glob": "^11.1.0",
"rollup": "^4.52.0"
```
Note: `glob` and `rollup` fixed-version floors above are best-effort from advisory data —
if `npm install` reports an unsatisfiable peer range, fall back to the latest version npm
offers on the same major; both are build-time/dev-only exposure, not shipped to visitors.

## Alternative (zero local tooling)
If you cannot run npm anywhere: delete `package-lock.json` from the repo via the GitHub web
UI. GitHub will fall back to parsing `package.json` ranges for the graph — less precise
(no transitive pinning) but it stops Dependabot auditing fossil versions. Regenerating the
lockfile is strictly better; use deletion only as a last resort.

## Keeping it fixed
- `.github/dependabot.yml` (already in your upload bundle) opens weekly grouped update PRs.
- Add a CI guard so the lockfile can never drift silently again: in ci.yml, after checkout,
  run `npm install --package-lock-only --ignore-scripts && git diff --exit-code package-lock.json`
  — the build fails if the committed lockfile no longer matches package.json.