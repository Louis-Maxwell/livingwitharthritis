import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Globe, BookOpen, Sun, Heart, FileText, Stethoscope, Dumbbell, ArrowRight, ExternalLink, Sparkles } from "lucide-react";

const sitemapSections = [
  {
    title: "Main Pages",
    icon: Globe,
    color: "from-blue-500/15 to-cyan-500/10",
    iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-500/20 hover:border-blue-500/40",
    links: [
      { label: "Home", href: "/", description: "Arthritis support, services and resources" },
      { label: "About Us", href: "/about", description: "Our mission, team and values" },
      { label: "Virtual Assistant", href: "/chat", description: "AI-powered arthritis guidance chat" },
      { label: "Self Help Tool", href: "/self-help", description: "Interactive joint exercise diagram" },
      { label: "Sign In / Register", href: "/auth", description: "Access your account" },
    ],
  },
  {
    title: "Condition Guides",
    icon: Stethoscope,
    color: "from-emerald-500/15 to-teal-500/10",
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-500/20 hover:border-emerald-500/40",
    links: [
      { label: "Osteoarthritis", href: "/conditions/osteoarthritis", description: "Symptoms, causes, exercises and diet for OA" },
      { label: "Rheumatoid Arthritis", href: "/conditions/rheumatoid-arthritis", description: "Autoimmune arthritis: diagnosis, treatment and living with RA" },
      { label: "Psoriatic Arthritis", href: "/conditions/psoriatic-arthritis", description: "Joint and skin condition: symptoms, treatment and support" },
    ],
  },
  {
    title: "Blog Articles",
    icon: BookOpen,
    color: "from-violet-500/15 to-purple-500/10",
    iconBg: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    borderColor: "border-violet-500/20 hover:border-violet-500/40",
    links: [
      { label: "All Articles", href: "/blog", description: "Evidence-based UK arthritis advice", featured: true },
      { label: "Best Diet for Joint Pain UK", href: "/blog/best-diet-for-joint-pain-uk", description: "Anti-inflammatory foods and Mediterranean diet" },
      { label: "NHS Arthritis Exercises", href: "/blog/nhs-arthritis-exercises", description: "Low-impact exercises from UK physiotherapists" },
      { label: "Osteoarthritis Symptoms", href: "/blog/osteoarthritis-symptoms-uk", description: "Recognise symptoms and when to see your GP" },
      { label: "Arthritis Supplements UK", href: "/blog/arthritis-supplements-uk", description: "Glucosamine, collagen, turmeric and omega-3" },
      { label: "Arthritis Medication UK", href: "/blog/arthritis-medication-uk", description: "NHS treatments and pain relief options" },
      { label: "Turmeric for Arthritis", href: "/blog/turmeric-for-arthritis-uk", description: "Evidence, dosage and how to use it" },
      { label: "Swimming for Arthritis", href: "/blog/swimming-for-arthritis-uk", description: "Complete guide to aquatic exercise" },
      { label: "Yoga for Arthritis", href: "/blog/yoga-for-arthritis-beginners", description: "Safe and gentle starting guide" },
      { label: "Cycling for Arthritis", href: "/blog/arthritis-and-cycling-uk", description: "Benefits, tips and getting started" },
    ],
  },
  {
    title: "Exercises & Physio",
    icon: Dumbbell,
    color: "from-orange-500/15 to-amber-500/10",
    iconBg: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    borderColor: "border-orange-500/20 hover:border-orange-500/40",
    links: [
      { label: "Knee Exercises", href: "/blog/knee-arthritis-exercises-uk", description: "UK physiotherapy guide for knee arthritis" },
      { label: "Hand Exercises", href: "/blog/hand-exercises-for-arthritis", description: "Improve grip strength and dexterity" },
      { label: "Shoulder Exercises", href: "/blog/shoulder-arthritis-exercises-uk", description: "Stretches and strengthening for shoulders" },
      { label: "Tai Chi for Arthritis", href: "/blog/tai-chi-for-arthritis-uk", description: "Gentle movement for balance and flexibility" },
    ],
  },
  {
    title: "Daily Tips",
    icon: Sun,
    color: "from-amber-500/15 to-yellow-500/10",
    iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-500/20 hover:border-amber-500/40",
    links: [
      { label: "Daily Living Overview", href: "/daily-tips/overview", description: "Holistic approach to managing joint stiffness" },
      { label: "Morning Stretches", href: "/daily-tips/morning-stretches", description: "Gentle stretches for morning stiffness" },
      { label: "Stay Hydrated", href: "/daily-tips/stay-hydrated", description: "Why hydration matters for joints" },
      { label: "Anti-inflammatory Snacks", href: "/daily-tips/anti-inflammatory-snacks", description: "Healthy snacks that fight inflammation" },
      { label: "Walk 20 Minutes", href: "/daily-tips/walk-20-minutes", description: "Low-impact walking for mobility" },
      { label: "Prioritise Sleep", href: "/daily-tips/prioritise-sleep", description: "Better sleep for pain management" },
      { label: "Pace Yourself", href: "/daily-tips/pace-yourself", description: "Energy management throughout the day" },
    ],
  },
  {
    title: "Support & Donate",
    icon: Heart,
    color: "from-rose-500/15 to-pink-500/10",
    iconBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    borderColor: "border-rose-500/20 hover:border-rose-500/40",
    links: [
      { label: "Donate", href: "/#fundraising", description: "Help us reach our fundraising goal" },
      { label: "Zakat Appeal", href: "/zakat-appeal", description: "Give your Zakat to support arthritis care" },
    ],
  },
  {
    title: "Technical",
    icon: FileText,
    color: "from-slate-500/15 to-gray-500/10",
    iconBg: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
    borderColor: "border-slate-500/20 hover:border-slate-500/40",
    links: [
      { label: "XML Sitemap", href: "/sitemap.xml", description: "Machine-readable sitemap for search engines", external: true },
    ],
  },
];

const totalPages = sitemapSections.reduce((acc, s) => acc + s.links.length, 0);

const Sitemap = () => (
  <>
    <Helmet>
      <title>Sitemap – Living With Arthritis UK</title>
      <meta name="description" content="Browse all pages on Living With Arthritis UK. Find arthritis advice, exercises, diet tips and support resources." />
      <meta name="geo.region" content="GB" />
      <meta name="geo.placename" content="United Kingdom" />
      <meta property="og:title" content="Sitemap – Living With Arthritis UK" />
      <meta property="og:description" content="Browse all pages on Living With Arthritis UK." />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/sitemap" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <link rel="canonical" href="https://livingwitharthritis.org.uk/sitemap" />
      <link rel="alternate" hrefLang="en-GB" href="https://livingwitharthritis.org.uk/sitemap" />
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 md:px-10 py-16 md:py-24 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/[0.08] text-primary px-4 py-2 rounded-full text-xs font-bold tracking-wide mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            {totalPages} Pages Available
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Sitemap
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto text-base">
            A complete directory of every page on our website — find the help you need.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {sitemapSections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className={`rounded-2xl border ${section.borderColor} bg-gradient-to-br ${section.color} p-6 transition-all duration-300 hover:shadow-lg`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${section.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-base font-bold text-foreground">{section.title}</h2>
                    <span className="text-xs text-muted-foreground">{section.links.length} page{section.links.length !== 1 ? "s" : ""}</span>
                  </div>
                </div>
                <ul className="space-y-0.5">
                  {section.links.map((link: any) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 hover:bg-background/60 transition-all duration-200"
                        >
                          <div className="min-w-0">
                            <span className="text-foreground font-medium text-sm group-hover:text-primary transition-colors block truncate">
                              {link.label}
                            </span>
                            <span className="text-muted-foreground text-xs block truncate">{link.description}</span>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary shrink-0 transition-colors" />
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="group flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 hover:bg-background/60 transition-all duration-200"
                        >
                          <div className="min-w-0">
                            <span className="text-foreground font-medium text-sm group-hover:text-primary transition-colors block truncate">
                              {link.label}
                              {link.featured && (
                                <span className="ml-2 inline-flex items-center bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                                  Popular
                                </span>
                              )}
                            </span>
                            <span className="text-muted-foreground text-xs block truncate">{link.description}</span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 shrink-0 transition-all duration-200" />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  </>
);

export default Sitemap;
