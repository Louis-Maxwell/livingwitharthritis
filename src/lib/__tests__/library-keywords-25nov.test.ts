import {correctLibraryCopy} from '@/data/libraryCopyCorrections';
import {describe,it,expect} from 'vitest';
import copy from '@/data/libraryKeyword25.json';
import {getHealthTopic} from '@/data/healthTopics';
import {getLibraryTopicSeo} from '@/data/libraryTopicSeo';
import {LIBRARY_ANSWER_CAPSULES} from '@/data/libraryAnswerCapsules';
import {getLibraryLastReviewed,getLibraryReviewStatus} from '@/data/libraryReview';
import {headDataFor,rewriteHead} from '../../../scripts/inject-canonicals.mjs';
describe('approved November25 library keyword revisions',()=>{
 for(const [slug,c] of Object.entries(copy)) it(`keeps ${slug} metadata, opening and publication HTML aligned`,()=>{
  const path='/library/'+slug;
  expect(getLibraryTopicSeo(slug)?.title).toBe(c.title);
  expect(getLibraryTopicSeo(slug)?.h1).toBe(c.h1);
  expect(LIBRARY_ANSWER_CAPSULES[slug]).toBe(c.answer);
  expect(c.description.length).toBeLessThanOrEqual(155);
  expect(getLibraryReviewStatus(slug)).toBe('pending');
  expect(getLibraryLastReviewed(slug)).toBeNull();
  const h=headDataFor(path);
  expect(h.answer).toBe(c.answer);
  expect(h.question).toBe(c.h1);
  expect(h.description).toBe(c.description);
  expect(h.reviewedBy).toBeUndefined();
  expect(h.summaryReviewNote).toContain('awaiting separate clinical review');
  const html=rewriteHead('<html><head></head><body><div id="root"></div></body></html>',path);
  expect(html).toContain('NHS');
  expect(html).not.toContain('"reviewedBy"');
 });
 it('removes the generic adult schedule and unsupported ibuprofen comparison',()=>{
  const text=JSON.stringify(getHealthTopic('naproxen')?.sections.map(section=>correctLibraryCopy(section.body ?? '')));
  expect(text).not.toContain('250mg to 500mg twice daily');
  expect(text).not.toContain('Ibuprofen is generally considered milder');
  expect(text).toContain('Do not take them together');
 });
});
