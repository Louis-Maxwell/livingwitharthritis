import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { headDataFor } from '../inject-canonicals.mjs';
import safety from '../nice-safety-overrides.json';

describe('source-checked NICE safety corrections', () => {
  for (const route of Object.keys(safety)) {
    it(`uses the corrected final body and removes stale FAQs for ${route}`, () => {
      const data = headDataFor(route);
      expect(data.bodyHtml).toBe(safety[route].bodyHtml);
      expect(data.faqs).toEqual([]);
      expect(data.summaryReviewNote).toBe(safety[route].summaryReviewNote);
      expect(data.reviewedBy).toBeUndefined();
      expect(data.lastReviewed).toBeUndefined();
      expect(JSON.stringify(data)).not.toMatch(/30[–-]50%|1,500|3,000|2,000%/);
    });
  }
  it('does not rebuild FAQ schema from editorial safety headings after hydration', () => {
    const source = readFileSync('src/pages/FaqArticle.tsx', 'utf8');
    expect(source).toContain('if (!article || safetyUpdated) return;');
    expect(source).toContain('}, [article, safetyUpdated]);');
    const frailty = readFileSync('src/pages/guides/FrailtyManagementHub.tsx', 'utf8');
    expect(frailty).not.toContain("injectJsonLd('frailty-hub-faq'");
  });
  it('keeps unrelated clinical overrides' , () => {
    expect(headDataFor('/guides/dmards-vs-biologics').bodyHtml).toContain('JAK inhibitors');
  });
});
