import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { COMPARISON_CONTENT } from '@/data/comparison-content';
const route = '/guides/mediterranean-diet-vs-anti-inflammatory-diet';
describe('approved diet comparison correction', () => {
  it('keeps exact approved uncertainty and no symptom-time promise in every delivery layer', () => {
    const article = COMPARISON_CONTENT[route];
    const head = JSON.parse(readFileSync('scripts/clinical-head-overrides.json', 'utf8'))[route];
    const body = JSON.parse(readFileSync('scripts/data/rendered-bodies.overrides.json', 'utf8'))[route];
    for (const text of [JSON.stringify(article), JSON.stringify(head), body]) {
      expect(text).toContain('no strong evidence');
      expect(text).not.toMatch(/genuinely strong evidence|likely to feel a difference|Strong \(RA and OA\)|90% Mediterranean|modest RA benefit/);
    }
    expect(article.editorialUpdatedAt).toBe('2026-11-25');
    expect(article.faqs).toEqual(head.faqs);
    expect(article.answer).toBe(head.answer);
    expect(article.metaDescription).toBe(head.description);
    expect(body).toContain('Earlier review dates do not attest to this revision');
    expect(body).not.toContain('Last reviewed 11 July 2026');
  });
  it('does not change dates or add editorial fields on other comparisons', () => {
    expect(COMPARISON_CONTENT['/guides/nhs-vs-private-rheumatology'].editorialUpdatedAt).toBeUndefined();
  });
});
