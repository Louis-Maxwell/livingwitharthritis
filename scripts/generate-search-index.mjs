#!/usr/bin/env node
/**
 * Bake public/search-index.json for client-side search (no Worker API).
 * Blog entries come from the single catalog (src/content/blog/catalog.generated.json).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { readBlogCatalog } from "./lib/blog-posts.mjs";

function mapTopic(category) {
  const c = String(category ?? "").trim().toLowerCase();
  if (!c) return "Other";
  if (c.includes("exercise")) return "Exercise";
  if (c.includes("nutrition") || c === "diet") return "Nutrition";
  if (c.includes("supplement")) return "Supplements";
  if (c.includes("treatment")) return "Treatment";
  if (c.includes("finance") || c.includes("benefit") || c.includes("pip")) return "Finances & Benefits";
  if (c.includes("mental")) return "Mental Health";
  if (c.includes("work") || c.includes("career")) return "Work & Career";
  if (c.includes("condition") || c === "symptoms") return "Conditions";
  if (["lifestyle", "travel", "social", "family", "sleep", "weather"].some((x) => c.includes(x))) return "Lifestyle";
  if (["health", "prevention", "frailty", "surgery"].some((x) => c.includes(x))) return "Health";
  return "Other";
}

function guideTopic(cluster, path) {
  if (cluster === "support" && path.includes("benefits")) return "Finances & Benefits";
  if (cluster === "lifestyle") return "Nutrition";
  if (cluster === "msk") return "Exercise";
  if (cluster === "medication" || cluster === "surgery") return "Treatment";
  if (cluster === "condition") return "Conditions";
  return "Guides & hubs";
}

const HUB = [
  {"id":"hub-guides","title":"Arthritis guides hub","href":"/guides","excerpt":"Browse UK arthritis guides on benefits, exercise, diet, pain relief and NHS care.","topic":"Guides & hubs","wordCount":900,"keywords":["guides","hub","PIP","exercise","diet"]},
  {"id":"hub-diet","title":"Diet & nutrition hub","href":"/diet","excerpt":"Anti-inflammatory eating patterns and foods that may ease joint symptoms.","topic":"Guides & hubs","wordCount":1100,"keywords":["diet","nutrition","mediterranean","inflammation"]},
  {"id":"hub-about","title":"About Living With Arthritis UK","href":"/about","excerpt":"Who we are, our mission, and how we produce clinician-reviewed guidance.","topic":"Guides & hubs","wordCount":1000,"keywords":["about","charity","mission"]},
  {"id":"hub-benefits-pip","title":"Benefits & PIP hub","href":"/benefits-pip","excerpt":"Start here for Personal Independence Payment and related UK arthritis benefits.","topic":"Finances & Benefits","wordCount":850,"keywords":["PIP","benefits","disability","DLA"]},
  {"id":"hub-exercises","title":"Exercise hub","href":"/exercises","excerpt":"Joint-friendly exercise guides including tai chi, walking and strength work.","topic":"Guides & hubs","wordCount":1000,"keywords":["exercise","movement","tai chi"]},
  {"id":"hub-library","title":"Health library","href":"/library","excerpt":"Plain-English library of conditions, medications, supplements and treatments.","topic":"Guides & hubs","wordCount":800,"keywords":["library","medications","conditions"]},
  {"id":"hub-blog","title":"Blog","href":"/blog","excerpt":"Evidence-based arthritis articles written for people in the UK.","topic":"Guides & hubs","wordCount":700,"keywords":["blog","articles"]},
];

const guideTs = readFileSync(resolve("src/lib/guideRegistry.ts"), "utf8");
const guideRe =
  /\{\s*path:\s*"([^"]+)"\s*,\s*title:\s*"([^"]+)"\s*,\s*description:\s*"([^"]+)"\s*,\s*cluster:\s*"([^"]+)"\s*,?\s*\}/g;
const guides = [...guideTs.matchAll(guideRe)].map((m) => ({
  path: m[1],
  title: m[2],
  description: m[3],
  cluster: m[4],
}));

const blogItems = readBlogCatalog().map((a) => {
  const keywords = [a.category || ""];
  if (typeof a.keywords === "string") {
    keywords.push(...a.keywords.split(/[,;]/).map((k) => k.trim()).filter(Boolean));
  }
  return {
    id: `blog-${a.slug}`,
    title: a.title,
    href: `/blog/${a.slug}`,
    excerpt: a.excerpt || "",
    topic: mapTopic(a.category),
    wordCount: a.word_count ?? 0,
    keywords: keywords.filter(Boolean),
  };
});

const guideItems = guides.map((g) => ({
  id: `guide-${g.path}`,
  title: g.title,
  href: g.path,
  excerpt: g.description,
  topic: guideTopic(g.cluster, g.path),
  wordCount: 1200,
  keywords: [g.cluster, g.title],
}));

const seen = new Set();
const items = [];
for (const item of [...HUB, ...guideItems, ...blogItems]) {
  if (seen.has(item.href)) continue;
  seen.add(item.href);
  items.push(item);
}

const out = { generatedAt: new Date().toISOString(), version: 1, items };
writeFileSync(resolve("public/search-index.json"), JSON.stringify(out));
console.log(`[search-index] wrote ${items.length} items -> public/search-index.json`);
