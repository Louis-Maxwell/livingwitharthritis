import { memo, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Activity, Apple, Users, Dumbbell, Heart, BookOpen, Stethoscope, Search, ShieldCheck } from "lucide-react";
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
  { path: "/conditions/arthritis", title: "Arthritis Overview", description: "A complete introduction to arthritis types, symptoms, causes and treatment pathways in the UK.", icon: Stethoscope, tags: ["condition", "arthritis", "overview"] },
  { path: "/conditions/gout", title: "Gout", description: "Understand gout causes, uric-acid crystals, flare management and prevention through diet and medication.", icon: Activity, tags: ["condition", "gout", "flare", "diet"] },
  { path: "/conditions/lupus", title: "Lupus", description: "Systemic autoimmune condition with joint, skin and organ involvement — symptoms and UK care pathways.", icon: Heart, tags: ["condition", "lupus", "autoimmune"] },
  { path: "/conditions/fibromyalgia", title: "Fibromyalgia", description: "Chronic widespread pain, fatigue and sleep disturbance closely related to arthritis.", icon: Activity, tags: ["condition", "fibromyalgia", "pain", "fatigue"] },
  { path: "/conditions/ankylosing-spondylitis", title: "Ankylosing Spondylitis", description: "Inflammatory spinal arthritis (axial spondyloarthritis) — symptoms, HLA-B27 link and management.", icon: Stethoscope, tags: ["condition", "ankylosing-spondylitis", "spine"] },
  { path: "/conditions/juvenile-arthritis", title: "Juvenile Arthritis", description: "Arthritis in under-16s (juvenile idiopathic arthritis) — recognising symptoms and getting support.", icon: Heart, tags: ["condition", "juvenile-arthritis", "children"] },
  { path: "/conditions/knee-arthritis", title: "Knee Arthritis", description: "Osteoarthritis of the knee — symptoms, exercises and surgical considerations.", icon: Activity, tags: ["condition", "knee", "osteoarthritis", "exercise"] },
  { path: "/conditions/hip-arthritis", title: "Hip Arthritis", description: "OA and inflammatory arthritis of the hip joint — symptoms, exercise and treatment options.", icon: Activity, tags: ["condition", "hip", "osteoarthritis", "exercise"] },
  { path: "/conditions/shoulder-arthritis", title: "Shoulder Arthritis", description: "OA and inflammatory arthritis of the shoulder — symptoms, exercises and when to seek referral.", icon: Activity, tags: ["condition", "shoulder", "osteoarthritis", "exercise"] },
  { path: "/conditions/elbow-arthritis", title: "Elbow Arthritis", description: "Arthritis in the elbow joint — causes, symptoms and graded exercise guidance.", icon: Activity, tags: ["condition", "elbow", "osteoarthritis", "exercise"] },
  { path: "/conditions/polymyalgia-rheumatica", title: "Polymyalgia Rheumatica", description: "Inflammatory condition causing shoulder, neck and hip stiffness, mainly in adults over 50.", icon: Heart, tags: ["condition", "pmr", "inflammatory"] },
  { path: "/conditions/reactive-arthritis", title: "Reactive Arthritis", description: "Joint inflammation triggered by a recent infection — symptoms, recovery and treatment.", icon: Activity, tags: ["condition", "reactive-arthritis", "infection"] },
  { path: "/conditions/calcific-periarthritis", title: "Calcific Periarthritis", description: "Sudden shoulder or joint pain from calcium deposits in a tendon — symptoms, X-ray findings and treatment.", icon: Activity, tags: ["condition", "shoulder", "calcific-tendinitis", "inflammatory"] },
  { path: "/exercises", title: "Exercise Hub", description: "Low-impact exercises, physio routines and activity trackers to strengthen joints and reduce stiffness.", icon: Dumbbell, tags: ["exercise", "physio", "movement", "strength", "blog", "articles"] },
  { path: "/diet", title: "Diet & Nutrition Hub", description: "Anti-inflammatory recipes, Mediterranean diet plans and foods that help manage arthritis symptoms.", icon: Apple, tags: ["diet", "nutrition", "anti-inflammatory", "food", "blog", "articles"] },
  { path: "/community", title: "Community Hub", description: "Connect with others living with arthritis through peer support forums and shared stories.", icon: Users, tags: ["community", "support", "forum", "stories"] },
  { path: "/blog", title: "Blog & Articles", description: "Expert articles on managing arthritis, from cold-weather tips to supplement reviews.", icon: BookOpen, tags: ["blog", "articles", "tips", "research"] },
  { path: "/guides", title: "Guides Hub", description: "Practical UK arthritis guides — benefits, exercise, diet, pain relief and NHS pathways.", icon: BookOpen, tags: ["guide", "arthritis", "UK", "blog", "articles"] },
  { path: "/benefits-pip", title: "Benefits & PIP Hub", description: "UK starting point for PIP, disability support, work rights and arthritis benefits.", icon: Heart, tags: ["PIP", "benefits", "disability", "guide", "finances"] },
  { path: "/search", title: "Search guides & articles", description: "Filter Living With Arthritis UK guides and blog posts by topic and length.", icon: Search, tags: ["search", "blog", "guides", "articles"] },
  { path: "/faq", title: "Arthritis FAQs", description: "UK answers on OA, RA, gout, PIP, diet, exercise and cold-weather flares.", icon: BookOpen, tags: ["faq", "questions", "osteoarthritis", "rheumatoid"] },
  { path: "/library", title: "Health Library", description: "Plain-English notes on conditions, medications and treatments, including fibromyalgia.", icon: BookOpen, tags: ["library", "fibromyalgia", "condition"] },
  { path: "/library/fibromyalgia", title: "Fibromyalgia library", description: "UK library guide to widespread pain, fatigue, fibro fog and self-management.", icon: Activity, tags: ["condition", "fibromyalgia", "pain", "fatigue"] },
  { path: "/faq/arthritis-and-cold-weather", title: "Cold weather and arthritis", description: "Why UK winters stiffen joints and what actually helps on cold, damp days.", icon: BookOpen, tags: ["faq", "pain", "flare"] },
  { path: "/conditions/gout/symptoms", title: "Gout symptoms", description: "First signs of a gout attack, big-toe pain, and when to see a GP in the UK.", icon: Activity, tags: ["condition", "gout", "flare"] },
  { path: "/living-with-arthritis", title: "Living with arthritis guide", description: "The long-form UK pillar on symptoms, work, benefits, diet and daily routines.", icon: BookOpen, tags: ["guide", "arthritis", "UK"] },
  { path: "/guides/newly-diagnosed", title: "Newly diagnosed", description: "Step-by-step UK checklist after an arthritis diagnosis — GP, referrals and first treatments.", icon: BookOpen, tags: ["guide", "arthritis", "UK"] },
  { path: "/arthritis-flare-ups", title: "Flare-Up Guide", description: "What to do during an arthritis flare-up: triggers, relief strategies and when to seek help.", icon: Activity, tags: ["flare", "pain", "management", "relief", "blog"] },
  { path: "/about", title: "About Us", description: "Our mission, team and commitment to supporting people living with arthritis across the UK.", icon: Heart, tags: ["about", "charity", "mission"] },
  { path: "/editorial-standards", title: "Editorial standards", description: "How we review health content and how we write SEO content — intent, outline, helpful value.", icon: ShieldCheck, tags: ["about", "editorial", "seo", "trust"] },
  { path: "/guides/uk-arthritis", title: "UK Arthritis Guide", description: "Comprehensive guide to living with arthritis in the United Kingdom — care pathways, treatments and support.", icon: BookOpen, tags: ["guide", "arthritis", "UK", "Public Health"] },
  { path: "/guides/health-services", title: "Health Services Guide", description: "Navigate arthritis services: GP referrals, rheumatology, physiotherapy and specialist pathways.", icon: Stethoscope, tags: ["guide", "Public Health", "referral", "rheumatology"] },
  { path: "/guides/diet", title: "Diet Guide", description: "Complete anti-inflammatory diet guide for arthritis: Mediterranean diet, meal plans and foods to avoid.", icon: Apple, tags: ["guide", "diet", "anti-inflammatory", "food"] },
  { path: "/guides/exercise", title: "Exercise Guide", description: "Evidence-based exercise guide for arthritis: low-impact routines, swimming, yoga and strength training.", icon: Dumbbell, tags: ["guide", "exercise", "physio", "movement"] },
  { path: "/guides/benefits-pip", title: "Benefits & PIP Guide", description: "UK benefits guide for arthritis: PIP eligibility, application process and disability support.", icon: Heart, tags: ["guide", "PIP", "benefits", "disability"] },
  { path: "/donate", title: "Donate", description: "Support our mission to provide free arthritis support across the UK. Every donation helps.", icon: Heart, tags: ["donate", "charity", "support"] },
  { path: "/chat", title: "Help Chat", description: "Free personalised arthritis assistant — ask about symptoms, exercises, diet and health services.", icon: Activity, tags: ["chat", "support", "help"] },
];

function normalizeTags(raw?: string[] | string | null): string[] {
  if (!raw) return [];
  const list = Array.isArray(raw) ? raw : String(raw).split(/[,|;/]/);
  const out = new Set<string>();
  for (const part of list) {
    const t = part.trim().toLowerCase();
    if (!t) continue;
    out.add(t);
    // Also index meaningful words so "knee arthritis pain" matches knee/exercise hubs.
    for (const word of t.split(/\s+/)) {
      if (word.length >= 4) out.add(word);
    }
  }
  return [...out];
}

function getRelated(
  currentPath: string,
  count = 4,
  extraTags: string[] = [],
  keywords?: string | null,
): SitePage[] {
  const current = SITE_PAGES.find((p) => p.path === currentPath);
  const keywordTags = normalizeTags(keywords);
  const seedTags = new Set<string>([
    ...(current?.tags ?? []),
    ...normalizeTags(extraTags),
    ...keywordTags,
  ]);

  // Blog posts rarely match SITE_PAGES paths — boost hubs from path/keywords.
  if (currentPath.startsWith("/blog")) {
    seedTags.add("blog");
    seedTags.add("articles");
  }

  const scored = SITE_PAGES
    .filter((p) => p.path !== currentPath)
    .map((page) => {
      const shared = page.tags.filter((t) => seedTags.has(t.toLowerCase())).length;
      const isCondition = (p: SitePage) => p.tags.includes("condition");
      const crossBonus =
        current && isCondition(current) !== isCondition(page) ? 0.5 : 0;
      const hubBonus = ["/exercises", "/diet", "/guides", "/benefits-pip", "/blog"].includes(page.path)
        ? 0.25
        : 0;
      return { page, score: shared + crossBonus + hubBonus };
    })
    .sort((a, b) => b.score - a.score || a.page.title.localeCompare(b.page.title));

  const top = scored.filter((s) => s.score > 0).slice(0, count).map((s) => s.page);
  if (top.length >= count) return top;
  const fillers = scored
    .filter((s) => !top.some((p) => p.path === s.page.path))
    .slice(0, count - top.length)
    .map((s) => s.page);
  return [...top, ...fillers];
}

interface InternalLinksProps {
  /** Extra topic tags (e.g. blog category) for contextual matching. */
  tags?: string[];
  /** Free-text keywords from the article meta. */
  keywords?: string | null;
  /** How many cards to show (default 4). */
  count?: number;
}

const InternalLinks = memo(({ tags, keywords, count = 4 }: InternalLinksProps) => {
  const { pathname } = useLocation();
  const links = useMemo(
    () => getRelated(pathname, count, tags, keywords),
    [pathname, count, tags, keywords],
  );

  if (links.length === 0) return null;

  return (
    <nav aria-label="Related pages" className="bg-muted/30 border-t border-border/40">
      <div className="container mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2 text-center">
          Keep exploring
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto text-sm">
          Related UK hubs and guides — chosen to match this page&apos;s intent
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
                    Read {page.title} <ArrowRight className="w-3 h-3" />
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
