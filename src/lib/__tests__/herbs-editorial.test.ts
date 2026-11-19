import { describe, it, expect } from 'vitest';
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { materializeEditorialCovers } from '../../../scripts/materialize-editorial-covers';
import post from '@/content/blog/posts/anti-inflammatory-herbs-spices-arthritis.json';
import { blogPostSchema } from '@/lib/blog/schema';

describe('herbs and spices editorial boundaries', () => {
  it('materialises the exact checked title card and original artwork credit', () => {
    const fixture = mkdtempSync(join(tmpdir(), 'lwa-herbs-cover-'));
    try {
      for (const dir of ['public/openverse', 'scripts/data', 'src/data']) mkdirSync(join(fixture, dir), { recursive: true });
      for (const file of ['public/openverse/ATTRIBUTION.json', 'scripts/data/editorial-covers.json', 'scripts/data/editorial-herbs-cover.json', 'scripts/generate-cover-credits.mjs']) writeFileSync(join(fixture, file), readFileSync(file));
      materializeEditorialCovers(fixture);
      const cards = JSON.parse(readFileSync('scripts/data/editorial-herbs-cover.json', 'utf8'));
      expect(readFileSync(join(fixture, 'public/openverse', post.cover))).toEqual(Buffer.from(cards[post.cover].base64, 'base64'));
      execFileSync(process.execPath, ['scripts/generate-cover-credits.mjs'], { cwd: fixture });
      expect(JSON.parse(readFileSync(join(fixture, 'src/data/cover-credits.generated.json'), 'utf8'))[post.cover]).toBe('Image: Living With Arthritis');
      cards[post.cover].sha256 = 'invalid';
      writeFileSync(join(fixture, 'scripts/data/editorial-herbs-cover.json'), JSON.stringify(cards));
      expect(() => materializeEditorialCovers(fixture)).toThrow('checksum mismatch');
    } finally { rmSync(fixture, { recursive: true, force: true }); }
  });
  it('keeps the existing published route and an honest review state', () => {
    expect(blogPostSchema.safeParse(post).success).toBe(true);
    expect(post.slug).toBe('anti-inflammatory-herbs-spices-arthritis');
    expect(post.is_published).toBe(true);
    expect(post.reviewed_by).toBeNull();
    expect(post.reviewer_credentials).toBeNull();
    expect(post).not.toHaveProperty('last_reviewed');
    expect(post.editorial_review_note).toContain('awaiting a separate qualified clinical review');
  });
  it('separates supplement research from food and preserves uncertainty', () => {
    expect(post.content).toContain('nine studies with 1,245 people, all with knee osteoarthritis');
    expect(post.content).toContain('little to no improvement');
    expect(post.content).toContain('effects on adverse events were very uncertain');
    expect(post.content).toContain('not a reason to recommend an enhanced-absorption product');
    expect(post.content).toContain('Most health studies have tested supplements rather than foods');
    expect(post.direct_answer).not.toMatch(/mg|4.12 weeks|absorption aid/);
    expect(post.content).not.toContain('Always combine turmeric with black pepper');
    expect(post.content).not.toContain('effects comparable to ibuprofen');
    expect(post.content).not.toContain('cumulative benefit');
    expect(post.content).toContain('urgent GP appointment or NHS 111');
    expect(post.content).toContain('Fever is not always present');
  });
  it('keeps specific sources and useful internal destinations', () => {
    expect(post.citations.length).toBeGreaterThanOrEqual(8);
    expect(post.citations.some(c=>c.publisher==='Cochrane')).toBe(true);
    expect(post.citations.some(c=>c.publisher==='NHS Specialist Pharmacy Service')).toBe(true);
    expect(post.content).toContain('/blog/turmeric-and-methotrexate-interaction');
    expect(post.content).toContain('/blog/lwa-archive-daily-living-tips-for-arthritis');
  });
});
