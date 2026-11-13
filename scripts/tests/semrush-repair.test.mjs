import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { finalizeTechnicalHead } from '../lib/technical-head.mjs';
import { rewriteHead, headDataFor, buildJsonLd, collectRoutes } from '../inject-canonicals.mjs';
import { deriveHeadData } from '../route-head-fallback.mjs';
import { patchEnglishAlternates } from '../lib/english-alternates.mjs';
import { buildCityHubHtml } from '../write-city-hub-html.mjs';
import { CITY_HUBS } from '../seo-redirect-map.mjs';
const BASE = 'https://livingwitharthritis.org.uk';
const template = readFileSync('index.html', 'utf8');

function jsonLdNodes(html) {
  const nodes = [];
  const lower = html.toLowerCase();
  let from = 0;
  while (from < html.length) {
    const open = lower.indexOf('<script', from);
    if (open < 0) break;
    const start = html.indexOf('>', open);
    const close = lower.indexOf('</script>', start);
    if (start < 0 || close < 0) break;
    const raw = html.slice(start + 1, close).trim();
    if (raw.startsWith('{')) nodes.push(JSON.parse(raw));
    from = close + '</script>'.length;
  }
  return nodes;
}
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
test('about prerendered head uses the square logo, not the landscape share image', () => {
  const logo = `${BASE}/brand/lwa-logo-square-720.png`;
  const html = rewriteHead(template, '/about');
  const meta = (key) => html.match(new RegExp(`(?:property|name)="${key}" content="([^"]*)"`))?.[1];
  assert.equal(meta('og:image'), logo);
  assert.equal(meta('og:image:secure_url'), logo);
  assert.equal(meta('twitter:image'), logo);
  assert.equal(meta('og:image:width'), '720');
  assert.equal(meta('og:image:height'), '720');
  assert.equal(meta('og:image:alt'), 'Living With Arthritis logo');
  assert.equal(meta('twitter:image:alt'), 'Living With Arthritis logo');
  assert.equal(meta('twitter:card'), 'summary');
  const forced = finalizeTechnicalHead('<head></head>', '/about', {
    title: 'About', description: 'About the charity.', ogImage: `${BASE}/og/landing-share.png`,
  }, BASE);
  assert.equal(forced.match(/property="og:image" content="([^"]*)"/)?.[1], logo);
  const page = jsonLdNodes(buildJsonLd('/about', `${BASE}/about`, headDataFor('/about')))
    .find((node) => node['@type'] === 'AboutPage');
  assert.equal(page.image.url, logo);
  assert.equal(page.image.width, 720);
  assert.equal(page.image.height, 720);
  assert.equal(page.primaryImageOfPage.url, logo);
});

test('fallback heads do not claim what people most often ask', () => {
  for (const route of ['/chat', '/blog-hub', '/library', '/sources', '/guides/unknown-topic', '/daily-tips/example']) {
    const data = deriveHeadData(route);
    assert.ok(data, route);
    assert.doesNotMatch(`${data.title} ${data.description} ${data.answer}`, /most often ask about/i);
    assert.doesNotMatch(data.title, /\| Guide$/);
  }
});

test('chat, blog hub, library and sources have page-specific heads', () => {
  const expected = {
    '/chat': /Help &amp; Support Chat/,
    '/blog-hub': /Advice Hub/,
    '/library': /Health Library/,
    '/sources': /Clinical Sources &amp; Evidence/,
  };
  for (const [route, title] of Object.entries(expected)) {
    const html = rewriteHead(template, route);
    const pageTitle = html.match(/<title>([^<]*)<\/title>/)?.[1] || '';
    const description = html.match(/name="description" content="([^"]*)"/)?.[1] || '';
    assert.match(pageTitle, title, route);
    assert.doesNotMatch(pageTitle, /\| Guide$/);
    assert.doesNotMatch(description, /most often ask about/i);
    assert.doesNotMatch(description, /^Chat\./);
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