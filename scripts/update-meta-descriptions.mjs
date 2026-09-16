#!/usr/bin/env node
/**
 * Legacy meta-description bulk updater (Supabase-backed).
 * Blog copy now lives in the checked-in static catalog — edit locally.
 */
console.error(
  "[skip] scripts/update-meta-descriptions.mjs: Supabase backend removed. " +
    "Update meta descriptions in the local blog catalog/JSON instead. Use the local catalog/JSON instead — no remote backend.",
);
process.exit(0);
