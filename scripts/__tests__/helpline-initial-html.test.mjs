import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { rewriteHead } from '../inject-canonicals.mjs';

const template = readFileSync('index.html', 'utf8');
const removedPromises = /(?:2|two) working days|trained people|9am|9–5/;

describe('Approved helpline wording reaches initial HTML', () => {
  for (const route of ['/helpline', '/contact', '/healthcare-professionals']) {
    it(`does not reintroduce removed service promises on ${route}`, () => {
      const html = rewriteHead(template, route);
      expect(html).not.toMatch(removedPromises);
    });
  }
  it('keeps the approved helpline description and scope before hydration', () => {
    const html = rewriteHead(template, '/helpline');
    expect(html).toContain('Individual advice about your diagnosis and benefits, and help finding information on this website.');
    expect(html).toContain('Call 07760 512 084 on weekdays to reach our helpline');
    expect(html).toContain("We don't advise on medicines.");
    expect(html).toMatch(/<meta name="description" content="UK arthritis helpline/);
  });
});
