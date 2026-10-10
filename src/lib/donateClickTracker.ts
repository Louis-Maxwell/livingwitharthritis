// Records every click on a Donate button/link site-wide.
// Uses plain fetch (no backend client import) so a missing config can
// never crash the page.
const BACKEND_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://zrvcejlncpndjfyuvcrd.supabase.co';
const PUBLIC_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpydmNlamxuY3BuZGpmeXV2Y3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMjExMDAsImV4cCI6MjA4NTU5NzEwMH0.qOueBdqCYFMZKAROVBqqP8gNi0Li8JkMwvary2YfJzs';

export const backendHeaders = {
  apikey: PUBLIC_KEY,
  Authorization: `Bearer ${PUBLIC_KEY}`,
  'Content-Type': 'application/json',
};
export const backendUrl = BACKEND_URL;

const DONATE_HREF = /gofundme\.com|\/donate(\b|\/|\?|$)|\/zakat-appeal/i;

export function isDonateElement(label: string, href: string): boolean {
  return /\bdonat(e|ion)/i.test(label) || DONATE_HREF.test(href);
}

export function installDonateClickTracker(): void {
  if (typeof document === 'undefined') return;
  document.addEventListener(
    'click',
    (e) => {
      try {
        const el = (e.target as Element | null)?.closest('a, button');
        if (!el) return;
        const label = (el.textContent || el.getAttribute('aria-label') || '')
          .replace(/\s+/g, ' ')
          .replace(/\(opens in a new tab\)/i, '')
          .trim()
          .slice(0, 120);
        const href = el.getAttribute('href') || '';
        if (!isDonateElement(label, href)) return;
        fetch(`${BACKEND_URL}/rest/v1/donate_clicks`, {
          method: 'POST',
          keepalive: true,
          headers: { ...backendHeaders, Prefer: 'return=minimal' },
          body: JSON.stringify({
            page_path: window.location.pathname.slice(0, 300),
            button_label: label || 'Donate',
            destination: (href || 'button').slice(0, 500),
          }),
        }).catch(() => {});
      } catch {
        /* tracking must never break the page */
      }
    },
    { capture: true },
  );
}
