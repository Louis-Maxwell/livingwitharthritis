import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { coverFromFile, pickArticleImages } from '@/lib/articleImagePicks';
import { blogPostSchema } from '@/lib/blog/schema';
const post = (slug: string) => JSON.parse(readFileSync(`src/content/blog/posts/${slug}.json`, 'utf8'));
describe('Wound and pressure-care editorial repairs', () => {
  it('keeps both guides on their specific illustrations, not unrelated stock', () => {
    for (const [slug, asset] of [['wound-care-reaching-arthritis-frailty-uk', 'lwa-wound-care-plan.svg'], ['skin-pressure-care-arthritis-frailty-uk', 'lwa-pressure-care-everyday.svg']]) {
      const j = post(slug); const images = pickArticleImages(coverFromFile(j.cover), j.category, j.title, slug);
      expect(images).toHaveLength(2); expect(images[1].src).toBe('/openverse/' + asset);
    }
  });
  it('gives a minor-cut process and distinguishes urgent and emergency wounds', () => {
    const j = post('wound-care-reaching-arthritis-frailty-uk');
    expect(j.content).toContain('Rinse the small wound with tap or bottled water');
    expect(j.content).toContain('Loss of feeling near the wound');
    expect(j.content).toContain('Something embedded in the wound');
    expect(j.content).toContain('Ask for an urgent GP appointment');
    expect(j.content).not.toContain('District nurses can if you are housebound');
    expect(j.content).toContain('does not by itself confirm a particular service or guarantee a home visit');
    expect(j.content).toContain('tetanus');
  });
  it('covers dark-skin signs, urgent infection care and individual prevention plans', () => {
    const j = post('skin-pressure-care-arthritis-frailty-uk');
    expect(j.content).toContain('purple or blue rather than red');
    expect(j.content).toContain('severe pain or pain that is worsening');
    expect(j.content).toContain('Do not rub or massage');
    expect(j.content).toContain('individual plan');
    expect(j.content).toContain('Call 999 or go to A&amp;E if you think the person may have sepsis');
    expect(j.citations.some((c: {url:string}) => c.url === 'https://www.nice.org.uk/guidance/cg179/ifp/chapter/prevention')).toBe(true);
  });
  it('keeps both routes published with bounded metadata and honest review status', () => {
    for (const slug of ['wound-care-reaching-arthritis-frailty-uk','skin-pressure-care-arthritis-frailty-uk']) {
      const j = post(slug);
      expect(blogPostSchema.safeParse(j).success).toBe(true);
      expect(j.date).toBe('2026-09-03'); expect(j.is_published).toBe(true);
      expect(j.meta_description.length).toBeLessThanOrEqual(155);
      expect(j.content.split('<h3>').length-1).toBeGreaterThanOrEqual(5);
      expect(j.reviewed_by).toBeNull(); expect(j.reviewer_credentials).toBeNull();
      expect(j.author_credentials).toBeNull(); expect(j).not.toHaveProperty('last_reviewed');
      expect(j.content).not.toContain('Reviewed by Louis Maxwell');
      expect(j.editorial_review_note).toContain('not yet had a fresh clinical review');
      expect(j.content).not.toContain('—');
      const questionHeadings = [...j.content.matchAll(/<h2([^>]*)>([^<]*\?)<\/h2>/g)];
      expect(questionHeadings.length).toBeGreaterThanOrEqual(8);
      expect(questionHeadings.every(m => m[1].includes('q-heading'))).toBe(true);
    }
  });
});
