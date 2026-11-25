import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import summary from '../../../docs/blog-image-audit-2026-11-25.json';
import covers from '../../../docs/blog-image-audit-covers-2026-11-25.json';
import additional from '../../../docs/blog-image-audit-additional-2026-11-25.json';
import reviewed from '@/data/blog-reviewed-images.json';
import alts from '@/data/cover-alt-overrides.json';
import credits from '@/data/cover-credits.generated.json';

describe('25 November per-article image relevance review', () => {
  it('records every published cover and additional placement', () => {
    expect(covers).toHaveLength(533);
    expect(additional).toHaveLength(247);
    expect(covers.every(row => row.final_decision)).toBe(true);
    expect(additional.every(row => row.final_decision)).toBe(true);
    expect(summary.scope).toContain('not clinical review');
  });
  it('keeps wrong-subject images out of each exact article gallery', () => {
    for (const row of additional.filter(row => row.final_decision.includes('remove'))) {
      const images = reviewed[row.slug as keyof typeof reviewed] as { src: string }[];
      expect(images.map(image => image.src), row.slug).not.toContain(row.src);
    }
  });
  it('uses original, credited, checksum-valid topic cards for repaired covers', () => {
    const assets: Record<string, {base64: string; sha256: string}> = {};
    for (let i = 1; i <= 5; i++) Object.assign(assets, JSON.parse(readFileSync(`scripts/data/editorial-image-audit-25nov-${i}.json`, 'utf8')));
    expect(Object.keys(assets)).toHaveLength(28);
    for (const row of covers.filter(row => row.final_decision.startsWith('replace'))) {
      const post = JSON.parse(readFileSync(`src/content/blog/posts/${row.slug}.json`, 'utf8'));
      expect(post.is_published).toBe(true);
      expect(post.cover).toBe(`lwa-title-${row.slug}.webp`);
      const asset = assets[post.cover];
      const bytes = Buffer.from(asset.base64, 'base64');
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(asset.sha256);
      expect(bytes.length).toBeGreaterThan(2048);
      expect(alts[post.cover as keyof typeof alts]).toContain('Topic title card:');
      expect(credits[post.cover as keyof typeof credits]).toBe('Image: Living With Arthritis');
    }
  });
});
