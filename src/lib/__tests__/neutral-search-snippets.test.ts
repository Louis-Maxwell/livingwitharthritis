import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { headDataFor } from '../../../scripts/inject-canonicals.mjs';

const slugs = ['ginger-vs-turmeric-for-arthritis', 'anti-inflammatory-smoothie-recipes', 'best-supplements-joint-pain'];
describe('evidence-neutral search snippets', () => {
  it.each(slugs)('keeps source, static head and listing copy aligned for %s', slug => {
    const post = JSON.parse(readFileSync(`src/content/blog/posts/${slug}.json`, 'utf8'));
    const head = headDataFor(`/blog/${slug}`);
    expect(post.title).toBe(post.meta_title);
    expect(post.meta_title.length).toBeLessThanOrEqual(60);
    expect(post.meta_description.length).toBeLessThanOrEqual(155);
    expect(post.meta_description.length).toBeGreaterThanOrEqual(120);
    expect(head.title).toContain(post.meta_title);
    expect(head.description).toBe(post.meta_description);
    expect(post.excerpt).toBe(post.meta_description);
    expect(post.meta_description).not.toMatch(/clinician compares|reduce joint pain|real evidence for joint inflammation/i);
    expect(post.last_reviewed).toBe('2026-10-23');
  });
});
