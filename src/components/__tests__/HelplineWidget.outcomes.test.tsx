import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HelplineWidget from '../HelplineWidget';
import { CONTACT_PHONE_TEL, CONTACT_EMAILS } from '@/config/contact';

describe('Footer contact options do not promise unverified service levels', () => {
  it('keeps all four channels and their existing destinations', () => {
    render(<MemoryRouter><HelplineWidget /></MemoryRouter>);
    const section = screen.getByRole('heading', { name: /here to help/ }).closest('section')!;
    const links = within(section).getAllByRole('link');
    expect(links).toHaveLength(4);
    expect(links.map(a => a.getAttribute('href'))).toEqual([
      `tel:${CONTACT_PHONE_TEL}`,
      `mailto:${CONTACT_EMAILS.info}`,
      `https://wa.me/44${CONTACT_PHONE_TEL.replace(/^0/, '')}`,
      '/contact',
    ]);
    const whatsapp = section.querySelector('#footer-whatsapp');
    expect(whatsapp).toHaveAttribute('target', '_blank');
    expect(whatsapp?.getAttribute('rel')).toContain('noopener');
  });
  it('explains the email draft without staff, speed or opening-hour claims', () => {
    render(<MemoryRouter><HelplineWidget /></MemoryRouter>);
    expect(screen.getByText(/draft for you to review and send from your own email app/)).toBeInTheDocument();
    expect(screen.getByText('Prepare a message')).toBeInTheDocument();
    expect(screen.queryByText(/real person|working days|Monday to Friday|9am|5pm|friendly replies/i)).toBeNull();
  });
});
