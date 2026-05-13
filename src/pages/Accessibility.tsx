import { lazy, Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import PageHero from "@/components/ui/PageHero";
import { Accessibility, Eye, Ear, Keyboard, Monitor, Globe, MessageSquare, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { CONTACT_EMAILS } from "@/config/contact";

const Footer = lazy(() => import("@/components/Footer"));

const STATIC_FEATURES = [
  { icon: Eye, title: "High Contrast & Colour", desc: "All text and interactive elements meet WCAG 2.1 AA contrast ratios (minimum 4.5:1 for body text, 3:1 for large text). Our colour palette is tested for the three most common types of colour-blindness." },
  { icon: Keyboard, title: "Full Keyboard Navigation", desc: "Every feature — menus, modals, forms, tabs and chatbot — is fully operable using keyboard alone. Visible focus indicators appear on all interactive elements with a minimum 2px outline." },
  { icon: Ear, title: "Screen Reader Compatible", desc: "Semantic HTML5 landmarks, ARIA labels, roles and live regions ensure complete compatibility with JAWS, NVDA, VoiceOver and TalkBack screen readers." },
  { icon: Monitor, title: "Responsive & Adaptive", desc: "The site adapts from 320px mobile to ultra-wide desktop. Touch targets are a minimum 44×44px. Text reflows correctly up to 400% zoom without horizontal scrolling." },
  { icon: Globe, title: "Language & Localisation", desc: "Content is written in plain English (en-GB) at an average reading age of 12–14 years, following the health service content design principles for health literacy." },
  { icon: MessageSquare, title: "Alternative Formats", desc: "All images include descriptive alt text. Our AI chatbot provides text-based assistance as an alternative to visual navigation. PDF resources are tagged for accessibility." },
];

const Accessibility_Page = () => {
  const [backendSettings, setBackendSettings] = useState<Array<{ title: string; value: string }>>([]);

  useEffect(() => {
    // Attempt to load any accessibility settings from about_us_sections tagged with accessibility
    supabase
      .from("about_us_sections")
      .select("title, content")
      .eq("is_active", true)
      .ilike("title", "%accessib%")
      .order("display_order")
      .then(({ data }) => {
        if (data && data.length > 0) {
          setBackendSettings(data.map((d) => ({ title: d.title, value: d.content })));
        }
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Accessibility Statement – WCAG 2.1 AA | Living With Arthritis UK</title>
        <meta name="description" content="Accessibility statement for Living With Arthritis UK. We are committed to WCAG 2.1 AA compliance, ensuring our arthritis support resources are usable by everyone including people with disabilities." />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/accessibility" />
        <meta property="og:title" content="Accessibility Statement | Living With Arthritis UK" />
        <meta property="og:description" content="Our commitment to web accessibility — WCAG 2.1 AA standards, screen reader support, keyboard navigation and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/accessibility" />
        <meta property="og:locale" content="en_GB" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Accessibility Statement",
          "description": "Accessibility statement for Living With Arthritis UK — committed to WCAG 2.1 AA compliance.",
          "url": "https://livingwitharthritis.org.uk/accessibility",
          "inLanguage": "en-GB",
          "isPartOf": { "@type": "WebSite", "name": "Living With Arthritis UK", "url": "https://livingwitharthritis.org.uk" }
        })}</script>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Accessibility Statement – WCAG 2.1 AA | Living With Arthritis UK" />
      <meta name="twitter:description" content="Accessibility statement for Living With Arthritis UK. We are committed to WCAG 2.1 AA compliance, ensuring our arthritis support resources are usable by everyone including people with disabilities." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
    </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <PageHero
          gradient="from-muted/30 via-background to-muted/10"
          pattern="grid"
          badge={
            <Badge className="bg-muted text-muted-foreground border-0 text-xs font-bold px-3 py-1.5">
              <Accessibility className="w-3 h-3 mr-1.5" /> WCAG 2.1 AA
            </Badge>
          }
          title="Accessibility Statement"
          subtitle="We are committed to making our website accessible to everyone, including people with disabilities."
        />
        <main className="w-full px-6 md:px-10 lg:px-20 py-10 md:py-16 max-w-5xl mx-auto">
          {/* Intro */}
          <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed mb-12">
            <p>
              Living With Arthritis UK is committed to ensuring digital accessibility for all users, including people with visual, hearing, motor and cognitive impairments. We continuously work to improve the user experience for everyone and apply the relevant accessibility standards.
            </p>
            <p>
              This website aims to conform to <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>. These guidelines explain how to make web content more accessible to people with a wide range of disabilities.
            </p>
          </div>

          {/* Features grid */}
          <h2 className="text-2xl font-bold text-foreground mb-8">Accessibility Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {STATIC_FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-card rounded-2xl border border-border/30 p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Backend-driven settings if any */}
          {backendSettings.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-6">Additional Commitments</h2>
              <div className="space-y-4">
                {backendSettings.map((s) => (
                  <div key={s.title} className="bg-muted/30 rounded-xl p-5 border border-border/20">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      {s.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.value}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Compliance & testing */}
          <div className="prose prose-lg max-w-none space-y-8 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-foreground mt-8 mb-3">Conformance Status</h2>
              <p>We aim to meet WCAG 2.1 Level AA across all pages. Where we have identified areas that do not yet fully meet this standard, we are actively working to resolve them. Our site is regularly tested using automated tools (axe, Lighthouse) and manual keyboard/screen reader testing.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mt-8 mb-3">Known Limitations</h2>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Some third-party embedded content (e.g. payment forms via Stripe) may have accessibility limitations outside our direct control.</li>
                <li>Older blog images may have generic alt text — we are progressively improving these.</li>
                <li>Complex interactive charts may not be fully accessible to all screen readers — text alternatives are provided.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mt-8 mb-3">Feedback & Contact</h2>
              <p>We welcome your feedback on the accessibility of this website. If you encounter any barriers or have suggestions for improvement, please contact us:</p>
              <p className="mt-2">
                Email: <a href={`mailto:${CONTACT_EMAILS.info}`} className="text-primary hover:underline">{CONTACT_EMAILS.info}</a><br />
                Phone: 07760 512 084
              </p>
              <p className="mt-3">We aim to respond to accessibility feedback within 5 working days.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mt-8 mb-3">Enforcement Procedure</h2>
              <p>If you are not satisfied with our response, you can contact the <a href="https://www.equalityadvisoryservice.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Equality Advisory Support Service (EASS)</a> for further assistance.</p>
            </section>
          </div>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default Accessibility_Page;