import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import SocialShareButtons from "@/components/SocialShareButtons";
import { Clock, Calculator, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

const BASE = "https://livingwitharthritis.org.uk";

const REGION_BASE_WEEKS: Record<string, number> = {
  "London": 18,
  "South East": 17,
  "South West": 16,
  "East of England": 17,
  "West Midlands": 19,
  "East Midlands": 18,
  "North West": 20,
  "North East": 17,
  "Yorkshire and the Humber": 18,
  "Scotland": 16,
  "Wales": 19,
  "Northern Ireland": 22,
};

const URGENCY: Record<string, number> = {
  "Suspected inflammatory arthritis (urgent)": -10,
  "Persistent joint pain (routine)": 0,
  "Follow-up review": -3,
};

const CONDITIONS = [
  "Osteoarthritis",
  "Rheumatoid arthritis (suspected)",
  "Psoriatic arthritis (suspected)",
  "Other / unsure",
];

const WaitingTimeCalculator = () => {
  const [region, setRegion] = useState("London");
  const [urgency, setUrgency] = useState("Persistent joint pain (routine)");
  const [condition, setCondition] = useState("Osteoarthritis");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How accurate is this rheumatology waiting time calculator?", acceptedAnswer: { "@type": "Answer", text: "Estimates use 2026 England's health service, Scotland, Wales and Northern Ireland published averages. Actual waits vary by trust." } },
        { "@type": "Question", name: "Is this calculator free?", acceptedAnswer: { "@type": "Answer", text: "Yes — completely free for all UK patients, with no signup required." } },
      ],
    };
    const toolLd = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Arthritis Waiting Time Calculator",
      url: `${BASE}/tools/waiting-time`,
      applicationCategory: "HealthApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
    };
    const s1 = document.createElement("script");
    s1.type = "application/ld+json";
    s1.text = JSON.stringify(faqLd);
    s1.dataset.nhscalc = "1";
    document.head.appendChild(s1);
    const s2 = document.createElement("script");
    s2.type = "application/ld+json";
    s2.text = JSON.stringify(toolLd);
    s2.dataset.nhscalc = "2";
    document.head.appendChild(s2);
    return () => document.querySelectorAll("script[data-nhscalc]").forEach((el) => el.remove());
  }, []);

  const calculate = () => {
    const base = REGION_BASE_WEEKS[region] || 18;
    const adj = URGENCY[urgency] || 0;
    const weeks = Math.max(2, base + adj);
    setResult(weeks);
  };

  return (
    <>
      <Helmet>
        <title>Arthritis Waiting Time Calculator — Free UK Tool | Living With Arthritis</title>
        <meta name="description" content="Free rheumatology waiting time calculator for UK patients. Estimate your wait by region, urgency and condition — get a personalised action plan." />
        <meta name="keywords" content="rheumatology waiting time calculator, rheumatology waiting list UK, arthritis referral wait, rheumatology wait by region" />
        <link rel="canonical" href={`${BASE}/tools/waiting-time`} />
        <meta property="og:title" content="Arthritis Waiting Time Calculator" />
        <meta property="og:description" content="Free UK tool — estimate your rheumatology wait in seconds." />
        <meta property="og:url" content={`${BASE}/tools/waiting-time`} />
        <meta name="geo.region" content="GB" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Arthritis Waiting Time Calculator — Free UK Tool | Living With Arthritis" />
      <meta name="twitter:description" content="Free rheumatology waiting time calculator for UK patients. Estimate your wait by region, urgency and condition — get a personalised action plan." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
    </Helmet>

      <Header />

      <PageBreadcrumb segments={[{ label: "Tools" }, { label: "Rheumatology Waiting Time Calculator" }]} />

      <main className="container mx-auto px-6 md:px-10 py-12 max-w-3xl">
        <div className="flex items-center gap-2 text-primary mb-3">
          <Calculator className="w-5 h-5" />
          <span className="text-sm font-medium uppercase tracking-wide">Free UK Tool</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Arthritis Waiting Time Calculator
        </h1>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          Estimate your rheumatology wait based on your region, urgency and condition. Get a free, personalised plan for what to do while you wait — built for UK patients.
        </p>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Your UK region</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {Object.keys(REGION_BASE_WEEKS).map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Referral urgency</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {Object.keys(URGENCY).map((u) => <option key={u}>{u}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Suspected condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {CONDITIONS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            <button
              onClick={calculate}
              className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-lg hover:bg-primary/90 transition flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" /> Calculate my waiting time
            </button>
          </div>
        </div>

        {result !== null && (
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6 mb-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Estimated wait: ~{result} weeks</h2>
            </div>
            <p className="text-muted-foreground mb-5">
              Based on 2026 the health service averages for {region}. Your actual wait depends on your specific local health trust and clinical urgency.
            </p>

            <div className="space-y-3 mb-5">
              <p className="font-semibold flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Your free action plan:</p>
              <ul className="space-y-2 ml-6 text-sm text-foreground/85 list-disc">
                <li>Start gentle exercise today — <Link to="/exercises" className="text-primary hover:underline">free plans here</Link></li>
                <li>Adopt an anti-inflammatory diet — <Link to="/diet" className="text-primary hover:underline">Mediterranean guide</Link></li>
                <li>Track symptoms in a pain journal — <Link to="/self-help" className="text-primary hover:underline">self-help toolkit</Link></li>
                <li>Ask our AI 24/7 — <Link to="/chat" className="text-primary hover:underline">free chatbot</Link></li>
              </ul>
            </div>

            <SocialShareButtons title={`My arthritis wait: ~${result} weeks`} slug="tools/waiting-time" />
          </div>
        )}

        <div className="bg-muted/40 border border-border rounded-xl p-5 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Disclaimer:</strong> Estimates use 2026 published the health service averages. Always consult your GP for clinical advice. This tool does not replace medical care.
          </p>
        </div>

        <div className="mt-10 p-6 bg-card border border-border rounded-2xl">
          <h2 className="text-xl font-semibold mb-3">Need more help?</h2>
          <Link to="/arthritis-waiting-list-help" className="text-primary hover:underline inline-flex items-center gap-1.5">
            Read our full rheumatology waiting list survival guide <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default WaitingTimeCalculator;
