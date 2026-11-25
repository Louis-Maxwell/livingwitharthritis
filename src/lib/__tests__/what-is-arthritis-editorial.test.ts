import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { blogPostSchema } from '@/lib/blog/schema';
const post = () => JSON.parse(readFileSync('src/content/blog/posts/what-is-arthritis.json', 'utf8'));
describe('What is arthritis substantive editorial repair', () => {
  it('answers the definition and types instead of reusing an exercise template', () => {
    const j = post();
    expect(j.content).toContain('It is a broad label, not one diagnosis.');
    for (const term of ['Osteoarthritis:', 'Rheumatoid arthritis:', 'Gout:', 'psoriatic arthritis', 'juvenile idiopathic arthritis']) expect(j.content).toContain(term);
    expect(j.content).not.toContain('Start with a manageable step');
    expect(j.category).toBe('Conditions');
    expect(j.content.split(/\s+/).length).toBeGreaterThan(1000);
  });
  it('distinguishes urgent joint assessment from routine symptoms and home diagnosis', () => {
    const j = post();
    expect(j.content).toContain('Ask for an urgent GP appointment or get help from NHS 111');
    expect(j.content).toContain('Not everyone has a fever.');
    expect(j.content).toContain('does not go away in a few days');
    expect(j.content).toContain('Normal blood tests do not remove the need for referral');
    expect(j.content).toContain('Osteoarthritis is often diagnosed from the history and examination without an X-ray');
    expect(j.content).toContain('not a way to diagnose yourself');
    expect(j.citations).toHaveLength(7);
    expect(j.citations.some((c: {url: string}) => c.url === 'https://www.nice.org.uk/guidance/ng100/chapter/recommendations')).toBe(true);
  });
  it('preserves the public route and honest fresh-review status with rendered question sections', () => {
    const j = post();
    expect(blogPostSchema.safeParse(j).success).toBe(true);
    expect(j.is_published).toBe(true); expect(j.slug).toBe('what-is-arthritis'); expect(j.date).toBe('2026-10-25');
    expect(j.cover).toBe('commons-is-arthritis-hereditary-364ae6.webp');
    expect(j.reviewed_by).toBeNull(); expect(j.reviewer_credentials).toBeNull(); expect(j.author_credentials).toBeNull();
    expect(j).not.toHaveProperty('last_reviewed');
    expect(j.editorial_review_note).toContain('not yet had a fresh clinical review');
    expect(j.meta_description.length).toBeLessThanOrEqual(155);
    expect(j.content).not.toContain('—');
    const qs = [...j.content.matchAll(/<h2([^>]*)>([^<]*\?)<\/h2>/g)];
    expect(qs.length).toBeGreaterThanOrEqual(8);
    expect(qs.every(m => m[1].includes('q-heading'))).toBe(true);
  });
});
