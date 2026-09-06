// Shared helpers for baking unique article HTML into the first response
// so non-JS crawlers (and Google's first pass) do not see an empty SPA
// shell or a homepage-duplicate fallback. Used by inject-canonicals.mjs.

import { marked } from "marked";

const ALLOWED_ATTR = new Set([
  "href",
  "src",
  "alt",
  "title",
  "class",
  "id",
  "rel",
  "target",
  "colspan",
  "rowspan",
  "width",
  "height",
  "loading",
]);

export function stripToText(value) {
  return String(value ?? "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_>`\[\]]/g, " ")
    .replace(/\\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizeStaticHtml(html) {
  return String(html ?? "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/<\/?([^>\s]+)([^>]*)>/g, (full, tag, attrs) => {
      const closing = full.startsWith("</");
      const name = String(tag).toLowerCase();
      if (closing) return `</${name}>`;
      const safeAttrs = [];
      const attrRe = /([a-zA-Z_:][\w:.-]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/g;
      let match;
      while ((match = attrRe.exec(attrs))) {
        const attr = match[1].toLowerCase();
        if (!ALLOWED_ATTR.has(attr)) continue;
        const value = match[3] ?? match[4] ?? match[5] ?? "";
        if (attr === "href" || attr === "src") {
          const trimmed = String(value).trim();
          if (!trimmed || /^(javascript|data):/i.test(trimmed)) continue;
        }
        safeAttrs.push(`${attr}="${String(value).replace(/"/g, "&quot;")}"`);
      }
      return safeAttrs.length ? `<${name} ${safeAttrs.join(" ")}>` : `<${name}>`;
    });
}

function looksLikeMarkdown(src) {
  return /(?:^|\n)#{1,6}\s+\S/.test(src) || /(?:^|\n)(?:[-*+]|\d+\.)\s+\S/.test(src);
}

export function renderArticleHtml(content) {
  const raw = String(content ?? "").replace(/\\n/g, "\n").trim();
  if (!raw) return "";
  // Mixed HTML + markdown must go through marked (same rule as BlogPost).
  const html =
    raw.startsWith("<") && !looksLikeMarkdown(raw)
      ? raw
      : String(marked.parse(raw, { async: false }));
  return sanitizeStaticHtml(html);
}

export function escText(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function buildStaticArticleInner(data) {
  const heading = data?.question || data?.title || "";
  const bodyHtml = data?.bodyHtml || renderArticleHtml(data?.article?.content);
  const answer = data?.answer && !bodyHtml.includes(data.answer)
    ? `<p class="answer-box"><strong>${escText(data.answer)}</strong></p>`
    : "";
  const faqPairs = Array.isArray(data?.faqs) ? data.faqs : [];
  const faqHtml = faqPairs.length
    ? `<section><h2>Frequently asked questions</h2>${faqPairs
        .map((f) => `<h3>${escText(f.q)}</h3><p>${escText(f.a)}</p>`)
        .join("")}</section>`
    : "";
  const updated = data?.updatedAt ? `Last updated ${escText(data.updatedAt)}. ` : "";

  return (
    `<article id="static-article" class="static-article">` +
    `<h1>${escText(heading)}</h1>` +
    answer +
    (bodyHtml ? `<div class="static-article-body">${bodyHtml}</div>` : "") +
    `<p><em>${updated}This is general information, not a substitute for personalised medical advice.</em></p>` +
    faqHtml +
    `</article>`
  );
}

const SEO_FALLBACK_RE =
  /<div id="seo-fallback"[^>]*>[\s\S]*?<\/main>\s*<\/div>/i;

export function replaceSeoFallback(html, innerHtml, { visible = false } = {}) {
  const attrs = visible
    ? `id="seo-fallback"`
    : `id="seo-fallback" aria-hidden="true" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;"`;
  const block = `<div ${attrs}>\n      <main>\n        ${innerHtml}\n      </main>\n      </div>`;
  if (SEO_FALLBACK_RE.test(html)) {
    return html.replace(SEO_FALLBACK_RE, block);
  }
  return html.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">\n      ${block}\n    </div>`);
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
  "Living With Arthritis — UK charity for people with joint pain";
