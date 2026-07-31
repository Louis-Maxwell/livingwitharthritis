import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Hand,
  Activity,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import PageHero from "@/components/ui/PageHero";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const heroImage =
  "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1600&q=80";

const evidence = [
  {
    title: "Castellanos & Axelrod, 1990",
    text: "300 adults aged 45+ surveyed in a Los Angeles outpatient clinic. Habitual knuckle crackers were no more likely to have hand osteoarthritis than non-crackers — but they were more likely to report hand swelling and reduced grip strength.",
  },
  {
    title: "Deweber, Olszewski & Ortolano, 2011",
    text: "215 people aged 50–89 had hand X-rays compared with their cracking history. Rates of arthritis were almost identical: 18.1% in crackers vs 21.5% in non-crackers. No association.",
  },
  {
    title: "Kawchuk et al., 2015 (PLOS ONE)",
    text: "Real-time MRI captured the actual 'pop' for the first time. The sound is a gas cavity rapidly forming inside synovial fluid — a process called tribonucleation. No tissue is being damaged.",
  },
  {
    title: "Boutin et al., 2017 (radiology cohort)",
    text: "40 adults imaged with ultrasound before and after knuckle cracking. No acute joint damage detected and no link to long-term arthritis risk.",
  },
];

const whatItCanCause = [
  "A small reduction in grip strength in lifelong, very frequent crackers (one older study only)",
  "Mild soft-tissue swelling around the knuckles in heavy habitual crackers",
  "Occasional, brief discomfort if you crack a joint already inflamed by injury or arthritis",
];

const whatItDoesNotCause = [
  "Osteoarthritis of the hands or fingers",
  "Rheumatoid arthritis or any other autoimmune arthritis",
  "Permanently enlarged knuckles or 'big knuckles'",
  "Bunions, hallux rigidus or any structural foot deformity",
];

const realCauses = [
  { title: "Age", text: "Cartilage gradually thins after about 50. The single biggest risk factor for osteoarthritis." },
  { title: "Genetics", text: "Family history strongly predicts hand and knee osteoarthritis, and most autoimmune arthritis." },
  { title: "Previous joint injury", text: "A serious knee, hip or wrist injury raises later osteoarthritis risk in that joint by 3–6×." },
  { title: "Excess body weight", text: "Every extra kilogram adds roughly 4 kg of load through the knees and increases low-grade inflammation." },
  { title: "Repetitive occupational load", text: "Decades of heavy lifting, kneeling or vibration tools raise risk in the loaded joints." },
  { title: "Autoimmune drivers", text: "Rheumatoid, psoriatic and other inflammatory arthritis are immune-system conditions, not wear-and-tear." },
];

const insteadOfCracking = [
  {
    title: "Gentle hand mobility (60 seconds)",
    text: "Make a loose fist, then fan the fingers wide. Repeat 10 times. Roll the wrists slowly in both directions. Most of the 'need to crack' urge fades after one round.",
  },
  {
    title: "Squeeze and release",
    text: "A soft stress ball or a rolled-up sock works. Squeeze for 3 seconds, release for 3 seconds, 10 times. Builds grip strength — the one thing chronic cracking may slightly reduce.",
  },
  {
    title: "Warm water soak",
    text: "If joints feel stiff in the morning, a 5-minute warm hand soak loosens them more effectively (and more safely) than cracking.",
  },
  {
    title: "Treat the underlying habit",
    text: "Cracking is often a stress or boredom tic. A fidget ring, worry beads or a 30-second breathing pause replaces the loop without harming the joint.",
  },
];

const redFlags = [
  "Pain when the joint cracks (not just the sound)",
  "Visible swelling, warmth or redness around the joint",
  "A joint that locks, gives way or won't fully straighten",
  "Morning joint stiffness lasting more than 30 minutes",
  "Cracking that is new, asymmetrical, or paired with weight loss or fever",
];

const faqs = [
  {
    q: "Does cracking your knuckles give you big knuckles?",
    a: "No. The 1990 Castellanos study found a small association with mild soft-tissue swelling in lifelong heavy crackers, but no change in the underlying bone or cartilage. Knuckle size is set by your bone structure, not your habits.",
  },
  {
    q: "Why do my joints crack more as I get older?",
    a: "Cartilage naturally thins with age and tendons lose a little elasticity, so joint surfaces glide with slightly more friction. The clicks and pops you notice are usually harmless. Only see a GP if the cracking comes with pain, swelling or stiffness.",
  },
  {
    q: "Is it bad to crack your back or neck?",
    a: "The same gas-bubble mechanism applies. Self-cracking now and then is generally fine. Repeated, forceful neck twisting is best avoided because of the (very small) risk to the vertebral arteries — see a physio or chiropractor if your back or neck regularly feels like it 'needs' cracking.",
  },
  {
    q: "Can children safely crack their knuckles?",
    a: "Yes. There is no evidence that knuckle cracking damages a child's joints or causes arthritis later in life. If a child cracks knuckles compulsively, treat it as a habit to redirect rather than a medical concern.",
  },
  {
    q: "Does cracking your toes cause bunions?",
    a: "No. Bunions and hallux rigidus are caused by genetics, foot mechanics and footwear — not by cracking. If toe cracking is paired with stiffness in the big toe, that points to early hallux rigidus, which existed before you started cracking.",
  },
  {
    q: "Should I stop cracking my knuckles anyway?",
    a: "Only if you want to. The arthritis fear is unfounded. The one mild downside found in older research — slightly reduced grip strength in chronic crackers — is easily offset by the gentle hand mobility and squeeze-release routine in this guide.",
  },
];

const SITE = "https://livingwitharthritis.org.uk";
const PAGE_PATH = "/myths/does-cracking-knuckles-cause-arthritis";

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  headline: "Does Cracking Knuckles Cause Arthritis? UK Evidence Guide",
  description:
    "An evidence-based UK guide to the knuckle and toe cracking myth — what the research actually shows, what cracking can and cannot cause, and what to do instead.",
  inLanguage: "en-GB",
  about: {
    "@type": "MedicalCondition",
    name: "Osteoarthritis",
  },
  publisher: {
    "@type": "Organization",
    name: "Living With Arthritis UK",
    url: SITE,
  },
  url: `${SITE}${PAGE_PATH}`,
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

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Myths", item: `${SITE}/myths` },
    {
      "@type": "ListItem",
      position: 3,
      name: "Does Cracking Knuckles Cause Arthritis?",
      item: `${SITE}${PAGE_PATH}`,
    },
  ],
};

export default function DoesCrackingKnucklesCauseArthritis() {
  useEffect(() => {
    const scripts = [articleJsonLd, faqJsonLd, breadcrumbJsonLd].map((data) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.text = JSON.stringify(data);
      document.head.appendChild(s);
      return s;
    });
    return () => {
      scripts.forEach((s) => document.head.removeChild(s));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Cracking Knuckles & Arthritis"
        description="No — and here's the evidence. A plain-English UK guide to the knuckle and toe cracking myth, what cracking can really cause, and what to do instead."
        path={PAGE_PATH}
        type="article"
        keywords="does cracking knuckles cause arthritis, knuckle cracking arthritis, toe cracking arthritis, is cracking your knuckles bad, joint cracking myth UK"
      />
      <Header />

      <PageBreadcrumb
        segments={[
          { label: "Myths" },
          { label: "Does Cracking Knuckles Cause Arthritis?" },
        ]}
      />

      <PageHero
        badge={
          <Badge variant="secondary" className="bg-background text-primary border-0">
            Myth-busting · Evidence-based · UK
          </Badge>
        }
        title="Does Cracking Your Knuckles or Toes Cause Arthritis?"
        subtitle="Short answer: no. A plain-English look at what the research actually shows — for knuckles, toes, backs and necks — plus what to do if you crack out of habit."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href="#evidence">
              See the evidence <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/conditions/osteoarthritis">What causes arthritis</Link>
          </Button>
        </div>
      </PageHero>

      {/* Hero image */}
      <section className="bg-secondary/30 border-b border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px] py-10">
          <figure className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={heroImage}
              alt="Close-up of a person interlacing their fingers about to crack their knuckles"
              className="w-full h-auto object-cover"
              loading="eager"
              decoding="async"
              width={1600}
              height={900}
            />
          </figure>
        </div>
      </section>

      {/* TL;DR */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <Card className="p-8 border-l-4 border-l-primary bg-primary/5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h2 className="font-display text-2xl font-bold mb-3">The short answer</h2>
                <p className="text-foreground/90 leading-relaxed mb-3">
                  <strong>Cracking your knuckles or toes does not cause arthritis.</strong> Multiple
                  studies — including X-ray comparisons of crackers and non-crackers — have looked
                  for a link and found none. The pop you hear is a small gas bubble forming inside
                  the joint's lubricating fluid, not anything tearing or wearing down.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The myth has stuck around for almost a century, but the research is now consistent
                  and clear.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* What is actually happening */}
      <section className="py-16 lg:py-24 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <Badge variant="secondary" className="mb-4 bg-background text-primary border-0">
            <Sparkles className="h-3 w-3 mr-1 inline" /> What's that pop?
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-5">
            What's actually happening when a joint cracks
          </h2>
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              Every joint in your body is wrapped in a capsule filled with a thick, slippery liquid
              called <strong>synovial fluid</strong>. The fluid contains dissolved gases — mostly
              carbon dioxide, oxygen and nitrogen — kept in solution by the pressure inside the
              joint.
            </p>
            <p>
              When you stretch the joint (by pulling on a finger or curling your toes), the capsule
              expands and pressure inside it drops sharply. The dissolved gas can no longer stay
              dissolved, so a small bubble suddenly forms. <strong>That's the pop.</strong> The
              process is called <em>tribonucleation</em>, and it was filmed for the first time in a
              2015 real-time MRI study by Kawchuk and colleagues.
            </p>
            <p>
              The bubble takes around 20 minutes to dissolve back into the fluid — which is why you
              usually can't crack the same knuckle twice in quick succession. No cartilage, ligament
              or bone is being damaged in the process.
            </p>
          </div>
        </div>
      </section>

      {/* Evidence */}
      <section id="evidence" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <Badge variant="secondary" className="mb-4 bg-background text-primary border-0">
              <Activity className="h-3 w-3 mr-1 inline" /> The evidence
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              What the research actually shows
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Four studies, three decades, one consistent finding.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {evidence.map((e) => (
              <Card key={e.title} className="p-6 border border-border/40">
                <h3 className="font-display text-lg font-semibold mb-2">{e.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{e.text}</p>
              </Card>
            ))}
          </div>
          <p className="text-sm text-muted-foreground italic mt-6 max-w-3xl">
            Even Dr Donald Unger — who cracked the knuckles of one hand only for 60 years and
            published his self-experiment in <em>Arthritis & Rheumatism</em> in 1998 — found no
            difference in arthritis between his two hands. The work earned him a 2009 Ig Nobel Prize
            in Medicine.
          </p>
        </div>
      </section>

      {/* Toes specifically */}
      <section className="py-16 lg:py-24 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-5">
            What about cracking your toes?
          </h2>
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              Toe cracking has been studied much less than knuckle cracking, but the joint anatomy
              and the gas-bubble mechanism are identical. There is{" "}
              <strong>no evidence that cracking your toes causes arthritis</strong>, and no
              plausible biological reason it would.
            </p>
            <p>
              One nuance worth flagging: if your big toe feels stiff or sore when it cracks, that
              can be an early sign of <strong>hallux rigidus</strong> — a form of osteoarthritis at
              the base of the big toe — or a developing bunion. The cracking didn't cause it; the
              underlying joint change is what makes the toe more likely to click. If pain or
              stiffness is involved, it's worth seeing a GP or podiatrist.
            </p>
          </div>
        </div>
      </section>

      {/* Can / can't cause */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              What cracking can — and cannot — cause
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The honest version, with no scaremongering and no false reassurance.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Card className="p-6 border border-border/40 bg-background">
              <h3 className="font-display text-xl font-semibold mb-4 text-primary">
                What it can (mildly) cause
              </h3>
              <ul className="space-y-2.5">
                {whatItCanCause.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-relaxed"
                  >
                    <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-6 border border-border/40 bg-background">
              <h3 className="font-display text-xl font-semibold mb-4 text-primary">
                What it does not cause
              </h3>
              <ul className="space-y-2.5">
                {whatItDoesNotCause.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-relaxed"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Red flags */}
      <section className="py-16 lg:py-24 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <Card className="p-8 border-l-4 border-l-rose-500 bg-primary/5">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h2 className="font-display text-2xl font-bold mb-3">
                  When cracking is a red flag
                </h2>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  The cracking sound itself is harmless. But if it is paired with any of the
                  following, see a GP — these are signs of a joint problem that existed before the
                  cracking and that needs proper assessment:
                </p>
                <ul className="space-y-2.5">
                  {redFlags.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-relaxed"
                    >
                      <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                  Read more in our guide to{" "}
                  <Link to="/conditions/osteoarthritis" className="text-primary underline">
                    osteoarthritis symptoms
                  </Link>{" "}
                  and our page on{" "}
                  <Link to="/arthritis-flare-ups" className="text-primary underline">
                    arthritis flare-ups
                  </Link>
                  .
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* What actually causes arthritis */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              What actually causes arthritis
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The real risk factors — none of which are joint cracking.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {realCauses.map((c) => (
              <Card key={c.title} className="p-6 border border-border/40">
                <h3 className="font-display text-lg font-semibold mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What to do instead */}
      <section className="py-16 lg:py-24 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <Badge variant="secondary" className="mb-4 bg-background text-primary border-0">
              <Hand className="h-3 w-3 mr-1 inline" /> Healthier alternatives
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              What to do instead if you crack out of habit
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              You don't have to stop. But if you want to, these four work better than willpower.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {insteadOfCracking.map((s) => (
              <Card key={s.title} className="p-6 border border-border/40 bg-background">
                <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/exercises">
                Open the exercise hub <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/self-help">Try the self-help tool</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <Badge variant="secondary" className="mb-4 bg-background text-primary border-0">
            <HelpCircle className="h-3 w-3 mr-1 inline" /> FAQ
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Common questions
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <Card key={f.q} className="p-6 border border-border/40">
                <h3 className="font-display text-lg font-semibold mb-2">{f.q}</h3>
                <p className="text-sm text-foreground/85 leading-relaxed">{f.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="py-16 lg:py-24 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-5">
            Sources
          </h2>
          <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed list-disc pl-5">
            <li>
              Castellanos J, Axelrod D.{" "}
              <em>
                Effect of habitual knuckle cracking on hand function. Annals of the Rheumatic
                Diseases, 1990
              </em>.{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/2339832/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                PubMed
              </a>
            </li>
            <li>
              Deweber K, Olszewski M, Ortolano R.{" "}
              <em>
                Knuckle cracking and hand osteoarthritis. Journal of the American Board of Family
                Medicine, 2011
              </em>.{" "}
              <a
                href="https://www.jabfm.org/content/24/2/169"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                JABFM
              </a>
            </li>
            <li>
              Kawchuk GN, Fryer J, Jaremko JL, Zeng H, Rowe L, Thompson R.{" "}
              <em>
                Real-time visualization of joint cavitation. PLOS ONE, 2015
              </em>.{" "}
              <a
                href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0119470"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                PLOS ONE
              </a>
            </li>
            <li>
              Boutin RD, Netto AP, Nakamura D, et al.{" "}
              <em>
                "Knuckle cracking": can blinded observers detect changes with physical examination
                and sonography? Clinical Anatomy, 2017
              </em>.{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/28342118/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                PubMed
              </a>
            </li>
            <li>
              Unger DL.{" "}
              <em>
                Does knuckle cracking lead to arthritis of the fingers? Arthritis & Rheumatism, 1998
              </em>.{" "}
              <a
                href="https://onlinelibrary.wiley.com/doi/10.1002/art.1780410528"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Wiley
              </a>
            </li>
          </ul>
          <p className="text-xs text-muted-foreground italic mt-6">
            This article is for general information and is not a substitute for personalised medical
            advice. If you have joint pain, swelling or stiffness, please speak to your GP.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
