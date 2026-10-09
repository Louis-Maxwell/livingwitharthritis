# Temporary private security fork of braces 3.0.3

This directory contains the MIT-licensed npm `braces@3.0.3` implementation,
with a narrowly scoped fix for CVE-2026-93687 / GHSA-vfj7-8cjw-p6xm.
Source: https://github.com/micromatch/braces/tree/3.0.3
Advisory: https://github.com/advisories/GHSA-vfj7-8cjw-p6xm

As of 9 October 2026, the advisory lists no patched upstream release and npm's
latest release is 3.0.3. This is a private local package named
`@livingwitharthritis/braces`, version `3.0.3-lwa.1`; it is **not** a published
upstream fix. npm installs it under the `braces` dependency name using a root
file dependency and an override. This retains the existing Tailwind 3,
chokidar, micromatch and prerendering APIs without a broad framework migration.
The upstream copyright and license are preserved in LICENSE.

## Actual changes

- `lib/depth.js` defines a fixed depth ceiling of 128 and throws a controlled
  RangeError with code `BRACES_MAX_DEPTH`. Options cannot disable the ceiling.
- `lib/parse.js` checks the parser stack before pushing either a brace or a
  parenthesis node. Checking the full stack also bounds mixed nesting and
  malformed/unclosed inputs before any recursive processing occurs.
- `lib/compile.js`, `lib/expand.js` and `lib/stringify.js` independently check
  walker depth, including when called with a caller-created AST rather than a
  string. Child traversal increments the depth. Original stringify parent
  handling is preserved.
- `index.js`, other helpers and all ordinary expansion behavior are unchanged.

The ceiling allows 127 nested containers below the root, far beyond normal
project glob patterns. Patterns above that ceiling now raise the explicit
security error instead of exhausting the JavaScript call stack.

## Verification and maintenance

Run `npm run test:dependency-security` after a clean install. The regression
suite covers under-10,000-character exploit patterns, mixed/parenthesis
nesting, preconstructed and cyclic ASTs, the exact boundary, attempts to
relax the limit, ordinary globs, numeric ranges, escaping, quoted/bracketed
literals, existing limits, and resolution from the installed consumers.
This test runs in the Security Audit CI job before the unchanged npm audit
command, and is also included in `npm test`.

A clean `npm audit` is only advisory-database coverage. The local fork has a
separate package identity, so the regression tests and this documented patch
are the evidence that its known vulnerability has been fixed. Do not remove
these guards or change package metadata simply to silence an audit finding.

When upstream publishes a fixed release, verify its brace AND parenthesis
nesting and direct-AST traversal protection, replace the file dependency with
that release, remove this private fork and its override, regenerate both
lockfiles, and rerun the security tests and site checks. Keep the fixed
`postcss-selector-parser >=7.1.6` override until its consumers require a fixed
version themselves.
