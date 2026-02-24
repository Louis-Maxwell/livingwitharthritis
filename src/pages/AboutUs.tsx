import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Heart, BookOpen, Rocket, Users, Target, TrendingUp, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const sectionIcons: Record<string, React.ElementType> = {
  "Our Story": BookOpen,
  "The Scale of Arthritis": TrendingUp,
  "Our Mission": Target,
  "Our Commitment": Heart,
  "What We've Built": Users,
  "Looking Ahead": Rocket,
};

const milestones = [
  { year: "2020", title: "The Spark", description: "Founded from a personal mission to help millions navigate arthritis with better support and information." },
  { year: "2021", title: "First 1,000 Users", description: "Our online resource library and community forum reached its first thousand active members." },
  { year: "2022", title: "Virtual Physio Launch", description: "Launched free virtual physiotherapy consultations, removing barriers to professional guidance." },
  { year: "2023", title: "AI Symptom Guide", description: "Introduced an AI-powered assistant to help users understand their symptoms and find resources." },
  { year: "2024", title: "10,000+ Supported", description: "Surpassed 10,000 people supported with evidence-based tools, nutrition plans, and exercise guides." },
  { year: "2025", title: "National Partnerships", description: "Began collaborating with NHS trusts and leading rheumatology bodies to expand our reach." },
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
        <title>About Us — Living with Arthritis</title>
        <meta name="description" content="Learn about Living with Arthritis, founded in 2020 to support millions affected by arthritis through research, education, and community." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary/8 via-accent to-background pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

          <div className="container mx-auto px-6 md:px-10 max-w-4xl relative">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mb-8 rounded-full text-muted-foreground hover:text-foreground -ml-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <Heart className="w-3 h-3" />
                Est. 2020
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground tracking-tight leading-[1.1] mb-6">
                From a personal mission to a <span className="text-primary italic">national movement</span>
              </h1>
              <p className="text-lg text-muted-foreground/70 max-w-xl leading-relaxed">
                How Living with Arthritis grew from one family's experience into a platform supporting thousands across the United Kingdom.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl">
            {isLoading ? (
              <div className="space-y-10">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse flex items-start gap-5">
                    <div className="w-12 h-12 bg-muted rounded-xl shrink-0" />
                    <div className="flex-1 space-y-3">
                      <div className="h-6 w-1/3 bg-muted rounded" />
                      <div className="h-4 w-full bg-muted rounded" />
                      <div className="h-4 w-2/3 bg-muted rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-0">
                {sections.map((section, i) => {
                  const Icon = sectionIcons[section.title] || Heart;
                  return (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                      className="group"
                    >
                      <div className="flex items-start gap-6 py-10">
                        <div className="w-12 h-12 rounded-2xl bg-primary/6 flex items-center justify-center shrink-0 group-hover:bg-primary/12 transition-colors duration-300 mt-1">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-xl font-display font-bold text-foreground mb-3 tracking-tight">
                            {section.title}
                          </h2>
                          <p className="text-muted-foreground leading-[1.8] text-[15px]">
                            {section.content}
                          </p>
                        </div>
                      </div>
                      {i < sections.length - 1 && (
                        <div className="h-px bg-border/40 ml-[4.5rem]" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 lg:py-28 bg-accent/30">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="section-label text-primary mb-3 block">Our Journey</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                Key <span className="text-primary italic">milestones</span>
              </h2>
            </motion.div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border/50 md:-translate-x-px" />

              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative flex items-start mb-12 last:mb-0 md:items-center ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-primary border-4 border-background z-10 -translate-x-1.5 md:-translate-x-1.5 top-5 md:top-auto" />

                    {/* Card */}
                    <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                      <div className="bg-card border border-border/20 rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow duration-300 group">
                        <span className="text-xs font-bold text-primary tracking-widest uppercase">{m.year}</span>
                        <h3 className="text-lg font-display font-bold text-foreground mt-1 mb-2">{m.title}</h3>
                        <p className="text-sm text-muted-foreground/70 leading-relaxed">{m.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Footer */}
        <section className="py-20 lg:py-24">
          <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-3xl bg-accent/40 border border-border/20 p-10 md:p-14">
                <Heart className="w-8 h-8 text-primary mx-auto mb-5" />
                <h2 className="text-2xl font-display font-bold text-foreground mb-3">Join Our Mission</h2>
                <p className="text-sm text-muted-foreground/70 mb-8 leading-relaxed max-w-md mx-auto">
                  Every donation, share, and volunteer hour brings us closer to a world where arthritis no longer limits anyone's potential.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/#involved">
                    <Button className="btn-primary-cta rounded-full px-8 h-12 text-sm font-bold">
                      <Heart className="w-4 h-4 mr-2" />
                      Donate Now
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button variant="outline" className="rounded-full px-8 h-12 text-sm font-medium border-border/30">
                      Explore Resources
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
