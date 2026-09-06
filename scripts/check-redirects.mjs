#!/usr/bin/env node
import { readFileSync, existsSync } from "node:fs";
import { exactRedirects } from "./seo-redirect-map.mjs";

const SITE = "https://livingwitharthritis.org.uk";
const redirectSource = readFileSync("src/data/blogRedirects.ts", "utf8");
const sitemap = readFileSync("public/sitemap.xml", "utf8");
const csv = readFileSync("docs/seo/redirect-map.csv", "utf8");
const hostRedirects = existsSync("public/_redirects")
  ? readFileSync("public/_redirects", "utf8")
  : "";
const vercel = existsSync("vercel.json")
  ? readFileSync("vercel.json", "utf8")
  : "";
const gate = readFileSync("src/components/SeoRedirectGate.tsx", "utf8");

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

for (const { from, to } of exactRedirects()) {
  const line = `${from} ${to} 301`;
  if (from.startsWith("/blog/") || from.startsWith("/arthritis-support/") || from === "/zakat") {
    if (!hostRedirects.includes(`${from} ${to} 301`) && !hostRedirects.includes(line)) {
      failures.push(`${from}: missing from public/_redirects`);
    }
  }
  if (from === "/blog/mindfulness-meditation-chronic-pain" || from === "/arthritis-support/stockport") {
    if (!vercel.includes(`"source": "${from}"`) || !vercel.includes(`"destination": "${to}"`)) {
      failures.push(`${from}: missing from vercel.json`);
    }
    if (sitemap.includes(`${SITE}${from}<`)) {
      failures.push(`${from}: still listed in sitemap.xml`);
    }
  }
}

if (!gate.includes('rel="canonical"') || !gate.includes("window.location.replace")) {
  failures.push("SeoRedirectGate must emit a destination canonical and location.replace");
}

console.log(`Redirect audit: ${redirects.size} blog mappings + host adapters checked`);
if (failures.length > 0) {
  for (const failure of failures) console.error(`✗ ${failure}`);
  process.exit(1);
}
console.log("✓ No chains, loops, sitemap sources, missing destinations or map drift.");
