import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { COMPARISON_CONTENT } from '@/data/comparison-content';
import { headDataFor } from '../../../scripts/inject-canonicals.mjs';
const route='/guides/dmards-vs-biologics';
const article=COMPARISON_CONTENT[route];
const head=headDataFor(route);
const sources=head.sources as {url:string}[];
const clinical=JSON.parse(readFileSync('scripts/clinical-head-overrides.json','utf8'));
const seed=JSON.parse(readFileSync('scripts/ai-head-data.json','utf8'))[route];
const body=JSON.parse(readFileSync('scripts/data/rendered-bodies.overrides.json','utf8'))[route];
describe('DMARD classification and axial scope',()=>{
  it('preserves the existing client title and description, not a CTR experiment',()=>{
    expect(article.title).toBe('DMARDs vs Biologics for Arthritis');
    expect(article.metaDescription).toContain('how they differ in how they work');
    expect(head.title).toBe('DMARDs vs Biologics for Rheumatoid Arthritis');
    expect(head.updatedAt).toBe('2026-07-04');
  });
  it('limits the correction layer to the two scoped routes and preserves DMARD seed metadata',()=>{
    expect(Object.keys(clinical).sort()).toEqual([route, '/resources/flare-action-plan'].sort());
    expect(Object.keys(clinical[route]).sort()).toEqual(['answer','faqs','sources']);
    for (const key of ['title','description','breadcrumb','updatedAt']) expect(head[key]).toBe(seed[key]);
  });
  it('makes the classification explicit in the visible answer and crawler answer',()=>{
    expect(article.intro).toContain('Biologics are a type of');
    expect(article.intro).toContain('not biologics');
    expect(head.answer).toBe(article.intro);
    expect(body.split(article.intro).length-1).toBe(2);
  });
  it('does not describe biological medicines as tablets or JAK small molecules',()=>{
    expect(article.optionB.howItWorks).toContain('not biological medicines');
    expect(article.table.find(r=>r.label==='How given')?.b).toBe('Injection or infusion');
    expect(body).not.toContain('some tablets');
    expect(body).not.toContain('using engineered proteins or small molecules');
    expect(body).not.toContain('TNF-Î±');
  });
  it('keeps axial disease distinct from peripheral arthritis and avoids universal step-up rules',()=>{
    expect(article.intro).toContain('not recommended for purely axial');
    expect(body).toContain('may still be used for peripheral arthritis');
    expect(body).not.toContain('Similar rules apply to psoriatic arthritis and ankylosing spondylitis');
    expect(body).not.toContain("Biologics come in after two DMARDs");
  });
  it('separates medicine-specific risks without a blanket stopping rule',()=>{
    expect(body).toContain('JAK inhibitors are a different medicine group with separate warnings');
    expect(body).toContain('do not apply one stopping or restarting rule');
    expect(body).not.toContain('told to hold doses during active infections');
  });
  it('mirrors every changed statement and takeaway in the crawler body',()=>{
    for(const field of ['howItWorks','bestFor','sideEffects','nhs'] as const)expect(body).toContain(article.optionB[field]);
    for(const takeaway of article.takeaways)expect(body).toContain(takeaway);
    for(const s of article.sections)for(const p of s.paragraphs)expect(body).toContain(p);
  });
  it('keeps the crawler table column count and row headers explicit',()=>{
    const table=body.match(/<table>[\s\S]*?<\/table>/)?.[0] || '';
    expect((table.match(/scope="col"/g)||[]).length).toBe(3);
    expect((table.match(/scope="row"/g)||[]).length).toBe(article.table.length);
    expect(table).toContain('>Comparison</th>');
  });
  it('uses scoped authoritative references, not osteoarthritis guidance for a DMARD comparison',()=>{
    expect(sources).toHaveLength(6);
    expect(sources.some((s:{url:string})=>s.url.includes('/guidance/ng226'))).toBe(false);
    expect(sources.some((s:{url:string})=>s.url.includes('GMMMG-HCD-pathway-for-RA'))).toBe(true);
    expect(sources.some((s:{url:string})=>s.url.includes('nras.org.uk/resource/jak-inhibitors'))).toBe(true);
  });
});
