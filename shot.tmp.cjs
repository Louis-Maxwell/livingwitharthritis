const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});
await p.goto(process.argv[2],{waitUntil:'networkidle'});
for(let i=0;i<30;i++){await p.mouse.wheel(0,1200);await p.waitForTimeout(200);}
await p.waitForTimeout(2000);
await p.screenshot({path:process.argv[3],fullPage:true});
const r=await p.$$eval('a[href^="/blog/"]',as=>as.map(a=>{let c=a;for(let i=0;i<4&&c.parentElement;i++){if(c.querySelector('img'))break;c=c.parentElement;}return {h:a.getAttribute('href'),t:(a.innerText||'').slice(0,50).replace(/\n/g,' '),img:!!c.querySelector('img')}}));
const noi=r.filter(x=>!x.img&&x.t.length>15);console.log(noi.length);console.log(noi.slice(0,60).map(x=>x.h+' | '+x.t).join('\n'));await b.close();})();
