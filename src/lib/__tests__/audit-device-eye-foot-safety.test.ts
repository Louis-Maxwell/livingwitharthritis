import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
const load = (slug: string) => JSON.parse(readFileSync(`src/content/blog/posts/${slug}.json`, 'utf8'));
describe('Audit device, eye and foot safety corrections', () => {
  it('does not override TENS restrictions in the later-life section', () => {
    const j = load('tens-machines-arthritis-uk');
    expect(j.content).toContain('Do not use TENS if you have a pacemaker or epilepsy');
    expect(j.content).toContain('Do not put TENS pads on irritated, broken, infected or numb skin');
    expect(j.content).not.toContain('implanted device unless your doctor says it is safe');
    expect(j.content).not.toContain('especially if your skin is thin or you have reduced feeling');
    expect(j.content).toContain('NICE advises against offering TENS for osteoarthritis');
  });
  it('separates severe emergency eye symptoms from urgent optician or 111 care', () => {
    const j = load('vision-falls-arthritis-frailty-uk');
    expect(j.content).toContain('suddenly have severe eye pain');
    expect(j.content).toContain('Go to A&amp;E or call 999');
    expect(j.content).toContain('urgent optician appointment');
    expect(j.content).toContain('Call 999</strong> for stroke signs');
    expect(j.content).not.toContain('for sudden eye pain, flashes');
    expect(j.citations.some((c: {url:string}) => c.url === 'https://www.nhs.uk/conditions/vision-loss/')).toBe(true);
  });
  it('does not leave limb-threatening foot problems on a same-day GP route', () => {
    const j = load('diabetes-arthritis-frailty-feet-uk');
    expect(j.content).toContain('Get emergency assessment now through A&amp;E');
    expect(j.content).toContain('gangrene (black or dying tissue)');
    expect(j.content).toContain('Do not wait for a routine or same-day GP appointment');
    expect(j.content).toContain('within one working day');
    expect(j.content).toContain('suspected deep tissue or bone infection');
  });
  it('preserves publication and marks only these corrections as pending clinical review', () => {
    for (const slug of ['tens-machines-arthritis-uk', 'vision-falls-arthritis-frailty-uk', 'diabetes-arthritis-frailty-feet-uk']) {
      const j=load(slug);
      expect(j.slug).toBe(slug); expect(j.is_published).toBe(true);
      expect(j.reviewed_by).toBeNull(); expect(j.reviewer_credentials).toBeNull();
      expect(j).not.toHaveProperty('last_reviewed');
      expect(j.content).not.toContain('Reviewed by Louis Maxwell');
      expect(j.editorial_review_note).toContain('not yet had a fresh clinical review');
      expect(j.editorial_review_note).toContain('limited correction');
    }
  });
});
