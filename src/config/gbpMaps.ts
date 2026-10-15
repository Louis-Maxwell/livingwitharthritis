/**
 * Optional Google Business Profile map embed.
 *
 * Louis sets VITE_GBP_MAPS_EMBED_URL to a Google Maps *embed* URL once GBP
 * is verified. Until then the Contact page shows UK contact details and a
 * placeholder — never invent a street address (no Oswestry).
 */

const EMBED_HOST_ALLOWLIST = [
  "https://www.google.com/maps/embed",
  "https://maps.google.com/maps",
  "https://www.google.co.uk/maps/embed",
] as const;

export function getGbpMapsEmbedUrl(
  raw: string | undefined = import.meta.env.VITE_GBP_MAPS_EMBED_URL as
    | string
    | undefined,
): string | null {
  if (!raw) return null;
  const url = raw.trim();
  if (!url) return null;
  const allowed = EMBED_HOST_ALLOWLIST.some((prefix) => url.startsWith(prefix));
  if (!allowed) return null;
  // Reject javascript: and other non-https schemes even if prefix matched oddly.
  if (!url.startsWith("https://")) return null;
  return url;
}

export function hasGbpMapsEmbed(): boolean {
  return getGbpMapsEmbedUrl() !== null;
}
