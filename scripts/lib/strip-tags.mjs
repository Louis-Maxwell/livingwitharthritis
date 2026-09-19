/**
 * Strip HTML tags to plain text without incomplete multi-character sanitization.
 * Iterates to a fixed point so nested/broken tags cannot survive one pass
 * (CodeQL js/incomplete-multi-character-sanitization).
 */
export function stripTags(html) {
  let s = String(html ?? "");
  let prev;
  do {
    prev = s;
    s = s.replace(/<\/?[a-zA-Z][^>]*>/g, " ");
  } while (s !== prev);
  // Remove any leftover angle brackets that never formed a tag.
  s = s.replace(/</g, " ").replace(/>/g, " ");
  return s.replace(/\s+/g, " ").trim();
}

/** Decode a small set of HTML entities safely (&amp; last). */
export function decodeBasicEntities(value = "") {
  return String(value)
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;/g, "'")
    .replace(/&#x0*27;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#0*38;/g, "&")
    .replace(/&amp;/gi, "&");
}
