import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail, Users, Award, Heart, Shield, Newspaper } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DownloadableResources from "@/components/DownloadableResources";
import { CONTACT_EMAILS } from "@/config/contact";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const keyFacts = [
  { icon: Users, stat: "10M+", label: "UK adults live with arthritis" },
  { icon: Heart, stat: "100%", label: "Free services — no cost to patients" },
  { icon: Shield, stat: "Public Health", label: "Aligned with national clinical guidelines" },
  { icon: Award, stat: "HCPC", label: "Registered physiotherapy team" },
];

const spokespeople = [
  {
    name: "Operations Director",
    role: "Founder & Operations Director",
    bio: "Qualified physiotherapist with extensive experience in musculoskeletal health. Founded Living With Arthritis UK to bridge the gap between health service waiting lists and accessible patient support.",
  },
  {
    name: "Clinical Lead",
    role: "Senior Physiotherapist",
    bio: "HCPC-registered physiotherapist specialising in osteoarthritis, rheumatoid arthritis and joint rehabilitation. Available for expert commentary on exercise-based management of arthritis.",
  },
];

export default function Press() {
  return (
    <>
      <Helmet>
        <title>Press & Media Kit | Living With Arthritis UK</title>
        <meta name="description" content="Press resources, key facts, expert spokespeople and brand assets for Living With Arthritis UK — a free physiotherapy and arthritis support charity." />
      <meta property="og:title" content="Press & Media Kit | Living With Arthritis UK" />
      <meta property="og:description" content="Press resources, key facts, expert spokespeople and brand assets for Living With Arthritis UK — a free physiotherapy and arthritis support charity." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/press" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Press | Living With Arthritis UK" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Press & Media Kit | Living With Arthritis UK" />
      <meta name="twitter:description" content="Press resources, key facts, expert spokespeople and brand assets for Living With Arthritis UK — a free physiotherapy and arthritis support charity." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
    </Helmet>
      <Header />
      <main id="main-content" className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Newspaper className="w-4 h-4" /> Press & Media
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Press & Media Kit</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything journalists, bloggers and partners need to write about Living With Arthritis UK — key facts, expert contacts, downloadable resources and brand guidelines.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Key Facts */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Key Facts & Statistics</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyFacts.map((f) => (
                <Card key={f.label} className="text-center border-none shadow-md bg-card">
                  <CardContent className="pt-8 pb-6">
                    <f.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <p className="text-3xl font-bold text-foreground">{f.stat}</p>
                    <p className="text-sm text-muted-foreground mt-1">{f.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">About the Charity</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Living With Arthritis UK is a registered health charity dedicated to making expert physiotherapy, evidence-based diet plans and self-management tools freely accessible to the 10 million+ people living with arthritis across the United Kingdom.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our services are delivered by HCPC-registered physiotherapists and aligned with current national clinical and NICE clinical guidelines. We believe no one should face arthritis alone, and no one should have to wait months on a public health list for basic support.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From printable exercise routines and anti-inflammatory meal plans to an free symptom chat and peer support community, we provide a comprehensive digital platform — entirely free of charge — to help people manage joint pain, improve mobility and live well.
            </p>
          </div>
        </section>

        {/* Spokespeople */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Expert Spokespeople</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {spokespeople.map((s) => (
                <Card key={s.name} className="border-none shadow-md bg-card">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Users className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground">{s.role}</h3>
                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{s.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-8">
              To arrange an interview or expert quote, contact <strong>{CONTACT_EMAILS.info}</strong>
            </p>
          </div>
        </section>

        {/* Brand Assets */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">Brand Guidelines</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Colour Palette</h3>
                <div className="flex gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary" title="Primary" />
                  <div className="w-12 h-12 rounded-lg bg-secondary" title="Secondary" />
                  <div className="w-12 h-12 rounded-lg bg-accent" title="Accent" />
                  <div className="w-12 h-12 rounded-lg bg-muted" title="Muted" />
                </div>
                <p className="text-sm text-muted-foreground">Please use our official colour palette when referencing our brand. Do not alter or recolour our logo.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Usage Rules</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5">
                  <li>Always refer to us as "Living With Arthritis UK"</li>
                  <li>Do not crop, rotate or distort the logo</li>
                  <li>Maintain minimum clear space around the logo</li>
                  <li>Link back to livingwitharthritis.org.uk where possible</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Downloadable Resources */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold text-foreground mb-2 text-center">Downloadable Resources</h2>
            <p className="text-center text-muted-foreground mb-8">Free, link-worthy PDF resources for media use and patient support.</p>
            <DownloadableResources />
          </div>
        </section>

        {/* Press Releases */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Press Releases & News</h2>
            <p className="text-muted-foreground mb-6">No press releases yet. Check back soon for updates.</p>
          </div>
        </section>

        {/* Media Contact */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 max-w-lg text-center">
            <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Media Contact</h2>
            <p className="text-muted-foreground mb-4">For press enquiries, interview requests and media partnerships:</p>
            <a href={`mailto:${CONTACT_EMAILS.info}`}>
              <Button size="lg" className="gap-2">
                <Mail className="w-4 h-4" /> {CONTACT_EMAILS.info}
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
