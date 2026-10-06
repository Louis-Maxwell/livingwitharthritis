# Security review — 6 October 2026

## Changes
- Removed Gitleaks exclusions for .env, .env.local and .lovable. Accidentally committed secrets in these paths are now eligible for detection, including history scanned by the existing workflow.
- Added weekly Dependabot updates for npm dependencies and GitHub Actions.
- Selected Node 24 in .nvmrc. Existing CI logs show Vitest 5 and Puppeteer 25 require newer Node than the previously selected Node 20.
- Email validation rejects control characters and overlong input instead of silently truncating an address. Added regression tests.

## Outstanding dependency vulnerability
The weekly health run 37319812966 on main commit ccf1e9053654bb8644b172ecbceff81eec034696 failed its production audit on 5 October 2026:
https://github.com/Louis-Maxwell/livingwitharthritis/actions/runs/37319812966

It reports six high-severity findings through braces -> micromatch/chokidar/fast-glob -> Tailwind 3 / tailwindcss-animate:
https://github.com/advisories/GHSA-vfj7-8cjw-p6xm

The log reports all braces versions affected and no fix available. These findings are not six separate root flaws. Do not suppress the audit or use npm audit fix --force. Removing this dependency chain requires a tested Tailwind build migration or an upstream fix. Moving dependencies to devDependencies alone would not remediate it. Exposure depends on passing untrusted deeply nested patterns to the affected build tooling; this review has not established a remotely reachable application exploit.

## Validation and scope
Targeted email validation executed locally using Node's TypeScript support. Full installation/build and npm audit could not be executed locally because direct network access to GitHub/npm is unavailable in this environment. Existing GitHub CI will validate the pull request. GitHub security-alert administration and credential rotation were not available through the connector. No production deployment or history rewrite was performed.
