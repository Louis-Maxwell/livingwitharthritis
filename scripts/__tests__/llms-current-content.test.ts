import {describe,it,expect} from 'vitest';
import {headDataFor} from '../inject-canonicals.mjs';
import {execFileSync} from 'node:child_process';
import {currentFeedEntries,buildHeadDataSections,buildCoreDigest} from '../generate-llms-full.mjs';
describe('AI answer feed uses current published route composition',()=>{
 it('exports current knee answer and source links, not old snapshot statistic',()=>{
  const route='/conditions/knee-arthritis';const current=headDataFor(route);const entries=currentFeedEntries([route]);expect(entries[route].answer).toBe(current.answer);
  const text=buildHeadDataSections(entries).join('\n');expect(text).toContain('A: '+current.answer);expect(text).toContain('Reference: NICE');expect(text).not.toContain('every 5 kg lost');expect(text).toContain('awaiting a separate clinical review');
 });
 it('does not invent a clinical review when current route has none',()=>{
  const route='/conditions/rheumatoid-arthritis';const text=buildHeadDataSections(currentFeedEntries([route])).join('\n');expect(text).toContain('Clinical review: check the status displayed on the source page.');expect(text).not.toContain('Clinical review: Louis Maxwell;');
 });
 it('resolves legacy paths and preserves existing feed exclusions without changing page indexing',()=>{
  const entries=currentFeedEntries(['/blog/knee-arthritis-exercises-uk','/guides/knee-exercises-for-osteoarthritis','/arthritis-support/liverpool','/pets/arthritis-in-dogs']);expect(Object.keys(entries)).toEqual(['/guides/knee-exercises-for-osteoarthritis']);
 });
 it('only labels a digest clinically reviewed when both name and date are recorded',()=>{
  const text=buildCoreDigest({'/guides/diet':{answer:'Existing answer',reviewedBy:'Louis Maxwell'}});expect(text).not.toContain('Clinically reviewed by');
 });
 it('runs without native TypeScript stripping on the supported plain Node path',()=>{
  const output=execFileSync(process.execPath,['--no-experimental-strip-types','--input-type=module','-e',"import('./scripts/generate-llms-full.mjs').then(m=>console.log(Object.keys(m.currentFeedEntries()).length))"],{encoding:'utf8'});
  expect(output.trim()).toBe('211');
 });
 it('preserves cautious existing answers outside the five source-checked priority answers',()=>{
  const entries=currentFeedEntries(['/guides/newly-diagnosed','/guides/sarcopenia-muscle-loss','/guides/frailty-management-hub']);
  expect(entries['/guides/newly-diagnosed'].answer).not.toContain('virtual physiotherapy triage');
  expect(entries['/guides/sarcopenia-muscle-loss'].answer).not.toContain('1.0-1.2 g protein');
  expect(entries['/guides/frailty-management-hub'].answer).not.toContain('can be reversed');
 });
});
