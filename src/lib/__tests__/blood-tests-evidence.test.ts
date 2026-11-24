import { describe, expect, it } from 'vitest';
import post from '@/content/blog/posts/arthritis-blood-tests-explained-uk.json';
import { blogPostSchema } from '@/lib/blog/schema';
import { headDataFor } from '../../../scripts/inject-canonicals.mjs';
import { buildStaticArticleInner } from '../../../scripts/static-article-html.mjs';

describe('blood test evidence and safety boundaries', () => {
  it('keeps the published article with honest pending review status', () => {
    expect(blogPostSchema.safeParse(post).success).toBe(true);
    expect(post.is_published).toBe(true);
    expect(post.date).toBe('2026-10-10');
    expect(post.reviewed_by).toBeNull();
    expect(post.reviewer_credentials).toBeNull();
    expect(post).not.toHaveProperty('last_reviewed');
    expect(post.editorial_review_note).toContain('Awaiting separate clinical review');
  });
  it('maps urgent referral to the NG100 criteria, not all swollen joints', () => {
    expect(post.content).toContain('small joints of the hands or feet are affected');
    expect(post.content).toContain('more than one joint is affected');
    expect(post.content).toContain('3 months or more');
    expect(post.content).toContain('negative RF or negative anti-CCP');
    expect(post.content).not.toContain('urgent referral is still needed for suspected persistent synovitis even');
  });
  it('qualifies the lower urate target and keeps dose changes with the prescriber', () => {
    expect(post.content).toContain('tophi or chronic gouty arthritis');
    expect(post.content).toContain('despite a urate level already below 360');
    expect(post.content).toContain('do not adjust treatment from a result yourself');
  });
  it('routes overdue monitoring to prompt medicine-specific advice', () => {
    expect(post.content).not.toContain('Never carry on taking');
    expect(post.content).toContain('ask what to do about your next dose');
    expect(post.content).toContain('Do not wait until several tests');
    expect(post.content).toContain('A single concerning result can need prompt action');
    expect(post.content).toContain('Joint infection can occur without a fever');
  });
  it('carries the same corrections, sources and pending note into static output', () => {
    const data = headDataFor('/blog/' + post.slug);
    const html = buildStaticArticleInner(data);
    expect(data.answer).toBe(post.direct_answer);
    expect(html).toContain('ask what to do about your next dose');
    expect(html).toContain('tophi or chronic gouty arthritis');
    expect(html).toContain('Awaiting separate clinical review');
    expect(html).not.toMatch(/Written and reviewed by|Clinically reviewed by|Checked on 10 October|2026-10-23/);
    expect(post.citations).toHaveLength(19);
  });
});
