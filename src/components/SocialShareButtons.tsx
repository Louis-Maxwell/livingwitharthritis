import { useRef, useState } from 'react';
import {
  Twitter,
  Facebook,
  MessageCircle,
  Mail,
  Share2,
  Link as LinkIcon,
  Copy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SocialShareButtonsProps {
  title: string;
  slug: string;
  instance?: "header" | "footer";
}

const SocialShareButtons = ({ title, slug, instance = "footer" }: SocialShareButtonsProps) => {
  const url = `https://livingwitharthritis.org.uk/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      label: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      label: 'Email',
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ];

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied');
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
        return;
      }
    } catch {
      // fall through to manual selection
    }
    const el = inputRef.current;
    if (el) {
      el.focus();
      el.select();
      toast.success('Select and copy the link');
    } else {
      toast.error('Could not copy link');
    }
  };

  const handleShare = async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({ title, url });
    } catch {
      // user cancelled — no action needed
    }
  };

  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  return (
    <section
      aria-label="Share this article"
      className="mb-8 rounded-2xl border border-border/60 bg-muted/30 p-4 sm:p-5"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        Share this article
      </p>

      {/* Shareable link row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2.5">
        <label htmlFor={`share-url-${slug}`} className="sr-only">
          Article link
        </label>
        <input
          ref={inputRef}
          id={`share-url-${slug}`}
          type="text"
          readOnly
          value={url}
          onFocus={(e) => e.currentTarget.select()}
          className="min-w-0 flex-1 rounded-full border border-border/50 bg-background px-4 py-2 text-sm text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={handleCopy}
            className="gap-2 rounded-full bg-primary px-4 text-primary-foreground hover:bg-primary/90"
          >
            {copied ? <Copy className="h-4 w-4" aria-hidden="true" /> : <LinkIcon className="h-4 w-4" aria-hidden="true" />}
            Copy link
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

      {/* Platform share buttons */}
      <div className="mt-3 flex items-center gap-2">
        {shareLinks.map(({ label, icon: Icon, href }) => (
          <Button
            key={label}
            variant="outline"
            size="sm"
            asChild
            className="h-9 w-9 p-0 rounded-full border-border/40 text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all"
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
