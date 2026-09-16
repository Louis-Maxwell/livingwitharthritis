#!/usr/bin/env node
/**
 * Legacy complete sitemap generator (Supabase-backed).
 * Use: bun scripts/generate-sitemap.ts  (local catalog / static routes)
 */
console.error(
  "[skip] scripts/generate-complete-sitemap.mjs: Supabase backend removed. " +
    "Use `bun scripts/generate-sitemap.ts` instead. Use the local catalog/JSON instead — no remote backend.",
);
process.exit(0);
