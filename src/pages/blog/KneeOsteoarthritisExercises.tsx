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
const PATH = '/blog/knee-arthritis-exercises-uk';

const heroImage =
  'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?auto=format&fit=crop&w=1600&q=80';

const tier1Exercises = [
  {
    title: 'Quadriceps Strengthening (Straight-Leg Raises)',
    description:
      'Sit in a sturdy chair and slowly straighten one leg to a comfortable position. Hold briefly, then lower with control. Start with a few repetitions and build up if symptoms remain manageable.',
    why: 'Strengthening the muscles around the knee can support the joint and improve pain and function.',
    difficulty: 'Beginner',
  },
  {
    title: 'Swimming or Water Aerobics',
    description:
      'Try comfortable swimming or walking in the pool. Begin with a short session and increase the duration gradually.',
    why: 'Water supports body weight while providing resistance, which can make movement more comfortable for some people.',
    difficulty: 'Beginner to intermediate',
  },
  {
    title: 'Walking (Modified)',
    description:
      'Begin with a short walk on a route you feel confident using. Increase time or distance gradually and use a walking aid if one has been recommended for you.',
    why: 'Regular walking supports cardiovascular health, mobility and leg strength.',
    difficulty: 'Beginner',
  },
];

const tier2Exercises = [
  {
    title: 'Hamstring Curls',
    description: 'Standing with support, bend one knee as far as is comfortable, then lower slowly.',
    why: 'Strengthens the hamstring, which supports the back of the knee.',
  },
  {
    title: 'Calf Raises',
    description: 'Holding a stable surface, slowly rise onto your toes, then lower with control.',
    why: 'Improves calf strength and ankle mobility.',
  },
  {
    title: 'Step-Ups (Low Step)',
    description:
      'Using a low, stable step and a handrail or support, step up and down slowly. Stop if the movement feels unsafe.',
    why: 'Builds functional leg strength needed for stairs and daily activity.',
  },
  {
    title: 'Wall Squats',
    description:
      'With your back against a wall, slide down only as far as is comfortable, then return to standing. A shallow bend is enough to begin.',
    why: 'Strengthens the thigh and hip muscles in a controlled position.',
  },
];

const exercisesToModify = [
  'High-impact activity that repeatedly causes a marked increase in pain or swelling',
  'Deep or heavily loaded squats and lunges before you have built sufficient strength',
  'Heavy resistance exercises performed without appropriate technique or supervision',
  'Jumping movements if balance, pain or joint stability is a concern',
  'Prolonged kneeling when it aggravates symptoms',
];

const faqs = [
  {
    q: 'How often should I exercise with knee arthritis?',
    a: 'A tailored plan matters more than a fixed number. Begin with short, manageable sessions and increase gradually. Strengthening is often spread across the week with recovery time between harder sessions; a physiotherapist can personalise the frequency.',
  },
  {
    q: 'Should knee arthritis pain stop me from exercising?',
    a: 'Some temporary discomfort can occur when you start. Reduce or stop an exercise if pain is sharp, severe or clearly worsening. Seek professional advice if symptoms do not settle, swelling increases, or you are unsure how much activity is appropriate.',
  },
  {
    q: 'How long before I notice improvement?',
    a: 'Improvement is gradual and varies from person to person. Give a suitable programme time to work, increase it progressively, and ask a physiotherapist or GP for advice if pain or function is getting worse rather than better.',
  },
  {
    q: 'Can I exercise if my knee is swollen?',
    a: 'Reduce the intensity if activity makes swelling worse. A newly hot, red or very swollen joint, especially with fever or feeling unwell, needs prompt medical advice rather than an exercise session.',
  },
  {
    q: 'What if I do not have access to a swimming pool?',
    a: 'Walking, cycling and chair-based strengthening are possible alternatives. Choose an activity that is safe and accessible for you and build it up gradually.',
  },
  {
    q: 'Should I wear a knee brace while exercising?',
    a: 'Some people find a brace helpful, but the right type and fit depend on the person and the knee problem. Ask a physiotherapist or other clinician before buying one, particularly if it changes your walking or causes pressure on the skin.',
  },
];

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  headline: 'Knee Arthritis Exercises: Safe Exercises for Pain, Strength & Mobility',
  description:
    'A practical guide to strengthening, mobility and low-impact activity for knee arthritis, with safety advice and links to NHS and NICE information.',
  inLanguage: 'en-GB',
  image: heroImage,
  datePublished: '2026-06-21',
  dateModified: '2026-08-22',
  author: {
    '@type': 'Person',
    name: 'Maxwell',
    jobTitle: 'First Contact Practitioner — Chartered Physiotherapist',
    identifier: 'HCPC PH128483',
    affiliation: {
      '@type': 'Organization',
      name: 'Chartered Society of Physiotherapy',
    },
  },
  publisher: {
    '@type': 'Organization',
    name: 'Living With Arthritis UK',
    url: SITE,
    logo: {
      '@type': 'ImageObject',
      url: 'https://livingwitharthritis.org.uk/favicon.ico',
    },
  },
  about: {
    '@type': 'MedicalCondition',
    name: 'Knee Osteoarthritis',
    alternateName: ['Knee arthritis', 'Knee OA', 'Knee pain'],
  },
  audience: {
    '@type': 'MedicalAudience',
    audienceType: 'Patients',
    geographicArea: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
  },
  medicalReviewProcess: {
    '@type': 'MedicalWebPageElement',
    name: 'Reviewed by HCPC-registered physiotherapist',
    lastReviewDate: '2026-06-21',
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
  description: 'Step-by-step guide to a seated knee-strengthening exercise.',
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
      text: 'Lower the leg slowly with control. Begin with a few repetitions and build up gradually.',
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
        title="Knee Arthritis Exercises: Safe Exercises for Pain, Strength & Mobility"
        description="Knee arthritis exercises for strength and mobility, including seated leg raises, walking and water exercise, with practical safety advice."
        path={PATH}
        type="article"
        keywords="knee arthritis exercises, exercises for knee arthritis, knee osteoarthritis exercises, exercises for arthritic knees, knee exercises for arthritis, knee OA exercises, knee strengthening exercises, knee stretches for arthritis"
      />
      <Header />

      <PageBreadcrumb
        segments={[
          { label: 'Home', href: '/' },
          { label: 'Conditions', href: '/conditions/osteoarthritis' },
          { label: 'Knee Arthritis', href: '/conditions/knee-arthritis' },
          { label: 'Exercises' },
        ]}
      />

      {/* Hero */}
      <section className="bg-secondary/30 border-b border-border/15 py-12">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <div className="mb-6">
            <Badge variant="secondary" className="bg-background text-primary border-0">
              Exercise · Knee OA · Evidence-based
            </Badge>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Knee Arthritis Exercises: Safe Exercises for Pain, Strength &amp; Mobility
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            A practical introduction to strengthening, mobility and low-impact
            activity, with guidance on adapting exercise when symptoms change.
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

      {/* Answer box + Medical review */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <div className="mb-6">
            <MedicalReviewBadge
              reviewer="Maxwell"
              title="First Contact Practitioner"
              credential="HCPC PH128483"
              authorSlug="maxwell"
              date="Reviewed June 2026"
            />
          </div>
          <AnswerBox
            question="What are the best exercises for knee arthritis?"
            reviewed="2026-06-21"
          >
            Regular, tailored exercise is a core treatment for knee
            osteoarthritis. Strengthening the muscles around the knee and
            choosing manageable aerobic activity can improve pain and function.
            Start gradually, adapt movements to your ability, and seek advice if
            exercise causes severe or worsening symptoms.
          </AnswerBox>
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
            <Badge variant="secondary" className="mb-4 bg-background text-primary border-0">
              <Zap className="h-3 w-3 mr-1 inline" /> Tier 1
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Core exercises to consider
            </h2>
            <p className="text-lg text-muted-foreground">
              These options cover strengthening and low-impact aerobic activity.
              Choose a manageable starting point rather than doing all three at once.
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
            <Badge variant="secondary" className="mb-4 bg-background text-primary border-0">
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
              Exercises to modify when needed
            </h2>
            <p className="text-lg text-muted-foreground">
              No single exercise is unsuitable for everyone. Modify or pause
              movements that repeatedly worsen symptoms, and get professional
              advice when balance, technique or joint stability is a concern.
            </p>
          </div>
          <Card className="p-8 border-2 border-destructive/20 bg-destructive/5">
            <ul className="space-y-3">
              {exercisesToModify.map((ex) => (
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

      <section className="py-12 bg-background" aria-labelledby="sources-heading">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <h2
            id="sources-heading"
            className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-5"
          >
            Sources and further guidance
          </h2>
          <ul className="space-y-3 text-base">
            <li>
              <a
                href="https://www.nice.org.uk/guidance/ng226"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                NICE NG226: Osteoarthritis in over 16s — diagnosis and management
              </a>
            </li>
            <li>
              <a
                href="https://www.nhs.uk/conditions/osteoarthritis/treatment/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                NHS: Osteoarthritis treatment
              </a>
            </li>
          </ul>
          <p className="mt-5 text-sm text-muted-foreground">
            This guide provides general information and cannot assess an
            individual knee. A physiotherapist or GP can help tailor exercise
            when symptoms, balance or other health conditions make activity
            difficult.
          </p>
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
