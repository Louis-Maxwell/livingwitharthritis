import {readFileSync} from 'node:fs';
import {describe,it,expect} from 'vitest';
import {blogPostSchema} from '@/lib/blog/schema';
import {coverFromFile,pickArticleImages} from '@/lib/articleImagePicks';
const post=()=>JSON.parse(readFileSync('src/content/blog/posts/tai-chi-for-arthritis-uk.json','utf8'));
describe('Tai chi editorial evidence and practical class repair',()=>{
 it('corrects the broken title and separates knee OA research from uncertain RA evidence',()=>{
  const j=post();expect(pickArticleImages(coverFromFile(j.cover),j.category,j.title,j.slug)).toHaveLength(1);expect(j.title).toBe('Tai Chi for Arthritis: Evidence and Getting Started');
  for(const s of ['204 people with symptomatic knee osteoarthritis','seven studies involving 345 people concerned rheumatoid arthritis','not knee or hip osteoarthritis','not a blanket endorsement','2023 review'])expect(j.content).toContain(s);
  for(const s of ['52% improvement','up to 50%','lowers cortisol','all endorse it','£5','NHS Fitness Studio','Why the Recommends It'])expect(j.content).not.toContain(s);
  expect(j.citations).toHaveLength(9);
 });
 it('provides a class-selection checklist and preserves individual safety limits',()=>{
  const j=post();for(const s of ['does not carry out background checks','fees and cancellation terms','not automatically suitable for everyone','Do not reduce disease-controlling treatment','Ask for an urgent GP appointment or get help from NHS 111','without a fever','Do not exercise a newly swollen joint before it has been assessed','solid, stable chair without wheels'])expect(j.content).toContain(s);
  expect(j.direct_answer).toContain('rheumatoid arthritis evidence is uncertain');
 });
 it('preserves the public record and shows honest review status and full body question headings',()=>{
  const j=post();expect(blogPostSchema.safeParse(j).success).toBe(true);expect(j.slug).toBe('tai-chi-for-arthritis-uk');expect(j.date).toBe('2026-03-08');expect(j.cover).toBe('cover-0328-my-left-knee.webp');expect(j.is_published).toBe(true);expect(j.reviewed_by).toBeNull();expect(j.reviewer_credentials).toBeNull();expect(j.author_credentials).toBe('Physiotherapist, HCPC PH128483');expect(j).not.toHaveProperty('last_reviewed');expect(j.editorial_review_note).toContain('not yet had a fresh clinical review');expect(j.meta_description.length).toBeLessThanOrEqual(155);expect(j.content).not.toContain('—');const qs=[...j.content.matchAll(/<h2([^>]*)>([^<]*\?)<\/h2>/g)];expect(qs.length).toBeGreaterThanOrEqual(9);expect(qs.every(m=>m[1].includes('q-heading'))).toBe(true);
 });
});
