#!/usr/bin/env node
import { readFileSync } from "node:fs";
import {
  buildRedirectsFile,
  parseBlogRedirects,
} from "./netlify-redirects.mjs";

const SITE = "https://livingwitharthritis.org.uk";
const redirectSource = readFileSync("src/data/blogRedirects.ts", "utf8");
const sitemap = readFileSync("public/sitemap.xml", "utf8");
const csv = readFileSync("docs/seo/redirect-map.csv", "utf8");

const redirects = new Map(
  [...redirectSource.matchAll(/^\s*"([^"]+)"\s*:\s*"([^"]+)",?\s*$/gm)].map(
    (match) => [match[1], match[2]],
  ),
);
const sitemapUrls = new Set(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]),
);
const csvRows = csv
  .trim()
  .split(/\r?\n/)
  .slice(1)
  .map((line) => line.split(","));
const csvRedirects = new Map(
  csvRows.map((columns) => [
    columns[0].replace(/^\/blog\//, ""),
    columns[1].replace(/^\/blog\//, ""),
  ]),
);

const failures = [];
for (const [from, to] of redirects) {
  if (from === to) failures.push(`${from}: self-redirect`);
  if (redirects.has(to)) {
    failures.push(`${from}: redirect chain through ${to}`);
  }

  const fromUrl = `${SITE}/blog/${from}`;
  const toUrl = `${SITE}/blog/${to}`;
  if (sitemapUrls.has(fromUrl)) {
    failures.push(`${from}: redirect source is present in sitemap`);
  }
  if (!sitemapUrls.has(toUrl)) {
    failures.push(`${from}: destination is missing from sitemap (${to})`);
  }
  if (csvRedirects.get(from) !== to) {
    failures.push(`${from}: missing or inconsistent docs/seo/redirect-map.csv row`);
  }
}

for (const [from, to] of csvRedirects) {
  if (redirects.get(from) !== to) {
    failures.push(`${from}: documented redirect is not implemented (${to})`);
  }
}

const expectedNetlify = buildRedirectsFile(parseBlogRedirects(redirectSource));
const actualNetlify = readFileSync("public/_redirects", "utf8");
if (actualNetlify !== expectedNetlify) {
  failures.push("public/_redirects is stale; run node scripts/generate-netlify-redirects.mjs");
}
if (!actualNetlify.includes("/blog/knee-osteoarthritis-exercises /blog/knee-arthritis-exercises-uk 301")) {
  failures.push("knee osteoarthritis slug is missing a Netlify 301");
}
if (/^\/\* \/index\.html 200$/m.test(actualNetlify)) {
  failures.push("catch-all SPA 200 would hide genuine 404s");
}

console.log(`Redirect audit: ${redirects.size} mappings checked`);
if (failures.length > 0) {
  for (const failure of failures) console.error(`✗ ${failure}`);
  process.exit(1);
}
console.log("✓ No chains, loops, sitemap sources, missing destinations or map drift.");
