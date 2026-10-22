import data from "@/data/articleDiscovery.generated.json";

type Row = [slug: string, title: string, cat: number, minutes: number];
const D = data as unknown as { c: string[]; s: Row[]; l: Array<[number, number, number[]]> };
const INDEX = new Map(D.s.map((r, i) => [r[0], i]));

export type DiscoveryItem = { slug: string; title: string; category: string; minutes: number };
const item = (i: number): DiscoveryItem | null =>
  i >= 0 && D.s[i] ? { slug: D.s[i][0], title: D.s[i][1], category: D.c[D.s[i][2]] ?? "", minutes: D.s[i][3] } : null;

/** Static related/prev/next for an indexable, published post (null for noindexed or unknown slugs). */
export function getArticleDiscovery(slug: string | undefined) {
  const i = slug ? INDEX.get(slug) : undefined;
  if (i === undefined) return null;
  const [p, n, r] = D.l[i];
  return {
    prev: item(p),
    next: item(n),
    related: r.map(item).filter((x): x is DiscoveryItem => !!x),
  };
}

export function getDiscoveryItem(slug: string): DiscoveryItem | null {
  const i = INDEX.get(slug);
  return i === undefined ? null : item(i);
}

/** Most-viewed guides (GA4, last 90 days, Oct 2026). Update alongside docs/utm.md. */
export const POPULAR_SLUGS = [
  "hip-replacement-recovery-week-by-week",
  "anti-inflammatory-diet",
  "managing-methotrexate-side-effects-practical-tips",
  "best-supplements-arthritis-uk",
  "tens-machines-arthritis-uk",
  "pip-for-arthritis-uk",
  "swimming-exercises-hip-osteoarthritis",
  "best-foods-to-eat-for-arthritis",
  "hydrotherapy-pools-uk",
  "turmeric-for-arthritis",
];

const SKIP = /^(faq|frequently asked|references|sources|citations|related|further reading|continue reading|disclaimer|medical disclaimer|summary|key takeaways|about (the|this) author|read next|more help)/i;

/** Section headings (h2 with ids) from the article, used as an honest "In this guide" list. */
export function extractLearnItems(html: string, max = 5): Array<{ id: string; text: string }> {
  const out: Array<{ id: string; text: string }> = [];
  const re = /<h2[^>]*\bid=["']([^"']+)["'][^>]*>([\s\S]*?)<\/h2>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) && out.length < max) {
    const text = m[2].replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
    if (text && text.length <= 110 && !SKIP.test(text)) out.push({ id: m[1], text });
  }
  return out;
}

