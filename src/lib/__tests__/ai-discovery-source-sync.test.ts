import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
// @ts-expect-error Node build helper is plain JavaScript.
import { buildDiscovery } from '../../../scripts/generate-ai-discovery.mjs';
// @ts-expect-error Node build helper is plain JavaScript.
import { buildBlogSections, buildHeadDataSections } from '../../../scripts/generate-llms-full.mjs';

const read = (path: string) => readFileSync(path, 'utf8');

describe('source-aligned AI discovery', () => {
  it('keeps the three discovery entry points identical and removes old review guarantees', () => {
    const text = read('public/llms.txt');
    expect(read('public/ai.txt')).toBe(text);
    expect(read('public/.well-known/llms.txt')).toBe(text);
    expect(text).not.toMatch(/gold-pass|free, clinically reviewed guidance|4\/10 pain rule/i);
    expect(text).toContain('Living With Arthritis (charity 1218461)');
    expect(text).toContain('Independent of Arthritis UK');
    expect(text).toContain('PH128483');
    expect(text).toContain('not a clinical-review certificate');
  });

  it('uses the latest published answers for corrected articles rather than stale manual summaries', () => {
    const text = read('public/llms.txt');
    for (const slug of ['vitamin-d-arthritis-uk', 'turmeric-curcumin-arthritis-evidence', 'arthritis-and-omega-3-fish-oil', 'arthritis-and-weight-loss-uk']) {
      const post = JSON.parse(read(`src/content/blog/posts/${slug}.json`));
      expect(text).toContain(post.direct_answer);
      expect(text).toContain(`https://livingwitharthritis.org.uk/blog/${slug}`);
      if (post.editorial_review_note) expect(text).toContain(post.editorial_review_note);
    }
    expect(text).toContain('Author self-review: Louis Maxwell; 2026-11-26');
  });

  it('does not invent a review, author or update date when the source has none', () => {
    const posts = [{ slug: 'vitamin-d-arthritis-uk', title: 'Example', direct_answer: 'Exact source answer.' }];
    const result = buildDiscovery({ posts, routes: {}, priorityAnswers: {} });
    expect(result).toContain('Exact source answer.');
    expect(result).not.toContain('Updated:');
    expect(result).not.toContain('Recorded clinical review:');
    const digest = buildBlogSections(posts).join('\n');
    expect(digest).not.toContain('Last updated:');
    expect(digest).not.toContain('2026-07-01');
  });

  it('keeps CKS-dependent articles as navigation only while source permissions are reviewed', () => {
    const digest = buildBlogSections([{
      slug: 'example-source-review', title: 'Example', direct_answer: 'Restricted-source summary.',
      key_takeaways: ['Restricted-source takeaway.'],
      citations: [{ url: 'https://cks.nice.org.uk/topics/example/', name: 'CKS' }],
    }]).join('\n');
    expect(digest).toContain('https://livingwitharthritis.org.uk/blog/example-source-review');
    expect(digest).not.toContain('Restricted-source');
    expect(digest).not.toContain('cks.nice.org.uk');
    expect(digest).toContain('Navigation only.');
  });

  it('keeps known non-blog CKS dependencies navigation-only too', () => {
    const digest = buildHeadDataSections({ '/conditions/osteoarthritis': {
      title: 'Example', question: 'Question?', answer: 'Unreviewed dependency answer.',
      sources: [{ url: 'https://cks.nice.org.uk/topics/example/' }],
    } }).join('\n');
    expect(digest).toContain('URL: https://livingwitharthritis.org.uk/conditions/osteoarthritis');
    expect(digest).not.toContain('Unreviewed dependency answer.');
    expect(digest).not.toContain('cks.nice.org.uk');
  });

  it('does not duplicate a redirect source or assert MedicalOrganization status', () => {
    const text = read('public/llms.txt');
    expect(text).not.toContain('URL: https://livingwitharthritis.org.uk/blog/knee-exercises-for-osteoarthritis\n');
    const facts = JSON.parse(read('public/answer-engine.json'));
    expect(facts.mainEntity['@type']).not.toContain('MedicalOrganization');
    expect(facts.usageGuidance.reviewStatus).toContain('page-specific');
  });
});
