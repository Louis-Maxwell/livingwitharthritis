import { describe, it, expect } from 'vitest';
import post from '@/content/blog/posts/sulfasalazine-for-arthritis-what-to-expect.json';
import { blogPostSchema } from '@/lib/blog/schema';

describe('sulfasalazine starting-treatment editorial boundaries', () => {
  it('preserves route and publication without inherited review attestation', () => {
    expect(blogPostSchema.safeParse(post).success).toBe(true);
    expect(post.slug).toBe('sulfasalazine-for-arthritis-what-to-expect');
    expect(post.date).toBe('2026-09-25');
    expect(post.is_published).toBe(true);
    expect(post.reviewed_by).toBeNull();
    expect(post.reviewer_credentials).toBeNull();
    expect(post).not.toHaveProperty('last_reviewed');
    expect(post.editorial_review_note).toContain('awaiting a separate qualified clinical review');
  });
  it('keeps urgent rash, chest pain and infection guidance in the actual article body', () => {
    expect(post.content).toContain('<h2>First check: symptoms that must not wait</h2>');
    expect(post.content).toContain('Go to A&amp;E now for a severe rash with flushing, blisters or ulcers.');
    expect(post.content).toContain('stop taking sulfasalazine straight away');
    expect(post.content).toContain('Call 999 for chest pain');
    expect(post.content).toContain('serum sickness');
    expect(post.content).toContain('before the next dose');
    expect(post.content).toContain('In Northern Ireland');
    expect(post.content).not.toContain('If you feel very unwell, call 999');
  });
  it('uses individual monitoring, prescribing and family-planning boundaries', () => {
    expect(post.content).toContain('Published schedules differ.');
    expect(post.content).toContain('assume monitoring ends after a year');
    expect(post.content).toContain('does not provide a tablet-by-tablet schedule');
    expect(post.content).toContain('Never double up');
    expect(post.content).toContain('not a complete interaction check');
    expect(post.content).toContain('high-dose folic acid can be prescribed');
    expect(post.content).toContain('men do not routinely have to stop');
    expect(post.citations).toHaveLength(10);
    expect(post.key_takeaways).toHaveLength(3);
    expect(post.cover).toBe('lwa-title-starting-sulfasalazine.webp');
  });
});
