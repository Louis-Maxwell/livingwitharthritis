// Capture the real rendered page body (what a JS visitor sees) for every
// sitemap route whose static crawler HTML is thin, and store it in
// scripts/data/rendered-bodies.json. inject-canonicals.mjs then bakes that
// body into the no-JS HTML so crawlers see the page's own content, not a
// one-paragraph stub (GSC "Soft 404" / "Crawled - not indexed").
//
// Lovable's build has no Chromium, so this runs locally/CI and the output
// is committed. Re-run after changing page copy:
//   npm run build && node scripts/snapshot-rendered-bodies.mjs [--all]
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { routeFile, wordCount } from "./lib/route-words.mjs";

const OUT = "scripts/data/rendered-bodies.json";
const MIN = Number(process.env.MIN_WORDS || 250);
const all = process.argv.includes("--all");
const only = process.argv.slice(2).filter((a) => a.startsWith("/"));

const sitemap = readFileSync("public/sitemap.xml", "utf8");
let routes = only.length ? only : [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
if (!all && !only.length) routes = routes.filter((r) => { const f = routeFile(r); return f && wordCount(readFileSync(f, "utf8")) < MIN; });
console.log(`[snapshot] ${routes.length} routes`);

let store = {};
try { store = JSON.parse(readFileSync(OUT, "utf8")); } catch { store = {}; }
const server = spawn("npx", ["vite", "preview", "--port", "4179", "--strictPort"], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 4000));
const browser = await chromium.launch();
const ctx = await browser.newContext();
await ctx.route(/googletagmanager|google-analytics|evarist|supabase\.co/, (r) => r.abort());
const extract = () => {
  const root = document.querySelector("main#main-content") || document.querySelector("main") || document.querySelector("[role=main]") || document.querySelector("#root");
  if (!root) return "";
  const KEEP = new Set(["H2", "H3", "H4", "P", "UL", "OL", "LI", "A", "STRONG", "EM", "TABLE", "THEAD", "TBODY", "TR", "TH", "TD", "BLOCKQUOTE", "DL", "DT", "DD"]);
  const skip = (el) => el.matches("nav,header,footer,form,button,select,input,script,style,svg,noscript,[aria-hidden=true],[hidden],dialog,#static-article,#seo-fallback,.sr-only,[role=banner],[role=contentinfo],[aria-label='Donate to arthritis research'],[aria-label='Clinical review information'],a[href^='#']");
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const walk = (node) => {
    if (node.nodeType === 3) return esc(node.textContent.replace(/\s+/g, " "));
    if (node.nodeType !== 1 || skip(node)) return "";
    const inner = [...node.childNodes].map(walk).join("");
    if (node.tagName === "H1") return ""; // the static template writes its own H1
    if (!KEEP.has(node.tagName)) return /^(DIV|SECTION|ARTICLE|ASIDE)$/.test(node.tagName) ? ` ${inner} ` : inner;
    if (node.tagName === "A") {
      const href = node.getAttribute("href") || "";
      return /^\/(?!\/)/.test(href) || /^https:\/\//.test(href) ? `<a href="${href.replace(/"/g, "&quot;")}">${inner}</a>` : inner;
    }
    const t = node.tagName.toLowerCase();
    return inner.trim() ? `<${t}>${inner.trim()}</${t}>` : "";
  };
  return walk(root).replace(/\s{2,}/g, " ").trim();
};
let n = 0;
for (const route of routes) {
  const page = await ctx.newPage();
  try {
    await page.goto(`http://localhost:4179${route}`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(500);
    const html = await page.evaluate(extract);
    const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    if (words >= Number(process.env.STORE_MIN || 30) && !/page not found/i.test(html.slice(0, 400))) { store[route] = html; n++; }
    else console.warn(`[snapshot] ${route}: only ${words} words rendered`);
  } catch (e) { console.warn(`[snapshot] ${route}: ${e.message}`); }
  await page.close();
}
await browser.close(); server.kill();
writeFileSync(OUT, JSON.stringify(Object.fromEntries(Object.entries(store).sort()), null, 0).replace(/","\//g, '",\n"/') + "\n");
console.log(`[snapshot] stored ${n}; total ${Object.keys(store).length}`);
