import { describe, expect, it } from 'vitest';
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
const p = JSON.parse(readFileSync('src/content/blog/posts/pip-for-arthritis-uk.json', 'utf8'));

describe('PIP eligibility substantive source revision', () => {
  it('keeps the existing published path and honest independent-review status', () => {
    expect(p.slug).toBe('pip-for-arthritis-uk');
    expect(p.is_published).toBe(true);
    expect(p.date).toBe('2026-03-01');
    expect(p.reviewed_by).toBeNull();
    expect(p.reviewer_credentials).toBeNull();
    expect(p.last_reviewed).toBeUndefined();
    expect(p.editorial_review_note).toContain('not had a fresh specialist welfare-rights or qualified clinical review');
    expect(p.citations).toHaveLength(13);
    const cards = JSON.parse(readFileSync('scripts/data/editorial-covers.json', 'utf8'));
    const raw = Buffer.from(cards[p.cover].base64, 'base64');
    expect(createHash('sha256').update(raw).digest('hex')).toBe(cards[p.cover].sha256);
    const fixture = mkdtempSync(join(tmpdir(), 'lwa-pip-credit-'));
    try {
      for (const dir of ['public/openverse', 'scripts/data', 'src/data']) mkdirSync(join(fixture, dir), { recursive: true });
      for (const file of ['public/openverse/ATTRIBUTION.json', 'scripts/data/editorial-covers.json', 'scripts/generate-cover-credits.mjs']) writeFileSync(join(fixture, file), readFileSync(file));
      execFileSync(process.execPath, ['scripts/generate-cover-credits.mjs'], { cwd: fixture });
      expect(JSON.parse(readFileSync(join(fixture, 'src/data/cover-credits.generated.json'), 'utf8'))[p.cover]).toBe('Image: Living With Arthritis');
    } finally { rmSync(fixture, { recursive: true, force: true }); }
  });
  it('separates nations, components, reliability and fluctuating activity evidence', () => {
    expect(p.content).toContain('Pension Age Disability Payment');
    expect(p.content).toContain('new working-age disability claims');
    expect(p.content).toContain('three months');
    expect(p.content).toContain('another nine months');
    expect(p.content).toContain('Daily living points cannot be added to mobility points');
    expect(p.content).toContain('no more than twice as long');
    expect(p.content).toContain('more than half the days');
    expect(p.content).toContain('not automatic standalone PIP points');
    expect(p.content).toContain('does not include carrying shopping');
    expect(p.content).toContain('whether you can repeat it');
  });
  it('dates rates and explains deadlines, award risk and adviser limits', () => {
    for (const value of ['£76.70', '£114.60', '£30.30', '£80.00']) expect(p.content).toContain(value);
    expect(p.content).toContain('Checked on 18 November 2026');
    expect(p.content).toContain('Late requests may be possible');
    expect(p.content).toContain('go down as well as up');
    expect(p.content).toContain('not a benefit decision');
    expect(p.content).toContain('/resources/pip-evidence-diary');
    expect(p.content).toContain('/guides/benefits-pip');
    expect(p.content).not.toContain('Call <strong>999');
  });
});
