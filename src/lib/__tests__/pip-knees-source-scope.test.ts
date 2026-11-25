import {describe,it,expect} from 'vitest';
import post from '@/content/blog/posts/pip-osteoarthritis-both-knees.json';
import {splitHtmlAfterFirstSection,splitHtmlAtMiddleH2} from '../splitHtmlAtMiddleH2';
import {headDataFor,rewriteHead} from '../../../scripts/inject-canonicals.mjs';
describe('knee osteoarthritis PIP source scope',()=>{
 it('keeps benefit entitlement separate from clinical guidance',()=>{
  expect(post.content).toContain('not PIP entitlement rules');
  expect(post.content).toContain('NICE NG226, recommendations 1.1.2 and 1.2.2');
  expect(post.content).toContain('does not automatically qualify you for PIP');
  expect(post.content).toContain('Avoid unsafe walking tests');
  expect(post.content).toContain('Adult Disability Payment');
  expect(post.content).toContain('own PIP claim service');
  expect(post.content).toContain('payments could be reduced or stopped');
  expect(post.reviewed_by).toBeNull();
 });
 it('does not suppress mid-article modules or invent fresh sign-off',()=>{
  const split=splitHtmlAfterFirstSection(post.content);
  expect(split.second).not.toBe('');
  expect(splitHtmlAtMiddleH2(split.second).second).not.toBe('');
  expect(post.editorial_review_note).toContain('not yet had a fresh clinical review');
  const route='/blog/pip-osteoarthritis-both-knees';
  expect((headDataFor(route).article as {content:string}).content).toBe(post.content);
  const html=rewriteHead('<html><head></head><body><div id="root"></div></body></html>',route);
  expect(html).toContain('not PIP entitlement rules');
  expect(html).not.toContain('"reviewedBy"');
 });
});
