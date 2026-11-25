import { describe, expect, it } from 'vitest';
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
const p = JSON.parse(readFileSync('src/content/blog/posts/paracetamol-for-arthritis-pain-what-the-evidence-says.json', 'utf8'));
describe('paracetamol substantive source revision', () => {
  it('preserves the published path without inheriting an old clinical review', () => {
    expect(p.slug).toBe('paracetamol-for-arthritis-pain-what-the-evidence-says');
    expect(p.is_published).toBe(true);
    const cards = JSON.parse(readFileSync('scripts/data/editorial-covers.json', 'utf8'));
    expect(cards[p.cover]?.sha256).toMatch(/^[a-f0-9]{64}$/);
    // CI runs unit tests before the full build regenerates credits.
    // Exercise the real generator in isolation, without relying on stale build output.
    const fixture = mkdtempSync(join(tmpdir(), 'lwa-cover-credit-'));
    try {
      for (const dir of ['public/openverse', 'scripts/data', 'src/data']) mkdirSync(join(fixture, dir), { recursive: true });
      for (const file of ['public/openverse/ATTRIBUTION.json', 'scripts/data/editorial-covers.json', 'scripts/generate-cover-credits.mjs']) {
        writeFileSync(join(fixture, file), readFileSync(file));
      }
      execFileSync(process.execPath, ['scripts/generate-cover-credits.mjs'], { cwd: fixture });
      const credits = JSON.parse(readFileSync(join(fixture, 'src/data/cover-credits.generated.json'), 'utf8'));
      expect(credits[p.cover]).toBe('Image: Living With Arthritis');
    } finally {
      rmSync(fixture, { recursive: true, force: true });
    }
    expect(p.reviewed_by).toBeNull();
    expect(p.reviewer_credentials).toBeNull();
    expect(p.last_reviewed).toBeUndefined();
    expect(p.editorial_review_note).toContain('not yet had a fresh clinical review');
    expect(p.content).toContain('18 November 2026');
  });
  it('separates OA evidence and NICE exceptional use from rheumatoid disease treatment', () => {
    expect(p.citations).toHaveLength(10);
    expect(p.content).toContain('overall adverse events were similar to placebo');
    expect(p.content).toContain('only one at a time and no more than four in 24 hours');
    expect(p.content).toContain('10 trials with 3,541');
    expect(p.content).toContain('October 2017');
    expect(p.content).toContain('both</strong> conditions');
    expect(p.content).toContain('Painkillers do not replace medicines used to control the disease');
    expect(p.content).not.toContain('generally recommending paracetamol as a potential option for mild pain');
    expect(p.content).not.toContain('1000 mg/day');
  });
  it('prioritises overdose and sudden swollen-joint help over waiting', () => {
    expect(p.content).toContain('Get urgent medical advice now if you have taken more paracetamol than the packet or leaflet says');
    expect(p.content).toContain('Do not wait for symptoms');
    expect(p.content).toContain('not everyone has a fever');
    expect(p.content).toContain('Do not wait a week');
    expect(p.content).toContain('Co-codamol contains paracetamol');
    expect(p.content).toContain('less than 50 kg');
    expect(p.content).toContain('not a target or a personalised prescription');
    expect(p.content).toContain('/resources/symptom-flare-tracker');
  });
});
