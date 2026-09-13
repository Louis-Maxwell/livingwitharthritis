#!/usr/bin/env node
/**
 * Audits the actual prerendered HTML served to crawlers.
 * This intentionally runs against dist/, not React's hydrated DOM.
 */
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const DIST = resolve(process.argv.find((a) => a.startsWith("--dist="))?.slice(7) ?? "dist");
const SITEMAP = resolve("public/sitemap.xml");
const BASE = "https://livingwitharthritis.org.uk";

if (!existsSync(DIST) || !existsSync(SITEMAP)) {
  console.log("indexable-html: skip — dist/ or public/sitemap.xml is missing");
  process.exit(0);
}

const sitemap = readFileSync(SITEMAP, "utf8");
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => new URL(m[1]).pathname.replace(/\/$/, "") || "/");

const decode = (s = "") => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const match = (html, re) => decode(html.match(re)?.[1] ?? "");
const meta = (html, name) => match(html, new RegExp(`<meta\\b(?=[^>]*\\bname=["']${name}["'])[^>]*\\bcontent=["']([^"']*)["'][^>]*>`, "i"));
const canonical = (html) => match(html, /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*\bhref=["']([^"']+)["'][^>]*>/i);
const text = (html) => decode(html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " "));

const failures = [];
const titles = new Map();
const descriptions = new Map();
const h1s = new Map();

for (const path of paths) {
  const file = path === "/" ? join(DIST, "index.html") : join(DIST, path.slice(1), "index.html");
  if (!existsSync(file)) {
    failures.push(`${path}: missing prerendered HTML`);
    continue;
  }
  const html = readFileSync(file, "utf8");
  const title = match(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = meta(html, "description");
  const robots = meta(html, "robots");
  const h1 = match(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const canon = canonical(html);
  const bodyWords = (text(html).match(/[A-Za-z][A-Za-z'-]*/g) ?? []).length;

  if (!title || title.length < 15) failures.push(`${path}: missing/weak title`);
  if (!description || description.length < 80) failures.push(`${path}: missing/weak description`);
  if (!h1) failures.push(`${path}: missing H1`);
  if (!canon || canon !== `${BASE}${path}`) failures.push(`${path}: canonical mismatch (${canon || "missing"})`);
  if (/noindex/i.test(robots)) failures.push(`${path}: noindex on sitemap URL`);
  if (bodyWords < 120) failures.push(`${path}: insufficient first-response content (${bodyWords} words)`);

  if (title) titles.set(path, title);
  if (description) descriptions.set(path, description);
  if (h1) h1s.set(path, h1);
}

function duplicateValues(map, label) {
  const groups = new Map();
  for (const [path, value] of map) {
    const key = value.toLowerCase();
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(path);
  }
  for (const [value, group] of groups) {
    if (group.length > 1) failures.push(`${label} duplicated across ${group.length} URLs: ${group.slice(0, 6).join(", ")} (${value.slice(0, 90)})`);
  }
}

duplicateValues(titles, "title");
duplicateValues(descriptions, "description");
duplicateValues(h1s, "H1");

if (failures.length) {
  console.error(`✗ indexable-html failed: ${failures.length} issue(s)`);
  failures.slice(0, 80).forEach((f) => console.error(`  - ${f}`));
  if (failures.length > 80) console.error(`  ... ${failures.length - 80} more`);
  process.exit(1);
}

console.log(`✓ indexable-html — ${paths.length} sitemap URLs have unique, indexable first-response HTML`);
