// Post-build: emit per-route static HTML with the correct
// <link rel="canonical"> and <meta property="og:url"> so non-JS
// crawlers (Semrush, Bing, social previewers) see each sitemap URL
// as canonical to itself, not to the homepage.
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
// rewritten. Skips routes whose index.html already exists (so the
// puppeteer prerender `build:prerender` path keeps working).

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { PRERENDER_ROUTES } from "./prerender-routes.mjs";
import { deriveHeadData } from "./route-head-fallback.mjs";

const BASE = "https://livingwitharthritis.org.uk";
const DIST = resolve("dist");
const SRC = join(DIST, "index.html");
const AI_DATA_PATH = resolve("scripts/ai-head-data.json");
const BLOG_DATA_PATH = resolve("scripts/blog-head-data.json");

if (!existsSync(SRC)) {
  console.warn("[inject-canonicals] dist/index.html missing — skipping");
  process.exit(0);
}

const template = readFileSync(SRC, "utf8");

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
      out[`/${prefix}/${record.slug}`] = {
        title: `${record.name} — ${record.title} | Living With Arthritis UK`,
        description: (
          bio || `${record.name}, ${record.title}. ${label} on Living With Arthritis UK.`
        ).slice(0, 158),
        question: `${record.name} — ${record.title}`,
        answer: [
          `${record.name} is a ${record.title}${credential ? ` (${credential})` : ""} contributing to Living With Arthritis UK as ${label.toLowerCase()}.`,
          bio,
        ]
          .filter(Boolean)
          .join(" "),
        breadcrumb: record.name,
      };
    }
  }
  return out;
}

// Curated entries win over auto-generated blog/author entries; all of them
// win over the slug-derived fallback applied in headDataFor().
const AI_DATA = {
  ...readJson(BLOG_DATA_PATH),
  ...authorHeadData(),
  ...readJson(AI_DATA_PATH),
};


function headDataFor(route) {
  return AI_DATA[route] ?? deriveHeadData(route);
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

function enrichHead(html, route, url) {
  const d = headDataFor(route);
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

  // ---- VISIBLE static content for non-JS readers (AEO/GEO checkers, AI
  // crawlers). Replaces the homepage <h1> inside the #seo-fallback with a
  // route-specific question H1, a direct-answer opening paragraph, reviewer
  // attribution + freshness line, a question-headed FAQ section, and an
  // authoritative-sources list. The rest of the fallback (internal links,
  // site sections) is kept for link equity and word count.
  const updated = d.updatedAt
    ? `Last updated ${d.updatedAt}. `
    : "";

  const faqPairs = [];
  if (Array.isArray(d.faqs)) faqPairs.push(...d.faqs);
  const faqHtml = faqPairs.length
    ? `<section><h2>Frequently asked questions</h2>${faqPairs
        .map((f) => `<h3>${escText(f.q)}</h3><p>${escText(f.a)}</p>`)
        .join("")}</section>`
    : "";

  const sources = Array.isArray(d.sources) ? d.sources : [];
  const sourcesHtml = sources.length
    ? `<section><h2>Sources and further reading</h2><ul>${sources
        .map(
          (s) =>
            `<li><a href="${escAttr(s.url)}" rel="noopener">${escText(s.name)}</a></li>`,
        )
        .join("")}</ul></section>`
    : "";

  const answerBlock =
    `<h1>${escText(d.question || d.title)}</h1>` +
    (d.answer ? `<p class="answer-box"><strong>${escText(d.answer)}</strong></p>` : "") +
    `<p><em>${escText(updated)}This is general information, not a substitute for personalised medical advice.</em></p>` +
    faqHtml +
    sourcesHtml;

  // Swap only the first <h1>…</h1> (the homepage headline in the fallback).
  out = out.replace(/<h1>[^<]*<\/h1>/, answerBlock);

  return out;
}

// ---------- head rewrite (canonical/og:url — unchanged behaviour) ----------

function rewriteHead(html, route) {
  const url = `${BASE}${route}`;
  // Replace homepage og:url with route-specific og:url.
  let out = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${url}" />`,
  );
  // Exactly one self-referencing canonical per page: drop any inherited
  // homepage canonical from the template, then insert this route's own.
  out = out.replace(/[ \t]*<link\s+rel="canonical"[^>]*>\s*\n?/gi, "");
  out = out.replace(
    /<\/head>/i,
    `  <link rel="canonical" href="${url}" />\n</head>`,
  );
  // Also update twitter:url if present.
  out = out.replace(
    /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:url" content="${url}" />`,
  );
  // AI-visibility enrichment (title, description, JSON-LD) for curated routes.
  out = enrichHead(out, route, url);
  return out;
}

const routes = collectRoutes();
let written = 0;
let skipped = 0;
let enriched = 0;

for (const route of routes) {
  const dir = join(DIST, route.replace(/^\//, ""));
  const file = join(dir, "index.html");
  if (existsSync(file)) {
    skipped++;
    continue;
  }
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, rewriteHead(template, route));
  written++;
  if (headDataFor(route)) enriched++;
}

console.log(
  `[inject-canonicals] wrote ${written} per-route HTML files (skipped ${skipped} existing, ${enriched} AI-enriched with static JSON-LD)`,
);
