import { useState } from 'react';
export default function PageDownloads() {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  async function directory() {
    setBusy(true); setStatus('Preparing URL directory...');
    try { const { downloadUrlDirectory } = await import('@/lib/pagePdf'); await downloadUrlDirectory(); setStatus('URL directory downloaded.'); }
    catch (e) { setStatus(e instanceof Error ? e.message : 'Download failed. Please try again.'); }
    finally { setBusy(false); }
  }
  return <section className="container mx-auto px-6 pt-6 no-print" aria-label="Page downloads">
    <div className="flex flex-wrap gap-4"><button type="button" className="min-h-11 underline" onClick={() => window.print()}>Print / save this page as PDF</button><button type="button" disabled={busy} className="min-h-11 underline disabled:opacity-50" onClick={directory}>Download all public URLs as PDF</button></div>
    <p className="text-xs text-muted-foreground">Choose Save as PDF in your device's print menu. The URL directory lists public pages; it does not bundle their contents.</p><p role="status" className="text-sm">{status}</p>
  </section>;
}
