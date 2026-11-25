import { describe, it, expect } from 'vitest';
import { mkdtempSync, mkdirSync, copyFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { Script } from 'node:vm';
import { execFileSync } from 'node:child_process';
const STATIC_SCRIPTS = ['analytics-consent.js', 'boot-hero-reveal.js', 'seo-fallback-a11y.js', 'stale-deploy-guard.js'];

describe('static public script production minification', () => {
  it('shrinks valid production copies without touching audited sources', () => {
    const dir = mkdtempSync(resolve(tmpdir(), 'lwa-static-scripts-'));
    mkdirSync(resolve(dir, 'security'));
    const originals = STATIC_SCRIPTS.map(name => readFileSync(resolve('public/security', name), 'utf8'));
    try {
      for (const name of STATIC_SCRIPTS) copyFileSync(resolve('public/security', name), resolve(dir, 'security', name));
      const output = execFileSync(process.execPath, ['scripts/minify-static-scripts.mjs', dir], { encoding: 'utf8' });
      const result = JSON.parse(output.replace('[static-scripts] ', '')) as {name: string; before: number; after: number}[];
      expect(result).toHaveLength(STATIC_SCRIPTS.length);
      for (const row of result) {
        expect(row.after).toBeLessThan(row.before);
        expect(() => new Script(readFileSync(resolve(dir, 'security', row.name), 'utf8'))).not.toThrow();
      }
      expect(STATIC_SCRIPTS.map(name => readFileSync(resolve('public/security', name), 'utf8'))).toEqual(originals);
    } finally { rmSync(dir, { recursive: true, force: true }); }
  });
});
