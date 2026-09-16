/* eslint-disable @typescript-eslint/no-explicit-any */
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { lazy, Suspense, useState } from "react";
import {
  Heart, Users, Trophy, Building2, ScrollText, ArrowRight,
  HandHeart, Send, CheckCircle2, Quote, MapPin, Clock,
  Megaphone, Gift, Handshake, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { submitContactInquiry } from "@/lib/backendSubmit";
import { CONTACT_EMAILS } from "@/config/contact";

const Footer = lazy(() => import("@/components/Footer"));

const WAYS = [
  {
    icon: Heart,
    title: "Make a Donation",
    description: "Your gift directly funds physiotherapy sessions, exercise programmes and community support for people living with arthritis across the UK.",
    impact: "£10 funds a virtual physio session",
    cta: "Donate Now",
    href: "/donate",
    gradient: "from-primary to-secondary",
    bgLight: "bg-primary/5",
    iconColor: "text-primary",
    featured: true,
  },
  {
    icon: Users,
    title: "Volunteer With Us",
    description: "Share your time and skills — from peer mentoring to event support, there are many ways to get involved in your community.",
    impact: "200+ volunteers across the UK",
    cta: "Sign Up Below",
    href: "#volunteer-form",
    gradient: "from-primary to-secondary",
    bgLight: "bg-primary/5",
    iconColor: "text-primary",
    isAnchor: true,
  },
  {
    icon: Trophy,
    title: "Fundraise for Us",
    description: "Run a marathon, host a bake sale, or organise a sponsored event. We'll provide everything you need to get started.",
    impact: "£50K+ raised by supporters in 2025",
    cta: "Start Fundraising",
    href: "/corporate-giving",
    gradient: "from-secondary to-primary",
    bgLight: "bg-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Building2,
    title: "Corporate Partnerships",
    description: "Partner with us for sponsorship, employee engagement programmes, and cause-related marketing that makes a real difference.",
    impact: "Join 15+ corporate partners",
    cta: "Partner With Us",
    href: "/corporate-giving",
    gradient: "from-primary to-secondary",
    bgLight: "bg-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: ScrollText,
    title: "Leave a Legacy",
    description: "A gift in your will ensures future generations of people with arthritis receive the support they need to live well.",
    impact: "Legacies fund 30% of our work",
    cta: "Learn about leaving a legacy",
    href: "/about",
    gradient: "from-secondary to-primary",
    bgLight: "bg-primary/5",
    iconColor: "text-primary",
  },
];

const IMPACT_STATS = [
  { number: "10M+", label: "People with arthritis in the UK", icon: Users },
  { number: "5,000+", label: "People supported through our services", icon: Heart },
  { number: "200+", label: "Volunteers across the UK", icon: HandHeart },
  { number: "£0", label: "Cost to access our services", icon: Gift },
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
      const result = await submitContactInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: "Volunteer enquiry",
        message: [
          "Interest: " + formData.area_of_interest,
          formData.message.trim() || "",
        ].filter(Boolean).join("\n"),
      });
      if (result.ok) toast.success(result.message);
      else toast.message(result.message);
      setSubmitted(true);
    } catch {
      toast.error(`Something went wrong. Please email ${CONTACT_EMAILS.info}.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Ways to Help | Living With Arthritis UK</title>
        <meta name="description" content="Discover how you can support people living with arthritis across the UK. Donate, volunteer, fundraise, partner with us or leave a legacy." />
        <meta name="keywords" content="volunteer for charity, donate to arthritis charity, fundraising ideas for health charity, arthritis events, arthritis advocacy, arthritis charity, arthritis foundation, arthritis research, arthritis awareness, arthritis support, joint pain charity, financial help for arthritis patients" />
      <meta property="og:title" content="Ways to Help | Living With Arthritis UK" />
      <meta property="og:description" content="Discover how you can support people living with arthritis across the UK. Donate, volunteer, fundraise, partner with us or leave a legacy." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/ways-to-help" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Ways To Help | Living With Arthritis UK" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Ways to Help | Living With Arthritis UK" />
      <meta name="twitter:description" content="Discover how you can support people living with arthritis across the UK. Donate, volunteer, fundraise, partner with us or leave a legacy." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
    </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main id="main-content">

          {/* ── Full-Width Hero ── */}
          <section className="relative bg-gradient-to-br from-primary/95 via-primary to-primary/80 text-primary-foreground overflow-hidden">
            {/* Decorative shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-background/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-background/5 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-background/[0.02] rounded-full" />
            </div>

            <div className="relative container mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-32 max-w-6xl">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/10 backdrop-blur-sm border border-background/10 mb-6">
                  <Heart className="w-3.5 h-3.5" />
                  <span className="text-xs font-semibold tracking-wide uppercase">Together We Can Make a Difference</span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
                  Every action helps someone live{" "}
                  <span className="relative">
                    <span className="relative z-10">a fuller life</span>
                    <span className="absolute bottom-1 left-0 right-0 h-3 bg-background/15 -skew-x-2 rounded" />
                  </span>
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-primary-foreground leading-relaxed max-w-2xl mb-8">
                  More than 10 million people across the UK live with arthritis. Your support — whether a donation, your time, or spreading the word — directly transforms lives.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => navigate("/donate")}
                    size="lg"
                    className="rounded-full bg-background text-primary hover:bg-background/90 font-bold shadow-lg shadow-primary/10 h-12 px-8"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Donate Now
                  </Button>
                  <Button
                    onClick={() => document.getElementById("volunteer-form")?.scrollIntoView({ behavior: "smooth" })}
                    size="lg"
                    variant="outline"
                    className="rounded-full border-background/30 text-primary-foreground hover:bg-background/10 font-bold h-12 px-8"
                  >
                    Volunteer With Us
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* ── Impact Stats Bar ── */}
          <section className="relative -mt-8 z-10">
            <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
              <div className="bg-card border border-border/40 rounded-2xl shadow-xl shadow-primary/5 p-6 sm:p-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  {IMPACT_STATS.map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="text-center">
                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-2">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">{stat.number}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-snug">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* ── Ways to Get Involved ── */}
          <section className="py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
              {/* Section header */}
              <div className="text-center mb-14">
                <p className="text-xs font-bold text-primary tracking-widest uppercase mb-3">Support Our Mission</p>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-3">
                  Five Ways You Can Help
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Whether you give financially, share your time, or help spread the word — every contribution makes a real difference.
                </p>
              </div>

              {/* Featured card (Donate) */}
              {WAYS.filter(w => w.featured).map((way) => {
                const Icon = way.icon;
                return (
                  <div
                    key={way.title}
                    className="mb-8 bg-gradient-to-br from-primary to-primary dark:from-primary/30 dark:to-primary/20 border border-primary/50 dark:border-primary/30 rounded-3xl overflow-hidden"
                  >
                    <div className="flex flex-col lg:flex-row">
                      {/* Left: gradient accent */}
                      <div className={`lg:w-1/3 bg-gradient-to-br ${way.gradient} p-8 sm:p-10 lg:p-12 flex flex-col justify-center text-primary-foreground`}>
                        <div className="w-16 h-16 rounded-2xl bg-background/20 backdrop-blur-sm flex items-center justify-center mb-5">
                          <Icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-2">{way.title}</h3>
                        <p className="text-sm text-primary-foreground font-medium">{way.impact}</p>
                      </div>

                      {/* Right: content */}
                      <div className="lg:w-2/3 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                          {way.description}
                        </p>
                        <ul className="space-y-2 mb-6">
                          {[
                            "100% of donations go towards patient services",
                            "Gift Aid (+25%) after HMRC registration is live",
                            "One-off or monthly giving options available",
                          ].map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div>
                          <Button
                            onClick={() => navigate(way.href)}
                            size="lg"
                            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 px-8 shadow-md"
                          >
                            {way.cta}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Other ways grid */}
              <div className="grid sm:grid-cols-2 gap-5">
                {WAYS.filter(w => !w.featured).map((way) => {
                  const Icon = way.icon;
                  return (
                    <div
                      key={way.title}
                      className={`group relative ${way.bgLight} border border-border/30 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${way.gradient} flex items-center justify-center mb-4 shadow-sm`}>
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>

                      <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight">{way.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2">{way.description}</p>

                      {/* Impact badge */}
                      <p className={`text-xs font-semibold ${way.iconColor} mb-5 flex items-center gap-1.5`}>
                        <Star className="w-3 h-3" />
                        {way.impact}
                      </p>

                      <Button
                        onClick={() => {
                          if (way.isAnchor) {
                            document.getElementById("volunteer-form")?.scrollIntoView({ behavior: "smooth" });
                          } else {
                            navigate(way.href);
                          }
                        }}
                        size="sm"
                        className="rounded-full text-xs font-bold bg-foreground/5 hover:bg-foreground/10 text-foreground border border-border/40"
                      >
                        {way.cta}
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── Testimonial Banner ── */}
          <section className="py-14 sm:py-20 bg-muted/30 border-y border-border/10">
            <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Quote className="w-5 h-5 text-primary" />
              </div>
              <p className="text-lg sm:text-xl font-medium text-foreground leading-relaxed mb-5">
                We are a young charity. If you volunteer, we will not invent a testimonial for you. Email info@livingwitharthritis.org.uk and tell us how you can help.
              </p>
            </div>
          </section>

          {/* ── How Your Help Makes a Difference ── */}
          <section className="py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
              <div className="text-center mb-12">
                <p className="text-xs font-bold text-primary tracking-widest uppercase mb-3">Your Impact</p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-3">
                  How Your Support Changes Lives
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Every contribution — no matter the size — creates tangible, measurable change.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  {
                    icon: Megaphone,
                    title: "Spread Awareness",
                    description: "Share our resources on social media, tell friends and family, or write to your MP about arthritis support.",
                    color: "from-primary to-secondary",
                    bg: "bg-primary/5",
                  },
                  {
                    icon: Handshake,
                    title: "Give Your Time",
                    description: "Just 2 hours a week as a peer mentor can transform someone's arthritis journey from isolation to empowerment.",
                    color: "from-secondary to-primary",
                    bg: "bg-primary/5",
                  },
                  {
                    icon: Gift,
                    title: "Fund Services",
                    description: "Your donations fund free virtual physiotherapy, diet plans, and community support groups across the UK.",
                    color: "from-primary to-secondary",
                    bg: "bg-primary/5",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className={`${item.bg} rounded-2xl p-6 sm:p-8 border border-border/20 text-center`}>
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4 shadow-sm`}>
                        <Icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── Volunteer Sign-Up Form ── */}
          <section id="volunteer-form" className="scroll-mt-24 py-16 sm:py-24 bg-gradient-to-b from-primary/5 to-background border-t border-border/10">
            <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                {/* Left: Why volunteer */}
                <div>
                  <p className="text-xs font-bold text-primary tracking-widest uppercase mb-3">Join Our Team</p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-4">
                    Volunteer With Us
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Our volunteers are at the heart of everything we do. Whether you can spare a few hours a week or want to get involved in a bigger way, we'd love to hear from you.
                  </p>

                  <div className="space-y-5">
                    {[
                      { icon: Clock, title: "Flexible Hours", desc: "Volunteer as little or as much as you like — even 1 hour helps." },
                      { icon: MapPin, title: "Remote or Local", desc: "Support from home online or join community events near you." },
                      { icon: Star, title: "Make Real Impact", desc: "See the direct difference your time makes in people's lives." },
                      { icon: Users, title: "Join a Community", desc: "Connect with like-minded people who care about arthritis support." },
                    ].map((benefit) => {
                      const BIcon = benefit.icon;
                      return (
                        <div key={benefit.title} className="flex gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <BIcon className="w-4.5 h-4.5 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-foreground">{benefit.title}</h4>
                            <p className="text-xs text-muted-foreground">{benefit.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Form */}
                <div>
                  {submitted ? (
                    <div className="bg-card border border-primary/20 rounded-2xl p-8 sm:p-10 text-center shadow-sm">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Email draft ready — please press Send</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Your email app should have opened with a volunteer enquiry draft. We only receive it after you press Send — nothing was submitted automatically. We aim to reply within 5 working days once it arrives.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="bg-card border border-border/30 rounded-2xl p-6 sm:p-8 shadow-lg shadow-primary/5 space-y-4">
                      <h3 className="text-lg font-bold text-foreground mb-1">Sign Up to Volunteer</h3>
                      <p className="text-xs text-muted-foreground mb-4">Fill in the form below and we'll get back to you.</p>

                      {/* Name */}
                      <div>
                        <label htmlFor="vol-name" className="block text-xs font-semibold text-foreground mb-1.5">
                          Full Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="vol-name"
                          placeholder="e.g. Sarah Johnson"
                          value={formData.name}
                          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                          maxLength={100}
                          required
                          className="rounded-xl h-11"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="vol-email" className="block text-xs font-semibold text-foreground mb-1.5">
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
                          className="rounded-xl h-11"
                        />
                      </div>

                      {/* Area of Interest */}
                      <div>
                        <label htmlFor="vol-interest" className="block text-xs font-semibold text-foreground mb-1.5">
                          Area of Interest <span className="text-destructive">*</span>
                        </label>
                        <Select
                          value={formData.area_of_interest}
                          onValueChange={(v) => setFormData((p) => ({ ...p, area_of_interest: v }))}
                        >
                          <SelectTrigger id="vol-interest" className="rounded-xl h-11">
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
                        <label htmlFor="vol-message" className="block text-xs font-semibold text-foreground mb-1.5">
                          Tell us about yourself <span className="text-muted-foreground font-normal">(optional)</span>
                        </label>
                        <Textarea
                          id="vol-message"
                          placeholder="Share relevant experience, availability, or why you'd like to volunteer..."
                          value={formData.message}
                          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                          maxLength={2000}
                          rows={3}
                          className="rounded-xl resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full h-12 rounded-full text-sm font-bold bg-primary hover:bg-primary text-primary-foreground shadow-md"
                      >
                        {submitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-background/30 border-t-white rounded-full animate-spin" />
                            Submitting...
                          </div>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Submit Application
                          </>
                        )}
                      </Button>

                      <p className="text-[10px] text-muted-foreground text-center leading-relaxed pt-1">
                        By submitting, you agree to our{" "}
                        <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>.
                        We'll only use your details to contact you about volunteering.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ── Final CTA ── */}
          <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/95 to-primary text-primary-foreground">
            <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-base sm:text-lg text-primary-foreground leading-relaxed mb-8 max-w-xl mx-auto">
                Join thousands of supporters across the UK who are helping people with arthritis live better, more active lives.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  onClick={() => navigate("/donate")}
                  size="lg"
                  className="rounded-full bg-background text-primary hover:bg-background/90 font-bold h-12 px-8 shadow-lg"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Donate Now
                </Button>
                <Button
                  onClick={() => navigate("/about")}
                  size="lg"
                  variant="outline"
                  className="rounded-full border-background/30 text-primary-foreground hover:bg-background/10 font-bold h-12 px-8"
                >
                  Learn About Our Work
                </Button>
              </div>
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
