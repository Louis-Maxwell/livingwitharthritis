import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parse } from 'parse5';
import { rewriteHead, buildJsonLd, headDataFor } from '../inject-canonicals.mjs';
import { buildStaticArticleInner, stripToText } from '../static-article-html.mjs';

function nodes(html, tag) {
  const found = [];
  function visit(n) { if (n.tagName === tag) found.push(n); for (const c of n.childNodes || []) visit(c); }
  visit(parse(html)); return found;
}
const article = { slug: 'fixture', title: 'Full patient-facing title', content: '<h2>How can I start?</h2><p>Choose an activity you can manage and discuss your plan with your care team.</p>',
  author: 'Louis Maxwell', author_credentials: 'First Contact Practitioner, HCPC PH128483',
  reviewed_by: 'Louis Maxwell', reviewer_credentials: 'HCPC PH128483', reviewStatus: 'pending',
  date: '2026-10-01', updated_at: '2026-10-11',
  citations: [{ label: 'NHS arthritis', url: 'https://www.nhs.uk/conditions/arthritis/' }] };
const data = { title: 'Short SERP title', description: 'An existing patient guide.', question: 'Short headline', article,
  faqs: [{ q: 'How can I start?', a: 'Choose an activity you can manage and discuss your plan with your care team.' }] };

test('section first-response navigation exposes real glossary child pages', () => {
  const html = buildStaticArticleInner(headDataFor('/glossary'));
  assert.match(html, /href="\/glossary\/dmard"/);
  assert.match(html, /aria-label="Related guides"/);
});
test('existing FAQ source references remain visible without JavaScript', () => {
  const html = buildStaticArticleInner({ question: 'Existing question', sources: [{ name: 'NHS', url: 'https://www.nhs.uk/' }] });
  assert.match(html, /Sources and references/);
  assert.match(html, /href="https:\/\/www.nhs.uk\/"/);
});

test('non-home route output removes the deeply nested homepage shell and preserves the article H1', () => {
  const html = rewriteHead(readFileSync('index.html', 'utf8'), '/blog/fixture', data);
  assert.equal(nodes(html, 'h1').length, 1);
  assert.equal(stripToText(nodes(html, 'h1')[0].childNodes.map((n) => n.value || '').join('')), article.title);
  assert.doesNotMatch(html, /id="boot-hero"/);
  assert.match(html, /Sources and references/);
  assert.match(html, /NHS arthritis/);
  assert.doesNotMatch(html, /id="seo-fallback" aria-hidden/);
});

test('first-response Article schema does not invent a clinical review and links real author profiles', () => {
  const html = buildJsonLd('/blog/fixture', 'https://livingwitharthritis.org.uk/blog/fixture', data);
  const graphs = nodes(html, 'script').map((n) => JSON.parse(n.childNodes[0].value));
  const entry = graphs.find((g) => g['@type'] === 'Article');
  assert.equal(entry.headline, article.title);
  assert.equal(entry.author.url, 'https://livingwitharthritis.org.uk/authors/maxwell');
  assert.equal(entry.reviewedBy, undefined);
  assert.equal(entry.lastReviewed, undefined);
  assert.equal(entry.citation[0].url, article.citations[0].url);
  assert.equal(graphs.find((g) => g['@type'] === 'BreadcrumbList').itemListElement.length, 3);
  const ordinary = buildJsonLd('/donate', 'https://livingwitharthritis.org.uk/donate', { title: 'Donate', description: 'Support the charity.' });
  assert.match(ordinary, /"@type":"WebPage"/);
  assert.doesNotMatch(ordinary, /"@type":"MedicalCondition"/);
});

test('FAQ markup reuses the existing visible question instead of duplicating it', () => {
  const html = buildStaticArticleInner(data);
  assert.equal((html.match(/How can I start\?/g) || []).length, 1);
});

test('structured data cannot be terminated by a source text containing a script end tag', () => {
  const html = buildJsonLd('/blog/fixture', 'https://livingwitharthritis.org.uk/blog/fixture', { ...data, title: '</script><script>alert(1)</script>' });
  assert.equal(nodes(html, 'script').length, 4);
  assert.match(html, /\\u003c\/script>/);
});
