#!/usr/bin/env node
/**
 * Audit prerendered HTML for crawler-visible parity on indexable priority pages.
 * Run after build:prerender or against a supplied DIST_DIR.
 */
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const dist = resolve(process.env.DIST_DIR || "dist");
const routes = [
  "/guides/benefits-pip",
  "/blog/hip-replacement-arthritis-uk",
  "/blog/hip-replacement-recovery-week-by-week",
  "/blog/best-supplements-arthritis-uk",
  "/guides/knee-exercises-for-osteoarthritis",
  "/guides/hip-exercises-for-osteoarthritis",
  "/exercises",
];
const failures = [];
const text = (html) => html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const attr = (html, pattern) => html.match(pattern)?.[1] || "";

for (const route of routes) {
  const file = join(dist, route === "/" ? "index.html" : route.slice(1), "index.html");
  if (!existsSync(file)) {
    failures.push(`${route}: missing prerendered HTML (${file})`);
    continue;
  }
  const html = readFileSync(file, "utf8");
  const visible = text(html);
  const canonical = attr(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  const expected = "https://livingwitharthritis.org.uk" + (route === "/" ? "/" : route);
  if (canonical !== expected) failures.push(`${route}: canonical is ${canonical || "missing"}`);
  if ((html.match(/<h1\b/gi) || []).length !== 1) failures.push(`${route}: expected exactly one H1`);
  if (!visible.includes("Living With Arthritis")) failures.push(`${route}: brand missing from visible HTML`);
  if (!/<script[^>]+type=["']application\/ld\+json["']/i.test(html)) failures.push(`${route}: JSON-LD missing`);
  if (!/<link[^>]+hreflang=["']en-GB["']/i.test(html) || !/<link[^>]+hreflang=["']x-default["']/i.test(html)) {
    failures.push(`${route}: en-GB/x-default alternates missing`);
  }
  for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const graph = JSON.parse(match[1]);
      const nodes = graph["@graph"] || [graph];
      for (const node of nodes) {
        if (node["@type"] === "WebSite" || node["@type"] === "SearchAction") {
          if (node.speakable) failures.push(`${route}: invalid speakable on ${node["@type"]}`);
        }
      }
    } catch {
      failures.push(`${route}: invalid JSON-LD JSON`);
    }
  }
}
if (failures.length) {
  console.error("[prerender-parity] FAIL");
  failures.forEach((item) => console.error("- " + item));
  process.exitCode = 1;
} else {
  console.log(`[prerender-parity] PASS — audited ${routes.length} priority routes`);
}
