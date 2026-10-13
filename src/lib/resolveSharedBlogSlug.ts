import blogSlugs from '@/data/blog-slugs.generated.json';

const KNOWN_SLUGS = new Set<string>(blogSlugs as string[]);

/**
 * Social shares sometimes glue extra characters onto a blog address
 * (e.g. "arthritis-fatigue-management-uk5" or "...-fatigueChoose").
 * Returns the real slug when the given one is a known slug plus junk,
 * otherwise undefined.
 */
export function resolveSharedBlogSlug(slug: string): string | undefined {
  if (KNOWN_SLUGS.has(slug)) return undefined;
  let best: string | undefined;
  for (const known of KNOWN_SLUGS) {
    if (slug.startsWith(known) && (!best || known.length > best.length)) {
      const rest = slug.slice(known.length);
      // Only accept plain trailing junk: digits or a glued-on word.
      if (/^[0-9]+$|^[A-Z][A-Za-z]*$/.test(rest)) best = known;
    }
  }
  return best;
}
