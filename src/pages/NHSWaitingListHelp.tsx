import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Clock, Hospital, ArrowRight, Calculator, CheckCircle2, Phone, BookOpen } from "lucide-react";

const BASE = "https://livingwitharthritis.org.uk";

const FAQS = [
  {
    q: "How long is the NHS rheumatology waiting list in 2026?",
    a: "Typical NHS rheumatology waits in 2026 range from 14 to 22 weeks for first appointment in England, with regional variation. Scotland and Wales report similar averages. Use our free calculator for a personalised estimate.",
  },
  {
    q: "What can I do while I wait for my NHS arthritis appointment?",
    a: "Begin gentle low-impact exercise (swimming, walking, cycling), adopt an anti-inflammatory Mediterranean diet, manage your weight, and use our free self-help tools. Keep a pain journal to bring to your first appointment.",
  },
  {
    q: "Can I get faster access through the NHS?",
    a: "Ask your GP if you qualify for urgent referral (suspected inflammatory arthritis is treated as urgent). Patient Choice lets you select any NHS hospital in England — sometimes shorter waits exist nearby.",
  },
  {
    q: "Should I consider going private?",
    a: "Private rheumatology consultations cost £200–£350 in the UK. They're worth considering for diagnosis only — you can usually return to NHS care for treatment. Many hospitals operate hybrid pathways.",
  },
  {
    q: "What support does Living With Arthritis offer for waiting patients?",
    a: "Free symptom guidance, NHS-aligned exercise plans, an AI chatbot for questions 24/7, downloadable joint-care PDFs, and a community forum — all completely free for UK patients.",
  },
];

const NHSWaitingListHelp = () => {
  useEffect(() => {
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    const articleLd = {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: "NHS Arthritis Waiting List Help — Free UK Patient Support",
      description: "Stuck on the NHS rheumatology waiting list? Free, evidence-based help for UK arthritis patients while you wait.",
      url: `${BASE}/nhs-arthritis-waiting-list-help`,
      inLanguage: "en-GB",
      audience: { "@type": "MedicalAudience", audienceType: "Patient", geographicArea: { "@type": "Country", "name": "United Kingdom" } },
    };
    const s1 = document.createElement("script");
    s1.type = "application/ld+json";
    s1.text = JSON.stringify(faqLd);
    s1.dataset.nhswait = "1";
    document.head.appendChild(s1);
    const s2 = document.createElement("script");
    s2.type = "application/ld+json";
    s2.text = JSON.stringify(articleLd);
    s2.dataset.nhswait = "2";
    document.head.appendChild(s2);
    return () => {
      document.querySelectorAll("script[data-nhswait]").forEach((el) => el.remove());
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>NHS Arthritis Waiting List Help — Free UK Patient Support | Living With Arthritis</title>
        <meta name="description" content="Stuck on the NHS rheumatology waiting list? Get free, evidence-based arthritis help, exercises, diet plans and a waiting time calculator for UK patients." />
        <meta name="keywords" content="NHS arthritis waiting list, rheumatology waiting time UK, NHS rheumatology referral, arthritis help while waiting NHS" />
        <link rel="canonical" href={`${BASE}/nhs-arthritis-waiting-list-help`} />
        <meta property="og:title" content="NHS Arthritis Waiting List Help — UK Patient Support" />
        <meta property="og:description" content="Free, evidence-based help for UK arthritis patients waiting for NHS rheumatology." />
        <meta property="og:url" content={`${BASE}/nhs-arthritis-waiting-list-help`} />
        <meta name="geo.region" content="GB" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="NHS Arthritis Waiting List Help — Free UK Patient Support | Living With Arthritis" />
      <meta name="twitter:description" content="Stuck on the NHS rheumatology waiting list? Get free, evidence-based arthritis help, exercises, diet plans and a waiting time calculator for UK patients." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
    </Helmet>

      <Header />

      <PageBreadcrumb segments={[{ label: "NHS Waiting List Help" }]} />

      <main className="container mx-auto px-6 md:px-10 py-12 max-w-4xl">
        <div className="flex items-center gap-2 text-primary mb-3">
          <Hospital className="w-5 h-5" />
          <span className="text-sm font-medium uppercase tracking-wide">UK NHS Patient Guide</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5">
          NHS Arthritis Waiting List Help
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          Waiting for an NHS rheumatology appointment? You don't need to wait in pain. We provide free, clinically aligned guidance, exercises, and tools — built specifically for UK patients on the rheumatology waiting list.
        </p>

        <section className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6 mb-10">
          <div className="flex items-start gap-4">
            <Calculator className="w-7 h-7 text-primary shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">Free NHS Waiting Time Calculator</h2>
              <p className="text-muted-foreground mb-4">
                Estimate your wait based on your region, urgency and condition. Get a personalised action plan in 30 seconds.
              </p>
              <Link
                to="/tools/nhs-waiting-time"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-medium hover:bg-primary/90 transition"
              >
                Calculate my waiting time <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-5 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" /> What to do while you wait
          </h2>
          <ul className="space-y-3">
            {[
              { t: "Start gentle daily movement", d: "Walking, swimming or cycling — 20 minutes most days reduces pain." },
              { t: "Adopt an anti-inflammatory diet", d: "Mediterranean-style eating supports joint health and weight management." },
              { t: "Track your symptoms", d: "Use a pain journal to give your rheumatologist clear, useful information." },
              { t: "Join the community", d: "Connect with thousands of UK patients sharing tips and encouragement." },
              { t: "Use our AI chat 24/7", d: "Ask questions, get evidence-based answers any time of day." },
            ].map((x) => (
              <li key={x.t} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{x.t}</p>
                  <p className="text-sm text-muted-foreground">{x.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10 grid sm:grid-cols-2 gap-4">
          {[
            { to: "/exercises", icon: BookOpen, title: "Free exercise plans", desc: "NHS-aligned routines for every joint" },
            { to: "/diet", icon: BookOpen, title: "Anti-inflammatory diet", desc: "Mediterranean meal guidance" },
            { to: "/self-help", icon: BookOpen, title: "Self-help toolkit", desc: "Pain journal, symptom quiz" },
            { to: "/chat", icon: Phone, title: "Ask the AI chatbot", desc: "Evidence-based answers, 24/7" },
          ].map((x) => (
            <Link key={x.to} to={x.to} className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition group">
              <x.icon className="w-5 h-5 text-primary mb-2" />
              <p className="font-semibold group-hover:text-primary">{x.title}</p>
              <p className="text-sm text-muted-foreground">{x.desc}</p>
            </Link>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-5">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <details key={f.q} className="bg-card border border-border rounded-xl p-5 group">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  {f.q}
                  <span className="text-primary ml-3 group-open:rotate-45 transition">+</span>
                </summary>
                <p className="text-muted-foreground mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default NHSWaitingListHelp;
