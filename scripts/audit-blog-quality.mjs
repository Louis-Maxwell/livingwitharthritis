#!/usr/bin/env node
/** Read-only editorial triage. Never deletes or unpublishes clinical articles. */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
const root = 'src/content/blog/posts';
const files = readdirSync(root).filter(x => x.endsWith('.json'));
const rows = [];
for (const file of files) {
  try {
    const p = JSON.parse(readFileSync(join(root,file),'utf8'));
    const content = String(p.content || '');
    const words = content.replace(/<[^>]+>/g,' ').split(/\s+/).filter(Boolean).length;
    const flags = [];
    if (words < 400) flags.push('thin-content-review');
    if (!p.last_reviewed) flags.push('clinical-review-not-recorded');
    if (!p.cover) flags.push('missing-cover');
    if (!/https?:\/\/|\[[^\]]+\]\(https?:/i.test(content)) flags.push('check-evidence-citations');
    if (!p.meta_description) flags.push('missing-meta-description');
    if (!p.excerpt) flags.push('missing-excerpt');
    rows.push({slug:p.slug||file.replace(/\.json$/,''),title:p.title||'',published:!!p.is_published,words,flags});
  } catch(e) { rows.push({slug:file,title:'',published:false,words:0,flags:['invalid-json']}); }
}
const byTitle = new Map();
for (const r of rows) {
  const key = r.title.trim().toLowerCase();
  if (!key) continue;
  if (byTitle.has(key)) {r.flags.push('duplicate-title-review');byTitle.get(key).flags.push('duplicate-title-review');}
  else byTitle.set(key,r);
}
rows.sort((a,b)=>b.flags.length-a.flags.length||a.slug.localeCompare(b.slug));
mkdirSync('reports',{recursive:true});
writeFileSync('reports/blog-quality-triage.json',JSON.stringify({generatedAt:new Date().toISOString(),total:rows.length,published:rows.filter(x=>x.published).length,flagged:rows.filter(x=>x.flags.length).length,articles:rows},null,2)+'\n');
console.log('Audited '+rows.length+' article files; '+rows.filter(x=>x.flags.length).length+' flagged for human review. No files removed.');
