import DOMPurify from "dompurify";

export function useSafeHtml(rawHtml: string): string {
  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      "p", "br", "strong", "em", "u", "h1", "h2", "h3", "h4", "h5", "h6",
      "ul", "ol", "li", "blockquote", "a", "img", "table", "thead", "tbody",
      "tr", "td", "th", "code", "pre", "hr", "span", "div", "section",
      "article", "figure", "figcaption", "video", "source", "iframe"
    ],
    ALLOWED_ATTR: [
      "href", "target", "rel", "src", "alt", "title", "class", "id",
      "colspan", "rowspan", "data-*", "aria-*", "controls", "width", "height",
      "loading", "style", "srcset", "sizes"
    ],
    KEEP_CONTENT: true,
    RETURN_DOM: false,
  });
}
