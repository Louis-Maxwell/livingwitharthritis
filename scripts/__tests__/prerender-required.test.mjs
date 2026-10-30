import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';

const temporary = mkdtempSync(join(tmpdir(), 'lwa-prerender-'));
afterAll(() => rmSync(temporary, { recursive: true, force: true }));

function loadProductionConfig(prerender) {
  const env = {
    ...process.env,
    PUPPETEER_EXECUTABLE_PATH: join(temporary, 'missing-chromium'),
  };
  if (prerender === undefined) delete env.PRERENDER;
  else env.PRERENDER = prerender;
  return spawnSync(process.execPath, ['--input-type=module', '-e', `
    import { loadConfigFromFile } from 'vite';
    await loadConfigFromFile({ command: 'build', mode: 'production' });
  `], { cwd: resolve('.'), env, encoding: 'utf8', timeout: 20000 });
}

describe('requested production prerender', () => {
  it('fails instead of emitting a SPA shell when Chromium is unavailable', () => {
    const result = loadProductionConfig('1');
    expect(result.error).toBeUndefined();
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('PRERENDER=1 requires an executable Chromium browser');
    expect(result.stderr).toContain('Refusing to emit a non-prerendered build');
  }, 25000);

  it.each(['0', undefined])('allows explicit local Vite builds with PRERENDER=%s', (value) => {
    const result = loadProductionConfig(value);
    expect(result.error).toBeUndefined();
    expect(result.status, result.stderr).toBe(0);
  }, 25000);
});
