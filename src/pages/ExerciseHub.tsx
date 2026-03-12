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
  Dumbbell, Footprints, Hand, ArrowRight, Activity,
  Waves, Bike, Heart, Clock, CheckCircle, Star,
  ChevronRight, Sparkles, Shield, TrendingUp, Users, Timer, Target,
  Zap, MessageCircle, BarChart3
} from "lucide-react";
import ExerciseProgressTracker from "@/components/ExerciseProgressTracker";
import Pedometer from "@/components/Pedometer";
import {
  StatCounter,
  ProgressRing,
  HorizontalBar,
  WaveDivider,
  IconStatRow,
  EmojiCard,
  ComparisonCard,
  DonutChart,
  Timeline,
} from "@/components/graphics/InfographicElements";
import InternalLinks from "@/components/InternalLinks";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";

const exerciseCategories = [
  {
    id: "knee",
    title: "Knee Exercises",
    subtitle: "UK Physiotherapy Guide",
    description: "Strengthen muscles around your knees to reduce pain and improve stability.",
    icon: Footprints,
    color: "from-sky-500/15 to-blue-500/10",
    iconColor: "text-sky-600 bg-sky-500/10",
    borderColor: "border-sky-500/20 hover:border-sky-500/40",
    href: "/blog/knee-arthritis-exercises-uk",
    exercises: [
      "Straight leg raises – 3 sets of 10",
      "Wall sits – hold 15–30 seconds",
      "Step-ups – 2 sets of 10 each leg",
      "Hamstring curls – 3 sets of 10",
    ],
    tip: "Start with 5 minutes daily, building to 20 minutes over 4 weeks.",
  },
  {
    id: "hand",
    title: "Hand Exercises",
    subtitle: "Grip Strength & Dexterity",
    description: "Improve hand function and maintain grip strength with gentle exercises.",
    icon: Hand,
    color: "from-emerald-500/15 to-teal-500/10",
    iconColor: "text-emerald-600 bg-emerald-500/10",
    borderColor: "border-emerald-500/20 hover:border-emerald-500/40",
    href: "/blog/hand-exercises-for-arthritis",
    exercises: [
      "Finger bends – 10 reps each finger",
      "Thumb touches – 10 reps each hand",
      "Fist clenches with putty or stress ball",
      "Finger spreads – hold 5 seconds, repeat 10×",
    ],
    tip: "Warm your hands in warm water for 5 minutes before exercising.",
  },
  {
    id: "shoulder",
    title: "Shoulder Exercises",
    subtitle: "Flexibility & Pain Relief",
    description: "Restore range of motion and reduce shoulder stiffness with physio-approved stretches.",
    icon: Activity,
    color: "from-violet-500/15 to-purple-500/10",
    iconColor: "text-violet-600 bg-violet-500/10",
    borderColor: "border-violet-500/20 hover:border-violet-500/40",
    href: "/blog/shoulder-arthritis-exercises-uk",
    exercises: [
      "Pendulum swings – 30 seconds each arm",
      "Wall crawls – reach higher each day",
      "Cross-body stretches – hold 15 seconds",
      "External rotation with resistance band",
    ],
    tip: "Avoid overhead lifting during flare-ups. Focus on gentle range of motion.",
  },
  {
    id: "chair",
    title: "Chair Exercises",
    subtitle: "Seated Routines for All Abilities",
    description: "Safe, effective seated exercises for limited mobility or during flare-ups.",
    icon: Dumbbell,
    color: "from-amber-500/15 to-orange-500/10",
    iconColor: "text-amber-600 bg-amber-500/10",
    borderColor: "border-amber-500/20 hover:border-amber-500/40",
    href: "/blog/nhs-arthritis-exercises",
    exercises: [
      "Seated marching – 2 minutes",
      "Ankle circles – 10 each direction",
      "Seated knee extensions – 3 sets of 10",
      "Arm raises with light weights – 2 sets of 8",
    ],
    tip: "Use a sturdy chair without wheels. Keep movements slow and controlled.",
  },
];

const additionalActivities = [
  { title: "Swimming & Hydrotherapy", icon: Waves, href: "/blog/swimming-for-arthritis-uk", desc: "Low-impact aquatic exercise for joint pain relief" },
  { title: "Yoga for Arthritis", icon: Activity, href: "/blog/yoga-for-arthritis-beginners", desc: "Gentle poses for flexibility and strength" },
  { title: "Cycling for Arthritis", icon: Bike, href: "/blog/arthritis-and-cycling-uk", desc: "Joint-friendly cardio for knee and hip health" },
  { title: "Tai Chi for Balance", icon: Heart, href: "/blog/tai-chi-for-arthritis-uk", desc: "Gentle movement for balance and pain reduction" },
];

const ExerciseHub = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Best Exercises for Arthritis UK – Complete Guide",
    description: "Evidence-based arthritis exercises for knees, hands, shoulders and more. NHS-aligned physiotherapy routines for osteoarthritis and rheumatoid arthritis.",
    url: "https://livingwitharthritis.org.uk/exercises",
    mainEntity: {
      "@type": "MedicalCondition",
      name: "Arthritis",
      associatedAnatomy: [
        { "@type": "AnatomicalStructure", name: "Knee joint" },
        { "@type": "AnatomicalStructure", name: "Hand joints" },
        { "@type": "AnatomicalStructure", name: "Shoulder joint" },
      ],
    },
    about: {
      "@type": "ExercisePlan",
      name: "Arthritis Exercise Programme",
      exerciseType: "Low-impact strengthening and flexibility exercises",
    },
  };

  return (
    <>
      <Helmet>
        <title>Best Exercises for Arthritis UK | Knee, Hand & Shoulder Routines</title>
        <meta name="description" content="NHS-aligned arthritis exercises for knees, hands, shoulders and chair-based routines. Evidence-based physiotherapy programmes for osteoarthritis and RA pain relief." />
        <meta name="keywords" content="arthritis exercises UK, knee exercises arthritis, hand exercises arthritis, shoulder exercises arthritis, NHS physiotherapy, low impact exercises, osteoarthritis exercises, chair exercises arthritis" />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/exercises" />
        <link rel="alternate" hrefLang="en-GB" href="https://livingwitharthritis.org.uk/exercises" />
        <meta property="og:title" content="Best Exercises for Arthritis UK – Complete Guide" />
        <meta property="og:description" content="Evidence-based arthritis exercises for every joint. Physiotherapy routines, swimming, yoga and more." />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/exercises" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Best Exercises for Arthritis UK – Complete Guide" />
        <meta name="twitter:description" content="NHS-aligned arthritis exercises for knees, hands, shoulders and chair-based routines." />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://livingwitharthritis.org.uk/" },
            { "@type": "ListItem", "position": 2, "name": "Exercises", "item": "https://livingwitharthritis.org.uk/exercises" }
          ]
        })}</script>
      </Helmet>

      <Header />

      <PageHero
        badge={<Badge variant="outline" className="bg-primary/5 text-primary border-primary/20"><Dumbbell className="w-3.5 h-3.5 mr-1.5" /> Exercise Hub</Badge>}
        title={<>Best Exercises for <span className="text-primary">Arthritis</span> UK</>}
        subtitle="NHS-aligned physiotherapy routines you can do at home — for knees, hands, shoulders and whole-body relief."
      >
        <div className="flex flex-wrap gap-3 mt-2">
          <Button asChild size="lg" className="min-h-[48px] text-base font-semibold shadow-lg hover:shadow-xl transition-shadow">
            <Link to="/self-help"><Zap className="w-4 h-4 mr-2" /> Interactive Joint Diagram</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-h-[48px] text-base">
            <Link to="/chat"><MessageCircle className="w-4 h-4 mr-2" /> Ask AI for Exercises</Link>
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
          <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-primary" /> NHS-Aligned</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-600" /> Physiotherapy Approved</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-amber-600" /> 10–20 min routines</span>
        </div>
      </PageHero>

      <main id="main-content">
        {/* ─── Key Stats Infographic ─── */}
        <section className="py-12 lg:py-16 bg-tint-blue">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <p className="section-label text-primary mb-6">Why Exercise Matters</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCounter value="40" suffix="%" label="Pain reduction with regular exercise" icon={<TrendingUp className="w-6 h-6" />} color="emerald" />
              <StatCounter value="30" suffix=" min" label="Daily target for best results" icon={<Timer className="w-6 h-6" />} color="sky" />
              <StatCounter value="8.75" suffix="M" label="People with OA in the UK" icon={<Users className="w-6 h-6" />} color="amber" />
              <StatCounter value="4" label="Joint-specific routines below" icon={<Target className="w-6 h-6" />} color="violet" />
            </div>
          </div>
        </section>

        <WaveDivider color="hsl(var(--background))" />

        {/* Quick jump */}
        <section className="py-8 border-b border-border/40">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <p className="text-sm font-medium text-muted-foreground mb-3">Jump to:</p>
            <div className="flex flex-wrap gap-2">
              {exerciseCategories.map((cat) => (
                <a key={cat.id} href={`#${cat.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded-full bg-background border border-border/60 text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors">
                  <cat.icon className="w-3.5 h-3.5" /> {cat.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Exercise categories — first 2 */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl space-y-16">
            {exerciseCategories.slice(0, 2).map((cat, i) => (
              <motion.div
                key={cat.id}
                id={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Card className={`border ${cat.borderColor} bg-gradient-to-br ${cat.color} overflow-hidden`}>
                  <CardContent className="p-5 sm:p-7 lg:p-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${cat.iconColor} flex items-center justify-center shrink-0`}>
                        <cat.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">{cat.title}</h2>
                        <p className="text-sm text-muted-foreground font-medium">{cat.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-5 max-w-2xl">{cat.description}</p>

                    <div className="grid sm:grid-cols-2 gap-3 mb-5">
                      {cat.exercises.map((ex, j) => (
                        <div key={j} className="flex items-start gap-2.5 bg-background/60 backdrop-blur-sm rounded-lg p-3 border border-border/30">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm text-foreground">{ex}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border/30">
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-amber-500" />
                        <strong>Tip:</strong> {cat.tip}
                      </p>
                      <Button asChild className="shrink-0 min-h-[44px] font-semibold">
                        <Link to={cat.href}>Full guide <ArrowRight className="w-3.5 h-3.5 ml-1.5" /></Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══ Mid-page CTA: AI Assistant ═══ */}
        <section className="py-12 lg:py-16 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-y border-primary/10">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-6 md:gap-10"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-bold text-foreground mb-1">Not sure which exercises suit you?</h2>
                <p className="text-muted-foreground text-sm">Our AI assistant recommends exercises based on your specific joints, pain level and mobility — free and instant.</p>
              </div>
              <Button asChild size="lg" className="min-h-[48px] font-semibold shadow-md shrink-0">
                <Link to="/chat">Get Personalised Plan <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Exercise categories — last 2 */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl space-y-16">
            {exerciseCategories.slice(2).map((cat, i) => (
              <motion.div
                key={cat.id}
                id={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Card className={`border ${cat.borderColor} bg-gradient-to-br ${cat.color} overflow-hidden`}>
                  <CardContent className="p-5 sm:p-7 lg:p-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${cat.iconColor} flex items-center justify-center shrink-0`}>
                        <cat.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">{cat.title}</h2>
                        <p className="text-sm text-muted-foreground font-medium">{cat.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-5 max-w-2xl">{cat.description}</p>

                    <div className="grid sm:grid-cols-2 gap-3 mb-5">
                      {cat.exercises.map((ex, j) => (
                        <div key={j} className="flex items-start gap-2.5 bg-background/60 backdrop-blur-sm rounded-lg p-3 border border-border/30">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm text-foreground">{ex}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border/30">
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-amber-500" />
                        <strong>Tip:</strong> {cat.tip}
                      </p>
                      <Button asChild className="shrink-0 min-h-[44px] font-semibold">
                        <Link to={cat.href}>Full guide <ArrowRight className="w-3.5 h-3.5 ml-1.5" /></Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── Exercise Effectiveness Chart ─── */}
        <section className="py-12 lg:py-16 bg-tint-green">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="section-label text-emerald-600 mb-3">Research Findings</p>
                <h2 className="text-2xl font-bold text-foreground mb-2">Exercise Effectiveness by Type</h2>
                <p className="text-sm text-muted-foreground mb-6">Patients reporting improvement after 12 weeks.</p>
                <HorizontalBar
                  items={[
                    { label: "Swimming / Hydrotherapy", value: 78, color: "hsl(var(--sky))" },
                    { label: "Walking (30 min/day)", value: 72, color: "hsl(var(--emerald))" },
                    { label: "Strength Training", value: 68, color: "hsl(var(--violet))" },
                    { label: "Yoga / Tai Chi", value: 65, color: "hsl(var(--amber))" },
                    { label: "Cycling", value: 62, color: "hsl(var(--primary))" },
                  ]}
                />
              </div>
              <div className="flex flex-col items-center gap-6">
                <DonutChart
                  label="Exercise Benefits Breakdown"
                  segments={[
                    { percent: 35, color: "hsl(var(--emerald))", label: "Pain relief" },
                    { percent: 25, color: "hsl(var(--sky))", label: "Mobility" },
                    { percent: 20, color: "hsl(var(--violet))", label: "Strength" },
                    { percent: 20, color: "hsl(var(--amber))", label: "Mood" },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        <WaveDivider color="hsl(var(--background))" />

        {/* ─── Quick Tips Emoji Grid ─── */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <h2 className="text-2xl font-bold text-foreground mb-2">Quick Exercise Tips</h2>
            <p className="text-sm text-muted-foreground mb-8">Simple guidelines for safe, effective arthritis exercise.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <EmojiCard emoji="🔥" title="Warm Up" description="5 min gentle movement before each session" />
              <EmojiCard emoji="💧" title="Stay Hydrated" description="Drink water before, during and after" />
              <EmojiCard emoji="⏱️" title="Pace Yourself" description="Start slow, increase gradually over weeks" />
              <EmojiCard emoji="🧊" title="Ice After" description="Apply cold pack if joints feel warm post-exercise" />
              <EmojiCard emoji="📅" title="Be Consistent" description="Daily short sessions beat weekly long ones" />
              <EmojiCard emoji="🛑" title="Listen to Pain" description="Sharp pain = stop. Mild ache = OK to continue" />
            </div>
          </div>
        </section>

        {/* Additional activities */}
        <section className="py-12 lg:py-16 bg-muted/20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <h2 className="text-3xl font-bold text-foreground mb-3">More Ways to Stay Active</h2>
            <p className="text-muted-foreground mb-10 max-w-2xl">Low-impact activities that complement your routine.</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {additionalActivities.map((act, i) => (
                <motion.div
                  key={act.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link to={act.href} className="block group">
                    <Card className="h-full border border-border/40 hover:border-primary/30 transition-all hover:shadow-md">
                      <CardContent className="p-6">
                        <act.icon className="w-8 h-8 text-primary mb-3" />
                        <h3 className="font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">{act.title}</h3>
                        <p className="text-sm text-muted-foreground">{act.desc}</p>
                        <span className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-3">
                          Read more <ChevronRight className="w-3 h-3" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Mid-page CTA: Pain Journal ═══ */}
        <section className="py-12 lg:py-16 bg-gradient-to-r from-violet-500/5 via-violet-500/10 to-violet-500/5 border-y border-violet-500/10">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-6 md:gap-10"
            >
              <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center shrink-0">
                <BarChart3 className="w-8 h-8 text-violet-600" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-bold text-foreground mb-1">Track how exercise affects your pain</h2>
                <p className="text-muted-foreground text-sm">Use the Pain Journal to log symptoms before and after exercise — see patterns and share with your GP.</p>
              </div>
              <Button asChild size="lg" className="min-h-[48px] font-semibold bg-violet-600 hover:bg-violet-700 text-white shadow-md shrink-0">
                <Link to="/pain-journal">Open Pain Journal <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ─── Weekly Plan Timeline ─── */}
        <section className="py-12 lg:py-16 bg-tint-peach">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-2">Sample Weekly Plan</h2>
            <p className="text-sm text-muted-foreground mb-8">A balanced week of arthritis-friendly exercise.</p>
            <Timeline items={[
              { title: "Monday — Knee Strengthening", description: "20 min quad & hamstring routine." },
              { title: "Tuesday — Walking", description: "30 min brisk walk with supportive footwear." },
              { title: "Wednesday — Hand Exercises", description: "15 min grip & flexibility." },
              { title: "Thursday — Swimming", description: "30 min pool session or aqua aerobics." },
              { title: "Friday — Yoga / Tai Chi", description: "20 min gentle flexibility and balance." },
              { title: "Saturday — Chair Exercises", description: "15 min seated routine for lower-energy days." },
              { title: "Sunday — Rest & Stretch", description: "Gentle 10 min full-body stretching." },
            ]} />
          </div>
        </section>

        <WaveDivider color="hsl(var(--background))" />

        {/* Pedometer */}
        <Pedometer />

        {/* Progress Tracker */}
        <ExerciseProgressTracker />

        {/* Final CTA */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-primary/5">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Need Personalised Exercise Advice?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
                Get recommendations tailored to your joints, pain level and fitness — free, instant and evidence-based.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="min-h-[52px] text-base font-semibold shadow-lg hover:shadow-xl transition-shadow">
                  <Link to="/chat">Talk to Our AI Assistant <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="min-h-[52px] text-base">
                  <Link to="/self-help">Interactive Joint Diagram</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <InternalLinks />
      <Footer />
    </>
  );
};

export default ExerciseHub;
