import { describe, expect, it } from 'vitest';
import { resolveSharedBlogSlug } from '@/lib/resolveSharedBlogSlug';

describe('resolveSharedBlogSlug', () => {
  it('strips trailing digits from shared links', () => {
    expect(resolveSharedBlogSlug('arthritis-fatigue-management-uk5'))
      .toBe('arthritis-fatigue-management-uk');
  });
  it('strips a glued-on word', () => {
    expect(resolveSharedBlogSlug('exercise-for-energy-arthritis-fatigueChoose'))
      .toBe('exercise-for-energy-arthritis-fatigue');
  });
  it('leaves real slugs and unknown slugs alone', () => {
    expect(resolveSharedBlogSlug('arthritis-fatigue-management-uk')).toBeUndefined();
    expect(resolveSharedBlogSlug('totally-made-up-slug')).toBeUndefined();
  });
});
