import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const BANNER =
  'Practical arthritis and frailty information. Check each guide for its sources and clinical-review status.';

describe('site-wide top banner', () => {
  for (const file of ['index.html', 'src/components/Header.tsx']) {
    it(`${file} shows the neutral banner, not a daily-review claim`, () => {
      const src = readFileSync(resolve(file), 'utf8');
      expect(src).toContain(BANNER);
      expect(src).not.toMatch(/reviews and updates this website daily/i);
    });
  }
});
