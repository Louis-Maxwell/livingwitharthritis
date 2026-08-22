#!/usr/bin/env node
import { readFileSync } from "node:fs";

const SITE = "https://livingwitharthritis.org.uk";
const redirectSource = readFileSync("src/data/blogRedirects.ts", "utf8");
const sitemap = readFileSync("public/sitemap.xml", "utf8");
const csv = readFileSync("docs/seo/redirect-map.csv", "utf8");
const netlify = readFileSync("netlify.toml", "utf8");

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
const netlifyRedirects = new Map(
  [
    ...netlify.matchAll(
      /from\s*=\s*"(\/blog\/[^"]+)"\s*\n\s*to\s*=\s*"(\/blog\/[^"]+)"\s*\n\s*status\s*=\s*301/g,
    ),
  ].map((match) => [
    match[1].replace(/^\/blog\//, ""),
    match[2].replace(/^\/blog\//, ""),
  ]),
);

const failures = [];
if (/from\s*=\s*"\/\*"[\s\S]{0,120}to\s*=\s*"\/index\.html"[\s\S]{0,80}status\s*=\s*200/.test(netlify)) {
  failures.push("netlify.toml: catch-all /* must not rewrite to index.html with HTTP 200");
}
if (!/from\s*=\s*"\/\*"\s*\n\s*to\s*=\s*"\/404\.html"\s*\n\s*status\s*=\s*404/.test(netlify)) {
  failures.push("netlify.toml: missing HTTP 404 catch-all to /404.html");
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
  if (netlifyRedirects.get(from) !== to) {
    failures.push(`${from}: missing or inconsistent netlify.toml 301`);
  }
}

for (const [from, to] of csvRedirects) {
  if (redirects.get(from) !== to) {
    failures.push(`${from}: documented redirect is not implemented (${to})`);
  }
}

for (const [from, to] of netlifyRedirects) {
  if (redirects.get(from) !== to) {
    failures.push(`${from}: netlify.toml 301 is not implemented in the app map (${to})`);
  }
}

console.log(`Redirect audit: ${redirects.size} mappings checked`);
if (failures.length > 0) {
  for (const failure of failures) console.error(`✗ ${failure}`);
  process.exit(1);
}
console.log("✓ No chains, loops, sitemap sources, missing destinations or map drift.");
