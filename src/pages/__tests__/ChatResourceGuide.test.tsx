import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { readFileSync } from 'node:fs';
import Chat from '../Chat';

vi.mock('@/components/ChatBot', () => ({ ChatBot: () => <div aria-label="Chat widget" /> }));
const overrides = JSON.parse(readFileSync('scripts/data/rendered-bodies.overrides.json', 'utf8')) as Record<string, string>;
const sitemap = new Set([...readFileSync('public/sitemap.xml', 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname));
const expectedLinks = ['/exercises', '/resources/symptom-flare-tracker', '/guides/benefits-pip'];
const normalise = (text: string | null) => (text || '').replace(/\s+/g, ' ').trim();

afterEach(cleanup);
function showGuide() {
  render(<HelmetProvider><MemoryRouter><Chat /></MemoryRouter></HelmetProvider>);
  return screen.getByRole('region', { name: 'Find information that fits your question' });
}

describe('Chat resource journeys', () => {
  it('offers separate everyday and UK benefits routes without requiring a chat question', () => {
    const guide = showGuide();
    expect(screen.getByRole('link', { name: 'Prefer to browse? Find guides and resources.' })).toHaveAttribute('href', '#chat-resource-guide');
    expect(within(guide).getByRole('heading', { name: 'Find information that fits your question' })).toHaveAttribute('tabindex', '-1');
    expect(within(guide).getByRole('heading', { name: 'Everyday living with arthritis' })).toBeVisible();
    expect(within(guide).getByRole('heading', { name: 'UK benefits and support' })).toBeVisible();
    expect(within(guide).getByRole('heading', { name: 'Ask a focused question' })).toBeVisible();
    expect(guide).toHaveTextContent('You can read our guides without using the chat.');
    expect(guide).toHaveTextContent('UK benefits and NHS information should not be treated as guidance for another country.');
    const links = within(guide).getAllByRole('link').map((a) => a.getAttribute('href'));
    expect(links).toEqual(expectedLinks);
    for (const href of expectedLinks) expect(sitemap.has(href)).toBe(true);
  });

  it('keeps the complete captured guide equal to what readers can see', () => {
    const guide = showGuide();
    const doc = new DOMParser().parseFromString(overrides['/chat'], 'text/html');
    const captured = doc.querySelector('[aria-labelledby="chat-resource-guide"]');
    expect(captured).not.toBeNull();
    expect(normalise(captured?.textContent || '')).toBe(normalise(guide.textContent));
    expect([...captured!.querySelectorAll('a')].map((a) => a.getAttribute('href'))).toEqual(expectedLinks);
  });

  it('keeps medical limits and data-minimisation guidance visible and captured', () => {
    const guide = showGuide();
    for (const text of [
      'Do not share identifying medical records, passwords or contact details.',
      'This chat cannot examine you or provide a diagnosis or personal treatment plan.',
      'Do not wait for a chat reply if you need medical attention;',
    ]) {
      expect(guide).toHaveTextContent(text);
      expect(overrides['/chat']).toContain(text);
    }
    expect(screen.getByRole('note', { name: 'Medical educational disclaimer' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Full medical disclaimer' })).toHaveAttribute('href', '/disclaimer');
  });
});
