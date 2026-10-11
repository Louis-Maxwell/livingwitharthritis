import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { normalizeStaticMeta } from '../lib/meta-lengths.mjs';
import { patchShareMeta } from '../inject-canonicals.mjs';

test('crawler title preserves the subject before shortening the brand', () => {
  const data = normalizeStaticMeta({
    title: 'Arthritis Medicines Explained: A Plain-English UK Guide | Living With Arthritis',
    description: 'Read about arthritis medicines.',
    bodyHtml: '<p>Full article remains intact.</p>',
  });
  assert.equal(data.title, 'Arthritis Medicines Explained: A Plain-English UK Guide');
  assert.equal(data.bodyHtml, '<p>Full article remains intact.</p>');
});

test('long crawler copy ends on a word boundary within the limits', () => {
  const data = normalizeStaticMeta({ title: 'A useful arthritis guide '.repeat(8), description: 'Practical arthritis support for UK readers. '.repeat(8) });
  assert.ok(data.title.length <= 60);
  assert.ok(data.description.length <= 160);
  assert.ok(data.description.endsWith('…'));
});

test('existing snapshots refresh search and social metadata consistently', () => {
  const head = '<title>Old</title><meta property="og:title" content="Old"><meta name="twitter:title" content="Old"><meta name="description" content="Old"><meta property="og:description" content="Old"><meta name="twitter:description" content="Old">';
  const data = { title: 'Arthritis Medicines Explained: A Plain-English UK Guide | Living With Arthritis', description: 'Useful UK guidance. '.repeat(15) };
  const expected = normalizeStaticMeta(data);
  const updated = patchShareMeta(head, data);
  assert.equal(updated.split(expected.title).length - 1, 3);
  assert.equal(updated.split(expected.description).length - 1, 3);
});

test('homepage HTML has one H1 before JavaScript removes the boot shell', () => {
  const html = readFileSync('index.html', 'utf8');
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.ok(html.includes('id="boot-hero"'));
});
