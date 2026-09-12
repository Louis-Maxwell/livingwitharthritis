/** Plain-text snippet for WhatsApp / Facebook / email groups. */
export function buildGroupShareText(
  title: string,
  url: string,
  excerpt?: string,
): string {
  const lines = [title.replace(/\s+/g, " ").trim()];
  const blurb = (excerpt || "").replace(/\s+/g, " ").trim();
  if (blurb) {
    const clipped = blurb.length > 220 ? `${blurb.slice(0, 217).trimEnd()}…` : blurb;
    lines.push("", clipped);
  }
  lines.push("", url.trim());
  return lines.join("\n");
}
