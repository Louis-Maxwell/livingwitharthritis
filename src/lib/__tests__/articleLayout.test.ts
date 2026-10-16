import { describe, expect, it } from 'vitest';
import { splitMidH2, tailoredDisclaimer } from '@/lib/blog/articleLayout';
import { buildArticlePdfText } from '@/lib/blog/articlePdfText';
import { MAX_INLINE_FIGURES } from '@/lib/articleImagePicks';

describe('shared article layout', () => {
  it('allows at most 3 inline pictures (4 with the cover)', () => {
    expect(MAX_INLINE_FIGURES).toBe(3);
  });

  it('splits at a middle h2 and loses no text', () => {
    const html = '<p>a</p><h2>One</h2><p>b</p><h2>Two</h2><p>c</p><h2>Three</h2><p>d</p>';
    const [a, b] = splitMidH2(html);
    expect(a + b).toBe(html);
    expect(b.startsWith('<h2')).toBe(true);
  });

  it('does not split when there is only one h2', () => {
    expect(splitMidH2('<h2>x</h2><p>y</p>')).toEqual(['<h2>x</h2><p>y</p>', '']);
  });

  it('adds the pharmacist line for supplement guides', () => {
    expect(tailoredDisclaimer('Supplements', 'Turmeric')).toMatch(/pharmacist before starting a supplement/);
  });

  it('PDF text includes answer, sources and notice, never unrecorded sources', () => {
    const text = buildArticlePdfText({
      html: '<h2>Body</h2><p>Text</p>',
      origin: 'https://example.org',
      directAnswer: 'Short answer',
      citations: [{ label: 'NICE NG226', url: 'https://www.nice.org.uk/guidance/ng226' }, { label: 'bad', url: 'javascript:x' }],
      disclaimer: 'Notice',
      reviewLine: 'Clinical review status: not yet recorded',
    });
    expect(text).toContain('Short answer');
    expect(text).toContain('1. NICE NG226: https://www.nice.org.uk/guidance/ng226');
    expect(text).not.toContain('javascript:');
    expect(text).toContain('Clinical review status: not yet recorded');
    expect(text).toContain('Notice');
  });
});
