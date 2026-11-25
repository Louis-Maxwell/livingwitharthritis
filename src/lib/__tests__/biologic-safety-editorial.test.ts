import { describe, it, expect } from 'vitest';
import post from '@/content/blog/posts/biologic-side-effects-infections-injections-and-monitoring.json';
import { blogPostSchema } from '@/lib/blog/schema';
describe('Biologic safety editorial boundaries', () => {
  it('preserves route and publication with honest review status', () => {
    expect(blogPostSchema.safeParse(post).success).toBe(true);
    expect(post.slug).toBe('biologic-side-effects-infections-injections-and-monitoring');
    expect(post.date).toBe('2026-06-15');
    expect(post.is_published).toBe(true);
    expect(post.reviewed_by).toBeNull();
    expect(post.reviewer_credentials).toBeNull();
    expect(post).not.toHaveProperty('last_reviewed');
    expect(post.editorial_review_note).toContain('awaiting a separate qualified clinical review');
    expect(post.cover).toBe('lwa-title-biologic-safety.webp');
  });
  it('puts emergency and urgent routes before general advice', () => {
    expect(post.content.indexOf('Call 999')).toBeLessThan(post.content.indexOf('Who this article is for'));
    expect(post.content).toContain('even without fever');
    expect(post.content).toContain('GP out-of-hours service');
    expect(post.content).toContain('Sudden face droop');
    expect(post.content).not.toContain('same-week');
    expect(post.content).not.toContain('pick one change');
  });
  it('avoids universal infection restart rules and keeps drug-specific cautions', () => {
    expect(post.content).toContain('no universal cold, antibiotic or restart rule');
    expect(post.content).toContain('does not by itself rule out infection');
    expect(post.content).toContain('progressive multifocal leukoencephalopathy');
    expect(post.content).toContain('Staff decide whether to slow or stop');
    expect(post.content).toContain('not biologics');
    expect(post.content).toContain('not a prediction');
    expect(post.citations).toHaveLength(12);
  });
});
