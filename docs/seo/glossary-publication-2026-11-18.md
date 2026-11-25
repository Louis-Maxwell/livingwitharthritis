# Glossary search-response repair publication record

18 November 2026

PR 536 repaired the first-response content for four existing glossary URLs and removed noindex from immediate redirect fallback documents without changing their destinations. The fallback responses still return HTTP 200; this is not an HTTP 301 change.

PR 537 adds sourced definitions for nine existing glossary destinations. The definitions retain their existing URLs and explicitly state that independent clinical review is pending. Editorial source checking is not clinical signoff.

The nine definitions passed 1,235 tests across 202 isolated test files, typecheck, zero-warning lint, dependency security checks, build and postbuild. Generated output was inspected separately from the committed source changes.

A publication sync check found GitHub one commit ahead of Lovable while the correct main branch remained connected, with no divergence reported. Lovable's documented remedy for a missed push notification is a new push to the synced branch. This documentation-only follow-up creates that push without changing application behaviour. Publication must still be checked against the live site; a merged PR is not evidence of deployment.

Reference: https://docs.lovable.dev/integrations/github
