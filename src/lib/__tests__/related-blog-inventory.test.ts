import { describe, expect, it } from 'vitest';
import allPosts from '@/content/blog/catalog.generated.json';
import { resolveSeoRedirect } from '@/lib/seoRedirects';
const catalog = allPosts.filter(p => !resolveSeoRedirect(`/blog/${p.slug}`));
import { relatedBlogPosts } from '@/lib/relatedBlogPosts.mjs';
describe('topic-matched blog peers across the published inventory', () => {
  it('gives every published blog three distinct, existing peers and never itself', () => {
    const slugs = new Set(catalog.map(p => p.slug));
    for (const post of catalog) {
      const picks = relatedBlogPosts(post, catalog);
      expect(picks, post.slug).toHaveLength(3);
      expect(new Set(picks.map(p => p.slug)).size).toBe(3);
      for (const pick of picks) {
        expect(slugs.has(pick.slug), pick.slug).toBe(true);
        expect(pick.slug).not.toBe(post.slug);
      }
    }
  });
  it('keeps knee exercise recommendations on knee topics', () => {
    const post = allPosts.find(p => p.slug === 'knee-arthritis-exercises-uk')!;
    expect(relatedBlogPosts(post, catalog).every(p => /knee/i.test(p.title))).toBe(true);
  });
  it('keeps medicine-interaction reading on medicines and supplements', () => {
    const post = catalog.find(p => p.slug === 'turmeric-and-methotrexate-interaction')!;
    expect(relatedBlogPosts(post, catalog).every(p => /turmeric|supplement|medicine|methotrexate/i.test(p.title))).toBe(true);
  });
});
