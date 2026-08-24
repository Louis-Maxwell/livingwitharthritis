#!/usr/bin/env node
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";

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

const decode = (value = "") =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
const textOf = (html, pattern) =>
  decode((html.match(pattern)?.[1] ?? "").replace(/<[^>]+>/g, " "));
const tagAttribute = (html, tagPattern, attribute) => {
  const tag = html.match(tagPattern)?.[0] ?? "";
  return decode(
    tag.match(new RegExp(`\\b${attribute}=["']([^"']*)["']`, "i"))?.[1] ??
      "",
  );
};
const meta = (html, attr, value) =>
  tagAttribute(
    html,
    new RegExp(
      `<meta\\b(?=[^>]*\\b${attr}=["']${value}["'])[^>]*>`,
      "i",
    ),
    "content",
  );
const schemaNodes = (html) => {
  const nodes = [];
  for (const match of html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      const parsed = JSON.parse(match[1]);
      if (Array.isArray(parsed)) nodes.push(...parsed);
      else if (Array.isArray(parsed?.["@graph"])) nodes.push(...parsed["@graph"]);
      else nodes.push(parsed);
    } catch {
      // Structured-data syntax has a separate failing validator.
    }
  }
  return nodes;
};
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
];
const rows = [];

for (const url of urls) {
  const path = new URL(url).pathname.replace(/\/$/, "") || "/";
  const file =
    path === "/"
      ? join(DIST, "index.html")
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
  const nodes = schemaNodes(html);
  const article = nodes.find((node) =>
    ["Article", "MedicalWebPage", "ProfilePage"].includes(node?.["@type"]),
  );
  const keywords = meta(html, "name", "keywords")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
  const robots = meta(html, "name", "robots");
  const canonical = tagAttribute(
    html,
    /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i,
    "href",
  );
  rows.push([
    url,
    pageType(path),
    textOf(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    textOf(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i),
    meta(html, "name", "description"),
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
    "indexable",
    "",
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
writeFileSync(
  OUTPUT,
  [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n") +
    "\n",
);
console.log(
  `[seo-inventory] wrote ${rows.length} rows from ${urls.length} canonical URLs to ${OUTPUT}`,
);
