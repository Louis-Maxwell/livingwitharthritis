import { describe,it,expect } from 'vitest';
import post from '@/content/blog/posts/inflammatory-arthritis-guide.json';
import { blogPostSchema } from '@/lib/blog/schema';
import { headDataFor } from '../../../scripts/inject-canonicals.mjs';
import { buildStaticArticleInner } from '../../../scripts/static-article-html.mjs';
describe('inflammatory arthritis evidence scope',()=>{
 it('preserves publication without extending old clinical review',()=>{
  expect(blogPostSchema.safeParse(post).success).toBe(true);
  expect(post.is_published).toBe(true);expect(post.date).toBe('2026-07-28');
  expect(post.reviewed_by).toBeNull();expect(post).not.toHaveProperty('last_reviewed');
  expect(post.editorial_review_note).toContain('Awaiting separate clinical review');
 });
 it('avoids wear-only OA and uniform prognosis or treatment claims',()=>{
  expect(post.content).toContain('not simply inevitable wear');
  expect(post.content).toContain('PMR) is a related inflammatory condition');
  expect(post.content).toContain('not a general treatment for spinal symptoms');
  expect(post.content).toContain('NSAIDs can reduce pain <strong>and inflammation');
  expect(post.content).toContain('reactive arthritis may resolve');
  expect(post.content).not.toContain('within months, not years');
 });
 it('preserves referral despite normal tests and same-day eye assessment',()=>{
  expect(post.content).toContain('Investigations should not delay referral');
  expect(post.content).toContain('three-month criterion is not an instruction to wait');
  expect(post.content).toContain('negative HLA-B27 or normal CRP and ESR');
  expect(post.content).toContain('immediate same-day ophthalmological assessment');
  expect(post.content).toContain('even without a fever');
  expect(post.content).toContain('GP out-of-hours service');
  expect(post.content).toContain('giant cell arteritis');
 });
 it('renders source content and pending-review notice in crawler HTML',()=>{
  const data=headDataFor('/blog/'+post.slug);expect(data.answer).toBe(post.direct_answer);
  const html=buildStaticArticleInner(data);
  expect(html).toContain('Investigations should not delay referral');
  expect(html).toContain('Awaiting separate clinical review');
  expect(html).not.toMatch(/Clinically reviewed by|Written and reviewed by/);
 });
});
