// Non-destructive audit: which published guides get fewer than 2 topic-matched
// inline pictures. Writes docs/audits/blog-image-gaps.json; changes no content.
import { writeFileSync, mkdirSync } from 'node:fs';
import { readAllBlogPosts } from './lib/blog-posts.mjs';
import { isStrictTopicMatch } from '../src/lib/blog/articleLayout';
import { coverFromFile, pickArticleImages } from '../src/lib/articleImagePicks';

const posts = readAllBlogPosts().filter((p: { is_published?: boolean }) => p.is_published);
const rows = posts.map((p: any) => {
  const picks = pickArticleImages(coverFromFile(p.cover), p.category, p.title, p.slug, p.keywords).slice(1);
  // Strict relevance: picture filename must share a 4+ letter word with the
  // guide's slug/title (category-bucket matches alone do not count).
  const strict = picks.filter((i) => isStrictTopicMatch(i.src, p.slug, p.title));
  return { slug: p.slug, category: p.category, inline: strict.length, shown: picks.length, panelCover: /lwa-panel-/.test(p.cover ?? '') };
});
const gaps = rows.filter((r: any) => r.inline < 2).sort((a: any, b: any) => a.inline - b.inline);
const summary = {
  generated: new Date().toISOString().slice(0, 10),
  published: rows.length,
  withThreeInline: rows.filter((r: any) => r.inline >= 3).length,
  withTwoInline: rows.filter((r: any) => r.inline === 2).length,
  withOneInline: rows.filter((r: any) => r.inline === 1).length,
  withNoInline: rows.filter((r: any) => r.inline === 0).length,
  panelCovers: rows.filter((r: any) => r.panelCover).length,
  gapsByCategory: gaps.reduce((acc: Record<string, number>, r: any) => ((acc[r.category] = (acc[r.category] ?? 0) + 1), acc), {}),
  gaps,
};
mkdirSync('docs/audits', { recursive: true });
writeFileSync('docs/audits/blog-image-gaps.json', JSON.stringify(summary, null, 2) + '\n');
const { gaps: _g, ...counts } = summary;
console.log(JSON.stringify(counts, null, 2));
