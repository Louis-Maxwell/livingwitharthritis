import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EmergencyRedirectDialog from '@/components/ai/EmergencyRedirectDialog';
import BlogPdfDownload from '@/components/BlogPdfDownload';
import {
  COUNTRY_SAFETY,
  emergencyLineFor,
  loadChatCountry,
  saveChatCountry,
  serviceUnavailableMessage,
} from '@/lib/chatbot/emergencyContacts';

vi.mock('@/lib/pagePdf', () => ({ saveTextPdf: vi.fn(async () => {}) }));

describe('country emergency numbers', () => {
  it('uses 999 / 112 / 911 as the emergency numbers', () => {
    expect(emergencyLineFor('UK').dial).toBe('999');
    expect(emergencyLineFor('IN').dial).toBe('112');
    expect(emergencyLineFor('US').dial).toBe('911');
  });

  it('keeps NHS 111 for the UK and 988 for the US crisis line', () => {
    expect(COUNTRY_SAFETY.UK.lines.map((l) => l.dial)).toContain('111');
    expect(COUNTRY_SAFETY.US.lines.map((l) => l.dial)).toContain('988');
    expect(COUNTRY_SAFETY.US.lines.map((l) => l.dial)).not.toContain('111');
  });

  it('defaults to the UK and ignores bad stored values', () => {
    localStorage.setItem('lwa_chat_country_v1', 'FR');
    expect(loadChatCountry()).toBe('UK');
    saveChatCountry('IN');
    expect(loadChatCountry()).toBe('IN');
  });

  it('names the emergency number when the chat is unavailable', () => {
    expect(serviceUnavailableMessage('US')).toMatch(/call 911/);
  });

  it('dialog links each line to the right number for the chosen country', () => {
    render(<EmergencyRedirectDialog open onClose={() => {}} country="IN" />);
    expect(screen.getByRole('link', { name: /^112/ })).toHaveAttribute('href', 'tel:112');
    expect(screen.queryByText('999')).toBeNull();
  });

  it('UK dialog labels the 111 link as NHS 111', () => {
    render(<EmergencyRedirectDialog open onClose={() => {}} />);
    expect(screen.getByRole('link', { name: /NHS 111/ })).toHaveAttribute('href', 'tel:111');
  });
});

describe('BlogPdfDownload', () => {
  it('says the PDF is text-only and reports success', async () => {
    render(<BlogPdfDownload title="T" html="<p>Body</p>" slug="s" />);
    const button = screen.getByRole('button', { name: /download full article/i });
    expect(button).toHaveAccessibleDescription(/Pictures are not included/);
    fireEvent.click(button);
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Article PDF downloaded.'));
  });
});
