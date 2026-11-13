import { describe, expect, it } from 'vitest';
import { canonicalPath, cleanBrand, cleanJsonLd, distinctSeoTitle,
  buildShareLinks } from '../technicalSeo.mjs';
import { resolveSeoRedirect } from '../seoRedirects';

describe('technical SEO rules', () => {
  it('uses the exact trademark without a regional brand suffix', () => {
    expect(cleanBrand('Living With Arthritis UK')).toBe('Living With Arthritis');
  });
  it('removes query strings from canonical and share paths', () => {
    expect(canonicalPath('/benefits-pip?utm_source=print#claim')).toBe('/benefits-pip');
  });
  it('removes speakable from the site and search-action graph', () => {
    expect(cleanJsonLd({ '@type': 'WebSite', speakable: {},
      potentialAction: { '@type': 'SearchAction', speakable: {} } }))
      .toEqual({ '@type': 'WebSite', potentialAction: { '@type': 'SearchAction' } });
  });
  it('keeps the reader headline untouched and search title within 60 characters', () => {
    const headline = 'Best Exercises for Osteoarthritis Knee Pain at Home';
    const title = distinctSeoTitle(headline, headline);
    expect(title).not.toBe(headline);
    expect(title.length).toBeLessThanOrEqual(60);
  });
  it('does not drop words to force a | Guide suffix', () => {
    const headline = 'Rheumatoid Arthritis Diet: Foods, Meal Ideas and Limits';
    const title = distinctSeoTitle(headline, headline);
    expect(title).toBe(headline);
    expect(title).not.toMatch(/and \| Guide$/);
    expect(title.length).toBeLessThanOrEqual(60);
  });
  it('does not append a | Guide suffix', () => {
    const headline = 'TENS for Arthritis: Does It Help?';
    expect(distinctSeoTitle(headline, headline)).toBe(
      'TENS for Arthritis: Does It Help?',
    );
  });
  it('provides the six requested sharing actions including separate copy control', () => {
    expect(buildShareLinks('/guides/benefits-pip?utm_source=x', 'PIP guide')
      .map((link) => link.label)).toEqual(['Facebook', 'WhatsApp', 'Pinterest', 'LinkedIn', 'X']);
    for (const link of buildShareLinks('/guides/benefits-pip?utm_source=x', 'PIP guide')) {
      expect(decodeURIComponent(link.href)).toContain('https://livingwitharthritis.org.uk/guides/benefits-pip');
      expect(link.href).not.toContain('utm_source');
    }
  });
  it.each([
    ['/pip', '/guides/benefits-pip'],
    ['/authors/louis-maxwell', '/authors/maxwell'],
    ['/blog/knee-arthritis-exercises', '/guides/knee-exercises-for-osteoarthritis'],
    ['/blog/knee-arthritis-exercises-uk', '/guides/knee-exercises-for-osteoarthritis'],
  ])('resolves obsolete path %s to %s', (from, to) => {
    expect(resolveSeoRedirect(from)).toBe(to);
  });
});