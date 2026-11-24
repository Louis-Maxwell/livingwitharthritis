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
  it('keeps unrelated clinical overrides', () => {
    expect(headDataFor('/guides/dmards-vs-biologics').answer).toContain('JAK inhibitors');
  });
});
