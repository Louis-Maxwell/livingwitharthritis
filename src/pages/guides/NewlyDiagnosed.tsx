import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Printer,
  ArrowRight,
  ChevronRight,
  ClipboardList,
  Stethoscope,
  Pill,
  Activity,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AeoEnhancement from "@/components/seo/AeoEnhancement";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import FaqAccordion from "@/components/faq/FaqAccordion";

const BASE = "https://livingwitharthritis.org.uk";
const SLUG = "guides/newly-diagnosed";

interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  intro: string;
  checklist: string[];
  questions?: string[];
}

const SECTIONS: Section[] = [
  {
    id: "right-after",
    title: "1. Right after diagnosis",
    icon: Sparkles,
    intro:
      "The first few days after a diagnosis are often the hardest. You don’t need to do everything at once — start with these basics so the rest of the journey is easier to organise.",
    checklist: [
      "Ask for a copy of your diagnosis letter and any test results.",
      "Confirm exactly which type of arthritis you have (there are over 100).",
      "Ask what the likely progression looks like for your type.",
      "Request any written or printed education materials.",
      "Note the name and contact details of your specialist or clinic.",
    ],
    questions: [
      "Which type of arthritis do I have, and how was it diagnosed?",
      "What is the likely course over the next 1–5 years?",
      "Which treatments are available, and which do you recommend first?",
      "What lifestyle changes will make the biggest difference?",
      "Do I need to see a specialist (rheumatologist, physiotherapist)?",
    ],
  },
  {
    id: "first-appointment",
    title: "2. First appointment preparation",
    icon: ClipboardList,
    intro:
      "Specialist appointments can be short. Going in prepared dramatically improves what you get out of them — and helps your clinician understand the impact arthritis is having on your life.",
    checklist: [
      "Keep a 2-week symptom diary (pain levels, stiffness, flare triggers).",
      "Bring previous medical records or a one-page summary.",
      "Write down your top 3 questions in order of importance.",
      "Bring a list of all medications and supplements you currently take.",
      "Take a friend, family member or carer if possible.",
      "Ask if you can record the conversation for later review.",
    ],
    questions: [
      "What does my diagnosis mean for work, family and exercise?",
      "What are the side effects of the treatment you’re recommending?",
      "How will we know if treatment is working?",
      "When should I be referred for physiotherapy or occupational therapy?",
      "Who do I contact if I have a flare between appointments?",
    ],
  },
  {
    id: "understanding",
    title: "3. Understanding your diagnosis",
    icon: Stethoscope,
    intro:
      "Read up at your own pace. A good rule of thumb: stick to UK clinical guidelines (NICE), peer-reviewed sources and patient charities. Avoid social-media miracle cures — they’re almost always either useless or harmful.",
    checklist: [
      "Read the condition page for your specific type of arthritis.",
      "Understand the difference between flare-ups and overall progression.",
      "Learn the common myths (e.g., exercise damages joints — usually false).",
      "Note any red-flag symptoms that mean you should contact your team urgently.",
      "Talk to someone with the same diagnosis (our Connect Groups can help).",
    ],
  },
  {
    id: "treatment",
    title: "4. Starting treatment",
    icon: Pill,
    intro:
      "Most arthritis treatment combines medication, movement and lifestyle changes. Be patient — some medications take 6–12 weeks to reach full effect — and keep an honest log of what helps and what doesn’t.",
    checklist: [
      "Keep a medication diary (dose, time, side effects, missed doses).",
      "Set up repeat prescriptions through your GP or pharmacy app.",
      "Ask your pharmacist about interactions before starting supplements.",
      "Book a 6–12 week review to discuss whether treatment is working.",
      "Save the contact number for your rheumatology team in your phone.",
    ],
    questions: [
      "What side effects should I watch for, and which need urgent help?",
      "What blood tests do I need, and how often?",
      "Are there any vaccines I should have before starting treatment?",
      "Can I drink alcohol safely with this medication?",
      "What happens if I miss a dose or need to come off the medication?",
    ],
  },
  {
    id: "living-well",
    title: "5. Living well from day one",
    icon: Activity,
    intro:
      "Small, sustainable changes in the first few months set the foundation for the next decade. Pick one habit at a time — exercise, diet, sleep, stress — and build slowly.",
    checklist: [
      "Walk 20–30 minutes most days (or swim, cycle, do tai chi).",
      "Move towards a Mediterranean-style eating pattern.",
      "Aim for 7–9 hours of sleep — poor sleep amplifies pain.",
      "Tell your employer if adjustments would help (it’s your legal right).",
      "Connect with someone else who has arthritis — peer support changes outcomes.",
      "Bookmark our self-help tool, flare-up plan and exercise hub.",
    ],
  },
];

const FAQS: { q: string; a: string }[] = [
  { q: "I've just been newly diagnosed with rheumatoid arthritis in the UK — what are the first steps?", a: "Confirm the diagnosis letter and blood results, ask how urgently you will see rheumatology, start any prescribed DMARD monitoring (blood tests matter), keep a short symptom diary, and use trusted UK sources such as NHS rheumatoid arthritis pages and NRAS (nras.org.uk) for RA-specific support. Living With Arthritis (charity 1218461) is independent of Arthritis UK and publishes free checklists like this one." },
  { q: "Should I contact NRAS or Arthritis UK after an RA diagnosis?", a: "NRAS (National Rheumatoid Arthritis Society) specialises in rheumatoid arthritis and is a strong partner for RA-specific information and support. Arthritis UK (formerly Versus Arthritis) covers many arthritis types. Living With Arthritis is a separate UK charity — we link to NRAS and NHS as trusted partners, not as the same organisation." },
  { q: "How soon should treatment start after a new RA diagnosis?", a: "NICE guidance emphasises early treatment for rheumatoid arthritis. Ask your rheumatology team about DMARDs, bridging steroids if used, blood-test monitoring, and what to do if you flare before your next appointment. Do not stop prescribed medicines without clinical advice." },

  { q: "I’ve just been diagnosed — what should I do first?", a: "Get a copy of your diagnosis letter, confirm exactly which type of arthritis you have, write down your top 3 questions, and book a follow-up so you have someone to ask as new questions come up. Don’t rush major treatment decisions in the first week." },
  { q: "Will I become disabled?", a: "Most people with arthritis stay independent throughout their lives with the right treatment. Outcomes have improved dramatically over the last 20 years thanks to earlier diagnosis, better medications, and stronger evidence for exercise and self-management." },
  { q: "Should I stop exercising?", a: "No — almost the opposite. Appropriate exercise is one of the most effective treatments for arthritis. Start gently (walking, swimming, tai chi), build slowly, and work with a physiotherapist if you’re unsure where to begin." },
  { q: "Is arthritis hereditary?", a: "Genetics influences risk for several types of arthritis (especially rheumatoid and ankylosing spondylitis), but isn’t the whole story. Lifestyle, weight, joint injuries and environment all play significant roles." },
  { q: "Can I still work?", a: "Yes — most people with arthritis continue working. You have legal protection under the Equality Act 2010, including the right to reasonable adjustments. See our work-and-arthritis guide for details." },
  { q: "Do I need to change my diet?", a: "A Mediterranean-style diet has the strongest evidence for arthritis — plenty of vegetables, oily fish, olive oil, nuts and whole grains, with less red meat and processed food. There is no single magic food, but the overall pattern matters." },
  { q: "What about supplements?", a: "Some supplements (omega-3, turmeric/curcumin, vitamin D if deficient) have modest evidence. Glucosamine and chondroitin have mixed results. Always tell your prescriber before starting — several interact with arthritis medications." },
  { q: "When should I call my team between appointments?", a: "Contact them for: a sudden severe flare; signs of infection (fever, redness, swelling); new neurological symptoms (weakness, numbness); concerning medication side effects; or major mental health distress. Don’t wait if something feels wrong." },
  { q: "Can I claim any benefits?", a: "If arthritis significantly affects daily living or mobility, you may qualify for Personal Independence Payment (PIP). The claim is based on functional impact, not diagnosis. See our PIP guide for the step-by-step process." },
  { q: "How do I find other people with arthritis?", a: "Our free Connect Groups are facilitated peer communities — online and in-person, by condition or life stage. Sharing the experience with people who get it makes a real difference to wellbeing and outcomes." },
];

export default function NewlyDiagnosed() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // JSON-LD: Article + FAQPage + Breadcrumb
  useEffect(() => {
    const nodes = [
      {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        headline:
          "Newly diagnosed rheumatoid arthritis UK: first steps checklist",
        url: `${BASE}/${SLUG}`,
        about: { "@type": "MedicalCondition", name: "Arthritis" },
        author: {
          "@type": "Person",
          name: "Maxwell",
          jobTitle: "HCPC-registered Physiotherapist (PH128483)",
        },
        lastReviewed: "2026-06-25",
        reviewedBy: {
          "@type": "Person",
          name: "Maxwell",
          jobTitle: "HCPC-registered Physiotherapist",
        },
      },
      // FAQPage intentionally not emitted here — <FaqAccordion> below covers it.
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Managing Arthritis",
            item: `${BASE}/living-with-arthritis`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Newly Diagnosed",
            item: `${BASE}/${SLUG}`,
          },
        ],
      },
    ].map((data) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.text = JSON.stringify(data);
      document.head.appendChild(el);
      return el;
    });
    return () => nodes.forEach((n) => n.remove());
  }, []);

  const progressPct = useMemo(() => {
    const idx = SECTIONS.findIndex((s) => s.id === activeId);
    return ((idx + 1) / SECTIONS.length) * 100;
  }, [activeId]);

  const handlePrint = () => {
    try {
      (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.(
        "event",
        "print_newly_diagnosed",
      );
    } catch {
      /* no-op */
    }
    window.print();
  };

  return (
    <>
      <Helmet>
        <title>Newly diagnosed rheumatoid arthritis UK: first steps checklist</title>
        <meta
          name="description"
          content="Newly diagnosed rheumatoid arthritis in the UK? First steps checklist — rheumatology, DMARDs, NRAS/NHS support, exercise and PIP. Living With Arthritis charity 1218461."
        />
        <meta
          property="og:title"
          content="Newly diagnosed rheumatoid arthritis UK: first steps checklist"
        />
        <meta
          property="og:description"
          content="Newly diagnosed rheumatoid arthritis in the UK? First steps checklist — rheumatology, DMARDs, NRAS/NHS support, exercise and PIP. Living With Arthritis charity 1218461."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${BASE}/${SLUG}`} />
        <meta property="og:locale" content="en_GB" />
        <meta name="geo.region" content="GB" />
        <link rel="alternate" hrefLang="en-GB" href={`${BASE}/${SLUG}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "url": `${BASE}/${SLUG}`,
          "name": "Newly diagnosed rheumatoid arthritis UK: first steps checklist",
          "inLanguage": "en-GB",
          "areaServed": { "@type": "Country", "name": "United Kingdom" },
          "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".speakable-intro"] },
        })}</script>
      </Helmet>

      <main id="main-content" className="bg-background">
        {/* Sticky progress strip */}
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border print:hidden">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl py-2 flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hidden sm:inline">
              Your progress
            </span>
            <div
              className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={Math.round(progressPct)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-foreground tabular-nums">
              {SECTIONS.findIndex((s) => s.id === activeId) + 1}/{SECTIONS.length}
            </span>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-5xl py-10 md:py-14">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 print:hidden">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground hover:underline">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3" aria-hidden />
                <Link
                  to="/living-with-arthritis"
                  className="hover:text-foreground hover:underline"
                >
                  Managing Arthritis
                </Link>
              </li>
              <li className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3" aria-hidden />
                <span className="text-foreground font-medium">
                  Newly Diagnosed
                </span>
              </li>
            </ol>
          </nav>

          {/* Hero */}
          <header className="mb-8">
            <h1 className="font-display text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4">
              Newly diagnosed rheumatoid arthritis UK: your first steps
            </h1>
            <AeoEnhancement route="/guides/newly-diagnosed" />
            <p className="speakable-intro text-base md:text-lg text-muted-foreground leading-relaxed">
              Newly diagnosed rheumatoid arthritis (RA) in the UK? These first steps help you organise rheumatology care, understand DMARDs, use NHS and NRAS support carefully, and start safe movement — general information only, not personal medical advice. We are independent of Arthritis UK.
            </p>
          </header>

          {/* AnswerBox */}
          <aside
            aria-label="Quick answer"
            className="border-l-4 border-primary bg-accent/40 p-5 md:p-6 rounded-r-lg mb-6"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
              In one paragraph
            </p>
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              After an arthritis diagnosis, the first 4–6 weeks are about
              gathering information, preparing for your specialist appointment,
              starting any prescribed treatment, and making one or two small
              lifestyle changes (movement, diet, sleep). Most people with
              modern treatment stay independent and active for life.
            </p>
          </aside>


          <div className="flex flex-wrap gap-3 my-6 print:hidden">
            <Button onClick={handlePrint} variant="outline" className="gap-2">
              <Printer className="w-4 h-4" aria-hidden />
              Print this guide
            </Button>
            <Button asChild className="gap-2 bg-primary hover:bg-primary/90">
              <Link to="/symptom-checker">
                Try the symptom checker
                <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
            </Button>
          </div>

          {/* Section nav (desktop) */}
          <nav
            aria-label="Guide sections"
            className="hidden lg:block sticky top-16 float-right ml-8 w-60 print:hidden"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
              On this page
            </p>
            <ol className="space-y-1">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`block text-sm py-1.5 px-3 rounded-md transition-colors ${
                      activeId === s.id
                        ? "bg-accent text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <section
                key={s.id}
                id={s.id}
                className="my-12 scroll-mt-20"
                aria-labelledby={`${s.id}-heading`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex w-10 h-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="w-5 h-5" aria-hidden />
                  </span>
                  <h2
                    id={`${s.id}-heading`}
                    className="font-display text-2xl md:text-3xl font-black text-foreground"
                  >
                    {s.title}
                  </h2>
                </div>

                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  {s.intro}
                </p>

                <div className="rounded-xl border border-border bg-card p-5 md:p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">
                    Checklist
                  </h3>
                  <ul className="space-y-2">
                    {s.checklist.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm md:text-base text-foreground"
                      >
                        <span
                          className="mt-1 w-4 h-4 shrink-0 rounded border-2 border-primary"
                          aria-hidden
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {s.questions && (
                  <div className="rounded-xl border border-border bg-accent/30 p-5 md:p-6 mt-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">
                      What to ask your clinician
                    </h3>
                    <ol className="space-y-2 list-decimal list-inside">
                      {s.questions.map((q) => (
                        <li
                          key={q}
                          className="text-sm md:text-base text-foreground"
                        >
                          {q}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </section>
            );
          })}

          {/* FAQ */}
          <section
            aria-labelledby="faq-heading"
            className="my-16 border-t border-border pt-10"
          >
            <h2
              id="faq-heading"
              className="font-display text-2xl md:text-3xl font-black text-foreground mb-6"
            >
              Common questions after diagnosis
            </h2>
            <FaqAccordion
              idPrefix="newly-diagnosed-faq"
              items={FAQS.map((f) => ({ question: f.q, answer: f.a }))}
            />
          </section>

          <EducationalDisclaimerBox />
          <TopicClusterNav path="/guides/newly-diagnosed" />

          {/* Related */}
          <section className="my-12 border-t border-border pt-8 print:hidden">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Take the next step
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Symptom checker", href: "/symptom-checker" },
                { label: "Find a specialist", href: "/tools/find-specialist" },
                { label: "Arthritis pain relief", href: "/guides/arthritis-pain-relief" },
                { label: "Connect groups", href: "/community/connect-groups" },
                { label: "Drug guide", href: "/treatments/drug-guide" },
                { label: "Living with arthritis", href: "/living-with-arthritis" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="flex items-center justify-between gap-2 p-4 border border-border rounded-lg bg-card hover:border-primary hover:bg-accent/20 transition-colors group"
                  >
                    <span className="font-medium text-foreground">{l.label}</span>
                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
