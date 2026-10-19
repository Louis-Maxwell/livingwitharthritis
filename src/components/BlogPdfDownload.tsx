import { useState } from 'react';
import { Download } from 'lucide-react';
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
  return (
    <div className="space-y-1">
      <button
        type="button"
        disabled={busy}
        onClick={download}
        aria-label={`Download ${title} as a PDF`}
        className="inline-flex min-h-11 items-center gap-2 rounded-md border border-primary/30 px-3 text-sm font-medium text-primary transition-colors hover:bg-primary/5 disabled:cursor-wait disabled:opacity-50"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        {busy ? 'Preparing PDF…' : 'Download article PDF'}
      </button>
      <span role="status" aria-live="polite" className="block text-xs text-muted-foreground">
        {status}
      </span>
    </div>
  );
}
