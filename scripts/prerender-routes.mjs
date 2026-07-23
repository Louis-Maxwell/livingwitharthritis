// Curated list of routes to prerender into static HTML so JSON-LD,
// <title>, and meta are visible to crawlers and extractors that do
// NOT execute JavaScript (Rich Results Test, LinkedIn, Slack,
// CCBot, PerplexityBot, and the citation-scrape passes many LLM
// engines still run without a JS runtime).
//
// Dynamic auth/admin/result pages are intentionally excluded.
//
// Blog posts are auto-included from src/data/blog-slugs.generated.json,
// which scripts/generate-sitemap.ts refreshes on predev/prebuild by
// querying blog_articles. Set PRERENDER_LIMIT to cap the blog set
// (newest-first) when a full render is too slow locally.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const CURATED = [
  "/",
  "/about",
  "/authors/maxwell",
  // Added: confirmed missing from prerendering via live Semrush crawl
  // (2026-07-23) — these pages have correct unique <title> tags in code
  // via react-helmet-async, but without prerendering, a non-JS-executing
  // crawler sees the raw SPA shell's default title instead, causing 43
  // pages to report as duplicate-title/duplicate-content.
  "/about-us",
  "/buddy",
  "/contact",
  "/cookies-policy",
  "/credits",
  "/diet-hub",
  "/exercise-hub",
  "/faq",
  "/finances",
  "/impact-stories",
  "/lived-experiences",
  "/privacy-policy",
  "/self-help-tool",
  "/sitemap",
  "/terms-conditions",
  "/trust-credibility",
  "/zakat",
  "/regions/england",
  "/regions/scotland",
  "/regions/wales",
  "/regions/northern-ireland",
  "/reviewers/dr-amina-patel",
  "/blog",
  "/blog-hub",
  "/diet",
  "/diet/mediterranean-diet-for-arthritis",
  "/exercises",
  "/exercises/tai-chi-for-balance",
  "/exercises/tai-chi-for-arthritis",
  "/exercises/seated-tai-chi-for-arthritis",
  "/exercises/tai-chi-for-beginners",
  "/conditions/osteoarthritis",
  "/conditions/rheumatoid-arthritis",
  "/conditions/psoriatic-arthritis",
  "/conditions/gout",
  "/conditions/ankylosing-spondylitis",
  "/conditions/juvenile-arthritis",
  "/conditions/fibromyalgia",
  "/conditions/lupus",
  "/conditions/knee-arthritis",
  "/conditions/hand-arthritis",
  "/conditions/shoulder-arthritis",
  "/conditions/elbow-arthritis",
  "/conditions/polymyalgia-rheumatica",
  "/conditions/reactive-arthritis",
  "/conditions/axial-spondyloarthritis",
  "/supplements",
  "/supplements/glucosamine",
  "/supplements/msm",
  "/living-with-arthritis",
  "/arthritis-mental-health",
  "/faq/can-arthritis-cause-fatigue",
  "/faq/arthritis-employment-rights-uk",
  "/faq/arthritis-disability-benefits-uk",
  "/faq/best-exercises-arthritis",
  "/faq/reduce-arthritis-pain-naturally",
  "/faq/what-is-osteoarthritis",
  "/faq/what-is-rheumatoid-arthritis",
  "/faq/what-is-juvenile-arthritis",
  "/faq/can-arthritis-affect-young-people",
  "/faq/is-arthritis-a-disability",
  "/faq/arthritis-and-pregnancy",
  "/faq/arthritis-and-sleep",
  "/faq/arthritis-flare-management",
  "/faq/returning-to-work-arthritis",
  "/faq/arthritis-support-groups-uk",
  "/faq/arthritis-pain-management",
  "/faq/arthritis-and-mental-health",
  "/faq/arthritis-medication-explained",
  "/faq/living-well-arthritis-tips",
  "/self-help",
  "/health-tools",
  "/ways-to-help",
  "/donate",
  "/zakat-appeal",
  "/corporate-giving",
  "/trust",
  "/community",
  "/governance",
  "/glossary",
  "/impact",
  "/arthritis-flare-ups",
  "/myths/does-cracking-knuckles-cause-arthritis",
  "/guides/uk-arthritis",
  "/guides/exercise",
  "/guides/diet",
  "/guides/health-services",
  "/guides/benefits-pip",
  "/guides/arthritis-pain-relief",
  "/arthritis-waiting-list-help",
  "/tools/waiting-time",
  "/arthritis-support",
  "/editorial-standards",
  "/privacy",
  "/cookies",
  "/terms",
  "/accessibility",
  "/safeguarding",
  "/complaints",
];

function loadBlogSlugs() {
  try {
    const raw = readFileSync(
      resolve(process.cwd(), "src/data/blog-slugs.generated.json"),
      "utf8",
    );
    const slugs = JSON.parse(raw);
    return Array.isArray(slugs) ? slugs : [];
  } catch {
    // File hasn't been generated yet — first-run bootstrap. The predev/prebuild
    // sitemap script populates it; falling through is safe.
    return [];
  }
}

const rawLimit = Number(process.env.PRERENDER_LIMIT || 0);
const blogSlugs = loadBlogSlugs();
const trimmed = rawLimit > 0 ? blogSlugs.slice(0, rawLimit) : blogSlugs;
const blogRoutes = trimmed.map((s) => `/blog/${s}`);

// Deduplicate. Curated wins if a slug is also hard-coded above.
const seen = new Set(CURATED);
for (const r of blogRoutes) seen.add(r);

export const PRERENDER_ROUTES = [...seen];

// Diagnostic on import so `PRERENDER=1 vite build` shows what will be rendered.
console.log(
  `[prerender] curated=${CURATED.length} blog=${blogRoutes.length} total=${PRERENDER_ROUTES.length}` +
    (rawLimit > 0 ? ` (PRERENDER_LIMIT=${rawLimit})` : ""),
);
