import { useRef, useState } from "react";
import {
  Twitter,
  Facebook,
  MessageCircle,
  Mail,
  Share2,
  Link as LinkIcon,
  Check,
  Copy,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { buildGroupShareText } from "@/lib/groupShareText";
import { buildCanonicalBlogUrl } from "@/lib/blogShareUrl";

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
  const url = buildCanonicalBlogUrl(slug);
  const shareText = buildGroupShareText(title, url, excerpt);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedShare = encodeURIComponent(shareText);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [copied, setCopied] = useState<"link" | "group" | null>(null);
  const compact = variant === "compact";

  const shareLinks = [
    {
      label: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedShare}`,
    },
    {
      label: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "Email",
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

  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";
  const linkCopied = copied === "link";
  const groupCopied = copied === "group";

  return (
    <section
      aria-label="Share this article"
      className={
        compact
          ? "rounded-xl border border-border/50 bg-muted/20 p-3 sm:p-3.5"
          : "mb-8 rounded-2xl border border-border/60 bg-muted/30 p-4 sm:p-5"
      }
    >
      <div className="flex items-center justify-between gap-3 mb-2 sm:mb-3">
        <p
          className={`font-semibold uppercase tracking-widest text-muted-foreground ${
            compact ? "text-[11px]" : "text-xs"
          }`}
        >
          Share this article
        </p>
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {linkCopied ? "Copied" : groupCopied ? "Copied for groups" : ""}
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
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
            className={`min-w-0 w-full flex-1 rounded-full border border-border/50 bg-background px-4 text-sm text-foreground/80 overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              compact ? "min-h-11 py-2" : "min-h-11 py-2.5"
            }`}
          />
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-2 w-full sm:w-auto shrink-0">
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={() => writeClipboard(url, "link")}
              aria-label={linkCopied ? "Copied" : "Copy link"}
              className="min-h-11 gap-2 rounded-full bg-primary px-4 text-primary-foreground hover:bg-primary/90 col-span-1"
            >
              {linkCopied ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <LinkIcon className="h-4 w-4" aria-hidden="true" />
              )}
              {linkCopied ? "Copied" : "Copy link"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => writeClipboard(shareText, "group")}
              aria-label={groupCopied ? "Copied for groups" : "Copy title, summary and link for groups"}
              className="min-h-11 gap-2 rounded-full px-3 col-span-1"
            >
              {groupCopied ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 sm:hidden" aria-hidden="true" />
                  Copy for groups
                </>
              )}
            </Button>
            {canShare && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="min-h-11 gap-2 rounded-full border-primary/30 px-4 text-primary hover:bg-primary/5 col-span-2 sm:col-span-1"
              >
                <Share2 className="h-4 w-4" aria-hidden="true" />
                Share
              </Button>
            )}
          </div>
        </div>

        <div
          className={`flex flex-wrap items-center gap-2 ${compact ? "pt-0.5" : "pt-1"}`}
          role="group"
          aria-label="Share on social networks"
        >
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
      </div>
    </section>
  );
};

export default SocialShareButtons;
