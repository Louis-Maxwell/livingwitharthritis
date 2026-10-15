import test from 'node:test';
import assert from 'node:assert/strict';
import { sitemapPageUrls } from '../indexnow-ping.mjs';
test('IndexNow uses deduplicated same-origin page URLs, excluding images and other hosts', () => {
  const xml = `<urlset><url><loc>https://livingwitharthritis.org.uk/blog/example</loc><image:image><image:loc>https://livingwitharthritis.org.uk/cover.webp</image:loc></image:image></url><url><loc>https://livingwitharthritis.org.uk/blog/example</loc></url><url><loc>https://example.org/other</loc></url><url><loc>https://livingwitharthritis.org.uk/search?q=private</loc></url></urlset>`;
  assert.deepEqual(sitemapPageUrls(xml), ['https://livingwitharthritis.org.uk/blog/example']);
});
