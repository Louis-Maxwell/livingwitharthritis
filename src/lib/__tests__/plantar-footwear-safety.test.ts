import {describe,it,expect} from 'vitest';
import post from '@/content/blog/posts/best-plantar-fasciitis-shoes-women-uk.json';
import {headDataFor,rewriteHead} from '../../../scripts/inject-canonicals.mjs';
describe('plantar footwear source and visibility check',()=>{
 it('keeps insoles and GP criteria visible in main prose',()=>{
  expect(post.content).toContain('<h2 class="q-heading">Do insoles or heel pads help?</h2>');
  expect(post.content).toContain('<h2 class="q-heading">When should heel pain be checked?</h2>');
  const stripped=post.content.replace(/<h([23])(?![^>]*\bq-heading\b)[^>]*>([^<]*\?)\s*<\/h\1>[\s\S]*?(?=<h[1-3][^>]*>|$)/gi,'');
  expect(stripped).toContain('you have diabetes and foot pain');
  expect(stripped).toContain('two weeks of self-care');
 });
 it('keeps injury triage, source exercise limits and honest CKS scope',()=>{
  expect(post.content).toContain('inability to walk, stand on tiptoes or climb stairs');
  expect(post.content).toContain('not to attempt its illustrated exercises without advice');
  expect(post.content).toContain('does not establish full conformity');
  expect(post.reviewed_by).toBeNull();
  expect(post.editorial_review_note).toContain('awaiting a separate qualified clinical review');
  const data=headDataFor('/blog/best-plantar-fasciitis-shoes-women-uk');
  expect((data.article as {content:string}).content).toBe(post.content);
  const html=rewriteHead('<html><head><title>Home</title></head><body><div id="root"></div></body></html>','/blog/best-plantar-fasciitis-shoes-women-uk');
  expect(html).toContain('When heel pain needs urgent advice');
  expect(html).not.toContain('"reviewedBy"');
 });
});
