import { defineTool } from '@lovable.dev/mcp-js';
import { allGuides } from '../content';

export default defineTool({
  name: 'list_topics',
  title: 'List guide topics',
  description:
    'List the topic categories covered by Living With Arthritis UK guides, with how many published guides each one has.',
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const counts = new Map<string, number>();
    for (const guide of allGuides()) {
      counts.set(guide.category, (counts.get(guide.category) ?? 0) + 1);
    }

    const topics = [...counts.entries()]
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));

    const text = topics.map((topic) => `${topic.category} — ${topic.count} guides`).join('\n');

    return {
      content: [{ type: 'text', text }],
      structuredContent: { topics },
    };
  },
});
