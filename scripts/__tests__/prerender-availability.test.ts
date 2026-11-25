import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { explicitPrerenderEnabled } from '../prerender-availability';

describe('explicit prerender browser requirement', async () => {
  it.each([undefined, '0', '', 'true'])('keeps ordinary build %s opt-in without browser lookup', async (PRERENDER) => {
    const executablePath = vi.fn(() => { throw new Error('not installed'); });
    const exists = vi.fn(() => false);
    expect(await explicitPrerenderEnabled({ PRERENDER }, { executablePath, exists })).toBe(false);
    expect(executablePath).not.toHaveBeenCalled();
    expect(exists).not.toHaveBeenCalled();
  });
  it('fails closed when an explicit run has no package/browser', async () => {
    await expect(explicitPrerenderEnabled({ PRERENDER: '1' }, { executablePath: () => { throw new Error('missing'); }, exists: () => false })).rejects.toThrow(/PRERENDER=1 requires an available Chromium/);
    await expect(explicitPrerenderEnabled({ PRERENDER: '1' }, { executablePath: () => '/missing/chrome', exists: () => false })).rejects.toThrow(/No prerender build was produced/);
  });
  it('honours an explicit executable without resolving the package', async () => {
    const executablePath = vi.fn(() => { throw new Error('not needed'); });
    const exists = vi.fn(path => path === '/custom/chrome');
    expect(await explicitPrerenderEnabled({ PRERENDER: '1', PUPPETEER_EXECUTABLE_PATH: '/custom/chrome' }, { executablePath, exists })).toBe(true);
    expect(executablePath).not.toHaveBeenCalled();
  });
  it('does not silently fall back from a bad explicit path', async () => {
    await expect(explicitPrerenderEnabled({ PRERENDER: '1', PUPPETEER_EXECUTABLE_PATH: '/bad/chrome' }, { executablePath: () => '/working/chrome', exists: p => p === '/working/chrome' })).rejects.toThrow(/requires an available Chromium/);
  });
  it('enables a valid Puppeteer browser only when explicitly requested', async () => {
    expect(await explicitPrerenderEnabled({ PRERENDER: '1' }, { executablePath: () => '/cached/chrome', exists: p => p === '/cached/chrome' })).toBe(true);
  });
  it('awaits current Puppeteer asynchronous executable resolution', async () => {
    const exists = vi.fn(p => p === '/async/chrome');
    expect(await explicitPrerenderEnabled({ PRERENDER: '1' }, { executablePath: async () => '/async/chrome', exists })).toBe(true);
    expect(exists).toHaveBeenCalledWith('/async/chrome');
    await expect(explicitPrerenderEnabled({ PRERENDER: '1' }, { executablePath: async () => { throw new Error('missing'); }, exists })).rejects.toThrow(/requires an available Chromium/);
  });
  it('wires the guard into Vite without forcing hosted prerender', async () => {
    const source = readFileSync('vite.config.ts', 'utf8');
    expect(source).toContain('const ENABLE_PRERENDER = await explicitPrerenderEnabled();');
    expect(source).not.toContain('function chromiumAvailable()');
    expect(source).toContain('ENABLE_PRERENDER &&');
  });
});
