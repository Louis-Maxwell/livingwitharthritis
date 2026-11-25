import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import post from '@/content/blog/posts/arthritis-in-older-adults.json';
import {headDataFor,rewriteHead} from '../../../scripts/inject-canonicals.mjs';
describe('older adults source checked safety',()=>{
 it('keeps revised clinical status honest and static content current',()=>{
  expect(post.reviewed_by).toBeNull();
  expect(post).not.toHaveProperty('last_reviewed');
  expect(post.editorial_review_note).toContain('awaiting a separate clinical review');
  const data=headDataFor('/blog/arthritis-in-older-adults');
  expect((data.article as {content:string}).content).toBe(post.content);
  const html=rewriteHead('<html><head><title>Home</title></head><body><div id="root"></div></body></html>','/blog/arthritis-in-older-adults');
  expect(html).toContain('same-day hospital eye assessment');
  expect(html).not.toContain('"reviewedBy"');
 });
 it('covers targeted OA, falls, PMR and gout guidance without age assumptions',()=>{
  for(const phrase of ['proton pump inhibitor (PPI)','not automatically a complete falls-prevention programme','NICE NG249','NICE NG219','same-day hospital eye assessment','suddenly cannot see','cannot get up','not to exclude someone from referral','Do not suddenly stop or change steroids'])expect(post.content).toContain(phrase);
  expect(post.content).not.toContain('cartilage wear accumulates');
  expect(post.content).not.toContain('naturally decline somewhat with age');
  expect(post.citations.filter(x=>x.publisher==='NICE')).toHaveLength(4);
  expect(post.content).not.toMatch(/<\/?h [1-6]/);
  expect(readFileSync('src/pages/BlogPost.tsx','utf8')).toContain('q-heading');
 });
});
