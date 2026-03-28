import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { lazy, Suspense, useState } from "react";
import { Heart, Users, Trophy, Building2, ScrollText, ArrowRight, HandHeart, Send, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import PageHero from "@/components/ui/PageHero";

const Footer = lazy(() => import("@/components/Footer"));

const WAYS = [
  {
    icon: Heart,
    title: "Make a Donation",
    description: "Your gift directly funds physiotherapy sessions, exercise programmes and community support for people living with arthritis across the UK.",
    cta: "Donate Now",
    href: "/zakat-appeal",
    accent: "hsl(0,72%,51%)",
    highlight: true,
  },
  {
    icon: Users,
    title: "Volunteer With Us",
    description: "Share your time and skills — from peer mentoring to event support, there are many ways to get involved.",
    cta: "Sign Up Below",
    href: "#volunteer-form",
    accent: "hsl(152,69%,38%)",
    isAnchor: true,
  },
  {
    icon: Trophy,
    title: "Fundraise for Us",
    description: "Run a marathon, host a bake sale, or organise a sponsored event. We'll provide everything you need.",
    cta: "Start Fundraising",
    href: "/corporate-giving",
    accent: "hsl(38,92%,50%)",
  },
  {
    icon: Building2,
    title: "Corporate Partnerships",
    description: "Partner with us for sponsorship, employee engagement programmes and cause-related marketing.",
    cta: "Partner With Us",
    href: "/corporate-giving",
    accent: "hsl(199,89%,48%)",
  },
  {
    icon: ScrollText,
    title: "Leave a Legacy",
    description: "A gift in your will ensures future generations of people with arthritis receive the support they need.",
    cta: "Learn More",
    href: "/about",
    accent: "hsl(262,83%,58%)",
  },
];

const INTEREST_OPTIONS = [
  "Peer Mentoring",
  "Event Support",
  "Community Outreach",
  "Content & Blog Writing",
  "Social Media",
  "Fundraising",
  "Administration",
  "Other",
];

export default function WaysToHelp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", area_of_interest: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.area_of_interest) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("volunteer_signups" as any).insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        area_of_interest: formData.area_of_interest,
        message: formData.message.trim() || null,
      } as any);

      if (error) throw error;

      setSubmitted(true);
      toast.success("Thank you for volunteering! We'll be in touch soon.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Ways to Help | Living With Arthritis UK</title>
        <meta name="description" content="Discover how you can support people living with arthritis across the UK. Donate, volunteer, fundraise, partner with us or leave a legacy." />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/ways-to-help" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main id="main-content">
          <PageHero
            title="Ways to Help"
            subtitle="Every action — big or small — helps someone living with arthritis lead a fuller life."
          />

          {/* ── Engagement Cards ── */}
          <section className="py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
              {/* Intro line */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-bold text-primary tracking-wide uppercase">5 Ways to Make a Difference</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {WAYS.map((way, idx) => {
                  const Icon = way.icon;
                  const isFirst = idx === 0;
                  return (
                    <div
                      key={way.title}
                      className={`group relative bg-card border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                        isFirst
                          ? "sm:col-span-2 lg:col-span-1 border-primary/20 ring-1 ring-primary/10"
                          : "border-border/30"
                      }`}
                    >
                      {/* Top accent bar */}
                      <div
                        className="h-1 w-full"
                        style={{ backgroundColor: way.accent }}
                      />

                      <div className="p-6">
                        {/* Icon */}
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                          style={{ backgroundColor: `${way.accent}15`, color: way.accent }}
                        >
                          <Icon className="w-6 h-6" />
                        </div>

                        {/* Content */}
                        <h3 className="text-base font-bold text-foreground mb-2 tracking-tight">{way.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{way.description}</p>

                        {/* CTA */}
                        <Button
                          onClick={() => {
                            if ((way as any).isAnchor) {
                              document.getElementById("volunteer-form")?.scrollIntoView({ behavior: "smooth" });
                            } else {
                              navigate(way.href);
                            }
                          }}
                          size="sm"
                          className={`rounded-full text-xs font-bold group/btn ${
                            isFirst
                              ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
                              : "bg-foreground/5 hover:bg-foreground/10 text-foreground border border-border/40"
                          }`}
                        >
                          {way.cta}
                          <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── Volunteer Sign-Up Form ── */}
          <section id="volunteer-form" className="scroll-mt-24 py-16 sm:py-20 bg-muted/30 border-t border-border/10">
            <div className="container mx-auto px-4 sm:px-6 max-w-xl">
              {/* Section header */}
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                  <HandHeart className="w-6 h-6 text-emerald-600" />
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  Volunteer Sign-Up
                </h2>
                <p className="text-muted-foreground mt-2 text-sm max-w-sm mx-auto">
                  Tell us about yourself and how you'd like to help.
                </p>
              </div>

              {submitted ? (
                <div className="bg-card border border-emerald-200 dark:border-emerald-800 rounded-2xl p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1.5">Thank you!</h3>
                  <p className="text-sm text-muted-foreground">
                    We've received your application. A member of our team will be in touch within 5 working days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card border border-border/30 rounded-2xl p-5 sm:p-7 shadow-sm space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="vol-name" className="block text-xs font-semibold text-foreground mb-1">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="vol-name"
                      placeholder="e.g. Sarah Johnson"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      maxLength={100}
                      required
                      className="rounded-lg h-10"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="vol-email" className="block text-xs font-semibold text-foreground mb-1">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="vol-email"
                      type="email"
                      placeholder="sarah@example.co.uk"
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      maxLength={255}
                      required
                      className="rounded-lg h-10"
                    />
                  </div>

                  {/* Area of Interest */}
                  <div>
                    <label htmlFor="vol-interest" className="block text-xs font-semibold text-foreground mb-1">
                      Area of Interest <span className="text-destructive">*</span>
                    </label>
                    <Select
                      value={formData.area_of_interest}
                      onValueChange={(v) => setFormData((p) => ({ ...p, area_of_interest: v }))}
                    >
                      <SelectTrigger id="vol-interest" className="rounded-lg h-10">
                        <SelectValue placeholder="Select an area..." />
                      </SelectTrigger>
                      <SelectContent>
                        {INTEREST_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="vol-message" className="block text-xs font-semibold text-foreground mb-1">
                      Tell us about yourself <span className="text-muted-foreground font-normal">(optional)</span>
                    </label>
                    <Textarea
                      id="vol-message"
                      placeholder="Share relevant experience, availability, or why you'd like to volunteer..."
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      maxLength={2000}
                      rows={3}
                      className="rounded-lg resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-11 rounded-full text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {submitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>

                  <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
                    By submitting, you agree to our{" "}
                    <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>.
                    We'll only use your details to contact you about volunteering.
                  </p>
                </form>
              )}
            </div>
          </section>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}
