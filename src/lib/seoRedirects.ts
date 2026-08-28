/**
 * Canonical redirects for Search Console clean-up.
 *
 * Google was classifying empty locale prefixes, unknown city hubs, and
 * combinatorial thin templates as soft 404s (HTTP 200 + thin/empty body).
 * This map is the client-side fallback; `public/_redirects` is the HTTP 301
 * source of truth when the host honours it.
 */
import { BLOG_SLUG_REDIRECTS } from "@/data/blogRedirects";
import { ukCities } from "@/data/ukCities";
import {
  TRANSLATED_BASE_PATHS,
  detectLangFromPath,
  stripLangPrefix,
} from "@/lib/translations";

const CITY_SLUGS = new Set(ukCities.map((c) => c.slug));

/** Closest live city hub for GSC soft-404 city URLs that were never real pages. */
export const CITY_HUB_ALIASES: Record<string, string> = {
  stockport: "manchester",
  stirling: "glasgow",
  winchester: "southampton",
  bradford: "leeds",
  "milton-keynes": "cambridge",
  oswestry: "stoke-on-trent",
  shrewsbury: "wolverhampton",
};

const EXERCISE_TYPES = new Set([
  "swimming",
  "yoga",
  "cycling",
  "walking",
  "tai-chi",
  "pilates",
  "stretching",
  "strength-training",
]);
const EXERCISE_JOINTS = new Set([
  "knee",
  "hip",
  "shoulder",
  "hand",
  "back",
  "ankle",
]);

const JOINT_EXERCISE_HUB: Record<string, string> = {
  neck: "/exercises/neck-arthritis-exercises",
  ankle: "/exercises/ankle-arthritis-exercises",
  knee: "/conditions/knee-arthritis",
  hip: "/conditions/hip-arthritis",
  shoulder: "/conditions/shoulder-arthritis",
  hand: "/conditions/hand-arthritis",
  back: "/exercises",
};

export const EXACT_SEO_REDIRECTS: Record<string, string> = {
  "/exercise-hub": "/exercises",
  "/about-us": "/about",
  "/trust-credibility": "/trust",
  "/privacy-policy": "/privacy",
  "/cookies-policy": "/cookies",
  "/terms-conditions": "/terms",
  "/es/corporate-partnerships": "/corporate-partnerships",
  "/fr/corporate-partnerships": "/corporate-partnerships",
  "/de/corporate-partnerships": "/corporate-partnerships",
  "/pt/corporate-partnerships": "/corporate-partnerships",
};

function normalizePath(pathname: string): string {
  if (!pathname) return "/";
  const noQuery = pathname.split("?")[0].split("#")[0];
  const collapsed = noQuery.replace(/\/{2,}/g, "/");
  if (collapsed.length > 1 && collapsed.endsWith("/")) {
    return collapsed.slice(0, -1);
  }
  return collapsed || "/";
}

function cityHubOrIndex(citySlug: string): string {
  if (CITY_SLUGS.has(citySlug)) return `/arthritis-support/${citySlug}`;
  const alias = CITY_HUB_ALIASES[citySlug];
  if (alias && CITY_SLUGS.has(alias)) return `/arthritis-support/${alias}`;
  return "/arthritis-support";
}

function resolveOnce(path: string): string | null {
  if (EXACT_SEO_REDIRECTS[path]) return EXACT_SEO_REDIRECTS[path];

  // Locale 404s must not stay as crawlable URLs.
  if (/^\/(es|fr|de|pt)\/404$/.test(path)) return "/";

  const lang = detectLangFromPath(path);
  if (lang !== "en") {
    const base = stripLangPrefix(path);
    if (TRANSLATED_BASE_PATHS.includes(base)) return null;
    if (base === "/404") return "/";
    return base === path ? "/" : base;
  }

  const blogMatch = path.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const dest = BLOG_SLUG_REDIRECTS[blogMatch[1]];
    if (dest) return `/blog/${dest}`;
  }

  const cityCondition = path.match(/^\/arthritis-support\/([^/]+)\/([^/]+)$/);
  if (cityCondition) return cityHubOrIndex(cityCondition[1]);

  const cityHub = path.match(/^\/arthritis-support\/([^/]+)$/);
  if (cityHub && cityHub[1] !== "index" && !CITY_SLUGS.has(cityHub[1])) {
    return cityHubOrIndex(cityHub[1]);
  }

  const ukService = path.match(/^\/uk\/([^/]+)\/([^/]+)$/);
  if (ukService) return cityHubOrIndex(ukService[1]);

  const exerciseCondition = path.match(/^\/exercises\/([^/]+)\/for\/([^/]+)$/);
  if (exerciseCondition) {
    return JOINT_EXERCISE_HUB[exerciseCondition[1]] ?? "/exercises";
  }

  const exerciseSlug = path.match(/^\/exercises\/([^/]+)$/);
  if (exerciseSlug) {
    const slug = exerciseSlug[1];
    const short = slug.match(/^([a-z0-9-]+)-for-([a-z]+)$/);
    if (
      short &&
      EXERCISE_TYPES.has(short[1]) &&
      EXERCISE_JOINTS.has(short[2]) &&
      !slug.endsWith("-arthritis")
    ) {
      return `/exercises/${short[1]}-for-${short[2]}-arthritis`;
    }
  }

  return null;
}

/**
 * Returns a destination path when `pathname` should 301, or null to render
 * the current route. Collapses redirect chains into a single hop.
 */
export function resolveSeoRedirect(pathname: string): string | null {
  let current = normalizePath(pathname);
  let dest: string | null = null;
  const seen = new Set<string>([current]);
  for (let i = 0; i < 5; i++) {
    const next = resolveOnce(current);
    if (!next || seen.has(next)) break;
    seen.add(next);
    dest = next;
    current = next;
  }
  return dest;
}

export function isIndexableCityHubPath(path: string): boolean {
  const match = path.match(/^\/arthritis-support\/([^/]+)$/);
  return Boolean(match && CITY_SLUGS.has(match[1]));
}
