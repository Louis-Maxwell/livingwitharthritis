import { describe, expect, it } from 'vitest';
import {
  citationIssues,
  editorialQaRow,
  hasDatedReviewEvidence,
  provenanceOf,
  riskFlags,
} from '@/lib/blog/editorialQa';

describe('editorial QA heuristics', () => {
  it('flags missing, non-https and duplicate citation URLs', () => {
    const issues = citationIssues([
      { label: 'NHS', publisher: 'NHS', url: 'https://www.nhs.uk/a' },
      { label: 'Dup', publisher: 'NHS', url: 'https://www.nhs.uk/a/' },
      { label: 'Old', publisher: 'X', url: 'http://example.org' },
      { label: '', publisher: '', url: '' },
    ]).map((i) => i.problem);
    expect(issues).toEqual(['duplicate-url', 'not-https', 'missing-url', 'missing-label', 'missing-publisher']);
  });

  it('never accepts the placeholder reviewer as review evidence', () => {
    expect(hasDatedReviewEvidence({ slug: 's', title: 't', category: 'c', reviewed_by: 'Sarah Jennings PH123456', last_reviewed: '2026-01-01' })).toBe(false);
    expect(hasDatedReviewEvidence({ slug: 's', title: 't', category: 'c', reviewed_by: 'None', last_reviewed: '2026-01-01' })).toBe(false);
    expect(hasDatedReviewEvidence({ slug: 's', title: 't', category: 'c', reviewed_by: 'Louis Maxwell' })).toBe(false);
    expect(hasDatedReviewEvidence({ slug: 's', title: 't', category: 'c', reviewed_by: 'Louis Maxwell', last_reviewed: '2026-10-01' })).toBe(true);
  });

  it('marks a "reviewed" status with no dated reviewer as unsupported', () => {
    const row = editorialQaRow({ slug: 's', title: 't', category: 'c', reviewStatus: 'reviewed', reviewed_by: 'None' });
    expect(row.reviewClaimUnsupported).toBe(true);
    expect(row.reviewStatus).toBe('reviewed');
  });

  it('flags medication, dose and cure language', () => {
    expect(riskFlags('Take 1000 mg a day of curcumin; it cures arthritis. Methotrexate')).toEqual(
      expect.arrayContaining(['medication', 'supplementDose', 'cureLanguage']),
    );
  });

  it('only treats full Creative Commons records as verified licences', () => {
    expect(provenanceOf({ creator: 'A', license: 'by', license_url: 'https://creativecommons.org/licenses/by/2.0/', source: 'https://flickr.com/x' })).toBe('verified-licence');
    expect(provenanceOf({ source: 'existing', title: 'x.webp' })).toBe('own-or-legacy-unverified');
    expect(provenanceOf(undefined)).toBe('no-record');
  });
});
