/** Strip HTML tags from a string (fixed-point; safe vs incomplete multi-char sanitization). */
export function stripHtml(input) {
  let s = String(input ?? "");
  let prev = "";
  while (s !== prev) {
    prev = s;
    s = s.replace(/<\/?[a-zA-Z][^>]*>/g, "");
  }
  // Neutralize any leftover angle brackets so they cannot form tags later.
  return s.replace(/[<>]/g, "");
}

const NAMED_ENTITIES = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
};

/**
 * Decode common HTML entities found in article/FAQ plain text.
 *
 * Single pass: each entity is decoded exactly once, so `&amp;lt;` becomes the
 * literal text `&lt;` and is never decoded a second time into `<`
 * (CodeQL js/double-escaping). Unknown entities are left untouched.
 */
function decodeBasicEntities(input) {
  return input.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, body) => {
    if (body[0] === "#") {
      const hex = body[1] === "x" || body[1] === "X";
      const code = hex ? parseInt(body.slice(2), 16) : Number(body.slice(1));
      return Number.isFinite(code) && code > 0 && code < 0x110000
        ? String.fromCodePoint(code)
        : match;
    }
    const named = NAMED_ENTITIES[body.toLowerCase()];
    return named ?? match;
  });
}

/**
 * Convert HTML to readable plain text for FAQ answers, reading-time, and
 * schema. Inserts whitespace at block/br boundaries BEFORE stripping tags so
 * `</p><p>` / `</li><li>` do not mash sentences (`hours.Try` → `hours. Try`).
 * Prefer this over stripHtml whenever the result is shown or counted as prose.
 */
export function htmlToPlainText(input) {
  let s = String(input ?? "");
  // Block / break boundaries → space (before tag removal collapses them).
  s = s.replace(/<br\s*\/?>/gi, " ");
  s = s.replace(/<\/(?:p|div|li|h[1-6]|blockquote|tr|td|th|section|article|figcaption|dt|dd)\s*>/gi, " ");
  s = s.replace(/<(?:p|div|li|h[1-6]|blockquote|tr|td|th|section|article|figcaption|dt|dd)\b[^>]*>/gi, " ");
  // Decode entities before stripHtml so encoded tags are removed and &nbsp; is space.
  s = decodeBasicEntities(s);
  s = stripHtml(s);
  return s.replace(/\s+/g, " ").trim();
}
