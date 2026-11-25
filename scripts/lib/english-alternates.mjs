/** English hreflang clusters for the single-domain multi-region strategy.
 *
 * Universal clinical pages (conditions, exercises, diet, supplements,
 * treatments, library, health-advice guides and clinical blog posts) get the
 * full UK/US/CA/AU/IN cluster: same English content, one URL per page, no
 * duplicate pages. Country-specific UK benefits content (PIP, Attendance
 * Allowance, Blue Badge and the benefits blog category) stays bound to en-GB.
 * Everything else keeps the generic English cluster.
 *
 * Never label translated pages as English or fabricate country/language
 * versions.
 */
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { isHealthAdviceGuide } from "../../src/lib/technicalSeo.mjs";

const UNIVERSAL_PREFIX = /^\/(conditions|exercises|diet|supplements|treatments|library)(\/|$)/;
const UNIVERSAL_LANGS = ["en-GB", "en-US", "en-CA", "en-AU", "en-IN", "x-default"];
const UK_ONLY_LANGS = ["en-GB", "x-default"];
const DEFAULT_LANGS = ["en", "en-GB", "x-default"];
const MANAGED_LANGS = ["en", "en-GB", "en-US", "en-CA", "en-AU", "en-IN", "x-default"];

const UK_ONLY_BLOG_CATEGORY = "Benefits, PIP & work";
const UNIVERSAL_BLOG_CATEGORIES = new Set([
  "Conditions",
  "Joint Pain & Conditions",
  "Exercise & movement",
  "Diet & lifestyle",
  "Treatments & medicines",
  "Pain & flares",
  "Surgery & recovery",
  "Mental health & fatigue",
  "Carers & family",
]);

let blogCategories;
function blogCategoryFor(slug) {
  if (!blogCategories) {
    blogCategories = new Map();
    const dir = resolve("src/content/blog/posts");
    for (const file of readdirSync(dir)) {
      if (!file.endsWith(".json")) continue;
      try {
        const data = JSON.parse(readFileSync(resolve(dir, file), "utf8"));
        if (data?.slug && data?.category) blogCategories.set(data.slug, data.category);
      } catch {
        // Unparseable post files are skipped; the build validates them elsewhere.
      }
    }
  }
  return blogCategories.get(slug);
}

/** Locale set a route declares. Pure classification: no page content is read. */
export function hreflangLangsFor(route) {
  const clean = route.split(/[?#]/)[0];
  const path = clean === "/" ? "/" : clean.replace(/\/+$/, "");
  if (path.startsWith("/blog/")) {
    const category = blogCategoryFor(path.slice("/blog/".length));
    if (category === UK_ONLY_BLOG_CATEGORY) return UK_ONLY_LANGS;
    if (category && UNIVERSAL_BLOG_CATEGORIES.has(category)) return UNIVERSAL_LANGS;
    return DEFAULT_LANGS;
  }
  if (UNIVERSAL_PREFIX.test(path)) return UNIVERSAL_LANGS;
  if (path.startsWith("/guides/")) {
    return isHealthAdviceGuide(path) ? UNIVERSAL_LANGS : UK_ONLY_LANGS;
  }
  return DEFAULT_LANGS;
}

/** Replace the managed English hreflang cluster in a page head. */
export function patchEnglishAlternates(html, route, base) {
  if (/^\/(es|fr|de|pt)(?:\/|$)/.test(route)) return html;
  const clean = route.split(/[?#]/)[0];
  const path = clean === "/" ? "/" : clean.replace(/\/+$/, "");
  const url = `${base}${path}`;
  const attr = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  let out = html;
  for (const lang of MANAGED_LANGS) {
    // Remove only the managed English cluster; leave genuine translated alternates intact.
    out = out.replace(/<link\b[^>]*>/gi, (tag) => {
      const rel = /\brel=["']([^"']+)["']/i.exec(tag)?.[1];
      const code = /\bhreflang=["']([^"']+)["']/i.exec(tag)?.[1];
      return rel?.toLowerCase() === "alternate" && code?.toLowerCase() === lang.toLowerCase() ? "" : tag;
    });
  }
  const links = route.includes("?")
    ? ""
    : hreflangLangsFor(route).map((lang) => `  <link rel="alternate" hreflang="${lang}" href="${attr(url)}" />`).join("\n");
  return out.replace(/<\/head>/i, `${links}\n</head>`);
}
