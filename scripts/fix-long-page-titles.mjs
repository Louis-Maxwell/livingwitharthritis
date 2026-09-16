#!/usr/bin/env node
/**
 * Legacy long page-title fixer (Supabase-backed).
 * Titles now live in the checked-in static catalog — edit locally.
 */
console.error(
  "[skip] scripts/fix-long-page-titles.mjs: Supabase backend removed. " +
    "Fix titles in the local blog catalog/JSON instead. Use the local catalog/JSON instead — no remote backend.",
);
process.exit(0);
