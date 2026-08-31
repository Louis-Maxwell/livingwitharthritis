import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextReadStrip from "@/components/NextReadStrip";
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
  Zap, MessageCircle, BarChart3,
} from "lucide-react";
import ExerciseProgressTracker from "@/components/ExerciseProgressTracker";
import Pedometer from "@/components/Pedometer";
import {
  StatCounter,
  HorizontalBar,
  WaveDivider,
  EmojiCard,
  DonutChart,
  Timeline,
} from "@/components/graphics/InfographicElements";
import InternalLinks from "@/components/InternalLinks";
import ContextualLinks from "@/components/ContextualLinks";
import CrossLinkBanner from "@/components/CrossLinkBanner";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { EXERCISE_ANIMATIONS, type ExerciseAnimationKey } from "@/components/exercises/ExerciseAnimations";
import AnswerBox from "@/components/seo/AnswerBox";

const exerciseCategories = [
  {
    id: "knee",
    title: "Knee Exercises",
    subtitle: "UK Physiotherapy Guide",
    description: "Strengthen muscles around your knees to reduce pain and improve stability.",
    icon: Footprints,
    color: "from-primary/15 to-primary/10",
    iconColor: "text-primary bg-primary/10",
    borderColor: "border-primary/20 hover:border-primary/40",
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
    color: "from-primary/15 to-primary/10",
    iconColor: "text-primary bg-primary/10",
    borderColor: "border-primary/20 hover:border-primary/40",
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
    color: "from-primary/15 to-primary/10",
    iconColor: "text-primary bg-primary/10",
    borderColor: "border-primary/20 hover:border-primary/40",
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
    color: "from-primary/15 to-primary/10",
    iconColor: "text-primary bg-primary/10",
    borderColor: "border-primary/20 hover:border-primary/40",
    href: "/blog/arthritis-exercises",
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
  { title: "Swimming & Hydrotherapy", icon: Waves, href: "/blog/swimming-for-arthritis", desc: "Low-impact aquatic exercise for joint pain relief" },
  { title: "Yoga for Arthritis", icon: Activity, href: "/blog/yoga-for-arthritis-beginners", desc: "Gentle poses for flexibility and strength" },
  { title: "Cycling for Arthritis", icon: Bike, href: "/blog/cycling-with-arthritis", desc: "Joint-friendly cardio for knee and hip health" },
  { title: "Tai Chi for Arthritis (UK Guide)", icon: Heart, href: "/exercises/tai-chi-for-arthritis", desc: "NICE-recommended — by joint, plus seated options" },
  { title: "Tai Chi for Beginners", icon: Heart, href: "/exercises/tai-chi-for-beginners", desc: "Free 7-day at-home plan — ~10 min/day, no equipment" },
  { title: "Tai Chi for Balance", icon: Heart, href: "/exercises/tai-chi-for-balance", desc: "Gentle movement for balance and pain reduction" },
  { title: "Seated Tai Chi", icon: Heart, href: "/exercises/seated-tai-chi-for-arthritis", desc: "Chair-based routine for severe OA or post-surgery" },
];

// Internal-link matrix surfacing every exercise×joint guide — keeps these pages
// reachable in one click from the Exercise Hub (no orphans in sitemap.xml).
const EXERCISE_MATRIX_TYPES: { slug: string; label: string }[] = [
  { slug: "swimming", label: "Swimming" },
  { slug: "yoga", label: "Yoga" },
  { slug: "cycling", label: "Cycling" },
  { slug: "walking", label: "Walking" },
  { slug: "tai-chi", label: "Tai Chi" },
  { slug: "pilates", label: "Pilates" },
  { slug: "stretching", label: "Stretching" },
  { slug: "strength-training", label: "Strength Training" },
];
const EXERCISE_MATRIX_JOINTS: { slug: string; label: string }[] = [
  { slug: "knee", label: "Knee" },
  { slug: "hip", label: "Hip" },
  { slug: "shoulder", label: "Shoulder" },
  { slug: "hand", label: "Hand" },
  { slug: "back", label: "Back" },
  { slug: "ankle", label: "Ankle" },
];

const ExerciseHub = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Best Exercises for Arthritis UK – Complete Guide",
    description: "Evidence-based arthritis exercises for knees, hands, shoulders and more. clinically aligned physiotherapy routines for osteoarthritis and rheumatoid arthritis.",
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
        <title>Arthritis Exercises UK | Knee, Hand & Shoulder Routines</title>
        <meta name="description" content="Arthritis exercises: Joint-specific routines for knees, hands, hips, back. Low-impact, evidence-based programmes from an HCPC physiotherapist." />
        <meta name="keywords" content="arthritis exercises, arthritis friendly exercises, exercises to avoid with arthritis, knee arthritis exercises, hip arthritis exercises, hand arthritis exercises, shoulder arthritis exercises, osteoarthritis exercises, rheumatoid arthritis exercises, low impact exercises arthritis, chair exercises arthritis, physiotherapy for arthritis, joint pain relief, mobility aids for arthritis, arthritis self-care" />
        <link rel="alternate" hrefLang="en-GB" href="https://livingwitharthritis.org.uk/exercises" />
        <meta property="og:title" content="Best Exercises for Arthritis UK – Complete Guide" />
        <meta property="og:description" content="Arthritis exercises: Joint-specific routines for knees, hands, hips, back. Low-impact, evidence-based programmes from an HCPC physiotherapist." />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/exercises" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Arthritis Exercises UK | Knee, Hand & Shoulder Routines" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Exercises for Arthritis UK – Complete Guide" />
        <meta name="twitter:description" content="Arthritis exercises: Joint-specific routines for knees, hands, hips, back. Low-impact, evidence-based programmes from an HCPC physiotherapist." />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        {/* BreadcrumbList intentionally not emitted here — <PageBreadcrumb> below covers it. */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to start exercising with arthritis",
          "description": "A safe, joint-friendly exercise routine for people with osteoarthritis or rheumatoid arthritis, aligned with NICE guidelines.",
          "totalTime": "PT30M",
          "step": [
            { "@type": "HowToStep", "position": 1, "name": "Warm up gently", "text": "Spend 5 minutes doing slow walking on the spot or gentle shoulder rolls to increase blood flow to joints before exercise." },
            { "@type": "HowToStep", "position": 2, "name": "Low-impact aerobic movement", "text": "Walk, cycle, or swim for 10–20 minutes at a comfortable pace. These activities reduce joint stress while improving cardiovascular health." },
            { "@type": "HowToStep", "position": 3, "name": "Strengthening exercises", "text": "Perform 2 sets of 10 straight-leg raises or seated knee extensions to build muscle support around the knee and hip joints." },
            { "@type": "HowToStep", "position": 4, "name": "Flexibility and balance", "text": "Hold each gentle stretch for 20–30 seconds. Tai chi or yoga for 5–10 minutes improves balance and reduces fall risk." },
            { "@type": "HowToStep", "position": 5, "name": "Cool down", "text": "Finish with 3–5 minutes of slow walking and deep breathing. Apply ice to any joints that feel warm post-exercise." }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "url": "https://livingwitharthritis.org.uk/exercises",
          "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".speakable-intro"] }
        })}</script>
      </Helmet>

      <Header />
      <PageBreadcrumb segments={[{ label: "Exercise Hub" }]} />

      <PageHero
        badge={<Badge variant="outline" className="bg-primary/5 text-primary border-primary/20"><Dumbbell className="w-3.5 h-3.5 mr-1.5" /> Exercise Hub</Badge>}
        title={<>Best Exercises for <span className="text-primary">Arthritis</span> UK</>}
        subtitle="clinically aligned physiotherapy routines you can do at home — for knees, hands, shoulders and whole-body relief."
      >
        <div className="flex flex-wrap gap-3 mt-2">
          <Button asChild size="lg" className="min-h-[48px] text-base font-semibold shadow-lg hover:shadow-xl transition-shadow">
            <Link to="/self-help"><Zap className="w-4 h-4 mr-2" /> Interactive Joint Diagram</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-h-[48px] text-base">
            <Link to="/chat"><MessageCircle className="w-4 h-4 mr-2" /> Ask for Exercises</Link>
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
          <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-primary" /> Clinically Aligned</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> Physiotherapy Approved</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> 10–20 min routines</span>
        </div>
      </PageHero>

      {/* Editorial photo band — movement as discipline */}
      <section aria-label="Movement is medicine" className="relative h-[320px] md:h-[420px] overflow-hidden bg-foreground">
        <img
          src="/images/diver-movement.webp"
          alt="Aerial black-and-white photograph of a diver mid-air above sparkling water, body fully extended in motion"
          width={1920}
          height={1440}
          loading="eager"
          {...({ fetchpriority: "high" } as Record<string, string>)}
          decoding="async"
          className="h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/30 to-transparent" aria-hidden="true" />
        <figure className="absolute inset-y-0 left-0 flex items-center p-8 md:p-14 max-w-2xl">
          <blockquote>
            <p className="font-display text-2xl md:text-4xl font-bold text-primary-foreground leading-tight" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
              &ldquo;Motion is lotion. Every stretch, every step, every breath — medicine.&rdquo;
            </p>
            <figcaption className="mt-3 text-xs md:text-sm text-primary-foreground font-medium tracking-wider uppercase">Living With Arthritis UK · Exercise Hub</figcaption>
          </blockquote>
        </figure>
      </section>

      <main id="main-content">
        <section className="container mx-auto px-6 md:px-10 max-w-3xl pt-8">
          <AnswerBox
            question="What are the best exercises for arthritis?"
            reviewed="2026-06-13"
          >
            <p>
              UK physiotherapy guidance recommends a mix of <strong>low-impact aerobic
              activity</strong> (walking, cycling, swimming — 30 minutes most days),
              <strong> strength training</strong> for the muscles around painful joints
              (2–3 sessions a week) and <strong>flexibility work</strong> like yoga or tai chi.
              This combination reduces pain by up to 40% and is the NICE first-line treatment
              for osteoarthritis — more effective than painkillers.
            </p>
          </AnswerBox>
        </section>
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

                    <div className="grid lg:grid-cols-[1fr_320px] gap-6 mb-5">
                      <div className="grid sm:grid-cols-2 gap-3">
                        {cat.exercises.map((ex, j) => (
                          <div key={j} className="flex items-start gap-2.5 bg-background/60 backdrop-blur-sm rounded-lg p-3 border border-border/30">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span className="text-sm text-foreground">{ex}</span>
                          </div>
                        ))}
                      </div>
                      {EXERCISE_ANIMATIONS[cat.id as ExerciseAnimationKey] && (() => {
                        const Anim = EXERCISE_ANIMATIONS[cat.id as ExerciseAnimationKey];
                        return (
                          <div>
                            <Anim />
                            <p className="text-[11px] text-muted-foreground text-center mt-1.5 italic">Animated demonstration</p>
                          </div>
                        );
                      })()}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border/30">
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-primary" />
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

        {/* ═══ Mid-page CTA: Help Chat ═══ */}
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
                <p className="text-muted-foreground text-sm">Our help chat recommends exercises based on your specific joints, pain level and mobility — free and instant.</p>
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

                    <div className="grid lg:grid-cols-[1fr_320px] gap-6 mb-5">
                      <div className="grid sm:grid-cols-2 gap-3">
                        {cat.exercises.map((ex, j) => (
                          <div key={j} className="flex items-start gap-2.5 bg-background/60 backdrop-blur-sm rounded-lg p-3 border border-border/30">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span className="text-sm text-foreground">{ex}</span>
                          </div>
                        ))}
                      </div>
                      {EXERCISE_ANIMATIONS[cat.id as ExerciseAnimationKey] && (() => {
                        const Anim = EXERCISE_ANIMATIONS[cat.id as ExerciseAnimationKey];
                        return (
                          <div>
                            <Anim />
                            <p className="text-[11px] text-muted-foreground text-center mt-1.5 italic">Animated demonstration</p>
                          </div>
                        );
                      })()}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border/30">
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-primary" />
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
                <p className="section-label text-primary mb-3">Research Findings</p>
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
              <EmojiCard emoji="🔥" title="Warm Up" description="Arthritis exercises: Joint-specific routines for knees, hands, hips, back. Low-impact, evidence-based programmes from an HCPC physiotherapist." />
              <EmojiCard emoji="💧" title="Stay Hydrated" description="Arthritis exercises: Joint-specific routines for knees, hands, hips, back. Low-impact, evidence-based programmes from an HCPC physiotherapist." />
              <EmojiCard emoji="⏱️" title="Pace Yourself" description="Arthritis exercises: Joint-specific routines for knees, hands, hips, back. Low-impact, evidence-based programmes from an HCPC physiotherapist." />
              <EmojiCard emoji="🧊" title="Ice After" description="Arthritis exercises: Joint-specific routines for knees, hands, hips, back. Low-impact, evidence-based programmes from an HCPC physiotherapist." />
              <EmojiCard emoji="📅" title="Be Consistent" description="Arthritis exercises: Joint-specific routines for knees, hands, hips, back. Low-impact, evidence-based programmes from an HCPC physiotherapist." />
              <EmojiCard emoji="🛑" title="Listen to Pain" description="Arthritis exercises: Joint-specific routines for knees, hands, hips, back. Low-impact, evidence-based programmes from an HCPC physiotherapist." />
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
                          Read more about {act.title}<span className="sr-only"> exercise guide</span> <ChevronRight className="w-3 h-3" aria-hidden="true" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Exercises by joint — internal-link matrix (de-orphans 48 sitemap URLs) */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <h2 className="text-3xl font-bold text-foreground mb-3">Exercises by Joint</h2>
            <p className="text-muted-foreground mb-10 max-w-2xl">
              Pick the exercise type, then the joint you want to focus on. Each guide covers benefits,
              step-by-step instructions, and safety tips.
            </p>

            <div className="space-y-8">
              {EXERCISE_MATRIX_TYPES.map((type) => (
                <div key={type.slug}>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                    {type.label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {EXERCISE_MATRIX_JOINTS.map((joint) => (
                      <Link
                        key={`${type.slug}-${joint.slug}`}
                        to={`/exercises/${type.slug}-for-${joint.slug}-arthritis`}
                        className="text-sm px-3 py-1.5 rounded-md border border-border/60 text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                      >
                        {type.label} for {joint.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ═══ Mid-page CTA: Help Chat ═══ */}
        <section className="py-12 lg:py-16 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-y border-primary/10">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-6 md:gap-10"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-bold text-foreground mb-1">Track how exercise affects your symptoms</h2>
                <p className="text-muted-foreground text-sm">Use our Self Help Tool to explore joint-specific exercises and get personalised guidance from our help chat.</p>
              </div>
              <Button asChild size="lg" className="min-h-[48px] font-semibold bg-primary hover:bg-primary text-primary-foreground shadow-md shrink-0">
                <Link to="/self-help">Self Help Tool <ArrowRight className="w-4 h-4 ml-2" /></Link>
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
                  <Link to="/chat">Start a Chat <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="min-h-[52px] text-base">
                  <Link to="/self-help">Interactive Joint Diagram</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <CrossLinkBanner preset="exercise" exclude="/exercises" title="Related resources" />
          <ContextualLinks
            heading="Build a complete arthritis-friendly routine"
            intro="The best results come from pairing safe movement with diet, flare-up planning and condition-specific care."
            groups={[
              {
                title: "Joint-by-joint exercise",
                links: [
                  { label: "Knee arthritis exercises", to: "/exercises" },
                  { label: "Hand and wrist arthritis exercises", to: "/exercises" },
                  { label: "Hip arthritis stretches", to: "/exercises" },
                  { label: "Tai Chi for balance", to: "/exercises/tai-chi-for-balance" },
                  { label: "Exercises to avoid with arthritis", to: "/guides/exercise" },
                ],
              },
              {
                title: "Conditions that benefit from movement",
                links: [
                  { label: "Osteoarthritis — exercise plan", to: "/conditions/osteoarthritis" },
                  { label: "Rheumatoid arthritis — staying active", to: "/conditions/rheumatoid-arthritis" },
                  { label: "Ankylosing spondylitis — daily stretches", to: "/conditions/ankylosing-spondylitis" },
                  { label: "Fibromyalgia — pacing and gentle exercise", to: "/conditions/fibromyalgia" },
                ],
              },
              {
                title: "Support your training",
                links: [
                  { label: "Anti-inflammatory diet", to: "/diet" },
                  { label: "Managing flare-ups during exercise", to: "/arthritis-flare-ups" },
                  { label: "Self-help joint tool", to: "/self-help" },
                  { label: "Physiotherapy for arthritis — pillar guide", to: "/guides/exercise" },
                ],
              },
            ]}
          />

          <section aria-labelledby="chair-exercise-seniors" className="mt-16 border-t border-border pt-12">
            <h2 id="chair-exercise-seniors" className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              Chair-based movement for older adults
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                As the UK population ages, maintaining mobility and independence becomes a paramount concern for older adults and the people supporting them. Exercise is often called the closest thing we have to a “magic pill” for healthy ageing — but for many people living with arthritis, traditional high-impact workouts are not realistic because of joint degeneration, balance issues or chronic pain. This is where low-impact movement, and chair exercises in particular, become genuinely useful. Short, accessible routines — often as little as ten minutes a day — meet people where they are and remove the intimidation of a long gym session.
              </p>
              <p>
                Chair exercises address several of the physiological changes that come with ageing. First, they reduce the risk of falls and injury by giving people a stable base while they work. By staying seated, you can focus on the muscular action without the cognitive load of worrying about balance. Second, they are good for the heart. You do not need to run a marathon to elevate your heart rate. Arm circles, seated marching, torso twists and gentle boxing motions, performed in sequence, raise circulation, help manage blood pressure and support long-term cardiovascular health.
              </p>
              <p>
                The benefits extend well beyond the physical. Regular activity releases endorphins, the body’s natural mood lifters, which can help offset the isolation, anxiety or low mood that sometimes accompany later life. Light resistance work using small hand weights or resistance bands during a chair workout pushes back against sarcopenia — the age-related loss of muscle mass. Preserved muscle strength is what allows older adults to keep doing the Activities of Daily Living (ADLs) that protect autonomy: cooking, washing, dressing, getting on and off the toilet, and managing stairs.
              </p>
              <p>
                For people living specifically with arthritis, gentle movement keeps the joints lubricated and the surrounding tissues flexible, which reduces the morning stiffness that often triggers further inactivity and pain. The key is consistency rather than intensity. A short daily routine is far more useful than a punishing weekly session that leaves you sore for days. Build the habit first, then add reps, light resistance or a few extra minutes as you adapt. Proper form matters more than effort — slow, controlled movement is what protects joints and tendons.
              </p>
              <p className="text-sm italic">
                This is general information, not medical advice. Speak to a GP, physiotherapist or rheumatologist before starting any new exercise programme, especially if you have heart, balance or joint conditions.
              </p>
            </div>
          </section>
        </div>
      </main>


      <InternalLinks />
      <NextReadStrip currentPath="/guides/exercise" />
      <Footer />
    </>
  );
};

export default ExerciseHub;
