import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Dumbbell, Apple, Stethoscope, BookOpen, MessageCircle, Heart } from "lucide-react";

interface CrossLink {
  to: string;
  icon: React.ElementType;
  label: string;
  description: string;
}

const LINK_LIBRARY: Record<string, CrossLink> = {
  exercises: {
    to: "/exercises",
    icon: Dumbbell,
    label: "Exercise Hub",
    description: "clinically aligned routines for knees, hands, shoulders and more",
  },
  diet: {
    to: "/diet",
    icon: Apple,
    label: "Diet & Nutrition Hub",
    description: "Anti-inflammatory Mediterranean diet plans and recipes",
  },
  osteoarthritis: {
    to: "/conditions/osteoarthritis",
    icon: Stethoscope,
    label: "Osteoarthritis Guide",
    description: "Symptoms, causes, diagnosis and management for OA",
  },
  rheumatoid: {
    to: "/conditions/rheumatoid-arthritis",
    icon: Heart,
    label: "Rheumatoid Arthritis",
    description: "Understand RA symptoms, treatments and flare management",
  },
  psoriatic: {
    to: "/conditions/psoriatic-arthritis",
    icon: Stethoscope,
    label: "Psoriatic Arthritis",
    description: "Skin-joint connection, symptoms and UK treatment options",
  },
  blog: {
    to: "/blog",
    icon: BookOpen,
    label: "Blog & Research",
    description: "Expert articles on supplements, exercises and daily living",
  },
  chat: {
    to: "/chat",
    icon: MessageCircle,
    label: "Help Chat",
    description: "Ask about symptoms, exercises, diet — free and instant",
  },
  flareups: {
    to: "/arthritis-flare-ups",
    icon: Stethoscope,
    label: "Flare-Up Guide",
    description: "Triggers, relief strategies and when to seek help",
  },
  "guide-diet": {
    to: "/guides/diet",
    icon: Apple,
    label: "Complete Diet Guide",
    description: "Mediterranean diet, meal plans and foods to avoid",
  },
  "guide-exercise": {
    to: "/guides/exercise",
    icon: Dumbbell,
    label: "Complete Exercise Guide",
    description: "Evidence-based routines, swimming, yoga and strength training",
  },
  "guide-health-services": {
    to: "/guides/health-services",
    icon: Stethoscope,
    label: "Health Services Guide",
    description: "GP referrals, rheumatology and physiotherapy pathways",
  },
  "guide-benefits": {
    to: "/guides/benefits-pip",
    icon: BookOpen,
    label: "Benefits & PIP Guide",
    description: "PIP eligibility, application process and disability support",
  },
  "guide-knee-oa": {
    to: "/guides/knee-exercises-for-osteoarthritis",
    icon: Dumbbell,
    label: "Free knee exercises for osteoarthritis",
    description: "NICE-aligned 8-move home routine for knee OA",
  },
  "guide-free-resources": {
    to: "/guides/free-arthritis-resources-uk",
    icon: BookOpen,
    label: "Free arthritis resources UK",
    description: "Guides, home physio, PIP diary and flare tools",
  },
};

/** Preset link groups by page context */
const PRESETS: Record<string, string[]> = {
  "condition": ["exercises", "diet", "chat", "flareups"],
  "exercise": ["guide-knee-oa", "diet", "guide-free-resources", "osteoarthritis"],
  "diet": ["exercises", "osteoarthritis", "guide-diet", "chat"],
  "blog": ["exercises", "diet", "osteoarthritis", "chat"],
  "flareup": ["exercises", "diet", "guide-health-services", "chat"],
  "guide": ["exercises", "diet", "blog", "chat"],
};

interface CrossLinkBannerProps {
  /** Use a preset group: "condition", "exercise", "diet", "blog", "flareup", "guide" */
  preset?: string;
  /** Or pass specific link keys from LINK_LIBRARY */
  links?: string[];
  /** Path to exclude (current page) */
  exclude?: string;
  /** Section title override */
  title?: string;
}

const CrossLinkBanner = memo(({ preset = "blog", links, exclude, title }: CrossLinkBannerProps) => {
  const keys = links || PRESETS[preset] || PRESETS.blog;
  const items = keys
    .map((k) => LINK_LIBRARY[k])
    .filter((item): item is CrossLink => !!item && item.to !== exclude)
    .slice(0, 4);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Related resources" className="my-12 print:hidden">
      <h3 className="font-display text-lg font-bold text-foreground mb-4">
        {title || "Continue exploring"}
      </h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="group flex items-start gap-3.5 rounded-xl border border-border/60 bg-card p-4 hover:shadow-md hover:border-primary/25 transition-all duration-300"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/8 text-primary shrink-0 group-hover:bg-primary/15 transition-colors">
                <Icon className="w-4.5 h-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight mb-0.5">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary shrink-0 mt-1 group-hover:translate-x-0.5 transition-all" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
});

CrossLinkBanner.displayName = "CrossLinkBanner";
export default CrossLinkBanner;
