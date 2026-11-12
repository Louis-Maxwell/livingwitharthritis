import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Handshake, Users, BookOpen, RefreshCw, Calendar, FlaskConical, CheckCircle, Send, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { sanitizeInput } from "@/lib/sanitize";
import { CONTACT_EMAILS } from "@/config/contact";
import { submitContactInquiry } from "@/lib/backendSubmit";
import { reportFormFailure } from "@/lib/errorReporting";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const partnershipSchema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  organisation: z.string().trim().max(200).optional(),
  type: z.string().min(1, "Select a partnership type"),
  message: z.string().trim().max(5000).optional(),
});

const partnershipTypes = [
  { icon: BookOpen, title: "Resource Sharing", desc: "Share our free printable packs and guides with the people you support, or link to them from your own pages." },
  { icon: Users, title: "Signposting Together", desc: "Agree simple wording so your team and ours point people to the right help, including NHS and local services." },
  { icon: RefreshCw, title: "Cross-Referral", desc: "Mutual signposting between your services and our free, educational guides. We do not collect patient data." },
  { icon: Calendar, title: "Joint Events", desc: "Talks, workshops and awareness sessions, agreed case by case." },
  { icon: FlaskConical, title: "Research Collaboration", desc: "Talk to us about patient-centred projects. Each one is agreed separately and in writing." },
];

const benefits = [
  "Free, plain-English guides your patients and members can use today",
  "Every guide reviewed by Louis Maxwell, HCPC-registered physiotherapist (PH128483)",
  "Educational, not diagnostic, with clear red flags and NHS routes",
  "Printable packs with QR codes for waiting rooms and groups",
  "No cost, no patient data collected, nothing to sign to start sharing",
  "Independent registered charity 1218461 in England and Wales",
];

/** Free resources a partner can share today (M3 partner pilot, 12 Nov 2026). */
const SHARE_TODAY = [
  { title: "Arthritis pain relief", desc: "What helps right now, what to avoid, and when to get help.", href: "/guides/arthritis-pain-relief" },
  { title: "Osteoarthritis guide", desc: "Plain-English OA guide for people newly told they have it.", href: "/conditions/osteoarthritis" },
  { title: "Exercise hub", desc: "Start-today steps, flare days and how to read pain. Motion is lotion.", href: "/exercises" },
  { title: "PIP and benefits", desc: "Where to start with PIP, evidence and free independent help.", href: "/guides/benefits-pip" },
  { title: "Printable clinic pack", desc: "QR handout for waiting rooms, classes and community groups.", href: "/resources/clinic-pack" },
  { title: "Flare action plan", desc: "One-page plan people can fill in and keep on the fridge.", href: "/resources/flare-action-plan" },
  { title: "PIP evidence diary", desc: "Printable diary to record bad days for a PIP claim.", href: "/resources/pip-evidence-diary" },
  { title: "Newly diagnosed checklist", desc: "First steps after a diagnosis, in order.", href: "/guides/newly-diagnosed" },
] as const;

export default function Partners() {
  const [form, setForm] = useState({ name: "", email: "", organisation: "", type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = partnershipSchema.safeParse(form);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }

    setSubmitting(true);
    try {
      const result = await submitContactInquiry({
        name: form.name,
        email: form.email,
        subject: `Partnership Enquiry: ${form.type}`,
        formId: "partners",
        message: `Organisation: ${form.organisation || "N/A"}\nType: ${form.type}\n\n${form.message || ""}`,
      });
      if (result.via === "mailto") {
        toast.message(result.message);
        setForm({ name: "", email: "", organisation: "", type: "", message: "" });
      } else if (result.via === "throttled") {
        toast.message(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      reportFormFailure("partners", error instanceof Error ? error.message : "submit failed");
      toast.error(`Something went wrong. Please try again or email ${CONTACT_EMAILS.info}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Partner With Us | Living With Arthritis</title>
        <meta name="description" content="Partner with Living With Arthritis — public health bodies, GP practices, health charities and community groups working together." />
      <meta property="og:title" content="Partner With Us | Living With Arthritis" />
      <meta property="og:description" content="Partner with Living With Arthritis — public health bodies, GP practices, health charities and community groups. Resource sharing, co-branded guides, joint events and research collaboration." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/partners" />
      <meta property="og:site_name" content="Living With Arthritis" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Our Partners | Living With Arthritis" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Partner With Us | Living With Arthritis" />
      <meta name="twitter:description" content="Partner with Living With Arthritis — public health bodies, GP practices, health charities and community groups. Resource sharing, co-branded guides, joint events and research collaboration." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
    </Helmet>
      <Header />
      <main id="main-content" className="min-h-dvh bg-background">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Handshake className="w-4 h-4" /> Partnerships
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Partner With Us</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We partner with public health bodies, GP practices, health charities and community organisations to extend free arthritis support to more people across the UK.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Partner */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Why Partner With Us?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((b) => (
                <div key={b} className="flex items-start gap-3 p-4 rounded-xl bg-card shadow-sm">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Share today */}
        <section className="py-16" aria-labelledby="share-today-heading">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 id="share-today-heading" className="text-2xl font-bold text-foreground mb-2 text-center">Free resources you can share today</h2>
            <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto mb-8">
              No partnership agreement needed. Link to these, print them or put the QR codes on your noticeboard. All are free, educational and reviewed by Louis Maxwell (HCPC PH128483). They are not a substitute for personal advice from a GP, physiotherapist or pharmacist.
            </p>
            <ul className="grid sm:grid-cols-2 gap-4">
              {SHARE_TODAY.map((r) => (
                <li key={r.href}>
                  <Link to={r.href} className="flex items-start gap-3 p-4 rounded-xl bg-card shadow-sm h-full hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-shadow">
                    <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <span className="block font-semibold text-foreground">{r.title}</span>
                      <span className="block text-sm text-muted-foreground">{r.desc}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground text-center mt-6">
              Health professionals: see <Link to="/healthcare-professionals" className="text-primary underline underline-offset-2">resources for healthcare professionals</Link>.
            </p>
          </div>
        </section>

        {/* Partnership Types */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Partnership Types</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnershipTypes.map((p) => (
                <Card key={p.title} className="border-none shadow-md bg-card hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <p.icon className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">{p.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enquiry Form */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-lg">
            <h2 className="text-2xl font-bold text-foreground mb-2 text-center">Partnership Enquiry</h2>
            <p className="text-center text-muted-foreground mb-8">Tell us about your organisation and how you'd like to work together.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="p-name">Your Name *</Label>
                <Input id="p-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="p-email">Email *</Label>
                <Input id="p-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="p-org">Organisation</Label>
                <Input id="p-org" value={form.organisation} onChange={(e) => setForm({ ...form, organisation: e.target.value })} placeholder="e.g. Local Health Trust, charity name" />
              </div>
              <div>
                <Label>Partnership Type *</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    {partnershipTypes.map((p) => (
                      <SelectItem key={p.title} value={p.title}>{p.title}</SelectItem>
                    ))}
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="p-msg">Message</Label>
                <Textarea id="p-msg" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} placeholder="How would you like to collaborate?" />
              </div>
              <Button type="submit" className="w-full gap-2" disabled={submitting}>
                {submitting ? "Submitting…" : <><Send className="w-4 h-4" /> Send Enquiry</>}
              </Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
