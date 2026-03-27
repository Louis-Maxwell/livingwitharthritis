import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Heart, BookOpen, Rocket, Users, Target, TrendingUp, ArrowLeft, Shield, Sparkles, Globe, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageHero from "@/components/ui/PageHero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InternalLinks from "@/components/InternalLinks";

const sectionIcons: Record<string, React.ElementType> = {
  "Our Story": BookOpen,
  "The Scale of Arthritis": TrendingUp,
  "Our Mission": Target,
  "Our Commitment": Heart,
  "What We've Built": Users,
  "Looking Ahead": Rocket,
};

const sectionColors: Record<string, string> = {
  "Our Story": "from-primary/10 to-primary/5 border-primary/20",
  "The Scale of Arthritis": "from-amber-500/10 to-amber-500/5 border-amber-500/20",
  "Our Mission": "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20",
  "Our Commitment": "from-rose-500/10 to-rose-500/5 border-rose-500/20",
  "What We've Built": "from-blue-500/10 to-blue-500/5 border-blue-500/20",
  "Looking Ahead": "from-violet-500/10 to-violet-500/5 border-violet-500/20",
};

const sectionIconColors: Record<string, string> = {
  "Our Story": "bg-primary/15 text-primary",
  "The Scale of Arthritis": "bg-amber-500/15 text-amber-600",
  "Our Mission": "bg-emerald-500/15 text-emerald-600",
  "Our Commitment": "bg-rose-500/15 text-rose-600",
  "What We've Built": "bg-blue-500/15 text-blue-600",
  "Looking Ahead": "bg-violet-500/15 text-violet-600",
};

const milestones = [
  { year: "2020", title: "The Spark", description: "Founded by First Contact Practitioners working in the NHS to provide awareness and education about osteoarthritis to patients across the UK.", color: "bg-primary" },
  { year: "2021", title: "First 1,000 Users", description: "Our online resource library and community forum reached its first thousand active members.", color: "bg-secondary" },
  { year: "2022", title: "Virtual Physio Launch", description: "Launched free virtual physiotherapy consultations, removing barriers to professional guidance.", color: "bg-emerald-500" },
  { year: "2023", title: "AI Symptom Guide", description: "Introduced an AI-powered assistant to help users understand their symptoms and find resources.", color: "bg-amber-500" },
  { year: "2024", title: "10,000+ Supported", description: "Surpassed 10,000 people supported with evidence-based tools, nutrition plans, and exercise guides.", color: "bg-blue-500" },
  { year: "2025", title: "National Partnerships", description: "Began collaborating with NHS trusts and leading rheumatology bodies to expand our reach.", color: "bg-violet-500" },
];

const impactStats = [
  { value: "10,000+", label: "People Supported", icon: Users, color: "text-primary" },
  { value: "50+", label: "Exercise Guides", icon: Zap, color: "text-emerald-600" },
  { value: "100%", label: "Free Access", icon: Shield, color: "text-amber-600" },
  { value: "UK-Wide", label: "Coverage", icon: Globe, color: "text-blue-600" },
];

const AboutUs = () => {
  const { data: sections = [], isLoading } = useQuery({
    queryKey: ["about_us_sections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("about_us_sections")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      <Helmet>
        <title>About Us — Living With Arthritis UK | Our Mission & Story</title>
        <meta name="description" content="Living With Arthritis was founded by NHS First Contact Practitioners to raise awareness and educate patients about osteoarthritis. Free virtual physio, nutrition guidance and community support across the UK." />
        <meta name="keywords" content="living with arthritis charity, arthritis UK charity, arthritis support organisation, about living with arthritis, first contact practitioners, NHS arthritis support" />
        <meta property="og:title" content="About Us — Living With Arthritis UK" />
        <meta property="og:description" content="Founded by NHS First Contact Practitioners to provide osteoarthritis awareness and education. Free virtual physiotherapy, nutrition guidance and community support UK-wide." />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/about" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="About Us — Living With Arthritis UK" />
        <meta name="twitter:description" content="UK charity supporting people living with arthritis through free physio, nutrition and community." />
        <meta name="geo.region" content="GB" />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/about" />
        <link rel="alternate" hrefLang="en-GB" href="https://livingwitharthritis.org.uk/about" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Living With Arthritis",
          "url": "https://livingwitharthritis.org.uk/about",
          "inLanguage": "en-GB",
          "mainEntity": {
            "@type": "NGO",
            "name": "Living With Arthritis",
            "foundingDate": "2020",
            "url": "https://livingwitharthritis.org.uk",
            "areaServed": { "@type": "Country", "name": "United Kingdom" },
          }
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        {/* Hero with PageHero component */}
        <PageHero
          gradient="from-primary/8 via-background to-emerald-500/5"
          pattern="dots"
          badge={
          <div className="flex items-center gap-3 flex-wrap">
              <Link to="/">
                <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground hover:text-foreground -ml-2">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Badge className="bg-secondary/10 text-secondary border-0 text-xs font-bold px-3 py-1.5">
                <Sparkles className="w-3 h-3 mr-1.5" />
                Est. 2020
              </Badge>
            </div>
          }
          title={<>From a personal mission to a <span className="text-primary">national movement</span></>}
          subtitle="How Living with Arthritis grew from one family's experience into a platform supporting thousands across the United Kingdom."
        >
          {/* Impact stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {impactStats.map((stat) => (
              <div key={stat.label} className="bg-background/80 backdrop-blur-sm border border-border/30 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                <div className="text-xl font-extrabold text-foreground">{stat.value}</div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </PageHero>

        {/* Content Sections */}
        <section className="py-14 lg:py-20">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse bg-muted/20 rounded-2xl h-32" />
                ))}
              </div>
            ) : (
              <div className="space-y-5">
                {sections.map((section, i) => {
                  const Icon = sectionIcons[section.title] || Heart;
                  const gradient = sectionColors[section.title] || "from-muted/10 to-muted/5 border-border/20";
                  const iconColor = sectionIconColors[section.title] || "bg-primary/15 text-primary";
                  return (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ delay: i * 0.06, duration: 0.5, ease: "easeOut" }}
                    >
                      <div className={`bg-gradient-to-br ${gradient} border rounded-2xl p-6 md:p-8 hover:shadow-md transition-shadow duration-300`}>
                        <div className="flex items-start gap-4">
                          <div className={`w-11 h-11 rounded-xl ${iconColor} flex items-center justify-center shrink-0`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h2 className="text-lg font-bold text-foreground mb-2 tracking-tight">{section.title}</h2>
                            <p className="text-sm text-muted-foreground leading-[1.8]">{section.content}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Timeline */}
        <section className="py-14 lg:py-20 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 pattern-dots opacity-20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-accent/30 to-background pointer-events-none" />

          <div className="container mx-auto px-6 md:px-10 max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="bg-primary/10 text-primary border-0 text-xs font-bold px-3 py-1.5 mb-4">
                <Sparkles className="w-3 h-3 mr-1.5" />
                Our Journey
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                Key <span className="text-primary">milestones</span>
              </h2>
            </motion.div>

            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/30 md:-translate-x-px" />

              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative flex items-start mb-8 last:mb-0 md:items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div className={`absolute left-6 md:left-1/2 w-3.5 h-3.5 rounded-full ${m.color} border-4 border-background z-10 -translate-x-1.5 md:-translate-x-1.5 top-5 md:top-auto shadow-sm`} />
                    <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                      <div className="bg-card border border-border/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <span className={`text-xs font-extrabold tracking-widest uppercase ${m.color.replace('bg-', 'text-')}`}>{m.year}</span>
                        <h3 className="text-base font-bold text-foreground mt-1 mb-1.5">{m.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{m.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Registered Details + CTA */}
        <section className="py-14 lg:py-20">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            {/* Registered Address Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
              <div className="rounded-2xl bg-muted/30 border border-border/20 p-6 md:p-8">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" /> Registered Charity Details
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <p className="font-semibold text-foreground mb-1">Charity Name</p>
                    <p>Living With Arthritis</p>
                    <p className="font-semibold text-foreground mt-3 mb-1">Registration Number</p>
                    <p>1234567</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Registered Address</p>
                    <address className="not-italic">
                      27 Old Gloucester Street<br />London WC1N 3AX<br />England
                    </address>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-5">
                  <Link to="/governance">
                    <Button variant="outline" size="sm" className="rounded-full text-xs font-medium">Our Governance</Button>
                  </Link>
                  <Link to="/finances">
                    <Button variant="outline" size="sm" className="rounded-full text-xs font-medium">Our Finances</Button>
                  </Link>
                  <Link to="/impact">
                    <Button variant="outline" size="sm" className="rounded-full text-xs font-medium">Our Impact</Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="rounded-2xl bg-gradient-to-br from-primary/8 via-background to-secondary/8 border border-border/20 p-8 md:p-12 relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
                <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-extrabold text-foreground mb-3">Join Our Mission</h2>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-md mx-auto">
                  Every donation, share, and volunteer hour brings us closer to a world where arthritis no longer limits anyone's potential.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/#involved">
                    <Button className="btn-primary-cta rounded-full px-8 h-11 text-sm font-bold">
                      <Heart className="w-4 h-4 mr-2" />
                      Donate Now
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button variant="outline" className="rounded-full px-8 h-11 text-sm font-medium border-border/30">
                      Explore Resources
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        <InternalLinks />
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
