import { Twitter, Facebook, MessageCircle, Link as LinkIcon } from "lucide-react";
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
    },
    {
      label: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        Share this article
      </p>
      <div className="flex items-center gap-2">
        {links.map(({ label, icon: Icon, href }) => (
          <Button
            key={label}
            variant="outline"
            size="sm"
            asChild
            className="h-9 w-9 p-0 rounded-full border-border/40 text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all"
          >
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${label}`}>
              <Icon className="w-4 h-4" />
            </a>
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={copyLink}
          className="h-9 w-9 p-0 rounded-full border-border/40 text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all"
          aria-label="Copy link"
        >
          <LinkIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default SocialShareButtons;
