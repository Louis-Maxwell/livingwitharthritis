import { describe, expect, it } from 'vitest';
import turmeric from '@/content/blog/posts/turmeric-for-arthritis.json';
import uk from '@/content/blog/posts/best-supplements-arthritis-uk.json';
import joint from '@/content/blog/posts/best-supplements-joint-pain.json';
import { blogPostSchema } from '@/lib/blog/schema';
import { headDataFor } from '../../../scripts/inject-canonicals.mjs';
import { buildStaticArticleInner } from '../../../scripts/static-article-html.mjs';

const cochrane = 'https://www.cochrane.org/evidence/CD014683_what-are-benefits-and-risks-turmeric-curcuma-longa-supplements-people-osteoarthritis';
describe('current turmeric evidence', () => {
  for (const post of [turmeric, uk, joint]) {
    it(`carries the November Cochrane finding without clinical sign-off: ${post.slug}`, () => {
      expect(blogPostSchema.safeParse(post).success).toBe(true);
      expect(post.is_published).toBe(true);
      expect(post.reviewed_by).toBeNull();
      expect(post).not.toHaveProperty('last_reviewed');
      expect(post.content).toContain('little or no');
      expect(post.content).toContain('low-certainty');
      expect(post.citations.some(c => c.url === cochrane)).toBe(true);
      const data = headDataFor('/blog/' + post.slug);
      expect(data.answer).toBe(post.direct_answer);
      const html = buildStaticArticleInner(data);
      expect(html).toContain('little or no');
      expect(html).toContain('Awaiting separate clinical review');
      expect(html).not.toContain('Written and reviewed by');
    });
  }
  it('limits the new review to knee OA and describes uncertainty', () => {
    expect(turmeric.content).toContain('all with knee osteoarthritis');
    expect(turmeric.content).toContain('0.72 points');
    expect(turmeric.content).toContain('very uncertain about adverse events');
    expect(turmeric.content).toContain('trustworthiness');
    expect(turmeric.content).toContain('1.8.8 to 1.8.10');
  });
  it('does not turn dose, absorption or timing into a recommendation', () => {
    expect(turmeric.content).toContain('No universal dose or trial period');
    expect(turmeric.content).toContain('no tested safe spacing rule');
    expect(turmeric.content).toContain('Do not choose an enhanced-absorption product');
    expect(turmeric.content).toContain('even without a fever');
    expect(turmeric.content).toContain('GP out-of-hours service');
    expect(turmeric.content).not.toContain('Give a single product several weeks');
    expect(turmeric.citations).toHaveLength(21);
    expect(turmeric.date).toBe('2026-03-08');
  });
});
