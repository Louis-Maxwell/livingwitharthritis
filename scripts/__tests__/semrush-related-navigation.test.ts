import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import related from '../../src/data/relatedNavigationLinks.json';
import {headDataFor,rewriteHead} from '../inject-canonicals.mjs';
import {EXACT_SEO_REDIRECTS,BLOG_SLUG_REDIRECTS} from '../seo-redirect-map.mjs';
const data=related as Record<string,{href:string;title:string}[]>;
const redirects=new Set([...Object.keys(EXACT_SEO_REDIRECTS),...Object.keys(BLOG_SLUG_REDIRECTS).map(x=>'/blog/'+x)]);
const template=readFileSync('index.html','utf8');
describe('bounded related navigation',()=>{
 it('uses existing self-canonical indexable pages without self-links, redirects or duplicate destinations',()=>{
  for(const[path,rows]of Object.entries(data)){
   expect(rows.length,path).toBeGreaterThan(0);expect(rows.length,path).toBeLessThanOrEqual(6);
   expect(new Set(rows.map(x=>x.href)).size,path).toBe(rows.length);
   for(const row of rows){expect(row.href,path).not.toBe(path);expect(redirects.has(row.href),row.href).toBe(false);expect(row.title.trim()).not.toBe('');const head=headDataFor(row.href);expect(head,row.href).toBeTruthy();expect(head.noindex,row.href).not.toBe(true);}
  }
 });
 it('includes every selected link in initial crawler HTML as well as the shared React data',()=>{
  for(const[path,rows]of Object.entries(data)){const html=rewriteHead(template,path);for(const row of rows)expect(html,path+' → '+row.href).toContain('href="'+row.href+'"');}
 });
 it('retains the original glossary hub navigation',()=>{
  expect(headDataFor('/glossary/pain-scale').relatedLinks.some((x:{path:string})=>x.path==='/glossary')).toBe(true);
 });
});
