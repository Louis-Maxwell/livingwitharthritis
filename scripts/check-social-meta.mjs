#!/usr/bin/env node
/**
 * Audit: every page in src/pages/**.tsx must reach SeoHead,
 * ConditionPageTemplate, or contain a literal og:title meta tag.
 * Skips test/mocks. Exits non-zero on regression.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "src/pages";
const SKIP_DIRS = new Set(["__tests__", "__mocks__"]);

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (name.endsWith(".tsx") && !name.endsWith(".test.tsx")) out.push(p);
  }
  return out;
}

const missing = [];
for (const file of walk(ROOT)) {
  const src = readFileSync(file, "utf8");
  if (
    src.includes("SeoHead") ||
    src.includes("ConditionPageTemplate") ||
    src.includes("og:title")
  ) continue;
  missing.push(file);
}

if (missing.length) {
  console.error(`Pages missing OG/Twitter coverage (${missing.length}):`);
  for (const f of missing) console.error("  - " + f);
  process.exit(1);
}
console.log(`OK: all pages emit OG/Twitter meta via SeoHead/ConditionPageTemplate.`);
