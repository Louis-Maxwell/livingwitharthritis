import blogList from '@/data/blogList.json';

export type GuideSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
};

type RawGuide = {
  slug?: string;
  title?: string;
  excerpt?: string;
  category?: string;
  date?: string;
};

export const SITE_URL = 'https://livingwitharthritis.org.uk';

/** All published guides, de-duplicated by slug. */
export function allGuides(): GuideSummary[] {
  const seen = new Set<string>();
  const guides: GuideSummary[] = [];

  for (const raw of blogList as RawGuide[]) {
    const slug = (raw.slug ?? '').trim();
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    guides.push({
      slug,
      title: (raw.title ?? slug).trim(),
      excerpt: (raw.excerpt ?? '').trim(),
      category: (raw.category ?? 'General').trim(),
      date: (raw.date ?? '').trim(),
    });
  }

  return guides;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

/** Simple keyword relevance scoring over titles, excerpts and categories. */
export function searchGuides(query: string, limit: number): GuideSummary[] {
  const terms = tokenize(query);
  if (terms.length === 0) return [];

  const scored = allGuides().map((guide) => {
    const title = guide.title.toLowerCase();
    const excerpt = guide.excerpt.toLowerCase();
    const category = guide.category.toLowerCase();
    let score = 0;

    for (const term of terms) {
      if (title.includes(term)) score += 5;
      if (excerpt.includes(term)) score += 2;
      if (category.includes(term)) score += 1;
    }

    if (title.includes(query.toLowerCase().trim())) score += 6;
    return { guide, score };
  });

  return scored
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.guide.title.localeCompare(b.guide.title))
    .slice(0, limit)
    .map((entry) => entry.guide);
}

export function guideUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}

/** Strip markup from a published page and return readable text. */
export function htmlToText(html: string): string {
  const body = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ');

  return body
    .replace(/<\/(p|div|section|li|h[1-6]|tr)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export const SAFETY_NOTE =
  'This is general UK health information from Living With Arthritis UK, not medical advice. ' +
  'Encourage the reader to speak to their GP, pharmacist or physiotherapist about their own care, ' +
  'and to call NHS 111 (or 999 in an emergency) for urgent symptoms.';
