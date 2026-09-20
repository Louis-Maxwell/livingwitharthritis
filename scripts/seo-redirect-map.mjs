/**
 * Single source of exact-path SEO redirects (host redirects) for adapters:
 *   - public/_redirects          (Netlify / static hosts)
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

export const CITY_HUBS = [
  ...citiesSrc.matchAll(
    /\{\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*region:\s*"([^"]+)",[\s\S]*?description:\s*"([^"]+)"/g,
  ),
].map((m) => ({ slug: m[1], name: m[2], region: m[3], description: m[4] }));

export const CITY_SLUGS = new Set(CITY_HUBS.map((c) => c.slug));

const CONDITION_SLUGS = [
  ...read("src/data/arthritisConditions.ts").matchAll(/^\s*slug:\s*"([a-z0-9-]+)"/gm),
].map((m) => m[1]);

const UK_CITY_SERVICES = [
  "rheumatology",
  "waiting-list-help",
  "physiotherapy",
  "support-groups",
];

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

  // Finite city×condition and /uk/:city/:service stubs so Lovable SPA
  // fallback cannot serve homepage OG on those GSC doorways.
  for (const city of CITY_SLUGS) {
    for (const condition of CONDITION_SLUGS) {
      add(`/arthritis-support/${city}/${condition}`, `/arthritis-support/${city}`);
    }
    for (const service of UK_CITY_SERVICES) {
      add(`/uk/${city}/${service}`, `/arthritis-support/${city}`);
    }
  }

  for (const lang of ["es", "fr", "de", "pt"]) add(`/${lang}/404`, "/");

  for (const type of EXERCISE_TYPES) {
    for (const joint of EXERCISE_JOINTS) {
      add(`/exercises/${type}-for-${joint}`, `/exercises/${type}-for-${joint}-arthritis`);
    }
  }

  // Bare /{blog-slug} soft-404s (missing /blog/ prefix) → canonical article.
  try {
    const blogSlugs = JSON.parse(read("src/data/blog-slugs.generated.json"));
    if (Array.isArray(blogSlugs)) {
      for (const slug of blogSlugs) {
        if (typeof slug === "string" && slug.length > 2) add(`/${slug}`, `/blog/${slug}`);
      }
    }
  } catch {
    /* generated list may be absent on first bootstrap */
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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildRedirectHtml(from, to) {
  const dest = normalizePath(to);
  const abs = `${SITE}${dest}`;
  const safeDest = dest.replace(/</g, "");
  const jsDest = JSON.stringify(dest);
  const fromPath = escapeHtml(normalizePath(from));
  const absSafe = escapeHtml(abs);
  const destHref = escapeHtml(safeDest);
  // Lovable CDN ignores HTTP 301 files. These stubs must:
  // 1) never look like empty homepage soft-404s
  // 2) stay out of the index (noindex,nofollow)
  // 3) point Google at the live destination via canonical + refresh
  // 4) still look like the charity if the jump is blocked (no JS, slow phone)
  return `<!DOCTYPE html>
<html lang="en-GB">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#DC2626" />
    <title>Moved permanently to ${absSafe} | Living With Arthritis UK</title>
    <meta name="description" content="This URL (${fromPath}) has permanently moved to ${absSafe}. Use the destination page on Living With Arthritis UK." />
    <meta name="robots" content="noindex, nofollow" />
    <meta name="googlebot" content="noindex, nofollow" />
    <meta name="geo.region" content="GB" />
    <meta name="geo.placename" content="United Kingdom" />
    <link rel="canonical" href="${absSafe}" />
    <meta http-equiv="refresh" content="0;url=${destHref}" />
    <script>location.replace(${jsDest}+location.search+location.hash);</script>
    <style>
      :root { color-scheme: light; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: Georgia, "Times New Roman", serif;
        background: #FEF2F2;
        color: #1F2937;
        display: flex;
        align-items: stretch;
        justify-content: center;
      }
      main {
        width: 100%;
        max-width: 40rem;
        margin: auto;
        padding: 1.5rem 1.25rem 2.5rem;
      }
      .brand {
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #DC2626;
        margin: 0 0 1rem;
      }
      h1 {
        font-size: clamp(1.5rem, 4vw, 2rem);
        line-height: 1.2;
        margin: 0 0 1rem;
      }
      p { margin: 0 0 1rem; line-height: 1.6; }
      code {
        font-size: 0.9em;
        word-break: break-all;
        background: #fff;
        padding: 0.1em 0.35em;
        border-radius: 0.25rem;
      }
      .go {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 48px;
        min-width: 44px;
        padding: 0.75rem 1.25rem;
        background: #DC2626;
        color: #fff;
        text-decoration: none;
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 700;
        border-radius: 999px;
      }
      .go:focus-visible { outline: 3px solid #991B1B; outline-offset: 3px; }
      .note { font-size: 0.9rem; color: #4B5563; }
    </style>
  </head>
  <body>
    <main>
      <p class="brand">Living With Arthritis UK · Charity 1218461</p>
      <h1>This URL has permanently moved</h1>
      <p>The page at <code>${fromPath}</code> is no longer published. Continue on the current page:</p>
      <p><a class="go" href="${destHref}">Open the current page</a></p>
      <p class="note"><a href="${destHref}">${absSafe}</a></p>
      <p class="note">If you followed an old bookmark or search result, update it to the link above. Guides cover England, Scotland, Wales and Northern Ireland.</p>
      <noscript><p class="note">JavaScript is off, so use the button above.</p></noscript>
    </main>
  </body>
</html>
`;
}

/** Exact + common pattern rules for static-host redirect adapters. */
export function hostRedirectRules() {
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

