import { MessageCircle } from "lucide-react";

interface WhatsAppShareProps {
  /** Canonical path, e.g. "/guides/knee-exercises-for-osteoarthritis". */
  path: string;
  /** Page title used in the pre-filled message. */
  title: string;
  /** Optional override for the pre-filled WhatsApp message. */
  shareText?: string;
}

/**
 * One-tap "Share with carer / family" WhatsApp module (Pillar 4, Phase 1).
 * Opens the native WhatsApp share sheet with a warm, pre-filled summary.
 */
export default function WhatsAppShare({ path, title, shareText }: WhatsAppShareProps) {
  const url = `https://livingwitharthritis.org.uk${path}`;
  const message =
    shareText ??
    `I found this free guide from Living With Arthritis and thought it might help: ${title} — ${url}`;
  const href = `https://wa.me/?text=${encodeURIComponent(message)}`;

  return (
    <div className="no-print my-8 rounded-xl border border-border bg-white p-6">
      <h2 className="text-lg font-bold text-foreground mb-1">Share this with someone who helps you</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Send this guide to a family member or carer in one tap, so they know how to support you.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        Share on WhatsApp
      </a>
    </div>
  );
}
