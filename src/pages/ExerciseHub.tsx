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
  ChevronRight, Sparkles, Shield, TrendingUp, Users, Timer, Target
} from "lucide-react";
import ExerciseProgressTracker from "@/components/ExerciseProgressTracker";
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

const exerciseCategories = [
  {
    id: "knee",
    title: "Knee Exercises",
    subtitle: "UK Physiotherapy Guide",
    description: "Strengthen the muscles around your knees to reduce pain and improve stability. These NHS-aligned exercises target quadriceps, hamstrings and calves for better knee support.",
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
    description: "Improve hand function, reduce stiffness and maintain grip strength with gentle exercises recommended by UK occupational therapists. Ideal for osteoarthritis and rheumatoid arthritis.",
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
    description: "Restore range of motion and reduce shoulder stiffness with physiotherapy-approved stretches and strengthening exercises. Suitable for frozen shoulder and shoulder OA.",
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
    description: "Safe, effective seated exercises for people with limited mobility or during flare-ups. Approved by UK physiotherapists for arthritis management at any fitness level.",
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
        <link rel="canonical" href="https://livingwitharthritis.org.uk/exercises" />
        <meta property="og:title" content="Best Exercises for Arthritis UK – Complete Guide" />
        <meta property="og:description" content="Evidence-based arthritis exercises for every joint. Physiotherapy routines, swimming, yoga and more." />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/exercises" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header />

      <PageHero
        badge={<Badge variant="outline" className="bg-primary/5 text-primary border-primary/20"><Dumbbell className="w-3.5 h-3.5 mr-1.5" /> Exercise Hub</Badge>}
        title={<>Best Exercises for <span className="text-primary">Arthritis</span> UK</>}
        subtitle="Evidence-based exercise programmes for knee, hand, shoulder and whole-body arthritis relief. NHS-aligned physiotherapy routines you can do at home."
      >
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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

        {/* Exercise categories */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl space-y-16">
            {exerciseCategories.map((cat, i) => (
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
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl ${cat.iconColor} flex items-center justify-center shrink-0`}>
                        <cat.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">{cat.title}</h2>
                        <p className="text-sm text-muted-foreground font-medium">{cat.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-6">{cat.description}</p>

                    <div className="grid sm:grid-cols-2 gap-3 mb-6">
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
                      <Button asChild variant="outline" size="sm" className="shrink-0 min-h-[44px]">
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
                <h2 className="text-2xl font-bold text-foreground mb-4">Exercise Effectiveness by Type</h2>
                <p className="text-sm text-muted-foreground mb-6">Percentage of patients reporting symptom improvement after 12 weeks of consistent exercise.</p>
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
            <p className="text-muted-foreground mb-10 max-w-2xl">Low-impact activities that complement your exercise routine and support joint health.</p>

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

        {/* ─── Weekly Plan Timeline ─── */}
        <section className="py-12 lg:py-16 bg-tint-peach">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-2">Sample Weekly Plan</h2>
            <p className="text-sm text-muted-foreground mb-8">A balanced week of arthritis-friendly exercise.</p>
            <Timeline items={[
              { title: "Monday — Knee Strengthening", description: "20 min quad & hamstring routine. Straight leg raises, wall sits." },
              { title: "Tuesday — Walking", description: "30 min brisk walk with supportive footwear." },
              { title: "Wednesday — Hand Exercises", description: "15 min grip & flexibility. Finger bends, putty squeezes." },
              { title: "Thursday — Swimming", description: "30 min pool session or aqua aerobics class." },
              { title: "Friday — Yoga / Tai Chi", description: "20 min gentle flexibility and balance work." },
              { title: "Saturday — Chair Exercises", description: "15 min seated routine. Great on lower-energy days." },
              { title: "Sunday — Rest & Stretch", description: "Gentle 10 min full-body stretching only." },
            ]} />
          </div>
        </section>

        <WaveDivider color="hsl(var(--background))" />

        {/* Progress Tracker */}
        <ExerciseProgressTracker />

        {/* CTA */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Need Personalised Exercise Advice?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Our AI Health Assistant can recommend exercises based on your specific joints and symptoms. It's free, instant and evidence-based.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="min-h-[44px]">
                <Link to="/chat">Talk to Our AI Assistant <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-h-[44px]">
                <Link to="/self-help">Interactive Joint Diagram</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ExerciseHub;
