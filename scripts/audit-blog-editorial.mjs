#!/usr/bin/env node
/**
 * Non-destructive blog editorial audit.
 * Run: node scripts/audit-blog-editorial.mjs
 * Strict: node scripts/audit-blog-editorial.mjs --strict
 *
 * This is a structural audit, NOT a clinical accuracy, citation-verification,
 * plagiarism, or image-rights assessment.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = "src/content/blog/posts";
const files = readdirSync(root).filter((f) => f.endsWith(".json")).sort();
const results = [];
const matches = (s, re) => (s.match(re) || []).length;
for (const file of files) {
  let p;
  try { p = JSON.parse(readFileSync(join(root, file), "utf8")); }
  catch (error) { results.push({ file, error: String(error) }); continue; }
  if (!p.is_published) continue;
  const html = p.content || "";
  const citations = Array.isArray(p.citations) ? p.citations : [];
  const inlineImages = matches(html, /<img\b/gi);
  const sections = matches(html, /<h2\b/gi);
  const hasFaq = /(?:frequently asked questions|<h2[^>]*>[^<]*faq|\bFAQ\b)/i.test(html);
  const hasDisclaimer = /(?:medical disclaimer|not (?:a substitute for|medical advice)|general information only|does not replace.*(?:medical|professional))/i.test(html);
  const citationUrlsValid = citations.every((c) => typeof c?.url === "string" && /^https:\/\//i.test(c.url) && typeof c?.label === "string" && c.label.trim());
  const issues = [];
  if (citations.length === 0) issues.push("missing_structured_citations");
  if (!citationUrlsValid) issues.push("invalid_citation_metadata");
  if (inlineImages < 2) issues.push("fewer_than_two_body_images");
  if (sections < 3) issues.push("fewer_than_three_h2_sections");
  if (!hasFaq) issues.push("missing_faq");
  if (!hasDisclaimer) issues.push("missing_detectable_disclaimer");
  if (p.reviewStatus === "pending" || !p.last_reviewed) issues.push("review_not_documented");
  results.push({ slug: p.slug, category: p.category, citationCount: citations.length, bodyImageCount: inlineImages, cover: p.cover, h2Count: sections, hasFaq, hasDisclaimer, reviewStatus: p.reviewStatus ?? "unspecified", issues });
}
const counts = {};
for (const row of results) for (const issue of row.issues || [row.error ? "unreadable_json" : null].filter(Boolean)) counts[issue] = (counts[issue] || 0) + 1;
const report = { scope: "published source JSON files", limitations: ["Cover images are counted separately from body images", "HTML heuristics may miss Markdown or component-rendered sections", "Citation existence does not prove source accuracy or claim support", "No clinical review, licensing or web-link verification performed"], publishedArticles: results.length, issueCounts: counts, articles: results };
const out = process.argv.find((arg) => arg.startsWith("--output="));
if (out) writeFileSync(out.slice(9), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ publishedArticles: report.publishedArticles, issueCounts: counts, flaggedArticles: results.filter((r) => r.issues?.length || r.error).length }, null, 2));
if (process.argv.includes("--strict") && results.some((r) => r.issues?.length || r.error)) process.exitCode = 1;
