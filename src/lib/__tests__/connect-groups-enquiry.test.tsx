import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ConnectGroupsStub } from '@/pages/stubs';
import { readFileSync } from 'node:fs';

describe('Connect Groups enquiry onward journey', () => {
  it('offers an accessible enquiry action without promising a booked place', () => {
    render(<HelmetProvider><MemoryRouter><ConnectGroupsStub /></MemoryRouter></HelmetProvider>);
    const enquiry = screen.getByRole('region', { name: 'Ask about a group' });
    expect(within(enquiry).getByRole('link', { name: 'Ask about Connect Groups' })).toHaveAttribute('href', '/contact');
    expect(enquiry).toHaveTextContent('not a group booking or confirmation of a place');
    expect(enquiry).toHaveTextContent('opens a draft in your email app');
    expect(enquiry).toHaveTextContent('press Send there');
    expect(enquiry).toHaveTextContent('do not need to share your medical history');
  });
  it('points to the existing contact page and its enquiry form', () => {
    expect(readFileSync('src/App.tsx', 'utf8')).toContain('path="/contact"');
    expect(readFileSync('src/components/landing/ContactSection.tsx', 'utf8')).toContain('id="contact"');
  });
});
