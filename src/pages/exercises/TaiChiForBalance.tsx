import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Clock, Activity, Heart, Shield, Sparkles, ArrowRight, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import PageHero from "@/components/ui/PageHero";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import PageSchema from "@/components/seo/PageSchema";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { blogTaiChi } from "@/data/images";
import { TAI_CHI_ANIMATIONS, TAI_CHI_VIDEOS } from "@/components/exercises/TaiChiAnimations";
import ExerciseVideoModal from "@/components/exercises/ExerciseVideoModal";
import { Play } from "lucide-react";

type AnimKey = keyof typeof TAI_CHI_ANIMATIONS;

const heroImage = "/openverse/wellness-02-tai-chi-young-and-old.webp";

const benefits = [
  { icon: Shield, title: "Reduces fall risk", text: "A 2017 Cochrane review found tai chi cuts the rate of falls in older adults by approximately 20% — one of the strongest non-medical fall-prevention interventions." },
  { icon: Activity, title: "Eases knee & hip pain", text: "A 2019 BMJ meta-analysis showed tai chi is as effective as standard physiotherapy for knee osteoarthritis, with sustained pain reduction at 12 months." },
  { icon: Heart, title: "Lowers stress & inflammation", text: "Slow breathing reduces cortisol and improves heart-rate variability, which is associated with lower systemic inflammation." },
  { icon: Sparkles, title: "Improves balance confidence", text: "Weight-shifting drills retrain proprioception. Most people report feeling steadier within 6–8 weeks of twice-weekly practice." },
];

const moves: { name: string; duration: string; how: string; why: string; cue: string; anim: AnimKey }[] = [
  {
    name: "Standing rooted (Wuji stance)",
    duration: "2 min",
    how: "Stand with feet hip-width apart, knees soft (never locked). Imagine a thread lifting the crown of your head. Let arms hang. Breathe slowly through the nose for 8 cycles.",
    why: "Builds the postural alignment every other movement depends on.",
    cue: "Crown lifts, knees soft, breath slow through the nose.",
    anim: "rooted-stance",
  },
  {
    name: "Weight shift (Empty & Full)",
    duration: "3 min",
    how: "From rooted stance, slowly transfer 90% of your weight to the right leg, then to the left. Keep knees tracking over toes. Repeat 10 times each side.",
    why: "Trains single-leg balance — the foundation of fall prevention.",
    cue: "90% onto one leg, then the other. Knees over toes.",
    anim: "weight-shift",
  },
  {
    name: "Cloud hands (modified)",
    duration: "3 min",
    how: "With weight on the right leg, sweep the left hand across your body at chest height as if wiping a window. Shift weight as the hand crosses. Alternate sides for 8 reps.",
    why: "Coordinates upper and lower body, gentle on knees and shoulders.",
    cue: "Hand wipes the window; weight shifts as it crosses.",
    anim: "cloud-hands",
  },
  {
    name: "Brush knee (seated option)",
    duration: "3 min",
    how: "If standing is uncomfortable, sit forward on a sturdy chair. Push one palm forward at chest height while the other 'brushes' across the thigh. Alternate arms slowly.",
    why: "Keeps the practice accessible during flares without losing the flowing rhythm.",
    cue: "One palm pushes forward; the other brushes the thigh.",
    anim: "brush-knee",
  },
  {
    name: "Closing posture",
    duration: "2 min",
    how: "Return to rooted stance. Lower hands slowly to your sides, palms turned down as if pressing the air. Take 6 long exhales.",
    why: "Settles the nervous system — research links this 'down-regulation' to reduced pain perception.",
    cue: "Press the air down with the palms. Six long exhales.",
    anim: "closing-posture",
  },
];

const evidence = [
  { source: "BMJ Open Sport & Exercise Medicine, 2019", finding: "Tai chi matched physiotherapy for knee OA pain and function at 12 weeks and 12 months." },
  { source: "Cochrane Database of Systematic Reviews, 2017", finding: "Pooled data from 7,494 participants showed a 20% reduction in fall rate among community-dwelling older adults." },
  { source: "Arthritis & Rheumatology, 2018", finding: "12 weeks of tai chi produced clinically meaningful improvements in WOMAC pain scores for hip and knee OA." },
  { source: "British Journal of Sports Medicine, 2021", finding: "Mind-body practices including tai chi were associated with improved sleep quality and reduced fatigue in inflammatory arthritis." },
];

const faqs = [
  { q: "Is tai chi safe if I have severe arthritis?", a: "Yes — tai chi is one of the few exercise forms specifically recommended by NICE guidelines for osteoarthritis. Begin with seated or supported variations during flares and progress to standing as comfort allows. Stop any movement that causes sharp pain." },
  { q: "How often should I practise?", a: "Evidence suggests 2–3 sessions of 20–40 minutes per week for at least 8 weeks before judging benefit. Daily 10-minute mini-sessions also work and may be easier to sustain." },
  { q: "Do I need a class or can I learn at home?", a: "Both are effective. A qualified instructor reduces the learning curve and corrects posture. If you practise alone, follow guided videos from established schools (Tai Chi for Health Institute, Tai Chi Union for Great Britain) and start with the simplified Sun-style — it has the smallest, smoothest steps." },
  { q: "What should I wear?", a: "Loose, breathable clothing and flat, flexible shoes (or socks indoors on a non-slip surface). Avoid trainers with thick cushioning, which reduces foot feedback needed for balance training." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ExercisePlan",
  name: "Tai Chi for Balance — Arthritis-Friendly Routine",
  description: "Evidence-based 15-minute tai chi routine for adults with arthritis, designed to reduce pain, improve balance and lower fall risk.",
  exerciseType: "Tai Chi",
  intensity: "Low",
  exerciseCourse: { "@type": "CourseInstance", courseMode: "Self-paced" },
  publisher: { "@type": "Organization", name: "Living With Arthritis UK" },
  audience: { "@type": "PeopleAudience", suggestedMinAge: 18, healthCondition: { "@type": "MedicalCondition", name: "Arthritis" } },
};

export default function TaiChiForBalance() {
  useEffect(() => {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.text = JSON.stringify(jsonLd);
    document.head.appendChild(s);
    return () => { document.head.removeChild(s); };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Tai Chi for Balance (Arthritis)"
        description="An evidence-based tai chi routine for arthritis. Reduce pain, improve balance and lower fall risk in 15 minutes a day. NICE-recommended, beginner-friendly."
        path="/exercises/tai-chi-for-balance"
        type="article"
        keywords="tai chi arthritis, tai chi for balance, fall prevention exercise, knee osteoarthritis exercise, gentle exercise older adults UK"
      />
      <PageSchema
        url="/exercises/tai-chi-for-balance"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Exercises", item: "/exercises" },
          { name: "Tai Chi for Arthritis", item: "/exercises/tai-chi-for-arthritis" },
          { name: "Tai Chi for Balance" },
        ]}
        faqs={faqs.map((f) => ({ question: f.q, answer: f.a }))}
        howTo={{
          name: "15-minute Tai Chi for Balance Routine",
          totalTime: "PT15M",
          steps: moves.map((m) => ({ name: m.name, text: m.how })),
        }}
        idPrefix="tai-chi-balance"
      />
      <Header />

      <PageBreadcrumb segments={[
        { label: "Exercises", href: "/exercises" },
        { label: "Tai Chi for Arthritis", href: "/exercises/tai-chi-for-arthritis" },
        { label: "Tai Chi for Balance" },
      ]} />

      <PageHero
        badge={<Badge variant="secondary" className="bg-primary/10 text-primary border-0">Evidence-based · NICE-recommended</Badge>}
        title="Tai Chi for Balance"
        subtitle="A 15-minute, low-impact routine to ease joint pain, steady your balance and rebuild confidence on your feet — supported by Cochrane and BMJ evidence."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg"><a href="#routine">Start the routine <ArrowRight className="ml-2 h-4 w-4" /></a></Button>
          <Button asChild variant="outline" size="lg"><Link to="/exercises/tai-chi-for-beginners">Brand new? 7-day beginner plan</Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/exercises">Browse all exercises</Link></Button>
        </div>
      </PageHero>

      {/* Hero image */}
      <section className="bg-secondary/30 border-b border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px] py-10">
          <figure className="rounded-xl overflow-hidden shadow-lg">
            <img src={heroImage} alt="Older and younger person practising tai chi together outdoors" className="w-full h-auto object-cover" loading="eager" decoding="async" />
          </figure>
        </div>
      </section>

      {/* Why it works */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">Why tai chi, for arthritis?</h2>
            <p className="text-muted-foreground leading-relaxed">Tai chi is a 700-year-old practice of slow, weight-shifted movement. For people with arthritis, four mechanisms make it unusually effective.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((b) => (
              <Card key={b.title} className="p-6 border border-border/40 hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3 shrink-0"><b.icon className="h-6 w-6 text-primary" /></div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-2">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The routine */}
      <section id="routine" className="py-16 lg:py-24 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-0">15 minutes · 5 movements</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">The beginner routine</h2>
            <p className="text-muted-foreground leading-relaxed">Move through these in order. Each posture has an animated demonstration on the right — follow the figure at your own pace. Breathe slowly through the nose throughout.</p>
          </div>

          <ol className="space-y-5">
            {moves.map((m, i) => {
              const Anim = TAI_CHI_ANIMATIONS[m.anim];
              const video = TAI_CHI_VIDEOS[m.anim];
              return (
                <li key={m.name}>
                  <Card className="p-6 md:p-8 border border-border/40">
                    <div className="grid md:grid-cols-[auto_1fr_280px] gap-6 md:gap-8 items-start">
                      <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2 md:w-20 shrink-0">
                        <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-lg font-bold">{i + 1}</div>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground"><Clock className="h-4 w-4" />{m.duration}</div>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display text-xl md:text-2xl font-semibold mb-3">{m.name}</h3>
                        <p className="text-foreground/90 leading-relaxed mb-3"><span className="font-medium text-foreground">How:</span> {m.how}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed"><span className="font-medium text-foreground">Why it helps:</span> {m.why}</p>
                      </div>
                      <div className="md:sticky md:top-4">
                        <ExerciseVideoModal src={video.src} title={`${i + 1}. ${m.name}`} description={m.how}>
                          <button
                            type="button"
                            aria-label={`Play ${m.name}`}
                            className="group relative block w-full rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            <Anim />
                            <span className="absolute inset-0 flex items-center justify-center bg-primary/0 group-hover:bg-primary/40 group-focus-visible:bg-primary/40 transition-colors">
                              <span className="h-14 w-14 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                                <Play className="h-6 w-6 text-primary fill-primary ml-0.5" />
                              </span>
                            </span>
                          </button>
                        </ExerciseVideoModal>
                        <p className="mt-2 text-xs italic leading-snug text-foreground/80 bg-muted/40 border border-border/40 rounded-lg px-3 py-2 flex items-start gap-2" title="Tap the video to watch full size · loops while you follow along">
                          <Sparkles className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{m.cue}</span>
                        </p>
                      </div>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ol>

          <Card className="mt-8 p-6 border-l-4 border-l-primary bg-primary/5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">When to stop</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Stop if you feel sharp joint pain, dizziness, or chest discomfort. Mild muscle fatigue the next day is normal; sharp pain is not. If symptoms persist beyond 24 hours, scale back the range of motion or consult your GP or physiotherapist.</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Evidence */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">The evidence base</h2>
            <p className="text-muted-foreground leading-relaxed">Tai chi is one of the most-studied complementary movement therapies. A summary of the strongest UK and international research:</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {evidence.map((e) => (
              <Card key={e.source} className="p-6 border border-border/40">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">{e.source}</p>
                    <p className="text-sm text-foreground/90 leading-relaxed">{e.finding}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 8-week plan */}
      <section className="py-16 lg:py-24 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-3">An 8-week build-up</h2>
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-2xl">A realistic ramp from "never tried it" to a sustainable habit. Adjust to how you feel — progress is not linear with arthritis.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { weeks: "Weeks 1–2", focus: "Learn rooted stance and weight shift. 10 minutes, 3×/week." },
              { weeks: "Weeks 3–4", focus: "Add cloud hands and brush knee. Extend to 15 minutes." },
              { weeks: "Weeks 5–6", focus: "Practise the full routine. Try once unsupported by a chair." },
              { weeks: "Weeks 7–8", focus: "Aim for 20 minutes, 4×/week. Notice changes in balance and sleep." },
            ].map((p) => (
              <Card key={p.weeks} className="p-6 border border-border/40">
                <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">{p.weeks}</p>
                <p className="text-sm text-foreground/90 leading-relaxed">{p.focus}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-10">Common questions</h2>
          <div className="space-y-5 max-w-3xl">
            {faqs.map((f) => (
              <Card key={f.q} className="p-6 border border-border/40">
                <h3 className="font-display text-lg font-semibold mb-2">{f.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px] text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">Build a routine that fits your joints</h2>
          <p className="text-primary-foreground/85 max-w-2xl mx-auto mb-8 leading-relaxed">Combine tai chi with our other arthritis-friendly programmes — strength, mobility, and anti-inflammatory eating.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" variant="secondary"><Link to="/exercises">All exercises</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"><Link to="/diet">Anti-inflammatory diet</Link></Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
