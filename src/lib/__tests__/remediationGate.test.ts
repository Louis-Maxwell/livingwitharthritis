import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { gateStatus, gateBlockers } from '@/lib/blog/remediationGate';
import { buildArticlePdfText } from '@/lib/blog/articlePdfText';

const img = (file: string, ok = true) => ({ file, provenance: ok ? 'verified-licence' as const : 'no-record' as const, topicMatched: true });
const full = {
  images: [img('a'), img('b'), img('c')],
  citationCount: 2, citationIssueCount: 0, citationsClaimChecked: true,
  reviewer: 'Louis Maxwell', reviewedOn: '2026-01-10',
};

describe('remediation completion gate', () => {
  it('accepts only full evidence', () => expect(gateStatus(full)).toBe('complete'));
  it('rejects 2 images', () => expect(gateStatus({ ...full, images: full.images.slice(0, 2) })).not.toBe('complete'));
  it('rejects duplicate images counted twice', () => expect(gateStatus({ ...full, images: [img('a'), img('a'), img('b')] })).not.toBe('complete'));
  it('rejects 5 images', () => expect(gateStatus({ ...full, images: ['a', 'b', 'c', 'd', 'e'].map((f) => img(f)) })).not.toBe('complete'));
  it('rejects unlicensed image', () => expect(gateStatus({ ...full, images: [img('a'), img('b'), img('c', false)] })).not.toBe('complete'));
  it('rejects no citations', () => expect(gateStatus({ ...full, citationCount: 0 })).not.toBe('complete'));
  it('rejects unchecked citations', () => expect(gateStatus({ ...full, citationsClaimChecked: false })).not.toBe('complete'));
  it('rejects placeholder reviewer', () => expect(gateBlockers({ ...full, reviewer: 'Sarah Jennings PH123456' })).toContain('review: no named human reviewer'));
  it('rejects missing or future date', () => {
    expect(gateStatus({ ...full, reviewedOn: null })).not.toBe('complete');
    expect(gateStatus({ ...full, reviewedOn: '2999-01-01' })).not.toBe('complete');
  });
});

describe('PDF export across every published guide', () => {
  const dir = 'src/content/blog/posts';
  const posts = readdirSync(dir).map((f) => JSON.parse(readFileSync(`${dir}/${f}`, 'utf8'))).filter((p) => p.is_published);
  const page = readFileSync('src/pages/BlogPost.tsx', 'utf8');
  it('BlogPost renders the download control unconditionally', () => {
    expect(page).toMatch(/<BlogPdfDownload\s/);
    expect(page.slice(0, page.indexOf('<BlogPdfDownload')).split('\n').slice(-3).join('')).not.toMatch(/&&\s*\($/);
  });
  it('builds non-empty text for every guide', () => {
    expect(posts.length).toBeGreaterThan(600);
    for (const p of posts) {
      const t = buildArticlePdfText({ html: p.content ?? '', origin: 'https://livingwitharthritis.org.uk', disclaimer: 'x' });
      expect(t.trim().length, p.slug).toBeGreaterThan(200);
    }
  });
});
