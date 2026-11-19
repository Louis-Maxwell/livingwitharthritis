import { describe, it, expect } from 'vitest';
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { materializeEditorialCovers } from '../../../scripts/materialize-editorial-covers';
import post from '@/content/blog/posts/anticholinergic-load-arthritis-frailty-uk.json';
import { blogPostSchema } from '@/lib/blog/schema';

describe('anticholinergic burden editorial boundaries', () => {
  it('preserves the public route and publication date without inherited review', () => {
    expect(blogPostSchema.safeParse(post).success).toBe(true);
    expect(post.slug).toBe('anticholinergic-load-arthritis-frailty-uk');
    expect(post.date).toBe('2026-09-03');
    expect(post.is_published).toBe(true);
    expect(post.reviewed_by).toBeNull();
    expect(post.reviewer_credentials).toBeNull();
    expect(post).not.toHaveProperty('last_reviewed');
    expect(post.editorial_review_note).toContain('awaiting a separate qualified clinical review');
  });
  it('distinguishes a review score from diagnosis and uncertain cognitive benefit', () => {
    expect(post.content).toContain('not a diagnosis, a personal prediction of dementia');
    expect(post.content).toContain('three small trials involving 299 older adults');
    expect(post.content).toContain('one to three months');
    expect(post.content).toContain('trials did not investigate safety outcomes');
    expect(post.content).toContain('not a complete interaction check');
    expect(post.citations.length).toBeGreaterThanOrEqual(10);
  });
  it('routes sudden confusion to emergency help, not a routine review', () => {
    expect(post.content).toContain('Go to A&amp;E or call 999 if someone suddenly becomes confused');
    expect(post.content).not.toContain('Contact NHS 111 or your GP urgently</strong> for sudden new confusion');
    expect(post.content).toContain('Speak to a doctor urgently if you cannot pee at all');
    expect(post.content).toContain('does not provide a taper schedule');
    expect(post.content).toContain('not a list of medicines everyone should avoid or replace');
  });
  it('materialises the exact original card and LWA credit', () => {
    const fixture = mkdtempSync(join(tmpdir(), 'lwa-anticholinergic-cover-'));
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
