import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { describe, expect, it, vi } from 'vitest';

function worker() {
 const events={};const put=vi.fn();const addAll=vi.fn().mockResolvedValue(undefined);const remove=vi.fn().mockResolvedValue(true);const match=vi.fn().mockResolvedValue(new Response('saved blank record'));const request=vi.fn().mockResolvedValue(new Response('fresh response'));
 const self={location:{origin:'https://livingwitharthritis.org.uk'},addEventListener:(name,handler)=>{events[name]=handler;},skipWaiting:vi.fn().mockResolvedValue(undefined),clients:{claim:vi.fn().mockResolvedValue(undefined)}};
 vm.runInNewContext(readFileSync('public/sw.js','utf8'),{self,caches:{open:async()=>({put,addAll}),keys:async()=>['other-site-data','lwa-blank-records-old','lwa-blank-records-v1'],delete:remove,match},fetch:request,URL,Response,Promise});
 return {events,request,match,put,addAll,remove};
}
function event(url,mode='navigate',method='GET') { return {request:{url,mode,method},respondWith:vi.fn(),waitUntil:vi.fn()}; }
describe('blank-record service worker boundaries',()=>{
 it('saves only the fixed offline fallback and two blank PDFs on request, and clears only its own old versions',async()=>{
 const w=worker();const install={waitUntil:vi.fn()};w.events.install(install);await install.waitUntil.mock.calls[0][0];expect(w.addAll).not.toHaveBeenCalled();
 const port={postMessage:vi.fn()};const message={data:{type:'SAVE_BLANK_RECORDS'},ports:[port],waitUntil:vi.fn()};w.events.message(message);await message.waitUntil.mock.calls[0][0];expect(port.postMessage).toHaveBeenCalledWith({saved:true});
 expect(w.addAll).toHaveBeenCalledWith(['/offline.html','/resources/gp-appointment-symptom-medication-tracker.pdf','/resources/flare-up-daily-log.pdf']);
 const activate={waitUntil:vi.fn()};w.events.activate(activate);await activate.waitUntil.mock.calls[0][0];expect(w.remove).toHaveBeenCalledExactlyOnceWith('lwa-blank-records-old');
 });
 it('fetches clinical HTML fresh and does not put it in the cache',async()=>{
 const w=worker();const e=event('https://livingwitharthritis.org.uk/blog/example');w.events.fetch(e);expect(await (await e.respondWith.mock.calls[0][0]).text()).toBe('fresh response');expect(w.put).not.toHaveBeenCalled();expect(w.match).not.toHaveBeenCalled();
 });
 it('serves an explicitly offline page, never a cached clinical guide, on navigation failure',async()=>{
 const w=worker();w.request.mockRejectedValueOnce(Error('offline'));const e=event('https://livingwitharthritis.org.uk/blog/example');w.events.fetch(e);await e.respondWith.mock.calls[0][0];expect(w.match).toHaveBeenCalledExactlyOnceWith('/offline.html');
 });
 it('does not intercept writes, external requests, API reads or app chunks',()=>{
 const w=worker();for(const e of [event('https://elsewhere.test/x'),event('https://livingwitharthritis.org.uk/api/account','cors'),event('https://livingwitharthritis.org.uk/assets/app.js','cors'),event('https://livingwitharthritis.org.uk/submit','navigate','POST')]) {w.events.fetch(e);expect(e.respondWith).not.toHaveBeenCalled();}
 });
});
