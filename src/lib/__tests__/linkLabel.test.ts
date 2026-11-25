import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { visibleLinkLabel } from '../linkLabel';
import labels from '@/data/blogTitles.generated.json';
import catalog from '@/content/blog/catalog.generated.json';

describe('compact navigation labels', () => {
  it('preserves every published title without importing the full catalog at runtime', () => {
    expect(labels).toEqual(Object.fromEntries(catalog.map((row) => [row.slug, row.title])));
    for (const row of catalog) expect(visibleLinkLabel(`/blog/${row.slug}`)).toBe(row.title.trim());
    expect(readFileSync('src/lib/linkLabel.ts', 'utf8')).not.toContain('lib/blog/catalog');
  });
  it('keeps existing fallback labels', () => {
    expect(visibleLinkLabel('/conditions/exercises')).toBe('Exercises');
    expect(visibleLinkLabel('/blog/unlisted-guide-uk')).toBe('Unlisted Guide');
  });
});
