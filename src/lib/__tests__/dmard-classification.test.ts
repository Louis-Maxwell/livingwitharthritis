import {describe,it,expect} from 'vitest';
import drafts from '@/data/approvedClinicalRewrites.json';
import {headDataFor} from '../../../scripts/inject-canonicals.mjs';
const route='/guides/dmards-vs-biologics';const draft=drafts[route];const text=JSON.stringify(draft);
describe('approved independent DMARD comparison',()=>{
 it('uses the approved title, classification and current editorial date',()=>{
  const head=headDataFor(route);expect(head.title).toBe(draft.title);expect(head.updatedAt).toBe('2026-11-26');
  expect(text).toContain('Biologics are one group');expect(text).toContain('JAK inhibitors are targeted synthetic DMARDs, not biological DMARDs');
 });
 it('preserves axial scope, individual monitoring and no blanket medicine-change rule',()=>{
  expect(text).toContain('do not treat spinal symptoms');expect(text).toContain('Do not change doses or pause treatment');
  expect(text).toContain('risks need an individual discussion');expect(text).not.toContain('cks.nice.org.uk');
  expect(draft.sources.every(([url])=>url.includes('nhs.uk')||url.includes('nice.org.uk/guidance/'))).toBe(true);
 });
 it('keeps the crawler body equal to every approved paragraph',()=>{
  const head=headDataFor(route);for(const s of draft.sections)for(const p of s.paragraphs)expect(head.bodyHtml).toContain(p);
  expect(head.faqs).toEqual([]);
 });
});
