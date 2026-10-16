// Non-destructive audit: which published guides get fewer than 2 topic-matched
// inline pictures. Writes docs/audits/blog-image-gaps.json; changes no content.
import { writeFileSync, mkdirSync } from 'node:fs';
import { readAllBlogPosts } from './lib/blog-posts.mjs';
import { coverFromFile, pickArticleImages } from '../src/lib/articleImagePicks';

const posts = readAllBlogPosts().filter((p: { is_published?: boolean }) => p.is_published);
const rows = posts.map((p: any) => {
  const inline = pickArticleImages(coverFromFile(p.cover), p.category, p.title, p.slug, p.keywords).length - 1;
  return { slug: p.slug, category: p.category, inline, panelCover: /lwa-panel-/.test(p.cover ?? '') };
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
