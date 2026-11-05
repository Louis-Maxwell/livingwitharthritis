import { existsSync } from "node:fs";
import { join } from "node:path";

/** dist file served for a route, or null. */
export function routeFile(route, dist = "dist") {
  const p = route.replace(/^\/+|\/+$/g, "");
  for (const f of [p ? join(dist, p, "index.html") : join(dist, "index.html"), join(dist, `${p}.html`)]) if (existsSync(f)) return f;
  return null;
}

/** Visible words in the crawler HTML body (head, scripts and styles removed). */
export function wordCount(html) {
  const body = String(html)
    .replace(/<head[\s\S]*?<\/head>/i, " ")
    .replace(/<(script|style|noscript|template)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ");
  return body.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}
