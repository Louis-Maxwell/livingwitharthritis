import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface NextReadItem {
  to: string;
  eyebrow: string;
  title: string;
  blurb: string;
}

interface NextReadStripProps {
  /** Route this strip is rendered on — used to filter out self-links. */
  currentPath?: string;
  /** Optional override; defaults to a curated 6-item pool. */
  items?: NextReadItem[];
  /** Heading shown above the cards. */
  heading?: string;
}

const DEFAULT_POOL: NextReadItem[] = [
  {
    to: "/conditions/osteoarthritis",
    eyebrow: "Condition guide",
    title: "Osteoarthritis explained",
    blurb: "Symptoms, causes and what actually helps — written for the UK.",
  },
  {
    to: "/guides/exercise",
    eyebrow: "Movement",
    title: "Exercises for arthritis",
    blurb: "Low-impact routines for knees, hips and hands. Clinically reviewed.",
  },
  {
    to: "/diet",
    eyebrow: "Nutrition",
    title: "Anti-inflammatory diet",
    blurb: "Mediterranean eating that helps stiffness and joint pain.",
  },
  {
    to: "/arthritis-flare-ups",
    eyebrow: "Flare-ups",
    title: "Managing a flare-up",
    blurb: "A step-by-step plan for the first 24 hours.",
  },
  {
    to: "/self-help-tool",
    eyebrow: "Tool",
    title: "Self-help tool",
    blurb: "Find the right next step for your symptoms in two minutes.",
  },
  {
    to: "/about",
    eyebrow: "About us",
    title: "Who we are",
    blurb: "A UK charity making physiotherapy and guidance free for everyone.",
  },
];

const NextReadStrip = memo(({ currentPath = "", items, heading = "Keep reading" }: NextReadStripProps) => {
  const pool = items ?? DEFAULT_POOL;
  const filtered = pool.filter((i) => i.to !== currentPath).slice(0, 3);
  if (filtered.length === 0) return null;

  return (
    <section
      aria-labelledby="next-read-heading"
      className="bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2
            id="next-read-heading"
            className="text-3xl md:text-4xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {heading}
          </h2>
          <Link
            to="/library"
            className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            Browse the full library <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {filtered.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group block rounded-2xl bg-white p-6 shadow-[0_1px_0_0_rgba(0,0,0,0.06)] ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:ring-primary/30"
              data-engagement="next-read-card"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {item.eyebrow}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                {item.blurb}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                Read now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
});

NextReadStrip.displayName = "NextReadStrip";
export default NextReadStrip;
