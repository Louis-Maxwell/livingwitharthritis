#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { decodeBasicEntities } from "./lib/strip-tags.mjs";
import { writeFileAtomicSync } from "./lib/atomic-write.mjs";

const DIST = resolve(process.argv[2] || "dist");
const SITE = "https://livingwitharthritis.org.uk";
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
  decodeBasicEntities(value).replace(/\s+/g, " ").trim();
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
  const links = [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)].map((match) => match[1]);
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  const internalLinks = links.filter((href) => href.startsWith("/") || href.startsWith(SITE));
  const externalLinks = links.filter((href) => /^https?:\/\//i.test(href) && !href.startsWith(SITE));
  const articleText = textOf(html, /<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const schemaTypes = [...new Set(nodes.flatMap((node) => Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]]).filter(Boolean))].sort();
  const canonicalUrl = canonical ? new URL(canonical, url).href.replace(/\/$/, "") : "";
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
    "present-prerender-output",
    "",
    robots,
    canonicalUrl === url.replace(/\/$/, ""),
    (html.match(/<h2\b/gi) || []).length,
    images.length,
    images.filter((image) => !/\balt=["'][^"']+["']/i.test(image)).length,
    internalLinks.length,
    externalLinks.length,
    (articleText.match(/\b[\p{L}\p{N}’'_-]+\b/gu) || []).length,
    schemaTypes.join("|"),
    Buffer.byteLength(html, "utf8"),
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
