const { chromium } = require('playwright');
(async()=>{
 const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1280,height:900}});
 const pages=process.argv.slice(2);
 for(const u of pages){
  await p.goto(u,{waitUntil:'networkidle',timeout:60000}).catch(e=>console.log('ERR',u));
  for(let i=0;i<15;i++){await p.mouse.wheel(0,1500);await p.waitForTimeout(250);}
  await p.waitForTimeout(1500);
  const r=await p.$$eval('img',im=>im.map(i=>({s:i.currentSrc||i.getAttribute('src')||'',ok:i.complete&&i.naturalWidth>0,a:i.alt,fb:i.dataset.coverFallback,h:i.closest('a')?.getAttribute('href')})));
  const bad=r.filter(x=>!x.ok||!x.s||x.fb||/guide-fallback|hero-friends/.test(x.s));
  console.log(u,'imgs',r.length,'bad',bad.length); bad.forEach(x=>console.log('  ',JSON.stringify(x)));
  const links=await p.$$eval('a[href^="/blog/"]',a=>[...new Set(a.map(x=>x.getAttribute('href')))]);
  console.log('  bloglinks',links.length);
  // cards without img
  const noimg=await p.$$eval('a[href^="/blog/"]',a=>a.filter(x=>x.querySelector('h2,h3')&&!x.closest('article,li,div')?.querySelector('img')).map(x=>x.getAttribute('href')));
  console.log('  cards-no-img',noimg.length,noimg.slice(0,20).join(' '));
 }
 await b.close();})();
