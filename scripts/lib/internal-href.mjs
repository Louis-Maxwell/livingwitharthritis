/**
 * Resolve internal hrefs through the exact SEO redirect map so static link
 * lists point straight at the final URL instead of a redirect stub.
 */
import { exactRedirects } from "../seo-redirect-map.mjs";

let redirectMap;
function map() {
  if (!redirectMap) redirectMap = new Map(exactRedirects().map((r) => [r.from, r.to]));
  return redirectMap;
}

/** True when this path is a source in the exact redirect map. */
export function isRedirectedPath(path) {
  const clean = String(path || "").split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  return map().has(clean);
}

/** Follow the exact redirect chain for a site-relative href; keeps ?query#hash. */
export function resolveInternalHref(href) {
  const value = String(href || "");
  if (!value.startsWith("/") || value.startsWith("//")) return value;
  const m = /^([^?#]*)(.*)$/.exec(value);
  let path = m[1].replace(/\/+$/, "") || "/";
  const seen = new Set([path]);
  for (let i = 0; i < 5; i++) {
    const next = map().get(path);
    if (!next || seen.has(next)) break;
    seen.add(next);
    path = next;
  }
  return path === (m[1].replace(/\/+$/, "") || "/") ? value : path + m[2];
}

/** Rewrite every internal <a href> in an HTML string to its final URL. */
export function rewriteRedirectedHrefs(html) {
  return String(html).replace(/(<a\b[^>]*?\shref=")(\/[^"]*)"/gi,
    (all, pre, href) => `${pre}${resolveInternalHref(href)}"`);
}
