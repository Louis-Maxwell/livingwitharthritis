/**
 * Many blog_articles rows were imported with `title` hard-clipped at 60
 * characters, which renders mid-word on the /blog cards
 * ("...Evidence-Based Ra", "...A Complete UK Physiothera"). The curated
 * `meta_title` is the full, human-written headline, so prefer it whenever the
 * stored title looks clipped. Falls back to trimming the dangling partial word
 * when no meta_title exists, so a card never ends mid-word.
 */
export interface TitleFields {
  title: string;
  meta_title?: string | null;
}

const CLIP_LENGTH = 58;

const looksClipped = (title: string) =>
  title.length >= CLIP_LENGTH && !/[.?!)"'\u2019\u201d]$/.test(title.trim());

export function displayTitle(post: TitleFields): string {
  const title = (post.title ?? '').trim();
  if (!looksClipped(title)) return title;

  const meta = (post.meta_title ?? '').trim();
  // A meta_title that is just a shorter prefix of the title was itself clipped
  // ("…Affect Sexual"); the stored title is the complete headline then.
  const metaIsPrefix =
    !!meta && title.startsWith(meta.replace(/[\s,;:–-]+$/, '')) && title.length > meta.length + 3;
  if (metaIsPrefix) return title;
  if (meta && !looksClipped(meta)) return meta;

  // No usable meta_title: drop the dangling partial word rather than showing it.
  const lastSpace = title.lastIndexOf(' ');
  if (lastSpace < 20) return title;
  return `${title.slice(0, lastSpace).replace(/[\s,;:–-]+$/, '')}…`;
}
