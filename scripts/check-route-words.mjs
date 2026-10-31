#!/usr/bin/env node
/**
 * Soft-404 gate: every sitemap route must ship crawler HTML with at least
 * MIN_ROUTE_WORDS (default 200) visible words. Run after a build.
 */
import { readFileSync } from "node:fs";
import { routeFile, wordCount } from "./lib/route-words.mjs";

const MIN = Number(process.env.MIN_ROUTE_WORDS || 200);
const dist = process.argv[2] || "dist";
const routes = [...readFileSync(`${dist}/sitemap.xml`, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => new URL(m[1]).pathname);
const fails = [];
for (const route of routes) {
  const file = routeFile(route, dist);
  const words = file ? wordCount(readFileSync(file, "utf8")) : 0;
  if (words < MIN) fails.push(`${route} ${file ? `${words} words` : "no file"}`);
}
if (fails.length) {
  console.error(`[route-words] ${fails.length}/${routes.length} sitemap routes under ${MIN} words:\n  ${fails.join("\n  ")}`);
  process.exit(1);
}
console.log(`[route-words] all ${routes.length} sitemap routes have ${MIN}+ words`);
