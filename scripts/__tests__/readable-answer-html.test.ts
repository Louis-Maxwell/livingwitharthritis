import { describe, expect, it } from 'vitest';
import { JSDOM } from 'jsdom';
import { readableParagraphs } from '../../src/lib/readableParagraphs.mjs';
import { buildStaticArticleInner } from '../static-article-html.mjs';
import { readFileSync } from 'node:fs';
describe('static answer readability matches the hydrated formatter', () => {
  it('preserves full answer text and uses the same paragraph groups', () => {
    const post = JSON.parse(readFileSync('src/content/blog/posts/continence-night-trips-arthritis-frailty-uk.json', 'utf8'));
    const answer = post.direct_answer;
    const html = buildStaticArticleInner({ title: post.title, answer, article: { title: post.title, content: '<p>A separate body paragraph.</p>' } });
    const doc = new JSDOM(html).window.document;
    const paras = [...doc.querySelectorAll('.answer-box blockquote > p')].slice(1).map(p => p.textContent);
    expect(paras).toEqual(readableParagraphs(answer));
    expect(paras.length).toBeGreaterThan(1);
  });
});
