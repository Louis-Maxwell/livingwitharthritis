import {test} from 'vitest';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {rewriteHead,headDataFor} from '../inject-canonicals.mjs';
const template=readFileSync('index.html','utf8');
const read=p=>readFileSync(p,'utf8');
test('corporate initial HTML contains current bounded wording, not old packages',()=>{
 for(const route of ['/corporate-giving','/corporate-partnerships']){
  const html=rewriteHead(template,route);
  assert.match(html,/agreed in writing|agree every partnership in writing/i);
  assert.doesNotMatch(html,/70% of consumers|2M UK employees|100% of your donation is tax|£25K|Bronze Partner|Silver Partner|Gold Partner/);
  assert.match(html,/This form prepares an email draft/);
 }
 const giving=headDataFor('/corporate-giving'),partners=headDataFor('/corporate-partnerships');
 assert.notEqual(giving.title,partners.title);assert.notEqual(giving.description,partners.description);
 assert.match(partners.bodyHtml,/href="\/corporate-giving"/);
 assert.doesNotMatch(partners.bodyHtml,/<h2[^>]*>Matched Giving/);
});
test('daily tips index, article and short tips have distinct complete static heads',()=>{
 const routes=['/daily-tips/overview','/daily-tips/daily-living','/daily-tips/health-tips'];
 const heads=routes.map(route=>headDataFor(route));
 assert.equal(new Set(heads.map(h=>h.title)).size,3);
 assert.equal(new Set(heads.map(h=>h.description)).size,3);
 for(const path of routes){const html=rewriteHead(template,path);assert.match(html,new RegExp('rel="canonical" href="https://livingwitharthritis.org.uk'+path+'"'));assert.equal([...html.matchAll(/<h1\b/g)].length,1)}
 const index=headDataFor(routes[0]);for(const tip of ['morning-stretches','stay-hydrated','prioritise-sleep'])assert.ok(index.bodyHtml.includes(`/daily-tips/${tip}`),tip);
});
test('general supplement guides do not describe a product offer',()=>{
 for(const name of ['Msm','Glucosamine','Turmeric']){const wrapper=read(`src/pages/supplements/${name}.tsx`);const source=wrapper.includes("SupplementSafetyGuide")?read("src/components/seo/SupplementSafetyGuide.tsx"):wrapper;assert.match(source,/"@type": "MedicalEntity"/);assert.doesNotMatch(source,/"@type": "(?:Product|Drug|DietarySupplement)"/)}
});
test('people lists omit unsupported language and starter plan is not sold as a course',()=>{
 const people=read('src/pages/AuthorsIndex.tsx');const list=people.slice(people.indexOf('const itemListLd'),people.indexOf('  return (',people.indexOf('const itemListLd')));assert.doesNotMatch(list,/inLanguage/);
 const plan=read('src/pages/exercises/TaiChiForBeginners.tsx');assert.match(plan,/"@type": \["CreativeWork", "LearningResource"\]/);assert.doesNotMatch(plan,/"@type": "Course"/);assert.doesNotMatch(plan,/aggregateRating|ratingValue/);
});

test('referral page and daily tips do not promise fabricated waits or personal treatment',()=>{
 const source=read('src/pages/tools/WaitingTimeCalculator.tsx');
 assert.doesNotMatch(source,/REGION_BASE_WEEKS|URGENCY|setCondition|setResult|published averages|24\/7|personalised action plan/);
 assert.match(source,/does not calculate or predict/);
 const html=rewriteHead(template,'/tools/waiting-time');
 assert.doesNotMatch(html,/published averages|Estimated wait:|Calculate my waiting|Ask our team 24|tailored daily routine/);
 assert.match(html,/does not calculate or predict/);
 for(const path of ['/daily-tips/overview','/daily-tips/health-tips','/daily-tips/daily-living','/daily-tips/morning-stretches','/daily-tips/stay-hydrated','/daily-tips/anti-inflammatory-snacks','/daily-tips/walk-20-minutes','/daily-tips/prioritise-sleep','/daily-tips/pace-yourself'])assert.doesNotMatch(rewriteHead(template,path),/tailored daily routine|Quality sleep reduces inflammation|dehydration can worsen joint stiffness/);
});

test('waiting-time cross-links do not promise numerical estimates',()=>{
 const routes=['/regions/north-west','/conditions/rheumatoid-arthritis','/conditions/psoriatic-arthritis'];
 for(const route of routes){const html=rewriteHead(template,route);assert.doesNotMatch(html,/Waiting Time Calculator|estimate your local 2026 wait|Estimate current rheumatology waiting times/);}
 const snapshots={...JSON.parse(read('scripts/data/rendered-bodies.json')),...JSON.parse(read('scripts/data/rendered-bodies.overrides.json'))};
 for(const [route,html]of Object.entries(snapshots)){if(route==='/tools/waiting-time'||route.startsWith('/arthritis-support/'))continue;for(const a of html.matchAll(/<a href="\/tools\/waiting-time">[\s\S]*?<\/a>/g))assert.doesNotMatch(a[0],/calculator|estimate|2026 wait/i,route)}
});
