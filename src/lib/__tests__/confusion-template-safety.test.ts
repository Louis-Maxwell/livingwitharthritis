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
    // Pressure-care, activity-diary and menopause now have broader source revisions.
    expect(revised.length).toBe(93);
    const menopause = posts.find(p => p.slug === 'menopause-hrt-and-joint-pain');
    expect(menopause?.editorial_review_note).toBe("Editorial source update. This revised article awaits Louis Maxwell's clinical review. No independent clinical review is claimed.");
    expect(menopause?.reviewed_by).toBeNull();
    expect(menopause?.content).toContain('Seek urgent medical advice for sudden severe joint pain');
    expect(menopause?.citations?.some(c => c.url === 'https://www.nhs.uk/conditions/septic-arthritis/')).toBe(true);
    const diary = posts.find(p => p.slug === 'activity-diary-arthritis-frailty-uk');
    expect(diary?.editorial_review_note).toContain('not yet had a fresh clinical review');
    expect(diary?.content).toContain('Call 999 or go to A&amp;E if someone suddenly becomes confused');
    expect(diary?.citations?.some(c => c.url === 'https://www.nhs.uk/conditions/confusion/')).toBe(true);
    const pressure = posts.find(p => p.slug === 'skin-pressure-care-arthritis-frailty-uk');
    expect(pressure?.editorial_review_note).toContain('Substantively revised on 20 November 2026');
    expect(pressure?.content).toContain('Call 999 or go to A&amp;E if you think the person may have sepsis');
    expect(pressure?.citations?.some(c => c.url === 'https://www.nhs.uk/conditions/sepsis/')).toBe(true);
    for (const p of revised) {
      expect(blogPostSchema.safeParse(p).success, p.slug).toBe(true);
      expect(p.reviewed_by, p.slug).toBeNull();
      expect(p.content, p.slug).not.toMatch(/(?:clinically )?reviewed by Louis Maxwell/i);
      expect(p.editorial_review_note, p.slug).toContain('not yet had a fresh clinical review');
      expect(p.citations?.some(c => c.url === 'https://www.nhs.uk/conditions/confusion/'), p.slug).toBe(true);
      expect(/(?:Call 999|call 999|999 or go to A&amp;E)/.test(p.content), p.slug).toBe(true);
    }
  });
});
