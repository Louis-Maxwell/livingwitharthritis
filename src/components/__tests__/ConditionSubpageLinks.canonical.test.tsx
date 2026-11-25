import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ConditionSubpageLinks from '../ConditionSubpageLinks';
import { conditionSubpages } from '@/data/conditionSubpages';
import { resolveSeoRedirect } from '@/lib/seoRedirects';
afterEach(cleanup);
describe('condition section links use final destinations', () => {
  it('links hip exercises directly to its existing guide without removing a card', () => {
    render(<MemoryRouter><ConditionSubpageLinks conditionSlug="hip-arthritis" conditionName="Hip arthritis" /></MemoryRouter>);
    expect(screen.getAllByRole('link')).toHaveLength(4);
    expect(screen.getByRole('link', { name: /Exercises/ })).toHaveAttribute('href', '/guides/hip-exercises-for-osteoarthritis');
  });
  it.each(Object.keys(conditionSubpages))('%s section cards never link to redirect sources', (slug) => {
    render(<MemoryRouter><ConditionSubpageLinks conditionSlug={slug} conditionName={slug} /></MemoryRouter>);
    for (const link of screen.getAllByRole('link')) {
      expect(resolveSeoRedirect(link.getAttribute('href') || '/')).toBeNull();
    }
  });
});
