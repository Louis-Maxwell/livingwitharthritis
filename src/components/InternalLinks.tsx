import { memo, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Activity, Apple, Users, Dumbbell, Heart, BookOpen, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";

interface SitePage {
  path: string;
  title: string;
  description: string;
  icon: React.ElementType;
  tags: string[];
}

const SITE_PAGES: SitePage[] = [
  { path: "/conditions/osteoarthritis", title: "Osteoarthritis Guide", description: "Symptoms, causes, diagnosis and evidence-based management for the UK's most common joint condition.", icon: Stethoscope, tags: ["condition", "osteoarthritis", "joints", "pain"] },
  { path: "/conditions/rheumatoid-arthritis", title: "Rheumatoid Arthritis", description: "Understand RA symptoms, treatments, flare management and living well with autoimmune arthritis.", icon: Heart, tags: ["condition", "rheumatoid", "autoimmune", "inflammation"] },
  { path: "/conditions/psoriatic-arthritis", title: "Psoriatic Arthritis", description: "Learn about psoriatic arthritis symptoms, skin-joint connection and UK treatment options.", icon: Activity, tags: ["condition", "psoriatic", "skin", "autoimmune"] },
  { path: "/exercises", title: "Exercise Hub", description: "Low-impact exercises, physio routines and activity trackers to strengthen joints and reduce stiffness.", icon: Dumbbell, tags: ["exercise", "physio", "movement", "strength"] },
  { path: "/diet", title: "Diet & Nutrition Hub", description: "Anti-inflammatory recipes, Mediterranean diet plans and foods that help manage arthritis symptoms.", icon: Apple, tags: ["diet", "nutrition", "anti-inflammatory", "food"] },
  { path: "/community", title: "Community Hub", description: "Connect with others living with arthritis through peer support forums and shared stories.", icon: Users, tags: ["community", "support", "forum", "stories"] },
  { path: "/blog", title: "Blog & Articles", description: "Expert articles on managing arthritis, from cold-weather tips to supplement reviews.", icon: BookOpen, tags: ["blog", "articles", "tips", "research"] },
  { path: "/arthritis-flare-ups", title: "Flare-Up Guide", description: "What to do during an arthritis flare-up: triggers, relief strategies and when to seek help.", icon: Activity, tags: ["flare", "pain", "management", "relief"] },
  
  { path: "/about", title: "About Us", description: "Our mission, team and commitment to supporting people living with arthritis across the UK.", icon: Heart, tags: ["about", "charity", "mission"] },
  { path: "/guides/uk-arthritis", title: "UK Arthritis Guide", description: "Comprehensive guide to living with arthritis in the United Kingdom — care pathways, treatments and support.", icon: BookOpen, tags: ["guide", "arthritis", "UK", "the health service"] },
  { path: "/guides/health-services", title: "Health Services Guide", description: "Navigate arthritis services: GP referrals, rheumatology, physiotherapy and specialist pathways.", icon: Stethoscope, tags: ["guide", "the health service", "referral", "rheumatology"] },
  { path: "/guides/diet", title: "Diet Guide", description: "Complete anti-inflammatory diet guide for arthritis: Mediterranean diet, meal plans and foods to avoid.", icon: Apple, tags: ["guide", "diet", "anti-inflammatory", "food"] },
  { path: "/guides/exercise", title: "Exercise Guide", description: "Evidence-based exercise guide for arthritis: low-impact routines, swimming, yoga and strength training.", icon: Dumbbell, tags: ["guide", "exercise", "physio", "movement"] },
  { path: "/guides/benefits-pip", title: "Benefits & PIP Guide", description: "UK benefits guide for arthritis: PIP eligibility, application process and disability support.", icon: Heart, tags: ["guide", "PIP", "benefits", "disability"] },
  { path: "/donate", title: "Donate", description: "Support our mission to provide free arthritis support across the UK. Every donation helps.", icon: Heart, tags: ["donate", "charity", "support"] },
  { path: "/chat", title: "Help Chat", description: "Free personalised arthritis assistant — ask about symptoms, exercises, diet and health services.", icon: Activity, tags: ["chat", "support", "help"] },
];

// Score relevance based on shared tags
function getRelated(currentPath: string, count = 4): SitePage[] {
  const current = SITE_PAGES.find((p) => p.path === currentPath);
  if (!current) {
    return SITE_PAGES.filter((p) => p.path !== currentPath).slice(0, count);
  }

  const scored = SITE_PAGES
    .filter((p) => p.path !== currentPath)
    .map((page) => {
      const shared = page.tags.filter((t) => current.tags.includes(t)).length;
      // Boost cross-type links (condition→hub, hub→condition)
      const isCondition = (p: SitePage) => p.tags.includes("condition");
      const crossBonus = isCondition(current) !== isCondition(page) ? 0.5 : 0;
      return { page, score: shared + crossBonus };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, count).map((s) => s.page);
}

const InternalLinks = memo(() => {
  const { pathname } = useLocation();
  const links = useMemo(() => getRelated(pathname), [pathname]);

  if (links.length === 0) return null;

  return (
    <nav aria-label="Related pages" className="bg-muted/30 border-t border-border/40">
      <div className="container mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2 text-center">
          Explore More Resources
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto text-sm">
          Continue your journey with these related guides and tools
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map((page, i) => {
            const Icon = page.icon;
            return (
              <motion.div
                key={page.path}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
              >
                <Link
                  to={page.path}
                  className="group flex flex-col h-full rounded-xl border border-border/60 bg-card p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                      <Icon className="w-4 h-4" />
                    </span>
                    <h3 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                      {page.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4 flex-1 line-clamp-3">
                    {page.description}
                  </p>
                  <span className="text-primary text-xs font-medium inline-flex items-center gap-1 group-hover:gap-1.5 transition-all mt-auto">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </nav>
  );
});

InternalLinks.displayName = "InternalLinks";
export default InternalLinks;
