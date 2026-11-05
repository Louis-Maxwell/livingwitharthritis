import { describe, it, expect } from 'vitest';
import { JSDOM } from 'jsdom';
import { routePatterns, injectFallbackNoindex } from '../lib/fallback-noindex.mjs';

const SHELL = `<!DOCTYPE html><html><head><title>Home</title><meta name="robots" content="index, follow" /><link rel="canonical" href="https://livingwitharthritis.org.uk/" /></head><body></body></html>`;
const patterns = routePatterns(['/', '*', '/conditions/arthritis', '/blog/:slug', '/admin/*', '/arthritis']);

function robotsAt(path) {
  const dom = new JSDOM(injectFallbackNoindex(SHELL, patterns), { url: `https://livingwitharthritis.org.uk${path}`, runScripts: 'dangerously' });
  const d = dom.window.document;
  return { robots: [...d.querySelectorAll('meta[name="robots"]')].map((m) => m.content), canonical: !!d.querySelector('link[rel="canonical"]') };
}

describe('fallback shell noindex guard', () => {
  it('keeps the homepage indexable', () => {
    expect(robotsAt('/')).toEqual({ robots: ['index, follow'], canonical: true });
  });
  it.each(['/conditions/arthritis', '/conditions/arthritis/', '/blog/some-post', '/admin/users', '/arthritis'])('keeps known route %s untouched', (p) => {
    expect(robotsAt(p).robots).toEqual(['index, follow']);
  });
  it.each(['/zz-nope-123', '/conditions/arthritis/extra', '/blog/a/b'])('marks unknown %s noindex and drops canonical', (p) => {
    expect(robotsAt(p)).toEqual({ robots: ['noindex, follow'], canonical: false });
  });
  it('is idempotent', () => {
    const once = injectFallbackNoindex(SHELL, patterns);
    expect(injectFallbackNoindex(once, patterns)).toBe(once);
  });
});
