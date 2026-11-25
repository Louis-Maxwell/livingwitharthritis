import {describe,it,expect} from 'vitest';
import post from '@/content/blog/posts/assistive-devices-arthritis-uk.json';
import {headDataFor,rewriteHead} from '../../../scripts/inject-canonicals.mjs';
describe('assistive devices evidence and access',()=>{
 it('states the NICE population and avoids unsupported product promises',()=>{
  expect(post.content).toContain('recommendation 1.3.10');
  expect(post.content).toContain('recommendation 1.8.2');
  expect(post.content).toContain('lower-limb osteoarthritis');
  expect(post.content).toContain('not always a four-wheeled rollator');
  expect(post.content).not.toMatch(/25%|from £|next-day delivery<|NRS Healthcare/);
  expect(post.content).toContain('does not quote current product prices');
 });
 it('distinguishes assessment, funding and clinical review',()=>{
  expect(post.content).toContain('£30,000 in England, £36,000 in Wales and £25,000 in Northern Ireland');
  expect(post.content).toContain('Scotland has a different');
  expect(post.content).toContain('generally paid service');
  expect(post.content).toContain('starting before approval may mean no grant');
  expect(post.reviewed_by).toBeNull();
  expect(post.editorial_review_note).toContain('not yet had a fresh clinical review');
  expect(post.content).toContain('Go to A&amp;E or call 999');
 });
 it('preserves the corrected article in final static output',()=>{
  const route='/blog/assistive-devices-arthritis-uk';
  const data=headDataFor(route);
  expect((data.article as {content:string}).content).toBe(post.content);
  const html=rewriteHead('<html><head><title>Home</title></head><body><div id="root"></div></body></html>',route);
  expect(html).toContain('Major home adaptations and grants');
  expect(html).not.toContain('"reviewedBy"');
 });
});
