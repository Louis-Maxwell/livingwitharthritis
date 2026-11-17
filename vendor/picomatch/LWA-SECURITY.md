# Local picomatch security mitigation

Based on the npm picomatch 4.0.7 release, preserving its MIT licence. This is a private local fork, not an upstream fixed release.

Advisory: https://github.com/advisories/GHSA-fc5q-39xc-vjpf (CVE-2026-112366). Checked 17 November 2026: npm latest is 4.0.7; the advisory lists no patched release.

The change adds a conservative guard to analyzeRepeatedExtglob before its optional recursion bypass. Repeated +(...) and *(...) bodies containing non-plain branches, including single wildcard branches, throw an explicit PICOMATCH_UNSAFE_REPEATED_EXTGLOB SyntaxError. This rejects the reported +(*) and +(*a) patterns without evaluating their nested quantifiers. Complex repeated extglobs intentionally fail closed rather than silently omitting matching files; simple literal alternatives and ordinary glob patterns keep upstream behavior. This is a narrower compatibility trade-off than replacing or force-upgrading the build toolchain.

Tests run hostile patterns in child processes with hard timeouts, verify public APIs and actual installed consumers, and compare representative normal patterns with the downloaded upstream release. Full project build, unit, type, browser and security gates must pass before publication. An audit count of zero alone does not prove the mitigation; a scoped package name records ownership, not an exemption from testing. Do not remove the behavioral regression tests when updating.

Revisit this fork when upstream releases a supported fix. This mitigation is for the reported repeated-wildcard issue, not a claim that all possible regular-expression denial of service patterns are eliminated. The site remains a static deployment; no new server or user-supplied glob endpoint is introduced.
