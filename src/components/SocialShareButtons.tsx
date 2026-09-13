import { useRef, useState } from 'react';
import {
  Twitter,
  Facebook,
  MessageCircle,
  Mail,
  Share2,
  Link as LinkIcon,
  Copy,
  Linkedin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { buildGroupShareText } from '@/lib/groupShareText';
import { SOCIAL_LINKS } from '@/config/social-media';

interface SocialShareButtonsProps {
  title: string;
  slug: string;
  excerpt?: string;
  instance?: "header" | "footer";
  variant?: "full" | "compact";
}

const SocialShareButtons = ({
  title,
  slug,
  excerpt,
  instance = "footer",
  variant = "full",
}: SocialShareButtonsProps) => {
  const url = `https://livingwitharthritis.org.uk/blog/${slug}`;
  const shareText = buildGroupShareText(title, url, excerpt);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedShare = encodeURIComponent(shareText);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [copied, setCopied] = useState<"link" | "group" | null>(null);
  const compact = variant === "compact";

  const shareLinks = [
    {
      label: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedShare}`,
    },
    {
      label: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: 'Email',
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=${encodedShare}`,
    },
  ];

  const writeClipboard = async (value: string, kind: "link" | "group") => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
        toast.success(kind === "group" ? "Copied for groups" : "Link copied");
        setCopied(kind);
        window.setTimeout(() => setCopied(null), 1800);
        return;
      }
    } catch {
      // fall through
    }
    const el = inputRef.current;
    if (el) {
      el.focus();
      el.select();
      toast.success("Select and copy the link");
    } else {
      toast.error("Could not copy");
    }
  };

  const handleShare = async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({ title, text: shareText, url });
    } catch {
      // cancelled
    }
  };

  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  return (
    <section
      aria-label="Share this article"
      className={
        compact
          ? "rounded-xl border border-border/50 bg-muted/20 p-3"
          : "mb-8 rounded-2xl border border-border/60 bg-muted/30 p-4 sm:p-5"
      }
    >
      <p className={`font-semibold uppercase tracking-widest text-muted-foreground ${compact ? "text-[11px] mb-2" : "text-xs mb-3"}`}>
        Share this article
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2.5">
        <label htmlFor={`share-url-${instance}-${slug}`} className="sr-only">
          Copy link
        </label>
        <input
          ref={inputRef}
          id={`share-url-${instance}-${slug}`}
          type="text"
          readOnly
          aria-label="Article URL"
          value={url}
          onFocus={(e) => e.currentTarget.select()}
          className={`min-w-0 w-full flex-1 rounded-full border border-border/50 bg-background px-4 text-sm text-foreground/80 overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${compact ? "py-2" : "py-2.5"}`}
        />
        <div className="flex items-center gap-2 min-w-0 w-full sm:w-auto shrink-0 flex-wrap">
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={() => writeClipboard(url, "link")}
            aria-label="Copy link"
            className="gap-2 rounded-full bg-primary px-4 text-primary-foreground hover:bg-primary/90"
          >
            {copied === "link" ? <Copy className="h-4 w-4" aria-hidden="true" /> : <LinkIcon className="h-4 w-4" aria-hidden="true" />}
            Copy link
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => writeClipboard(shareText, "group")}
            aria-label="Copy title, summary and link for groups"
            className="gap-2 rounded-full px-3"
          >
            Copy for groups
          </Button>
          {canShare && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="gap-2 rounded-full border-primary/30 px-4 text-primary hover:bg-primary/5"
            >
              <Share2 className="h-4 w-4" aria-hidden="true" />
              Share
            </Button>
          )}
        </div>
      </div>

      <div className={`${compact ? "mt-2" : "mt-3"} flex items-center gap-2`}>
        {shareLinks.map(({ label, icon: Icon, href }) => (
          <Button
            key={label}
            variant="outline"
            size="sm"
            asChild
            className="h-11 w-11 min-h-11 min-w-11 p-0 rounded-full border-border/40 text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all"
          >
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${label}`}>
              <Icon className="w-4 h-4" aria-hidden="true" />
            </a>
          </Button>
        ))}
      </div>
    </section>
  );
};

export default SocialShareButtons;
