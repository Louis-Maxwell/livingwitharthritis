/**
 * Single source of exact-path SEO redirects for every host adapter:
 *   - public/_redirects          (Netlify / static hosts)
 *   - vercel.json                (Vercel edge 308)
 *   - scripts/write-redirect-html.mjs  (static HTML for Lovable SPA hosts)
 *   - src/lib/seoRedirects.ts    (client Navigate; kept in sync by tests)
 *
 * Pattern / splat rules (locale prefixes, city×condition) stay in
 * public/_redirects + SeoRedirectGate. This module only lists finite
 * exact URLs we can drop as real files so a host that ignores _redirects
 * still serves a noindex+canonical+refresh document instead of the
 * homepage SPA shell.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export const SITE = "https://livingwitharthritis.org.uk";

const read = (p) => readFileSync(resolve(p), "utf8");

function parseQuotedPairs(src) {
  return [...src.matchAll(/(?:["']([^"']+)["']|([A-Za-z0-9_-]+))\s*:\s*["']([^"']+)["']/g)].map(
    (m) => [m[1] || m[2], m[3]],
  );
}

function parseQuotedList(src) {
  return [...src.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
}

function block(src, exportName) {
  const re = new RegExp(`export const ${exportName}[\\s\\S]*?};`);
  return src.match(re)?.[0] ?? "";
}

const seoSrc = read("src/lib/seoRedirects.ts");
const blogSrc = read("src/data/blogRedirects.ts");
const citiesSrc = read("src/data/ukCities.ts");

export const EXACT_SEO_REDIRECTS = Object.fromEntries(
  parseQuotedPairs(block(seoSrc, "EXACT_SEO_REDIRECTS")),
);

export const CITY_HUB_ALIASES = Object.fromEntries(
  parseQuotedPairs(block(seoSrc, "CITY_HUB_ALIASES")),
);

export const BLOG_SLUG_REDIRECTS = Object.fromEntries(
  parseQuotedPairs(blogSrc),
);

export const CITY_SLUGS = new Set(
  [...citiesSrc.matchAll(/\{\s*slug:\s*"([^"]+)"/g)].map((m) => m[1]),
);

const EXERCISE_TYPES = new Set(
  parseQuotedList(
    seoSrc.match(/const EXERCISE_TYPES = new Set\(\[([\s\S]*?)\]\)/)?.[1] ?? "",
  ),
);
const EXERCISE_JOINTS = new Set(
  parseQuotedList(
    seoSrc.match(/const EXERCISE_JOINTS = new Set\(\[([\s\S]*?)\]\)/)?.[1] ?? "",
  ),
);

/** Finite exact-path redirects. First `from` wins. */
export function exactRedirects() {
  const pairs = [];
  const seen = new Set();
  const add = (from, to) => {
    const f = normalizePath(from);
    const t = normalizePath(to);
    if (!f || !t || f === t || seen.has(f)) return;
    seen.add(f);
    pairs.push({ from: f, to: t });
  };

  for (const [from, to] of Object.entries(EXACT_SEO_REDIRECTS)) add(from, to);

  for (const [slug, dest] of Object.entries(BLOG_SLUG_REDIRECTS)) {
    add(`/blog/${slug}`, `/blog/${dest}`);
  }

  for (const [alias, city] of Object.entries(CITY_HUB_ALIASES)) {
    add(`/arthritis-support/${alias}`, `/arthritis-support/${city}`);
  }

  for (const lang of ["es", "fr", "de", "pt"]) add(`/${lang}/404`, "/");

  for (const type of EXERCISE_TYPES) {
    for (const joint of EXERCISE_JOINTS) {
      add(`/exercises/${type}-for-${joint}`, `/exercises/${type}-for-${joint}-arthritis`);
    }
  }

  // App.tsx alias that is not in EXACT_SEO_REDIRECTS.
  add("/zakat", "/zakat-appeal");

  return pairs;
}

export function exactRedirectPathSet() {
  return new Set(exactRedirects().map((r) => r.from));
}

export function normalizePath(pathname) {
  if (!pathname) return "/";
  const collapsed = String(pathname).split("?")[0].split("#")[0].replace(/\/{2,}/g, "/");
  if (collapsed.length > 1 && collapsed.endsWith("/")) return collapsed.slice(0, -1);
  return collapsed || "/";
}

export function buildRedirectHtml(from, to) {
  const dest = normalizePath(to);
  const abs = `${SITE}${dest}`;
  const safeDest = dest.replace(/</g, "");
  const jsDest = JSON.stringify(dest);
  return `<!DOCTYPE html>
<html lang="en-GB">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>This page has moved | Living With Arthritis UK</title>
    <meta name="description" content="This URL has moved. You are being sent to the current page on Living With Arthritis UK." />
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${abs}" />
    <meta http-equiv="refresh" content="0;url=${safeDest}" />
    <script>location.replace(${jsDest}+location.search+location.hash);</script>
  </head>
  <body>
    <main>
      <h1>This page has moved</h1>
      <p>Please continue at <a href="${safeDest}">${abs}</a>.</p>
    </main>
  </body>
</html>
`;
}

export function vercelRedirects() {
  const exact = exactRedirects().map(({ from, to }) => ({
    source: from,
    destination: to,
    permanent: true,
  }));
  const patterns = [
    { source: "/about/", destination: "/about", permanent: true },
    { source: "/es/404", destination: "/", permanent: true },
    { source: "/fr/404", destination: "/", permanent: true },
    { source: "/de/404", destination: "/", permanent: true },
    { source: "/pt/404", destination: "/", permanent: true },
    { source: "/arthritis-support/:city/:condition", destination: "/arthritis-support/:city", permanent: true },
    { source: "/uk/:city/:service", destination: "/arthritis-support/:city", permanent: true },
    { source: "/exercises/:joint/for/:condition", destination: "/exercises", permanent: true },
  ];
  const seen = new Set(exact.map((r) => r.source));
  return [...exact, ...patterns.filter((r) => !seen.has(r.source))];
}
