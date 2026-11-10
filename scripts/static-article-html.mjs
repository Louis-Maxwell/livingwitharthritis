// Shared helpers for baking unique article HTML into the first response
// so non-JS crawlers (and Google's first pass) do not see an empty SPA
// shell or a homepage-duplicate fallback. Used by inject-canonicals.mjs.

import { marked } from "marked";
import { keywordRelatedLinks } from "./keyword-related-links.mjs";
import { conditionTopicLinks } from "./condition-topic-links.mjs";
import { recommendedNextStepsHtml } from "../src/lib/recommendedNextSteps.mjs";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";
import { parse, parseFragment } from "parse5";
import {
  dedentIndentedHtmlForMarked,
  unwrapEscapedHtmlCodeBlocks,
} from "../src/lib/articleHtmlCodeBlocks.mjs";

const { window } = new JSDOM("");
const DOMPurify = createDOMPurify(window);

const PURIFY_CONFIG = {
  ALLOWED_TAGS: [
    "p", "br", "strong", "em", "u", "h1", "h2", "h3", "h4", "h5", "h6",
    "ul", "ol", "li", "blockquote", "a", "img", "table", "thead", "tbody",
    "tr", "td", "th", "caption", "code", "pre", "hr", "span", "div", "section",
    "article", "figure", "figcaption",
  ],
  ALLOWED_ATTR: [
    "href", "target", "rel", "src", "alt", "title", "class", "id",
    "colspan", "rowspan", "width", "height", "loading", "decoding", "scope",
  ],
  // Explicit schemes only — closes incomplete-url-scheme-check (no data:/vbscript:).
  ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|\/|#)/i,
  FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form", "link", "meta", "base"],
  FORBID_ATTR: ["style"],
  KEEP_CONTENT: true,
};

export function stripToText(value) {
  const raw = String(value ?? "").replace(/\\n/g, " ");
  const parts = [];
  const visit = (node) => {
    if (node.tagName === "script" || node.tagName === "style") return;
    if (node.nodeName === "#text") parts.push(node.value);
    for (const child of node.childNodes || []) visit(child);
    if (node.tagName) parts.push(" ");
  };
  visit(parseFragment(raw));
  return parts.join("")
    .replace(/[#*_>`\[\]]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Sanitize staff-authored HTML via DOMPurify (not fragile multi-replace regex). */
export function sanitizeStaticHtml(html) {
  return DOMPurify.sanitize(String(html ?? ""), PURIFY_CONFIG);
}

function looksLikeMarkdown(src) {
  return /(?:^|\n)#{1,6}\s+\S/.test(src) || /(?:^|\n)(?:[-*+]|\d+\.)\s+\S/.test(src);
}

export function renderArticleHtml(content) {
  const raw = String(content ?? "").replace(/\\n/g, "\n").trim();
  if (!raw) return "";
  // Legacy stored content: escaped block HTML inside <pre><code>.
  const unwrapped = unwrapEscapedHtmlCodeBlocks(raw);
  // Mixed HTML + markdown must go through marked (same rule as BlogPost).
  // Dedent indented HTML first so marked never fences real tags as code.
  const html =
    unwrapped.startsWith("<") && !looksLikeMarkdown(unwrapped)
      ? unwrapped
      : unwrapEscapedHtmlCodeBlocks(
          String(marked.parse(dedentIndentedHtmlForMarked(unwrapped), { async: false })),
        );
  return sanitizeStaticHtml(html);
}

export function escText(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Mirror of PENDING_REVIEW_TEXT (src/lib/blog/review.ts); a test keeps them equal. */

function sameNamedPerson(a, b) {
  const key = (value) => String(value || "").toLowerCase().replace(/[^a-z]+/g, " ").trim();
  const left = key(a);
  const right = key(b);
  if (!left || !right) return false;
  if (left === right) return true;
  return /\bmaxwell\b/.test(left) && /\bmaxwell\b/.test(right);
}

/**
 * Article HTML in the first response. A thin "where to go next" supplement
 * must not replace the guide the reader (and a non-JS fetcher) came for.
 */
export function composeArticleBody(data) {
  const fromArticle = data?.article?.content
    ? renderArticleHtml(data.article.content).replace(/<(\/?)h1\b/gi, "<$1h2")
    : "";
  const extra = String(data?.bodyHtml || "").replace(/<(\/?)h1\b/gi, "<$1h2");
  if (!fromArticle) return extra;
  if (!extra) return fromArticle;
  const articleText = stripToText(fromArticle);
  const extraText = stripToText(extra);
  const needle = articleText.slice(80, 160);
  if (needle.length >= 40 && extraText.includes(needle)) {
    return extraText.length >= articleText.length ? extra : fromArticle;
  }
  const articleWords = articleText.split(/\s+/).filter(Boolean).length;
  if (articleWords >= 180) return fromArticle;
  return fromArticle + extra;
}

export function buildStaticArticleInner(data) {
  const heading = data?.article?.title || data?.question || data?.title || "";
  // The template owns H1. Keep all existing heading words as subordinate H2s.
  const bodyHtml = composeArticleBody(data);
  const answer = data?.answer && !bodyHtml.includes(data.answer)
    ? `<p class="answer-box"><strong>${escText(data.answer)}</strong></p>`
    : "";
  const takeawayItems = Array.isArray(data?.article?.key_takeaways)
    ? data.article.key_takeaways.filter((t) => typeof t === "string" && t.trim()) : [];
  const takeaways = takeawayItems.length >= 3
    ? `<section class="key-takeaways" aria-label="Key clinical takeaways"><h2>Key clinical takeaways</h2><ul>${takeawayItems.map((t) => `<li>${escText(t)}</li>`).join("")}</ul></section>`
    : "";
  const nextStep = data?.article?.slug
    ? recommendedNextStepsHtml(`/blog/${data.article.slug}`, `${data.article.title || ""} ${data.article.keywords || ""}`)
    : "";
  const bodyText = stripToText(bodyHtml);
  const faqPairs = Array.isArray(data?.faqs)
    ? data.faqs.filter((f) => !bodyText.includes(stripToText(f.q))) : [];
  const faqHtml = faqPairs.length
    ? `<section><h2>Frequently asked questions</h2>${faqPairs
        .map((f) => `<h3>${escText(f.q)}</h3><p>${escText(f.a)}</p>`)
        .join("")}</section>`
    : "";
  const updated = data?.updatedAt ? `Last updated ${escText(data.updatedAt)}. ` : "";
  const article = data?.article;
  const selfReview = article?.author && article?.reviewed_by && sameNamedPerson(article.author, article.reviewed_by);
  const creds = article?.reviewer_credentials || article?.author_credentials;
  const author = !selfReview && article?.author && !/placeholder/i.test(article.author)
    ? `<p class="article-byline">Written by ${escText(article.author)}${article.author_credentials ? ` — ${escText(article.author_credentials)}` : ""}.</p>` : "";
  const reviewer = selfReview
    ? `<p class="article-byline">Written and reviewed by ${escText(article.reviewed_by)}${creds ? ` — ${escText(creds)}` : ""}. This is a disclosed self-review by the author, not an independent clinical review.</p>`
    : article?.reviewed_by && !/placeholder/i.test(article.reviewed_by)
    ? `<p>Reviewed by ${escText(article.reviewed_by)}${article.reviewer_credentials ? ` — ${escText(article.reviewer_credentials)}` : ""}.</p>` : "";
  const citations = (article?.citations || data?.sources || [])
    .map((c) => ({ ...c, label: c.label || c.name }))
    .filter((c) => /^https?:\/\//i.test(c.url) && c.label);
  const references = citations.length
    ? `<section aria-label="Sources and references"><h2>Sources and references</h2><ol>${citations.map((c) => `<li><a href="${escText(c.url).replace(/"/g, "&quot;")}">${escText(c.label)}</a></li>`).join("")}</ol></section>` : "";
  const links = (data?.relatedLinks || []).filter((link) => /^\/(?!\/)/.test(link.path) && link.title);
  const related = links.length
    ? `<nav aria-label="Related guides"><h2>Related guides</h2><ul>${links.map((link) => `<li><a href="${escText(link.path).replace(/"/g, "&quot;")}">${escText(link.title)}</a></li>`).join("")}</ul></nav>` : "";

  const supportLinks = data?.article?.slug
    ? `<nav aria-label="Arthritis support and guides"><a href="/arthritis-support">Arthritis support</a> · <a href="/guides">Arthritis guides</a> · <a href="/authors">Authors and editorial team</a></nav>`
    : "";

  return (
    `<article id="static-article" class="static-article">` +
    `<h1>${escText(heading)}</h1>` +
    author + reviewer +
    answer + takeaways +
    (bodyHtml ? `<div class="static-article-body">${stripBodyBloat(bodyHtml)}</div>` : "") +
    `<p><em>${updated}This is general information, not a substitute for personalised medical advice.</em></p>` +
    faqHtml +
    nextStep +
    references + related + supportLinks +
    conditionTopicLinks(data?.article) +
    keywordRelatedLinks(data?.article) +
    `</article>`
  );
}

/**
 * Remove markup that adds bytes but no readable text for crawlers and LLMs:
 * decorative inline <svg> icons (aria-hidden), HTML comments, and raw JSON
 * <script> payloads.
 * Never touches JSON-LD (application/ld+json) or the article hydration
 * payload (#static-article-data), and is only applied to <body> markup.
 */
export function stripBodyBloat(html) {
  const src = String(html ?? "");
  return removeBloatRanges(src, parseFragment(src, { sourceCodeLocationInfo: true }));
}

/** Apply stripBodyBloat to the <body> of a full HTML document only. */
export function stripDocumentBodyBloat(html) {
  const src = String(html ?? "");
  const doc = parse(src, { sourceCodeLocationInfo: true });
  const htmlEl = doc.childNodes?.find((n) => n.tagName === "html");
  const body = htmlEl?.childNodes?.find((n) => n.tagName === "body");
  return body ? removeBloatRanges(src, body) : src;
}

// DOM-based (parse5 source offsets), not regex: removes whole nodes from the
// original string so nothing else in the document is re-serialised.
function removeBloatRanges(src, root) {
  const attr = (node, name) => node.attrs?.find((a) => a.name === name)?.value;
  const ranges = [];
  const visit = (node) => {
    for (const child of node.childNodes || []) {
      const loc = child.sourceCodeLocation;
      const isComment = child.nodeName === "#comment";
      const isDecorativeSvg = child.tagName === "svg" && attr(child, "aria-hidden") === "true";
      const isRawJson = child.tagName === "script"
        && String(attr(child, "type") || "").toLowerCase() === "application/json"
        && attr(child, "id") !== "static-article-data";
      if (loc && (isComment || isDecorativeSvg || isRawJson)) {
        ranges.push([loc.startOffset, loc.endOffset]);
      } else {
        visit(child.content || child);
      }
    }
  };
  visit(root);
  let out = src;
  for (const [a, b] of ranges.sort((x, y) => y[0] - x[0])) out = out.slice(0, a) + out.slice(b);
  return out;
}

export function replaceSeoFallback(html, innerHtml, { visible = false } = {}) {
  const attrs = visible
    ? `id="seo-fallback"`
    : `id="seo-fallback" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;"`;
  const block = `<div ${attrs}>\n      <header><a href="/">Living With Arthritis</a></header>\n      <a href="#static-main-content" class="sr-only focus:not-sr-only">Skip to main content</a>\n      <main id="static-main-content" tabindex="-1">\n        ${innerHtml}\n      </main>\n      <footer><nav aria-label="Footer"><a href="/contact">Contact us</a> · <a href="/accessibility">Accessibility</a> · <a href="/privacy">Privacy policy</a></nav></footer>\n      </div>`;
  const doc = parse(html, { sourceCodeLocationInfo: true });
  // The homepage-only first-paint shell must never survive on another route.
  // DOM replacement handles nested divs; a first-closing-div regex did not.
  const byId = new Map();
  const visit = (node) => {
    const id = node.attrs?.find((a) => a.name === "id")?.value;
    if (id) byId.set(id, node);
    for (const child of node.childNodes || []) visit(child);
  };
  visit(doc);
  const replacements = [];
  const boot = byId.get("boot-hero")?.sourceCodeLocation;
  if (boot) replacements.push({ start: boot.startOffset, end: boot.endOffset, text: "" });
  const fallback = byId.get("seo-fallback")?.sourceCodeLocation;
  const root = byId.get("root")?.sourceCodeLocation;
  if (fallback) replacements.push({ start: fallback.startOffset, end: fallback.endOffset, text: block });
  else if (root?.startTag && root?.endTag) {
    // Replace all nested root children, never only the first closing div.
    return html.slice(0, root.startTag.endOffset) + block + html.slice(root.endTag.startOffset);
  }
  let out = html;
  for (const r of replacements.sort((a, b) => b.start - a.start)) {
    out = out.slice(0, r.start) + r.text + out.slice(r.end);
  }
  return out;
}

export function uniqueBodyNeedle(data) {
  const text = stripToText(data?.article?.content || data?.bodyHtml || "");
  if (text.length < 80) return "";
  const start = Math.min(180, Math.max(0, text.length - 80));
  return text.slice(start, start + 48);
}

export function htmlHasFullArticle(html, data) {
  const needle = uniqueBodyNeedle(data);
  if (needle.length >= 24) return html.includes(needle);
  if (html.includes('id="static-article"')) {
    const heading = stripToText(data?.question || data?.title || "");
    return heading.length >= 12 && html.includes(heading.slice(0, 12));
  }
  return false;
}

export function embedArticleJson(html, article) {
  if (!article?.slug || !article?.content) return html;
  const payload = JSON.stringify(article).replace(/</g, "\\u003c");
  const tag = `<script type="application/json" id="static-article-data">${payload}</script>`;
  if (html.includes('id="static-article-data"')) {
    return html.replace(
      /<script type="application\/json" id="static-article-data">[\s\S]*?<\/script>/,
      tag,
    );
  }
  return html.replace(/<\/body>/i, `    ${tag}\n  </body>`);
}

export const HOME_SHELL_HEADING =
  "Living With Arthritis — charity for people with joint pain in the UK";
