import { describe, it, expect } from 'vitest';
import post from '@/content/blog/posts/jak-inhibitors-the-next-wave-of-ra-treatment.json';
import { blogPostSchema } from '@/lib/blog/schema';

describe('JAK inhibitor editorial boundaries', () => {
  it('preserves route, publication and honest review status', () => {
    expect(blogPostSchema.safeParse(post).success).toBe(true);
    expect(post.slug).toBe('jak-inhibitors-the-next-wave-of-ra-treatment');
    expect(post.date).toBe('2026-06-19');
    expect(post.is_published).toBe(true);
    expect(post.reviewed_by).toBeNull();
    expect(post.reviewer_credentials).toBeNull();
    expect(post).not.toHaveProperty('last_reviewed');
    expect(post.editorial_review_note).toContain('awaiting a separate qualified clinical review');
    expect(post.cover).toBe('lwa-title-jak-inhibitors.webp');
  });
  it('puts emergency, clot and infection action before treatment information', () => {
    expect(post.content.indexOf('Call 999')).toBeLessThan(post.content.indexOf('What JAK inhibitors do'));
    expect(post.content).toContain('possible blood clot');
    expect(post.content).toContain('even without fever');
    expect(post.content).toContain('GP out-of-hours service');
    expect(post.content).not.toContain('same-week review');
  });
  it('retains regulatory, evidence and drug-specific limits', () => {
    expect(post.content).toContain('only if no suitable alternatives');
    expect(post.content).toContain('aged 65 or over');
    expect(post.content).toContain('smoked for a long time in the past');
    expect(post.content).toContain('at least 50');
    expect(post.content).toContain('not a trial of every JAK inhibitor');
    expect(post.content).toContain('Not everyone must try a biologic first');
    expect(post.content).toContain('not an instruction to wait six months');
    expect(post.content).toContain('not a universal schedule');
    expect(post.content).toContain('Do not use a class-wide washout rule');
    expect(post.content).toContain('severely immunosuppressed adults from age 18');
    expect(post.citations).toHaveLength(13);
  });
});
