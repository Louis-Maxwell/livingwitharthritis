#!/usr/bin/env node
/**
 * Keep vercel.json in sync with
 * scripts/seo-redirect-map.mjs. Run after changing blogRedirects or
 * CITY_HUB_ALIASES. `npm run seo:redirects` fails if they drift.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { vercelRedirects } from "./seo-redirect-map.mjs";

const VERCEL_PATH = resolve("vercel.json");

export function buildVercelJson() {
  return `${JSON.stringify({ redirects: vercelRedirects() }, null, 2)}\n`;
}

export function writeHostRedirects() {
  writeFileSync(VERCEL_PATH, buildVercelJson());
}

export function hostRedirectsDrift() {
  const failures = [];
  const expectedVercel = buildVercelJson();
  if (!existsSync(VERCEL_PATH) || readFileSync(VERCEL_PATH, "utf8") !== expectedVercel) {
    failures.push("vercel.json is out of date — run node scripts/sync-host-redirects.mjs");
  }
  return failures;
}

const isCheck = process.argv.includes("--check");
if (isCheck) {
  const failures = hostRedirectsDrift();
  if (failures.length) {
    for (const f of failures) console.error(`✗ ${f}`);
    process.exit(1);
  }
  console.log("✓ vercel.json matches the redirect map");
} else if (process.argv[1]?.includes("sync-host-redirects")) {
  writeHostRedirects();
  console.log("[host-redirects] wrote vercel.json");
}
