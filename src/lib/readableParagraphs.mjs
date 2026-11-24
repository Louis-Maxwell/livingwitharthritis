/** Break long plain-text answers at existing sentence boundaries. No words added or removed. */
export function readableParagraphs(value, maxWords = 100) {
  const text = String(value ?? '').trim();
  if (!text || text.split(/\s+/).length <= maxWords) return text ? [text] : [];
  const sentences = text.match(/[^.!?]+[.!?]+(?:\s+|$)|[^.!?]+$/g) || [text];
  const groups = [];
  let group = '';
  for (const sentence of sentences) {
    const next = sentence.trim();
    if (group && `${group} ${next}`.split(/\s+/).length > maxWords) {
      groups.push(group);
      group = next;
    } else {
      group = group ? `${group} ${next}` : next;
    }
  }
  if (group) groups.push(group);
  return groups;
}
