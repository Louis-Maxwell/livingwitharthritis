// Shared sitemap serialization. No network checks or invented modification dates.
export function asIsoDate(value, today = new Date().toISOString().slice(0, 10)) {
  if (typeof value !== "string") return undefined;
  const date = value.trim().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date > today) return undefined;
  const parsed = new Date(`${date}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date
    ? date : undefined;
}

export function escapeXml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;",
  })[c]);
}

export function uniqueEntries(entries) {
  const byPath = new Map();
  for (const entry of entries) {
    // A sitemap must advertise exact clean canonical paths, never query variants,
    // fragments, absolute URLs, wildcard routes or traversal paths.
    if (!/^\/(?:[a-z0-9._~-]+(?:\/[a-z0-9._~-]+)*)?$/.test(entry.path) ||
        entry.path.split("/").some((p) => p === "." || p === "..")) {
      throw new Error(`[sitemap] invalid canonical path: ${entry.path}`);
    }
    const prior = byPath.get(entry.path);
    const dates = [asIsoDate(prior?.lastmod), asIsoDate(entry.lastmod)].filter(Boolean).sort();
    byPath.set(entry.path, { path: entry.path, ...(dates.length ? { lastmod: dates.at(-1) } : {}) });
  }
  return [...byPath.values()].sort((a, b) => a.path.localeCompare(b.path, "en"));
}

export function buildUrlset(entries, base) {
  const unique = uniqueEntries(entries);
  if (unique.length > 50_000) throw new Error("[sitemap] URL limit exceeded; split the section");
  const xml = ['<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...unique.map((e) => ["  <url>", `    <loc>${escapeXml(base + e.path)}</loc>`,
      ...(e.lastmod ? [`    <lastmod>${e.lastmod}</lastmod>`] : []), "  </url>"].join("\n")),
    "</urlset>", ""].join("\n");
  if (Buffer.byteLength(xml, "utf8") > 50 * 1024 * 1024) throw new Error("[sitemap] byte limit exceeded");
  return xml;
}

export function sitemapSection(path) {
  if (path.startsWith("/blog/") && path !== "/blog/archive" && !path.startsWith("/blog/category/")) return "articles";
  if (/^\/(conditions|library|faq|glossary)(\/|$)/.test(path)) return "conditions";
  if (/^\/(guides|exercises|resources|daily-tips)(\/|$)/.test(path)) return "resources";
  return "core";
}

export function buildSitemapIndex(sectionNames, base) {
  // Child <lastmod> describes the sitemap FILE, not the newest page date.
  // Omit it until the publishing system supplies a real file-change timestamp.
  return ['<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sectionNames.map((name) => `  <sitemap>\n    <loc>${escapeXml(base + `/sitemaps/${name}.xml`)}</loc>\n  </sitemap>`),
    "</sitemapindex>", ""].join("\n");
}
