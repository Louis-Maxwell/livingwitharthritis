import { ToolError, defineTool } from '@lovable.dev/mcp-js';
import { z } from 'zod';
import { SAFETY_NOTE, allGuides, guideUrl, htmlToText } from '../content';

const MAX_CHARS = 20000;

export default defineTool({
  name: 'get_guide',
  title: 'Read an arthritis guide',
  description:
    'Fetch the full readable text of one published Living With Arthritis UK guide, using the slug returned by search_guides.',
  inputSchema: {
    slug: z
      .string()
      .trim()
      .min(1)
      .describe('The guide slug, e.g. "physiotherapy-arthritis".'),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ slug }, ctx) => {
    const guide = allGuides().find((entry) => entry.slug === slug);
    if (!guide) {
      throw new ToolError(
        `No published guide has the slug "${slug}". Use search_guides to find a valid slug.`,
      );
    }

    const url = guideUrl(slug);
    const response = await fetch(url, {
      headers: { Accept: 'text/html' },
      signal: ctx.signal,
    });

    if (!response.ok) {
      throw new ToolError(`Could not load ${url} (HTTP ${response.status}).`);
    }

    const text = htmlToText(await response.text()).slice(0, MAX_CHARS);

    return {
      content: [
        {
          type: 'text',
          text: `${guide.title}\n${url}\n\n${text}\n\n${SAFETY_NOTE}`,
        },
      ],
      structuredContent: { slug, title: guide.title, url, category: guide.category },
    };
  },
});
