// Shared by the browser and static HTML so readers and crawlers see the same peers.
// Knee, hip and other joint words must retain their topic weight.
const JOINTS = new Set(["knee", "hip", "hand", "wrist", "shoulder", "foot", "ankle", "back", "neck"]);
const STOP = new Set('arthritis guide guides living life with your what when which where how from that this have about more help support practical explained understanding best people adults adult symptoms treatment treatments management managing uk nhs and for the are can you'.split(' '));
const terms = post => new Set(`${post.title || ''} ${post.keywords || ''}`.toLowerCase().match(/[a-z][a-z0-9-]{2,}/g)?.filter(t => !STOP.has(t)).map(t => t.replace(/s$/, '')) || []);
const indexes = new WeakMap();
function getIndex(catalog) {
  if (indexes.has(catalog)) return indexes.get(catalog);
  const counts = new Map();
  const entries = catalog.map(post => ({ post, tokens: terms(post), titleTerms: terms({ title: post.title }) }));
  for (const { tokens } of entries) for (const term of tokens) counts.set(term, (counts.get(term) || 0) + 1);
  const index = { entries, counts };
  indexes.set(catalog, index);
  return index;
}
export function relatedBlogPosts(current, catalog, limit = 3) {
  if (!current) return [];
  const seed = terms(current);
  const sourceTitle = terms({ title: current.title });
  const sourceJoints = [...sourceTitle].filter(t => JOINTS.has(t));
  const { entries, counts } = getIndex(catalog);
  return entries.filter(({ post }) => post.slug !== current.slug).map(({ post, tokens, titleTerms }) => {
    let score = post.category === current.category ? 1 : 0;
    for (const term of seed) if (tokens.has(term)) score += Math.log(1 + catalog.length / Math.max(1, (counts.get(term) || 1) - (seed.has(term) ? 1 : 0))) * (JOINTS.has(term) ? 3 : 1);
    for (const term of sourceTitle) if (titleTerms.has(term)) score += JOINTS.has(term) ? 15 : 4;
    if (sourceJoints.length && !sourceJoints.some(t => titleTerms.has(t))) score *= 0.25;
    return { post, score };
  }).sort((a, b) => b.score - a.score || a.post.slug.localeCompare(b.post.slug)).slice(0, limit).map(x => x.post);
}
