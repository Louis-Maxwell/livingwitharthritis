#!/usr/bin/env node
import { readFileSync } from "node:fs";

const SITE = "https://livingwitharthritis.org.uk";
const redirectSource = readFileSync("src/data/blogRedirects.ts", "utf8");
const sitemap = readFileSync("public/sitemap.xml", "utf8");
const csv = readFileSync("docs/seo/redirect-map.csv", "utf8");
const netlify = readFileSync("netlify.toml", "utf8");
const vercel = JSON.parse(readFileSync("vercel.json", "utf8"));

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
const vercelMap = new Map(
  (vercel.redirects || []).map((row) => [
    String(row.source).replace(/^\/blog\//, ""),
    String(row.destination).replace(/^\/blog\//, ""),
  ]),
);
const netlifyMap = new Map(
  [
    ...netlify.matchAll(
      /from = "\/blog\/([^"]+)"\s*\n\s*to = "\/blog\/([^"]+)"\s*\n\s*status = 301/g,
    ),
  ].map((match) => [match[1], match[2]]),
);

const failures = [];

if (/status = 200/.test(netlify) && /to = "\/index\.html"/.test(netlify)) {
  failures.push("netlify.toml: catch-all SPA 200 rewrite would recreate soft 404s");
}
if ((vercel.rewrites || []).some((row) => String(row.destination).includes("index.html"))) {
  failures.push("vercel.json: catch-all rewrite to index.html would recreate soft 404s");
}
if (!/to = "\/404\.html"/.test(netlify) || !/status = 404/.test(netlify)) {
  failures.push("netlify.toml: missing HTTP 404 fallback to /404.html");
}

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
  if (netlifyMap.get(from) !== to) {
    failures.push(`${from}: missing or inconsistent netlify.toml 301`);
  }
  if (vercelMap.get(from) !== to) {
    failures.push(`${from}: missing or inconsistent vercel.json 301`);
  }
}

for (const [from, to] of csvRedirects) {
  if (redirects.get(from) !== to) {
    failures.push(`${from}: documented redirect is not implemented (${to})`);
  }
}

console.log(`Redirect audit: ${redirects.size} mappings checked`);
if (failures.length > 0) {
  for (const failure of failures) console.error(`✗ ${failure}`);
  process.exit(1);
}
console.log("✓ No chains, loops, sitemap sources, missing destinations or map drift.");
