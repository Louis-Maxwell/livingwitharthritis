import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

const allBlogPosts: BlogPost[] = [
  { slug: "arthritis-and-cold-weather-uk", title: "Arthritis and Cold Weather in the UK", excerpt: "Why arthritis pain worsens in cold weather and evidence-based tips for managing joint pain during UK winters.", date: "2026-02-24", category: "Lifestyle" },
  { slug: "swimming-for-arthritis-uk", title: "Swimming for Arthritis UK", excerpt: "Complete UK guide to swimming for arthritis with benefits, local hydrotherapy pools and safe strokes.", date: "2026-02-23", category: "Exercise" },
  { slug: "arthritis-flare-up-what-to-do", title: "Arthritis Flare-Up: What to Do", excerpt: "Learn what causes arthritis flare-ups and how to manage them effectively.", date: "2026-02-22", category: "Health" },
  { slug: "turmeric-for-arthritis-uk", title: "Turmeric for Arthritis UK", excerpt: "Evidence-based guide to using turmeric for arthritis with dosage and safety info.", date: "2026-02-21", category: "Supplements" },
  { slug: "best-diet-for-joint-pain-uk", title: "Best Diet for Joint Pain in the UK", excerpt: "Anti-inflammatory foods that help ease joint pain and stiffness.", date: "2026-02-20", category: "Nutrition" },
  { slug: "hand-exercises-for-arthritis", title: "Hand Exercises for Arthritis", excerpt: "Step-by-step hand exercises to reduce stiffness and improve grip strength.", date: "2026-02-19", category: "Exercise" },
  { slug: "nhs-arthritis-exercises", title: "NHS-Recommended Arthritis Exercises", excerpt: "Low-impact exercises endorsed by UK physiotherapists for managing arthritis.", date: "2026-02-18", category: "Exercise" },
  { slug: "arthritis-and-sleep-problems", title: "Arthritis and Sleep Problems", excerpt: "Evidence-based guide to improving sleep quality with arthritis.", date: "2026-02-17", category: "Lifestyle" },
  { slug: "yoga-for-arthritis-beginners", title: "Yoga for Arthritis Beginners", excerpt: "Beginner-friendly poses and modifications for joint pain.", date: "2026-02-16", category: "Exercise" },
  { slug: "osteoarthritis-symptoms-uk", title: "Osteoarthritis Symptoms UK", excerpt: "Recognise the early signs and understand UK treatment pathways.", date: "2026-02-15", category: "Health" },
  { slug: "arthritis-and-cycling-uk", title: "Cycling for Arthritis UK", excerpt: "Benefits for knee and hip joints, choosing the right bike and safe riding tips.", date: "2026-02-14", category: "Exercise" },
  { slug: "arthritis-and-mental-health", title: "Arthritis and Mental Health", excerpt: "How arthritis affects mental health and coping strategies.", date: "2026-02-13", category: "Health" },
  { slug: "arthritis-supplements-uk", title: "Best Supplements for Arthritis UK", excerpt: "Evidence-based review of glucosamine, collagen, turmeric and omega-3.", date: "2026-02-12", category: "Supplements" },
  { slug: "arthritis-and-omega-3-fish-oil", title: "Omega-3 and Fish Oil for Arthritis", excerpt: "Benefits, correct dosage, food sources and supplement recommendations.", date: "2026-02-11", category: "Supplements" },
  { slug: "knee-arthritis-exercises-uk", title: "Best Exercises for Knee Arthritis", excerpt: "Strengthening, flexibility and aerobic exercises for knee pain.", date: "2026-02-06", category: "Exercise" },
  { slug: "arthritis-pain-relief-natural", title: "Natural Pain Relief for Arthritis", excerpt: "Heat therapy, turmeric, TENS machines and what the research says.", date: "2026-02-05", category: "Treatment" },
  { slug: "rheumatoid-arthritis-diet-uk", title: "Best Diet for Rheumatoid Arthritis UK", excerpt: "Anti-inflammatory foods, meal plans and supplements for RA.", date: "2026-02-07", category: "Nutrition" },
  { slug: "arthritis-meal-planning-uk", title: "Arthritis Meal Planning UK", excerpt: "Budget-friendly weekly meal plans following the Mediterranean diet.", date: "2026-01-04", category: "Nutrition" },
  { slug: "tai-chi-for-arthritis-uk", title: "Tai Chi for Arthritis UK", excerpt: "Benefits for balance, pain and mobility, and how to find UK classes.", date: "2026-01-18", category: "Exercise" },
  { slug: "gut-health-arthritis-connection", title: "Gut Health and Arthritis", excerpt: "How your gut microbiome affects joint inflammation.", date: "2026-01-08", category: "Nutrition" },
];

interface RelatedArticlesProps {
  currentSlug: string;
  currentCategory?: string;
}

const RelatedArticles = memo(({ currentSlug }: RelatedArticlesProps) => {
  const related = useMemo(() => {
    const current = allBlogPosts.find((p) => p.slug === currentSlug);
    const category = current?.category;

    // Prioritise same category, then fallback to recent
    const sameCat = allBlogPosts.filter((p) => p.slug !== currentSlug && p.category === category);
    const others = allBlogPosts.filter((p) => p.slug !== currentSlug && p.category !== category);

    return [...sameCat, ...others].slice(0, 3);
  }, [currentSlug]);

  if (related.length === 0) return null;

  return (
    <aside className="mt-16 pt-12 border-t border-border/50">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        You might also like
      </h2>
      <div className="grid sm:grid-cols-3 gap-5">
        {related.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group rounded-xl border border-border/60 bg-card p-5 hover:shadow-medium hover:border-primary/20 transition-all duration-300"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-2 block">
              {post.category}
            </span>
            <h3 className="font-display text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
              {post.title}
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">
              {post.excerpt}
            </p>
            <span className="text-primary text-xs font-medium inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
              Read article <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
});

RelatedArticles.displayName = "RelatedArticles";
export default RelatedArticles;
