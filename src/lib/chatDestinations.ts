/* Only known, checked internal destinations get friendly labels. Preserve the
   exact href, including aliases, and leave existing Markdown links untouched. */
export const CHAT_DESTINATION_LABELS: Readonly<Record<string, string>> = {
  '/conditions/arthritis': 'Arthritis types and treatments',
  '/conditions/osteoarthritis': 'Osteoarthritis guide',
  '/conditions/rheumatoid-arthritis': 'Rheumatoid arthritis guide',
  '/library': 'Browse the health library',
  '/living-with-arthritis': 'Living with arthritis guide',
  '/library/arthritis': 'Understanding arthritis',
  '/guides/exercise': 'Exercise guide',
  '/exercises': 'Free exercise routines',
  '/guides/arthritis-pain-relief': 'Pain relief guide',
  '/guides/diet': 'Diet and nutrition guide',
  '/diet': 'Diet and nutrition guide',
  '/supplements': 'Supplement evidence and safety',
  '/benefits-pip': 'PIP and benefits guide',
  '/guides/benefits-pip': 'PIP and benefits guide',
  '/arthritis-flare-ups': 'Managing flare-ups',
  '/arthritis-mental-health': 'Mental health support',
  '/guides/painkillers-and-nsaids': 'Painkillers and NSAIDs guide',
  '/guides': 'Browse arthritis guides',
  '/blog': 'Browse arthritis articles',
  '/about': 'About Living With Arthritis',
  '/contact': 'Contact the charity',
};

type MarkdownNode = { type: string; value?: string; url?: string; children?: MarkdownNode[] };

export function remarkChatDestinations() {
  return (tree: MarkdownNode) => {
    function visit(node: MarkdownNode) {
      if (!node.children || ['link', 'linkReference', 'code', 'inlineCode', 'html'].includes(node.type)) return;
      node.children = node.children.flatMap(child => {
        if (child.type !== 'text' || !child.value) { visit(child); return [child]; }
        const text = child.value;
        const parts: MarkdownNode[] = [];
        let offset = 0;
        for (const match of text.matchAll(/\/[a-z][a-z0-9/-]*/g)) {
          const href = match[0], start = match.index!;
          const label = CHAT_DESTINATION_LABELS[href];
          // Never alter a fragment of an external URL, word, query or fragment.
          if (!label || (start > 0 && !/[\s(]/.test(text[start - 1])) || /[?#]/.test(text[start + href.length] || '')) continue;
          if (start > offset) parts.push({ type: 'text', value: text.slice(offset, start) });
          parts.push({ type: 'link', url: href, children: [{ type: 'text', value: label }] });
          offset = start + href.length;
        }
        if (!offset) return [child];
        if (offset < text.length) parts.push({ type: 'text', value: text.slice(offset) });
        return parts;
      });
    }
    visit(tree);
  };
}
