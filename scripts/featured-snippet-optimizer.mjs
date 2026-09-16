#!/usr/bin/env node
/**
 * Legacy featured-snippet optimizer (Supabase-backed).
 * Audit output previously written from remote articles; re-run against local catalog if needed.
 */
console.error(
  "[skip] scripts/featured-snippet-optimizer.mjs: Supabase backend removed. " +
    "Cannot fetch remote articles. Use the local catalog/JSON instead — no remote backend.",
);
process.exit(0);
