/**
 * On-demand markdown parser. Nearly every guide is stored as HTML, so the
 * parser is only fetched for the few that still contain markdown, keeping it
 * off the article page's critical path.
 */
export type MarkdownParser = (src: string) => string;

let parser: MarkdownParser | null = null;
let pending: Promise<MarkdownParser> | null = null;

export function getMarkdownParser(): MarkdownParser | null {
  return parser;
}

export function loadMarkdownParser(): Promise<MarkdownParser> {
  if (parser) return Promise.resolve(parser);
  if (!pending) {
    pending = import("marked")
      .then(({ marked }) => {
        parser = (src: string) => marked.parse(src, { async: false }) as string;
        return parser;
      })
      .finally(() => {
        pending = null;
      });
  }
  return pending;
}
