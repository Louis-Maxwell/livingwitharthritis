import { describe, it, expect } from 'vitest';
import heat from '@/content/blog/posts/heatwave-arthritis-frailty-hydration-uk.json';
import delirium from '@/content/blog/posts/delirium-hospital-arthritis-frailty-uk.json';
import { blogPostSchema } from '@/lib/blog/schema';

describe('NHS-source emergency routing corrections', () => {
  it('routes persistent heat illness after 30 minutes of cooling to 999, not 111', () => {
    expect(heat.content).toContain('Call 999</strong> if still unwell after 30 minutes');
    expect(heat.content).not.toContain('Call NHS 111</strong> if heat exhaustion symptoms do not improve');
    expect(heat.content).toContain('Do not wait for every sign');
    expect(heat.citations.some(c => c.url === 'https://www.nhs.uk/conditions/heat-exhaustion-heatstroke/')).toBe(true);
  });
  it('routes sudden confusion at home to immediate assessment and retains ward-staff advice', () => {
    expect(delirium.content).toContain('Call 999 or go to A&amp;E</strong> if someone at home suddenly becomes confused');
    expect(delirium.content).toContain('Tell ward staff straight away');
    expect(delirium.content).not.toContain('Get urgent help from NHS 111 or a GP');
    expect(delirium.citations.some(c => c.url === 'https://www.nhs.uk/conditions/confusion/')).toBe(true);
  });
  for (const post of [heat, delirium]) {
    it(`preserves ${post.slug} while disclosing the limited editorial correction`, () => {
      expect(blogPostSchema.safeParse(post).success).toBe(true);
      expect(post.is_published).toBe(true);
      expect(post.reviewed_by).toBeNull();
      expect(post).not.toHaveProperty('last_reviewed');
      expect(post.editorial_review_note).toContain('limited correction');
      expect(post.editorial_review_note).toContain('awaiting a separate qualified clinical review');
    });
  }
});
