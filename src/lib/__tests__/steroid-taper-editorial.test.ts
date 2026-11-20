import { describe, it, expect } from 'vitest';
import post from '@/content/blog/posts/expert-qa-are-steroid-tapers-always-necessary.json';
import { blogPostSchema } from '@/lib/blog/schema';

describe('steroid taper editorial boundaries', () => {
  it('preserves publication without inherited clinical board or review attestation', () => {
    expect(blogPostSchema.safeParse(post).success).toBe(true);
    expect(post.slug).toBe('expert-qa-are-steroid-tapers-always-necessary');
    expect(post.date).toBe('2026-06-14');
    expect(post.is_published).toBe(true);
    expect(post.reviewed_by).toBeNull();
    expect(post.reviewer_credentials).toBeNull();
    expect(post).not.toHaveProperty('last_reviewed');
    expect(post.editorial_review_note).toContain('awaiting a separate qualified clinical review');
    expect(post.content).not.toContain('clinical board');
  });
  it('keeps emergency care and urgent joint infection visible', () => {
    expect(post.content).toContain('<h2>First check: when symptoms need urgent help</h2>');
    expect(post.content).toContain('Call 999 for collapse');
    expect(post.content).toContain('then still call 999');
    expect(post.content).toContain('cannot keep steroid medicine down, seek immediate medical help');
    expect(post.content).toContain('Joint infection can occur without fever');
    expect(post.content).toContain('In Northern Ireland');
    expect(post.content).not.toContain('same-week review');
  });
  it('preserves short-course, symptom and testing differences without a self-taper recipe', () => {
    expect(post.content).toContain('a taper is not always needed');
    expect(post.content).toContain('low-certainty evidence, not personal clearance to stop');
    expect(post.content).toContain('repeated courses, recent long-term treatment');
    expect(post.content).toContain('Three problems can overlap');
    expect(post.content).toContain('a slower taper has been tried and symptoms suggest adrenal insufficiency');
    expect(post.content).toContain('Do not skip steroids to arrange a test yourself');
    expect(post.content).toContain('Do not assume the answer is always to double the dose');
    expect(post.content).not.toContain('nmol/L');
    expect(post.content).not.toContain('every other day for 2 weeks');
    expect(post.citations).toHaveLength(10);
    expect(post.cover).toBe('lwa-title-steroid-taper.webp');
    expect(post.key_takeaways).toHaveLength(3);
  });
});
