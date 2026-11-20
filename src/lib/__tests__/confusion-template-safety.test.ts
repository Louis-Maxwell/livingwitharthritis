import { describe, it, expect } from 'vitest';
import { blogPostSchema } from '@/lib/blog/schema';
const posts = Object.values(import.meta.glob<{default:{slug:string;content:string;citations?:{url:string}[];editorial_review_note?:string;is_published:boolean;reviewed_by?:string|null}}>('/src/content/blog/posts/*.json', {eager:true})).map(x => x.default);

describe('Sudden-confusion source-copy safety guard', () => {
  it('does not leave the known same-day GP111 sudden-confusion templates in published articles', () => {
    const bad = posts.filter(p => p.is_published && /(?:same day<\/strong>|same day<\/strong> \(NHS 111 or your GP\)) for sudden confusion/.test(p.content));
    expect(bad.map(p => p.slug)).toEqual([]);
    expect(posts.filter(p => p.is_published && p.content.includes('sudden confusion with being very unwell')).map(p => p.slug)).toEqual([]);
  });
  it('keeps the explicitly limited corrections valid, cited and pending separate clinical review', () => {
    const revised = posts.filter(p => p.is_published && p.editorial_review_note?.startsWith('The sudden-confusion emergency advice was corrected on 20 November 2026'));
    expect(revised.length).toBe(96);
    for (const p of revised) {
      expect(blogPostSchema.safeParse(p).success, p.slug).toBe(true);
      expect(p.reviewed_by, p.slug).toBeNull();
      expect(p.editorial_review_note, p.slug).toContain('not yet had a fresh clinical review');
      expect(p.citations?.some(c => c.url === 'https://www.nhs.uk/conditions/confusion/'), p.slug).toBe(true);
      expect(/(?:Call 999|call 999|999 or go to A&amp;E)/.test(p.content), p.slug).toBe(true);
    }
  });
});
