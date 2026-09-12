#!/usr/bin/env node
/**
 * Internal linking strategy (legacy).
 * Previously read blog_articles from Supabase. Backend removed — no remote DB.
 * Prefer local catalog tooling instead of this script.
 */
console.error(
  "[skip] scripts/internal-linking-strategy.mjs: Supabase backend removed. " +
    "This script no longer imports @supabase/supabase-js and cannot run without a DB.",
);
process.exit(0);
