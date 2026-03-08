import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { motion } from "framer-motion";
import {
  Globe, BookOpen, Sun, Heart, FileText, Stethoscope, Dumbbell,
  ArrowRight, ExternalLink, Sparkles, Search, MapPin, MessageCircle,
  ShieldCheck, Hand, Footprints, Apple, Moon, Droplets, Lightbulb,
  Activity, Brain, Utensils, Snowflake, Bike, Pill, Fish,
  ThermometerSun, Waves, Luggage, Salad, Flower2, Zap, Map
} from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface SitemapLink {
  label: string;
  href: string;
  description: string;
  featured?: boolean;
  external?: boolean;
  icon?: any;
  isNew?: boolean;
}

interface SitemapSection {
  title: string;
  icon: any;
  color: string;
  iconBg: string;
  borderColor: string;
  accentColor: string;
  links: SitemapLink[];
}

const sitemapSections: SitemapSection[] = [
  {
    title: "Main Pages",
    icon: Globe,
    color: "from-blue-500/15 to-cyan-500/10",
    iconBg: "bg-blue-500/10 text-blue-600",
    borderColor: "border-blue-500/20 hover:border-blue-500/40",
    accentColor: "text-blue-600",
    links: [
      { label: "Home", href: "/", description: "Arthritis support, services and resources", icon: Globe },
      { label: "About Us", href: "/about", description: "Our mission, team and values", icon: ShieldCheck },
      { label: "Virtual Assistant", href: "/chat", description: "AI-powered arthritis guidance chat", icon: MessageCircle, featured: true },
      { label: "Self Help Tool", href: "/self-help", description: "Interactive joint exercise diagram", icon: Activity },
      { label: "Sign In / Register", href: "/auth", description: "Access your account", icon: MapPin },
    ],
  },
  {
    title: "Condition Guides",
    icon: Stethoscope,
    color: "from-emerald-500/15 to-teal-500/10",
    iconBg: "bg-emerald-500/10 text-emerald-600",
    borderColor: "border-emerald-500/20 hover:border-emerald-500/40",
    accentColor: "text-emerald-600",
    links: [
      { label: "Osteoarthritis", href: "/conditions/osteoarthritis", description: "Symptoms, causes, exercises and diet for OA", featured: true },
      { label: "Rheumatoid Arthritis", href: "/conditions/rheumatoid-arthritis", description: "Autoimmune arthritis: diagnosis, treatment and living with RA" },
      { label: "Psoriatic Arthritis", href: "/conditions/psoriatic-arthritis", description: "Joint and skin condition: symptoms, treatment and support" },
    ],
  },
  {
    title: "Diet & Nutrition",
    icon: Utensils,
    color: "from-orange-500/15 to-amber-500/10",
    iconBg: "bg-orange-500/10 text-orange-600",
    borderColor: "border-orange-500/20 hover:border-orange-500/40",
    accentColor: "text-orange-600",
    links: [
      { label: "All Articles", href: "/blog", description: "Evidence-based UK arthritis advice", featured: true, icon: BookOpen },
      { label: "Best Diet for Joint Pain UK", href: "/blog/best-diet-for-joint-pain-uk", description: "Anti-inflammatory foods and Mediterranean diet", icon: Apple },
      { label: "Turmeric for Arthritis", href: "/blog/turmeric-for-arthritis-uk", description: "Evidence, dosage and how to use it", icon: Flower2 },
      { label: "Omega-3 & Fish Oil", href: "/blog/arthritis-and-omega-3-fish-oil", description: "Benefits, dosage and best sources", icon: Fish },
      { label: "Anti-Inflammatory Herbs & Spices", href: "/blog/anti-inflammatory-herbs-spices-arthritis", description: "Evidence-based spice guide", icon: Utensils },
      { label: "Gut Health & Arthritis", href: "/blog/gut-health-arthritis-connection", description: "The microbiome connection explained", icon: Brain },
      { label: "Meal Planning for Arthritis", href: "/blog/meal-planning-arthritis-uk", description: "Weekly meal plans for joint health", icon: Salad },
      { label: "Arthritis & Weight Loss UK", href: "/blog/arthritis-and-weight-loss-uk", description: "How losing weight helps your joints" },
      { label: "Arthritis Supplements UK", href: "/blog/arthritis-supplements-uk", description: "Glucosamine, collagen, turmeric and omega-3", icon: Pill },
      { label: "Arthritis Medication UK", href: "/blog/arthritis-medication-uk", description: "NHS treatments and pain relief options", icon: Pill },
    ],
  },
  {
    title: "Exercise & Movement",
    icon: Dumbbell,
    color: "from-violet-500/15 to-purple-500/10",
    iconBg: "bg-violet-500/10 text-violet-600",
    borderColor: "border-violet-500/20 hover:border-violet-500/40",
    accentColor: "text-violet-600",
    links: [
      { label: "NHS Arthritis Exercises", href: "/blog/nhs-arthritis-exercises", description: "Low-impact exercises from UK physiotherapists", featured: true },
      { label: "Knee Exercises", href: "/blog/knee-arthritis-exercises-uk", description: "UK physiotherapy guide for knee arthritis", icon: Footprints },
      { label: "Hand Exercises", href: "/blog/hand-exercises-for-arthritis", description: "Improve grip strength and dexterity", icon: Hand },
      { label: "Shoulder Exercises", href: "/blog/shoulder-arthritis-exercises-uk", description: "Stretches and strengthening for shoulders" },
      { label: "Foot & Ankle Arthritis", href: "/blog/foot-and-ankle-arthritis-uk", description: "Symptoms, exercises and footwear guide", icon: Footprints },
      { label: "Swimming for Arthritis", href: "/blog/swimming-for-arthritis-uk", description: "Complete guide to aquatic exercise", icon: Waves },
      { label: "Yoga for Arthritis", href: "/blog/yoga-for-arthritis-beginners", description: "Safe and gentle starting guide" },
      { label: "Cycling for Arthritis", href: "/blog/arthritis-and-cycling-uk", description: "Benefits, tips and getting started", icon: Bike },
      { label: "Tai Chi for Arthritis", href: "/blog/tai-chi-for-arthritis-uk", description: "Gentle movement for balance and flexibility" },
      { label: "Hydrotherapy", href: "/blog/hydrotherapy-arthritis-uk", description: "Benefits, access and what to expect", icon: Waves },
      { label: "Staying Active in Winter", href: "/blog/staying-active-arthritis-winter-uk", description: "Cold-weather exercise guide", icon: Snowflake },
    ],
  },
  {
    title: "Lifestyle & Wellbeing",
    icon: Brain,
    color: "from-cyan-500/15 to-sky-500/10",
    iconBg: "bg-cyan-500/10 text-cyan-600",
    borderColor: "border-cyan-500/20 hover:border-cyan-500/40",
    accentColor: "text-cyan-600",
    links: [
      { label: "Cold Weather & Joint Pain", href: "/blog/arthritis-and-cold-weather-uk", description: "Why joints hurt more in winter", icon: ThermometerSun },
      { label: "Arthritis & Sleep Problems", href: "/blog/arthritis-and-sleep-problems", description: "How to get better rest with joint pain", icon: Moon },
      { label: "Arthritis & Mental Health", href: "/blog/arthritis-and-mental-health", description: "Managing the emotional impact of chronic pain", icon: Brain },
      { label: "Arthritis at Work UK", href: "/blog/arthritis-and-work-uk", description: "Your rights, adjustments and practical tips" },
      { label: "Arthritis Flare-Ups", href: "/blog/arthritis-flare-up-what-to-do", description: "What to do when symptoms get worse", icon: Zap },
      { label: "Osteoarthritis Symptoms UK", href: "/blog/osteoarthritis-symptoms-uk", description: "Recognise symptoms and when to see your GP" },
      { label: "Natural Pain Relief", href: "/blog/natural-pain-relief-arthritis-uk", description: "Drug-free methods for managing pain" },
      { label: "Gardening with Arthritis", href: "/blog/gardening-with-arthritis-uk", description: "Tips for gentle gardening" },
      { label: "TENS Machines", href: "/blog/tens-machines-arthritis-uk", description: "Do they work and how to use them", icon: Zap },
      { label: "Spinal Arthritis & Back Pain", href: "/blog/spinal-arthritis-back-pain-uk", description: "Symptoms, treatment and self-help" },
      { label: "Mindfulness for Pain", href: "/blog/mindfulness-for-chronic-pain-uk", description: "Meditation techniques for pain management" },
      { label: "Travelling with Arthritis", href: "/blog/travelling-with-arthritis-uk", description: "Tips for comfortable travel", icon: Luggage },
    ],
  },
  {
    title: "Daily Tips",
    icon: Sun,
    color: "from-amber-500/15 to-yellow-500/10",
    iconBg: "bg-amber-500/10 text-amber-600",
    borderColor: "border-amber-500/20 hover:border-amber-500/40",
    accentColor: "text-amber-600",
    links: [
      { label: "Daily Living Overview", href: "/daily-tips/overview", description: "Holistic approach to managing joint stiffness", featured: true, icon: Sun },
      { label: "Morning Stretches", href: "/daily-tips/morning-stretches", description: "Gentle stretches for morning stiffness", icon: Sun },
      { label: "Stay Hydrated", href: "/daily-tips/stay-hydrated", description: "Why hydration matters for joints", icon: Droplets },
      { label: "Anti-inflammatory Snacks", href: "/daily-tips/anti-inflammatory-snacks", description: "Healthy snacks that fight inflammation", icon: Apple },
      { label: "Walk 20 Minutes", href: "/daily-tips/walk-20-minutes", description: "Low-impact walking for mobility", icon: Footprints },
      { label: "Prioritise Sleep", href: "/daily-tips/prioritise-sleep", description: "Better sleep for pain management", icon: Moon },
      { label: "Pace Yourself", href: "/daily-tips/pace-yourself", description: "Energy management throughout the day", icon: Lightbulb },
    ],
  },
  {
    title: "Support & Donate",
    icon: Heart,
    color: "from-rose-500/15 to-pink-500/10",
    iconBg: "bg-rose-500/10 text-rose-600",
    borderColor: "border-rose-500/20 hover:border-rose-500/40",
    accentColor: "text-rose-600",
    links: [
      { label: "Donate", href: "/#fundraising", description: "Help us reach our fundraising goal", icon: Heart },
      { label: "Zakat Appeal", href: "/zakat-appeal", description: "Give your Zakat to support arthritis care", icon: Heart },
    ],
  },
  {
    title: "Technical",
    icon: FileText,
    color: "from-slate-500/15 to-gray-500/10",
    iconBg: "bg-slate-500/10 text-slate-600",
    borderColor: "border-slate-500/20 hover:border-slate-500/40",
    accentColor: "text-slate-600",
    links: [
      { label: "XML Sitemap", href: "/sitemap.xml", description: "Machine-readable sitemap for search engines", external: true },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const Sitemap = () => {
  const [search, setSearch] = useState("");
  const totalPages = sitemapSections.reduce((acc, s) => acc + s.links.length, 0);

  const filteredSections = useMemo(() => {
    if (!search.trim()) return sitemapSections;
    const q = search.toLowerCase();
    return sitemapSections
      .map((section) => ({
        ...section,
        links: section.links.filter(
          (l) => l.label.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)
        ),
      }))
      .filter((section) => section.links.length > 0);
  }, [search]);

  const filteredCount = filteredSections.reduce((acc, s) => acc + s.links.length, 0);

  return (
    <>
      <Helmet>
        <title>Sitemap – Living With Arthritis UK</title>
        <meta name="description" content="Browse all pages on Living With Arthritis UK. Find arthritis advice, exercises, diet tips and support resources." />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/sitemap" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero */}
        <PageHero
          gradient="from-sky-500/8 via-background to-primary/5"
          pattern="grid"
          badge={
            <Badge className="bg-sky-500/10 text-sky-700 border-0 text-xs font-bold px-3 py-1.5">
              <Map className="w-3 h-3 mr-1.5" />
              {totalPages} Pages · Complete Directory
            </Badge>
          }
          title={<>Site <span className="text-primary">Directory</span></>}
          subtitle="Find every page on our website — from condition guides and exercises to nutrition articles and daily tips."
        >
          {/* Search */}
          <div className="max-w-md relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search pages…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-12 rounded-xl border-border/60 bg-card shadow-sm text-sm"
            />
            {search && (
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                {filteredCount} result{filteredCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </PageHero>

        <main className="container mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-16 max-w-6xl">
          {/* Quick category chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {sitemapSections.slice(0, -1).map((section) => {
              const Icon = section.icon;
              return (
                <a
                  key={section.title}
                  href={`#section-${section.title.replace(/\s+/g, "-").toLowerCase()}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:scale-105 ${section.borderColor} ${section.iconBg}`}
                >
                  <Icon className="w-3 h-3" />
                  {section.title}
                </a>
              );
            })}
          </div>

          {/* Cards grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-5"
          >
            {filteredSections.map((section) => {
              const SectionIcon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  variants={cardVariants}
                  id={`section-${section.title.replace(/\s+/g, "-").toLowerCase()}`}
                  className={`rounded-2xl border ${section.borderColor} bg-gradient-to-br ${section.color} p-5 md:p-6 transition-all duration-300 hover:shadow-lg scroll-mt-24`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${section.iconBg} shadow-sm`}>
                      <SectionIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-display text-base font-bold text-foreground">{section.title}</h2>
                      <span className="text-xs text-muted-foreground">
                        {section.links.length} page{section.links.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-0.5">
                    {section.links.map((link) => {
                      const LinkIcon = link.icon;
                      const content = (
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          {LinkIcon && (
                            <LinkIcon className={`w-3.5 h-3.5 shrink-0 ${section.accentColor} opacity-60`} />
                          )}
                          <div className="min-w-0 flex-1">
                            <span className="text-foreground font-medium text-sm group-hover:text-primary transition-colors flex items-center gap-1.5 truncate">
                              {link.label}
                              {link.featured && (
                                <Badge variant="secondary" className="text-[9px] px-1.5 py-0 h-4 bg-primary/10 text-primary border-0">
                                  Popular
                                </Badge>
                              )}
                              {link.isNew && (
                                <Badge variant="secondary" className="text-[9px] px-1.5 py-0 h-4 bg-emerald-500/10 text-emerald-600 border-0">
                                  New
                                </Badge>
                              )}
                            </span>
                            <span className="text-muted-foreground text-xs block truncate">{link.description}</span>
                          </div>
                        </div>
                      );

                      return (
                        <li key={link.href}>
                          {link.external ? (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 hover:bg-background/60 transition-all duration-200"
                            >
                              {content}
                              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary shrink-0 transition-colors" />
                            </a>
                          ) : (
                            <Link
                              to={link.href}
                              className="group flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 hover:bg-background/60 transition-all duration-200"
                            >
                              {content}
                              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 shrink-0 transition-all duration-200" />
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>

          {/* No results */}
          {filteredSections.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No pages found matching "<strong>{search}</strong>"</p>
              <button onClick={() => setSearch("")} className="text-primary text-sm mt-2 hover:underline">
                Clear search
              </button>
            </div>
          )}

          {/* Footer stats */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-6 text-xs text-muted-foreground bg-muted/40 rounded-full px-6 py-3">
              <span><strong className="text-foreground">{totalPages}</strong> pages</span>
              <span className="w-px h-3 bg-border" />
              <span><strong className="text-foreground">{sitemapSections.length}</strong> sections</span>
              <span className="w-px h-3 bg-border" />
              <span>Last updated Mar 2026</span>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Sitemap;
