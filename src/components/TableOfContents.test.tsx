import { describe, expect, it } from 'vitest';
import { addHeadingIds } from './TableOfContents';
import { sanitizeHtml } from '@/utils/sanitizeHtml';

describe('article keyboard navigation and content reflow', () => {
  it('keeps supplied anchors and generates distinct anchors for repeated and multiline headings', () => {
    const html = addHeadingIds('<h2 id=\'next\'>Next</h2><h2>Next</h2><h2>Next</h2><h3>More\nhelp</h3>');
    expect(html).toContain("id='next'");
    expect(html).toContain('id="next-2"');
    expect(html).toContain('id="next-3"');
    expect(html).toContain('id="more-help"');
  });
  it('retains table captions and header semantics and makes the scroll region keyboard accessible', () => {
    const html = sanitizeHtml('<table><caption>Exercise options</caption><thead><tr><th>Activity</th></tr></thead><tbody><tr><th>Walking</th></tr></tbody></table>');
    expect(html).toContain('<caption>Exercise options</caption>');
    expect(html).toContain('scope="col"');
    expect(html).toContain('scope="row"');
    expect(html).toContain('tabindex="0"');
    expect(html).toContain('aria-label="Scrollable data table"');
  });
});
