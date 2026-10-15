'use strict';

// Fixed ceiling: caller-supplied options cannot disable this security bound.
const MAX_DEPTH = 128;
const assertDepth = depth => {
  if (depth > MAX_DEPTH) {
    const error = new RangeError(`Brace pattern exceeds maximum nesting depth (${MAX_DEPTH})`);
    error.code = 'BRACES_MAX_DEPTH';
    throw error;
  }
};

module.exports = { MAX_DEPTH, assertDepth };
