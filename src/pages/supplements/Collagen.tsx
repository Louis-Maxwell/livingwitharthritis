import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Pill,
  FlaskConical,
  ShieldAlert,
  HelpCircle,
  Scale,
  BookOpen,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBreadcrumb from '@/components/ui/PageBreadcrumb';
import AnswerBox from '@/components/seo/AnswerBox';
import FaqAccordion from '@/components/faq/FaqAccordion';

const BASE = 'https://livingwitharthritis.org.uk';
const URL = `${BASE}/supplements/collagen`;
const REVIEWED = '2026-07-31';

const META_TITLE = 'Collagen for Arthritis: Does It Work? UK Guide';
const META_DESC =
  'UK guide to collagen for arthritis — hydrolysed peptides vs undenatured type II, the evidence for joint pain, dosage, side effects, and how collagen compares with glucosamine.';

const FAQS = [
  {
    q: 'Does collagen help arthritis?',
    a: 'The evidence is promising but early. Trials of hydrolysed collagen peptides (10 g/day) and undenatured type II collagen (40 mg/day) show small-to-moderate improvements in knee osteoarthritis pain, stiffness and function over 3–6 months. Collagen does not rebuild worn cartilage and is not a substitute for exercise or weight management.',
  },
  {
    q: 'Which type of collagen is best for joints?',
    a: 'Two forms are used in joint research. Hydrolysed collagen peptides (usually type I and III, from bovine or marine sources) are taken at 10 g/day. Undenatured type II collagen (UC-II, from chicken sternum) is taken at just 40 mg/day and works differently — it appears to calm the immune response to cartilage rather than supply building blocks.',
  },
  {
    q: 'How much collagen should I take for arthritis?',
    a: 'For hydrolysed collagen peptides, 10 g once a day is the dose used in most trials. For undenatured type II collagen (UC-II), it is 40 mg once a day. Allow 12 weeks of daily use before deciding whether it helps.',
  },
  {
    q: 'How long does collagen take to work for joint pain?',
    a: 'Most studies report the first measurable change at around 8 weeks, with the fullest effect at 12–24 weeks. If you have felt nothing after three consistent months, stop — the money is better spent on strength training or a physiotherapy course.',
  },
  {
    q: 'Collagen or glucosamine — which is better for arthritis?',
    a: 'Glucosamine sulfate has more long-term data but inconsistent results; collagen has fewer trials but several of them are positive. Head-to-head comparisons are scarce. Neither slows disease progression reliably. If you want to try one, run a single 12-week trial of one product rather than stacking both, so you can tell what is working.',
  },
  {
    q: 'Are there side effects to collagen supplements?',
    a: 'Collagen is generally very well tolerated. Reported side effects are mild — a full or bloated feeling, mild heartburn, or an unpleasant aftertaste. Marine collagen should be avoided if you have a fish allergy, and bovine or chicken-derived collagen may not suit some religious or vegetarian diets.',
  },
  {
    q: 'Is collagen available on the NHS?',
    a: 'No. Collagen is a food supplement, not a prescription medicine, and NICE does not recommend it for osteoarthritis. It is sold freely in UK pharmacies and supermarkets, so any trial is at your own cost.',
  },
  {
    q: 'Can I get enough collagen from food?',
    a: 'Your body makes its own collagen from amino acids and vitamin C, so a diet with adequate protein, plus fruit and vegetables, supports natural production. Bone broth contains collagen but in unpredictable amounts, which is why trials use standardised powders or capsules.',
  },
];

export default function Collagen() {
  useEffect(() => {
    const medical = {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: META_TITLE,
      description: META_DESC,
      url: URL,
      inLanguage: 'en-GB',
      datePublished: REVIEWED,
      dateModified: REVIEWED,
      lastReviewed: REVIEWED,
      about: {
        '@type': 'Substance',
        name: 'Collagen',
        alternateName: [
          'Collagen peptides',
          'Hydrolysed collagen',
          'Undenatured type II collagen',
          'UC-II',
        ],
      },
      audience: {
        '@type': 'MedicalAudience',
        audienceType: 'Patient',
        geographicArea: { '@type': 'Country', name: 'United Kingdom' },
      },
      publisher: {
        '@type': 'Organization',
        name: 'Living With Arthritis',
        url: BASE,
        logo: { '@type': 'ImageObject', url: `${BASE}/favicon.ico` },
      },
    };
    // FAQPage intentionally not emitted here — <FaqAccordion> below covers it.
    // BreadcrumbList intentionally not emitted here — <PageBreadcrumb> below covers it.
    const scripts = [medical].map((d) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.text = JSON.stringify(d);
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.remove());
  }, []);

  return (
    <>
      <Helmet>
        <title>{`${META_TITLE} | Living With Arthritis UK`}</title>
        <meta name="description" content={META_DESC} />
        <meta
          name="keywords"
          content="collagen for arthritis, collagen for joints, collagen peptides, hydrolysed collagen, undenatured type II collagen, UC-II, collagen vs glucosamine, collagen dosage arthritis, marine collagen joints, collagen UK"
        />
        <link rel="alternate" hrefLang="en-GB" href={URL} />
        <meta name="geo.region" content="GB" />
        <meta property="og:title" content={META_TITLE} />
        <meta property="og:description" content={META_DESC} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={URL} />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={META_TITLE} />
        <meta name="twitter:description" content={META_DESC} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <PageBreadcrumb
          segments={[
            { label: 'Supplements', href: '/supplements' },
            { label: 'Collagen' },
          ]}
        />

        <div className="relative bg-gradient-to-br from-primary/8 via-background to-primary/5 border-b border-border/20 overflow-hidden">
          <div className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl relative z-10">
            <Link
              to="/supplements"
              className="text-primary text-sm font-medium inline-flex items-center gap-1.5 mb-6 hover:gap-2.5 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to supplements
            </Link>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 bg-background border border-primary/20 px-3 py-1 rounded-full">
              <Pill className="w-3 h-3" /> Supplement Guide
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">
              Collagen for arthritis
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Collagen is the fastest-growing joint supplement in the UK. Here is what the
              trials actually show, the difference between hydrolysed peptides and
              undenatured type II, the right dose, and how it compares with glucosamine.
            </p>
          </div>
        </div>

        <main
          id="main-content"
          className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl"
        >
          <p className="text-sm text-muted-foreground mb-8">
            Last reviewed:{' '}
            <time dateTime={REVIEWED}>31 July 2026</time>
          </p>

          <AnswerBox question="Does collagen work for arthritis?" reviewed={REVIEWED}>
            <p>
              In trials, <strong>10 g/day of hydrolysed collagen peptides</strong> or{' '}
              <strong>40 mg/day of undenatured type II collagen</strong> produced small-to-moderate
              improvements in knee osteoarthritis pain and stiffness after 12–24 weeks. The
              evidence is younger and thinner than for glucosamine, and collagen does not
              regrow worn cartilage. It is safe and worth a single 12-week trial if exercise,
              weight management and diet have not been enough.
            </p>
          </AnswerBox>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                What is collagen, and which type matters for joints?
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-foreground/85 prose-strong:text-foreground prose-headings:font-display prose-headings:text-foreground">
              <p>
                Collagen is the main structural protein in your body — it makes up the framework
                of skin, tendon, bone and the cartilage that cushions a joint. Cartilage is
                mostly <strong>type II collagen</strong> held in a water-rich matrix. In{' '}
                <Link to="/conditions/osteoarthritis" className="text-primary underline">
                  osteoarthritis
                </Link>
                , that matrix breaks down faster than the body rebuilds it.
              </p>
              <p>Supplements come in two very different forms:</p>
              <ul>
                <li>
                  <strong>Hydrolysed collagen peptides</strong> — collagen broken into short
                  amino-acid chains so they absorb easily. Usually type I and III from bovine
                  hide or fish skin (marine collagen). Dose in trials: <strong>10 g/day</strong>.
                </li>
                <li>
                  <strong>Undenatured type II collagen (UC-II)</strong> — a tiny dose of
                  intact chicken-sternum collagen, taken at <strong>40 mg/day</strong>. It is
                  thought to work through oral tolerance: teaching the immune system to stop
                  attacking cartilage collagen, rather than acting as raw material.
                </li>
                <li>
                  <strong>Gelatin and bone broth</strong> — the same protein, but the collagen
                  content is unpredictable, so results are hard to compare with trials.
                </li>
              </ul>
              <p>
                Collagen only forms properly when vitamin C is present, which is why many joint
                formulas add it. A diet with adequate protein plus fruit and vegetables supports
                your own production too — see our{' '}
                <Link to="/diet" className="text-primary underline">
                  anti-inflammatory diet guide
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                What does the evidence say?
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-foreground/85 prose-strong:text-foreground prose-headings:font-display prose-headings:text-foreground">
              <p>
                Collagen is where glucosamine was twenty years ago: several positive trials,
                mostly small, several funded by supplement manufacturers, and no long-term
                outcome data.
              </p>
              <ul>
                <li>
                  <strong>Hydrolysed collagen peptides.</strong> Pooled analyses of randomised
                  trials report a statistically significant reduction in WOMAC pain and stiffness
                  scores at 10 g/day over 3–6 months, with the effect size described as small
                  to moderate.
                </li>
                <li>
                  <strong>Undenatured type II collagen.</strong> Studies in knee osteoarthritis
                  found 40 mg/day of UC-II improved pain and function more than
                  glucosamine + chondroitin over 180 days, though the trials were small and
                  industry funded.
                </li>
                <li>
                  <strong>Activity-related knee pain.</strong> Trials in athletes and active
                  adults without diagnosed arthritis show reduced knee pain during exercise —
                  useful if joint discomfort is what stops you training.
                </li>
                <li>
                  <strong>Structure.</strong> There is no convincing evidence that collagen
                  regrows cartilage or slows joint-space narrowing on X-ray.
                </li>
                <li>
                  <strong>UK guidance.</strong> NICE guideline NG226 does not recommend any oral
                  supplement, including collagen, for osteoarthritis on the NHS.
                </li>
              </ul>
              <p>
                Read the honest version: collagen may take the edge off pain for some people.
                It is not a treatment, and it will not do what a strength programme does.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Pill className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                What is the right dose and how should I take it?
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-foreground/85 prose-strong:text-foreground prose-headings:font-display prose-headings:text-foreground">
              <ul>
                <li>
                  <strong>Hydrolysed peptides:</strong> 10 g once a day, stirred into water,
                  coffee, porridge or a smoothie. Flavourless powders are cheapest per gram.
                </li>
                <li>
                  <strong>UC-II:</strong> 40 mg once a day as a capsule. Do not assume more is
                  better — the low dose is the point.
                </li>
                <li>
                  <strong>Timing:</strong> any time of day; consistency matters far more than
                  timing. Take with a vitamin C source if your product does not include it.
                </li>
                <li>
                  <strong>Trial length:</strong> 12 weeks minimum before you judge it.
                </li>
                <li>
                  <strong>Choosing a product:</strong> look for the collagen dose in grams or
                  milligrams on the front, not just "collagen complex". Avoid blends that hide
                  a token amount behind a long ingredient list.
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Are there side effects or reasons to avoid it?
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-foreground/85 prose-strong:text-foreground prose-headings:font-display prose-headings:text-foreground">
              <p>
                Collagen has one of the cleanest safety records of any joint supplement. Where
                side effects occur they are mild:
              </p>
              <ul>
                <li>Fullness, bloating or mild heartburn</li>
                <li>An unpleasant taste or aftertaste with marine collagen</li>
                <li>Loose stools when starting a 10 g dose</li>
              </ul>
              <h3>Take extra care if you</h3>
              <ul>
                <li>Have a fish or shellfish allergy — avoid marine collagen</li>
                <li>Follow a vegetarian, vegan, halal or kosher diet — all collagen is animal-derived</li>
                <li>Have kidney disease or are on a protein-restricted diet — check with your GP</li>
                <li>Are pregnant or breastfeeding — safety data is limited</li>
              </ul>
              <p>
                Tell your GP or pharmacist about any supplement you start, particularly if you
                take regular medication. If collagen is ruled out for you, see our guide to{' '}
                <Link to="/supplements/collagen-alternatives" className="text-primary underline">
                  collagen alternatives
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                How does collagen compare with glucosamine and other supplements?
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-foreground/85 prose-strong:text-foreground prose-headings:font-display prose-headings:text-foreground">
              <ul>
                <li>
                  <strong>
                    <Link to="/supplements/glucosamine" className="text-primary underline">
                      Glucosamine
                    </Link>
                  </strong>{' '}
                  — far more trial data, but the results are inconsistent and NICE does not
                  recommend it. Best evidence is for glucosamine sulfate at 1,500 mg/day.
                </li>
                <li>
                  <strong>Collagen</strong> — fewer trials, but a higher proportion of them are
                  positive, and tolerability is better. Reasonable first choice if you have a
                  shellfish allergy or take warfarin (glucosamine can raise INR).
                </li>
                <li>
                  <strong>
                    <Link to="/supplements/msm" className="text-primary underline">
                      MSM
                    </Link>
                  </strong>{' '}
                  — modest pain and stiffness improvement in small knee OA studies.
                </li>
                <li>
                  <strong>
                    <Link to="/supplements/turmeric" className="text-primary underline">
                      Turmeric / curcumin
                    </Link>
                  </strong>{' '}
                  — the strongest anti-inflammatory evidence of the group; around 1,000 mg/day
                  curcumin has performed comparably to ibuprofen in knee OA trials.
                </li>
                <li>
                  <strong>Omega-3 fish oil</strong> — best evidence in rheumatoid arthritis
                  rather than osteoarthritis.
                </li>
              </ul>
              <p>
                Run one supplement at a time for 12 weeks. Stacking three at once makes it
                impossible to know which — if any — is doing the work.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Frequently asked questions
              </h2>
            </div>
            <FaqAccordion
              idPrefix="supplements-collagen-faq"
              items={FAQS.map((f) => ({ question: f.q, answer: f.a }))}
            />
          </section>

          <div className="p-8 rounded-2xl bg-accent border border-border/30">
            <h2 className="font-display text-xl font-bold text-foreground mb-3">
              Pair supplements with what really works
            </h2>
            <p className="text-muted-foreground mb-5">
              Supplements help a bit. Exercise, weight management and an anti-inflammatory diet
              help a lot. Build all three together.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/supplements/glucosamine"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Compare with glucosamine
              </Link>
              <Link
                to="/diet"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary/20 transition-colors"
              >
                Anti-inflammatory diet
              </Link>
              <Link
                to="/exercises"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary/20 transition-colors"
              >
                Exercise hub
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
