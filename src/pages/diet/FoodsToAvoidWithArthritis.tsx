import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Beef,
  Cookie,
  Milk,
  Wine,
  Droplet,
  Leaf,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import PageHero from "@/components/ui/PageHero";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnswerBox from "@/components/seo/AnswerBox";
import MedicalReviewBadge from "@/components/MedicalReviewBadge";

const SITE = "https://livingwitharthritis.org.uk";
const PATH = "/diet/foods-to-avoid-with-arthritis";
const URL = `${SITE}${PATH}`;

const heroImage =
  "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=1600&q=80";

const triggers = [
  {
    icon: Droplet,
    title: "Refined seed & vegetable oils",
    text:
      "Sunflower, soybean, corn and 'vegetable oil' are high in omega-6 fats. When omega-6 vastly outweighs omega-3 — the typical UK pattern — inflammation rises. Swap for extra virgin olive oil or rapeseed oil.",
  },
  {
    icon: Cookie,
    title: "Added sugar & refined carbs",
    text:
      "Sugary drinks, biscuits, white bread and most breakfast cereals spike blood sugar and inflammatory markers (CRP, IL-6). UK guidance caps added sugar at 30g a day — aim for less if you have arthritis.",
  },
  {
    icon: Beef,
    title: "Processed meats",
    text:
      "Bacon, sausages, ham and salami carry advanced glycation end products (AGEs) and high salt, both linked with worse joint pain. Unprocessed lean meat in small portions is fine.",
  },
  {
    icon: Wine,
    title: "Excess alcohol",
    text:
      "More than 14 units a week raises inflammation, interferes with methotrexate and triggers gout flares. If you have an inflammatory flare, a 2–4 week alcohol-free trial often helps.",
  },
  {
    icon: AlertTriangle,
    title: "Ultra-processed ready meals",
    text:
      "Ready meals, crisps and processed snacks combine refined oils, salt, sugar and emulsifiers. A 2024 BMJ review linked higher ultra-processed intake with greater joint pain and stiffness.",
  },
  {
    icon: Milk,
    title: "Dairy — only if you react to it",
    text:
      "Most people with arthritis tolerate dairy well, and yoghurt and cheese are part of the Mediterranean pattern. A small subgroup feels better without it — try a 4-week elimination if you suspect a trigger.",
  },
];

const eatInstead = [
  "Extra virgin olive oil as your main cooking fat",
  "Oily fish (salmon, mackerel, sardines) two to three times a week",
  "Berries, leafy greens, broccoli, peppers — five-a-day, every day",
  "Lentils, chickpeas and beans, three or more portions a week",
  "Turmeric and ginger in cooking, plus a daily handful of unsalted nuts",
  "Wholegrains — oats, brown rice, wholemeal bread, bulgur",
];

const myths = [
  {
    q: "Are nightshades (tomatoes, peppers, potatoes, aubergine) bad for arthritis?",
    a: "There is no good evidence that nightshades worsen arthritis for most people. They are rich in antioxidants and recommended in every anti-inflammatory eating pattern. If you suspect a personal trigger, run a 4-week elimination and reintroduction — but don't cut them out blindly.",
  },
  {
    q: "Should I avoid all red meat?",
    a: "No. Unprocessed lean red meat (steak, mince, lamb) in palm-sized portions once or twice a week is fine and provides iron, B12 and zinc. The risk sits with processed red meat — bacon, sausages, salami — and very large or charred portions.",
  },
  {
    q: "Is gluten a problem if I have arthritis?",
    a: "Only if you have coeliac disease or a confirmed gluten sensitivity — both are testable. For most people with osteoarthritis or rheumatoid arthritis, wholegrain wheat, oats and barley reduce inflammation rather than worsening it.",
  },
  {
    q: "Does sugar really cause arthritis flares?",
    a: "Yes — for many people. Trials show high added-sugar intake raises inflammatory markers within days. Cutting sugary drinks alone often eases morning stiffness within 2–3 weeks.",
  },
];

const faqs = [
  {
    q: "What foods make arthritis worse?",
    a: "The strongest evidence points to ultra-processed foods, refined seed oils, added sugar, processed meats and excess alcohol. These raise inflammatory markers in the blood (CRP, IL-6) and consistently track with worse joint pain and stiffness in arthritis studies.",
  },
  {
    q: "How quickly will cutting trigger foods help my joints?",
    a: "Energy and digestion often improve within 1–2 weeks. Joint pain and morning stiffness typically begin to ease at 4–6 weeks of consistent change, with the clearest improvement at 12 weeks. Consistency matters more than perfection.",
  },
  {
    q: "Is red meat bad for arthritis?",
    a: "Unprocessed lean red meat in small portions is fine for most people. The problem is processed red meat — bacon, sausages, ham — which contains nitrates, high salt and advanced glycation end products linked with worse inflammation.",
  },
  {
    q: "Should I cut out dairy if I have arthritis?",
    a: "Not by default. Most studies find yoghurt and small amounts of cheese reduce inflammation rather than worsening it. A minority of people feel better without dairy — try a 4-week elimination and reintroduction if you suspect it.",
  },
  {
    q: "Does coffee make arthritis worse?",
    a: "Moderate coffee (2–3 cups a day) is not linked with worse arthritis and may slightly reduce inflammation. Watch the added sugar, syrups and large oat-milk lattes — that is usually where the inflammatory load sits.",
  },
  {
    q: "Is alcohol safe with arthritis medication?",
    a: "Light drinking (under 14 units a week, spread across the week) is usually safe. If you take methotrexate, leflunomide or regular NSAIDs, alcohol increases the risk of liver and stomach problems — discuss your limit with your GP.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Foods to Avoid With Arthritis: A UK Evidence-Based Guide",
  description:
    "Plain-English UK guide to the foods that worsen arthritis inflammation — and what to eat instead. Reviewed by a HCPC-registered clinician.",
  inLanguage: "en-GB",
  image: heroImage,
  datePublished: "2026-06-21",
  dateModified: "2026-06-21",
  author: {
    "@type": "Organization",
    name: "Living With Arthritis UK Clinical Team",
    url: SITE,
  },
  publisher: {
    "@type": "Organization",
    name: "Living With Arthritis UK",
    url: SITE,
  },
};

const medicalWebPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Foods to Avoid With Arthritis (UK Guide)",
  description:
    "Evidence-based UK guide to foods that worsen arthritis inflammation, with practical alternatives.",
  url: URL,
  inLanguage: "en-GB",
  lastReviewed: "2026-06-21",
  reviewedBy: {
    "@type": "Person",
    name: "Maxwell",
    jobTitle: "First Contact Practitioner — Chartered Physiotherapist",
    identifier: "HCPC PH128483",
    affiliation: {
      "@type": "MedicalOrganization",
      name: "Chartered Society of Physiotherapy (CSP)",
    },
  },
  audience: {
    "@type": "MedicalAudience",
    audienceType: "Patient",
    geographicArea: { "@type": "Country", name: "United Kingdom" },
  },
  about: { "@type": "MedicalCondition", name: "Arthritis" },
  specialty: "Rheumatology",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".speakable-intro"],
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

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Diet", item: `${SITE}/diet` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Foods to Avoid With Arthritis",
      item: URL,
    },
  ],
};

export default function FoodsToAvoidWithArthritis() {
  useEffect(() => {
    const scripts = [
      articleJsonLd,
      medicalWebPageJsonLd,
      faqJsonLd,
      breadcrumbJsonLd,
    ].map((data) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.text = JSON.stringify(data);
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => document.head.removeChild(s));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Foods to Avoid With Arthritis"
        description="Which foods worsen arthritis? Evidence-based UK guide to the foods that drive joint inflammation, what to eat instead, and how quickly diet change helps."
        path={PATH}
        type="article"
        keywords="foods to avoid with arthritis, foods that worsen arthritis UK, anti inflammatory diet arthritis, arthritis trigger foods, what not to eat arthritis"
      />
      <Header />

      <PageBreadcrumb
        segments={[
          { label: "Diet", href: "/diet" },
          { label: "Foods to Avoid With Arthritis" },
        ]}
      />

      <PageHero
        badge={
          <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
            Diet · UK · Evidence-based
          </Badge>
        }
        title="Foods to Avoid With Arthritis"
        subtitle="A plain-English UK guide to the foods that drive joint inflammation — and the simple swaps that ease pain within weeks."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href="#triggers">
              See the trigger foods <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/diet/mediterranean-diet-for-arthritis">7-day eating plan</Link>
          </Button>
        </div>
      </PageHero>

      {/* Hero image */}
      <section className="bg-secondary/30 border-b border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px] py-10">
          <figure className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={heroImage}
              alt="An assortment of ultra-processed foods, sugary drinks and biscuits on a kitchen counter"
              className="w-full h-auto object-cover"
              loading="eager"
              decoding="async"
              width={1600}
              height={900}
            />
          </figure>
        </div>
      </section>

      {/* Answer box */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <AnswerBox
            question="What foods should I avoid with arthritis?"
            reviewed="2026-06-21"
          >
            The strongest evidence points to five groups: refined seed oils
            (sunflower, soybean, corn), added sugar and refined carbs,
            processed meats (bacon, sausages, ham), ultra-processed ready
            meals and excess alcohol. Each raises inflammatory markers in the
            blood and consistently tracks with worse joint pain. Cutting them
            and eating a Mediterranean pattern instead typically eases
            stiffness within 4–6 weeks.
          </AnswerBox>
          <MedicalReviewBadge
            reviewer="Maxwell"
            title="First Contact Practitioner"
            credential="HCPC PH128483"
            date="June 2026"
          />
        </div>
      </section>

      {/* Trigger foods */}
      <section id="triggers" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-0">
              <AlertTriangle className="h-3 w-3 mr-1 inline" /> Trigger foods
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              The six foods most likely to worsen joint inflammation
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Not a list to demonise. A list to reduce — most of the time, in
              most meals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {triggers.map((t) => (
              <Card key={t.title} className="p-6 border border-border/40">
                <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                  <t.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {t.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.text}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What to eat instead */}
      <section className="py-16 lg:py-24 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[1000px]">
          <div className="max-w-2xl mb-10">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-0">
              <Leaf className="h-3 w-3 mr-1 inline" /> Eat instead
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              What to put on your plate instead
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Replacing trigger foods works far better than restricting them.
              Build meals around these six anchors.
            </p>
          </div>
          <Card className="p-8 border border-border/40 bg-background">
            <ul className="space-y-4">
              {eatInstead.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-border/40">
              <Button asChild>
                <Link to="/diet/mediterranean-diet-for-arthritis">
                  See the full 7-day Mediterranean plan{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Myths */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Common myths about arthritis trigger foods
          </h2>
          <div className="space-y-6">
            {myths.map((m) => (
              <div key={m.q} className="pl-5 border-l-4 border-primary">
                <h3 className="font-display text-xl font-semibold mb-2">
                  {m.q}
                </h3>
                <p className="text-base text-foreground leading-relaxed">
                  {m.a}
                </p>
              </div>
            ))}
          </div>
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
                <h3 className="font-display text-lg font-semibold mb-2">
                  {f.q}
                </h3>
                <p className="text-base text-foreground leading-relaxed">
                  {f.a}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Internal link cluster */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Complete your arthritis strategy
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            <Link
              to="/diet/mediterranean-diet-for-arthritis"
              className="block p-6 border border-border/40 rounded-lg hover:bg-secondary/40 transition-colors"
            >
              <h3 className="font-display text-lg font-semibold mb-2">
                Mediterranean diet plan
              </h3>
              <p className="text-sm text-muted-foreground">
                The 7-day eating plan, UK shopping list and five
                anti-inflammatory recipes.
              </p>
            </Link>
            <Link
              to="/supplements"
              className="block p-6 border border-border/40 rounded-lg hover:bg-secondary/40 transition-colors"
            >
              <h3 className="font-display text-lg font-semibold mb-2">
                Supplements that help
              </h3>
              <p className="text-sm text-muted-foreground">
                Evidence for omega-3, curcumin, glucosamine and collagen — and
                what to skip.
              </p>
            </Link>
            <Link
              to="/guides/exercise"
              className="block p-6 border border-border/40 rounded-lg hover:bg-secondary/40 transition-colors"
            >
              <h3 className="font-display text-lg font-semibold mb-2">
                Exercise for arthritis
              </h3>
              <p className="text-sm text-muted-foreground">
                Low-impact, evidence-based exercise to pair with diet for the
                biggest pain reduction.
              </p>
            </Link>
            <Link
              to="/conditions/knee-arthritis"
              className="block p-6 border border-border/40 rounded-lg hover:bg-secondary/40 transition-colors"
            >
              <h3 className="font-display text-lg font-semibold mb-2">
                Knee arthritis
              </h3>
              <p className="text-sm text-muted-foreground">
                Symptoms, exercises and treatment options for knee
                osteoarthritis.
              </p>
            </Link>
            <Link
              to="/conditions/osteoarthritis"
              className="block p-6 border border-border/40 rounded-lg hover:bg-secondary/40 transition-colors"
            >
              <h3 className="font-display text-lg font-semibold mb-2">
                Osteoarthritis overview
              </h3>
              <p className="text-sm text-muted-foreground">
                The full UK guide to osteoarthritis: causes, diagnosis and
                long-term management.
              </p>
            </Link>
            <Link
              to="/living-with-arthritis"
              className="block p-6 border border-border/40 rounded-lg hover:bg-secondary/40 transition-colors"
            >
              <h3 className="font-display text-lg font-semibold mb-2">
                Living with arthritis
              </h3>
              <p className="text-sm text-muted-foreground">
                Day-to-day strategies for pain, work, sleep, mood and
                relationships.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
