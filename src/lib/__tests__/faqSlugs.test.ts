import { describe, expect, it } from 'vitest';
import { faqArticles } from '@/data/faqArticles';
import { FAQ_SLUGS } from '@/data/faqSlugs';

describe('FAQ slug list', () => {
  it('matches the FAQ articles exactly', () => {
    expect([...FAQ_SLUGS].sort()).toEqual(
      faqArticles.map((a) => a.slug).sort(),
    );
  });
});
