import {describe,it,expect} from 'vitest';
import post from '@/content/blog/posts/best-plantar-fasciitis-shoes-women-uk.json';
import {headDataFor,rewriteHead} from '../../../scripts/inject-canonicals.mjs';
describe('approved NHS plantar footwear rewrite',()=>{
 it('keeps insoles, diabetes and two-week GP criteria visible',()=>{
  expect(post.content).toContain('insoles');
  expect(post.content).toContain('Tingling, loss of feeling');
  expect(post.content).toContain('when you have diabetes');
  expect(post.content).toContain('two weeks of self-care');
  expect(post.content).toContain('severe, limits normal activities');
 });
 it('uses independent NHS sources without brand superiority or review assertions',()=>{
  expect(post.content).toContain('There is no verified best brand');
  expect(post.content).toContain('gentle foot and heel stretches');
  expect(post.content).not.toContain('cks.nice.org.uk');
  expect(post.citations.every(s=>s.url.startsWith('https://www.nhs.uk/'))).toBe(true);
  expect(post.reviewed_by).toBeNull();
  expect(post.editorial_review_note).toContain('No independent clinical review');
  const data=headDataFor('/blog/'+post.slug);
  expect((data.article as {content:string}).content).toBe(post.content);
  const html=rewriteHead('<html><head><title>Home</title></head><body><div id="root"></div></body></html>','/blog/'+post.slug);
  expect(html).toContain('When to seek help');
  expect(html).not.toContain('"reviewedBy"');
 });
});
