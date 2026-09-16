#!/usr/bin/env node
/**
 * Internal linking strategy (legacy).
 * Previously read blog_articles from Supabase. Backend removed — no remote DB.
 * Prefer local catalog tooling instead of this script.
 */
console.error(
  "[skip] scripts/internal-linking-strategy.mjs: Supabase backend removed. " +
    "This script needs a local content DB export; it does not call any remote backend.",
);
process.exit(0);
