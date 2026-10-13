/** Response-HTML audit of every sitemap URL. No rendered/CWV score is implied. */
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const origin='https://livingwitharthritis.org.uk';
const urls=[...readFileSync('public/sitemap.xml','utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
const paths=new Set(urls.map(u=>new URL(u).pathname.replace(/\/$/,'')||'/'));
const redirects=readFileSync('public/_redirects','utf8').split('\n').map(s=>s.split(/\s+/)[0]);
const meta=(h,key)=>{const tags=h.match(/<meta\b[^>]*>/gi)||[];return tags.find(t=>t.includes(`name="${key}"`)||t.includes(`property="${key}"`))?.match(/content="([^"]*)"/)?.[1]||'';};
const text=s=>String(s).replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const rows=[];const issues=[];
for(const url of urls){const path=new URL(url).pathname;const file=path==='/'?'dist/index.html':join('dist',path,'index.html');if(!existsSync(file)){issues.push({severity:'HIGH',path,issue:'Missing static sitemap page'});continue;}const h=readFileSync(file,'utf8');const title=text(h.match(/<title>([\s\S]*?)<\/title>/i)?.[1]||'');const description=meta(h,'description');const canonical=h.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]*)"/)?.[1];const h1=(h.match(/<h1\b/gi)||[]).length;const robots=meta(h,'robots');const schema=[];let invalidSchema=0;for(const m of h.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)){try{schema.push(JSON.parse(m[1]));}catch{invalidSchema++;}}
const links=[...h.matchAll(/<a\b[^>]*href="([^"]+)"/gi)].map(m=>m[1]).filter(p=>p.startsWith('/')&&!p.startsWith('//')).map(p=>p.split(/[?#]/)[0].replace(/\/$/,'')||'/');const unresolved=[...new Set(links.filter(p=>!paths.has(p)&&!redirects.includes(p)&&!existsSync(join('dist',p))&&!existsSync(join('dist',p,'index.html'))))];
for (const href of unresolved) issues.push({severity:'HIGH',path,issue:'Unresolved internal link',href});
rows.push({path,title,description,canonical,h1,robots,schemaBlocks:schema.length,invalidSchema,internalLinks:links.length,unresolvedLinks:unresolved});
for(const [severity,fail,issue] of [['HIGH',canonical!==url,'Missing or mismatched canonical'],['HIGH',/noindex/i.test(robots),'Sitemap page is noindex'],['HIGH',!title,'Missing title'],['MEDIUM',!description,'Missing description'],['MEDIUM',h1!==1,`H1 count ${h1}`],['HIGH',invalidSchema>0,'Malformed JSON-LD'],['MEDIUM',schema.length===0,'No response-HTML schema'],['MEDIUM',!meta(h,'og:title')||!meta(h,'twitter:card'),'Incomplete social metadata']])if(fail)issues.push({severity,path,issue});
}
for(const key of ['title','description']){const grouped=new Map();for(const row of rows)if(row[key]){if(!grouped.has(row[key]))grouped.set(row[key],[]);grouped.get(row[key]).push(row.path);}for(const [value,ps] of grouped)if(ps.length>1)issues.push({severity:'MEDIUM',issue:`Duplicate ${key}`,value,paths:ps});}
const report={ranAt:new Date().toISOString(),scope:'All canonical sitemap URLs in built response HTML; rendering, clinical review and CWV require separate validation',sitemapUrls:urls.length,pagesAudited:rows.length,counts:{},issues,pages:rows};for(const issue of issues)report.counts[issue.severity]=(report.counts[issue.severity]||0)+1;mkdirSync('.preflight-reports',{recursive:true});writeFileSync('.preflight-reports/built-site-audit.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({sitemapUrls:urls.length,pagesAudited:rows.length,counts:report.counts,unresolvedLinkPages:rows.filter(r=>r.unresolvedLinks.length).length},null,2));

// A report must fail the build when it finds a regression.
if (issues.length) process.exitCode = 1;
