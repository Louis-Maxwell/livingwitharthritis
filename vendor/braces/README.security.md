# Locally maintained braces security patch

Based on micromatch/braces tag 3.0.3, MIT license retained.
Source: https://github.com/micromatch/braces/tree/3.0.3
Advisory: https://github.com/advisories/GHSA-vfj7-8cjw-p6xm

Upstream has no patched release as of 6 October 2026. This private local fork
adds a fixed nesting cap of 100 to parsing both braces and parentheses,
and independent depth checks to compile, expand and stringify for callers
that supply an AST directly. Excessive nesting throws a controlled SyntaxError
before the recursive walkers can exhaust the JavaScript call stack.

The fork has its own name and prerelease version to identify locally modified
source, not to imply an upstream release exists. The npm dependency name remains
braces for API compatibility. The root dependency plus overrides/resolutions
forces micromatch and chokidar onto this local implementation.

No audit findings are suppressed. Audit success alone is insufficient evidence:
scripts/tests/braces-security.test.mjs tests hostile input, normal expansion
and actual installed dependency resolution. Review this local code until a
maintained upstream fix can replace it.

Update procedure: compare any proposed upstream replacement with this patch,
run npm run test:dependency-security, npm audit --audit-level=moderate,
npm run typecheck, npm test, npm run build and the existing browser smoke checks.
Regenerate and commit both npm and Bun lockfiles when replacing the fork.
