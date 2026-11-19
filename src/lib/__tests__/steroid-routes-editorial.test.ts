import { describe, it, expect } from 'vitest';
import post from '@/content/blog/posts/steroid-injections-vs-oral-steroids-when-each-makes-sense.json';
import { blogPostSchema } from '@/lib/blog/schema';

describe('steroid route comparison editorial boundaries', () => {
  it('preserves route and publication without inherited clinical attestation', () => {
    expect(blogPostSchema.safeParse(post).success).toBe(true);
    expect(post.slug).toBe('steroid-injections-vs-oral-steroids-when-each-makes-sense');
    expect(post.date).toBe('2026-06-13');
    expect(post.is_published).toBe(true);
    expect(post.reviewed_by).toBeNull();
    expect(post.reviewer_credentials).toBeNull();
    expect(post).not.toHaveProperty('last_reviewed');
    expect(post.editorial_review_note).toContain('awaiting a separate qualified clinical review');
  });
  it('keeps urgent joint infection and emergency triage visible and distinct', () => {
    expect(post.content).toContain('<h2>First check: urgent symptoms are not a routine flare</h2>');
    expect(post.content).toContain('Contact an urgent GP service or NHS 111 now');
    expect(post.content).toContain('Fever is not always present');
    expect(post.content).toContain('Do not wait a week');
    expect(post.content).toContain('Call 999 for a serious allergic reaction');
    expect(post.content).toContain('In Northern Ireland');
    expect(post.content).not.toContain('same-week review');
    expect(post.content).toContain('need hospital treatment');
  });
  it('separates routes, diagnoses and personal treatment decisions', () => {
    expect(post.content).toContain('an intramuscular steroid injection can have a wider, whole-body effect');
    expect(post.content).toContain('2 to 10 weeks');
    expect(post.content).toContain('NICE allows continuation in established rheumatoid arthritis only after');
    expect(post.content).toContain('Not every short course needs a taper');
    expect(post.content).toContain('Do not stop anticoagulants');
    expect(post.content).toContain('not interchangeable instructions for every injection');
    expect(post.content).not.toContain('clinical board');
    expect(post.content).not.toContain('Supplements versus meals');
    expect(post.citations).toHaveLength(14);
    expect(post.key_takeaways).toHaveLength(3);
    expect(post.cover).toBe('lwa-title-steroid-routes.webp');
  });
});
