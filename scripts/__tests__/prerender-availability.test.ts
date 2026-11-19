import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { explicitPrerenderEnabled } from '../prerender-availability';

describe('explicit prerender browser requirement', () => {
  it.each([undefined, '0', '', 'true'])('keeps ordinary build %s opt-in without browser lookup', (PRERENDER) => {
    const executablePath = vi.fn(() => { throw new Error('not installed'); });
    const exists = vi.fn(() => false);
    expect(explicitPrerenderEnabled({ PRERENDER }, { executablePath, exists })).toBe(false);
    expect(executablePath).not.toHaveBeenCalled();
    expect(exists).not.toHaveBeenCalled();
  });
  it('fails closed when an explicit run has no package/browser', () => {
    expect(() => explicitPrerenderEnabled({ PRERENDER: '1' }, { executablePath: () => { throw new Error('missing'); }, exists: () => false })).toThrow(/PRERENDER=1 requires an available Chromium/);
    expect(() => explicitPrerenderEnabled({ PRERENDER: '1' }, { executablePath: () => '/missing/chrome', exists: () => false })).toThrow(/No prerender build was produced/);
  });
  it('honours an explicit executable without resolving the package', () => {
    const executablePath = vi.fn(() => { throw new Error('not needed'); });
    const exists = vi.fn(path => path === '/custom/chrome');
    expect(explicitPrerenderEnabled({ PRERENDER: '1', PUPPETEER_EXECUTABLE_PATH: '/custom/chrome' }, { executablePath, exists })).toBe(true);
    expect(executablePath).not.toHaveBeenCalled();
  });
  it('does not silently fall back from a bad explicit path', () => {
    expect(() => explicitPrerenderEnabled({ PRERENDER: '1', PUPPETEER_EXECUTABLE_PATH: '/bad/chrome' }, { executablePath: () => '/working/chrome', exists: p => p === '/working/chrome' })).toThrow(/requires an available Chromium/);
  });
  it('enables a valid Puppeteer browser only when explicitly requested', () => {
    expect(explicitPrerenderEnabled({ PRERENDER: '1' }, { executablePath: () => '/cached/chrome', exists: p => p === '/cached/chrome' })).toBe(true);
  });
  it('wires the guard into Vite without forcing hosted prerender', () => {
    const source = readFileSync('vite.config.ts', 'utf8');
    expect(source).toContain('const ENABLE_PRERENDER = explicitPrerenderEnabled();');
    expect(source).not.toContain('function chromiumAvailable()');
    expect(source).toContain('ENABLE_PRERENDER &&');
  });
});
