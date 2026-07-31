import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Apple,
  Dumbbell,
  HeartPulse,
  Stethoscope,
  CheckCircle2,
  Loader2,
  Download,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";

const emailSchema = z
  .string()
  .trim()
  .email({ message: "Please enter a valid email" })
  .max(255);

const PREVIEW_PAGES = [
  {
    page: "01",
    icon: Stethoscope,
    title: "Understanding Your Diagnosis",
    body:
      "Plain-English explanations of osteoarthritis, rheumatoid, and psoriatic arthritis — what's happening in your joints and what it means for your day-to-day.",
  },
  {
    page: "04",
    icon: HeartPulse,
    title: "The Care Pathway, Demystified",
    body:
      "From your GP appointment to rheumatology referral, biologics and joint injections — exactly what to expect and the questions to ask at each step.",
  },
  {
    page: "07",
    icon: Apple,
    title: "Anti-Inflammatory Eating",
    body:
      "Mediterranean-style meal ideas, an anti-inflammatory shopping list, and the foods strong evidence suggests you should eat more (and less) of.",
  },
  {
    page: "10",
    icon: Dumbbell,
    title: "5-Minute Daily Mobility",
    body:
      "Three gentle, joint-by-joint routines designed for stiff mornings, flare days, and building up strength — no equipment, no gym needed.",
  },
  {
    page: "12",
    icon: BookOpen,
    title: "Tracking, Flares & Sleep",
    body:
      "A simple pain-and-mood tracker, evidence-based flare-up strategies, and how to protect the sleep that helps your joints recover.",
  },
  {
    page: "14",
    icon: ShieldCheck,
    title: "Benefits, PIP & Your Rights",
    body:
      "Working with arthritis, applying for PIP, and the support you're entitled to in the UK — written in human language, not government jargon.",
  },
];

const FAQS = [
  {
    q: "Is the guide really free?",
    a: "Yes — completely free, no credit card, no trial. We're a not-for-profit project supporting people across the UK living with arthritis. Enter your email and we'll send the PDF straight to your inbox.",
  },
  {
    q: "Who wrote it?",
    a: "The guide was compiled with input from physiotherapists and reviewed against national clinical and NICE guidance. Every recommendation is referenced to a public-health source — we don't sell supplements or treatments.",
  },
  {
    q: "What format will I receive?",
    a: "A 14-page PDF, optimised for both screen reading and printing at home. You'll receive a download link in your welcome email moments after subscribing.",
  },
  {
    q: "Will you spam me?",
    a: "No. You'll receive the guide immediately, then occasional updates (typically once a month) with new evidence-based articles. You can unsubscribe in one click from any email.",
  },
  {
    q: "Is the advice tailored to the UK?",
    a: "Yes — every section references UK rheumatology pathways, and benefits like PIP. It's specifically written for people accessing care in England, Scotland, Wales, and Northern Ireland.",
  },
  {
    q: "Can I share it with family or my GP?",
    a: "Absolutely. We encourage you to share the PDF with loved ones, carers, or your healthcare team. It's designed to be a starting point for better conversations about your joint health.",
  },
];

export default function ArthritisStarterGuide() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  // JSON-LD for SEO (FAQ schema)
  useEffect(() => {
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    document.head.appendChild(ld);
    trackEvent("starter_guide_view", { path: "/arthritis-starter-guide" });
    return () => {
      document.head.removeChild(ld);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast({
        title: "Invalid email",
        description: parsed.error.issues[0]?.message ?? "Please check your email address.",
        variant: "destructive",
      });
      trackEvent("starter_guide_submit_failure", { reason: "invalid_email" });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscriptions")
        .upsert(
          { email: parsed.data, source: "starter_guide_landing", is_active: true },
          { onConflict: "email" },
        );
      if (error) throw error;

      setSuccess(true);
      toast({
        title: "Check your inbox",
        description: "Your free Arthritis Starter Guide is on its way.",
      });
      trackEvent("starter_guide_submit_success", { source: "starter_guide_landing" });
      trackEvent("generate_lead", { method: "starter_guide_landing" });
    } catch (err) {
      console.error("[StarterGuide] subscribe error", err);
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
      trackEvent("starter_guide_submit_failure", {
        reason: "supabase_error",
        message: err instanceof Error ? err.message : "unknown",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Free Arthritis Starter Guide (UK PDF)</title>
        <meta
          name="description"
          content="A free 14-page UK Arthritis Starter Guide with clinically aligned advice, anti-inflammatory meal ideas, and gentle joint mobility routines. Download instantly."
        />
        <meta property="og:title" content="Free UK Arthritis Starter Guide — 14-page PDF" />
        <meta
          property="og:description"
          content="clinically aligned advice, Mediterranean meal ideas, and 5-minute mobility routines. Sent free to your inbox."
        />
        <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free Arthritis Starter Guide (UK PDF) | Living With Arthritis" />
      <meta name="twitter:description" content="A free 14-page UK Arthritis Starter Guide with clinically aligned advice, anti-inflammatory meal ideas, and gentle joint mobility routines. Download instantly." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
    </Helmet>

      <Header />

      <main id="main-content" className="flex-1">
        <PageHero
          badge={
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/[0.06] text-primary text-[11px] font-bold uppercase tracking-[0.2em]">
              <Sparkles className="w-3 h-3" /> Free 14-page PDF
            </span>
          }
          title={
            <>
              The UK Arthritis <span className="italic text-primary">Starter Guide</span>
            </>
          }
          subtitle="Everything we wish someone had handed us on day one — clinically aligned advice, Mediterranean meal ideas, gentle daily mobility, and the benefits you may be entitled to. Written in human language."
        >
          {/* Hero signup card */}
          <div className="max-w-xl">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl bg-card border border-border/30 shadow-sm"
            >
              <Input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting || success}
                required
                maxLength={255}
                className="h-12 border-0 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                aria-label="Email address"
              />
              <Button
                type="submit"
                size="lg"
                className="h-12 px-6 font-semibold gap-2"
                disabled={submitting || success}
              >
                {success ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Sent
                  </>
                ) : submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" /> Send my free guide
                  </>
                )}
              </Button>
            </form>
            <p className="text-[11px] text-muted-foreground mt-3">
              No spam. Unsubscribe anytime. We never share your email.
            </p>
          </div>
        </PageHero>

        {/* Trust strip */}
        <section className="border-b border-border/15 bg-muted/20">
          <div className="container mx-auto px-6 md:px-12 max-w-[1200px] py-6 flex flex-wrap gap-x-8 gap-y-3 items-center justify-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" /> clinically aligned
            </span>
            <span className="opacity-30">·</span>
            <span>NICE-referenced</span>
            <span className="opacity-30">·</span>
            <span>Reviewed by physiotherapists</span>
            <span className="opacity-30">·</span>
            <span>Written in plain English</span>
          </div>
        </section>

        {/* Preview pages */}
        <section className="py-20 lg:py-24">
          <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
            <div className="max-w-2xl mb-12">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
                Inside the guide
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight leading-[1.1] text-foreground mb-4">
                14 pages, six chapters, zero fluff.
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                A preview of what you'll find inside. Every chapter is short, scannable, and designed to be read in under five minutes.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PREVIEW_PAGES.map((p) => (
                <article
                  key={p.page}
                  className="group relative rounded-2xl border border-border/30 bg-card p-6 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-5">
                    <span className="inline-flex w-11 h-11 rounded-xl bg-primary/[0.07] text-primary items-center justify-center">
                      <p.icon className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-muted-foreground">
                      PAGE {p.page}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* What you get / mid-page conversion band */}
        <section className="py-20 lg:py-24 bg-muted/30 border-y border-border/15">
          <div className="container mx-auto px-6 md:px-12 max-w-[1100px] grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
                What's included
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-foreground mb-6">
                The guide alone is enough to start tomorrow.
              </h2>
              <ul className="space-y-3.5">
                {[
                  "14-page PDF, designed for screen and print",
                  "Mediterranean shopping list & 5 anti-inflammatory recipes",
                  "Three 5-minute daily mobility routines (PDF + photos)",
                  "Printable pain & mood tracker",
                  "PIP and benefits checklist for the UK",
                  "Plain-English care pathway map",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground/90">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="rounded-3xl border-2 border-primary/15 bg-card p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      Get it now
                    </p>
                    <p className="font-display text-lg font-bold text-foreground">
                      Free instant download
                    </p>
                  </div>
                </div>

                {success ? (
                  <div className="text-center py-4">
                    <div className="mx-auto w-12 h-12 rounded-2xl bg-primary dark:bg-primary/30 text-primary flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <p className="font-semibold text-foreground mb-1">Check your inbox</p>
                    <p className="text-sm text-muted-foreground">
                      Your guide is on its way to <strong>{email}</strong>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <Input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      maxLength={255}
                      className="h-12 text-base"
                      aria-label="Email address"
                      disabled={submitting}
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-12 text-base font-semibold gap-2"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" /> Send the PDF
                        </>
                      )}
                    </Button>
                    <p className="text-[11px] text-muted-foreground text-center">
                      Join 2,000+ readers · Unsubscribe in one click
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 lg:py-24">
          <div className="container mx-auto px-6 md:px-12 max-w-[820px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-3 text-center">
              Common questions
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-foreground mb-10 text-center">
              Everything you might be wondering.
            </h2>

            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`} className="border-border/30">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Still have a question? We're a small team and read every reply.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                Talk to a human →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
