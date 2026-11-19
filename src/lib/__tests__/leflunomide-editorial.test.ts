import { describe, it, expect } from 'vitest';
import post from '@/content/blog/posts/leflunomide-for-arthritis-blood-tests-side-effects.json';
import { blogPostSchema } from '@/lib/blog/schema';

describe('leflunomide editorial safety boundaries', () => {
  it('preserves publication and route without inherited review attestation', () => {
    expect(blogPostSchema.safeParse(post).success).toBe(true);
    expect(post.slug).toBe('leflunomide-for-arthritis-blood-tests-side-effects');
    expect(post.date).toBe('2026-09-25');
    expect(post.is_published).toBe(true);
    expect(post.reviewed_by).toBeNull();
    expect(post.reviewer_credentials).toBeNull();
    expect(post).not.toHaveProperty('last_reviewed');
    expect(post.editorial_review_note).toContain('awaiting a separate qualified clinical review');
  });
  it('separates emergency symptoms and specific stopping instructions from routine care', () => {
    expect(post.content).toContain('<h2>First check: warning symptoms and urgent help</h2>');
    expect(post.content).toContain('Call 999 for severe breathing difficulty');
    expect(post.content).toContain('blistering or peeling rash needs emergency assessment now');
    expect(post.content).toContain('For a new skin rash or mouth ulcers, stop taking leflunomide');
    expect(post.content).toContain('If you are pregnant or think you may be pregnant, do not take leflunomide');
    expect(post.content).toContain('In Northern Ireland');
    expect(post.content).not.toContain('Do not just stop the tablets');
  });
  it('keeps pregnancy, paternal, persistence and monitoring advice distinct', () => {
    expect(post.content).toContain('published sources disagree');
    expect(post.content).toContain('paternal exposure compatible');
    expect(post.content).toContain('retain contraception and possible washout precautions');
    expect(post.content).toContain('specialist to reconcile');
    expect(post.content).toContain('not a detox supplement');
    expect(post.content).toContain('four to six months');
    expect(post.content).toContain('does not replace your shared-care plan');
    expect(post.content).toContain('does not turn that difference into a personal safe allowance');
    expect(post.citations).toHaveLength(9);
    expect(post.key_takeaways).toHaveLength(3);
    expect(post.cover).toBe('lwa-title-leflunomide-safety.webp');
  });
});
