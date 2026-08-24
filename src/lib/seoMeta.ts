/**
 * Meta title & description length enforcement.
 *
 * Rules:
 *  - Composed <title> (including any " | Site Name" suffix) ≤ 60 chars.
 *  - <meta name="description"> between 120–160 chars.
 *
 * Enforcement is applied at render time by SeoHead and by direct Helmet
 * callers via the exported helpers. Dev builds also warn when input
 * violates the limits so authors see the issue in the console.
 */

const SITE_SUFFIX = " | Living With Arthritis UK";
const MAX_TITLE = 60;
const MAX_DESC = 160;
const MIN_DESC = 120;

const isDev =
  typeof import.meta !== "undefined" &&
  // Vite injects import.meta.env.DEV; guard so non-Vite tooling doesn't crash.
  !!(import.meta as unknown as { env?: { DEV?: boolean } }).env?.DEV;

function truncateOnWord(text: string, max: number): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(" ");
  const base = lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice;
  return base.replace(/[\s\-–—,;:.]+$/, "") + "…";
}

export interface EnforceTitleOptions {
  includeSiteName?: boolean;
  route?: string;
}

/** Returns a title guaranteed to be ≤ 60 chars once the suffix is applied. */
export function enforceTitle(
  rawTitle: string,
  opts: EnforceTitleOptions = {},
): string {
  const { includeSiteName = true, route } = opts;
  const title = (rawTitle ?? "").trim();

  if (!includeSiteName) {
    if (title.length <= MAX_TITLE) return title;
    if (isDev) warnLength("title", title.length, MAX_TITLE, route, title);
    return truncateOnWord(title, MAX_TITLE);
  }

  const composed = `${title}${SITE_SUFFIX}`;
  if (composed.length <= MAX_TITLE) return composed;

  // Preserve the unique page title before preserving branding. Truncating the
  // page title to make room for the suffix caused hundreds of programmatic
  // city/condition pages to collapse onto identical titles.
  if (isDev) warnLength("title", composed.length, MAX_TITLE, route, composed);
  return title.length <= MAX_TITLE ? title : truncateOnWord(title, MAX_TITLE);
}

/** Returns a description ≤ 160 chars. Warns (dev only) when < 120. */
export function enforceDescription(
  rawDesc: string,
  route?: string,
): string {
  const desc = (rawDesc ?? "").trim().replace(/\s+/g, " ");
  if (desc.length > MAX_DESC) {
    if (isDev) warnLength("description", desc.length, MAX_DESC, route, desc);
    return truncateOnWord(desc, MAX_DESC);
  }
  if (isDev && desc.length > 0 && desc.length < MIN_DESC) {
     
  }
  return desc;
}

/** Dev-only helper for direct-Helmet callers to log any violation. */
export function assertMetaLengths(
  route: string,
  title: string,
  description: string,
): void {
  if (!isDev) return;
  if (title.length > MAX_TITLE) {
    warnLength("title", title.length, MAX_TITLE, route, title);
  }
  if (description.length > MAX_DESC) {
    warnLength("description", description.length, MAX_DESC, route, description);
  } else if (description.length > 0 && description.length < MIN_DESC) {
     
  }
}

function warnLength(
  kind: "title" | "description",
  actual: number,
  max: number,
  route: string | undefined,
  value: string,
): void {
   
}

export const SEO_LIMITS = {
  MAX_TITLE,
  MAX_DESC,
  MIN_DESC,
  SITE_SUFFIX,
} as const;
