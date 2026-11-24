import { describe, expect, it } from 'vitest';
import post from '@/content/blog/posts/best-exercises-osteoarthritis-knee-pain-home.json';
import { blogPostSchema } from '@/lib/blog/schema';
import { headDataFor } from '../../../scripts/inject-canonicals.mjs';
import { buildStaticArticleInner } from '../../../scripts/static-article-html.mjs';

describe('home knee exercise evidence and safety', () => {
  it('preserves publication without inheriting a clinical sign-off', () => {
    expect(blogPostSchema.safeParse(post).success).toBe(true);
    expect(post.is_published).toBe(true);
    expect(post.date).toBe('2026-07-24');
    expect(post.reviewed_by).toBeNull();
    expect(post.reviewer_credentials).toBeNull();
    expect(post).not.toHaveProperty('last_reviewed');
    expect(post.editorial_review_note).toContain('not yet had a fresh clinical review');
  });
  it('uses tailored NICE strengthening and aerobic exercise, not universal targets', () => {
    expect(post.content).toContain('recommendations 1.3.1 to 1.3.4');
    expect(post.direct_answer).toContain('tailored to your needs');
    expect(post.content).toContain('general aerobic fitness');
    expect(post.content).toContain('Supervised sessions');
    expect(post.content).not.toMatch(/10[–-]15%|4-fold|VMO|weakens first|6[–-]8 weeks|2[–-]3 weeks/);
  });
  it('offers supported movements and explains person-specific exercise amounts', () => {
    expect(post.content).toContain('Seated knee straightening');
    expect(post.content).toContain('Heel slide');
    expect(post.content).toContain('Supported calf raise');
    expect(post.content).toContain('3 to 4 repetitions');
    expect(post.content).toContain('at least twice a week');
    expect(post.content).toContain('Do not add ankle weights');
    expect(post.content).toContain('not a rehabilitation plan after a knee replacement');
  });
  it('distinguishes initial discomfort from a new urgent problem', () => {
    expect(post.content).toContain('Joint infection can occur without a fever');
    expect(post.content).toContain('Get urgent advice from NHS 111');
    expect(post.content).toContain('Call 999 for severe breathing difficulty');
    expect(post.content).toContain('no universal pain score or two-hour rule');
    expect(post.content).not.toContain('reduce resistance next session but do not stop');
  });
  it('carries corrected wording and eight sources into actual static composition', () => {
    const data = headDataFor('/blog/' + post.slug);
    const html = buildStaticArticleInner(data);
    expect(data.answer).toBe(post.direct_answer);
    expect(html).toContain('Do not add ankle weights');
    expect(html).toContain('Awaiting separate clinical review');
    expect(html).not.toMatch(/10[–-]15%|Written and reviewed by|Clinically reviewed by/);
    expect(post.citations).toHaveLength(8);
  });
});
