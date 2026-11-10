/**
 * Split HTML at the top-level <h2> nearest `target` characters in (default:
 * halfway). Never splits inside a wrapper (section, div, list…), so both
 * halves stay well-formed. `second` is "" when there is no safe split point.
 */
export function splitHtmlAtMiddleH2(
  html: string,
  target: number = html.length / 2,
): { first: string; second: string } {
  if (!html) return { first: "", second: "" };
  let best = -1;
  let bestDist = Infinity;
  const re = /<h2\b/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    if (m.index === 0) continue;
    const before = html.slice(0, m.index);
    const opens = (before.match(/<(section|div|ul|ol|table|blockquote|aside|details)\b/gi) || []).length;
    const closes = (before.match(/<\/(section|div|ul|ol|table|blockquote|aside|details)>/gi) || []).length;
    if (opens !== closes) continue;
    const dist = Math.abs(m.index - target);
    if (dist < bestDist) {
      best = m.index;
      bestDist = dist;
    }
  }
  return best > 0 ? { first: html.slice(0, best), second: html.slice(best) } : { first: html, second: "" };
}
