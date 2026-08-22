// Curated list of routes to prerender into static HTML so JSON-LD,
// <title>, and meta are visible to crawlers and extractors that do
// NOT execute JavaScript (Rich Results Test, LinkedIn, Slack,
// CCBot, PerplexityBot, and the citation-scrape passes many LLM
// engines still run without a JS runtime).
//
// Dynamic auth/admin/result pages are intentionally excluded.
//
// Blog posts are auto-included from src/data/blog-slugs.generated.json.
// Every other dynamic route family (city x service, condition x subpage,
// exercise x condition, glossary, comparison guides, city hubs, pets,
// authors/reviewers, etc.) is auto-included from
// src/data/prerender-routes.generated.json. Both files are refreshed by
// scripts/generate-sitemap.ts on predev/prebuild — this file itself never
// needs editing when new combinatorial content is added. Set PRERENDER_LIMIT
// to cap the blog set (newest-first) when a full render is too slow locally.

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
  // Only real RegionHub records belong here. Invalid paths navigate to "/"
  // inside React Router, which makes the prerender plugin overwrite the root
  // output with the invalid route's canonical metadata.
  "/regions/scotland",
  "/regions/wales",
  "/site-index",
  "/stories",
  // "/reviewers/dr-amina-patel" removed 2026-08-15: that reviewer profile
  // was a fabricated placeholder credential, already scrubbed from
  // blog_articles by a 2026-07-30 migration; the route itself no longer
  // exists (404s), and this stale entry was the single largest source of
  // 404s during every prerender pass — 4,000+ hits in Evarist's traffic
  // data over the last week alone, all misattributed as real visits.
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

function loadGeneratedList(relPath) {
  try {
    const raw = readFileSync(resolve(process.cwd(), relPath), "utf8");
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    // File hasn't been generated yet — first-run bootstrap. The predev/prebuild
    // sitemap script populates it; falling through is safe.
    return [];
  }
}

const rawLimit = Number(process.env.PRERENDER_LIMIT || 0);
const blogSlugs = loadGeneratedList("src/data/blog-slugs.generated.json");
const trimmedBlogSlugs = rawLimit > 0 ? blogSlugs.slice(0, rawLimit) : blogSlugs;
const blogRoutes = trimmedBlogSlugs.map((s) => `/blog/${s}`);

// Every other route the sitemap generator discovered: static App.tsx routes,
// the city/condition/exercise/glossary/comparison/pet combinatorial
// families, author/reviewer pages, etc. Previously these had zero prerender
// coverage beyond the small hand-curated list below.
const otherRoutes = loadGeneratedList("src/data/prerender-routes.generated.json");

// Deduplicate. Curated wins if a slug is also hard-coded above.
const seen = new Set(CURATED);
for (const r of otherRoutes) seen.add(r);
for (const r of blogRoutes) seen.add(r);

// Hard cap so the published output can never approach the hosting limits
// (50,000 files / 3 GiB). Curated routes are first in the set, so a cap
// always keeps the highest-value pages.
const MAX_PRERENDER_ROUTES = Number(process.env.MAX_PRERENDER_ROUTES || 5000);
const allRoutes = [...seen];
export const PRERENDER_ROUTES = allRoutes.slice(0, MAX_PRERENDER_ROUTES);

// Diagnostic on import so the build log shows what will be rendered.
console.log(
  `[prerender] curated=${CURATED.length} other=${otherRoutes.length} blog=${blogRoutes.length} total=${PRERENDER_ROUTES.length}` +
    (allRoutes.length > PRERENDER_ROUTES.length
      ? ` (capped from ${allRoutes.length})`
      : "") +
    (rawLimit > 0 ? ` (PRERENDER_LIMIT=${rawLimit})` : ""),
);

