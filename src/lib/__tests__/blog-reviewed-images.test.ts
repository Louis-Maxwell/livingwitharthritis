import {describe,it,expect} from 'vitest';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {pickArticleImages,coverFromFile} from '@/lib/articleImagePicks';
import reviewed from '@/data/blog-reviewed-images.json';
import audit from '../../../docs/blog-image-audit-2026-11-24.json';
import covers from '../../../scripts/data/editorial-reviewed-blog-covers.json';

describe('533-blog visual image review',()=>{
 it('records a decision for every original placement',()=>{
  expect(audit.cover_decisions).toHaveLength(533);
  expect(audit.authored_decisions).toHaveLength(82);
  expect(audit.automatic_decisions).toHaveLength(1056);
  expect(audit.covers_replaced).toBe(337);
  expect(audit.automatic_images_removed).toBe(825);
  expect(audit.authored_images_removed).toBe(66);
 });
 it('only adds body images explicitly approved for the exact slug',()=>{
  for(const [slug,images]of Object.entries(reviewed)){
   const post=JSON.parse(readFileSync(`src/content/blog/posts/${slug}.json`,'utf8'));
   const picked=pickArticleImages(coverFromFile(post.cover),post.category,post.title,slug,post.keywords);
   expect(picked.slice(1).map(x=>x.src),slug).toEqual(images.filter(x=>x.src!==`/openverse/${post.cover}`).map(x=>x.src));
   for(const image of images)expect(existsSync(`public${image.src}`),image.src).toBe(true);
  }
  const cover=coverFromFile('unknown.webp');
  expect(pickArticleImages(cover,'Exercise','Pilates hip exercises','unreviewed-new-post')).toEqual([cover]);
 });
 it('removes unrelated authored images and their misleading captions',()=>{
  for(const row of audit.authored_decisions.filter(x=>x.decision.startsWith('remove'))){
   const post=JSON.parse(readFileSync(`src/content/blog/posts/${row.slug}.json`,'utf8'));
   expect(post.content,row.slug).not.toContain(row.src);
  }
 });
 it('materializes exact unique branded cover bytes',()=>{
  expect(Object.keys(covers)).toHaveLength(337);
  for(const [name,asset]of Object.entries(covers)){
   const bytes=readFileSync(`public/openverse/${name}`);
   expect(createHash('sha256').update(bytes).digest('hex'),name).toBe(asset.sha256);
   expect(bytes.length).toBeGreaterThan(2048);
  }
 });
});
