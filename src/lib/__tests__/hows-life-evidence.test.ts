import { describe, it, expect } from 'vitest';
import post from '@/content/blog/posts/arthritis-hows-life-living-with-arthritis.json';
import { blogPostSchema } from '@/lib/blog/schema';
import { headDataFor } from '../../../scripts/inject-canonicals.mjs';
import { buildStaticArticleInner } from '../../../scripts/static-article-html.mjs';

describe('living with arthritis daily-life safety', () => {
 it('preserves publication without extending inherited clinical sign-off', () => {
  expect(blogPostSchema.safeParse(post).success).toBe(true);
  expect(post.is_published).toBe(true);
  expect(post.date).toBe('2026-10-15');
  expect(post.reviewed_by).toBeNull();
  expect(post).not.toHaveProperty('last_reviewed');
  expect(post.editorial_review_note).toContain('not independent clinical review');
 });
 it('does not make fever a prerequisite for urgent joint assessment', () => {
  expect(post.content).toContain('even without a fever');
  expect(post.content).toContain('urgent assessment rather than an exercise adjustment');
  expect(post.content).not.toContain('if a joint is hot and swollen and you feel feverish');
  expect(post.content).toContain('Northern Ireland');
  expect(post.content).toContain('GP out-of-hours service');
 });
 it('distinguishes OA exercise discomfort from red flags and preserves RA referral scope', () => {
  expect(post.content).toContain('For osteoarthritis, NICE recommends exercise tailored to your needs');
  expect(post.content).toContain('Pain can increase when you first start');
  expect(post.content).toContain('suspected persistent synovitis of unknown cause');
  expect(post.content).toContain('Normal blood tests or negative rheumatoid factor or anti-CCP tests');
  expect(post.content).toContain('Tests should not delay it');
  expect(post.content).toContain('small joints of the hands or feet or more than one joint');
  expect(post.content).toContain('three months or longer');
 });
 it('renders the same source content and honest review status for crawlers', () => {
  const data = headDataFor('/blog/' + post.slug);
  expect(data.answer).toBe(post.direct_answer);
  const html = buildStaticArticleInner(data);
  expect(html).toContain('even without a fever');
  expect(html).toContain('not independent clinical review');
  expect(html).not.toMatch(/Clinically reviewed by|Written and reviewed by/);
  expect(post.citations.some(c => c.url.includes('/conditions/septic-arthritis/'))).toBe(true);
 });
});
