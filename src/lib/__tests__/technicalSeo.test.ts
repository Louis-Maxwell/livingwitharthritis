import { describe, expect, it } from 'vitest';
import { canonicalPath, cleanBrand, cleanJsonLd, distinctSeoTitle,
  buildShareLinks, isHealthAdviceGuide } from '../technicalSeo.mjs';
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
  it('adds UK only when the repeated headline still fits in 60 characters', () => {
    const fits = 'Rheumatoid Arthritis Diet: Foods, Meal Ideas and Limits';
    expect(distinctSeoTitle(fits, fits)).toBe(`${fits} UK`);
    expect(`${fits} UK`.endsWith('| Guide')).toBe(false);
    expect(`${fits} UK`.length).toBeLessThanOrEqual(60);
    const full = 'A'.repeat(58);
    expect(distinctSeoTitle(full, full)).toBe(full);
  });
  it('separates a repeated headline with UK, or with the joint named by the route', () => {
    expect(distinctSeoTitle('TENS for Arthritis: Does It Help?', 'TENS for Arthritis: Does It Help?'))
      .toBe('TENS for Arthritis: Does It Help? UK');
    expect(distinctSeoTitle('Seated strength routine', 'Seated strength routine', {
      route: '/exercises/bands-for-knee-arthritis',
    })).toBe('Seated strength routine Knee');
    expect(distinctSeoTitle('Knee pain UK', 'Knee pain UK')).toBe('Knee pain UK');
    expect(distinctSeoTitle('Already different', 'The visible headline')).toBe('Already different');
  });
  it('provides the six requested sharing actions including separate copy control', () => {
    expect(buildShareLinks('/guides/benefits-pip?utm_source=x', 'PIP guide')
      .map((link) => link.label)).toEqual(['Facebook', 'WhatsApp', 'Pinterest', 'LinkedIn', 'X']);
    for (const link of buildShareLinks('/guides/benefits-pip?utm_source=x', 'PIP guide')) {
      expect(decodeURIComponent(link.href)).toContain('https://livingwitharthritis.org.uk/guides/benefits-pip');
      expect(link.href).not.toContain('utm_source');
    }
  });
  it('marks exercise, condition and self-management guides as health advice', () => {
    expect(isHealthAdviceGuide('/guides/hip-exercises-for-osteoarthritis')).toBe(true);
    expect(isHealthAdviceGuide('/guides/knee-exercises-for-osteoarthritis')).toBe(true);
    expect(isHealthAdviceGuide('/guides/newly-diagnosed')).toBe(true);
    expect(isHealthAdviceGuide('/guides/heat-vs-cold-arthritis-pain')).toBe(true);
    expect(isHealthAdviceGuide('/treatments/drug-guide')).toBe(true);
    expect(isHealthAdviceGuide('/guides/benefits-pip')).toBe(false);
    expect(isHealthAdviceGuide('/guides/blue-badge-vs-disability-parking')).toBe(false);
    expect(isHealthAdviceGuide('/guides')).toBe(false);
    expect(isHealthAdviceGuide('/about')).toBe(false);
    expect(isHealthAdviceGuide('/donate')).toBe(false);
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