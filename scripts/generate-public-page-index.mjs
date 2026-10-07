import fs from "node:fs";
const xml = fs.readFileSync("public/sitemap.xml", "utf8");
const layers = ["blog", "condition", "library", "hub-guide", "editorial", "ai"].map(name => {
  try { return JSON.parse(fs.readFileSync(`scripts/${name}-head-data.json`, "utf8")); } catch { return {}; }
});
const rows = [...xml.matchAll(/<loc>https:\/\/livingwitharthritis\.org\.uk([^<]*)<\/loc>/g)].map(m => {
  const path = m[1] || "/";
  const entry = Object.assign({}, ...layers.map(layer => layer[path] ?? {}));
  const title = (entry.question || entry.title || (path === "/" ? "Home" : path.split("/").filter(Boolean).join(" · ").replace(/-/g, " "))).replace(/ \| Living With Arthritis$/, "");
  return { path, title };
});
if (rows.length < 1000 || new Set(rows.map(x => x.path)).size !== rows.length) throw new Error("Invalid canonical index inventory");
fs.writeFileSync("src/data/public-page-index.generated.json", JSON.stringify(rows, null, 2) + "\n");
console.log(`[public-page-index] ${rows.length} canonical pages`);
