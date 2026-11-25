import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { readableParagraphs } from '../readableParagraphs.mjs';
const normalise = (value: string) => value.replace(/\s+/g, ' ').trim();
describe('plain-text answer paragraph formatting', () => {
  it('leaves short answers and indivisible long sentences intact', () => {
    expect(readableParagraphs('A short answer.')).toEqual(['A short answer.']);
    expect(readableParagraphs('')).toEqual([]);
    expect(readableParagraphs('One sentence without a stop', 2)).toEqual(['One sentence without a stop']);
  });
  it('preserves every answer word and sentence across the full blog source inventory', () => {
    let longAnswers = 0;
    for (const file of readdirSync('src/content/blog/posts').filter(file => file.endsWith('.json'))) {
      const post = JSON.parse(readFileSync(`src/content/blog/posts/${file}`, 'utf8'));
      const answer = post.direct_answer || '';
      const groups = readableParagraphs(answer);
      expect(normalise(groups.join(' ')), file).toBe(normalise(answer));
      if (answer.trim().split(/\s+/).length > 100) {
        longAnswers++;
        expect(groups.length, file).toBeGreaterThan(1);
        expect(Math.max(...groups.map(group => group.split(/\s+/).length)), file).toBeLessThanOrEqual(100);
      } else expect(groups.length).toBeLessThanOrEqual(1);
    }
    expect(longAnswers).toBe(38);
  });
});
