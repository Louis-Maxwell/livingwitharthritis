import {describe,it,expect} from 'vitest';
import post from '@/content/blog/posts/anti-inflammatory-smoothie-recipes.json';
describe('smoothie evidence and food safety',()=>{
 it('keeps the treatment disclaimer and NICE scope in main prose',()=>{
  expect(post.content).toContain('<h2 class="q-heading">Are these anti-inflammatory treatments?</h2>');
  expect(post.content).toContain('no strong evidence');
  expect(post.content).toContain('NICE does not assess these recipes individually');
  expect(post.content).toContain('150ml a day');
 });
 it('explains warfarin and individual food safety without banning vegetables',()=>{
  expect(post.content).toContain('keep vitamin K intake consistent');
  expect(post.content).toContain('recipe 4 is not suitable as written');
  expect(post.content).toContain('not a blanket restriction for everyone taking arthritis medicine');
  expect(post.content).toContain('follow preparation and cooking instructions');
  expect(post.content).toContain('Use pasteurised milk or yoghurt');
  expect(post.content).not.toContain('1 tbsp coconut oil');
  expect(post.content).not.toContain('1 tbsp honey');
  expect(post.citations.some(x=>x.url.includes('cuh.nhs.uk/patient-information/dietary-advice'))).toBe(true);
  expect(post.editorial_review_note).toContain('awaiting a separate clinical review');
 });
});
