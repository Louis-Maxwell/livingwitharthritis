import { describe, it, expect } from 'vitest';
import post from '@/content/blog/posts/anti-inflammatory-diet.json';
import { blogPostSchema } from '@/lib/blog/schema';
import { headDataFor } from '../../../scripts/inject-canonicals.mjs';
import { buildStaticArticleInner } from '../../../scripts/static-article-html.mjs';

describe('anti-inflammatory diet evidence and safety', () => {
 it('preserves publication and distinguishes editorial checks from clinical sign-off', () => {
  expect(blogPostSchema.safeParse(post).success).toBe(true);
  expect(post.is_published).toBe(true);
  expect(post.date).toBe('2026-06-16');
  expect(post.reviewed_by).toBeNull();
  expect(post).not.toHaveProperty('last_reviewed');
  expect(post.editorial_review_note).toContain('Awaiting separate clinical review');
  expect(post.content).not.toContain('Clinically reviewed by');
 });
 it('keeps NICE scope and current uncertainty', () => {
  expect(post.content).toContain('1.8.8');
  expect(post.content).toContain('1.3.5');
  expect(post.content).toContain('no strong evidence');
  expect(post.content).toContain('not the latest research');
  expect(post.content).toContain('2025 systematic review');
  expect(post.content).toContain('November 2026');
  expect(post.content).toContain('cannot automatically be transferred');
 });
 it('corrects NHS fish and Eatwell scope without prescribing restrictive diets', () => {
  expect(post.direct_answer).toContain('two fish portions weekly, including one oily');
  expect(post.content).not.toContain('oily fish twice a week');
  expect(post.content).toContain('Fresh and canned tuna do not count as oily fish');
  expect(post.content).toContain('day or even a week');
  expect(post.content).toContain('do not need to reproduce its proportions at every meal');
  expect(post.content).toContain('Do not routinely remove dairy, gluten or nightshade');
 });
 it('retains current supplement limits and region-specific urgent routes', () => {
  expect(post.content).toContain('low-certainty evidence of little or no improvement');
  expect(post.content).toContain('consistent intake');
  expect(post.content).toContain('even without a fever');
  expect(post.content).toContain('Northern Ireland');
  expect(post.content).toContain('GP out-of-hours service');
  expect(post.content).not.toContain('If you feel very unwell, call 999');
 });
 it('carries the same source content and review notice into static output', () => {
  const data = headDataFor('/blog/' + post.slug);
  expect(data.answer).toBe(post.direct_answer);
  const html = buildStaticArticleInner(data);
  expect(html).toContain('Awaiting separate clinical review');
  expect(html).toContain('Fresh and canned tuna');
  expect(html).not.toContain('Clinically reviewed by');
  expect(post.citations.length).toBeGreaterThanOrEqual(15);
 });
});
