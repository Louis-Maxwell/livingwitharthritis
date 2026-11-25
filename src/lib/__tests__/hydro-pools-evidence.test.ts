import { describe, expect, it } from 'vitest';
import post from '@/content/blog/posts/hydrotherapy-pools-uk.json';
import { blogPostSchema } from '@/lib/blog/schema';
import { headDataFor } from '../../../scripts/inject-canonicals.mjs';
import { buildStaticArticleInner } from '../../../scripts/static-article-html.mjs';

describe('hydrotherapy access evidence and safety', () => {
  it('preserves publication while removing inherited clinical sign-off', () => {
    expect(blogPostSchema.safeParse(post).success).toBe(true);
    expect(post.is_published).toBe(true);
    expect(post.date).toBe('2026-02-25');
    expect(post.reviewed_by).toBeNull();
    expect(post.reviewer_credentials).toBeNull();
    expect(post).not.toHaveProperty('last_reviewed');
    expect(post.editorial_review_note).toContain('not yet had a fresh clinical review');
  });
  it('distinguishes NICE recommendations from local service provision', () => {
    expect(post.content).toContain('recommendations 1.3.1 to 1.3.4');
    expect(post.content).toContain('recommendation 1.8.1');
    expect(post.content).toContain('not a guarantee of hydrotherapy provision');
    expect(post.content).not.toContain('one of the most effective treatments');
    expect(post.content).not.toContain('releasing endorphins');
  });
  it('does not promise national wait times, courses or access facilities', () => {
    expect(post.content).toContain('up to four sessions');
    expect(post.content).toContain('six to eight sessions');
    expect(post.content).toContain('local examples, not UK-wide entitlements');
    expect(post.content).toContain('Do not assume every pool has the equipment you need');
    expect(post.content).not.toMatch(/typically 6-12 weeks|Typical NHS course|Sessions usually last 30-45/);
  });
  it('includes screening, local return-to-pool rules and urgent routing', () => {
    expect(post.content).toContain('published NHS policies differ');
    expect(post.content).toContain('even without a fever');
    expect(post.content).toContain('Call 999 for severe breathing difficulty');
    expect(post.content).toContain('Stop the exercise rather than trying to finish');
    expect(post.content).toContain('no universal two-hour pain rule');
  });
  it('carries the corrected text and ten sources into static composition', () => {
    const data = headDataFor('/blog/' + post.slug);
    const html = buildStaticArticleInner(data);
    expect(data.answer).toBe(post.direct_answer);
    expect(html).toContain('not a live directory');
    expect(html).toContain('Awaiting separate clinical review');
    expect(html).not.toContain('Written and reviewed by');
    expect(post.citations).toHaveLength(10);
  });
});
