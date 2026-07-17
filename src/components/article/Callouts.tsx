/**
 * renderCallouts — post-process article HTML to wrap paragraphs that begin
 * with one of the four editorial prefixes in a styled <aside>.
 *
 * Runs on already-sanitised HTML (DOMPurify has already been applied by
 * markdownToHtml), so we only manipulate the outer <p> tag and preserve
 * the inner markup untouched.
 *
 * Supported prefixes (case-insensitive, emoji optional):
 *   💡 Helpful tip:      → info
 *   ✅ Try this gently:  → success
 *   ⚠️  When to get help:→ warning
 *   📝 Remember:         → note
 */

type Variant = "info" | "success" | "warning" | "note";

const PATTERNS: { re: RegExp; variant: Variant; label: string }[] = [
  { re: /^\s*(?:💡\s*)?(Helpful tip)\s*[:—-]\s*/i, variant: "info", label: "Helpful tip" },
  { re: /^\s*(?:✅\s*)?(Try this gently)\s*[:—-]\s*/i, variant: "success", label: "Try this gently" },
  { re: /^\s*(?:⚠️?\s*)?(When to get help)\s*[:—-]\s*/i, variant: "warning", label: "When to get help" },
  { re: /^\s*(?:📝\s*)?(Remember)\s*[:—-]\s*/i, variant: "note", label: "Remember" },
];

export function renderCallouts(html: string): string {
  return html.replace(/<p([^>]*)>([\s\S]*?)<\/p>/gi, (match, attrs, inner) => {
    // Skip if the paragraph is inside no-callout scope (e.g. blockquotes) — but
    // we don't know context in a regex pass, so we just apply on any <p>. Safe:
    // the prefix match is specific enough not to false-positive.
    const stripped = String(inner).replace(/^(<[^>]+>)+/, "").trimStart();
    for (const { re, variant, label } of PATTERNS) {
      if (re.test(stripped)) {
        const body = String(inner).replace(re, "");
        return `<aside class="article-callout article-callout--${variant}" role="note" aria-label="${label}"><strong class="article-callout__label">${label}</strong><span class="article-callout__body">${body}</span></aside>`;
      }
    }
    return match;
  });
}
