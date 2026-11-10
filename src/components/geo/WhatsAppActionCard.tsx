import { useState } from "react";
import { Check, Copy, MessageCircle } from "lucide-react";
import { SITE_ORIGIN, canonicalPath } from "@/lib/technicalSeo.mjs";
import { buildWhatsAppMessage } from "@/lib/whatsappShare";

interface WhatsAppActionCardProps {
  /** Page title as shown to the reader. */
  title: string;
  /** Site path of the page being shared, e.g. "/guides/benefits-pip". */
  path: string;
  /** One-sentence factual summary included in the message. */
  summary: string;
}

/**
 * "Send this to someone" card for family, friends and carer groups.
 * Uses the public wa.me share link (no tracking script, no API key).
 * Clicks are already counted as social_share by src/lib/auto-events.ts.
 */
export default function WhatsAppActionCard({ title, path, summary }: WhatsAppActionCardProps) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_ORIGIN}${canonicalPath(path)}`;
  const message = buildWhatsAppMessage(title, url, summary);
  const href = `https://wa.me/?text=${encodeURIComponent(message)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <aside
      aria-labelledby="share-whatsapp-heading"
      className="not-prose my-8 rounded-2xl border border-border bg-muted/40 p-5 sm:p-6 print:hidden"
      data-testid="whatsapp-action-card"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground" aria-hidden="true">
          <MessageCircle className="h-5 w-5" />
        </span>
        <div>
          <p id="share-whatsapp-heading" className="m-0 text-base font-semibold text-foreground">
            Know someone this could help?
          </p>
          <p className="m-0 mt-1 text-sm text-foreground/80">
            Send this free guide to a family member, friend or carer group on WhatsApp.
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={href}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Share on WhatsApp
        </a>
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {copied ? <Check className="h-4 w-4 text-primary" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          {copied ? "Message copied" : "Copy message"}
        </button>
        <span className="sr-only" role="status" aria-live="polite">
          {copied ? "Message copied to clipboard" : ""}
        </span>
      </div>
    </aside>
  );
}
