import { useState } from 'react';

type Citation = { label: string; url: string };
type Props = { title: string; html: string; slug: string; citations?: Citation[] };

/** Shared by every published article. PDF is text-only; browser Print preserves images. */
export default function BlogPdfDownload({ title, html, slug, citations = [] }: Props) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');

  async function download() {
    if (busy) return;
    setBusy(true);
    setStatus('Preparing article PDF...');
    try {
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      parsed.querySelectorAll('script, style, iframe, form, button, nav').forEach(node => node.remove());
      parsed.querySelectorAll('p, h1, h2, h3, h4, li, tr, figcaption, blockquote').forEach(node => node.append('\n'));
      const body = (parsed.body.textContent ?? '').trim();
      if (!body) throw new Error('Empty article');
      const urls = new Map<string, string>();
      for (const link of parsed.querySelectorAll('a[href]')) {
        const raw = link.getAttribute('href');
        if (!raw || /^(javascript|data):/i.test(raw.trim())) continue;
        try {
          const url = new URL(raw, window.location.origin);
          if (url.protocol === 'https:' || url.protocol === 'http:') urls.set(url.href, link.textContent?.trim() || url.href);
        } catch { /* Ignore malformed links. */ }
      }
      for (const citation of citations) {
        try {
          const url = new URL(citation.url);
          if (url.protocol === 'https:' || url.protocol === 'http:') urls.set(url.href, citation.label || url.href);
        } catch { /* Ignore malformed citation URLs. */ }
      }
      const sources = [...urls].map(([url, label]) => `${label}: ${url}`).join('\n');
      const { saveTextPdf } = await import('@/lib/pagePdf');
      const safeSlug = slug.replace(/[^a-z0-9-_]/gi, '-').slice(0, 100) || 'article';
      await saveTextPdf(title, body + (sources ? '\n\nLinks and sources\n' + sources : ''), `${safeSlug}.pdf`);
      setStatus('Article PDF downloaded.');
    } catch {
      setStatus('PDF download failed. Use Print / save PDF instead.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button type="button" disabled={busy} aria-busy={busy} onClick={download}
        className="min-h-11 rounded-md border px-3 text-sm disabled:opacity-50">
        {busy ? 'Preparing PDF…' : 'Download article PDF (text only)'}
      </button>
      <span role="status" aria-live="polite" className="block text-xs">{status}</span>
    </div>
  );
}
