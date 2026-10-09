import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const micromatchRequire = createRequire(require.resolve('micromatch'));
const chokidarRequire = createRequire(require.resolve('chokidar'));
const braces = micromatchRequire('braces');

describe('patched braces dependency', () => {
  it('resolves the reviewed local fork for transitive consumers', () => {
    expect(micromatchRequire('braces/package.json').name).toBe('@livingwitharthritis/braces');
    expect(chokidarRequire('braces/package.json').name).toBe('@livingwitharthritis/braces');
  });

  it('preserves normal brace and range expansion', () => {
    expect(braces.expand('src/{pages,components}/*.{ts,tsx}')).toEqual([
      'src/pages/*.ts', 'src/pages/*.tsx', 'src/components/*.ts', 'src/components/*.tsx',
    ]);
    expect(braces.expand('item-{1..3}')).toEqual(['item-1', 'item-2', 'item-3']);
    expect(braces.compile('a/{b,c}/d')).toBe('a/(b|c)/d');
  });

  for (const method of ['parse', 'compile', 'expand', 'stringify']) {
    for (const delimiter of ['{', '(']) {
      it(`${method} rejects deeply nested ${delimiter} patterns before recursive traversal`, () => {
        const closing = delimiter === '{' ? '}' : ')';
        const pattern = delimiter.repeat(10000) + 'a,b' + closing.repeat(10000);
        expect(() => braces[method](pattern)).toThrow(SyntaxError);
      });
    }
  }

  for (const method of ['compile', 'expand', 'stringify']) {
    it(`${method} rejects a deeply nested caller-supplied AST`, () => {
      let ast = { type: 'text', value: 'x' };
      for (let n = 0; n < 10000; n++) ast = { type: 'root', nodes: [ast] };
      expect(() => braces[method](ast)).toThrow(SyntaxError);
    });
    it(`${method} rejects a cyclic caller-supplied AST`, () => {
      const ast = { type: 'root', nodes: [] };
      ast.nodes.push(ast);
      expect(() => braces[method](ast)).toThrow(SyntaxError);
    });
  }
});
