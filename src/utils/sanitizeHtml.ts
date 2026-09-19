import DOMPurify from "dompurify";

function wrapTablesForMobile(html: string): string {
  // Scroll wide tables inside a wrapper so the page itself never side-scrolls.
  return html.replace(/<table(\b[^>]*)>[\s\S]*?<\/table>/gi, (match) => {
    if (/class=["'][^"']*\btable-scroll\b/.test(match)) return match;
    return `<div class="table-scroll">${match}</div>`;
  });
}

let hooksInstalled = false;

function installHooks() {
  if (hooksInstalled || typeof window === "undefined") return;
  hooksInstalled = true;
  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    for (const attr of ["href", "src", "srcset"]) {
      const value = node.getAttribute(attr);
      if (!value) continue;
      const trimmed = value.trim();
      if (trimmed.startsWith("//") || /^\s*javascript:/i.test(trimmed) || /^\s*data:text\/html/i.test(trimmed)) {
        node.removeAttribute(attr);
      }
    }
    if (node.tagName === "A") {
      const href = node.getAttribute("href") || "";
      if (node.getAttribute("target") === "_blank" || /^https?:/i.test(href)) {
        node.setAttribute("rel", "noopener noreferrer");
      }
    }
  });
}

/**
 * Sanitize staff-authored HTML before dangerouslySetInnerHTML.
 * Tags and attributes are an allowlist. Embedded frames, inline event
 * handlers, and javascript: URLs are not permitted.
 */
export function sanitizeHtml(rawHtml: string): string {
  if (!rawHtml) return "";
  installHooks();
  const clean = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      "p", "br", "strong", "em", "u", "h1", "h2", "h3", "h4", "h5", "h6",
      "ul", "ol", "li", "blockquote", "a", "img", "table", "thead", "tbody",
      "tr", "td", "th", "code", "pre", "hr", "span", "div", "section",
      "article", "figure", "figcaption",
    ],
    ALLOWED_ATTR: [
      "href", "target", "rel", "src", "alt", "title", "class", "id",
      "colspan", "rowspan", "controls", "width", "height",
      "loading", "srcset", "sizes", "aria-label", "aria-hidden",
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.:-]|$))/i,
    FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form", "link", "meta", "base"],
    FORBID_ATTR: ["style"],
    KEEP_CONTENT: true,
    RETURN_DOM: false,
  });
  return wrapTablesForMobile(clean);
}

/** JSON-LD must not be able to close a surrounding script tag. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
