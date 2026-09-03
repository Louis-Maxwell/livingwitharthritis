// Post-build: emit per-route static HTML with the correct
// <meta property="og:url">, titles, descriptions, FAQ JSON-LD and
// unique article bodies so non-JS crawlers (Semrush, Bing, social
// previewers, GPTBot, OAI-SearchBot) see each sitemap URL as itself,
// not as the homepage shell. <link rel="canonical"> is stripped, not written.
//
// AI-VISIBILITY UPGRADE: for routes listed in scripts/ai-head-data.json,
// this script also rewrites the static <title>, meta description and
// og/twitter title+description, and injects per-route JSON-LD
// (MedicalWebPage/Article + BreadcrumbList + FAQPage) directly into the
// static HTML. This matters because most AI crawlers (GPTBot,
// OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot) do
// NOT execute JavaScript — react-helmet-async structured data is
// invisible to them. Baking it into the build output makes every key
// page fully legible and citable to answer engines with zero runtime cost.
//
// Reads routes from public/sitemap.xml (covers every page in the
// sitemap) plus the curated PRERENDER_ROUTES list as a fallback.
// Copies dist/index.html into dist/<route>/index.html with the head
// rewritten and a unique article body. Keeps a Puppeteer snapshot only
// when it already contains the full article; thin homepage shells are
// rebuilt so Google does not see a Soft 404.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PRERENDER_ROUTES } from "./prerender-routes.mjs";
import { deriveHeadData } from "./route-head-fallback.mjs";
import {
  buildStaticArticleInner,
  embedArticleJson,
  htmlHasFullArticle,
  replaceSeoFallback,
} from "./static-article-html.mjs";

const BASE = "https://livingwitharthritis.org.uk";
const DIST = resolve("dist");
const SRC = join(DIST, "index.html");
const AI_DATA_PATH = resolve("scripts/ai-head-data.json");
const BLOG_DATA_PATH = resolve("scripts/blog-head-data.json");
const CONDITION_DATA_PATH = resolve("scripts/condition-head-data.json");

const template = existsSync(SRC) ? readFileSync(SRC, "utf8") : "";

const readJson = (path) =>
  existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : {};

// Author/reviewer bio pages: real named heads built from the same reviewed
// records the React page renders, so E-E-A-T signals survive without JS.
function authorHeadData() {
  const records = readJson(resolve("src/data/medical-authors.json"));
  const out = {};
  for (const record of Object.values(records)) {
    if (!record?.slug || !record?.name) continue;
    const clean = (value) =>
      typeof value === "string" && !value.includes("[PLACEHOLDER") ? value : "";
    const credential = clean(record.credential);
    const bio = clean(record.bio);
    for (const prefix of ["authors", "reviewers"]) {
      const label = prefix === "reviewers" ? "Medical reviewer" : "Author";
      // /authors/x and /reviewers/x are separate URLs, so their head and
      // opening paragraph must differ — otherwise they read as duplicates.
      const role =
        prefix === "reviewers"
          ? `Medical reviewer profile`
          : `Author profile`;
      out[`/${prefix}/${record.slug}`] = {
        title: `${record.name}, ${record.title} — ${label} | Living With Arthritis UK`.slice(0, 115),
        description: `${role}: ${record.name}, ${record.title}${credential ? ` (${credential})` : ""}. ${bio}`
          .replace(/\s+/g, " ")
          .slice(0, 158),
        question: `${record.name} — ${label.toLowerCase()} profile`,
        answer: [
          prefix === "reviewers"
            ? `${record.name} medically reviews Living With Arthritis UK content as a ${record.title}${credential ? ` (${credential})` : ""}, checking each guide for clinical accuracy before publication.`
            : `${record.name} writes Living With Arthritis UK guides as a ${record.title}${credential ? ` (${credential})` : ""}, drawing on day-to-day UK musculoskeletal practice.`,
          bio,
        ]
          .filter(Boolean)
          .join(" "),
        breadcrumb: `${record.name} (${label.toLowerCase()})`,
      };
    }

  }
  return out;
}

// Curated entries win over auto-generated blog/author entries; all of them
// win over the slug-derived fallback applied in headDataFor().
const AI_DATA = {
  ...readJson(BLOG_DATA_PATH),
  ...readJson(CONDITION_DATA_PATH),
  ...authorHeadData(),
  ...readJson(AI_DATA_PATH),
};


function headDataFor(route, override) {
  return override ?? AI_DATA[route] ?? deriveHeadData(route);
}


// App-only screens: real 200 pages (the SPA needs them) but never indexable.
// They still get a unique static title/description so no URL on the domain
// serves the homepage head.
const NOINDEX_PREFIXES = [
  "/.lovable",
  "/account",
  "/admin",
  "/auth",
  "/buddy",
  "/callback",
  "/checkout",
  "/dashboard",
  "/debug",
  "/donation-result",
  "/unsubscribe",
];

export function isNoindexRoute(route) {
  return NOINDEX_PREFIXES.some((p) => route === p || route.startsWith(`${p}/`));
}

// Static (non-parameterised) routes declared in the router. Without these,
// hosting falls back to the SPA shell and the URL inherits the homepage
// title, description and body — Semrush's duplicate title/description/content
// findings were almost entirely these routes.
function appRoutes() {
  const appPath = resolve("src/App.tsx");
  if (!existsSync(appPath)) return [];
  const src = readFileSync(appPath, "utf8");
  return [...src.matchAll(/<Route\s+path="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((p) => p.startsWith("/") && p !== "/" && !p.includes(":") && !p.includes("*"));
}

function collectRoutes() {
  const set = new Set(PRERENDER_ROUTES);
  const sitemapPath = resolve("public/sitemap.xml");
  if (existsSync(sitemapPath)) {
    const xml = readFileSync(sitemapPath, "utf8");
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const u = m[1].trim();
      const path = u.replace(/^https?:\/\/[^/]+/, "") || "/";
      set.add(path);
    }
  }
  for (const p of appRoutes()) set.add(p);
  // Prefix landing screens that the router mounts via nested/wildcard routes.
  for (const p of NOINDEX_PREFIXES) if (p !== "/.lovable") set.add(p);
  set.delete("/");
  return [...set].filter((p) => p.startsWith("/") && !p.includes("*"));
}


// ---------- AI head enrichment helpers ----------

function escAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escText(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// JSON.stringify drops undefined object properties automatically, but we
// also strip empty arrays for cleanliness.
function compact(obj) {
  return JSON.parse(
    JSON.stringify(obj, (_k, v) => (Array.isArray(v) && v.length === 0 ? undefined : v)),
  );
}

function buildJsonLd(route, url, d) {
  const graphs = [];

  // 1) MedicalWebPage — the page entity itself, tied to the sitewide
  //    Organization/WebSite nodes already present in the static head.
  graphs.push({
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${url}#webpage`,
    url,
    name: d.title,
    headline: d.question || d.title,
    description: d.description,
    inLanguage: "en-GB",
    isPartOf: { "@id": `${BASE}/#website` },
    about: d.about ? { "@type": "MedicalCondition", name: d.about } : undefined,
    dateModified: d.updatedAt,
    publisher: { "@id": `${BASE}/#organization` },
    audience: { "@type": "MedicalAudience", audienceType: "Patient", geographicArea: { "@type": "Country", name: "United Kingdom" } },
    speakable: d.answer
      ? { "@type": "SpeakableSpecification", cssSelector: ["h1", ".answer-box"] }
      : undefined,
  });

  // 2) BreadcrumbList — Home → current page (always-valid two-level trail).
  graphs.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: d.breadcrumb || d.about || d.title, item: url },
    ],
  });

  // 3) FAQPage — the primary Q&A plus any configured FAQs. This is the
  //    highest-value block for answer engines: it hands them a quotable,
  //    attributed question/answer pair per page.
  // FAQPage is emitted ONLY when the page also renders the same visible
  // Q&A copy (d.faqs drives the visible FAQ section below), per Google's
  // structured-data policy. A lone question/answer pair is expressed as the
  // MedicalWebPage headline/speakable instead.
  const qaPairs = Array.isArray(d.faqs) ? [...d.faqs] : [];
  if (qaPairs.length > 0) {
    graphs.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: qaPairs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return graphs
    .map(
      (g) =>
        `  <script type="application/ld+json">${JSON.stringify(compact(g))}</script>`,
    )
    .join("\n");
}

function enrichHead(html, route, url, override) {
  const d = headDataFor(route, override);
  if (!d) return html;

  let out = html;

  if (d.title) {
    out = out.replace(/<title>[^<]*<\/title>/i, `<title>${escText(d.title)}</title>`);
    out = out.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${escAttr(d.title)}" />`,
    );
    out = out.replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" content="${escAttr(d.title)}" />`,
    );
  }

  if (d.description) {
    out = out.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${escAttr(d.description)}" />`,
    );
    out = out.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${escAttr(d.description)}" />`,
    );
    out = out.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" content="${escAttr(d.description)}" />`,
    );
  }

  // Per-route OG image (build-time satori output) when it exists.
  if (d.ogImage) {
    out = out.replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:image" content="${escAttr(d.ogImage)}" />`,
    );
    out = out.replace(
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:image" content="${escAttr(d.ogImage)}" />`,
    );
  }

  // Inject per-route JSON-LD just before </head>, after the sitewide
  // Organization/WebSite blocks (which stay untouched).
  out = out.replace(/<\/head>/i, `${buildJsonLd(route, url, d)}\n</head>`);

  // Unique visible article for non-JS readers. Replaces the entire
  // homepage #seo-fallback (not just the first H1) so Google cannot
  // treat the URL as an empty SPA shell or a homepage duplicate.
  const sources = Array.isArray(d.sources) ? d.sources : [];
  const sourcesHtml = sources.length
    ? `<section><h2>Sources and further reading</h2><ul>${sources
        .map(
          (s) =>
            `<li><a href="${escAttr(s.url)}" rel="noopener">${escText(s.name)}</a></li>`,
        )
        .join("")}</ul></section>`
    : "";

  out = replaceSeoFallback(out, `${buildStaticArticleInner(d)}${sourcesHtml}`, {
    visible: true,
  });
  if (d.article) out = embedArticleJson(out, d.article);

  return out;
}

// ---------- head rewrite (og:url + strip canonicals; keep AEO injection) ----------

export function rewriteHead(html, route, dataOverride) {
  const url = `${BASE}${route}`;
  // Replace homepage og:url with route-specific og:url.
  let out = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${url}" />`,
  );
  // Louis asked all <link rel="canonical"> tags removed. Strip any
  // inherited homepage canonical; do not insert a replacement. Titles,
  // descriptions, FAQ JSON-LD and static article HTML still run below.
  out = out.replace(/[ \t]*<link\s+rel="canonical"[^>]*>\s*\n?/gi, "");
  // App-only screens keep their unique head but must stay out of the index.
  if (isNoindexRoute(route)) {
    out = out.replace(/[ \t]*<meta\s+name="robots"[^>]*>\s*\n?/gi, "");
    out = out.replace(
      /<\/head>/i,
      `  <meta name="robots" content="noindex, follow" />\n</head>`,
    );
  }
  // Also update twitter:url if present.
  out = out.replace(
    /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:url" content="${url}" />`,
  );

  // AI-visibility enrichment (title, description, JSON-LD) for curated routes.
  out = enrichHead(out, route, url, dataOverride);
  return out;
}

function isDirectRun() {
  const entry = process.argv[1];
  if (!entry) return false;
  try {
    return fileURLToPath(import.meta.url) === resolve(entry);
  } catch {
    return /inject-canonicals\.mjs$/.test(entry);
  }
}

function writeRouteFiles() {
  if (!template) {
    console.warn("[inject-canonicals] dist/index.html missing — skipping");
    return;
  }
  const routes = collectRoutes();
  let written = 0;
  let skipped = 0;
  let rebuilt = 0;
  let enriched = 0;

  for (const route of routes) {
    const dir = join(DIST, route.replace(/^\//, ""));
    const file = join(dir, "index.html");
    const data = headDataFor(route);
    if (existsSync(file)) {
      const existing = readFileSync(file, "utf8");
      // Keep a successful Puppeteer snapshot. Rebuild thin shells that
      // still look like the homepage or only have a short answer teaser.
      if (htmlHasFullArticle(existing, data)) {
        skipped++;
        continue;
      }
      rebuilt++;
    }
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, rewriteHead(template, route));
    written++;
    if (data) enriched++;
  }

  console.log(
    `[inject-canonicals] wrote ${written} per-route HTML files (skipped ${skipped} existing, rebuilt ${rebuilt} thin snapshots, ${enriched} AI-enriched with static JSON-LD)`,
  );
}

if (isDirectRun()) {
  writeRouteFiles();
}
