import { useState } from 'react';
export default function BlogPdfDownload({ title, html, slug }: { title: string; html: string; slug: string }) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  async function download() {
    setBusy(true); setStatus('Preparing article PDF...');
    try {
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      parsed.querySelectorAll('script, style, iframe').forEach(n => n.remove());
      parsed.querySelectorAll('p,h1,h2,h3,h4,li,tr,figcaption').forEach(n => n.append('\n'));
      const citations = Array.from(parsed.querySelectorAll('a[href]')).map(a => `${a.textContent}: ${new URL(a.getAttribute('href') ?? '', window.location.origin).href}`).join('\n');
      const { saveTextPdf } = await import('@/lib/pagePdf');
      await saveTextPdf(title, (parsed.body.textContent ?? '') + '\nLinks and sources\n' + citations, `${slug}.pdf`);
      setStatus('Article PDF downloaded.');
    } catch { setStatus('PDF download failed. Please use Print / save PDF.'); }
    finally { setBusy(false); }
  }
  return <div><button type="button" disabled={busy} onClick={download} className="min-h-11 rounded-md border px-3 text-sm disabled:opacity-50">Download article PDF (text)</button><span role="status" className="block text-xs">{status}</span></div>;
}
