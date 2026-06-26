import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2, AlertCircle, CheckCircle2, Printer, Share2, Stethoscope, HandHeart, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const SYMPTOM_FAQS = [
  { q: "Is the symptom checker a diagnosis?", a: "No. It's an educational tool that suggests arthritis conditions whose typical pattern matches your answers. Only a GP or rheumatologist can diagnose arthritis using examination, blood tests and imaging." },
  { q: "Should I see a GP?", a: "Yes — book a GP appointment for any joint pain, swelling or stiffness that lasts more than two weeks, or any joint pain accompanied by fever, unexplained weight loss or a rash." },
  { q: "Can I print or share my results?", a: "Yes. Use the Print button to save a PDF or take it to your appointment, and use Share to send a summary to a family member or clinician." },
  { q: "What if my joints hurt all over?", a: "Pain in many joints can point to inflammatory arthritis (rheumatoid, psoriatic, lupus) or fibromyalgia. A GP can order blood tests (ESR, CRP, RF, anti-CCP, ANA) to help narrow it down." },
  { q: "How accurate is the matching?", a: "The tool uses well-documented symptom patterns, but real cases overlap. Treat results as a starting point for conversation with your clinician — not a definitive answer." },
];

interface Answers {
  location: string;
  duration: string;
  timing: string;
  swelling: string;
  coldSensitivity: string;
}

interface Result {
  slug: string;
  name: string;
  url: string;
  summary: string;
  confidence: string;
  reasoning: string;
}

const QUESTIONS: { key: keyof Answers; label: string; options: { value: string; label: string }[] }[] = [
  {
    key: "location", label: "Where is the pain mainly?",
    options: [
      { value: "knees", label: "Knees or hips" },
      { value: "hands", label: "Hands or fingers" },
      { value: "back", label: "Lower back or spine" },
      { value: "feet", label: "Feet or toes" },
      { value: "multiple", label: "Multiple joints / all over" },
    ],
  },
  {
    key: "duration", label: "How long have you had it?",
    options: [
      { value: "weeks", label: "A few weeks" },
      { value: "months", label: "Several months" },
      { value: "years", label: "A year or more" },
    ],
  },
  {
    key: "timing", label: "When is it worst?",
    options: [
      { value: "morning", label: "Mornings (stiff on waking)" },
      { value: "evening", label: "Evenings" },
      { value: "after-activity", label: "After activity" },
      { value: "constant", label: "Constantly" },
    ],
  },
  {
    key: "swelling", label: "Is there visible swelling?",
    options: [
      { value: "yes", label: "Yes, often" },
      { value: "sometimes", label: "Sometimes" },
      { value: "no", label: "No" },
    ],
  },
  {
    key: "coldSensitivity", label: "Do cold or damp days make it worse?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No / not sure" },
    ],
  },
];

export default function SymptomChecker() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isLast = step === QUESTIONS.length - 1;
  const current = QUESTIONS[step];

  const handleSelect = async (value: string) => {
    const next = { ...answers, [current.key]: value };
    setAnswers(next);
    if (!isLast) {
      setStep(step + 1);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke("symptom-ranker", {
        body: { answers: next },
      });
      if (fnErr) throw fnErr;
      if (data?.error) throw new Error(data.error);
      setResults(data.results ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setStep(0); setAnswers({}); setResults(null); setError(null); };

  const handlePrint = () => window.print();

  const handleShare = async () => {
    const top = results?.[0];
    const text = results
      ? `My Living With Arthritis symptom-checker results:\n\n${results
          .map((r, i) => `${i + 1}. ${r.name} (${r.confidence} match) — ${r.summary}`)
          .join("\n\n")}\n\nNot a diagnosis. Source: livingwitharthritis.org.uk/symptom-checker`
      : "";
    const shareData = { title: "My arthritis symptom-checker results", text, url: top ? `https://livingwitharthritis.org.uk${top.url}` : "https://livingwitharthritis.org.uk/symptom-checker" };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${text}\n\n${shareData.url}`);
        alert("Results copied to clipboard — you can paste them into an email or message.");
      }
    } catch {
      /* user dismissed share */
    }
  };

  return (
    <>
      <Helmet>
        <title>Symptom Checker — Living With Arthritis UK</title>
        <meta name="description" content="Arthritis symptom checker: Identify joint pain, stiffness, swelling causes. Get condition guidance & appointment preparation tips." />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/symptom-checker" />
        <meta property="og:title" content="Symptom Checker — Living With Arthritis UK" />
        <meta property="og:description" content="Arthritis symptom checker: Identify joint pain, stiffness, swelling causes. Get condition guidance & appointment preparation tips." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/symptom-checker" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Symptom Checker — Living With Arthritis UK" />
        <meta name="twitter:description" content="Arthritis symptom checker: Identify joint pain, stiffness, swelling causes. Get condition guidance & appointment preparation tips." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: SYMPTOM_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        })}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 md:px-10 py-16 md:py-24 max-w-2xl">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-foreground mb-3 tracking-tight">Symptom Checker</h1>
          <p className="text-lg text-muted-foreground mb-10">
            Five quick questions. We'll point you to the arthritis conditions most likely to fit your symptoms. Not a diagnosis — always see a GP for persistent pain.
          </p>

          {!results && !loading && (
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Question {step + 1} of {QUESTIONS.length}
                </span>
                <div className="flex gap-1">
                  {QUESTIONS.map((_, i) => (
                    <span key={i} className={`h-1.5 w-6 rounded-full ${i <= step ? "bg-primary" : "bg-border"}`} />
                  ))}
                </div>
              </div>
              <h2 className="section-header-left font-display text-2xl font-bold text-foreground mb-6">{current.label}</h2>
              <div className="space-y-3">
                {current.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className="w-full text-left px-5 py-4 rounded-xl border border-border hover:border-primary hover:bg-accent transition-colors font-medium text-foreground flex items-center justify-between group"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="mt-6 text-sm text-muted-foreground hover:text-primary">← Back</button>
              )}
            </div>
          )}

          {loading && (
            <div className="rounded-2xl border border-border bg-card p-12 text-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Matching your answers to conditions…</p>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 flex gap-3 items-start mb-6">
              <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-foreground">{error}</p>
                <button onClick={reset} className="text-sm text-primary mt-2 underline">Start again</button>
              </div>
            </div>
          )}

          {results && (
            <div className="print:p-0" id="symptom-results">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                <div>
                  <h2 className="section-header-left font-display text-2xl font-bold text-foreground mb-2">Your top matches</h2>
                  <p className="text-sm text-muted-foreground">Ranked from most to least likely based on your answers.</p>
                </div>
                <div className="flex gap-2 print:hidden">
                  <Button onClick={handlePrint} variant="outline" size="sm" className="gap-2">
                    <Printer className="w-4 h-4" /> Print / PDF
                  </Button>
                  <Button onClick={handleShare} variant="outline" size="sm" className="gap-2">
                    <Share2 className="w-4 h-4" /> Share
                  </Button>
                </div>
              </div>

              <div className="hidden print:block mb-6 text-xs text-muted-foreground border-b border-border pb-3">
                <p><strong>Living With Arthritis — Symptom Checker results</strong></p>
                <p>Generated {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                <p className="mt-1">Your answers: {Object.entries(answers).map(([k, v]) => `${k}: ${v}`).join(" · ")}</p>
              </div>

              <div className="space-y-4 mt-6">
                {results.map((r, i) => (
                  <Link
                    key={r.slug}
                    to={r.url}
                    className="block rounded-2xl border border-border bg-card p-6 hover:border-primary transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center">{i + 1}</span>
                        <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">{r.name}</h3>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-primary border border-primary/30 px-2 py-1 rounded-full whitespace-nowrap">
                        {r.confidence} match
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{r.summary}</p>
                    <div className="flex gap-2 items-start text-sm text-foreground/80">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{r.reasoning}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-4 print:hidden">
                      Read the full guide <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="hidden print:inline text-xs text-muted-foreground mt-3 block">
                      Full guide: livingwitharthritis.org.uk{r.url}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-10 print:hidden">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">What to do next</h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  <Link to="/guides/newly-diagnosed" className="rounded-xl border border-border p-4 hover:border-primary transition-colors group">
                    <Stethoscope className="w-5 h-5 text-primary mb-2" />
                    <p className="font-semibold text-foreground text-sm group-hover:text-primary">Prepare for your GP visit</p>
                    <p className="text-xs text-muted-foreground mt-1">Checklist, what to ask, printable summary.</p>
                  </Link>
                  {results[0] && (
                    <Link to={results[0].url} className="rounded-xl border border-border p-4 hover:border-primary transition-colors group">
                      <BookOpen className="w-5 h-5 text-primary mb-2" />
                      <p className="font-semibold text-foreground text-sm group-hover:text-primary">Learn about {results[0].name}</p>
                      <p className="text-xs text-muted-foreground mt-1">Full evidence-based guide with treatment options.</p>
                    </Link>
                  )}
                  <Link to="/community/connect-groups" className="rounded-xl border border-border p-4 hover:border-primary transition-colors group">
                    <HandHeart className="w-5 h-5 text-primary mb-2" />
                    <p className="font-semibold text-foreground text-sm group-hover:text-primary">Join a support group</p>
                    <p className="text-xs text-muted-foreground mt-1">Free UK peer-support communities.</p>
                  </Link>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 print:hidden">
                <Button onClick={reset} variant="outline">Start again</Button>
                <Button asChild><Link to="/chat">Talk to support</Link></Button>
                <Button asChild variant="outline"><Link to="/helpline">Helpline options</Link></Button>
              </div>

              <p className="text-xs text-muted-foreground mt-6">
                This tool is for education only and does not replace medical advice. Book a GP appointment for persistent joint pain, swelling or stiffness.
              </p>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
