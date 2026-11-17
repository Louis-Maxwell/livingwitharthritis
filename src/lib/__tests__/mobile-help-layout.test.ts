import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('help launcher mobile layout', () => {
  const source = readFileSync('src/components/ChatBotWidget.tsx', 'utf8');
  it('keeps the mobile launcher in document flow with desktop positioning only', () => {
    expect(source).toContain('relative mx-auto mb-24 mt-4');
    expect(source).toContain('lg:fixed');
    expect(source).not.toContain('fixed bottom-[88px]');
  });
  it('preserves labelled help controls and keyboard dismissal', () => {
    expect(source).toContain('aria-controls="help-chat-panel"');
    expect(source).toContain('useEscapeToClose(open, close, launcherRef)');
    expect(readFileSync('src/components/MobileBottomNav.tsx', 'utf8')).toContain('href: "/chat"');
  });
});
