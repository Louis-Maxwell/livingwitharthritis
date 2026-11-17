import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { headDataFor, rewriteHead } from '../../../scripts/inject-canonicals.mjs';
const slugs=['rheumatology-appointment-what-to-expect-uk','arthritis-pain-tracking-journal-template','arthritis-flare-up-what-to-do','emergency-arthritis-flare-checklist'];
describe('contextual links to existing blank records',()=>{
 it.each(slugs)('keeps the original review date and clearly labels the new sheets in %s',slug=>{
 const post=JSON.parse(readFileSync(`src/content/blog/posts/${slug}.json`,'utf8'));
 expect(post.last_reviewed).toBe('2026-10-23');
 expect(post.content).toContain('awaiting separate clinical review');
 expect(post.content).toContain('not a treatment plan');
 expect(post.content).toContain('do not send your entries');
 const html=rewriteHead('<html><head><title>Home</title></head><body><div id="root"></div></body></html>',`/blog/${slug}`);
 for(const path of ['/resources/gp-appointment-symptom-medication-tracker.pdf','/resources/flare-up-daily-log.pdf','/resources/symptom-flare-tracker']) expect(html).toContain(`href="${path}"`);
 expect((headDataFor(`/blog/${slug}`).article as {content:string}).content).toBe(post.content);
 });
 it('provides a safety summary rather than presenting smoothie ingredients as takeaways',()=>{
 const post=JSON.parse(readFileSync('src/content/blog/posts/anti-inflammatory-smoothie-recipes.json','utf8'));
 expect(post.key_takeaways).toHaveLength(3);
 expect(post.key_takeaways.join(' ')).toContain('150ml');
 expect(post.content.indexOf('150ml')).toBeLessThan(post.content.indexOf('<h3>1.'));
 expect(post.content.match(/<h3>[1-5]\./g)).toHaveLength(5);
 expect(post.editorial_review_note).toContain('awaiting a separate clinical review');
 });
});
