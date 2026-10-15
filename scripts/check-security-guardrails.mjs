#!/usr/bin/env node
/**
 * Release guard for security and indexability invariants.
 * This is intentionally dependency-free so it can run in CI and on a clean checkout.
 */
import { readFileSync, existsSync } from "node:fs";

const failures = [];
const read = (path) => {
  if (!existsSync(path)) {
    failures.push(`missing required file: ${path}`);
    return "";
  }
  return readFileSync(path, "utf8");
};

const robots = read("public/robots.txt");
const sitemap = read("public/sitemap.xml");
const headers = read("public/_headers");
const security = read("public/.well-known/security.txt");

if (!/^Sitemap:\s*https:\/\/livingwitharthritis\.org\.uk\/sitemap(?:-index)?\.xml\s*$/im.test(robots)) {
  failures.push("robots.txt must advertise the canonical HTTPS sitemap");
}
if (/<loc>http:\/\//i.test(sitemap)) failures.push("sitemap contains an HTTP URL");
const locs = [...sitemap.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map((m) => m[1].trim());
if (!locs.length) failures.push("sitemap has no URL entries");
if (new Set(locs).size !== locs.length) failures.push("sitemap contains duplicate <loc> values");
const privatePrefixes = ["/admin", "/auth", "/dashboard", "/checkout", "/callback", "/debug"];
for (const loc of locs) {
  const path = new URL(loc).pathname;
  if (privatePrefixes.some((prefix) => path === prefix || path.startsWith(prefix + "/"))) {
    failures.push(`private route exposed in sitemap: ${path}`);
  }
}
for (const header of ["X-Content-Type-Options: nosniff", "X-Frame-Options: DENY", "Referrer-Policy: strict-origin-when-cross-origin"]) {
  if (!headers.includes(header)) failures.push(`security header missing from public/_headers: ${header}`);
}
if (!/^Contact:\s*mailto:/mi.test(security) || !/^Canonical:\s*https:\/\/livingwitharthritis\.org\.uk\/\.well-known\/security\.txt\s*$/mi.test(security)) {
  failures.push("security.txt must have a contact and canonical URL");
}

if (failures.length) {
  console.error(failures.map((failure) => `FAIL: ${failure}`).join("\n"));
  process.exit(1);
}
console.log(`PASS: security/indexability guardrails checked ${locs.length} sitemap URLs`);
