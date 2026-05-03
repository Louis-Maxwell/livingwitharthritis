import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Handshake, Users, BookOpen, RefreshCw, Calendar, FlaskConical, CheckCircle, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { sanitizeInput } from "@/lib/sanitize";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const partnershipSchema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  organisation: z.string().trim().max(200).optional(),
  type: z.string().min(1, "Select a partnership type"),
  message: z.string().trim().max(5000).optional(),
});

const partnershipTypes = [
  { icon: BookOpen, title: "Resource Sharing", desc: "Co-create or cross-promote patient education materials, guides and toolkits." },
  { icon: Users, title: "Co-Branded Guides", desc: "Joint publications combining your clinical expertise with our patient reach." },
  { icon: RefreshCw, title: "Cross-Referral", desc: "Mutual referral pathways between your services and our free support platform." },
  { icon: Calendar, title: "Joint Events", desc: "Webinars, workshops and awareness campaigns delivered together." },
  { icon: FlaskConical, title: "Research Collaboration", desc: "Partner on patient-centred research, surveys and outcome studies." },
];

const benefits = [
  "Reach 10M+ UK adults living with arthritis",
  "Align with a trusted, the health service-compliant charity",
  "Free, evidence-based content your patients can use",
  "Enhance your E-E-A-T credentials with quality backlinks",
  "Joint marketing and awareness campaigns",
  "Access to engaged patient community for research",
];

export default function Partners() {
  const [form, setForm] = useState({ name: "", email: "", organisation: "", type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = partnershipSchema.safeParse(form);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }

    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("submit-contact", {
        body: {
          name: sanitizeInput(form.name),
          email: form.email,
          subject: `Partnership Enquiry: ${form.type}`,
          message: sanitizeInput(`Organisation: ${form.organisation || "N/A"}\nType: ${form.type}\n\n${form.message || ""}`),
        },
      });
      if (error) throw error;
      toast.success("Enquiry submitted! We'll be in touch within 48 hours.");
      setForm({ name: "", email: "", organisation: "", type: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again or email info@livingwitharthritis.org.uk");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Partner With Us | Living With Arthritis UK</title>
        <meta name="description" content="Partner with Living With Arthritis UK — the health service bodies, GP practices, health charities and community groups. Resource sharing, co-branded guides, joint events and research collaboration." />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/partners" />
      <meta property="og:title" content="Partner With Us | Living With Arthritis UK" />
      <meta property="og:description" content="Partner with Living With Arthritis UK — the health service bodies, GP practices, health charities and community groups. Resource sharing, co-branded guides, joint events and research collaboration." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/partners" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Partner With Us | Living With Arthritis UK" />
      <meta name="twitter:description" content="Partner with Living With Arthritis UK — the health service bodies, GP practices, health charities and community groups. Resource sharing, co-branded guides, joint events and research collaboration." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
    </Helmet>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Handshake className="w-4 h-4" /> Partnerships
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Partner With Us</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We partner with the health service bodies, GP practices, health charities and community organisations to extend free arthritis support to more people across the UK.
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
