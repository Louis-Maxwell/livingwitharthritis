import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { ArrowRight, ChevronLeft, ChevronRight, Eye, BookOpen, Sparkles, Newspaper, Search, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBlogViewCounts } from "@/hooks/useBlogViews";

type Category = "All" | "Exercise" | "Nutrition" | "Lifestyle" | "Health" | "Supplements" | "Treatment";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: Category;
}

const blogPosts: BlogPost[] = [
  { slug: "arthritis-and-cold-weather-uk", title: "Arthritis and Cold Weather in the UK: Why Joints Hurt More in Winter", excerpt: "Discover why arthritis pain worsens in cold weather. Evidence-based tips for managing joint pain during UK winters, from layering to indoor exercises.", date: "2026-02-24", category: "Lifestyle" },
  { slug: "swimming-for-arthritis-uk", title: "Swimming for Arthritis UK: The Complete Guide to Aquatic Exercise", excerpt: "Complete UK guide to swimming for arthritis. Discover benefits, find local hydrotherapy pools, learn safe strokes and get started with aquatic exercise.", date: "2026-02-23", category: "Exercise" },
  { slug: "arthritis-flare-up-what-to-do", title: "Arthritis Flare-Up: What to Do When Your Symptoms Get Worse", excerpt: "Learn what causes arthritis flare-ups and how to manage them effectively. Practical UK guide with tips for pain relief, rest and when to see your GP.", date: "2026-02-22", category: "Health" },
  { slug: "turmeric-for-arthritis-uk", title: "Turmeric for Arthritis UK: Evidence, Dosage and How to Use It", excerpt: "Evidence-based guide to using turmeric for arthritis. Learn about curcumin benefits, correct dosage, best supplements and safety considerations.", date: "2026-02-21", category: "Supplements" },
  { slug: "best-diet-for-joint-pain-uk", title: "Best Diet for Joint Pain in the UK", excerpt: "Discover which anti-inflammatory foods help ease joint pain and stiffness, based on evidence recommended by NHS-aligned health professionals.", date: "2026-02-20", category: "Nutrition" },
  { slug: "hand-exercises-for-arthritis", title: "Hand Exercises for Arthritis: A Complete Guide", excerpt: "Step-by-step hand exercises approved by UK physiotherapists. Reduce stiffness, improve grip strength and maintain dexterity with daily routines.", date: "2026-02-19", category: "Exercise" },
  { slug: "nhs-arthritis-exercises", title: "NHS-Recommended Arthritis Exercises", excerpt: "A guide to low-impact exercises endorsed by UK physiotherapists for managing osteoarthritis and rheumatoid arthritis symptoms.", date: "2026-02-18", category: "Exercise" },
  { slug: "arthritis-and-sleep-problems", title: "Arthritis and Sleep Problems: How to Get Better Rest", excerpt: "Struggling to sleep with arthritis? Evidence-based guide to improving sleep quality, including positions, mattress advice and UK resources.", date: "2026-02-17", category: "Lifestyle" },
  { slug: "yoga-for-arthritis-beginners", title: "Yoga for Arthritis Beginners: A Safe and Gentle Starting Guide", excerpt: "Start yoga safely with arthritis. Beginner-friendly poses, modifications for joint pain, and how to find arthritis-friendly yoga classes in the UK.", date: "2026-02-16", category: "Exercise" },
  { slug: "osteoarthritis-symptoms-uk", title: "Osteoarthritis Symptoms & When to See Your GP", excerpt: "Recognise the early signs of osteoarthritis, understand UK treatment pathways, and learn when to seek NHS support.", date: "2026-02-15", category: "Health" },
  { slug: "arthritis-and-cycling-uk", title: "Cycling for Arthritis UK: Benefits, Tips and Getting Started Safely", excerpt: "Complete UK guide to cycling with arthritis. Benefits for knee and hip joints, choosing the right bike, e-bikes and safe riding tips.", date: "2026-02-14", category: "Exercise" },
  { slug: "arthritis-and-mental-health", title: "Arthritis and Mental Health: Managing the Emotional Impact", excerpt: "How arthritis affects mental health and what you can do. UK guide covering depression, anxiety, coping strategies and NHS support.", date: "2026-02-13", category: "Health" },
  { slug: "arthritis-supplements-uk", title: "Best Supplements for Arthritis in the UK", excerpt: "An evidence-based review of glucosamine, collagen, turmeric and omega-3 supplements available in the UK for joint health.", date: "2026-02-12", category: "Supplements" },
  { slug: "arthritis-and-omega-3-fish-oil", title: "Omega-3 and Fish Oil for Arthritis: A Complete Guide", excerpt: "Evidence-based guide to omega-3 fatty acids and fish oil for arthritis. Benefits, correct dosage, best food sources and supplement recommendations.", date: "2026-02-11", category: "Supplements" },
  { slug: "arthritis-medication-uk", title: "Understanding Arthritis Medication in the UK", excerpt: "A plain-English guide to prescription and over-the-counter arthritis medications available on the NHS and in UK pharmacies.", date: "2026-02-10", category: "Treatment" },
  { slug: "arthritis-and-weight-loss-uk", title: "Arthritis and Weight Loss UK: How Losing Weight Helps Your Joints", excerpt: "Evidence-based guide to weight loss for arthritis. How even modest weight loss dramatically reduces joint pain, with practical diet and exercise tips.", date: "2026-02-09", category: "Nutrition" },
  { slug: "arthritis-and-work-uk", title: "Managing Arthritis at Work in the UK: Your Rights and Adjustments", excerpt: "Managing arthritis while working in the UK. Workplace adjustments, legal rights under the Equality Act and practical coping strategies.", date: "2026-02-08", category: "Lifestyle" },
  { slug: "rheumatoid-arthritis-diet-uk", title: "Best Diet for Rheumatoid Arthritis UK", excerpt: "Evidence-based dietary guide for rheumatoid arthritis. Anti-inflammatory foods, meal plans, foods to avoid and supplements for RA management.", date: "2026-02-07", category: "Nutrition" },
  { slug: "knee-arthritis-exercises-uk", title: "Best Exercises for Knee Arthritis: UK Physiotherapy Guide", excerpt: "UK physiotherapist-approved exercises for knee arthritis. Strengthening, flexibility and aerobic exercises to reduce pain and improve mobility.", date: "2026-02-06", category: "Exercise" },
  { slug: "arthritis-pain-relief-natural", title: "Natural Pain Relief for Arthritis: Home Remedies That Work", excerpt: "Evidence-based natural pain relief methods. Heat therapy, turmeric, TENS machines and essential oils — what the research says.", date: "2026-02-05", category: "Treatment" },
  { slug: "arthritis-and-gardening-uk", title: "Gardening with Arthritis UK: Tips, Tools and Techniques", excerpt: "Complete UK guide to gardening with arthritis. Adaptive tools, raised bed techniques and joint-friendly planting for pain-free gardening.", date: "2026-02-04", category: "Lifestyle" },
  { slug: "hip-arthritis-symptoms-uk", title: "Hip Arthritis Symptoms UK: Signs, Diagnosis and Treatment", excerpt: "Recognise hip arthritis symptoms early. Signs of hip osteoarthritis, when to see your GP and NHS treatment options.", date: "2026-02-03", category: "Health" },
  { slug: "arthritis-and-pregnancy-uk", title: "Arthritis and Pregnancy UK: Managing Joint Pain Safely", excerpt: "UK guide to managing arthritis during pregnancy. Medication safety, RA remission, flare management and postnatal care.", date: "2026-02-02", category: "Health" },
  { slug: "glucosamine-vs-collagen-arthritis", title: "Glucosamine vs Collagen for Arthritis: Which Is Better?", excerpt: "Head-to-head comparison of glucosamine and collagen supplements. Evidence-based analysis of effectiveness, dosage and value for UK patients.", date: "2026-02-01", category: "Supplements" },
  { slug: "arthritis-fatigue-management", title: "Arthritis Fatigue: Why You're So Tired and How to Manage It", excerpt: "Understanding and managing arthritis fatigue. Evidence-based strategies for energy conservation, pacing and better sleep.", date: "2026-01-30", category: "Health" },
  { slug: "arthritis-diet-myths-debunked", title: "Arthritis Diet Myths Debunked: Fact vs Fiction", excerpt: "Debunking common arthritis diet myths with evidence. Cider vinegar, nightshades, alkaline diet — the truth about food and arthritis.", date: "2026-01-28", category: "Nutrition" },
  { slug: "walking-aids-arthritis-uk", title: "Walking Aids and Gadgets for Arthritis UK", excerpt: "Complete UK guide to walking aids and daily living gadgets. Walking sticks, rollators, kitchen aids and dressing helpers.", date: "2026-01-26", category: "Treatment" },
  { slug: "juvenile-arthritis-uk", title: "Juvenile Arthritis UK: A Parent's Guide", excerpt: "Comprehensive UK guide to juvenile idiopathic arthritis. Symptoms in children, diagnosis, treatment and school support.", date: "2026-01-24", category: "Health" },
  { slug: "shoulder-arthritis-exercises-uk", title: "Shoulder Arthritis Exercises: UK Physiotherapy Guide", excerpt: "UK physiotherapist-approved exercises for shoulder arthritis. Range-of-motion, strengthening and stretching exercises for pain relief.", date: "2026-01-22", category: "Exercise" },
  { slug: "foot-and-ankle-arthritis-uk", title: "Foot and Ankle Arthritis UK: Symptoms, Exercises and Footwear", excerpt: "Complete UK guide to foot and ankle arthritis. Exercises, best shoes, orthotics and NHS treatment options.", date: "2026-01-20", category: "Exercise" },
  { slug: "tai-chi-for-arthritis-uk", title: "Tai Chi for Arthritis UK: A Beginner's Guide", excerpt: "Evidence-based guide to tai chi for arthritis. Benefits for balance, pain and mobility, and how to find UK classes.", date: "2026-01-18", category: "Exercise" },
  { slug: "anti-inflammatory-herbs-spices-arthritis", title: "Anti-Inflammatory Herbs and Spices for Arthritis", excerpt: "Evidence-based guide to ginger, cinnamon, garlic, rosemary and other anti-inflammatory herbs available in the UK.", date: "2026-01-16", category: "Nutrition" },
  { slug: "staying-active-arthritis-winter-uk", title: "Staying Active with Arthritis in Winter UK", excerpt: "How to stay active during UK winters. Indoor exercise ideas, layering tips and motivation strategies for cold weather.", date: "2026-01-14", category: "Exercise" },
  { slug: "tens-machines-arthritis-uk", title: "TENS Machines for Arthritis UK: Do They Work?", excerpt: "Complete UK guide to TENS machines for arthritis pain. How they work, evidence, best devices and pad placement guide.", date: "2026-01-12", category: "Treatment" },
  { slug: "spinal-arthritis-back-pain-uk", title: "Spinal Arthritis and Back Pain UK: Self-Help Guide", excerpt: "UK guide to spinal arthritis. Spondylosis symptoms, exercises for spinal OA and when to see your GP about back stiffness.", date: "2026-01-10", category: "Health" },
  { slug: "gut-health-arthritis-connection", title: "Gut Health and Arthritis: The Microbiome Connection", excerpt: "How your gut microbiome affects joint inflammation. Best foods for gut health and practical steps to improve your gut.", date: "2026-01-08", category: "Nutrition" },
  { slug: "hydrotherapy-arthritis-uk", title: "Hydrotherapy for Arthritis UK: Benefits and Access", excerpt: "Complete UK guide to hydrotherapy. Warm-water therapy benefits, finding NHS pools and what to expect in a session.", date: "2026-01-06", category: "Treatment" },
  { slug: "arthritis-meal-planning-uk", title: "Arthritis Meal Planning UK: Weekly Anti-Inflammatory Menus", excerpt: "Practical weekly meal plans for arthritis. Budget-friendly UK recipes following the Mediterranean diet for joint health.", date: "2026-01-04", category: "Nutrition" },
  { slug: "mindfulness-meditation-chronic-pain", title: "Mindfulness and Meditation for Chronic Arthritis Pain", excerpt: "Evidence-based guide to mindfulness for arthritis pain. Techniques, UK courses and how meditation reduces chronic joint pain.", date: "2026-01-02", category: "Lifestyle" },
  { slug: "travelling-with-arthritis-uk", title: "Travelling with Arthritis UK: Tips for Comfortable Holidays", excerpt: "Complete UK guide to travelling with arthritis. Flight tips, travel insurance, accessible holidays and managing medication abroad.", date: "2025-12-28", category: "Lifestyle" },
];

const categories: Category[] = ["All", "Exercise", "Nutrition", "Lifestyle", "Health", "Supplements", "Treatment"];
const POSTS_PER_PAGE = 9;

const categoryColors: Record<Category, string> = {
  All: "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20",
  Exercise: "bg-violet-500/10 text-violet-700 hover:bg-violet-500/20 border-violet-500/20",
  Nutrition: "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 border-emerald-500/20",
  Lifestyle: "bg-sky-500/10 text-sky-700 hover:bg-sky-500/20 border-sky-500/20",
  Health: "bg-rose-500/10 text-rose-700 hover:bg-rose-500/20 border-rose-500/20",
  Supplements: "bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 border-amber-500/20",
  Treatment: "bg-teal-500/10 text-teal-700 hover:bg-teal-500/20 border-teal-500/20",
};

const categoryAccent: Record<Category, string> = {
  All: "border-l-primary",
  Exercise: "border-l-violet-500",
  Nutrition: "border-l-emerald-500",
  Lifestyle: "border-l-sky-500",
  Health: "border-l-rose-500",
  Supplements: "border-l-amber-500",
  Treatment: "border-l-teal-500",
};

const BlogIndex = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const allSlugs = useMemo(() => blogPosts.map((p) => p.slug), []);
  const viewCounts = useBlogViewCounts(allSlugs);

  const filtered = useMemo(() => {
    let posts = activeCategory === "All" ? blogPosts : blogPosts.filter((p) => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    return posts;
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const handleCategory = (cat: Category) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  // Estimate reading time from excerpt length (rough proxy)
  const getReadTime = (excerpt: string) => {
    const words = excerpt.split(/\s+/).length;
    return `${Math.max(4, Math.ceil(words / 40) + 3)} min read`;
  };

  return (
    <>
      <Helmet>
        <title>Arthritis Blog UK – Joint Pain, Diet & Exercise Advice</title>
        <meta name="description" content="Expert UK arthritis articles covering anti-inflammatory diet, NHS exercises, supplements, swimming, yoga, mental health and osteoarthritis management. Free guidance for people living with arthritis." />
        <meta name="keywords" content="arthritis blog UK, joint pain advice, NHS arthritis, anti-inflammatory diet UK, osteoarthritis exercises, arthritis help UK, joint pain diet, rheumatoid arthritis UK, swimming arthritis, yoga arthritis, turmeric arthritis, arthritis flare up" />
        <meta property="og:title" content="Arthritis Blog UK – Joint Pain, Diet & Exercise Advice" />
        <meta property="og:description" content="Expert UK arthritis articles covering anti-inflammatory diet, NHS exercises, supplements and osteoarthritis management." />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/blog" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Arthritis Blog UK – Joint Pain, Diet & Exercise Advice" />
        <meta name="twitter:description" content="Expert UK arthritis articles covering anti-inflammatory diet, NHS exercises, supplements and osteoarthritis management." />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/blog" />
        <link rel="alternate" hrefLang="en-GB" href="https://livingwitharthritis.org.uk/blog" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Arthritis Blog UK",
          "description": "Expert UK arthritis articles covering anti-inflammatory diet, NHS exercises, supplements and osteoarthritis management.",
          "url": "https://livingwitharthritis.org.uk/blog",
          "inLanguage": "en-GB",
          "isPartOf": { "@type": "WebSite", "name": "Living With Arthritis UK", "url": "https://livingwitharthritis.org.uk" },
          "about": { "@type": "MedicalCondition", "name": "Arthritis" },
          "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://livingwitharthritis.org.uk/" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://livingwitharthritis.org.uk/blog" }
          ]
        })}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero */}
        <PageHero
          gradient="from-violet-500/8 via-background to-rose-500/5"
          pattern="dots"
          badge={
            <div className="flex items-center gap-3">
              <Badge className="bg-violet-500/10 text-violet-700 border-0 text-xs font-bold px-3 py-1.5">
                <Newspaper className="w-3 h-3 mr-1.5" />
                {blogPosts.length} Articles
              </Badge>
              <Badge className="bg-primary/10 text-primary border-0 text-xs font-bold px-3 py-1.5">
                <Sparkles className="w-3 h-3 mr-1.5" />
                Evidence-Based
              </Badge>
            </div>
          }
          title={<>Arthritis Advice <span className="text-primary">&amp; Guidance</span></>}
          subtitle="Evidence-based articles to help UK residents manage arthritis, reduce joint pain and live well."
        />

        <main className="container mx-auto px-6 md:px-10 py-10 md:py-16">
          {/* Search bar */}
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
            <input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-border/40 bg-card text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all focus-glow"
            />
          </div>

          {/* Category filters — colorful pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide border transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? `${categoryColors[cat]} border-current shadow-sm scale-105`
                    : "bg-muted/30 text-muted-foreground border-border/30 hover:bg-muted/50"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 opacity-60">
                    ({blogPosts.filter((p) => p.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {paginated.length} of {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            {searchQuery && <span className="text-primary font-medium"> for "{searchQuery}"</span>}
          </p>



          {/* Grid — cards with category color accent */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((post, idx) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className={`group rounded-2xl border border-border/30 bg-card overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Colorful category top strip */}
                <div className={`h-1.5 ${
                  post.category === "Exercise" ? "bg-gradient-to-r from-violet-500 to-violet-400" :
                  post.category === "Nutrition" ? "bg-gradient-to-r from-emerald-500 to-emerald-400" :
                  post.category === "Lifestyle" ? "bg-gradient-to-r from-sky-500 to-sky-400" :
                  post.category === "Health" ? "bg-gradient-to-r from-rose-500 to-rose-400" :
                  post.category === "Supplements" ? "bg-gradient-to-r from-amber-500 to-amber-400" :
                  "bg-gradient-to-r from-teal-500 to-teal-400"
                }`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <time className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>
                    <span className={`text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border ${categoryColors[post.category]}`}>
                      {post.category}
                    </span>
                  </div>
                  <h2 className="font-display text-lg font-semibold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-border/15">
                    <span className="text-primary text-sm font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      Read more <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {getReadTime(post.excerpt)}
                      </span>
                      {viewCounts[post.slug] > 0 && (
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {viewCounts[post.slug].toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav aria-label="Blog pagination" className="flex items-center justify-center gap-2 mt-14">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="gap-1 rounded-full"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="icon"
                  className="w-9 h-9 text-xs rounded-full"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="gap-1 rounded-full"
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            </nav>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogIndex;
