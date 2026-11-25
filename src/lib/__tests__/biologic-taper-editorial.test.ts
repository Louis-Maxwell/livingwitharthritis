import { describe, it, expect } from 'vitest';
import post from '@/content/blog/posts/tapering-biologics-what-the-latest-trials-show.json';
import { blogPostSchema } from '@/lib/blog/schema';

describe('Biologic taper editorial boundaries', () => {
  it('preserves route and publication without inheriting clinical review', () => {
    expect(blogPostSchema.safeParse(post).success).toBe(true);
    expect(post.slug).toBe('tapering-biologics-what-the-latest-trials-show');
    expect(post.date).toBe('2026-06-16');
    expect(post.is_published).toBe(true);
    expect(post.reviewed_by).toBeNull();
    expect(post.reviewer_credentials).toBeNull();
    expect(post).not.toHaveProperty('last_reviewed');
    expect(post.editorial_review_note).toContain('awaiting a separate qualified clinical review');
    expect(post.cover).toBe('lwa-title-biologic-taper.webp');
  });
  it('keeps urgent infection routing ahead of taper information', () => {
    expect(post.content.indexOf('Call 999')).toBeLessThan(post.content.indexOf('Who this article is for'));
    expect(post.content).toContain('even without fever');
    expect(post.content).toContain('GP out-of-hours service');
    expect(post.content).not.toContain('same-week review');
  });
  it('keeps withdrawal, trial endpoints and guidance differences explicit', () => {
    expect(post.content).toContain('continuing DMARDs');
    expect(post.content).toContain('not worded identically');
    expect(post.content).toContain('not two independent trials');
    expect(post.content).toContain('per-protocol');
    expect(post.content).toContain('major flares lasting more than three months');
    expect(post.content).toContain('73% versus 27%');
    expect(post.content).toContain('predates the newer ARCTIC REWIND');
    expect(post.content).toContain('not your predicted chance');
    expect(post.content).toContain('Do not copy an injection interval');
    expect(post.citations).toHaveLength(10);
  });
});
