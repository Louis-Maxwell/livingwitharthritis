#!/usr/bin/env node
/**
 * JSON-LD validator.
 *
 * Default: read prerendered HTML under dist/ (no server, no browser).
 * Optional live crawl: BASE_URL=https://example.com node scripts/validate-jsonld.mjs
 *
 * Usage:
 *   DIST_DIR=dist node scripts/validate-jsonld.mjs
 *   BASE_URL=https://livingwitharthritis.org.uk node scripts/validate-jsonld.mjs
 */
import fs from "fs";
import { join, relative } from "path";
import { tmpdir } from "os";

const PROD_HOST = "https://livingwitharthritis.org.uk";
const REPORT_DIR =
  process.env.JSONLD_REPORT_DIR || join(tmpdir(), "livingwitharthritis-jsonld");
const DIST_DIR =
  process.env.DIST_DIR ||
  (fs.existsSync(join("dist", "index.html")) ? "dist" : "");
const LIVE_BASE = process.env.BASE_URL
  ? process.env.BASE_URL.replace(/\/$/, "")
  : "";
const MAX_ROUTES = process.env.JSONLD_MAX_ROUTES
  ? Number(process.env.JSONLD_MAX_ROUTES)
  : Infinity;

const REQUIRED = {
  Product: ["name", "image", "offers", "brand", ["sku", "gtin", "mpn"]],
  Article: ["headline", "author", "datePublished", "image"],
  NewsArticle: ["headline", "author", "datePublished", "image"],
  BlogPosting: ["headline", "author", "datePublished", "image"],
  MedicalWebPage: [["name", "headline"]],
  WebPage: [["name", "headline"]],
  CollectionPage: [["name", "headline"]],
  Organization: ["name", "url"],
  MedicalOrganization: ["name", "url"],
  NGO: ["name", "url"],
  WebSite: ["name", "url"],
  BreadcrumbList: ["itemListElement"],
  FAQPage: ["mainEntity"],
  HowTo: ["name", "step"],
  ItemList: ["itemListElement"],
  MedicalCondition: ["name"],
};

function checkRequired(item, type) {
  const required = REQUIRED[type];
  if (!required) return [];
  const missing = [];
  for (const f of required) {
    if (Array.isArray(f)) {
      if (!f.some((k) => item[k] != null)) missing.push(`one of (${f.join("|")})`);
    } else if (item[f] == null) {
      missing.push(f);
    }
  }
  return missing;
}

function flattenParsed(parsed) {
  if (Array.isArray(parsed)) return parsed.flatMap(flattenParsed);
  if (parsed && typeof parsed === "object" && Array.isArray(parsed["@graph"])) {
    return parsed["@graph"];
  }
  return [parsed];
}

function inspectBlocks(rawBlocks, entry) {
  for (const raw of rawBlocks) {
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      entry.errors.push({
        kind: "parse",
        message: e.message,
        snippet: String(raw).slice(0, 200),
      });
      continue;
    }
    for (const item of flattenParsed(parsed)) {
      if (!item || typeof item !== "object") continue;
      const types = Array.isArray(item["@type"]) ? item["@type"] : [item["@type"]];
      const summary = { type: types.join("+"), missing: [] };
      if (!item["@context"]) summary.missing.push("@context");
      for (const t of types) {
        const m = checkRequired(item, t);
        if (m.length) summary.missing.push(...m.map((x) => `${t}.${x}`));
      }
      entry.blocks.push(summary);
      if (summary.missing.length) entry.warnings.push(summary);
    }
  }
}

function collectHtmlFiles(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = join(dir, name);
    if (fs.statSync(p).isDirectory()) collectHtmlFiles(p, acc);
    else if (name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

function fileToRoute(file) {
  let rel = relative(DIST_DIR, file).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"/index.html".length)}`;
  if (rel.endsWith(".html")) return `/${rel.slice(0, -".html")}`;
  return `/${rel}`;
}

function extractJsonLdFromHtml(html) {
  const blocks = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = re.exec(html))) blocks.push(match[1].trim());
  return blocks;
}

function sitemapRoutes() {
  const xml = fs.readFileSync("public/sitemap.xml", "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => m[1].replace(PROD_HOST, "") || "/",
  );
}

async function fromDist() {
  const files = collectHtmlFiles(DIST_DIR).slice(0, MAX_ROUTES);
  const report = [];
  for (const file of files) {
    const route = fileToRoute(file);
    const entry = {
      route,
      url: `file://${file}`,
      blocks: [],
      errors: [],
      warnings: [],
    };
    try {
      inspectBlocks(extractJsonLdFromHtml(fs.readFileSync(file, "utf8")), entry);
    } catch (e) {
      entry.errors.push({ kind: "load", message: e.message });
    }
    report.push(entry);
    const flag = entry.errors.length ? "ERR" : entry.warnings.length ? "WARN" : "OK";
    console.log(
      `[${flag}] ${route} — ${entry.blocks.length} blocks, ${entry.errors.length} errors, ${entry.warnings.length} warnings`,
    );
  }
  return { report, scannedFrom: `dist:${DIST_DIR}` };
}

async function fromLive() {
  let puppeteer;
  try {
    puppeteer = (await import("puppeteer")).default;
  } catch {
    console.error("puppeteer is required for BASE_URL mode. Prefer DIST_DIR=dist instead.");
    process.exit(1);
  }
  const browser = await puppeteer.launch({ args: ["--no-sandbox"], headless: "new" });
  const page = await browser.newPage();
  const report = [];
  const routes = sitemapRoutes().slice(0, Number.isFinite(MAX_ROUTES) ? MAX_ROUTES : 40);
  for (const route of routes) {
    const url = LIVE_BASE + route;
    const entry = { route, url, blocks: [], errors: [], warnings: [] };
    try {
      await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
      await new Promise((r) => setTimeout(r, 400));
      const blocks = await page.$$eval(
        'script[type="application/ld+json"]',
        (els) => els.map((e) => e.textContent || ""),
      );
      inspectBlocks(blocks, entry);
    } catch (e) {
      entry.errors.push({ kind: "load", message: e.message });
    }
    report.push(entry);
    const flag = entry.errors.length ? "ERR" : entry.warnings.length ? "WARN" : "OK";
    console.log(
      `[${flag}] ${route} — ${entry.blocks.length} blocks, ${entry.errors.length} errors, ${entry.warnings.length} warnings`,
    );
  }
  await browser.close();
  return { report, scannedFrom: LIVE_BASE };
}

const { report, scannedFrom } = DIST_DIR
  ? await fromDist()
  : LIVE_BASE
    ? await fromLive()
    : (() => {
        console.error(
          "No dist/ folder and no BASE_URL. Run after the prerendered build, or set DIST_DIR / BASE_URL.",
        );
        process.exit(1);
      })();

fs.mkdirSync(REPORT_DIR, { recursive: true });
fs.writeFileSync(join(REPORT_DIR, "jsonld-report.json"), JSON.stringify(report, null, 2));

let md = `# JSON-LD Validation Report\n\nBase: ${scannedFrom}\nRoutes scanned: ${report.length}\n\n`;
const errs = report.filter((r) => r.errors.length);
const warns = report.filter((r) => r.warnings.length);
md += `- Routes with parse errors: **${errs.length}**\n- Routes with missing-field warnings: **${warns.length}**\n\n`;

if (errs.length) {
  md += `## Parse / load errors\n\n`;
  for (const r of errs) {
    md += `### ${r.route}\n`;
    for (const e of r.errors) md += `- (${e.kind}) ${e.message}\n`;
    md += "\n";
  }
}
if (warns.length) {
  md += `## Missing required fields\n\n`;
  for (const r of warns) {
    md += `### ${r.route}\n`;
    for (const w of r.warnings) md += `- **${w.type}** missing: ${w.missing.join(", ")}\n`;
    md += "\n";
  }
}
if (!errs.length && !warns.length) md += `All schemas pass parse + required-field checks.\n`;

const markdownReport = join(REPORT_DIR, "jsonld-report.md");
fs.writeFileSync(markdownReport, md);
console.log(`\nReport: ${markdownReport} (${errs.length} err routes, ${warns.length} warn routes)`);
process.exit(errs.length ? 1 : 0);
