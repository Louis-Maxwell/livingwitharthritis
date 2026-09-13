import { readFileSync, writeFileSync } from "node:fs";

const SITEMAP = "public/sitemap.xml";
const BASE = "https://livingwitharthritis.org.uk";

// The sitemap is an indexing hint, not a complete URL inventory. Keep it focused
// on canonical, user-facing editorial/resource pages that deserve Search traffic.
// Utility, transactional, duplicate, thin programmatic and doorway-style URLs
// remain reachable where appropriate but are deliberately not submitted in XML.
const EXCLUDED_EXACT = new Set([
  "/chat",
  "/search",
  "/blog-hub",
  "/benefits-pip",
  "/self-help",
  "/symptom-checker",
  "/zakat-appeal",
  "/trust",
  "/community",
  "/privacy",
  "/cookies",
  "/accessibility",
  "/shop",
  "/arthritis-support",
  "/corporate-giving",
  "/governance",
  "/impact",
  "/ways-to-help",
  "/terms",
  "/safeguarding",
  "/complaints",
  "/donate",
  "/press",
  "/partners",
  "/stories",
  "/expert-articles",
  "/resources-directory",
  "/health-tools",
  "/services",
  "/faq",
  "/contact",
  "/arthritis-waiting-list-help",
  "/tools/waiting-time",
  "/pedometer",
  "/gallery",
  "/credits",
  "/self-assessment",
  "/buddy",
  "/corporate-partnerships",
  "/glossary",
  "/pets",
  "/research",
  "/research/clinical-trials",
  "/research/grants",
  "/events",
  "/podcasts",
  "/helpline",
  "/volunteer",
  "/advocacy",
  "/ai",
  "/ai-citations",
  "/ai-guidelines",
  "/accessibility-for-ai",
  "/editorial-standards",
  "/seo-content-framework",
  "/authors",
  "/reviewers",
  "/about/ai-transparency",
  "/about/editorial-claims-policy",
  "/about/uk-arthritis-search-insights",
]);

const EXCLUDED_PREFIXES = [
  "/daily-tips/",
  "/product/",
  "/arthritis-support/",
  "/uk/",
  "/regions/",
  "/glossary/",
  "/pets/",
  "/authors/",
  "/reviewers/",
  "/community/",
  "/research/",
];

const EXCLUDED_PATTERNS = [
  // Programmatic exercise matrix: many near-identical combinations are not
  // independently valuable until each page has genuinely unique copy/evidence.
  /^\/exercises\/(swimming|yoga|cycling|walking|tai-chi|pilates|stretching|strength-training)-for-/,
  // Condition subpages are retained only where the site has made them a real
  // editorial destination; the generated matrix should not be a blanket index.
  /^\/conditions\/[^/]+\/(symptoms|treatment|exercises|diet)$/,
  // Glossary entries are useful navigation but generally too thin to compete
  // as standalone search landing pages at the current stage.
  /^\/glossary\//,
];

function pathFromLoc(loc) {
  return new URL(loc).pathname.replace(/\/{2,}/g, "/").replace(/\/$/, "") || "/";
}

function shouldKeep(path) {
  if (path === "/") return true;
  if (EXCLUDED_EXACT.has(path)) return false;
  if (EXCLUDED_PREFIXES.some((prefix) => path.startsWith(prefix))) return false;
  if (EXCLUDED_PATTERNS.some((pattern) => pattern.test(path))) return false;

  // Keep canonical editorial clusters and useful hubs.
  if (path === "/about" || path === "/sources") return true;
  if (/^\/conditions\/[^/]+$/.test(path)) return true;
  if (/^\/blog$/.test(path) || /^\/blog\/[^/]+$/.test(path)) return true;
  if (/^\/guides$/.test(path) || /^\/guides\/[^/]+$/.test(path)) return true;
  if (/^\/faq\/[^/]+$/.test(path)) return true;
  if (/^\/library\/[^/]+$/.test(path)) return true;
  if (/^\/exercises\/(tai-chi-for-balance|tai-chi-for-arthritis|seated-tai-chi-for-arthritis|tai-chi-for-beginners|ankle-arthritis-exercises|neck-arthritis-exercises)$/.test(path)) return true;
  if (/^\/diet\/(mediterranean-diet-for-arthritis|foods-to-avoid-with-arthritis)$/.test(path)) return true;
  if (/^\/myths\/[^/]+$/.test(path)) return true;
  if (/^\/resources\/(flare-action-plan|pip-evidence-diary|clinic-pack)$/.test(path)) return true;
  if (/^\/arthritis-flare-ups$/.test(path)) return true;

  // Keep explicit comparison guides: unlike the generated matrix, these are
  // registered editorial routes with a stable URL and a clear user intent.
  if (/^\/guides\/[^/]+-vs-[^/]+$/.test(path)) return true;

  return false;
}

const xml = readFileSync(SITEMAP, "utf8");
const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) ?? [];
const kept = [];
const removed = [];
const seen = new Set();

for (const block of blocks) {
  const match = block.match(/<loc>([^<]+)<\/loc>/);
  if (!match) continue;
  const loc = match[1].trim();
  const path = pathFromLoc(loc);
  if (loc.startsWith(BASE) && shouldKeep(path) && !seen.has(loc)) {
    seen.add(loc);
    kept.push(block);
  } else {
    removed.push(path);
  }
}

if (!kept.some((block) => block.includes(`<loc>${BASE}/</loc>`))) {
  throw new Error("[sitemap-quality] Refusing to write a sitemap without the homepage.");
}

const output = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${kept.join("\n")}\n</urlset>\n`;
writeFileSync(SITEMAP, output, "utf8");

console.log(`[sitemap-quality] kept ${kept.length} canonical index-worthy URLs; removed ${removed.length} low-value/utility URLs.`);
