#!/usr/bin/env node
/**
 * Keep public/_redirects in sync with scripts/seo-redirect-map.mjs
 * (exact path list). Run after changing blogRedirects or CITY_HUB_ALIASES.
 * `npm run seo:redirects` fails if exact map entries are missing from _redirects.
 *
 * Pattern / splat rules stay hand-authored in public/_redirects.
 *  */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { exactRedirects } from "./seo-redirect-map.mjs";

const REDIRECTS_PATH = resolve("public/_redirects");

function missingExactLines(body) {
  const missing = [];
  for (const { from, to } of exactRedirects()) {
    const line = `${from} ${to} 301`;
    if (!body.includes(line)) missing.push(line);
  }
  return missing;
}

export function hostRedirectsDrift() {
  const failures = [];
  if (!existsSync(REDIRECTS_PATH)) {
    failures.push("public/_redirects is missing");
    return failures;
  }
  const body = readFileSync(REDIRECTS_PATH, "utf8");
  for (const line of missingExactLines(body)) {
    const [from, to] = line.split(" ");
    failures.push(
      `public/_redirects missing exact rule: ${from} → ${to} — run node scripts/sync-host-redirects.mjs`,
    );
  }
  return failures;
}

/** Append any exact map rules missing from public/_redirects (keeps comments/patterns). */
export function writeHostRedirects() {
  if (!existsSync(REDIRECTS_PATH)) {
    throw new Error("public/_redirects is missing");
  }
  let body = readFileSync(REDIRECTS_PATH, "utf8");
  const missing = missingExactLines(body);
  if (!missing.length) {
    console.log("[host-redirects] public/_redirects already contains the exact map");
    return;
  }
  const block = [
    "",
    "# --- Exact map sync (from scripts/seo-redirect-map.mjs; do not drop) ---",
    ...missing,
    "",
  ].join("\n");
  if (!body.endsWith("\n")) body += "\n";
  writeFileSync(REDIRECTS_PATH, body + block);
  console.log(`[host-redirects] appended ${missing.length} exact rules to public/_redirects`);
}

const isCheck = process.argv.includes("--check");
if (isCheck) {
  const failures = hostRedirectsDrift();
  if (failures.length) {
    for (const f of failures) console.error(`✗ ${f}`);
    process.exit(1);
  }
  console.log("✓ public/_redirects contains exact redirects from the map");
} else if (process.argv[1]?.includes("sync-host-redirects")) {
  writeHostRedirects();
}
