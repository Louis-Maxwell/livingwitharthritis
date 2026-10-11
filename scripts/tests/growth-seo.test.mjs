import test from 'node:test';
import assert from 'node:assert/strict';
import { imageSitemap, registerImageSitemap } from '../generate-media-sitemap.mjs';
import { conditionTopicLinks } from '../condition-topic-links.mjs';

test('media sitemap includes only pages with existing image entries and preserves XML escaping', () => {
  const xml = '<urlset><url><loc>https://example.org/one</loc><image:image><image:loc>https://example.org/a.jpg?x=1&amp;y=2</image:loc></image:image></url><url><loc>https://example.org/two</loc></url></urlset>';
  const result = imageSitemap(xml);
  assert.match(result, /example.org\/one/);
  assert.doesNotMatch(result, /example.org\/two/);
  assert.match(result, /x=1&amp;y=2/);
  const once = registerImageSitemap('<sitemapindex></sitemapindex>');
  assert.equal(registerImageSitemap(once), once);
});

test('initial article HTML links a named condition to its hub without linking unrelated content', () => {
  assert.match(conditionTopicLinks({ slug: 'rheumatoid-arthritis-exercises', title: 'Exercise with rheumatoid arthritis' }), /href="\/conditions\/rheumatoid-arthritis"/);
  assert.equal(conditionTopicLinks({ slug: 'pip-evidence', title: 'PIP evidence' }), '');
  assert.equal(conditionTopicLinks(undefined), '');
});
