#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";

const path = "src/data/published-content-manifest.json";
if (!existsSync(path)) {
  console.error(`✗ ${path} missing — run generate-content-manifest first`);
  process.exit(1);
}
const manifest = JSON.parse(readFileSync(path, "utf8"));
const items = Array.isArray(manifest.items) ? manifest.items : [];
const paths = items.map((item) => item.path);
const duplicates = paths.filter((path, i) => paths.indexOf(path) !== i);
const invalid = items.filter((item) => !item.url || !item.path || item.published !== true);

if (!items.length || duplicates.length || invalid.length) {
  console.error("✗ content manifest integrity failure");
  if (!items.length) console.error("  manifest contains no published URLs");
  if (duplicates.length) console.error(`  duplicate paths: ${[...new Set(duplicates)].slice(0, 10).join(", ")}`);
  if (invalid.length) console.error(`  invalid records: ${invalid.length}`);
  process.exit(1);
}

const requiredTypes = ["home", "condition", "article", "faq", "library", "guide"];
const missingTypes = requiredTypes.filter((type) => !items.some((item) => item.type === type));
if (missingTypes.length) {
  console.error(`✗ content manifest missing expected content types: ${missingTypes.join(", ")}`);
  process.exit(1);
}

console.log(`✓ content manifest — ${items.length} published URLs, ${Object.keys(manifest.counts || {}).length} content types`);
