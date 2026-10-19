import { useState } from 'react';
import { Download } from 'lucide-react';

/** Shared article PDF action. Uses browser print to retain article images, links and styles. */
export default function BlogPdfDownload({ title, html, slug }: { title: string; html: string; slug: string }) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  function download() {
    setBusy(true);
    setStatus('Choose “Save as PDF” in the print destination.');
    try {
      // Print the actual article page rather than reducing its contents to plain text.
      // Existing @media print rules control the article layout and hide navigation.
      window.print();
    } catch {
      setStatus('Unable to open the print dialog. Use your browser Print command.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="no-print">
      <button type="button" disabled={busy} onClick={download}
        aria-label={`Download ${title} as PDF using browser print`}
        className="inline-flex min-h-11 items-center gap-2 rounded-md border px-3 text-sm font-medium disabled:opacity-50">
        <Download aria-hidden="true" className="h-4 w-4" /> Download PDF
      </button>
      <span role="status" className="block text-xs">{status}</span>
    </div>
  );
}
