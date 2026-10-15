'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const { readFileSync } = require('node:fs');
const { dirname, join } = require('node:path');
const braces = require('../vendor/braces');

const rejected = fn => assert.throws(fn, error =>
  error instanceof RangeError && error.code === 'BRACES_MAX_DEPTH' &&
  !/call stack/i.test(error.message));

for (const method of ['parse', 'compile', 'expand', 'stringify']) {
  test(`${method} rejects deeply nested braces, parentheses and mixed patterns`, () => {
    for (const [open, close] of [['{', '}'], ['(', ')'], ['{(', ')}']]) {
      const pattern = open.repeat(2000) + 'a,b' + close.repeat(2000);
      assert.ok(pattern.length < 10000); // Below upstream's character limit.
      rejected(() => braces[method](pattern));
      rejected(() => braces[method](open.repeat(2000)));
      rejected(() => braces[method](pattern, { expand: true }));
      rejected(() => braces[method](pattern, { maxDepth: Infinity }));
    }
  });
}

for (const method of ['compile', 'expand', 'stringify']) {
  test(`${method} bounds preconstructed AST traversal`, () => {
    const root = { type: 'root', nodes: [] };
    let node = root;
    for (let i = 0; i < 2000; i++) {
      const child = { type: 'paren', nodes: [], parent: node };
      node.nodes.push(child);
      node = child;
    }
    node.nodes.push({ type: 'text', value: 'a', parent: node });
    rejected(() => braces[method](root));
    const cyclic = { type: 'root', nodes: [] };
    cyclic.nodes.push(cyclic);
    rejected(() => braces[method](cyclic));
  });
}

test('nesting boundary is enforced before building a deeper AST', () => {
  const allowed = '{'.repeat(127) + 'a' + '}'.repeat(127);
  assert.equal(braces.stringify(allowed), allowed);
  assert.doesNotThrow(() => braces.compile(allowed));
  assert.deepEqual(braces.expand(allowed), [allowed]);
  rejected(() => braces.parse('{'.repeat(128) + 'a' + '}'.repeat(128)));
});

test('normal glob patterns, ranges and escaped literal braces retain their behavior', () => {
  assert.equal(braces.compile('src/**/*.{ts,tsx}'), 'src/**/*.(ts|tsx)');
  assert.deepEqual(braces.expand('a/{b,{c,d}}/{1..3}'), [
    'a/b/1', 'a/b/2', 'a/b/3', 'a/c/1', 'a/c/2', 'a/c/3', 'a/d/1', 'a/d/2', 'a/d/3',
  ]);
  assert.deepEqual(braces.expand('{01..03}'), ['01', '02', '03']);
  assert.deepEqual(braces.expand('{a,a,b}', { nodupes: true }), ['a', 'b']);
  assert.equal(braces.stringify('\\{a,b\\}'), '{a,b}');
  assert.doesNotThrow(() => braces.parse('\\{'.repeat(2000)));
  assert.doesNotThrow(() => braces.parse('"' + '{'.repeat(2000) + '"'));
  assert.doesNotThrow(() => braces.parse('[' + '{'.repeat(2000) + ']'));
  assert.throws(() => braces.expand('{1..10000}'), /range limit/);
  assert.throws(() => braces.parse('a'.repeat(10001)), /max characters/);
});

test('every installed consumer uses the patched fork', () => {
  for (const consumer of ['micromatch', 'chokidar']) {
    const consumerRequire = createRequire(require.resolve(consumer));
    const installed = consumerRequire('braces');
    const installedRoot = dirname(consumerRequire.resolve('braces'));
    for (const file of ['lib/depth.js', 'lib/parse.js', 'lib/compile.js', 'lib/expand.js', 'lib/stringify.js']) {
      assert.equal(readFileSync(join(installedRoot, file), 'utf8'),
        readFileSync(join(__dirname, '../vendor/braces', file), 'utf8'));
    }
    assert.equal(consumerRequire('braces/package.json').name, '@livingwitharthritis/braces');
    rejected(() => installed.compile('{'.repeat(2000) + 'a,b' + '}'.repeat(2000)));
  }
  const micromatch = require('micromatch');
  assert.deepEqual(micromatch(['a.ts', 'b.tsx', 'c.js'], '*.{ts,tsx}'), ['a.ts', 'b.tsx']);
});
