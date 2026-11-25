import { describe, it, expect } from 'vitest';
import post from '@/content/blog/posts/heart-failure-arthritis-frailty-overlap-uk.json';
import { blogPostSchema } from '@/lib/blog/schema';
import { coverFromFile, pickArticleImages } from '@/lib/articleImagePicks';

describe('Audit safety corrections', () => {
  it('preserves the article and separates DVT urgency from possible PE', () => {
    expect(blogPostSchema.safeParse(post).success).toBe(true);
    expect(post.date).toBe('2026-09-03');
    expect(post.is_published).toBe(true);
    expect(post.content).toContain('Ask for an urgent GP appointment');
    expect(post.content).toContain('Do not wait for a routine heart failure review');
    expect(post.content).toContain('Call 999</strong> for chest pain or sudden severe breathlessness');
    expect(post.content).not.toContain('Call 999</strong> for chest pain, sudden severe breathlessness, or if one leg');
    expect(post.content).not.toContain('Raise your legs and move your ankles regularly');
    expect(post.citations.some(c => c.url === 'https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/')).toBe(true);
    expect(post.reviewed_by).toBeNull();
    expect(post).not.toHaveProperty('last_reviewed');
    expect(post.editorial_review_note).toContain('limited correction');
  });
  it('uses a checked pressure-care illustration only for the affected guide', () => {
    const cover = coverFromFile('example.webp');
    const images = pickArticleImages(cover, 'Conditions', 'Skin and pressure care with arthritis and frailty (UK)', 'skin-pressure-care-arthritis-frailty-uk');
    expect(images).toHaveLength(2);
    expect(images[0]).toEqual(cover);
    expect(images[1].src).toBe('/openverse/lwa-pressure-care-everyday.svg');
    expect(images[1].alt).toContain('check skin daily');
    const other = pickArticleImages(cover, 'Conditions', 'Skin and pressure care with arthritis and frailty (UK)', 'other-slug');
    expect(other.some(i => i.src.includes('lwa-pressure-care-everyday'))).toBe(false);
  });
});
