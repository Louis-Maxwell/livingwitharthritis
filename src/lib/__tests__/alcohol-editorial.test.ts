import { describe, it, expect } from 'vitest';
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { materializeEditorialCovers } from '../../../scripts/materialize-editorial-covers';
import post from '@/content/blog/posts/alcohol-arthritis-uk-guidance.json';
import { blogPostSchema } from '@/lib/blog/schema';

describe('alcohol and arthritis editorial boundaries', () => {
  it('preserves the public route, original date and honest review status', () => {
    expect(blogPostSchema.safeParse(post).success).toBe(true);
    expect(post.slug).toBe('alcohol-arthritis-uk-guidance');
    expect(post.date).toBe('2026-06-10');
    expect(post.is_published).toBe(true);
    expect(post.reviewed_by).toBeNull();
    expect(post.reviewer_credentials).toBeNull();
    expect(post).not.toHaveProperty('last_reviewed');
    expect(post.editorial_review_note).toContain('awaiting a separate qualified clinical review');
  });
  it('distinguishes conflicting observational associations from treatment advice', () => {
    expect(post.content).toContain('2023 Swedish study following 1,228 people');
    expect(post.content).toContain('found no clear benefit');
    expect(post.content).toContain('does not prove');
    expect(post.content).toContain('Do not start drinking alcohol to treat arthritis');
    expect(post.content).not.toContain('Some types of arthritis improve with moderate alcohol');
    expect(post.content).not.toContain('25% less pain');
    expect(post.content).not.toContain('NHS physiotherapists and rheumatology nurses we work with');
    expect(post.citations.length).toBeGreaterThanOrEqual(12);
  });
  it('keeps general limits separate from personal clearance and withdrawal safety', () => {
    expect(post.content).toContain('low-risk limit, not a target');
    expect(post.content).toContain('25 mg or less');
    expect(post.content).toContain('does not set a drinking allowance for leflunomide');
    expect(post.content).toContain('medical help before stopping or reducing');
    expect(post.content).toContain('Call 999 or go to A&amp;E for severe alcohol withdrawal symptoms');
    expect(post.content).toContain('Do not use an online taper');
    expect(post.content).toContain('Fever is not always present');
    expect(post.content).toContain('2.1 units');
    expect(post.content).toContain('2.5 units');
  });
  it('materialises the exact original title card with the correct credit', () => {
    const fixture = mkdtempSync(join(tmpdir(), 'lwa-alcohol-cover-'));
    try {
      for (const dir of ['public/openverse', 'scripts/data', 'src/data']) mkdirSync(join(fixture, dir), { recursive: true });
      for (const file of ['public/openverse/ATTRIBUTION.json', 'scripts/data/editorial-covers.json', 'scripts/data/editorial-herbs-cover.json', 'scripts/generate-cover-credits.mjs']) writeFileSync(join(fixture, file), readFileSync(file));
      materializeEditorialCovers(fixture);
      const cards = JSON.parse(readFileSync('scripts/data/editorial-herbs-cover.json', 'utf8'));
      expect(readFileSync(join(fixture, 'public/openverse', post.cover))).toEqual(Buffer.from(cards[post.cover].base64, 'base64'));
      execFileSync(process.execPath, ['scripts/generate-cover-credits.mjs'], { cwd: fixture });
      expect(JSON.parse(readFileSync(join(fixture, 'src/data/cover-credits.generated.json'), 'utf8'))[post.cover]).toBe('Image: Living With Arthritis');
    } finally { rmSync(fixture, { recursive: true, force: true }); }
  });
});
