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
  // Correction (2026-07-23): a previous pass here added several routes
  // based on GUESSED URL slugs from a Semrush crawl report, without
  // verifying them against the actual <Route> paths in App.tsx. Most of
  // those guesses were wrong (e.g. "/about-us" and "/zakat" and
  // "/finances" do not exist — the real routes are "/about",
  // "/zakat-appeal", and there is no finances page at all) and were
  // ALREADY correctly present in this file under their real names. Only
  // genuinely missing real routes are added below. The wrong entries
  // have been removed.
  //
  // IMPORTANT — the actual root cause behind Semrush seeing 200+duplicate
  // content on invalid URLs like /about-us, /zakat, /finances is that
  // this SPA has no server-level 404 status handling: any unmatched path
  // falls through to the static index.html shell, which returns HTTP 200
  // with the default title. NotFound.tsx does correctly set noindex, but
  // only AFTER JavaScript executes — a non-JS-executing crawler never
  // sees it. This needs a hosting-level fix (proper 404 status for
  // unmatched routes), not a prerender-list fix. See conversation notes.
  "/buddy",
  "/contact",
  "/credits",
  "/faq",
  "/regions/england",
  "/regions/scotland",
  "/regions/wales",
  "/regions/northern-ireland",
  "/site-index",
  "/stories",
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
