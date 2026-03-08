import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users, MessageCircle, Calendar, Sparkles, ArrowRight,
  Heart, CheckCircle, Star, Globe, BookOpen, HandHeart, Download
} from "lucide-react";
import {
  generateKneeExercisePdf,
  generateHandExercisePdf,
  generateMealPlanPdf,
  generatePainTrackerPdf,
  generateChairExercisePdf,
  generateFoodsListPdf,
} from "@/lib/generatePdf";

const communityFeatures = [
  {
    icon: MessageCircle,
    title: "Peer Support Forum",
    description: "Connect with others who understand what you're going through. Share experiences, tips and encouragement in a safe, moderated space.",
    status: "Coming Soon",
    color: "text-violet-600 bg-violet-500/10",
  },
  {
    icon: Calendar,
    title: "Live Webinars & Events",
    description: "Monthly virtual sessions with physiotherapists, dietitians and patient advocates on topics like flare management, exercise programmes and nutrition.",
    status: "Coming Soon",
    color: "text-sky-600 bg-sky-500/10",
  },
  {
    icon: HandHeart,
    title: "Volunteer & Mentor",
    description: "Give back to the community as a peer mentor, event organiser or content contributor. Support others on their arthritis journey.",
    status: "Coming Soon",
    color: "text-emerald-600 bg-emerald-500/10",
  },
];

const newlyDiagnosedSteps = [
  { step: "1", title: "Learn About Your Condition", desc: "Start with our condition guides for osteoarthritis, RA or PsA.", href: "#conditions" },
  { step: "2", title: "Try Gentle Exercises", desc: "Visit the Exercise Hub for knee, hand and chair-based routines.", href: "/exercises" },
  { step: "3", title: "Improve Your Diet", desc: "Our Diet Hub covers anti-inflammatory foods and meal plans.", href: "/diet" },
  { step: "4", title: "Talk to Our AI Assistant", desc: "Get personalised, evidence-based guidance 24/7.", href: "/chat" },
  { step: "5", title: "Connect with Community", desc: "You're not alone — join our support community (coming soon).", href: "#community-features" },
];

const patientStories = [
  {
    name: "Sarah",
    age: 42,
    condition: "Osteoarthritis",
    quote: "I was diagnosed at 42 and felt completely lost. The exercise guides here helped me regain confidence in my body. I'm now walking 5km three times a week.",
  },
  {
    name: "John",
    age: 58,
    condition: "Knee Arthritis",
    quote: "After years of sport, my knees gave out. The chair exercises and swimming guides were a lifeline. I only wish I'd found this site sooner.",
  },
  {
    name: "Maria",
    age: 35,
    condition: "Rheumatoid Arthritis",
    quote: "Living with RA at 35 is isolating. The nutrition advice and knowing other young people share this journey makes all the difference.",
  },
];

const CommunityHub = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Arthritis Community Hub UK",
    description: "Join the Living With Arthritis community. Peer support, patient stories, webinars and a guided pathway for the newly diagnosed.",
    url: "https://livingwitharthritis.org.uk/community",
  };

  return (
    <>
      <Helmet>
        <title>Arthritis Community & Support UK | Living With Arthritis</title>
        <meta name="description" content="Join our arthritis community: patient stories, peer support, live webinars, and a step-by-step guide for the newly diagnosed. You're not alone." />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/community" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header />

      <PageHero
        badge={<Badge variant="outline" className="bg-primary/5 text-primary border-primary/20"><Users className="w-3.5 h-3.5 mr-1.5" /> Community</Badge>}
        title={<>You're Not <span className="text-primary">Alone</span></>}
        subtitle="Connect with others living with arthritis. Find support, share your story, and access guided resources whether you're newly diagnosed or managing long-term."
      />

      <main id="main-content">
        {/* Newly diagnosed pathway */}
        <section className="py-16 lg:py-20 bg-muted/20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Newly Diagnosed? Start Here</h2>
                <p className="text-sm text-muted-foreground">A step-by-step guide to managing your arthritis from day one</p>
              </div>
            </div>
            <div className="space-y-4">
              {newlyDiagnosedSteps.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link to={s.href} className="block group">
                    <Card className="border border-border/40 hover:border-primary/30 transition-all hover:shadow-sm">
                      <CardContent className="p-5 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-primary">{s.step}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{s.title}</h3>
                          <p className="text-sm text-muted-foreground mt-0.5">{s.desc}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors mt-1 shrink-0" />
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Patient stories */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Living With Arthritis Stories</h2>
                <p className="text-sm text-muted-foreground">Real people sharing their journey to help you feel less alone</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {patientStories.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full border border-border/40">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-lg font-bold text-primary">{s.name[0]}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{s.name}, {s.age}</h3>
                          <p className="text-xs text-muted-foreground">{s.condition}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed italic">"{s.quote}"</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Community features */}
        <section id="community-features" className="py-16 lg:py-20 bg-muted/20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Community Features</h2>
                <p className="text-sm text-muted-foreground">Building a supportive arthritis community in the UK</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {communityFeatures.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full border border-border/40">
                    <CardContent className="p-6">
                      <div className={`w-11 h-11 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                        <f.icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{f.description}</p>
                      <Badge variant="secondary" className="text-xs">{f.status}</Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Downloadable resources */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Free Downloadable Resources</h2>
                <p className="text-sm text-muted-foreground">Print-friendly guides you can use at home</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Knee Exercise Routine",
                  desc: "10-minute daily programme for knee osteoarthritis, including 7 targeted exercises with coaching tips.",
                  icon: "🦵",
                  pages: "3 pages",
                  onDownload: generateKneeExercisePdf,
                },
                {
                  title: "Hand Exercise Guide",
                  desc: "Grip strength & flexibility exercises for hand OA. 7 exercises with step-by-step instructions.",
                  icon: "✋",
                  pages: "2 pages",
                  onDownload: generateHandExercisePdf,
                },
                {
                  title: "7-Day Meal Plan",
                  desc: "Full Mediterranean-style anti-inflammatory weekly menu with breakfast, lunch, dinner & snacks.",
                  icon: "🥗",
                  pages: "3 pages",
                  onDownload: generateMealPlanPdf,
                },
                {
                  title: "Joint Pain Tracker",
                  desc: "Daily symptom diary worksheet with a weekly log table and reflection prompts.",
                  icon: "📋",
                  pages: "2 pages",
                  onDownload: generatePainTrackerPdf,
                },
                {
                  title: "Chair Exercise Guide",
                  desc: "8 seated routines requiring no equipment — suitable for all ability levels and flare-ups.",
                  icon: "🪑",
                  pages: "2 pages",
                  onDownload: generateChairExercisePdf,
                },
                {
                  title: "Anti-Inflammatory Foods List",
                  desc: "Printable tick-box shopping checklist covering 9 food groups with foods to limit.",
                  icon: "🛒",
                  pages: "2 pages",
                  onDownload: generateFoodsListPdf,
                },
              ].map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Card className="h-full border border-border/40 hover:border-amber-500/30 transition-all hover:shadow-md group">
                    <CardContent className="p-5 flex flex-col h-full">
                      <span className="text-2xl mb-3 block" aria-hidden="true">{r.icon}</span>
                      <h3 className="font-semibold text-foreground text-sm mb-1">{r.title}</h3>
                      <p className="text-xs text-muted-foreground mb-3 flex-1">{r.desc}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs text-muted-foreground/60">{r.pages} · PDF</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-8 gap-1.5 border-amber-500/30 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
                          onClick={r.onDownload}
                          aria-label={`Download ${r.title} PDF`}
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-muted/20">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
            <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Help Us Build This Community</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Your donations fund free resources, webinars and support programmes for people living with arthritis across the UK.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <Link to="/zakat-appeal">Donate Now <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/chat">Talk to Our AI Assistant</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CommunityHub;
