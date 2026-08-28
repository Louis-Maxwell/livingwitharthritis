import { supabase } from "@/integrations/supabase/client";
import { lazy, Suspense, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Heart, BookOpen, Rocket, Users, Target, TrendingUp, ArrowLeft, Shield, Sparkles, Globe, Zap, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageHero from "@/components/ui/PageHero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextReadStrip from "@/components/NextReadStrip";
import InternalLinks from "@/components/InternalLinks";
import CharityRegBadge from "@/components/CharityRegBadge";
import { buildCharitySchema, injectJsonLd } from "@/lib/jsonLd";
import { CHARITY } from "@/config/charity";

const FounderStoryBand = lazy(() => import("@/components/landing/FounderStoryBand"));


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
  "The Scale of Arthritis": "from-primary/8 to-primary/3 border-primary/15",
  "Our Mission": "from-primary/10 to-primary/5 border-primary/20",
  "Our Commitment": "from-primary/8 to-primary/3 border-primary/15",
  "What We've Built": "from-primary/10 to-primary/5 border-primary/20",
  "Looking Ahead": "from-primary/8 to-primary/3 border-primary/15",
};

const sectionIconColors: Record<string, string> = {
  "Our Story": "bg-primary/15 text-primary",
  "The Scale of Arthritis": "bg-primary/10 text-primary",
  "Our Mission": "bg-primary/15 text-primary",
  "Our Commitment": "bg-primary/10 text-primary",
  "What We've Built": "bg-primary/15 text-primary",
  "Looking Ahead": "bg-primary/10 text-primary",
};

type JourneyChapter = {
  id: string;
  year: string;
  title: string;
  description: string;
  display_order: number;
};

const impactStats = [
  { value: "10,000+", label: "People Supported", icon: Users, color: "text-primary" },
  { value: "50+", label: "Exercise Guides", icon: Zap, color: "text-primary" },
  { value: "100%", label: "Free Access", icon: Shield, color: "text-primary" },
  { value: "UK-Wide", label: "Coverage", icon: Globe, color: "text-primary" },
];

const teamMembers = [
  { name: "Operations Director", role: "First Contact Practitioner", credentials: "HCPC Registered · BSc Physiotherapy", bio: "Founded Living With Arthritis after seeing thousands of patients struggle to find reliable, free arthritis support outside clinical settings." },
  { name: "Clinical Lead", role: "Senior Physiotherapist", credentials: "HCPC Registered · MSc Musculoskeletal", bio: "Oversees clinical content accuracy and develops our evidence-based exercise programmes." },
  { name: "Nutrition Advisor", role: "Registered Dietitian", credentials: "HCPC Registered · BSc Nutrition", bio: "Designs our anti-inflammatory diet plans and Mediterranean meal guides for joint health." },
  { name: "Digital Health Lead", role: "Health Technology Specialist", credentials: "MSc Health Informatics", bio: "Builds our help chat, symptom tools, and digital patient experience." },
];

const AboutUs = () => {
  useEffect(() => injectJsonLd("ld-charity-about", buildCharitySchema()), []);
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

  const { data: chapters = [] } = useQuery<JourneyChapter[]>({
    queryKey: ["journey_chapters"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("journey_chapters")
        .select("id, year, title, description, display_order")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as JourneyChapter[];
    },
  });

  return (
    <>
      <Helmet>
        <title>About Our Mission | {CHARITY.shortName}</title>
        <meta name="description" content={`About ${CHARITY.shortName}: Free, evidence-based arthritis education charity. Maxwell's mission to support independent living.`} />
        <meta name="keywords" content="arthritis charity, arthritis foundation, arthritis organisation, arthritis support, joint pain charity, arthritis awareness, arthritis advocacy, arthritis research, arthritis helpline, arthritis UK charity, living with arthritis, musculoskeletal conditions, volunteer for charity, donate to arthritis charity" />
        <meta property="og:title" content={`About Us — ${CHARITY.shortName}`} />
        <meta property="og:description" content={`About ${CHARITY.shortName}: Free, evidence-based arthritis education charity. Maxwell's mission to support independent living.`} />
        <meta property="og:url" content={`${CHARITY.siteUrl}/about`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content={CHARITY.shortName} />
        <meta property="og:image" content={`${CHARITY.siteUrl}/images/hero-walking-group-1600.webp`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`About Us — ${CHARITY.shortName}`} />
        <meta name="twitter:image" content={`${CHARITY.siteUrl}/images/hero-walking-group-1600.webp`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`About Us — ${CHARITY.shortName}`} />
        <meta name="twitter:description" content={`About ${CHARITY.shortName}: Free, evidence-based arthritis education charity. Maxwell's mission to support independent living.`} />
        <meta name="geo.region" content="GB" />
        <link rel="alternate" hrefLang="en-GB" href={`${CHARITY.siteUrl}/about`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": `About ${CHARITY.legalName}`,
          "url": `${CHARITY.siteUrl}/about`,
          "inLanguage": "en-GB",
          "mainEntity": {
            "@type": "NGO",
            "name": CHARITY.legalName,
            "foundingDate": String(CHARITY.foundedYear),
            "url": CHARITY.siteUrl,
            "areaServed": { "@type": "Country", "name": "United Kingdom" },
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${CHARITY.siteUrl}/` },
            { "@type": "ListItem", "position": 2, "name": "About", "item": `${CHARITY.siteUrl}/about` }
          ]
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <PageHero
          gradient="from-primary/8 via-background to-primary/5"
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

        {/* Our Story — founder narrative moved from landing page */}
        <Suspense fallback={<div className="py-16" />}>
          <FounderStoryBand />
        </Suspense>

        {/* Team Section */}
        <section id="team" className="py-14 lg:py-20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <Badge className="bg-background text-primary border-0 text-xs font-bold px-3 py-1.5 mb-4">
                <Users className="w-3 h-3 mr-1.5" />
                Our Team
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
                Led by <span className="text-primary">clinicians</span>, built with care
              </h2>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                Our team includes HCPC-registered physiotherapists, First Contact Practitioners, registered dietitians, and digital health specialists.
              </p>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto mt-2">
                All our content is reviewed by HCPC-registered clinicians.{" "}
                <Link to="/editorial-standards" className="text-primary underline hover:no-underline font-medium">
                  Read our full editorial standards
                </Link>
                .
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <div className="p-6 rounded-2xl border border-border/20 bg-card hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{member.name}</p>
                        <p className="text-xs text-primary font-medium">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-[10px] font-bold text-muted-foreground tracking-[0.15em] uppercase mb-3">{member.credentials}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Sections from DB */}
        <section className="py-14 lg:py-20 bg-background">
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
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-background to-background pointer-events-none" />
          <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

          <div className="container mx-auto px-6 md:px-10 max-w-5xl relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <Badge className="bg-background text-primary border-0 text-xs font-bold px-3 py-1.5 mb-5 tracking-widest uppercase">
                <Sparkles className="w-3 h-3 mr-1.5" />
                Our Journey
              </Badge>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.05]">
                Six years of<br className="hidden sm:block" />
                <span className="text-primary italic"> measurable impact.</span>
              </h2>
              <div className="w-16 h-[2px] bg-primary/30 mx-auto mt-8" />
              <p className="mt-8 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                From a clinician-led idea to a national movement — every chapter built on evidence, accessibility, and trust.
              </p>
            </motion.div>

            <div className="relative">
              {/* Crimson connector line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent md:-translate-x-px" />

              {chapters.map((c, i) => {
                const isLeft = i % 2 === 0;
                const isLatest = i === chapters.length - 1;
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative flex items-start mb-12 last:mb-0 md:items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Year badge on the line */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-20 top-0 md:top-1/2 md:-translate-y-1/2">
                      <div className={`relative ${isLatest ? "animate-pulse" : ""}`}>
                        <div className="absolute inset-0 rounded-full bg-primary/30 blur-md" />
                        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-large">
                          <span className="text-[11px] md:text-xs font-extrabold text-primary tracking-tight">{c.year}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card */}
                    <div className={`ml-24 md:ml-0 md:w-[calc(50%-3rem)] ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <div className="group relative bg-card border border-border/30 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-large hover:-translate-y-1 transition-all duration-500">
                        {isLatest && (
                          <span className="absolute -top-3 right-6 md:right-auto md:left-6 inline-flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-sm">
                            <Sparkles className="w-2.5 h-2.5" /> The Year Ahead
                          </span>
                        )}
                        <span className="block text-[10px] font-extrabold text-primary tracking-[0.25em] uppercase mb-2">
                          Chapter {String(i + 1).padStart(2, "0")} · {c.year}
                        </span>
                        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight">
                          {c.title}
                        </h3>
                        <p className="text-sm md:text-[15px] text-muted-foreground leading-[1.75]">
                          {c.description}
                        </p>
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
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
              <CharityRegBadge variant="card" />
              <div className="flex flex-wrap gap-3 mt-5">
                <Link to="/governance">
                  <Button variant="outline" size="sm" className="rounded-full text-xs font-medium">Our Governance</Button>
                </Link>
                <Link to="/impact">
                  <Button variant="outline" size="sm" className="rounded-full text-xs font-medium">Our Impact</Button>
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="rounded-2xl bg-gradient-to-br from-primary/8 via-background to-secondary/8 border border-border/20 p-8 md:p-12 relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
                <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-extrabold text-foreground mb-3">Join Our Mission</h2>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-md mx-auto">
                  Every donation, share, and volunteer hour brings us closer to a world where arthritis no longer limits anyone's potential.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/donate">
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

        <section id="maxwell" className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Our Team & Clinical Leadership
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-border rounded-lg p-6 bg-background">
                <h3 className="text-xl font-bold mb-1">Maxwell</h3>
                <p className="text-primary font-semibold mb-3 text-sm">
                  First Contact Practitioner · HCPC PH128483 · CSP Member
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Clinical Leadership & Content Review
                </p>
                <p className="leading-relaxed mb-4">
                  Maxwell is a Band 8 Advanced Physiotherapy Practitioner with over
                  20 years of clinical experience in arthritis management, joint
                  pain relief, and patient education. He leads all clinical review
                  and medical accuracy standards for Living With Arthritis UK.
                </p>
                <p className="text-xs font-semibold mb-2">Credentials:</p>
                <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
                  <li>HCPC Registration: PH128483</li>
                  <li>CSP Member (Chartered Society of Physiotherapy)</li>
                  <li>Evidence-based Practice Certification</li>
                  <li>Patient Education Specialist</li>
                </ul>
              </div>
              <div className="border border-dashed border-border rounded-lg p-6 bg-muted/30 flex items-center justify-center">
                <p className="text-muted-foreground text-center text-sm">
                  Additional trustees and clinical advisors joining soon.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InternalLinks />
        <NextReadStrip currentPath="/about" />
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
