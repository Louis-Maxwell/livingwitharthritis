#!/usr/bin/env node
/**
 * Validate sitemap hygiene before deployment.
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { exactRedirectPathSet } from "./seo-redirect-map.mjs";

const ROOT = resolve(import.meta.dirname, "..");
const HOST = "livingwitharthritis.org.uk";
const files = ["public/sitemap.xml", "public/sitemap-images.xml"];
const redirectPaths = exactRedirectPathSet();
const errors = [];
const allLocs = new Map();
const locPattern = new RegExp("<loc>([^<]+)</loc>", "g");

function fail(file, message) {
  errors.push(file + ": " + message);
}

for (const relative of files) {
  const file = resolve(ROOT, relative);
  if (!existsSync(file)) {
    fail(relative, "file is missing");
    continue;
  }
  const xml = readFileSync(file, "utf8");
  if (!xml.trim().startsWith("<?xml")) fail(relative, "missing XML declaration");
  if (!/<urlset[\s>]/i.test(xml)) fail(relative, "missing <urlset>");
  const locs = [...xml.matchAll(locPattern)].map((match) => match[1].trim());
  if (locs.length === 0) fail(relative, "contains no <loc> entries");

  const seen = new Set();
  for (const loc of locs) {
    if (seen.has(loc)) fail(relative, "duplicate <loc>: " + loc);
    seen.add(loc);
    let url;
    try {
      url = new URL(loc);
    } catch {
      fail(relative, "invalid URL: " + loc);
      continue;
    }
    if (url.protocol !== "https:" || url.host !== HOST) fail(relative, "non-canonical host or protocol: " + loc);
    if (url.search || url.hash) fail(relative, "query string or fragment in sitemap URL: " + loc);
    if (url.pathname.includes("\\") || /utm_|session|token/i.test(url.pathname)) fail(relative, "tracking or unsafe path: " + loc);
    if (relative === "public/sitemap.xml" && redirectPaths.has(url.pathname)) fail(relative, "redirect source listed: " + loc);
    const previous = allLocs.get(loc);
    if (previous) fail(relative, "URL also appears in " + previous + ": " + loc);
    else allLocs.set(loc, relative);
  }
}

if (errors.length) {
  console.error("sitemap-integrity: " + errors.length + " failure(s)");
  for (const error of errors) console.error("- " + error);
  process.exit(1);
}
console.log("sitemap-integrity: validated " + allLocs.size + " unique URLs across " + files.length + " files");
