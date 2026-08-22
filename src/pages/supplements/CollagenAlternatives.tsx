import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Leaf,
  FlaskConical,
  ShieldAlert,
  HelpCircle,
  Scale,
  Dumbbell,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBreadcrumb from '@/components/ui/PageBreadcrumb';
import AnswerBox from '@/components/seo/AnswerBox';
import FaqAccordion from '@/components/faq/FaqAccordion';

const BASE = 'https://livingwitharthritis.org.uk';
const URL = `${BASE}/supplements/collagen-alternatives`;
const REVIEWED = '2026-08-01';

const META_TITLE = 'Collagen Alternatives for Joints: UK Evidence Guide';
const META_DESC =
  'Vegan, halal and allergy-safe alternatives to collagen for arthritis — turmeric, glucosamine, MSM, omega-3, vitamin C and D. Doses, evidence strength and honest caveats.';

const FAQS = [
  {
    q: 'Is there a vegan collagen supplement?',
    a: 'No. All collagen is animal-derived — bovine hide, chicken sternum or fish skin. Products sold as "vegan collagen" contain no collagen at all: they are collagen builders, usually vitamin C, amino acids such as glycine and proline, zinc and plant extracts, intended to support your own collagen production.',
  },
  {
    q: 'What is the best alternative to collagen for joint pain?',
    a: 'Turmeric (around 1,000 mg/day of curcumin with piperine or a high-absorption formulation) has the strongest anti-inflammatory evidence of the common joint supplements, and has performed comparably to ibuprofen in knee osteoarthritis trials. It is also plant-based, so it suits vegan, halal, kosher and fish-allergy diets.',
  },
  {
    q: 'Which joint supplements are halal or kosher?',
    a: 'Turmeric/curcumin, MSM, vitamin C, vitamin D (choose a lichen-derived D3 or D2), and algal omega-3 are all plant or mineral based and generally suitable. Glucosamine is usually shellfish-derived, though vegetarian corn-fermented glucosamine exists. Collagen and most fish oils are not.',
  },
  {
    q: 'What can I take instead of collagen if I have a fish allergy?',
    a: 'Avoid marine collagen and standard fish oil. Safe alternatives include turmeric/curcumin, MSM, algal omega-3 (grown from algae, not fish), vitamin D and vitamin C. Glucosamine is commonly made from shellfish shells, so check the label if you have a shellfish allergy too.',
  },
  {
    q: 'What should I take instead of collagen for knee osteoarthritis?',
    a: 'For knees specifically, the options with usable trial data are curcumin at about 1,000 mg/day, glucosamine sulfate at 1,500 mg/day, and MSM at 1.5–3 g/day. Effects are modest at best. A progressive quadriceps and glute strengthening programme reliably outperforms any of them.',
  },
  {
    q: 'Can diet replace a collagen supplement?',
    a: 'Largely, yes. Your body builds its own collagen from amino acids and vitamin C, so adequate protein (roughly 1.0–1.2 g per kg of body weight a day for older adults) plus fruit and vegetables covers the raw materials. A Mediterranean-style anti-inflammatory pattern also helps with weight and inflammation, which matter more than any capsule.',
  },
  {
    q: 'How long should I trial a collagen alternative before deciding?',
    a: 'Twelve weeks of consistent daily use. Try one product at a time — stacking three at once makes it impossible to tell what, if anything, is helping. If there is no clear change after three months, stop and put the money towards physiotherapy or a gym membership.',
  },
  {
    q: 'Are these alternatives safe with my medication?',
    a: 'Mostly, but check first. Turmeric and omega-3 can add to the effect of blood thinners, glucosamine can raise INR in people on warfarin, and high-dose turmeric may irritate the stomach alongside NSAIDs. Tell your GP or pharmacist about anything you start, especially if you take regular medication or have kidney or liver disease.',
  },
];

export default function CollagenAlternatives() {
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
      about: [
        { '@type': 'Substance', name: 'Curcumin', alternateName: ['Turmeric'] },
        { '@type': 'Substance', name: 'Glucosamine sulfate' },
        { '@type': 'Substance', name: 'Methylsulfonylmethane', alternateName: ['MSM'] },
        { '@type': 'Substance', name: 'Omega-3 fatty acids', alternateName: ['Algal oil', 'Fish oil'] },
        { '@type': 'Substance', name: 'Vitamin C' },
        { '@type': 'Substance', name: 'Vitamin D' },
      ],
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
          content="collagen alternatives, vegan collagen, collagen substitute joints, alternative to collagen for arthritis, halal joint supplements, plant based joint supplement, collagen free joint support UK"
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
            { label: 'Collagen alternatives' },
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
              <Leaf className="w-3 h-3" /> Supplement Guide
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">
              Collagen alternatives for joints
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              All collagen is animal-derived, which rules it out for a lot of people. Here
              is what else has real evidence behind it for arthritis pain — with doses,
              honest caveats and what suits vegan, halal, kosher and allergy-safe diets.
            </p>
          </div>
        </div>

        <main
          id="main-content"
          className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl"
        >
          <p className="text-sm text-muted-foreground mb-8">
            Last reviewed: <time dateTime={REVIEWED}>1 August 2026</time>
          </p>

          <AnswerBox
            question="What can I take instead of collagen for joint pain?"
            reviewed={REVIEWED}
          >
            <p>
              There is no such thing as vegan collagen, but you do not need collagen to
              support your joints. <strong>Turmeric/curcumin (~1,000 mg/day)</strong> has the
              strongest anti-inflammatory evidence,{' '}
              <strong>glucosamine sulfate (1,500 mg/day)</strong> has the most data,{' '}
              <strong>MSM (1.5–3 g/day)</strong> gives modest knee relief, and{' '}
              <strong>omega-3, vitamin C and vitamin D</strong> cover the nutritional side.
              Adequate protein plus vitamin C lets your body build its own collagen. None of
              these beat strength training and weight management.
            </p>
          </AnswerBox>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Why look for an alternative to collagen?
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-foreground/85 prose-strong:text-foreground prose-headings:font-display prose-headings:text-foreground">
              <p>
                Every collagen supplement on the shelf comes from an animal. There is no
                plant source, because plants do not make collagen.
              </p>
              <ul>
                <li>
                  <strong>Bovine collagen</strong> — from cattle hide. Not suitable for
                  vegetarians or vegans, and rarely certified halal or kosher.
                </li>
                <li>
                  <strong>Marine collagen</strong> — from fish skin and scales. Off-limits
                  with a fish allergy.
                </li>
                <li>
                  <strong>Undenatured type II (UC-II)</strong> — from chicken sternum
                  cartilage.
                </li>
              </ul>
              <p>
                Cost is the other reason people look elsewhere. A 10 g daily dose of{' '}
                <Link to="/supplements/collagen" className="text-primary underline">
                  hydrolysed collagen
                </Link>{' '}
                gets through a tub quickly, and the evidence behind it is younger and thinner
                than the marketing suggests.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                What are the evidence-based alternatives?
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-foreground/85 prose-strong:text-foreground prose-headings:font-display prose-headings:text-foreground">
              <h3>Turmeric and curcumin — the strongest case</h3>
              <p>
                Curcumin blocks inflammatory pathways including NF-κB and COX-2. Trials of
                around <strong>1,000 mg/day</strong> report pain and function improvements in
                knee osteoarthritis comparable to ibuprofen, with fewer stomach problems.
                Absorption is poor on its own, so look for piperine (black pepper extract) or
                a phospholipid formulation. Plant-based, so it fits every restricted diet.{' '}
                <Link to="/supplements/turmeric" className="text-primary underline">
                  Full turmeric guide
                </Link>
                .
              </p>

              <h3>Glucosamine sulfate — the most-studied option</h3>
              <p>
                <strong>1,500 mg/day</strong> of glucosamine sulfate is the form with the best
                data, though results across trials are inconsistent and NICE does not
                recommend it. Most glucosamine is made from shellfish shells; vegetarian
                corn-fermented versions exist. Avoid it if you take warfarin, as it can raise
                INR.{' '}
                <Link to="/supplements/glucosamine" className="text-primary underline">
                  Full glucosamine guide
                </Link>
                .
              </p>

              <h3>MSM — modest but well tolerated</h3>
              <p>
                Methylsulfonylmethane at <strong>1.5–3 g/day</strong> produced small
                improvements in pain and physical function in knee osteoarthritis studies. It
                is a sulfur compound, not animal-derived, and is one of the better-tolerated
                supplements.{' '}
                <Link to="/supplements/msm" className="text-primary underline">
                  Full MSM guide
                </Link>
                .
              </p>

              <h3>Omega-3 — fish oil or algal oil</h3>
              <p>
                The evidence is strongest in{' '}
                <Link to="/conditions/rheumatoid-arthritis" className="text-primary underline">
                  rheumatoid arthritis
                </Link>
                , where <strong>2.7 g+ of EPA/DHA a day</strong> reduces morning stiffness and
                tender joint counts. Vegans and anyone with a fish allergy can use{' '}
                <strong>algal oil</strong>, which supplies the same EPA and DHA grown directly
                from algae.
              </p>

              <h3>Vitamin C and adequate protein — the collagen builders</h3>
              <p>
                Your body synthesises its own collagen from amino acids, and the enzymes that
                do it require vitamin C. Older adults typically need{' '}
                <strong>1.0–1.2 g of protein per kg of body weight a day</strong> to hold on
                to muscle, which is what stabilises an arthritic joint. Fruit and vegetables
                cover the vitamin C. This is what "vegan collagen" products are actually
                selling you — usually at a markup.
              </p>

              <h3>Vitamin D — correct a deficiency, do not megadose</h3>
              <p>
                Low vitamin D is common in the UK, particularly October to March, and is
                linked with muscle weakness and more pain. The standard advice is{' '}
                <strong>10 µg (400 IU) daily through autumn and winter</strong>. Correcting a
                deficiency helps; taking more than you need does not.
              </p>

              <h3>"Vegan collagen" — read the label</h3>
              <p>
                These contain no collagen. They are blends of vitamin C, glycine, proline,
                zinc and botanical extracts. That is not a scam in itself — those nutrients do
                support collagen synthesis — but you can get the same from a decent diet and a
                cheap vitamin C tablet.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Which alternative suits which diet or allergy?
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-foreground/85 prose-strong:text-foreground prose-headings:font-display prose-headings:text-foreground">
              <ul>
                <li>
                  <strong>Vegan or vegetarian:</strong> turmeric/curcumin, MSM, algal omega-3,
                  vitamin C, lichen-derived vitamin D, corn-fermented glucosamine.
                </li>
                <li>
                  <strong>Halal or kosher:</strong> the same plant and mineral based list —
                  check capsule shells, as gelatin capsules are common. Look for vegetable
                  cellulose (HPMC).
                </li>
                <li>
                  <strong>Fish allergy:</strong> avoid marine collagen and fish oil; use algal
                  omega-3 instead.
                </li>
                <li>
                  <strong>Shellfish allergy:</strong> avoid standard glucosamine; turmeric and
                  MSM are safe choices.
                </li>
                <li>
                  <strong>On warfarin or other blood thinners:</strong> be cautious with
                  turmeric, omega-3 and glucosamine — speak to your pharmacist before starting
                  any of them.
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                What actually outperforms every supplement?
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-foreground/85 prose-strong:text-foreground prose-headings:font-display prose-headings:text-foreground">
              <p>
                This is the uncomfortable part of any supplement page. The three things with
                the strongest evidence in osteoarthritis are free or nearly free:
              </p>
              <ul>
                <li>
                  <strong>Strength and low-impact exercise.</strong> Building the muscle around
                  a joint reduces pain and improves function more reliably than any capsule.{' '}
                  <Link to="/exercises" className="text-primary underline">
                    Exercise hub
                  </Link>
                  .
                </li>
                <li>
                  <strong>Weight management.</strong> Every pound lost takes several pounds of
                  load off the knees and reduces systemic inflammation.
                </li>
                <li>
                  <strong>An anti-inflammatory eating pattern.</strong> Mediterranean-style
                  eating lowers pain and stiffness scores and supports weight control.{' '}
                  <Link to="/diet" className="text-primary underline">
                    Diet guide
                  </Link>
                  .
                </li>
              </ul>
              <p>
                <strong>UK context:</strong> NICE guideline NG226 does not recommend any oral
                supplement for osteoarthritis, and none of the products on this page are
                prescribed. Any trial is at your own cost — so run one at a time, for 12
                weeks, and stop if nothing changes.
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
              idPrefix="supplements-collagen-alternatives-faq"
              items={FAQS.map((f) => ({ question: f.q, answer: f.a }))}
            />
          </section>

          <div className="p-8 rounded-2xl bg-accent border border-border/30">
            <h2 className="font-display text-xl font-bold text-foreground mb-3">
              Build the foundation first
            </h2>
            <p className="text-muted-foreground mb-5">
              Supplements sit at the edges. Movement, weight and diet do the heavy lifting —
              start there, then trial one product for 12 weeks.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/supplements/collagen"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Read the collagen guide
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
