#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { inspectInventoryHtml } from "./lib/inventory-signals.mjs";
import { writeFileAtomicSync } from "./lib/atomic-write.mjs";

const DIST = resolve(process.argv[2] || "dist");
const OUTPUT = resolve(
  process.argv[3] || "docs/seo/content-inventory.csv",
);
const sitemap = readFileSync("public/sitemap.xml", "utf8");
const redirectCsv = readFileSync("docs/seo/redirect-map.csv", "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
const paths = new Set(
  urls.map((url) => new URL(url).pathname.replace(/\/$/, "") || "/"),
);

const entityName = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(entityName).filter(Boolean).join("|");
  return value.name ?? "";
};
const csvCell = (value) => {
  const string = String(value ?? "");
  return `"${string.replace(/"/g, '""')}"`;
};
const pageType = (path) =>
  path === "/" ? "home" : path.split("/").filter(Boolean)[0] || "page";
const parentFor = (path) => {
  if (path === "/") return "";
  const parts = path.split("/").filter(Boolean);
  while (parts.length > 0) {
    parts.pop();
    const candidate = parts.length ? `/${parts.join("/")}` : "/";
    if (paths.has(candidate)) return candidate;
  }
  return "/";
};
const childrenFor = (path) => {
  const depth = path === "/" ? 0 : path.split("/").filter(Boolean).length;
  const prefix = path === "/" ? "/" : `${path}/`;
  return [...paths]
    .filter(
      (candidate) =>
        candidate !== path &&
        candidate.startsWith(prefix) &&
        candidate.split("/").filter(Boolean).length === depth + 1,
    )
    .sort()
    .join("|");
};

const headers = [
  "url",
  "page_type",
  "title",
  "h1",
  "meta_description",
  "canonical",
  "indexability",
  "author",
  "reviewer",
  "date",
  "category",
  "primary_keyword",
  "secondary_keywords",
  "parent_page",
  "child_pages",
  "status",
  "redirect_target",
  "robots_directives",
  "canonical_matches_url",
  "h2_count",
  "image_count",
  "images_missing_alt",
  "internal_link_count",
  "external_link_count",
  "article_word_count",
  "structured_data_types",
  "html_bytes",
];
const rows = [];

for (const url of urls) {
  const path = new URL(url).pathname.replace(/\/$/, "") || "/";
  const file =
    path === "/"
      ? join(DIST, "index.html")
      : path.endsWith(".html")
        ? join(DIST, path.replace(/^\//, ""))
        : join(DIST, path.replace(/^\//, ""), "index.html");
  if (!existsSync(file)) {
    rows.push([
      url,
      pageType(path),
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      parentFor(path),
      childrenFor(path),
      "missing-prerender-output",
      "",
    ]);
    continue;
  }

  const html = readFileSync(file, "utf8");
  const signals = inspectInventoryHtml(html, url);
  const nodes = signals.nodes;
  const article = nodes.find((node) =>
    [node?.["@type"]].flat().some(type => ["Article", "MedicalWebPage", "ProfilePage"].includes(type)),
  );
  const keywords = signals.keywords
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
  const robots = signals.robots;
  const canonical = signals.canonical;
  rows.push([
    url,
    pageType(path),
    signals.title,
    signals.h1,
    signals.description,
    canonical,
    /noindex/i.test(robots) ? "noindex" : "indexable",
    entityName(article?.author),
    entityName(article?.reviewedBy),
    article?.dateModified ?? article?.datePublished ?? "",
    article?.articleSection ?? "",
    keywords[0] ?? "",
    keywords.slice(1).join("|"),
    parentFor(path),
    childrenFor(path),
    "present-prerender-output",
    "",
    robots,
    signals.canonicalMatchesUrl,
    signals.h2Count,
    signals.imageCount,
    signals.imagesMissingAlt,
    signals.internalLinkCount,
    signals.externalLinkCount,
    signals.articleWordCount,
    signals.structuredDataTypes,
    signals.htmlBytes,
  ]);
}

for (const line of redirectCsv.trim().split(/\r?\n/).slice(1)) {
  const columns = line.split(",");
  rows.push([
    `https://livingwitharthritis.org.uk${columns[0]}`,
    "redirect",
    "",
    "",
    "",
    "",
    "not-indexable",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    columns[3] || "redirect",
    `https://livingwitharthritis.org.uk${columns[1]}`,
  ]);
}

mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileAtomicSync(
  OUTPUT,
  [headers, ...rows].map((row) => [...row, ...Array(Math.max(0, headers.length - row.length)).fill("")].map(csvCell).join(",")).join("\n") +
    "\n",
);
console.log(
  `[seo-inventory] wrote ${rows.length} rows from ${urls.length} canonical URLs to ${OUTPUT}`,
);
