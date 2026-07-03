import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Zap,
  Droplet,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import PageBreadcrumb from '@/components/ui/PageBreadcrumb';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AnswerBox from '@/components/seo/AnswerBox';
import MedicalReviewBadge from '@/components/MedicalReviewBadge';

const SITE = 'https://livingwitharthritis.org.uk';
const PATH = '/blog/knee-osteoarthritis-exercises';

const heroImage =
  'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?auto=format&fit=crop&w=1600&q=80';

const tier1Exercises = [
  {
    title: 'Quadriceps Strengthening (Straight-Leg Raises)',
    description:
      'Sitting in a chair, straighten one leg out in front of you. Hold for 2–3 seconds. Lower slowly without touching the ground. Repeat 10–15 times, 2–3 times daily.',
    why: 'Strong quads reduce stress on the knee joint by 20–40%. This is the single best home exercise for knee OA.',
    difficulty: 'Beginner',
  },
  {
    title: 'Swimming or Water Aerobics',
    description:
      '30 minutes at a comfortable pace, 2–3 times weekly. Any stroke works — front crawl, breast stroke, or just walking in the pool.',
    why: 'Buoyancy reduces joint stress by 80%. Resistance builds strength without pain. Often eases pain within 1–2 sessions.',
    difficulty: 'Beginner to intermediate',
  },
  {
    title: 'Walking (Modified)',
    description:
      'Flat surfaces, 20–30 minutes at a comfortable pace, most days of the week. Avoid hills and stairs initially.',
    why: 'Maintains cardiovascular health, mobility and muscle engagement. Low-impact nature minimises joint strain.',
    difficulty: 'Beginner',
  },
];

const tier2Exercises = [
  {
    title: 'Hamstring Curls',
    description: 'Lying on your back, bend one knee, then straighten. Repeat 12–15 times.',
    why: 'Strengthens the hamstring, which supports the back of the knee.',
  },
  {
    title: 'Calf Raises',
    description: 'Standing, slowly rise up onto your toes, then lower. Repeat 15–20 times.',
    why: 'Improves calf strength and ankle mobility.',
  },
  {
    title: 'Step-Ups (Low Step)',
    description:
      'Using a low step (2–4 inches), step up slowly with one leg, then down. Repeat 10–12 times per side.',
    why: 'Builds functional leg strength needed for stairs and daily activity.',
  },
  {
    title: 'Wall Squats',
    description:
      'Back against a wall, slide down until your knees are at a 90-degree angle. Hold 5–10 seconds, then slide back up.',
    why: 'Strengthens quads and glutes in a controlled, joint-friendly way.',
  },
];

const avoidExercises = [
  'High-impact running or jogging',
  'Deep squats or full lunges',
  'Heavy leg presses',
  'Jumping movements (plyometrics)',
  'Kneeling on a hard floor for extended periods',
];

const faqs = [
  {
    q: 'How often should I exercise with knee arthritis?',
    a: 'Aim for 3–4 exercise sessions per week, with at least one rest day between sessions. Consistency is more important than duration. Start with 10–15 minute sessions and build gradually.',
  },
  {
    q: 'Should knee arthritis pain stop me from exercising?',
    a: 'Mild discomfort during or shortly after exercise is normal and expected. Sharp, severe pain is a sign to stop immediately. Pain that persists for hours after exercise suggests you have overdone it. Work with a physiotherapist to find the right intensity.',
  },
  {
    q: 'How long before I notice improvement?',
    a: 'Pain often begins to ease within 2–4 weeks of consistent exercise. Significant improvement typically takes 8–12 weeks. Some people notice relief within days if they also improve their diet and reduce weight.',
  },
  {
    q: 'Can I exercise if my knee is swollen?',
    a: 'Mild swelling is okay to exercise through, though ice after and elevation help. If the swelling is significant or hot to the touch, rest for 1–2 days and consult your GP. Once the acute swelling settles, resume gentle exercise.',
  },
  {
    q: 'What if I do not have access to a swimming pool?',
    a: 'Walking, stationary cycling, and recumbent bikes are excellent low-impact alternatives. Even chair-based leg exercises provide meaningful benefit if done consistently.',
  },
  {
    q: 'Should I wear a knee brace while exercising?',
    a: 'A brace can provide confidence and reduce pain during exercise for some people, but do not rely on it long-term — your muscles need to do the work. Use a brace to build confidence initially, then gradually reduce reliance as strength improves.',
  },
];

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Knee Osteoarthritis Exercises: A Complete UK Guide',
  description:
    'Evidence-based exercises for knee osteoarthritis pain relief. Low-impact, home-friendly routines reviewed by an HCPC physiotherapist.',
  inLanguage: 'en-GB',
  image: heroImage,
  datePublished: '2026-06-21',
  dateModified: '2026-06-21',
  author: {
    '@type': 'Person',
    name: 'Maxwell',
    jobTitle: 'First Contact Practitioner — Chartered Physiotherapist',
    identifier: 'HCPC PH128483',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Living With Arthritis UK',
    url: SITE,
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Do Quadriceps Strengthening for Knee Arthritis',
  description: 'Step-by-step guide to the most effective home exercise for knee OA.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Sit in a sturdy chair',
      text: 'Sit in a firm chair with your back against the backrest.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Straighten one leg',
      text: 'Straighten one leg out in front of you, extending at the knee.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Hold briefly',
      text: 'Hold the leg straight for 2–3 seconds, tightening the thigh muscle.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Lower slowly',
      text: 'Lower the leg slowly without letting it touch the ground. Repeat 10–15 times.',
    },
  ],
};

export default function KneeOsteoarthritisExercises() {
  useEffect(() => {
    const scripts = [articleJsonLd, faqJsonLd, howToJsonLd].map((data) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.text = JSON.stringify(data);
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => document.head.removeChild(s));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Knee Osteoarthritis Exercises"
        description="Knee osteoarthritis exercises: Low-impact routines to reduce pain & improve mobility. Tier 1 & 2 exercises with video guides included."
        path={PATH}
        type="article"
        keywords="knee osteoarthritis exercises, knee arthritis pain relief, knee OA exercises at home, exercises for knee pain, strengthening exercises knee"
      />
      <Header />

      <PageBreadcrumb
        segments={[
          { label: 'Blog', href: '/blog' },
          { label: 'Knee Osteoarthritis Exercises' },
        ]}
      />

      {/* Hero */}
      <section className="bg-secondary/30 border-b border-border/15 py-12">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <div className="mb-6">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
              Exercise · Knee OA · Evidence-based
            </Badge>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Knee Osteoarthritis Exercises
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Low-impact, evidence-based exercises to reduce knee pain and improve mobility. Reviewed by an HCPC physiotherapist.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href="#tier1">See best exercises <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/diet/foods-to-avoid-with-arthritis">Diet guide for knee pain</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Answer box */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <AnswerBox
            question="What are the best exercises for knee arthritis?"
            reviewed="2026-06-21"
          >
            Knee osteoarthritis (OA) is wear-and-tear damage to knee cartilage that causes pain, stiffness and reduced mobility. Exercise is one of the most effective treatments, alongside weight management and an anti-inflammatory diet. Low-impact activities like swimming and walking, combined with targeted strengthening for the quadriceps and hamstrings, reduce pain and improve function in most people. Sharp pain is a sign to stop, but mild discomfort during exercise is normal. Most people benefit from 3–4 sessions a week with adequate rest days.
          </AnswerBox>
          <MedicalReviewBadge
            reviewer="Maxwell"
            title="First Contact Practitioner"
            credential="HCPC PH128483"
            date="June 2026"
          />
        </div>
      </section>

      {/* Hero image */}
      <section className="bg-secondary/30 border-y border-border/15 py-10">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <img
            src={heroImage}
            alt="Woman performing a seated quadriceps strengthening exercise"
            className="w-full h-auto rounded-lg shadow-lg"
            loading="eager"
            decoding="async"
            width={1600}
            height={900}
          />
        </div>
      </section>

      {/* Tier 1 */}
      <section id="tier1" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1000px]">
          <div className="mb-10">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-0">
              <Zap className="h-3 w-3 mr-1 inline" /> Tier 1
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Most effective exercises
            </h2>
            <p className="text-lg text-muted-foreground">
              Start here. These three have the strongest evidence for reducing knee OA pain.
            </p>
          </div>
          <div className="space-y-8">
            {tier1Exercises.map((ex) => (
              <Card key={ex.title} className="p-8 border border-border/40">
                <div className="flex items-start gap-4 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-bold mb-2">{ex.title}</h3>
                    <Badge variant="outline" className="mb-4">
                      {ex.difficulty}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">How to do it</h4>
                    <p className="text-base text-foreground leading-relaxed">{ex.description}</p>
                  </div>
                  <div className="pl-4 border-l-2 border-primary">
                    <h4 className="font-semibold text-sm mb-1">Why it works</h4>
                    <p className="text-base text-foreground leading-relaxed">{ex.why}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tier 2 */}
      <section className="py-16 lg:py-24 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[1000px]">
          <div className="mb-10">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-0">
              <Droplet className="h-3 w-3 mr-1 inline" /> Tier 2
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Additional strength exercises
            </h2>
            <p className="text-lg text-muted-foreground">
              Add these after Tier 1 feels comfortable. Build gradually — one new exercise per week.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {tier2Exercises.map((ex) => (
              <Card key={ex.title} className="p-6 border border-border/40 bg-background">
                <h3 className="font-display text-lg font-bold mb-2">{ex.title}</h3>
                <p className="text-sm text-foreground mb-3 leading-relaxed">{ex.description}</p>
                <p className="text-xs text-muted-foreground italic">Why: {ex.why}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Avoid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1000px]">
          <div className="mb-10">
            <Badge variant="secondary" className="mb-4 bg-destructive/10 text-destructive border-0">
              <AlertCircle className="h-3 w-3 mr-1 inline" /> Avoid
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Exercises to avoid
            </h2>
            <p className="text-lg text-muted-foreground">
              These put too much stress on the knee joint and typically increase pain.
            </p>
          </div>
          <Card className="p-8 border-2 border-destructive/20 bg-destructive/5">
            <ul className="space-y-3">
              {avoidExercises.map((ex) => (
                <li key={ex} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-destructive mt-2 shrink-0" />
                  <span className="text-base">{ex}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <Card key={f.q} className="p-6 border border-border/40 bg-background">
                <h3 className="font-display text-lg font-bold mb-2">{f.q}</h3>
                <p className="text-base text-foreground leading-relaxed">{f.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Internal link cluster */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Complete your knee arthritis strategy
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            <Link
              to="/diet/foods-to-avoid-with-arthritis"
              className="block p-6 border border-border/40 rounded-lg hover:bg-secondary/40 transition-colors"
            >
              <h3 className="font-display text-lg font-bold mb-2">Foods to avoid with arthritis</h3>
              <p className="text-sm text-muted-foreground">
                What foods make knee pain worse, and the anti-inflammatory swaps that help.
              </p>
            </Link>
            <Link
              to="/supplements"
              className="block p-6 border border-border/40 rounded-lg hover:bg-secondary/40 transition-colors"
            >
              <h3 className="font-display text-lg font-bold mb-2">Supplements for joint support</h3>
              <p className="text-sm text-muted-foreground">
                Evidence for glucosamine, omega-3, turmeric and other joint-support supplements.
              </p>
            </Link>
            <Link
              to="/conditions/knee-arthritis"
              className="block p-6 border border-border/40 rounded-lg hover:bg-secondary/40 transition-colors"
            >
              <h3 className="font-display text-lg font-bold mb-2">Knee arthritis overview</h3>
              <p className="text-sm text-muted-foreground">
                Full guide: symptoms, causes, diagnosis, treatment options and long-term management.
              </p>
            </Link>
            <Link
              to="/conditions/osteoarthritis"
              className="block p-6 border border-border/40 rounded-lg hover:bg-secondary/40 transition-colors"
            >
              <h3 className="font-display text-lg font-bold mb-2">Osteoarthritis guide</h3>
              <p className="text-sm text-muted-foreground">
                Complete UK guide to osteoarthritis across all joints: causes and management.
              </p>
            </Link>
            <Link
              to="/diet/mediterranean-diet-for-arthritis"
              className="block p-6 border border-border/40 rounded-lg hover:bg-secondary/40 transition-colors"
            >
              <h3 className="font-display text-lg font-bold mb-2">Mediterranean 7-day plan</h3>
              <p className="text-sm text-muted-foreground">
                Complete meal plan, UK shopping list and five anti-inflammatory recipes.
              </p>
            </Link>
            <Link
              to="/living-with-arthritis"
              className="block p-6 border border-border/40 rounded-lg hover:bg-secondary/40 transition-colors"
            >
              <h3 className="font-display text-lg font-bold mb-2">Living with arthritis</h3>
              <p className="text-sm text-muted-foreground">
                Day-to-day strategies: work, sleep, mood, relationships and independence.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
