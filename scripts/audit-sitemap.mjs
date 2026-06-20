// Audit every <loc> in public/sitemap.xml against the live site.
// Flags: non-2xx, redirect to different path, or HTML that looks like the
// NotFound page. Writes audit-sitemap-report.json.
//
// Usage: node scripts/audit-sitemap.mjs [base-url] [concurrency]

import { readFileSync, writeFileSync } from "node:fs";

const BASE = process.argv[2] || "https://livingwitharthritis.org.uk";
const CONCURRENCY = Number(process.argv[3]) || 16;
const TIMEOUT_MS = 12_000;

const xml = readFileSync("public/sitemap.xml", "utf8");
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log(`[audit] ${urls.length} URLs vs ${BASE}`);

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
    const head = buf.slice(0, 8000);
    for (const m of NOT_FOUND_MARKERS) {
      if (head.includes(m)) {
        return { url: path, status: 200, reason: "not-found-page" };
      }
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
writeFileSync("audit-sitemap-report.json", JSON.stringify(report, null, 2));
console.log(`[audit] DONE. ${broken.length} broken of ${urls.length}. → audit-sitemap-report.json`);

// Group summary
const byReason = {};
for (const b of broken) byReason[b.reason] = (byReason[b.reason] || 0) + 1;
console.log("[audit] by reason:", byReason);
