// Generates public/rss.xml from the published blog catalog (runs in prebuild).
import { readFileSync, writeFileSync } from "node:fs";
const BASE = "https://livingwitharthritis.org.uk";
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const posts = JSON.parse(readFileSync("src/content/blog/catalog.generated.json", "utf8"))
  .slice()
  .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")) || a.slug.localeCompare(b.slug));
const items = posts.map((p) => {
  const url = `${BASE}/blog/${p.slug}`;
  const d = p.date ? new Date(`${String(p.date).slice(0, 10)}T09:00:00Z`).toUTCString() : "";
  return `    <item>\n      <title>${esc(p.title)}</title>\n      <link>${url}</link>\n      <guid isPermaLink="true">${url}</guid>\n${d ? `      <pubDate>${d}</pubDate>\n` : ""}      <category>${esc(p.category)}</category>\n      <description>${esc(p.excerpt)}</description>\n    </item>`;
}).join("\n");
const last = posts[0]?.date ? new Date(`${String(posts[0].date).slice(0, 10)}T09:00:00Z`).toUTCString() : "";
writeFileSync("public/rss.xml", `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Living With Arthritis guides</title>
    <link>${BASE}/blog</link>
    <atom:link href="${BASE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Free, clinically reviewed arthritis guides from Living With Arthritis, registered charity 1218461.</description>
    <language>en-gb</language>
${last ? `    <lastBuildDate>${last}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`);
console.log(`rss.xml: ${posts.length} guides`);
