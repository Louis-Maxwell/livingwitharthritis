#!/usr/bin/env node
/**
 * Audit: every page in src/pages/**.tsx must reach SeoHead,
 * ConditionPageTemplate, or contain a literal og:title meta tag.
 * Skips test/mocks. Exits non-zero on regression.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { decodeBasicEntities } from "./lib/strip-tags.mjs";

const ROOT = "src/pages";
const SKIP_DIRS = new Set(["__tests__", "__mocks__"]);

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (name.endsWith(".tsx") && !name.endsWith(".test.tsx")) out.push(p);
  }
  return out;
}

const missing = [];
for (const file of walk(ROOT)) {
  const src = readFileSync(file, "utf8");
  // Redirect-only routes render the destination's metadata, not a page head.
  if (src.includes('return <Navigate') &&
      src.includes('from "react-router-dom"') &&
      !/<(?:main|article|h[1-6])\b/.test(src)) continue;
  if (
    src.includes("SeoHead") ||
    src.includes("ConditionPageTemplate") ||
    src.includes("StubPage") || // StubPage itself emits og:title internally
    src.includes("GovernancePolicyPage") || // wraps SeoHead
    src.includes("ClusterLandingPage") || // wraps SeoHead
    src.includes("og:title")
  ) continue;
  missing.push(file);
}

if (missing.length) {
  console.error(`Pages missing OG/Twitter coverage (${missing.length}):`);
  for (const f of missing) console.error("  - " + f);
  process.exit(1);
}
console.log(`OK: all pages emit OG/Twitter meta via SeoHead/ConditionPageTemplate.`);


/**
 * Strict, build-output audit for the highest-impression pages.
 * Invoke with --dist=dist after the prerender build. Do not silently pass
 * missing pages: social bots read the original HTML, not React's final DOM.
 */
export const PRIORITY_SOCIAL_ROUTES = Object.freeze([
  "/blog/medication-supplement-interactions-arthritis",
  "/blog/pip-for-arthritis-uk",
  "/blog/best-plantar-fasciitis-shoes-women-uk",
  "/faq/is-arthritis-a-disability",
  "/faq",
  "/guides/benefits-pip",
  "/guides/dmards-vs-biologics",
]);

function headMeta(html) {
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? html;
  return [...head.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => {
    const attributes = {};
    for (const match of tag.matchAll(/\b([a-z][\w:-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi)) {
      attributes[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? "";
    }
    return attributes;
  });
}

export function auditPrioritySocialMeta(distDir, routes = PRIORITY_SOCIAL_ROUTES) {
  const failures = [];
  for (const route of routes) {
    const file = join(distDir, route.slice(1), "index.html");
    if (!existsSync(file)) {
      failures.push(route + ": missing prerendered index.html");
      continue;
    }

    const metas = headMeta(readFileSync(file, "utf8"));
    const get = (attribute, key) => {
      const values = metas.filter((meta) => meta[attribute] === key).map((meta) => decodeBasicEntities(meta.content ?? "").trim());
      if (values.length !== 1) {
        failures.push(route + ": expected exactly one " + key + ", found " + values.length);
      }
      return values.length === 1 ? values[0] : "";
    };

    const site = get("property", "og:site_name");
    const type = get("property", "og:type");
    const ogTitle = get("property", "og:title");
    const twitterTitle = get("name", "twitter:title");
    const ogDescription = get("property", "og:description");
    const twitterDescription = get("name", "twitter:description");
    const ogImage = get("property", "og:image");
    const twitterImage = get("name", "twitter:image");
    const card = get("name", "twitter:card");

    if (site && site !== "Living With Arthritis") failures.push(route + ": incorrect og:site_name");
    const expectedType = route === "/faq" ? "website" : "article";
    if (type && type !== expectedType) failures.push(route + ": expected og:type " + expectedType);
    for (const [name, value] of [["og:title", ogTitle], ["twitter:title", twitterTitle]]) {
      if (value && value.length >= 60) failures.push(route + ": " + name + " must be under 60 characters");
    }
    if (ogTitle && twitterTitle && ogTitle !== twitterTitle) failures.push(route + ": OG/Twitter titles differ");
    for (const [name, value] of [["og:description", ogDescription], ["twitter:description", twitterDescription]]) {
      if (value && (value.length < 140 || value.length > 155)) failures.push(route + ": " + name + " must be 140-155 characters");
    }
    if (ogDescription && twitterDescription && ogDescription !== twitterDescription) failures.push(route + ": OG/Twitter descriptions differ");
    for (const [name, value] of [["og:image", ogImage], ["twitter:image", twitterImage]]) {
      if (value) {
        try {
          const url = new URL(value);
          if (url.protocol !== "https:" || !url.hostname) failures.push(route + ": " + name + " must be an absolute HTTPS URL");
        } catch {
          failures.push(route + ": " + name + " must be an absolute HTTPS URL");
        }
      }
    }
    if (ogImage && twitterImage && ogImage !== twitterImage) failures.push(route + ": OG/Twitter images differ");
    if (card && card !== "summary_large_image") failures.push(route + ": incorrect twitter:card");
  }
  return failures;
}

const distFlag = process.argv.find((arg) => arg.startsWith("--dist="));
if (distFlag) {
  const problems = auditPrioritySocialMeta(resolve(distFlag.slice("--dist=".length)));
  if (problems.length) {
    console.error("Priority social metadata audit failed:\n" + problems.map((p) => "  - " + p).join("\n"));
    process.exitCode = 1;
  } else {
    console.log("OK: all seven prerendered priority pages have valid social previews.");
  }
}
