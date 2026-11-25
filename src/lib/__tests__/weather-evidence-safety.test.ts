import {describe,it,expect} from 'vitest';
import post from '@/content/blog/posts/weather-and-arthritis-pain-explained.json';
import {splitHtmlAfterFirstSection,splitHtmlAtMiddleH2} from '../splitHtmlAtMiddleH2';
import {headDataFor,rewriteHead} from '../../../scripts/inject-canonicals.mjs';
describe('weather evidence and safety correction',()=>{
 it('represents newer conflicting evidence without making weather diagnostic',()=>{
  expect(post.content).toContain('2024 systematic review');
  expect(post.content).toContain('2026 rheumatoid arthritis review');
  expect(post.content).toContain('wind estimate was less certain');
  expect(post.content).toContain('not proof of cause');
  expect(post.direct_answer).not.toContain('Weather does not damage joints');
  expect(post.content).toContain('NICE NG226, recommendations 1.3.1 to 1.3.3');
  expect(post.citations.length).toBe(19);
 });
 it('keeps hypothermia and persistent heat illness on emergency routes',()=>{
  expect(post.content).toContain('Suspected hypothermia:</strong> go to A&amp;E or call 999');
  expect(post.content).toContain('Heatstroke signs:</strong> call 999');
  expect(post.content).toContain('still unwell after 30 minutes');
  expect(post.content).toContain('Fever is not always present');
  expect(post.content).not.toContain('or 999 if severe');
  expect(post.reviewed_by).toBeNull();
  expect(post).not.toHaveProperty('last_reviewed');
  expect(post.editorial_review_note).toContain('not yet had a fresh clinical review');
 });
 it('preserves splitting and actual final injected content',()=>{
  const split=splitHtmlAfterFirstSection(post.content);
  expect(split.second).not.toBe('');
  expect(splitHtmlAtMiddleH2(split.second).second).not.toBe('');
  const route='/blog/weather-and-arthritis-pain-explained';
  expect((headDataFor(route).article as {content:string}).content).toBe(post.content);
  const html=rewriteHead('<html><head></head><body><div id="root"></div></body></html>',route);
  expect(html).toContain('Heatstroke signs:');
  expect(html).not.toContain('"reviewedBy"');
 });
});
