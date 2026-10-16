import { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buildArticlePdfText, type PdfCitation } from '@/lib/blog/articlePdfText';

interface Props {
  title: string;
  html: string;
  slug: string;
  directAnswer?: string;
  faqs?: { question: string; answer: string }[];
  citations?: PdfCitation[];
  reviewLine?: string;
  disclaimer?: string;
}

/** Downloads the complete guide (answer, body, FAQs, sources, notice). */
export default function BlogPdfDownload(props: Props) {
  const [isBusy, setIsBusy] = useState(false);
  const [status, setStatus] = useState('');

  async function download() {
    setIsBusy(true);
    setStatus('Preparing article PDF...');
    try {
      const text = buildArticlePdfText({ ...props, origin: window.location.origin });
      const { saveTextPdf } = await import('@/lib/pagePdf');
      await saveTextPdf(props.title, text, `${props.slug}.pdf`);
      setStatus('Article PDF downloaded.');
    } catch {
      setStatus('PDF download failed. Please use Print / save PDF.');
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <div>
      <Button
        type="button"
        size="sm"
        disabled={isBusy}
        onClick={download}
        className="min-h-11"
      >
        <Download className="w-4 h-4 mr-2" aria-hidden="true" />
        Download full article (PDF)
      </Button>
      <span role="status" className="block text-xs">{status}</span>
    </div>
  );
}
