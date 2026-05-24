import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import InternalLinks from "@/components/InternalLinks";
import ContextualLinks from "@/components/ContextualLinks";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { dailyTips } from "@/data/dailyTips";
import {
  Users, MessageCircle, Calendar, Sparkles, ArrowRight,
  Heart, Star, Globe, BookOpen, HandHeart, Download
} from "lucide-react";
import PeerSupportForum from "@/components/PeerSupportForum";
import {
  StatCounter,
  HorizontalBar,
  WaveDivider,
  EmojiCard,
  DonutChart,
} from "@/components/graphics/InfographicElements";

const communityFeatures = [
  {
    icon: Calendar,
    title: "Live Webinars & Events",
    description: "Monthly virtual sessions with physiotherapists, dietitians and patient advocates on topics like flare management, exercise programmes and nutrition.",
    color: "text-primary bg-primary/10",
  },
  {
    icon: HandHeart,
    title: "Volunteer & Mentor",
    description: "Give back to the community as a peer mentor, event organiser or content contributor. Support others on their arthritis journey.",
    color: "text-primary bg-primary/10",
  },
  {
    icon: Sparkles,
    title: "Health Tools",
    description: "Take our symptom quiz, check your inflammation risk score, or generate a personalised exercise plan — all free and instant.",
    color: "text-primary bg-primary/10",
    href: "/health-tools",
  },
];

const newlyDiagnosedSteps = [
  { step: "1", title: "Learn About Your Condition", desc: "Start with our condition guides for osteoarthritis, RA or PsA.", href: "#conditions" },
  { step: "2", title: "Try Gentle Exercises", desc: "Visit the Exercise Hub for knee, hand and chair-based routines.", href: "/exercises" },
  { step: "3", title: "Improve Your Diet", desc: "Our Diet Hub covers anti-inflammatory foods and meal plans.", href: "/diet" },
  { step: "4", title: "Start a Chat", desc: "Get personalised, evidence-based guidance 24/7.", href: "/chat" },
  { step: "5", title: "Connect with Community", desc: "You're not alone — join our peer support forum and resources.", href: "#community-features" },
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
        <meta name="keywords" content="arthritis support groups near me, arthritis community, peer support arthritis, arthritis webinars, newly diagnosed arthritis, arthritis stories, arthritis helpline, arthritis advocacy, living with arthritis, arthritis and mental health, how to support someone with chronic pain, arthritis events, volunteer for charity" />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/community" />
        <link rel="alternate" hrefLang="en-GB" href="https://livingwitharthritis.org.uk/community" />
        <meta property="og:title" content="Arthritis Community & Support UK" />
        <meta property="og:description" content="Join our arthritis community: patient stories, peer support, live webinars and guided resources." />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/community" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Arthritis Community & Support UK" />
        <meta name="twitter:description" content="Join our arthritis community: patient stories, peer support and guided resources for the newly diagnosed." />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://livingwitharthritis.org.uk/" },
            { "@type": "ListItem", "position": 2, "name": "Community", "item": "https://livingwitharthritis.org.uk/community" }
          ]
        })}</script>
      </Helmet>

      <Header />
      <PageBreadcrumb segments={[{ label: "Community Hub" }]} />

      <PageHero
        badge={<Badge variant="outline" className="bg-primary/5 text-primary border-primary/20"><Users className="w-3.5 h-3.5 mr-1.5" /> Community</Badge>}
        title={<>You're Not <span className="text-primary">Alone</span></>}
        subtitle="Connect with others living with arthritis. Find support, share your story, and access guided resources whether you're newly diagnosed or managing long-term."
      />

      <main id="main-content">
        {/* ─── Community Impact Stats ─── */}
        <section className="py-12 lg:py-16 bg-tint-rose">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <p className="section-label text-primary mb-6">Our Community Impact</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCounter value="10M+" label="People with arthritis in the UK" icon={<Users className="w-6 h-6" />} color="primary" />
              <StatCounter value="24/7" label="help chat availability" icon={<MessageCircle className="w-6 h-6" />} color="sky" />
              <StatCounter value="50+" label="Free guides & resources" icon={<BookOpen className="w-6 h-6" />} color="emerald" />
              <StatCounter value="9" label="Downloadable PDF guides" icon={<Download className="w-6 h-6" />} color="amber" />
            </div>
          </div>
        </section>

        <WaveDivider color="hsl(var(--background))" />

        {/* ─── Self-management Benefits Chart ─── */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="section-label text-primary mb-3">Evidence-Based Benefits</p>
                <h2 className="text-2xl font-bold text-foreground mb-4">Why Community & Self-Management Work</h2>
                <p className="text-sm text-muted-foreground mb-6">Research shows that people who actively self-manage their arthritis report better outcomes.</p>
                <HorizontalBar
                  items={[
                    { label: "Less pain with daily exercise", value: 78, color: "hsl(var(--emerald))" },
                    { label: "Better mood with peer support", value: 72, color: "hsl(var(--sky))" },
                    { label: "Improved sleep quality", value: 65, color: "hsl(var(--violet))" },
                    { label: "Reduced GP visits", value: 58, color: "hsl(var(--amber))" },
                  ]}
                />
              </div>
              <div className="flex flex-col items-center gap-6">
                <DonutChart
                  label="What Helps Most"
                  segments={[
                    { percent: 30, color: "hsl(var(--emerald))", label: "Exercise" },
                    { percent: 25, color: "hsl(var(--sky))", label: "Diet" },
                    { percent: 25, color: "hsl(var(--violet))", label: "Support" },
                    { percent: 20, color: "hsl(var(--amber))", label: "Education" },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Newly diagnosed pathway */}
        <section className="py-12 lg:py-16 bg-tint-blue">
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

        <WaveDivider color="hsl(var(--background))" />

        {/* ─── Emoji Quick Resources ─── */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <h2 className="text-2xl font-bold text-foreground mb-2">Quick Support Resources</h2>
            <p className="text-sm text-muted-foreground mb-8">Instant access to key areas of support.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <EmojiCard emoji="🏋️" title="Exercise Hub" description="Joint-specific routines and programmes" />
              <EmojiCard emoji="🥗" title="Diet Hub" description="Anti-inflammatory eating guides" />
              <EmojiCard emoji="💬" title="Help Chat" description="24/7 personalised health guidance" />
              <EmojiCard emoji="📖" title="Blog Articles" description="In-depth condition & lifestyle guides" />
              <EmojiCard emoji="📋" title="Self-Help Tool" description="Interactive joint pain diagram" />
              <EmojiCard emoji="💊" title="Supplements" description="Evidence review of common supplements" />
            </div>
          </div>
        </section>

        {/* Patient stories */}
        <section className="py-12 lg:py-16 bg-tint-peach">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" />
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
                          <Star key={j} className="w-3.5 h-3.5 text-primary fill-primary" />
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

        <WaveDivider color="hsl(var(--background))" />

        {/* Peer Support Forum */}
        <PeerSupportForum />

        {/* Community features */}
        <section id="community-features" className="py-12 lg:py-16 bg-tint-violet">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">More Community Features</h2>
                <p className="text-sm text-muted-foreground">Building a supportive arthritis community in the UK</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {communityFeatures.filter(f => f.title !== "Peer Support Forum").map((f, i) => (
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
                      
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <WaveDivider color="hsl(var(--background))" />

        {/* Downloadable resources */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Free Downloadable Resources</h2>
                <p className="text-sm text-muted-foreground">Print-friendly guides you can use at home</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: "Knee Exercise Routine", desc: "10-minute daily programme for knee osteoarthritis, including 7 targeted exercises with coaching tips.", icon: "🦵", pages: "3 pages", fn: "generateKneeExercisePdf" },
                { title: "Hand Exercise Guide", desc: "Grip strength & flexibility exercises for hand OA. 7 exercises with step-by-step instructions.", icon: "✋", pages: "2 pages", fn: "generateHandExercisePdf" },
                { title: "Shoulder Exercise Guide", desc: "7 rotator cuff & mobility exercises for shoulder arthritis with daily living tips.", icon: "💪", pages: "3 pages", fn: "generateShoulderExercisePdf" },
                { title: "Hip Exercise Guide", desc: "7 strengthening & flexibility exercises for hip OA plus daily living adaptations.", icon: "🦴", pages: "3 pages", fn: "generateHipExercisePdf" },
                { title: "Chair Exercise Guide", desc: "8 seated routines requiring no equipment — suitable for all ability levels and flare-ups.", icon: "🪑", pages: "2 pages", fn: "generateChairExercisePdf" },
                { title: "7-Day Meal Plan", desc: "Full Mediterranean-style anti-inflammatory weekly menu with breakfast, lunch, dinner & snacks.", icon: "🥗", pages: "3 pages", fn: "generateMealPlanPdf" },
                { title: "Anti-Inflammatory Foods List", desc: "Printable tick-box shopping checklist covering 9 food groups with foods to limit.", icon: "🛒", pages: "2 pages", fn: "generateFoodsListPdf" },
                { title: "Joint Pain Tracker", desc: "Daily symptom diary worksheet with a weekly log table and reflection prompts.", icon: "📋", pages: "2 pages", fn: "generatePainTrackerPdf" },
                { title: "Weekly Exercise Tracker", desc: "Log your exercises, track pain before/after, set goals and celebrate weekly wins.", icon: "📊", pages: "2 pages", fn: "generateProgressTrackerPdf" },
              ].map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Card className="h-full border border-border/40 hover:border-primary/30 transition-all hover:shadow-md group">
                    <CardContent className="p-5 flex flex-col h-full">
                      <span className="text-2xl mb-3 block" aria-hidden="true">{r.icon}</span>
                      <h3 className="font-semibold text-foreground text-sm mb-1">{r.title}</h3>
                      <p className="text-xs text-muted-foreground mb-3 flex-1">{r.desc}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs text-muted-foreground">{r.pages} · PDF</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-8 gap-1.5 border-primary/30 text-primary hover:bg-primary hover:text-primary min-h-[44px]"
                          onClick={async () => { const mod = await import("@/lib/generatePdf"); (mod as Record<string, () => void>)[r.fn](); }}
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
        <section className="py-16 lg:py-20 bg-tint-mint">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
            <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Help Us Build This Community</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Your donations fund free resources, webinars and support programmes for people living with arthritis across the UK.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="min-h-[44px]">
                <Link to="/zakat-appeal">Donate Now <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-h-[44px]">
                <Link to="/chat">Start a Chat</Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-12">
          <ContextualLinks
            heading="Keep exploring our community resources"
            intro="Connect, learn and act — useful starting points for people newly diagnosed, long-term patients, family members and supporters."
            groups={[
              {
                title: "Living well with arthritis",
                links: [
                  { label: "Arthritis and mental health", to: "/blog/category/lifestyle" },
                  { label: "Working with arthritis", to: "/blog/category/lifestyle" },
                  { label: "How to support someone with chronic pain", to: "/community" },
                  { label: "Arthritis in cold weather — practical tips", to: "/blog/category/lifestyle" },
                ],
              },
              {
                title: "Condition guides",
                links: [
                  { label: "Osteoarthritis", to: "/conditions/osteoarthritis" },
                  { label: "Rheumatoid arthritis", to: "/conditions/rheumatoid-arthritis" },
                  { label: "Juvenile arthritis — for parents", to: "/conditions/juvenile-arthritis" },
                  { label: "Fibromyalgia peer support", to: "/conditions/fibromyalgia" },
                  { label: "Lupus support", to: "/conditions/lupus" },
                ],
              },
              {
                title: "Take action",
                links: [
                  { label: "Donate to arthritis charity", to: "/donate" },
                  { label: "Volunteer for our charity", to: "/ways-to-help" },
                  { label: "Fundraising ideas", to: "/ways-to-help" },
                  { label: "Help while waiting for rheumatology", to: "/arthritis-waiting-list-help" },
                  { label: "Browse the Advice Hub", to: "/blog-hub" },
                ],
              },
            ]}
          />
        </div>

        <section aria-labelledby="daily-tips-heading" className="container mx-auto px-6 md:px-10 max-w-6xl py-12 border-t border-border">
          <h2 id="daily-tips-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-3">Daily tips for joint health</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl">Small, everyday habits that ease stiffness, support mobility, and help you live well with arthritis.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dailyTips.map((tip) => (
              <Link
                key={tip.slug}
                to={`/daily-tips/${tip.slug}`}
                className="block bg-card border border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">{tip.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{tip.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <InternalLinks />
      <Footer />
    </>
  );
};

export default CommunityHub;
