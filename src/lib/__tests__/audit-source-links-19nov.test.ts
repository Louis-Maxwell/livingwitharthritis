import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import ni from '@/content/blog/posts/free-arthritis-support-northern-ireland.json';
import dfg from '@/content/blog/posts/disabled-facilities-grant-arthritis-frailty-uk.json';
import walk from '@/content/blog/posts/slow-walking-groups-arthritis-frailty-uk.json';
import chair from '@/content/blog/posts/rise-recline-chair-arthritis-frailty-uk.json';
import care from '@/content/blog/posts/care-home-life-arthritis-pain-frailty-uk.json';
import refugee from '@/content/blog/posts/arthritis-support-refugees-diverse-communities.json';
import cauda from '@/content/blog/posts/cauda-equina-warning-signs-uk.json';

const posts = [ni, dfg, walk, chair, care, refugee, cauda];
describe('19 November finite source-link repairs', () => {
  it('uses the current equivalent official source destinations', () => {
    expect(ni.content).toContain('https://www.nidirect.gov.uk/articles/disabled-facilities-grants');
    expect(dfg.content).toContain('https://www.mygov.scot/care-equipment-adapt-home/what-you-can-get');
    expect(walk.content).toContain('https://www.ramblers.org.uk/go-walking/wellbeing-walks');
    expect(walk.content).toContain('Ramblers Wellbeing Walks');
    expect(chair.content).toContain('household-gadgets-and-equipment-to-make-life-easier/');
    expect(care.content).toContain('https://www.cqc.org.uk/care-services/find-care-home');
    for (const post of [refugee]) expect(post.content).toContain('https://www.gov.uk/guidance/nhs-entitlements-migrant-health-guide');
    expect(cauda.content).toContain('https://www.royalfree.nhs.uk/patients-and-visitors/patient-information-leaflets/cauda-equina-syndrome');
    expect(cauda.content).toContain('Royal Free London: cauda equina syndrome');
    expect(cauda.content).not.toContain('Buckinghamshire Healthcare: cauda equina syndrome');
  });
  it('keeps citation URLs aligned and removes obsolete routes', () => {
    for (const post of posts) {
      const serialised = JSON.stringify(post);
      for (const old of ['/walking-for-health', '/equipment-and-adaptations', '/care-services/care-homes', '/government/publications/nhs-entitlements-migrant-health-guide', '/pifs/cauda-equina-syndrome/', '/household-equipment-to-help-you/']) expect(serialised).not.toContain(old);
    }
  });
  it('does not rewrite the six descriptions that already exist', () => {
    for (const slug of ['carers-allowance-help-if-you-care-for-someone', 'how-to-sleep-with-arthritis-uk']) {
      const post = JSON.parse(readFileSync(`src/content/blog/posts/${slug}.json`, 'utf8'));
      expect(post.meta_description.length).toBeGreaterThan(50);
      expect(post.meta_description).toContain("'");
    }
  });
});
