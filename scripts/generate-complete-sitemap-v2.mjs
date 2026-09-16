#!/usr/bin/env node
/**
 * Legacy complete sitemap v2 (Supabase-backed).
 * Use: bun scripts/generate-sitemap.ts
 */
console.error(
  "[skip] scripts/generate-complete-sitemap-v2.mjs: Supabase backend removed. " +
    "Use `bun scripts/generate-sitemap.ts` instead. Use the local catalog/JSON instead — no remote backend.",
);
process.exit(0);
