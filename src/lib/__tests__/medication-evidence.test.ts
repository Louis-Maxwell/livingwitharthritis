import {describe,it,expect} from 'vitest';
import post from '@/content/blog/posts/arthritis-medication-guide.json';
import {blogPostSchema} from '@/lib/blog/schema';
import {headDataFor} from '../../../scripts/inject-canonicals.mjs';
import {buildStaticArticleInner} from '../../../scripts/static-article-html.mjs';
describe('medication evidence scope',()=>{
 it('preserves publication and does not invent clinical review',()=>{
  expect(blogPostSchema.safeParse(post).success).toBe(true);
  expect(post.is_published).toBe(true);expect(post.date).toBe('2026-06-16');
  expect(post.reviewed_by).toBeNull();expect(post).not.toHaveProperty('last_reviewed');
  expect(post.editorial_review_note).toContain('Awaiting separate clinical review');
 });
 it('separates OA analgesia from disease modification',()=>{
  expect(post.content).toContain('no strong evidence of benefit');
  expect(post.content).toContain('do not offer strong opioids for osteoarthritis');
  expect(post.content).toContain('offer a topical NSAID');
  expect(post.content).toContain('PPI does not remove all NSAID risks');
  expect(post.content).toContain('not a treatment for osteoarthritis');
  expect(post.content).toContain('moderate RA (DAS28 3.2 to 5.1)');
  expect(post.content).toContain('JAK inhibitors');
 });
 it('corrects timing, monitoring and UK costs',()=>{
  expect(post.content).toContain('once a week, not every day');
  expect(post.content).toContain('Monitoring varies');
  expect(post.content).toContain('2 to 10 weeks');
  expect(post.content).toContain('no universal allowance');
  expect(post.content).toContain('£32.05');expect(post.content).toContain('£114.50');
  expect(post.content).toContain('cross-border');
  expect(post.content).not.toContain('two-hour rule');
 });
 it('renders dose-error, joint and emergency safety in crawler HTML',()=>{
  const data=headDataFor('/blog/'+post.slug);expect(data.answer).toBe(post.direct_answer);
  const html=buildStaticArticleInner(data);
  expect(html).toContain('even without a fever');
  expect(html).toContain('including taking weekly methotrexate daily by mistake');
  expect(html).toContain('GP out-of-hours service');
  expect(html).toContain('Call 999');
  expect(html).toContain('Awaiting separate clinical review');
  expect(html).not.toMatch(/Clinically reviewed by|Written and reviewed by/);
 });
});
