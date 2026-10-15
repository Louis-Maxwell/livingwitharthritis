/**
 * Guides that have a recorded narration at public/audio/<slug>.mp3.
 * The player uses the recording for these and the browser's speech engine
 * for everything else. Checked against public/audio by
 * src/lib/__tests__/article-audio.test.ts, so the list cannot drift.
 * Replaces a per-visit HEAD request that returned 404 on every article
 * (no recordings exist yet).
 */
export const ARTICLE_AUDIO_SLUGS: ReadonlySet<string> = new Set<string>([]);

export function articleAudioUrl(slug: string | undefined): string | null {
  return slug && ARTICLE_AUDIO_SLUGS.has(slug) ? `/audio/${slug}.mp3` : null;
}
