'use strict';

// Keep recursive walkers well below the JavaScript call-stack limit.
const MAX_DEPTH = 128;
const assertDepth = ast => {
  const stack = [{ node: ast, depth: 0 }];
  const seen = new Set();
  while (stack.length) {
    const { node, depth } = stack.pop();
    if (depth >= MAX_DEPTH || seen.has(node)) {
      throw new SyntaxError('Brace AST exceeds maximum nesting depth or contains a cycle');
    }
    seen.add(node);
    if (node && Array.isArray(node.nodes)) {
      for (const child of node.nodes) stack.push({ node: child, depth: depth + 1 });
    }
  }
};
module.exports = assertDepth;
module.exports.MAX_DEPTH = MAX_DEPTH;
