import { describe, expect, it } from 'vitest';
import journey from '@/data/readerJourneyLinks.json';
import catalog from '@/content/blog/catalog.generated.json';
import { resolveSeoRedirect } from '@/lib/seoRedirects';
const links = journey as Record<string, { href: string; title: string }[]>;
const pairs = [
  ['best-walking-shoes-arthritis-uk', 'best-plantar-fasciitis-shoes-women-uk'],
  ['orthotics-insoles-arthritis-frailty-uk', 'best-plantar-fasciitis-shoes-women-uk'],
  ['podiatry-footcare-arthritis-frailty-uk', 'best-plantar-fasciitis-shoes-women-uk'],
  ['arthritis-pain-management-day-by-day', 'tens-machines-arthritis-uk'],
  ['arthritis-pain-management', 'tens-machines-arthritis-uk'],
];
describe('GSC page-two topic-matched reading links', () => {
  it('links existing foot and pain guides straight to existing relevant destinations', () => {
    const slugs = new Set(catalog.map(p => p.slug));
    for (const [source, destination] of pairs) {
      expect(slugs.has(source)).toBe(true);
      expect(slugs.has(destination)).toBe(true);
      expect(resolveSeoRedirect(`/blog/${destination}`)).toBeFalsy();
      expect(links[`/blog/${source}`].filter(row => row.href === `/blog/${destination}`)).toHaveLength(1);
    }
  });
  it('keeps the existing source reading links alongside the additions', () => {
    expect(links['/blog/orthotics-insoles-arthritis-frailty-uk']).toHaveLength(4);
    expect(links['/blog/podiatry-footcare-arthritis-frailty-uk']).toHaveLength(4);
    expect(links['/blog/arthritis-pain-management-day-by-day']).toHaveLength(4);
  });
});
