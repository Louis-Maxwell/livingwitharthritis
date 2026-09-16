#!/usr/bin/env node
/**
 * Post-build: write a unique indexable document at each real city hub
 * (`/arthritis-support/{slug}`) so Lovable's SPA fallback cannot serve
 * the homepage title/OG on those URLs.
 *
 * Known city hubs are index,follow and listed in the sitemap. Unknown
 * cities are not written — generate-404.mjs / host 404 owns junk slugs.
 * City×condition URLs 301 to the city hub (see seo-redirect-map.mjs).
 */
import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CITY_HUBS, SITE } from "./seo-redirect-map.mjs";

const DIST = resolve("dist");

const DISCLAIMER =
  "Educational information for people in the UK living with arthritis — not a diagnosis or personal medical advice. Check medicines and exercises with your GP, pharmacist or rheumatology team.";

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function assetTagsFromIndex(indexHtml) {
  return [
    ...indexHtml.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi),
    ...indexHtml.matchAll(/<link[^>]+rel=["']modulepreload["'][^>]*>/gi),
    ...indexHtml.matchAll(/<script[^>]+type=["']module["'][^>]*><\/script>/gi),
  ]
    .map((m) => `    ${m[0]}`)
    .join("\n");
}

export function buildCityHubHtml(city, assetTags = "") {
  const title = `Arthritis Support in ${city.name} | Living With Arthritis UK`;
  const description =
    city.description ||
    `Arthritis support information for people in ${city.name} from Living With Arthritis UK, a national UK charity.`;
  const path = `/arthritis-support/${city.slug}`;
  const abs = `${SITE}${path}`;
  const regionBit = city.region ? ` (${escapeHtml(city.region)})` : "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Arthritis Support in ${city.name}`,
    description,
    url: abs,
    isPartOf: { "@id": `${SITE}/#website` },
    about: {
      "@type": "Place",
      name: city.name,
      ...(city.region ? { containedInPlace: { "@type": "AdministrativeArea", name: city.region } } : {}),
    },
    publisher: { "@id": `${SITE}/#organization` },
    inLanguage: "en-GB",
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Arthritis support", item: `${SITE}/arthritis-support` },
      { "@type": "ListItem", position: 3, name: city.name, item: abs },
    ],
  };
  return `<!DOCTYPE html>
<html lang="en-GB">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${abs}" />
    <meta property="og:title" content="${escapeHtml(`Arthritis Support in ${city.name}`)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${abs}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Living With Arthritis UK" />
    <meta property="og:locale" content="en_GB" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(`Arthritis Support in ${city.name}`)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
    <script type="application/ld+json">${JSON.stringify(breadcrumbs)}</script>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
${assetTags}
  
  </head>
  <body>
    <a href="#main-content">Skip to main content</a>
    <div id="root">
      <main id="main-content" role="main" tabindex="-1" style="max-width:42rem;margin:0 auto;padding:4rem 1.5rem;font-family:Inter,system-ui,sans-serif;">
        <h1>Arthritis Support in ${escapeHtml(city.name)}</h1>
        <p>${escapeHtml(description)}</p>
        <p>Living With Arthritis is a <strong>UK national charity</strong> offering free educational guides for people in ${escapeHtml(city.name)}${regionBit} and across the country. We do not run a local clinic list on this page — use the hubs below for evidence-based information, then speak with your GP or rheumatology team about local care.</p>
        <ul>
          <li><a href="/exercises">Exercise hub</a> — joint-friendly movement guides</li>
          <li><a href="/conditions/rheumatoid-arthritis">Rheumatoid arthritis</a></li>
          <li><a href="/conditions/osteoarthritis">Osteoarthritis</a></li>
          <li><a href="/benefits-pip">PIP &amp; benefits guidance</a></li>
          <li><a href="/arthritis-support">All city support hubs</a></li>
          <li><a href="/contact">Contact the charity</a></li>
        </ul>
        <p role="note">${escapeHtml(DISCLAIMER)} <a href="/disclaimer">Full medical disclaimer</a>.</p>
      </main>
    </div>
  </body>
</html>
`;
}

export function writeCityHubHtml(distDir = DIST) {
  const indexPath = join(distDir, "index.html");
  const assetTags = existsSync(indexPath)
    ? assetTagsFromIndex(readFileSync(indexPath, "utf8"))
    : "";
  let written = 0;
  for (const city of CITY_HUBS) {
    const file = join(distDir, "arthritis-support", city.slug, "index.html");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, buildCityHubHtml(city, assetTags));
    written++;
  }
  return { written };
}

function isDirectRun() {
  const entry = process.argv[1];
  if (!entry) return false;
  try {
    return fileURLToPath(import.meta.url) === resolve(entry);
  } catch {
    return /write-city-hub-html\.mjs$/.test(entry);
  }
}

if (isDirectRun()) {
  if (!existsSync(join(DIST, "index.html"))) {
    console.warn("[city-hub-html] dist/index.html missing — skipping");
    process.exit(0);
  }
  const { written } = writeCityHubHtml();
  console.log(`[city-hub-html] wrote ${written} unique indexable city hub documents under dist/`);
}
