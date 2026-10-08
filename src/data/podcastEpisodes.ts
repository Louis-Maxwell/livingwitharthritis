/**
 * Published podcast episodes. Add an entry only when the real audio file
 * and full transcript exist. Leave empty until then — never add placeholders.
 */
export interface PodcastEpisode {
  slug: string;
  title: string;
  summary: string;
  /** ISO date, e.g. 2026-11-01 */
  published: string;
  /** Absolute URL to the MP3/M4A file */
  audioUrl: string;
  durationMinutes: number;
  /** Plain-text transcript, paragraphs separated by blank lines */
  transcript: string;
}

export const PODCAST_EPISODES: PodcastEpisode[] = [];
