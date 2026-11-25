import { describe, expect, it } from 'vitest';
import post from '@/content/blog/posts/hip-replacement-recovery-week-by-week.json';
import { blogPostSchema } from '@/lib/blog/schema';
import { headDataFor } from '../../../scripts/inject-canonicals.mjs';
import { buildStaticArticleInner } from '../../../scripts/static-article-html.mjs';

describe('hip replacement recovery evidence boundaries', () => {
  it('keeps publication and honest review status without inherited sign-off', () => {
    expect(blogPostSchema.safeParse(post).success).toBe(true);
    expect(post.is_published).toBe(true);
    expect(post.date).toBe('2026-06-22');
    expect(post.reviewed_by).toBeNull();
    expect(post.reviewer_credentials).toBeNull();
    expect(post).not.toHaveProperty('last_reviewed');
    expect(post.editorial_review_note).toContain('Awaiting separate clinical review');
  });
  it('maps NICE rehabilitation rather than labelling NHS week ranges as NICE rules', () => {
    expect(post.content).toContain('1.10.1 and 1.10.2');
    expect(post.content).toContain('1.10.4');
    expect(post.content).toContain('1.10.5 and 1.10.6');
    expect(post.content).toContain('1.11.1');
    expect(post.content).toContain('not NICE deadlines');
    expect(post.content).toContain('not an exercise prescription for fracture surgery');
    expect(post.content).toContain('not a post-operative exercise prescription');
  });
  it('does not promise an unaided walking week or universal swimming stroke', () => {
    expect(post.direct_answer).not.toMatch(/weeks one to three|unassisted walking|front crawl|backstroke/);
    expect(post.direct_answer).toContain('own surgical team');
    expect(post.content).toContain('Advice about breaststroke also differs');
    expect(post.content).toContain('not a race to drop the walking aid');
  });
  it('retains urgent infection/clot and emergency chest/breathing pathways', () => {
    expect(post.content).toContain('urgent GP appointment or help from NHS 111');
    expect(post.content).toContain('Call 999 or go to A&amp;E');
    expect(post.content).toContain('difficulty breathing or chest pain');
  });
  it('carries the same answer, pending note and sources into static article output', () => {
    const entry = headDataFor('/blog/' + post.slug);
    expect(entry.answer).toBe(post.direct_answer);
    const html = buildStaticArticleInner(entry);
    expect(html).toContain('Awaiting separate clinical review');
    expect(html).not.toMatch(/Written and reviewed by|Clinically reviewed by|2026-10-23/);
    expect(html).toContain('1.10.1 and 1.10.2');
    expect(post.citations).toHaveLength(7);
  });
});
