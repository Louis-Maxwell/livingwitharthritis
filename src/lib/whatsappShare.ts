/** Plain-text WhatsApp message. WhatsApp renders *text* as bold. */
export function buildWhatsAppMessage(title: string, url: string, summary: string): string {
  return [
    `*${title.replace(/\s+/g, " ").trim()}*`,
    summary.replace(/\s+/g, " ").trim(),
    "",
    "Free guide from Living With Arthritis (registered charity 1218461):",
    url,
  ].join("\n");
}
