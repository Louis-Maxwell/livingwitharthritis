import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import ViewportSection from '../ViewportSection';

afterEach(() => vi.unstubAllGlobals());
describe('Catalogue-backed footer recommendations', () => {
  it('uses the viewport gate instead of idle-only loading, retaining the related guide block', () => {
    const source = readFileSync('src/components/Footer.tsx', 'utf8');
    expect(source).toMatch(/<ViewportSection>\s*<RelatedGuidesBlock\s*\/>\s*<\/ViewportSection>/);
    expect(source).toContain('<FooterMostRead />');
    expect(source).toContain('<PageDownloads />');
    expect(source).toContain('<HelplineWidget />');
  });
  it('does not mount recommendations until the footer approaches, then retains them', () => {
    let notify: IntersectionObserverCallback = () => {};
    const disconnect = vi.fn();
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback: IntersectionObserverCallback) { notify = callback; }
      observe = vi.fn(); disconnect = disconnect;
    });
    render(<ViewportSection><a href="/blog/example">Related guide</a></ViewportSection>);
    expect(screen.queryByText('Related guide')).toBeNull();
    act(() => notify([{ isIntersecting: false }] as IntersectionObserverEntry[], {} as IntersectionObserver));
    expect(screen.queryByText('Related guide')).toBeNull();
    act(() => notify([{ isIntersecting: true }] as IntersectionObserverEntry[], {} as IntersectionObserver));
    expect(screen.getByRole('link', { name: 'Related guide' })).toHaveAttribute('href', '/blog/example');
    expect(disconnect).toHaveBeenCalled();
  });
  it('keeps content available when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    render(<ViewportSection><a href="/blog/fallback">Fallback guide</a></ViewportSection>);
    expect(screen.getByRole('link', { name: 'Fallback guide' })).toHaveAttribute('href', '/blog/fallback');
  });
});
