import { parse } from 'parse5';

/** Read text for audit comparisons. This is not an HTML sanitizer. */
export function auditVisibleText(html) {
  const root = parse(String(html));
  const chunks = [];
  function visit(node) {
    if (node.tagName === 'script' || node.tagName === 'style' || node.tagName === 'template') return;
    if (node.nodeName === '#text') chunks.push(node.value);
    for (const child of node.childNodes || []) visit(child);
  }
  visit(root);
  return chunks.join(' ').replace(/\s+/g, ' ').trim();
}
