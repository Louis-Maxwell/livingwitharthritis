import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const callbacks = vi.hoisted(() => new Map<string, (metric: { value: number }) => void>());
vi.mock('web-vitals', () => Object.fromEntries(['CLS', 'FCP', 'LCP', 'INP', 'TTFB'].map(name => [
  `on${name}`, vi.fn((callback: (metric: { value: number }) => void) => callbacks.set(name, callback)),
])));
import { getWebVitals, initWebVitals } from '../web-vitals';

beforeEach(() => {
  localStorage.clear(); callbacks.clear(); window.gtag = vi.fn();
});
afterEach(() => { localStorage.clear(); delete window.gtag; vi.restoreAllMocks(); });
const emit = (metric = 'LCP', value = 1234) => callbacks.get(metric)!({ value });

describe('live web-vitals consumer uses the shared dispatch boundary', () => {
  it('still measures locally but sends nothing without consent', () => {
    initWebVitals(); emit();
    expect(getWebVitals().lcp).toBe(1234);
    expect(window.gtag).not.toHaveBeenCalled();
  });
  it('sends a clean metric only while consent remains affirmative', () => {
    initWebVitals(); localStorage.setItem('lwa_cv3', JSON.stringify({ a: true }));
    emit(); expect(window.gtag).toHaveBeenCalledTimes(1);
    expect(window.gtag).toHaveBeenCalledWith('event', 'page_view_lcp', expect.objectContaining({ value: 1234, event_category: 'Web Vitals' }));
    localStorage.setItem('lwa_cv3', JSON.stringify({ a: false }));
    localStorage.setItem('cookie-consent', 'accepted'); emit('FCP');
    expect(window.gtag).toHaveBeenCalledTimes(1);
  });
  it('contains provider exceptions so a delayed vital callback cannot break the page', () => {
    initWebVitals(); localStorage.setItem('lwa_cv3', JSON.stringify({ a: true }));
    window.gtag = vi.fn(() => { throw new Error('Blocked'); });
    expect(() => emit()).not.toThrow();
  });
});
