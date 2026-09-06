/**
 * Marked treats a blank line followed by 4+ space-indented lines as a code
 * block. Mixed HTML+markdown posts often have indented tags after a blank
 * line; marked then emits <pre><code>&lt;h2&gt;… which the browser shows as
 * a dark code block of tags instead of rendered headings.
 *
 * These helpers (1) dedent indented HTML before marked and (2) unwrap any
 * escaped-HTML code blocks that still slip through or are already stored.
 */

const ESCAPED_BLOCK_HINT_RE =
  /&lt;\s*\/?\s*(?:h[1-6]|p|ul|ol|li|div|section|article|table|blockquote|figure)\b/i;

const HTML_LINE_RE =
  /^[ \t]*<\/?[a-zA-Z][\w:-]*(?:\s[^>]*)?>/;

/** Decode common HTML entities produced when marked fences HTML as code. */
export function decodeBasicEntities(text) {
  return String(text ?? "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function isIndentedHtmlLine(line) {
  return /^(?: {4,}|\t+)/.test(line) && HTML_LINE_RE.test(line);
}

/**
 * Dedent runs of 4+ space / tab-indented lines that look like HTML so marked
 * will not wrap them in <pre><code>.
 */
export function dedentIndentedHtmlForMarked(src) {
  const lines = String(src ?? "").split("\n");
  const out = [];
  let i = 0;
  while (i < lines.length) {
    if (!isIndentedHtmlLine(lines[i])) {
      out.push(lines[i]);
      i += 1;
      continue;
    }
    // Collect contiguous indented HTML (allow blank lines inside the run).
    while (i < lines.length) {
      const line = lines[i];
      if (line.trim() === "") {
        let j = i + 1;
        while (j < lines.length && lines[j].trim() === "") j += 1;
        if (j < lines.length && isIndentedHtmlLine(lines[j])) {
          out.push("");
          i += 1;
          continue;
        }
        break;
      }
      if (isIndentedHtmlLine(line) || (/^(?: {4,}|\t+)/.test(line) && /[<>]/.test(line))) {
        out.push(line.replace(/^(?: {4}|\t)+/, ""));
        i += 1;
        continue;
      }
      break;
    }
  }
  return out.join("\n");
}

/**
 * Replace <pre><code>…escaped block HTML…</code></pre> with the decoded HTML.
 */
export function unwrapEscapedHtmlCodeBlocks(html) {
  return String(html ?? "").replace(
    /<pre><code(?:\s[^>]*)?>([\s\S]*?)<\/code><\/pre>/gi,
    (full, inner) => {
      if (!ESCAPED_BLOCK_HINT_RE.test(inner)) return full;
      return decodeBasicEntities(inner).replace(/^\n+|\n+$/g, "");
    },
  );
}

/**
 * Collapse consecutive identical <p>Keep expectations kind…</p> paragraphs
 * left by repeated expansion passes.
 */
export function collapseDuplicateKeepExpectations(html) {
  return String(html ?? "").replace(
    /(<p>Keep expectations kind[\s\S]*?<\/p>)(?:\s*\1)+/gi,
    "$1",
  );
}

/** Full content repair for stored blog HTML (idempotent). */
export function repairFencedArticleHtml(content) {
  let html = unwrapEscapedHtmlCodeBlocks(content);
  html = collapseDuplicateKeepExpectations(html);
  return html;
}
