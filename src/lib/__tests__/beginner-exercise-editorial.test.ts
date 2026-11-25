import {readFileSync} from 'node:fs';
import {describe,it,expect} from 'vitest';
import {coverFromFile,pickArticleImages} from '@/lib/articleImagePicks';
import {blogPostSchema} from '@/lib/blog/schema';
const post=()=>JSON.parse(readFileSync('src/content/blog/posts/arthritis-exercise-for-beginners.json','utf8'));
describe('Beginner arthritis exercise editorial repair',()=>{
 it('gives worked NHS seated examples and realistic progression instead of a generic template',()=>{
  const j=post();
  expect(pickArticleImages(coverFromFile(j.cover),j.category,j.title,j.slug)).toHaveLength(1);
  for(const s of ['Seated hip marching','Seated ankle movement','five lifts with each leg','two sets of five stretches with each foot','solid, stable chair without wheels','Make one small change at a time'])expect(j.content).toContain(s);
  expect(j.content).not.toContain('Start with a manageable step');
  expect(j.content).toContain('not automatically right for every joint problem');
  expect(j.citations).toHaveLength(6);
 });
 it('distinguishes expected osteoarthritis discomfort from hot-joint urgency and preserves individual plans',()=>{
  const j=post();
  for(const s of ['Not all discomfort means harm','stopping and resting','Ask for an urgent GP appointment or get help from NHS 111','without a fever','postoperative plan and restrictions instead','Exercise does not replace prescribed disease-controlling treatment'])expect(j.content).toContain(s);
  expect(j.content).not.toContain('4/10');
 });
 it('preserves the public route and original date without unsupported clinical review claims',()=>{
  const j=post();expect(blogPostSchema.safeParse(j).success).toBe(true);expect(j.is_published).toBe(true);expect(j.date).toBe('2026-10-25');expect(j.cover).toBe('commons-best-exercise-for-rheumatoid-arthritis-c26cdc.webp');
  expect(j.reviewed_by).toBeNull();expect(j.reviewer_credentials).toBeNull();expect(j.author_credentials).toBeNull();expect(j).not.toHaveProperty('last_reviewed');expect(j.editorial_review_note).toContain('not yet had a fresh clinical review');expect(j.content).not.toContain('—');expect(j.meta_description.length).toBeLessThanOrEqual(155);
  const qs=[...j.content.matchAll(/<h2([^>]*)>([^<]*\?)<\/h2>/g)];expect(qs.length).toBeGreaterThanOrEqual(8);expect(qs.every(m=>m[1].includes('q-heading'))).toBe(true);
 });
});
