import test from 'node:test';
import assert from 'node:assert/strict';
import { imageSitemap, registerImageSitemap } from '../generate-media-sitemap.mjs';
import { conditionTopicLinks } from '../condition-topic-links.mjs';
import { articleJsonLd, ensureArticleJsonLd } from '../article-jsonld.mjs';

test('media sitemap includes only pages with existing image entries and preserves XML escaping', () => {
  const xml = '<urlset><url><loc>https://example.org/one</loc><image:image><image:loc>https://example.org/a.jpg?x=1&amp;y=2</image:loc></image:image></url><url><loc>https://example.org/two</loc></url></urlset>';
  const result = imageSitemap(xml);
  assert.ok(result.includes('<loc>https://example.org/one</loc>'));
  assert.ok(!result.includes('<loc>https://example.org/two</loc>'));
  assert.match(result, /x=1&amp;y=2/);
  const once = registerImageSitemap('<sitemapindex></sitemapindex>');
  assert.equal(registerImageSitemap(once), once);
});

test('initial article HTML links a named condition to its hub without linking unrelated content', () => {
  assert.match(conditionTopicLinks({ slug: 'rheumatoid-arthritis-exercises', title: 'Exercise with rheumatoid arthritis' }), /href="\/conditions\/rheumatoid-arthritis"/);
  assert.equal(conditionTopicLinks({ slug: 'pip-evidence', title: 'PIP evidence' }), '');
  assert.equal(conditionTopicLinks(undefined), '');
});

test('Article data ties real authors and dates to the page without inventing review approval', () => {
  const data = { article: { slug: 'example', content: 'An article', title: 'Example', author: 'Louis Maxwell', date: '2026-03-01', reviewStatus: 'pending', reviewed_by: 'Maxwell' } };
  const article = articleJsonLd('https://livingwitharthritis.org.uk/blog/example', data);
  assert.equal(article['@type'], 'Article');
  assert.equal(article.author['@type'], 'Person');
  assert.equal(article.datePublished, '2026-03-01');
  assert.ok(!('reviewedBy' in article));
  assert.ok(!('lastReviewed' in article));
  assert.equal(articleJsonLd('https://livingwitharthritis.org.uk/guides', {}), null);
  const once = ensureArticleJsonLd('<head></head>', 'https://livingwitharthritis.org.uk/blog/example', data);
  assert.equal(ensureArticleJsonLd(once, 'https://livingwitharthritis.org.uk/blog/example', data), once);
  const hostile = { article: { ...data.article, title: '</script><script>unsafe()</script>' } };
  const safe = ensureArticleJsonLd('<head></head>', 'https://livingwitharthritis.org.uk/blog/example', hostile);
  assert.ok(!safe.includes('<script>unsafe()'));
});
