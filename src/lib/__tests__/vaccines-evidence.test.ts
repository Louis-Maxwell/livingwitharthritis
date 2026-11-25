import { describe, it, expect } from 'vitest';
import post from '@/content/blog/posts/vaccines-on-dmards-and-biologics-uk-guide.json';
import { blogPostSchema } from '@/lib/blog/schema';
import { headDataFor } from '../../../scripts/inject-canonicals.mjs';
import { buildStaticArticleInner } from '../../../scripts/static-article-html.mjs';

describe('vaccines with arthritis medicines evidence and safety', () => {
 it('keeps the article published without claiming fresh clinical approval', () => {
  expect(blogPostSchema.safeParse(post).success).toBe(true);
  expect(post.is_published).toBe(true);
  expect(post.date).toBe('2026-09-25');
  expect(post.reviewed_by).toBeNull();
  expect(post).not.toHaveProperty('last_reviewed');
  expect(post.editorial_review_note).toContain('Awaiting separate clinical review');
 });
 it('distinguishes suitability, programme eligibility and variable immune suppression', () => {
  expect(post.content).toContain('Clinical suitability and eligibility');
  expect(post.content).toContain('Not everyone taking a DMARD automatically qualifies');
  expect(post.content).not.toContain('slightly weaker');
  expect(post.content).not.toContain('slightly less well');
  expect(post.content).toContain('previous serious allergic reaction');
  expect(post.content).toContain('severe or fatal infection');
  expect(post.content).toContain('a blanket ban on every DMARD is not accurate');
 });
 it('covers current England RSV risk groups and UK routes without prescribing medicine holds', () => {
  expect(post.content).toContain('aged 65 to 74 with a weakened immune system');
  expect(post.content).toContain('NHS inform for Scotland');
  expect(post.content).toContain('GP out-of-hours service');
  expect(post.content).toContain('Do not reschedule an infusion yourself');
  expect(post.content).toContain('unless your rheumatology team specifically advises it');
  expect(post.content).not.toContain('If you feel very unwell, call 999');
 });
 it('retains household exceptions rather than discouraging routine vaccination', () => {
  expect(post.content).toContain('rotavirus');
  expect(post.content).toContain('dry and crusted');
  expect(post.content).toContain('very severely immunosuppressed person');
  expect(post.content).toContain('an injected non-live alternative');
 });
 it('uses source content and pending review in actual crawler article generation', () => {
  const data=headDataFor('/blog/'+post.slug);
  expect(data.answer).toBe(post.direct_answer);
  const html=buildStaticArticleInner(data);
  expect(html).toContain('Clinical suitability and eligibility');
  expect(html).toContain('Awaiting separate clinical review');
  expect(html).not.toMatch(/Clinically reviewed by|Written and reviewed by/);
  expect(post.citations.some(c=>c.url.includes('green-book-chapter-7'))).toBe(true);
 });
});
