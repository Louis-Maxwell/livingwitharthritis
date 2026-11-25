import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { headDataFor, rewriteHead } from '../../../scripts/inject-canonicals.mjs';
const slugs = ['ginger-vs-turmeric-for-arthritis','anti-inflammatory-smoothie-recipes','best-supplements-joint-pain'];
describe('source-backed nutrition safety revision', () => {
 it.each(slugs)('does not extend an old review claim to revised %s', slug => {
  const post = JSON.parse(readFileSync(`src/content/blog/posts/${slug}.json`, 'utf8'));
  expect(post.editorial_review_note).toMatch(/awaiting (?:a )?separate clinical review/i);
  expect(post.last_reviewed).toBeUndefined();
  expect(post.reviewed_by).toBeNull();
  expect(post.updated_at).toBe(slug === 'best-supplements-joint-pain' ? '2026-11-25T00:40:00.000Z' : slug === 'anti-inflammatory-smoothie-recipes' ? '2026-11-25T04:46:00.000Z' : '2026-11-17');
  expect(post.citations.length).toBeGreaterThanOrEqual(3);
  const data = headDataFor(`/blog/${slug}`);
  const html = rewriteHead('<html><head><title>Home</title></head><body><div id="root"></div></body></html>',`/blog/${slug}`);
  expect(html).toMatch(/awaiting (?:a )?separate clinical review/i);
  expect(html).not.toContain('"reviewedBy"');
  expect((data.article as { content: string }).content).toBe(post.content);
 });
 it('keeps five recipe ingredient lists but drops unsupported treatment and authorship claims', () => {
  const post=JSON.parse(readFileSync('src/content/blog/posts/anti-inflammatory-smoothie-recipes.json','utf8'));
  expect(post.content.match(/<h3>[1-5]\./g)).toHaveLength(5);
  expect(post.content).toContain('150ml');
  expect(post.content).not.toMatch(/Olivia Hayes|proven to reduce|triple anti-inflammatory|maximum absorption|1 smoothie daily/i);
 });
 it('does not declare a supplement winner or advise routine high-dose products', () => {
  const ginger=JSON.parse(readFileSync('src/content/blog/posts/ginger-vs-turmeric-for-arthritis.json','utf8'));
  expect(ginger.content).toContain('do not justify promising');
  expect(ginger.content).toContain('liver damage');
  expect(ginger.content).not.toMatch(/patients I see|two cups|combining them is reasonable|fewer gastrointestinal/i);
 });
});
