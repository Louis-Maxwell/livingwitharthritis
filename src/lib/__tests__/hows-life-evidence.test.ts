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
  expect(post.editorial_review_note).toContain('Awaiting separate clinical review');
 });
 it('does not make fever a prerequisite for urgent joint assessment', () => {
  expect(post.content).toContain('even without a fever');
  expect(post.content).toContain('not simply an exercise adjustment');
  expect(post.content).not.toContain('if a joint is hot and swollen and you feel feverish');
  expect(post.content).toContain('Northern Ireland');
  expect(post.content).toContain('GP out-of-hours service');
 });
 it('distinguishes OA exercise discomfort from red flags and preserves RA referral scope', () => {
  expect(post.content).toContain('1.3.1 to 1.3.3');
  expect(post.content).toContain('Some discomfort may increase at first');
  expect(post.content).toContain('1.1.1');
  expect(post.content).toContain('normal inflammatory markers');
  expect(post.content).toContain('Tests should not delay referral');
 });
 it('renders the same source content and pending-review status for crawlers', () => {
  const data = headDataFor('/blog/' + post.slug);
  expect(data.answer).toBe(post.direct_answer);
  const html = buildStaticArticleInner(data);
  expect(html).toContain('even without a fever');
  expect(html).toContain('Awaiting separate clinical review');
  expect(html).not.toMatch(/Clinically reviewed by|Written and reviewed by/);
  expect(post.citations.some(c => c.url.includes('/conditions/septic-arthritis/'))).toBe(true);
 });
});
