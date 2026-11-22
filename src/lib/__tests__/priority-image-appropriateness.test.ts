import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { coverFromFile, pickArticleImages } from '@/lib/articleImagePicks';
import editorial from '../../../scripts/data/editorial-care-covers.json';

const slugs = ['bereavement-arthritis-frailty-living-alone-uk', 'post-hip-replacement-frailty-home-uk'];
describe('Article-specific image appropriateness repair', () => {
  for (const slug of slugs) it(`uses a deterministic original title card without unrelated inserts: ${slug}`, () => {
    const post = JSON.parse(readFileSync(`src/content/blog/posts/${slug}.json`, 'utf8'));
    const filename = `lwa-title-${slug}.webp`;
    expect(post.cover).toBe(filename);
    expect(post.slug).toBe(slug);
    expect(post.is_published).toBe(true);
    const entry = editorial[filename as keyof typeof editorial];
    const bytes = Buffer.from(entry.base64, 'base64');
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(entry.sha256);
    expect(bytes.toString('ascii', 0, 4)).toBe('RIFF');
    expect(bytes.toString('ascii', 8, 12)).toBe('WEBP');
    expect(bytes.length).toBeLessThan(25000);
    const cover = coverFromFile(post.cover);
    expect(cover.alt).toContain('title card');
    const picks = pickArticleImages(cover, post.category, post.title, post.slug, post.keywords);
    expect(picks).toEqual([cover]);
  });
  it('does not make the title-card-only rule apply to every article', () => {
    const cover = coverFromFile('arthritis-01-arthritic-hands-in-pain.webp');
    expect(pickArticleImages(cover, 'Exercise', 'Pilates for arthritis', 'an-unrelated-pilates-guide').length).toBeGreaterThan(1);
  });
});
