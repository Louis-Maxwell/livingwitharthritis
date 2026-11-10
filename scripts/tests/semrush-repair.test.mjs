import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { finalizeTechnicalHead } from '../lib/technical-head.mjs';
import { rewriteHead, headDataFor, collectRoutes } from '../inject-canonicals.mjs';
import { patchEnglishAlternates } from '../lib/english-alternates.mjs';
import { buildCityHubHtml } from '../write-city-hub-html.mjs';
import { CITY_HUBS } from '../seo-redirect-map.mjs';
const BASE = 'https://livingwitharthritis.org.uk';
const template = readFileSync('index.html', 'utf8');
test('every static route has its own complete, singular social metadata', () => {
  for (const route of collectRoutes().filter((r) => !/\.[a-z]+$/.test(r))) {
    const html = rewriteHead(template, route);
    for (const key of ['og:title','og:description','og:url','og:image','og:type',
      'twitter:card','twitter:title','twitter:description','twitter:image']) {
      assert.equal([...html.matchAll(new RegExp(`(?:property|name)="${key}"`, 'g'))].length, 1, `${route}: ${key}`);
    }
    assert.ok(html.includes(`content="${BASE}${route}"`), `${route}: og/canonical url`);
    assert.doesNotMatch(html, /"speakable"/);
    assert.doesNotMatch(html, /Living With Arthritis UK/);
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1, route);
  }
});
test('query URLs never receive hreflang annotations', () => {
  assert.doesNotMatch(patchEnglishAlternates('<head><link rel="alternate" hreflang="en-GB" href="old"></head>', '/blog/category/exercise?q=x', BASE), /hreflang=/);
});
test('each city output has self-referencing English/default alternates', () => {
  for (const city of CITY_HUBS) {
    const html = buildCityHubHtml(city);
    assert.ok(html.includes(`hreflang="en-GB" href="${BASE}/arthritis-support/${city.slug}"`), city.slug);
    assert.match(html, /hreflang="x-default"/);
  }
});
test('head repair works on missing or duplicate tags and preserves the body', () => {
  const html = finalizeTechnicalHead('<head><meta property="og:title" content="Home"><meta property="og:title" content="Home"></head><body>Existing article</body>', '/guides/test', { title: 'Existing title', description: 'Existing description' }, BASE);
  assert.equal([...html.matchAll(/property="og:title"/g)].length, 1);
  assert.match(html, /Existing article/);
});
test('reported crawl failures have real static content, not not-found shells', () => {
  for (const path of ['/arthritis-mental-health','/arthritis-support/coventry',
    '/blog/arthritis-treatment-hub','/blog/best-exercises-osteoarthritis-knee-pain-home']) {
    const data = headDataFor(path);
    assert.ok(data && !data.noindex && !data.title.includes('Page not found'), path);
    assert.ok(data.article?.content || data.bodyHtml || data.answer, path);
  }
});