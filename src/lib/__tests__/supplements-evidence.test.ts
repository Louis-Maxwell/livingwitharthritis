import { describe, expect, it } from 'vitest';
import post from '@/content/blog/posts/best-supplements-arthritis-uk.json';
import { blogPostSchema } from '@/lib/blog/schema';
import { headDataFor } from '../../../scripts/inject-canonicals.mjs';
import { buildStaticArticleInner } from '../../../scripts/static-article-html.mjs';

describe('supplements evidence and safety boundaries', () => {
  it('keeps publication and authorship without inventing clinical sign-off', () => {
    expect(blogPostSchema.safeParse(post).success).toBe(true);
    expect(post.is_published).toBe(true);
    expect(post.date).toBe('2026-03-13');
    expect(post.reviewed_by).toBeNull();
    expect(post.reviewer_credentials).toBeNull();
    expect(post).not.toHaveProperty('last_reviewed');
    expect(post.editorial_review_note).toContain('Awaiting separate clinical review');
  });
  it('distinguishes conditions and the scope of NICE recommendations', () => {
    expect(post.content).toContain('rheumatoid arthritis');
    expect(post.content).toContain('collagen');
    expect(post.direct_answer).toContain('Cochrane');
    expect(post.direct_answer).toContain('little or no difference');
    expect(post.content).toContain('not to offer glucosamine');
    expect(post.content).toContain('should not be presented as a NICE recommendation against every supplement');
    expect(post.content).toContain('little or no evidence for their long-term effectiveness');
    expect(post.content).not.toContain('Choose a supplement with piperine');
  });
  it('removes broad product advice and adds relevant safety caveats', () => {
    expect(post.content).toContain('Rare liver injury');
    expect(post.content).toContain('Do not choose added piperine');
    expect(post.content).toContain('not to every food supplement');
    expect(post.content).toContain('10 micrograms');
    expect(post.content).toContain('throughout the year');
    expect(post.content).not.toMatch(/Holland.*Barrett|Healthspan|£|8.to.12 weeks|1500mg/);
  });
  it('represents collagen findings without claiming full-text appraisal or cartilage repair', () => {
    expect(post.content).toContain('35 randomised trials');
    expect(post.content).toContain('moderate-certainty evidence for pain');
    expect(post.content).toContain('limited to the published abstract');
    expect(post.content).toContain('does not prove');
    expect(post.content).toContain('regrow cartilage');
  });
  it('does not require fever and separates emergency pathways', () => {
    expect(post.content).toContain('Joint infection can occur without a fever');
    expect(post.content).toContain('Call 999 for severe breathing difficulty');
    expect(post.content).toContain('urgent GP appointment or NHS 111');
  });
  it('carries current answers, sources and review status into actual static output', () => {
    const data = headDataFor('/blog/' + post.slug);
    const html = buildStaticArticleInner(data);
    expect(data.answer).toBe(post.direct_answer);
    expect(html).toContain('Rare liver injury');
    expect(html).toContain('Do not choose added piperine');
    expect(html).toContain('Awaiting separate clinical review');
    expect(html).not.toMatch(/Written and reviewed by|Clinically reviewed by|most research behind them/);
    expect(post.citations).toHaveLength(17);
  });
});
