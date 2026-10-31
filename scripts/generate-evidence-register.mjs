#!/usr/bin/env node
/**
 * Builds src/data/evidence-register.generated.json: every NHS, NICE and
 * research source cited in the codebase, with the public pages citing it.
 * Runs in prebuild so /evidence-register stays in sync with the content.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const OUT = path.join(SRC, "data", "evidence-register.generated.json");

const RESEARCH_HOSTS = [
  "pubmed.ncbi.nlm.nih.gov", "ncbi.nlm.nih.gov", "doi.org", "bmj.com", "thelancet.com", "nature.com",
  "cochranelibrary.com", "nihr.ac.uk", "journals.plos.org", "sciencedirect.com", "jamanetwork.com",
  "nejm.org", "onlinelibrary.wiley.com", "link.springer.com", "academic.oup.com", "bjsm.bmj.com",
  "ard.bmj.com", "nccih.nih.gov", "frontiersin.org", "mdpi.com", "tandfonline.com", "sagepub.com",
  "europepmc.org", "eular.org", "rheumatology.org",
];
function sourceType(host) {
  if (/(^|\.)nice\.org\.uk$/.test(host)) return "NICE";
  if (/(^|\.)nhs\.uk$/.test(host) || host === "www.nhsinform.scot" || host.endsWith(".nhs.wales") || host === "hscni.net" || host.endsWith(".hscni.net")) return "NHS";
  if (RESEARCH_HOSTS.some((h) => host === h || host.endsWith("." + h))) return "Research";
  return null;
}

const TOPICS = [
  ["Flare-ups", /flare/],
  ["Rheumatoid arthritis", /rheumatoid|\bra\b|ng100|dmard|methotrexate|biologic/],
  ["Osteoarthritis", /osteoarthritis|\boa\b|ng226|knee|hip-|joint-replacement/],
  ["Gout", /gout|uric|ng219/],
  ["Psoriatic & axial arthritis", /psoriatic|spondyl|ankylosing/],
  ["Medicines & pain relief", /medicine|painkiller|ibuprofen|paracetamol|nsaid|steroid|bnf|opioid|codeine|pain|ng193|ng59/],
  ["Supplements", /supplement|vitamin|glucosamine|turmeric|omega|fish-oil|collagen|chondroitin|calcium/],
  ["Diet & weight", /diet|food|eat|nutrition|weight|obesity|mediterranean/],
  ["Exercise & physiotherapy", /exercise|physio|activity|walking|swim|strength|yoga|tai-chi|fitness/],
  ["Frailty, falls & bones", /frail|fall|osteopor|bone|sarcopenia/],
  ["Benefits, work & care", /pip|benefit|carer|social-care|work|disab|blue-badge|nhsbsa|prescription/],
  ["Mental health & sleep", /mental|depress|anxiety|stress|sleep|talking-therap|mindful/],
  ["Urgent & specialist care", /urgent|111|999|emergency|cauda|sepsis|referral|waiting|specialist|rheumatology/],
];
function topicFor(url, citers) {
  const own = url.toLowerCase();
  for (const [t, re] of TOPICS) if (re.test(own)) return t;
  const hay = citers.slice(0, 5).join(" ").toLowerCase();
  for (const [t, re] of TOPICS) if (re.test(hay)) return t;
  return "General arthritis & health";
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "__tests__" || e.name.endsWith(".generated.json") || /\.test\.|\.spec\./.test(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(tsx?|json)$/.test(e.name)) out.push(p);
  }
  return out;
}

function clean(raw) {
  let u = raw.replace(/\\\//g, "/").replace(/[)\].,;:'"`>]+$/, "").replace(/&amp;/g, "&");
  try {
    const x = new URL(u);
    x.hash = "";
    [...x.searchParams.keys()].filter((k) => k.startsWith("utm_")).forEach((k) => x.searchParams.delete(k));
    let s = x.toString();
    if (s.endsWith("/") && x.pathname !== "/") s = s.slice(0, -1);
    return s;
  } catch { return null; }
}
const URL_RE = /https?:\\?\/\\?\/[A-Za-z0-9.-]+(?:\\?\/[^\s"'`<>)\\]*)?/g;
const LINK_RE = /<a[^>]+href=\\?["'](https?:[^"'\\]+)\\?["'][^>]*>([^<]{3,160})<\/a>/g;
const LABEL_RE = /(?:label|title|name)\s*:\s*["'`]([^"'`]{3,160})["'`]\s*,\s*(?:url|href)\s*:\s*["'`](https?:[^"'`]+)["'`]|(?:url|href)\s*:\s*["'`](https?:[^"'`]+)["'`]\s*,\s*(?:label|title|name)\s*:\s*["'`]([^"'`]{3,160})["'`]/g;

// Route map from App.tsx (static routes only).
const app = fs.readFileSync(path.join(SRC, "App.tsx"), "utf8");
const compToFile = {};
for (const m of app.matchAll(/const (\w+) = lazyWithRetry\(\(\) => import\("\.\/([^"]+)"\)\)/g)) compToFile[m[1]] = m[2];
for (const m of app.matchAll(/import (\w+) from "\.\/([^"]+)"/g)) compToFile[m[1]] ??= m[2];
const fileToRoutes = {};
for (const m of app.matchAll(/<Route path="([^"]+)" element=\{<(\w+)[\s/>]/g)) {
  const [_, route, comp] = m;
  if (route.includes(":") || route.includes("*") || !compToFile[comp]) continue;
  const f = path.join(SRC, compToFile[comp]).replace(/\.(tsx|ts)$/, "");
  (fileToRoutes[f] ??= []).push(route);
}

const files = walk(SRC);
const noExt = (f) => f.replace(/\.(tsx|ts|json)$/, "");
const contents = Object.fromEntries(files.map((f) => [f, fs.readFileSync(f, "utf8")]));

function blogRoute(f) {
  const m = f.match(/content[\\/]blog[\\/]posts[\\/]([^\\/]+)\.json$/);
  if (!m) return null;
  try {
    const j = JSON.parse(contents[f]);
    if (j.is_published === false) return [];
    return [`/blog/${m[1]}`];
  } catch { return []; }
}

// Pages reached from a non-page module: pages importing it (two levels).
const importers = {};
for (const f of files) {
  if (!f.endsWith(".tsx") && !f.endsWith(".ts")) continue;
  for (const m of contents[f].matchAll(/from ["']@\/([^"']+)["']|from ["'](\.{1,2}\/[^"']+)["']/g)) {
    const target = m[1] ? path.join(SRC, m[1]) : path.resolve(path.dirname(f), m[2]);
    (importers[noExt(target)] ??= new Set()).add(f);
    (importers[noExt(target) + "/index"] ??= new Set()).add(f);
  }
}
function routesFor(f, depth = 0) {
  const b = blogRoute(f);
  if (b) return b;
  const own = fileToRoutes[noExt(f)];
  if (own) return own;
  if (depth >= 2) return [];
  const out = new Set();
  for (const imp of importers[noExt(f)] ?? []) for (const r of routesFor(imp, depth + 1)) out.add(r);
  return out.size > 25 ? ["(site-wide component)"] : [...out];
}

const register = new Map();
for (const f of files) {
  const text = contents[f];
  const labels = {};
  for (const m of text.matchAll(LINK_RE)) { const u = clean(m[1]); if (u) labels[u] ??= m[2].trim(); }
  for (const m of text.matchAll(LABEL_RE)) {
    const u = clean(m[2] || m[3]); const l = (m[1] || m[4]).trim();
    if (u) labels[u] ??= l;
  }
  const urls = new Set();
  for (const m of text.matchAll(URL_RE)) { const u = clean(m[0]); if (u) urls.add(u); }
  if (!urls.size) continue;
  let routes = null;
  for (const u of urls) {
    let host; try { host = new URL(u).hostname; } catch { continue; }
    const type = sourceType(host);
    if (!type || new URL(u).pathname === "/") continue;
    routes ??= routesFor(f);
    const entry = register.get(u) ?? { url: u, type, label: null, pages: new Set() };
    entry.label ??= labels[u] ?? null;
    routes.forEach((r) => entry.pages.add(r));
    register.set(u, entry);
  }
}

const sources = [...register.values()]
  .filter((e) => e.pages.size > 0)
  .map((e) => {
    const pages = [...e.pages].sort();
    const fallback = decodeURIComponent(new URL(e.url).pathname.split("/").filter(Boolean).pop() || e.url).replace(/[-_]+/g, " ");
    return { url: e.url, type: e.type, label: (e.label || fallback).replace(/\s+/g, " "), topic: topicFor(e.url, pages), pages };
  })
  .sort((a, b) => a.topic.localeCompare(b.topic) || a.type.localeCompare(b.type) || a.label.localeCompare(b.label));

const json = JSON.stringify({ sourceCount: sources.length, sources }, null, 0) + "\n";
fs.writeFileSync(OUT, json);
const byType = sources.reduce((a, s) => ((a[s.type] = (a[s.type] || 0) + 1), a), {});
console.log(`evidence register: ${sources.length} sources`, byType);
