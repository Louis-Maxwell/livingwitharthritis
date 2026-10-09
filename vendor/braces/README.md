# Locally patched braces 3.0.3

This directory vendors the MIT-licensed upstream `braces` 3.0.3 package to fix
GHSA-vfj7-8cjw-p6xm. At the time of this change, upstream has no patched release.
The fork is named `@livingwitharthritis/braces`, version `3.0.3-lwa.1`; the global
`braces` override points here for both npm and Bun. The upstream license is retained.

Changes from upstream:

- `parse.js` rejects brace and parenthesis nesting at 128 levels before pushing
  another AST block.
- `assert-depth.js` checks AST children iteratively and rejects excessive nesting
  and cycles before any recursive walk.
- `compile.js`, `expand.js`, and `stringify.js` validate both parsed and
  caller-supplied ASTs before traversal.

This is a local security patch, not an upstream security release. Registry audits
cannot assess this private fork; a clean audit alone does not establish its safety.
The regression suite in `scripts/__tests__/dependency-security.test.mjs` checks the
actual installed override, normal glob behavior, 10,000-level patterns and ASTs,
and cycles. All other upstream behavior is retained, including existing expansion
limits. Excessively nested input intentionally throws `SyntaxError`.

Remove this fork and its package overrides once upstream publishes a verified
fix, after rerunning the regression suite, CSS checks, build and application tests.
