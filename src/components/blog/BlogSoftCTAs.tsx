import { Link } from "react-router-dom";
import { Heart, Mail } from "lucide-react";
import EmailSignupForm from "@/components/EmailSignupForm";

interface BlogSoftCTAsProps {
  /** Compact layout for mid-index insertion */
  variant?: "banner" | "inline";
  className?: string;
}

/**
 * Non-intrusive newsletter + soft donate CTAs for the blog section.
 * Uses existing EmailSignupForm and /donate — charity 1218461.
 */
const BlogSoftCTAs = ({ variant = "banner", className = "" }: BlogSoftCTAsProps) => {
  if (variant === "inline") {
    return (
      <aside
        aria-label="Stay in touch"
        className={`rounded-2xl border border-border/40 bg-card p-5 md:p-6 ${className}`}
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary mb-1.5 inline-flex items-center gap-1.5">
              <Mail className="w-3 h-3" aria-hidden="true" /> Newsletter
            </p>
            <h2 className="font-display text-lg font-bold text-foreground mb-1">
              Practical arthritis updates
            </h2>
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              Free guides when we publish something useful — no spam. Living With Arthritis UK
              (charity 1218461).
            </p>
            <EmailSignupForm
              compact
              sequence="blog-inline"
              label=""
              buttonText="Join"
              className="max-w-md"
            />
          </div>
          <div className="lg:w-56 shrink-0 rounded-xl border border-primary/15 bg-primary/[0.03] p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary mb-1.5 inline-flex items-center gap-1.5">
              <Heart className="w-3 h-3" aria-hidden="true" /> Support
            </p>
            <p className="text-sm text-foreground/85 leading-relaxed mb-3">
              If our guides help, a gift keeps them free for UK readers.
            </p>
            <Link
              to="/donate"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary/30 px-4 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Donate
            </Link>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Newsletter and donate"
      className={`mt-14 rounded-2xl border border-primary/20 bg-primary/[0.04] p-6 md:p-8 ${className}`}
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary mb-2 inline-flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" aria-hidden="true" /> Free updates
          </p>
          <h2 className="font-display text-xl font-bold text-foreground mb-2">
            Get arthritis guides in your inbox
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-md">
            Evidence-based tips on exercise, diet and flare-ups from Living With Arthritis UK —
            registered charity 1218461. Unsubscribe anytime.
          </p>
          <EmailSignupForm sequence="blog-banner" buttonText="Get free guides" />
        </div>
        <div className="flex flex-col justify-center rounded-xl border border-border/40 bg-card/80 p-5 md:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary mb-2 inline-flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5" aria-hidden="true" /> Soft ask
          </p>
          <h2 className="font-display text-lg font-bold text-foreground mb-2">
            Keep this advice free
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            We are independent of Arthritis UK. Motion is lotion — and honest guides stay free when
            readers who can, chip in.
          </p>
          <Link
            to="/donate"
            className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Heart className="w-4 h-4" aria-hidden="true" />
            Visit donate page
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default BlogSoftCTAs;
