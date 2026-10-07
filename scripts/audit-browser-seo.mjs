import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import puppeteer from 'puppeteer';
const root=process.cwd();
const server=http.createServer((req,res)=>{
  const route=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  let file=path.resolve(root,'dist','.'+route);
  if(!file.startsWith(path.join(root,'dist'))) {res.writeHead(403);res.end();return;}
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  if(!fs.existsSync(file)){res.writeHead(404);res.end();return;}
  const types={'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.xml':'application/xml','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.woff2':'font/woff2'};
  res.setHeader('content-type',types[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`;
const browser=await puppeteer.launch({executablePath:process.env.SEO_CHROMIUM_PATH || await puppeteer.executablePath(),headless:true,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage']});
const routes=['/','/guides/benefits-pip','/conditions/knee-arthritis/diet','/blog/pip-for-arthritis-uk','/contact','/donate','/site-index'];
const report=[];
try {
 for(const width of [390,1366]){
  const page=await browser.newPage();await page.setViewport({width,height:844});
  await page.evaluateOnNewDocument(()=>{localStorage.setItem('lwa_cv3',JSON.stringify({a:false,p:false,m:false}));localStorage.setItem('cookie-consent','declined');});
  for(const route of routes){
   const errors=[];const capture=e=>errors.push(e.message);page.on('pageerror',capture);
   await page.goto(base+route,{waitUntil:'networkidle0'});
   await page.addScriptTag({path:path.join(root,'node_modules/axe-core/axe.min.js')});
   const data=await page.evaluate(async()=>{
    const result=await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}});
    return {title:document.title,h1:[...document.querySelectorAll('h1')].map(x=>x.textContent.trim()),canonicals:[...document.querySelectorAll('link[rel="canonical"]')].map(x=>x.href),width:document.documentElement.scrollWidth,viewport:innerWidth,violations:result.violations.filter(v=>['serious','critical'].includes(v.impact)).map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)}))};
   });
   report.push({route,width,...data,errors});page.off('pageerror',capture);
  }await page.close();
 }
 fs.mkdirSync(path.join(root,'docs/seo'),{recursive:true});fs.writeFileSync(path.join(root,'docs/seo/browser-audit.generated.json'),JSON.stringify({scope:'Local built Chromium + axe; not live/field data or full manual accessibility certification',report},null,2)+'\n');
 if (report.some(x => x.violations.length || x.errors.length || x.h1.length !== 1 || x.canonicals.length !== 1 || x.width > x.viewport)) process.exitCode = 1;
 console.log(JSON.stringify(report.map(x=>({route:x.route,width:x.width,h1:x.h1.length,canonicals:x.canonicals.length,overflow:x.width<x.viewport?0:x.width-x.viewport,violations:x.violations,errors:x.errors})),null,2));
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
