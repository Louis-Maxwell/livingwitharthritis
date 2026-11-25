import {describe,it,expect} from 'vitest';
import post from '@/content/blog/posts/paracetamol-for-arthritis-pain-what-the-evidence-says.json';
import {blogPostSchema} from '@/lib/blog/schema';
import {headDataFor} from '../../../scripts/inject-canonicals.mjs';
import {buildStaticArticleInner} from '../../../scripts/static-article-html.mjs';
describe('paracetamol evidence and UK safety',()=>{
 it('preserves published evidence without inventing clinical approval',()=>{
  expect(blogPostSchema.safeParse(post).success).toBe(true);expect(post.is_published).toBe(true);
  expect(post.date).toBe('2026-06-14');expect(post.reviewed_by).toBeNull();
  expect(post.editorial_review_note).toContain('Awaiting separate clinical review');
 });
 it('preserves trial scope and NICE exception',()=>{
  expect(post.content).toContain('10 trials with 3,541');
  expect(post.content).toContain('about 3 points on a 100-point scale');
  expect(post.content).toContain('October 2017');expect(post.content).toContain('both');
  expect(post.content).toContain('not a target or a personalised prescription');
  expect(post.content).toContain('proton pump inhibitor (PPI)');
 });
 it('keeps strength, duplication and UK urgent routes',()=>{
  expect(post.content).toContain('1 g tablet');expect(post.content).toContain('less than 50 kg');
  expect(post.content).toContain('Co-codamol contains paracetamol');
  expect(post.content).toContain('GP out-of-hours service');expect(post.content).toContain('Call 999');
  expect(post.content).toContain('not everyone has a fever');
 });
 it('injects source safety and pending-review copy into crawler HTML',()=>{
  const data=headDataFor('/blog/'+post.slug);expect(data.answer).toBe(post.direct_answer);
  const html=buildStaticArticleInner(data);expect(html).toContain('GP out-of-hours service');
  expect(html).toContain('Awaiting separate clinical review');expect(html).toContain('proton pump inhibitor (PPI)');
  expect(html).not.toMatch(/Clinically reviewed by|Written and reviewed by/);
 });
});
