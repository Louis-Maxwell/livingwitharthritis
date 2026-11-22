import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HelplineWidget from '../HelplineWidget';
import { installAutoEvents } from '@/lib/auto-events';

const stopNavigation = (event: Event) => event.preventDefault();
beforeEach(() => {
  localStorage.clear();
  window.gtag = vi.fn();
  installAutoEvents();
  document.addEventListener('click', stopNavigation);
});
afterEach(() => {
  localStorage.clear();
  delete window.gtag;
  document.removeEventListener('click', stopNavigation);
  vi.restoreAllMocks();
});
const draw = () => render(<MemoryRouter><HelplineWidget /></MemoryRouter>);
const allow = () => localStorage.setItem('lwa_cv3', JSON.stringify({ a: true }));
const calls = () => vi.mocked(window.gtag!).mock.calls;

describe('footer contact consent and canonical emission', () => {
  it('does not dispatch without consent even when a sender is still present', () => {
    draw();
    for (const link of screen.getAllByRole('link')) fireEvent.click(link);
    expect(calls()).toEqual([]);
  });
  it('rechecks withdrawal instead of trusting an existing sender or legacy consent flag', () => {
    draw(); allow(); localStorage.setItem('cookie-consent', 'accepted');
    fireEvent.click(screen.getAllByRole('link')[0]);
    expect(calls()).toHaveLength(1);
    localStorage.setItem('lwa_cv3', JSON.stringify({ a: false }));
    for (const link of screen.getAllByRole('link')) fireEvent.click(link);
    expect(calls()).toHaveLength(1);
  });
  it('emits one canonical intent for each delegated plus component click, and two for two real clicks', () => {
    draw(); allow();
    for (const link of screen.getAllByRole('link')) fireEvent.click(link);
    expect(calls().map(call => [call[1], (call[2] as Record<string, unknown>).channel])).toEqual([
      ['helpline_engagement', 'phone'], ['helpline_engagement', 'email'],
      ['helpline_engagement', 'whatsapp'], ['helpline_engagement', 'contact_form'],
    ]);
    fireEvent.click(screen.getAllByRole('link')[0]);
    expect(calls().filter(call => (call[2] as Record<string, unknown>).channel === 'phone')).toHaveLength(2);
    expect(JSON.stringify(calls())).not.toMatch(/tel:|mailto:|wa\.me|helpline_click/);
  });
  it('does not let a blocked sender break a contact click', () => {
    draw(); allow(); window.gtag = vi.fn(() => { throw new Error('Blocked'); });
    expect(() => fireEvent.click(screen.getAllByRole('link')[0])).not.toThrow();
  });
});
