/**
 * Dependency-free cover-image fallbacks. Kept separate from articleImages.ts
 * (which bundles the ~46 KB slug→cover map) so above-the-fold components such
 * as the homepage hero can use them without pulling that map into the entry.
 */

/** Local files that exist under public/. Never the red favicon or an empty src. */
export const LOCAL_COVER_FALLBACK = "/openverse/hero-friends-800.webp";
export const DEFAULT_OG_PATH = "/og/landing-share.png";

const BROKEN_SRC_RE = /(?:^$|favicon\.(?:ico|png|svg)$|logo-mark)/i;

export function safeCoverSrc(src: string | null | undefined): string {
  const trimmed = (src ?? "").trim();
  if (!trimmed || BROKEN_SRC_RE.test(trimmed)) return LOCAL_COVER_FALLBACK;
  return trimmed;
}

/** Listing/hero onError: swap a 404 or empty load for a file that is on disk. */
export function onCoverImgError(event: { currentTarget: HTMLImageElement }) {
  const img = event.currentTarget;
  if (!img || img.dataset.coverFallback === "1") return;
  img.dataset.coverFallback = "1";
  img.src = LOCAL_COVER_FALLBACK;
}
