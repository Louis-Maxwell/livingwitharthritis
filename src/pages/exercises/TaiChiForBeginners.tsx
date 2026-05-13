import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Sparkles, Clock, AlertCircle, PlayCircle, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import PageHero from "@/components/ui/PageHero";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TAI_CHI_ANIMATIONS, TAI_CHI_VIDEOS } from "@/components/exercises/TaiChiAnimations";
import ExerciseVideoModal from "@/components/exercises/ExerciseVideoModal";
import { Play } from "lucide-react";

const heroImage = "/openverse/wellness-02-tai-chi-young-and-old.jpg";

const primer = [
  { title: "What it is", text: "A 700-year-old Chinese movement practice. Slow, continuous, weight-shifted — closer to a moving meditation than a martial art." },
  { title: "What it isn't", text: "Not karate, not high-impact, not 'too gentle to do anything'. Trials show it matches physiotherapy for knee OA pain." },
  { title: "Why beginners pick it", text: "Free to start, no equipment, low injury risk, works at any age, and unusually effective for stiff joints, balance and stress." },
];

const equipment = [
  "Flat shoes, trainers or thick socks (avoid bare feet on hard floors)",
  "About 2 metres of clear floor space",
  "Loose, comfortable clothing — no need for activewear",
  "A glass of water",
  "Optional: a sturdy chair within reach for balance support",
];

const days: { day: number; title: string; mins: string; what: string; anim?: keyof typeof TAI_CHI_ANIMATIONS }[] = [
  { day: 1, title: "Stand and breathe (Wuji)", mins: "5 min", what: "Learn the starting posture every form returns to. Feet hip-width, knees soft, crown lifted, 8 slow nasal breaths.", anim: "rooted-stance" },
  { day: 2, title: "Add the weight shift", mins: "7 min", what: "Slowly transfer your body weight side-to-side without lifting the feet. The engine of every tai chi movement.", anim: "weight-shift" },
  { day: 3, title: "Cloud Hands", mins: "8 min", what: "Continuous waist-led arm circles. Mobilises shoulders and gently rotates the spine.", anim: "cloud-hands" },
  { day: 4, title: "Brush Knee", mins: "10 min", what: "Step forward, brush past the knee with one hand, push gently with the other. Coordination plus mobility.", anim: "brush-knee" },
  { day: 5, title: "Closing Posture", mins: "8 min", what: "The grounding sequence that ends every set — settles breath and joint warmth.", anim: "closing-posture" },
  { day: 6, title: "Rest or repeat your favourite", mins: "5–10 min", what: "Active rest is part of the practice. Repeat the day you enjoyed most, or simply do Day 1 + Day 2 again." },
  { day: 7, title: "String it together", mins: "12 min", what: "Wuji → weight shift → Cloud Hands → Brush Knee → Closing. Slow, continuous, no pauses. Your first mini-form." },
];

const mistakes = [
  { title: "Locking the knees", text: "Always keep a soft micro-bend. Locked knees jar the joint and block the weight shift." },
  { title: "Holding your breath", text: "Breathe in and out through the nose, slowly and continuously. If you can't, you're moving too fast." },
  { title: "Rushing", text: "Tai chi is meant to feel almost too slow at first. The benefit is in the slowness." },
  { title: "Looking down at your feet", text: "Eyes on the horizon. Looking down compresses the neck and worsens balance." },
  { title: "Practising on thick carpet", text: "It muffles the foot feedback that builds balance. A hard floor or short pile is best." },
];

const nextSteps = [
  { title: "I have arthritis", desc: "Get the UK guide built around NICE-recommended adaptations for knee, hip, hand and back.", to: "/exercises/tai-chi-for-arthritis", cta: "See the arthritis guide" },
  { title: "I want a 15-minute routine", desc: "Step into the standing routine designed for balance and fall prevention.", to: "/exercises/tai-chi-for-balance", cta: "Open the routine" },
  { title: "I can't stand for long", desc: "The seated, chair-based version of every movement on this page.", to: "/exercises/seated-tai-chi-for-arthritis", cta: "Try seated tai chi" },
];

const faqs = [
  { q: "How long until I see benefits from tai chi?", a: "Most people notice calmer breathing and better sleep within a week. Stiffness and balance gains typically appear at 4–8 weeks of practising 3 times a week. Pain reduction in knee or hip OA is best supported in trials at the 12-week mark." },
  { q: "How often should a beginner practise tai chi?", a: "Three short sessions a week (10–15 minutes each) is the sweet spot for beginners. Daily 5-minute sessions also work and may be easier to make a habit. More than that risks early-stage soreness — build slowly." },
  { q: "Can I learn tai chi at home alone, or do I need a class?", a: "Both work. A free at-home start (like this 7-day plan) is enough to learn the principles and decide whether tai chi suits you. Most people who continue eventually join a class to refine posture — the Tai Chi Union for Great Britain has a UK instructor directory." },
  { q: "What age is too old to start tai chi?", a: "There is no upper age limit. Tai chi was developed for older bodies and the largest fall-prevention trials are in adults aged 65–90. If you can stand for 2 minutes with light support, you can start." },
  { q: "Do I need to be fit to start tai chi?", a: "No. Tai chi is one of the few practices designed for people who can't yet exercise. If standing is painful, start with our seated tai chi routine and progress from there." },
  { q: "Are free YouTube tai chi classes as good as paid ones?", a: "For the first 2–3 months, yes — free videos from the Tai Chi for Health Institute and reputable UK instructors are excellent. A paid class becomes worthwhile once you want personalised correction on posture and weight transfer." },
  { q: "What style of tai chi is best for beginners?", a: "Sun-style or Yang-style short forms. Sun-style (the basis of the 'Tai Chi for Arthritis' programme used in NICE-aligned trials) has higher stances and gentler footwork — usually the easiest entry point." },
  { q: "Do I need an instructor to learn tai chi safely?", a: "Not to start. The risks of self-taught tai chi at home are very low (mild soreness, occasional misaligned posture). For deeper progress past the first 2–3 months, an instructor speeds up learning significantly." },
];

const SITE = "https://livingwitharthritis.org.uk";

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Tai Chi for Beginners — Your First 7 Days",
  description: "A free 7-day at-home introduction to tai chi for UK beginners. Gentle on arthritic joints, ~10 minutes per day, no equipment.",
  provider: { "@type": "Organization", name: "Living With Arthritis UK", sameAs: SITE },
  educationalLevel: "Beginner",
  inLanguage: "en-GB",
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Self-paced online",
    courseWorkload: "PT70M",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function TaiChiForBeginners() {
  useEffect(() => {
    const a = document.createElement("script");
    a.type = "application/ld+json";
    a.text = JSON.stringify(courseJsonLd);
    const b = document.createElement("script");
    b.type = "application/ld+json";
    b.text = JSON.stringify(faqJsonLd);
    document.head.appendChild(a);
    document.head.appendChild(b);
    return () => {
      document.head.removeChild(a);
      document.head.removeChild(b);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Tai Chi for Beginners (UK): Your First 7 Days"
        description="A free 7-day UK guide to learning tai chi at home. Gentle on arthritic joints, no equipment, ~10 minutes a day. Start Day 1 today."
        path="/exercises/tai-chi-for-beginners"
        type="article"
        keywords="tai chi for beginners, tai chi at home UK, free tai chi for beginners, beginner tai chi arthritis, learn tai chi UK"
      />
      <Header />

      <PageBreadcrumb segments={[
        { label: "Exercises", href: "/exercises" },
        { label: "Tai Chi for Arthritis", href: "/exercises/tai-chi-for-arthritis" },
        { label: "Tai Chi for Beginners" },
      ]} />

      <PageHero
        badge={<Badge variant="secondary" className="bg-primary/10 text-primary border-0">Beginner · 7-day plan · Free</Badge>}
        title="Tai Chi for Beginners: Your First 7 Days"
        subtitle="A gentle, evidence-aligned at-home start. No equipment, ~10 minutes a day, and especially kind to stiff or arthritic joints. Begin today."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg"><a href="#day-1">Start Day 1 <ArrowRight className="ml-2 h-4 w-4" /></a></Button>
          <Button asChild variant="outline" size="lg"><Link to="/exercises/tai-chi-for-arthritis">Got arthritis? See the arthritis guide</Link></Button>
        </div>
      </PageHero>

      {/* Hero image */}
      <section className="bg-secondary/30 border-b border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px] py-10">
          <figure className="rounded-xl overflow-hidden shadow-lg">
            <img src={heroImage} alt="Beginner practising tai chi outdoors with an experienced partner" className="w-full h-auto object-cover" loading="eager" decoding="async" width={1600} height={900} />
          </figure>
        </div>
      </section>

      {/* What is tai chi */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">What tai chi actually is</h2>
            <p className="text-muted-foreground leading-relaxed">Three things to know before Day 1.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {primer.map((p) => (
              <Card key={p.title} className="p-6 border border-border/40">
                <h3 className="font-display text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What you need */}
      <section className="py-16 lg:py-24 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-0">Zero equipment</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">What you need to start</h2>
            <p className="text-muted-foreground leading-relaxed">Truly nothing to buy. If you have a hallway and trainers, you have a tai chi studio.</p>
          </div>
          <ul className="space-y-3">
            {equipment.map((item) => (
              <li key={item} className="flex items-start gap-3 bg-background rounded-lg border border-border/40 p-4">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7-day plan */}
      <section id="day-1" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-0"><Clock className="h-3 w-3 mr-1 inline" />Your first week</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">The 7-day plan</h2>
            <p className="text-muted-foreground leading-relaxed">One movement at a time. By Day 7, you'll string them into your first mini-form.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {days.map((d) => {
              const Anim = d.anim ? TAI_CHI_ANIMATIONS[d.anim] : null;
              const video = d.anim ? TAI_CHI_VIDEOS[d.anim] : null;
              const thumb = Anim ? (
                <div className="aspect-video bg-muted/40 overflow-hidden">
                  <Anim className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <Sparkles className="h-12 w-12 text-primary/60" />
                </div>
              );
              return (
                <Card key={d.day} className="overflow-hidden border border-border/40 flex flex-col">
                  {Anim && video ? (
                    <ExerciseVideoModal src={video.src} title={`Day ${d.day}: ${d.title}`} description={d.what}>
                      <button
                        type="button"
                        aria-label={`Play Day ${d.day}: ${d.title}`}
                        className="group relative block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {thumb}
                        <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 group-focus-visible:bg-black/40 transition-colors">
                          <span className="h-14 w-14 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                            <Play className="h-6 w-6 text-primary fill-primary ml-0.5" />
                          </span>
                        </span>
                      </button>
                    </ExerciseVideoModal>
                  ) : (
                    thumb
                  )}
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-0">Day {d.day}</Badge>
                      <span className="text-xs text-muted-foreground font-medium">{d.mins}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold leading-snug flex items-start gap-2">
                      <PlayCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      {d.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{d.what}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Common mistakes */}
      <section className="py-16 lg:py-24 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-0"><AlertCircle className="h-3 w-3 mr-1 inline" />Avoid these</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">5 common beginner mistakes</h2>
            <p className="text-muted-foreground leading-relaxed">Sidestep these and you'll progress twice as fast.</p>
          </div>
          <div className="space-y-3">
            {mistakes.map((m) => (
              <Card key={m.title} className="p-5 bg-background border border-border/40">
                <h3 className="font-display text-base font-semibold mb-1">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Where next */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-0">After Day 7</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">Where to go next</h2>
            <p className="text-muted-foreground leading-relaxed">Pick the path that fits your body and your week.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {nextSteps.map((n) => (
              <Link key={n.to} to={n.to} className="group">
                <Card className="p-6 h-full border border-border/40 group-hover:border-primary/40 group-hover:shadow-md transition-all flex flex-col">
                  <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{n.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{n.desc}</p>
                  <span className="inline-flex items-center text-primary font-semibold text-sm">{n.cta} <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" /></span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8">Tai Chi for Beginners: FAQs</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group bg-background rounded-lg border border-border/40 p-5">
                <summary className="cursor-pointer flex items-center justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold m-0">{f.q}</h3>
                  <ArrowRight className="h-4 w-4 shrink-0 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
