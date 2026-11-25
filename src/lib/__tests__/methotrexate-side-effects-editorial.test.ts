import { describe, it, expect } from 'vitest';
import post from '@/content/blog/posts/managing-methotrexate-side-effects-practical-tips.json';
import { blogPostSchema } from '@/lib/blog/schema';

describe('methotrexate side-effect editorial boundaries', () => {
  it('retains existing publication and route, not inherited review', () => {
    expect(blogPostSchema.safeParse(post).success).toBe(true);
    expect(post.date).toBe('2026-06-15');
    expect(post.slug).toBe('managing-methotrexate-side-effects-practical-tips');
    expect(post.is_published).toBe(true);
    expect(post.reviewed_by).toBeNull();
    expect(post.reviewer_credentials).toBeNull();
    expect(post).not.toHaveProperty('last_reviewed');
    expect(post.editorial_review_note).toContain('awaiting a separate qualified clinical review');
  });
  it('separates mild effects from emergency, overdose and next-dose advice', () => {
    expect(post.content).toContain('Call 999 for severe breathing difficulty');
    expect(post.content).toContain('Do not wait for symptoms');
    expect(post.content).toContain('what to do about your next methotrexate dose');
    expect(post.content).toContain('once a week on the agreed day');
    expect(post.content).not.toContain('Never stop methotrexate suddenly');
    expect(post.content).toContain('go straight to an emergency department');
  });
  it('states folate evidence limits and does not encourage self-adjustment', () => {
    expect(post.content).toContain('six trials with 624 adults');
    expect(post.content).toContain('not statistically significant');
    expect(post.content).toContain('not enough information');
    expect(post.content).toContain('not a complete interaction check');
    expect(post.content).toContain('do not stop an existing prescription');
    expect(post.content).toContain('not a personal safe allowance');
    expect(post.citations.length).toBe(12);
    expect(post.key_takeaways).toHaveLength(3);
    expect(post.content).toContain('<h2>First check: mild symptoms and urgent warning signs</h2>');
    expect(post.cover).toBe('lwa-title-methotrexate-side-effects.webp');
  });
});
