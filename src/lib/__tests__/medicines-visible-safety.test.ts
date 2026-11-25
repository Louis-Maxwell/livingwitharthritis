import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import paracetamol from '@/content/blog/posts/paracetamol-for-arthritis-pain-what-the-evidence-says.json';
import medication from '@/content/blog/posts/arthritis-medication-guide.json';
describe('medicines visible safety follow-up',()=>{
 it('keeps evidence and NICE questions in the main prose, not FAQ extraction',()=>{
  const page=readFileSync('src/pages/BlogPost.tsx','utf8');
  expect(page).toContain('q-heading');
  const stripped=paracetamol.content.replace(/<h([23])(?![^>]*\bq-heading\b)[^>]*>([^<]*\?)\s*<\/h\1>[\s\S]*?(?=<h[1-3][^>]*>|$)/gi,'');
  expect(stripped).toContain('10 trials with 3,541');
  expect(stripped).toContain('proton pump inhibitor (PPI)');
  expect(stripped).toContain('Painkillers do not replace medicines used to control the disease');
  expect(paracetamol.content).toContain('<h2 class="q-heading">What does current NICE guidance recommend?</h2>');
 });
 it('carries verified NI overdose escalation into both pages',()=>{
  for(const p of [paracetamol,medication]){
   expect(p.content).toContain('if you have no symptoms and appear well');
   expect(p.content).toContain('If you cannot get advice quickly');
   expect(p.content).toContain('vomiting, drowsiness, loss of consciousness or seizures');
   expect(p.citations.some(x=>x.url==='https://www.nidirect.gov.uk/conditions/poisoning')).toBe(true);
  }
 });
});
