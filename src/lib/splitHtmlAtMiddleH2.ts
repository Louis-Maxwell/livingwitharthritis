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

/** Keep the first heading with its full section before inserting decorative UI.
 * If authored wrappers do not offer a safe boundary, leave the body intact.
 */
export function splitHtmlAfterFirstSection(html: string): { first: string; second: string } {
  const wrappers = new Set(['section', 'div', 'ul', 'ol', 'table', 'blockquote', 'aside', 'details']);
  const stack: string[] = [];
  let sawHeading = false;
  const tags = /<(\/?)([a-z][\w:-]*)\b[^>]*>/gi;
  let match: RegExpExecArray | null;
  while ((match = tags.exec(html))) {
    const [, closing, rawName] = match;
    const name = rawName.toLowerCase();
    if (!closing && stack.length === 0 && sawHeading && (name === 'h2' || name === 'section')) {
      return { first: html.slice(0, match.index), second: html.slice(match.index) };
    }
    if (!closing && name === 'h2') sawHeading = true;
    if (!wrappers.has(name)) continue;
    if (!closing && !match[0].endsWith('/>')) stack.push(name);
    else if (closing && stack.at(-1) === name) stack.pop();
  }
  return { first: html, second: '' };
}
