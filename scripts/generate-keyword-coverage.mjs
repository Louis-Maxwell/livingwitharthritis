/** Audit every stored keyword; publish only evidence-backed search aliases and real links. */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { readPublishedBlogPosts } from './lib/blog-posts.mjs';
import { exactRedirects } from './seo-redirect-map.mjs';

export const normalize = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
const stop = new Set('a an the and or for with of to in on is are can how what why when should do does i my uk best near me'.split(' '));
export const tokens = (s) => [...new Set(normalize(s).replace(/[^a-z0-9]+/g, ' ').split(' ').filter(w => w && !stop.has(w)))];
// A token match is a review candidate, never proof that a question is answered.
export function classifyKeyword(keyword, pages, inverted) {
  const words = tokens(keyword);
  if (!words.length) return { status: 'content_gap', target: '', evidence: 'no meaningful terms' };
  const hits = new Map();
  for (const word of words) for (const id of inverted.get(word) ?? []) hits.set(id, (hits.get(id) ?? 0) + 1);
  const candidates = [...hits].filter(([,n]) => n === words.length).map(([id]) => pages[id]);
  const phrase = normalize(keyword);
  const exact = candidates.filter(p => (` ${p.body} `).includes(` ${phrase} `)).sort((a,b) => Number(b.head.includes(phrase))-Number(a.head.includes(phrase)) || a.path.localeCompare(b.path));
  if (exact.length) return { status: 'phrase_present', target: exact[0].path, evidence: 'literal phrase in authored content; intent/clinical review still required' };
  const related = candidates.sort((a,b) => words.filter(w => b.headTokens.has(w)).length-words.filter(w => a.headTokens.has(w)).length || a.path.localeCompare(b.path));
  return related.length ? { status: 'intent_review', target: related[0].path, evidence: 'all significant words present; answer not verified' } : { status: 'content_gap', target: '', evidence: 'no page contains all significant terms' };
}
function parseCsv(text) {
  const rows = []; let row=[],cell='',quoted=false;
  for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){cell+='"';i++;}else quoted=!quoted;}else if(!quoted&&(c===','||c==='\n')){row.push(cell.replace(/\r$/,''));cell='';if(c==='\n'){rows.push(row);row=[];}}else cell+=c;}
  if(cell||row.length){row.push(cell);rows.push(row);}const headers=rows.shift();return rows.filter(r=>r.length===headers.length).map(r=>Object.fromEntries(headers.map((h,i)=>[h,r[i]])));
}
const sources = ['public/data/organic-keywords-living-with-arthritis-2026.json','public/data/keywords-30000.json','public/data/keywords-40000.json','public/data/keywords-arthritis-frailty-msk-disability.generated.json','src/data/keywords.generated.json','keywords_for_import.csv','docs/seo/growth-2026-10-11/keyword-map.csv'];
const strip = s => normalize(String(s ?? '').replace(/<[^>]*>/g,' ').replace(/&[a-z0-9#]+;/gi,' '));
function main(){
 const redirects = new Map(exactRedirects().map(r=>[r.from,r.to]));
 const canonical = p => {let path=String(p??'').replace(/\/$/,'')||'/';const seen=new Set();while(redirects.has(path)&&!seen.has(path)){seen.add(path);path=redirects.get(path);}return path;};
 const sitemap=readFileSync('public/sitemap.xml','utf8');
 const paths=new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname.replace(/\/$/,'')||'/'));
 const posts=readPublishedBlogPosts(); const byPath=new Map();
 for(const post of posts){const path=`/blog/${post.slug}`;if(paths.has(path))byPath.set(path,{path,title:post.title,head:strip(post.title),body:strip(`${post.title} ${post.excerpt} ${post.content}`),keywords:post.keywords});}
 for(const file of ['scripts/condition-head-data.json','scripts/library-head-data.json','scripts/hub-guide-head-data.json'])for(const [path,d] of Object.entries(JSON.parse(readFileSync(file,'utf8'))))if(paths.has(path)&&!byPath.has(path))byPath.set(path,{path,title:d.question||d.title,head:strip(d.question||d.title),body:strip(`${d.question||d.title} ${d.answer||''} ${d.bodyHtml||''} ${(d.faqs||[]).map(f=>f.q+' '+f.a).join(' ')}`)});
 const pages=[...byPath.values()].sort((a,b)=>a.path.localeCompare(b.path));const inverted=new Map();
 pages.forEach((p,id)=>{p.headTokens=new Set(tokens(p.head));for(const t of tokens(p.body)){if(!inverted.has(t))inverted.set(t,[]);inverted.get(t).push(id);}});
 const terms=new Map(),counts={};let entries=0;
 for(const file of sources){const raw=readFileSync(file,'utf8').replace(/^\uFEFF/,'');const rows=file.endsWith('.csv')?parseCsv(raw):JSON.parse(raw);counts[file]=rows.length;entries+=rows.length;for(const r of rows){const keyword=normalize(r.keyword);if(!keyword)continue;const declared=r.targetPage||r.target_page||r.target_url||r.target_path||'';if(!terms.has(keyword))terms.set(keyword,{keyword,sources:[],declared:[]});const entry=terms.get(keyword);entry.sources.push(file);if(declared)entry.declared.push(canonical(declared));}}
 const summary={sourceEntries:entries,uniqueKeywords:terms.size,duplicates:entries-terms.size,sourceCounts:counts,authoredPagesAudited:pages.length,statusCounts:{},invalidDeclaredTargetKeywords:0,searchAliases:0,linkedBlogPages:0,notes:['Stored/generated candidates are not measured organic rankings.','Literal presence and token co-occurrence do not prove intent satisfaction.','Local modifiers are retained: national pages cannot satisfy every local query.','Content gaps are not published as doorway pages.']};
 const aliases={};const cells=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
 const csv=['keyword,status,target_path,declared_targets,invalid_declared_targets,evidence,sources'];
 for(const row of [...terms.values()].sort((a,b)=>a.keyword.localeCompare(b.keyword))){const result=classifyKeyword(row.keyword,pages,inverted);summary.statusCounts[result.status]=(summary.statusCounts[result.status]||0)+1;const declared=[...new Set(row.declared)];const invalid=declared.filter(p=>!paths.has(p));if(invalid.length)summary.invalidDeclaredTargetKeywords++;
 if(result.status==='phrase_present'&&tokens(row.keyword).length>=2&&row.keyword.length<=90){const arr=aliases[result.target]??=[];if(arr.length<12)arr.push(row.keyword);}
 csv.push([row.keyword,result.status,result.target,declared.join('|'),invalid.join('|'),result.evidence,[...new Set(row.sources)].join('|')].map(cells).join(','));}
 // Topical links use genuine page titles. Prefer overlapping subject words over generic arthritis.
 const links={};const generic=new Set(['arthritis','uk','guide','living','pain','joint','complete','support']);
 for(const post of posts){const path=`/blog/${post.slug}`;const page=byPath.get(path);if(!page)continue;const terms=tokens(`${post.title} ${post.keywords||''}`).filter(t=>!generic.has(t));const scored=pages.filter(p=>p.path!==path).map(p=>({p,n:terms.filter(t=>p.headTokens.has(t)).length})).filter(x=>x.n>=2).sort((a,b)=>b.n-a.n||Number(a.p.path.startsWith('/blog/'))-Number(b.p.path.startsWith('/blog/'))||a.p.path.localeCompare(b.p.path));if(scored.length)links[path]=scored.slice(0,3).map(x=>({href:x.p.path,title:x.p.title}));}
 summary.searchAliases=Object.values(aliases).reduce((n,a)=>n+a.length,0);summary.linkedBlogPages=Object.keys(links).length;
 mkdirSync('.preflight-reports',{recursive:true});mkdirSync('docs/seo/keyword-implementation-2026-10-11',{recursive:true});
 writeFileSync('.preflight-reports/all-keyword-coverage.csv',csv.join('\n')+'\n');
 writeFileSync('src/data/keywordSearchAliases.generated.json',JSON.stringify(aliases)+'\n');
 writeFileSync('src/data/keywordRelatedLinks.generated.json',JSON.stringify(links)+'\n');
 writeFileSync('src/data/keywordSearchPages.generated.json',JSON.stringify(pages.filter(p=>!p.path.startsWith('/blog/')).map(p=>({id:`content-${p.path}`,title:p.title,href:p.path,excerpt:p.body.slice(0,220),topic:p.path.startsWith('/conditions/')?'Conditions':'Guides & hubs',wordCount:p.body.split(' ').length,keywords:aliases[p.path]||[]})))+'\n');
 writeFileSync('docs/seo/keyword-implementation-2026-10-11/coverage-summary.json',JSON.stringify(summary,null,2)+'\n');console.log(JSON.stringify(summary,null,2));
}
if(process.argv[1]&&new URL(import.meta.url).pathname===process.argv[1])main();
