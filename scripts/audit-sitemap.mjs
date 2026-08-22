// Audit every <loc> in public/sitemap.xml against the live site.
// Flags: non-2xx, redirects, homepage fallbacks, missing/wrong canonicals, or
// HTML that looks like the NotFound page. Writes audit-sitemap-report.json.
//
// Usage: node scripts/audit-sitemap.mjs [base-url] [concurrency] [output-path]

import { readFileSync, writeFileSync } from "node:fs";

const BASE = process.argv[2] || "https://livingwitharthritis.org.uk";
const CONCURRENCY = Number(process.argv[3]) || 16;
const OUTPUT = process.argv[4] || "audit-sitemap-report.json";
const TIMEOUT_MS = 12_000;

const xml = readFileSync("public/sitemap.xml", "utf8");
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const sourceIndex = readFileSync("index.html", "utf8");
console.log(`[audit] ${urls.length} URLs vs ${BASE}`);

const textOf = (html, pattern) => {
  const value = html.match(pattern)?.[1] ?? "";
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
};
const titleOf = (html) => textOf(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
const h1Of = (html) => textOf(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
const canonicalOf = (html) => {
  const tag = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i)?.[0];
  if (!tag) return "";
  return tag.match(/\bhref=["']([^"']+)["']/i)?.[1] ?? "";
};
const GENERIC_TITLE = titleOf(sourceIndex);
const GENERIC_H1 = h1Of(sourceIndex);

const NOT_FOUND_MARKERS = [
  "404 — Page Not Found",
  "404 - Page Not Found",
  "Page Not Found",
  ">404<",
  "<title>404",
  "Oops! Page not found",
];

async function checkOne(url) {
  const path = url.replace(/^https?:\/\/[^/]+/, "");
  const target = `${BASE}${path}`;
  const ctl = AbortSignal.timeout(TIMEOUT_MS);
  try {
    const res = await fetch(target, {
      redirect: "manual",
      headers: { "user-agent": "lwa-sitemap-audit/1.0" },
      signal: ctl,
    });
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location") || "";
      return { url: path, status: res.status, reason: "redirect", to: loc };
    }
    if (res.status !== 200) {
      return { url: path, status: res.status, reason: "http-error" };
    }
    const buf = await res.text();
    const head = buf.slice(0, 250_000);
    for (const m of NOT_FOUND_MARKERS) {
      if (head.includes(m)) {
        return { url: path, status: 200, reason: "not-found-page" };
      }
    }
    const title = titleOf(head);
    const h1 = h1Of(head);
    if (
      path !== "/" &&
      ((GENERIC_TITLE && title === GENERIC_TITLE) ||
        (GENERIC_H1 && h1 === GENERIC_H1))
    ) {
      return {
        url: path,
        status: 200,
        reason: "homepage-fallback",
        title,
        h1,
      };
    }
    const canonical = canonicalOf(head);
    const expectedCanonical = `${BASE}${path}`;
    if (!canonical) {
      return { url: path, status: 200, reason: "missing-canonical" };
    }
    if (canonical !== expectedCanonical) {
      return {
        url: path,
        status: 200,
        reason: "wrong-canonical",
        canonical,
        expectedCanonical,
      };
    }
    return null;
  } catch (e) {
    return { url: path, status: 0, reason: "fetch-error", error: String(e?.message || e) };
  }
}

const broken = [];
let done = 0;
const queue = urls.slice();
const workers = Array.from({ length: CONCURRENCY }, async () => {
  while (queue.length) {
    const u = queue.shift();
    const r = await checkOne(u);
    done++;
    if (r) broken.push(r);
    if (done % 50 === 0) console.log(`[audit] ${done}/${urls.length} (${broken.length} broken so far)`);
  }
});
await Promise.all(workers);

broken.sort((a, b) => a.url.localeCompare(b.url));
const report = {
  base: BASE,
  total: urls.length,
  broken: broken.length,
  ranAt: new Date().toISOString(),
  items: broken,
};
writeFileSync(OUTPUT, JSON.stringify(report, null, 2));
console.log(`[audit] DONE. ${broken.length} broken of ${urls.length}. → ${OUTPUT}`);

// Group summary
const byReason = {};
for (const b of broken) byReason[b.reason] = (byReason[b.reason] || 0) + 1;
console.log("[audit] by reason:", byReason);
