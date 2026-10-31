#!/usr/bin/env node
/**
 * Repository-wide blog visibility audit.
 *
 * Reads the canonical JSON articles under src/content/blog/posts and writes a
 * deterministic report for every published article. This is deliberately an
 * audit/gating tool: it never invents clinical claims, citations or reviewer
 * details.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(".");
const POSTS = resolve("src/content/blog/posts");
const OUT = resolve("reports/blog-visibility-audit.json");
const SITE = "https://livingwitharthritis.org.uk";

const WORDS = (value) => String(value ?? "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean);
const normalise = (value) => String(value ?? "").replace(/\s+/g, " ").trim().toLowerCase();
const unique = (items) => [...new Set(items.filter(Boolean))];

function parsePosts() {
  if (!existsSync(POSTS)) throw new Error(`Missing ${POSTS}`);
  return readdirSync(POSTS).filter((name) => name.endsWith(".json")).map((name) => {
    const path = join(POSTS, name);
    return JSON.parse(readFileSync(path, "utf8"));
  });
}

function headingCounts(content) {
  const headings = [...String(content ?? "").matchAll(/<h([1-6])[^>]*>([\\s\\S]*?)<\\/h\\1>/gi)];
  return {
    h1: headings.filter((m) => m[1] === "1").length,
    h2: headings.filter((m) => m[1] === "2").length,
    h3: headings.filter((m) => m[1] === "3").length,
    h4: headings.filter((m) => m[1] === "4").length,
  };
}

function links(content) {
  return [...String(content ?? "").matchAll(/<a[^>]+href=["']([^"']+)["']/gi)].map((m) => m[1]);
}

function faqCount(content) {
  return [...String(content ?? "").matchAll(/<h[234][^>]*>[^<]*\?[^<]*<\\/h[234]>/gi)].length;
}

function audit(post, all) {
  const issues = [];
  const recommendations = [];
  const content = String(post.content ?? "");
  const wordCount = WORDS(content).length;
  const hs = headingCounts(content);
  const hrefs = links(content);
  const internal = hrefs.filter((href) => href.startsWith("/"));
  const external = hrefs.filter((href) => /^https?:\\/\\//i.test(href));
  const imageCount = [...content.matchAll(/<img\\b/gi)].length;
  const altCount = [...content.matchAll(/<img[^>]+alt=["'][^"']+["']/gi)].length;
  const faq = faqCount(content);
  const semantic = unique(normalise(post.keywords).split(/[,;|]/).map((x) => x.trim())).filter(Boolean);

  if (!post.meta_title || post.meta_title.length < 30 || post.meta_title.length > 65) {
    issues.push("title length or title field needs optimisation");
    recommendations.push("Create a unique keyword-led title between approximately 45 and 60 characters.");
  }
  if (!post.meta_description || post.meta_description.length < 110 || post.meta_description.length > 160) {
    issues.push("meta description missing or outside recommended length");
    recommendations.push("Write a unique answer-led meta description with the audience and next action.");
  }
  if (!post.direct_answer || WORDS(post.direct_answer).length < 20) {
    issues.push("missing or weak direct answer");
    recommendations.push("Add a concise answer box immediately after the H1.");
  }
  if (wordCount < 700) {
    issues.push("thin article body");
    recommendations.push("Expand only with evidence-backed sections, practical steps, safety advice and FAQs.");
  }
  if (hs.h1 !== 0 || hs.h2 < 2) {
    issues.push("heading hierarchy needs review");
    recommendations.push("Use one rendered H1 and a logical H2/H3 structure.");
  }
  if (internal < 3) {
    issues.push("weak internal linking");
    recommendations.push("Link to one topic hub, two related guides and one relevant resource.");
  }
  if (external < 2) {
    issues.push("limited authoritative referencing");
    recommendations.push("Add visible NHS, NICE, GOV.UK or primary research references where relevant.");
  }
  if (faq < 3) {
    issues.push("insufficient question-led content");
    recommendations.push("Add three or more visible user questions with concise answers.");
  }
  if (imageCount > 0 && altCount < imageCount) {
    issues.push("one or more images lack useful alt text");
    recommendations.push("Add descriptive, non-keyword-stuffed alt text to every meaningful image.");
  }
  if (!post.reviewed_by || !post.reviewer_credentials || !post.last_reviewed) {
    issues.push("clinical review metadata incomplete");
    recommendations.push("Record the actual reviewer, verifiable credentials and review date before publication.");
  }
  if (!post.citations?.length) {
    issues.push("structured citations missing");
    recommendations.push("Add citations that support the article's material medical claims.");
  }

  const duplicateTitle = all.filter((p) => p.slug !== post.slug && normalise(p.meta_title) === normalise(post.meta_title) && post.meta_title).map((p) => p.slug);
  if (duplicateTitle.length) {
    issues.push("duplicate meta title");
    recommendations.push(`Differentiate the title from: ${duplicateTitle.slice(0, 3).join(", ")}.`);
  }

  const score = Math.max(0, 100 - issues.length * 7);
  const priority = score < 51 ? "P0" : score < 75 ? "P1" : "P2";
  return {
    slug: post.slug,
    url: `${SITE}/blog/${post.slug}`,
    title: post.title,
    category: post.category,
    scoreBefore: score,
    priority,
    wordCount,
    semanticKeywords: semantic.slice(0, 10),
    metrics: { headings: hs, internalLinks: internal.length, externalLinks: external.length, faqQuestions: faq, images: imageCount, imagesWithAlt: altCount },
    issues: unique(issues),
    recommendations: unique(recommendations),
    safeOptimisationPlan: [
      "Preserve the existing canonical URL unless a redirect migration is separately approved.",
      "Do not add medical claims, dosages or safety advice without a verifiable source and clinical review.",
      "Use visible answer-first sections so schema describes content users can see.",
      "Link to the relevant condition or symptom hub and to practical resources.",
      "Regenerate prerendered HTML, sitemap, search index and llms-full output after changes.",
    ],
  };
}

const posts = parsePosts().filter((post) => post.is_published);
const report = posts.map((post) => audit(post, posts)).sort((a, b) => a.scoreBefore - b.scoreBefore || a.slug.localeCompare(b.slug));
const summary = {
  generatedAt: new Date().toISOString(),
  articleCount: report.length,
  priorityCounts: report.reduce((acc, row) => { acc[row.priority] = (acc[row.priority] || 0) + 1; return acc; }, {}),
  averageScoreBefore: report.length ? Math.round(report.reduce((n, row) => n + row.scoreBefore, 0) / report.length) : 0,
  nextCommands: ["npm run blog:catalog", "npm run seo:meta-lengths", "npm run seo:headings", "npm run links:check", "npm run seo:schema", "npm run blog:html-gate"],
};
writeFileSync(OUT, JSON.stringify({ summary, articles: report }, null, 2) + "\n");
console.log(`[blog-visibility] audited ${report.length} published articles; report: ${OUT}`);
