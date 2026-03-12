import { Twitter, Facebook, MessageCircle, Share2, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SocialShareButtonsProps {
  title: string;
  slug: string;
}

const SocialShareButtons = ({ title, slug }: SocialShareButtonsProps) => {
  const url = `https://livingwitharthritis.org.uk/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      className: "hover:bg-[hsl(203,89%,53%)]/10 hover:text-[hsl(203,89%,53%)] hover:border-[hsl(203,89%,53%)]/30",
    },
    {
      label: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      className: "hover:bg-[hsl(221,44%,41%)]/10 hover:text-[hsl(221,44%,41%)] hover:border-[hsl(221,44%,41%)]/30",
    },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      className: "hover:bg-[hsl(142,70%,40%)]/10 hover:text-[hsl(142,70%,40%)] hover:border-[hsl(142,70%,40%)]/30",
    },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="border-t border-b border-border/40 py-6 my-8">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
          <Share2 className="w-4 h-4" /> Share this article
        </span>
        <div className="flex gap-2">
          {links.map(({ label, icon: Icon, href, className }) => (
            <Button
              key={label}
              variant="outline"
              size="sm"
              asChild
              className={`gap-1.5 text-muted-foreground transition-all ${className}`}
            >
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${label}`}>
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </a>
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={copyLink}
            className="gap-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <LinkIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Copy link</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SocialShareButtons;
