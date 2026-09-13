import { defineTool } from '@lovable.dev/mcp-js';
import { z } from 'zod';
import { SAFETY_NOTE, guideUrl, searchGuides } from '../content';

export default defineTool({
  name: 'search_guides',
  title: 'Search arthritis guides',
  description:
    'Search the published Living With Arthritis UK guides by keyword and return matching titles, summaries and links.',
  inputSchema: {
    query: z
      .string()
      .trim()
      .min(2)
      .describe('Keywords to search for, e.g. "knee exercises" or "PIP benefits".'),
    limit: z
      .number()
      .int()
      .describe('How many results to return (1-20). Defaults to 8.')
      .optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, limit }) => {
    const max = Math.min(Math.max(limit ?? 8, 1), 20);
    const results = searchGuides(query, max);

    if (results.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: `No published guides matched "${query}". Try broader keywords such as "knee", "diet" or "benefits".`,
          },
        ],
      };
    }

    const text = results
      .map(
        (guide) =>
          `${guide.title}\nCategory: ${guide.category}\n${guide.excerpt}\n${guideUrl(guide.slug)}\nslug: ${guide.slug}`,
      )
      .join('\n\n');

    return {
      content: [{ type: 'text', text: `${text}\n\n${SAFETY_NOTE}` }],
      structuredContent: { results },
    };
  },
});
