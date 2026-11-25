import {describe,it,expect} from 'vitest';
import post from '@/content/blog/posts/activity-diary-arthritis-frailty-uk.json';
import {splitHtmlAfterFirstSection,splitHtmlAtMiddleH2} from '../splitHtmlAtMiddleH2';
import {headDataFor,rewriteHead} from '../../../scripts/inject-canonicals.mjs';
describe('activity diary NICE scope and safe pacing',()=>{
 it('uses individual pacing, not fixed weekly increases or diagnostic diaries',()=>{
  expect(post.content).toContain('There is no automatic weekly increase');
  expect(post.content).toContain('not a validated minimum');
  expect(post.content).toContain('not a frailty or falls assessment');
  expect(post.content).toContain('chronic primary pain, not automatically every arthritis diagnosis');
  expect(post.content).toContain('RCOT is a professional body, not the NHS');
  expect(post.content).toContain('NICE NG206, recommendations 1.11.13 and 1.11.14');
  expect(post.content).not.toContain('by a small amount each week');
 });
 it('retains delirium emergency advice and removes fever gate',()=>{
  expect(post.content).toContain('Call 999 or go to A&amp;E if someone suddenly becomes confused');
  expect(post.content).toContain('fever is not always present');
  expect(post.content).toContain('cannot get up');
  expect(post.content).not.toContain('a hot, swollen joint with fever');
  expect(post.reviewed_by).toBeNull();
  expect(post.editorial_review_note).toContain('not yet had a fresh clinical review');
 });
 it('retains mid-article boundaries and final injected source-checked content',()=>{
  const split=splitHtmlAfterFirstSection(post.content);
  expect(split.second).not.toBe('');
  expect(splitHtmlAtMiddleH2(split.second).second).not.toBe('');
  const route='/blog/activity-diary-arthritis-frailty-uk';
  expect((headDataFor(route).article as {content:string}).content).toBe(post.content);
  const html=rewriteHead('<html><head></head><body><div id="root"></div></body></html>',route);
  expect(html).toContain('There is no automatic weekly increase');
  expect(html).not.toContain('"reviewedBy"');
 });
});
