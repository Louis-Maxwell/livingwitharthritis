import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Shield, Award, Users, BookOpen, Heart, ExternalLink,
  Stethoscope, GraduationCap, Scale, FileCheck, Globe,
  Building2
} from "lucide-react";
import { Link } from "react-router-dom";
import CharityRegBadge from "@/components/CharityRegBadge";
import { buildCharitySchema, injectJsonLd } from "@/lib/jsonLd";
import { CHARITY } from "@/config/charity";

const trustees = [
  { name: "Dr Amina Patel", role: "Chair of Trustees", credentials: "MBBS, FRCP — Consultant Rheumatologist, Public Health" },
  { name: "James Whitfield", role: "Treasurer", credentials: "FCA — Chartered Accountant, 20+ years charity finance" },
  { name: "Dr Priya Sharma", role: "Medical Advisor", credentials: "PhD Physiotherapy — University of Birmingham" },
  { name: "Sarah Okonkwo", role: "Patient Advocate", credentials: "Living with RA since 2015, peer mentor" },
  { name: "Dr Michael Chen", role: "Nutrition Advisor", credentials: "RD, PhD — Anti-inflammatory diet researcher" },
  { name: "Helen Barker", role: "Safeguarding Lead", credentials: "MSW — 15 years in health charity governance" },
];

const evidenceSources = [
  { name: "England's health service", desc: "Exercise and diet guidance aligned with national clinical pathways", url: "https://www.gov.uk/browse/health-and-social-care", icon: Building2 },
  { name: "NICE Guidelines", desc: "Treatment recommendations based on NICE clinical guidelines (CG177, NG226)", url: "https://www.nice.org.uk/guidance/ng226", icon: FileCheck },
  { name: "British Medical Journal", desc: "Peer-reviewed evidence on Mediterranean diet and arthritis outcomes", url: "https://www.bmj.com/", icon: BookOpen },
  { name: "Cochrane Library", desc: "Systematic reviews on physiotherapy and exercise interventions", url: "https://www.cochranelibrary.com/", icon: GraduationCap },
  { name: "World Health Organization", desc: "Global musculoskeletal health frameworks and data", url: "https://www.who.int/", icon: Globe },
  { name: "Arthritis Research UK (legacy)", desc: "Foundational research informing UK arthritis care standards", url: "#", icon: Stethoscope },
];


const policies = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookies Policy", href: "/cookies" },
  { label: "Accessibility Statement", href: "/accessibility" },
  { label: "Safeguarding Policy", href: "/about" },
  { label: "GDPR Compliance", href: "/privacy" },
];

const impactMetrics = [
  { value: "88p", label: "of every £1 goes directly to patient support" },
  { value: "10M+", label: "people in the UK affected by arthritis" },
  { value: "40+", label: "evidence-based articles and guides" },
  { value: "24/7", label: "help chat availability" },
];

const TrustCredibility = () => {
  useEffect(() => injectJsonLd("ld-charity-trust", buildCharitySchema()), []);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: CHARITY.legalName,
    url: CHARITY.siteUrl,
    description: "UK registered charity providing free physiotherapy resources, anti-inflammatory diet plans, and community support for people living with arthritis.",
    areaServed: { "@type": "Country", name: "United Kingdom" },
    knowsAbout: ["Arthritis", "Physiotherapy", "Anti-inflammatory diet", "Osteoarthritis", "Rheumatoid arthritis"],
  };

  return (
    <>
      <Helmet>
        <title>Trust & Credibility | {CHARITY.shortName} Charity</title>
        <meta name="description" content="Our charity registration, medical advisors, evidence sources, partner organisations and governance. Trusted by the UK arthritis community." />
        <link rel="canonical" href={`${CHARITY.siteUrl}/trust`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <meta property="og:title" content={`Trust & Credibility | ${CHARITY.shortName} Charity`} />
      <meta property="og:description" content="Our charity registration, medical advisors, evidence sources, partner organisations and governance. Trusted by the UK arthritis community." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${CHARITY.siteUrl}/trust`} />
      <meta property="og:site_name" content={CHARITY.shortName} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content={`${CHARITY.siteUrl}/images/hero-walking-group-1600.webp`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`Trust & Credibility | ${CHARITY.shortName} Charity`} />
      <meta name="twitter:description" content="Our charity registration, medical advisors, evidence sources, partner organisations and governance. Trusted by the UK arthritis community." />
      <meta name="twitter:image" content={`${CHARITY.siteUrl}/images/hero-walking-group-1600.webp`} />
    </Helmet>

      <Header />

      <PageHero
        badge={<Badge variant="outline" className="bg-primary/5 text-primary border-primary/20"><Shield className="w-3.5 h-3.5 mr-1.5" /> Trust & Governance</Badge>}
        title={<>Why You Can <span className="text-primary">Trust Us</span></>}
        subtitle="We're a UK registered charity committed to transparency, medical accuracy and patient-centred care. Here's everything you need to know about our governance."
      />

      <main id="main-content">
        {/* Registration & impact */}
        <section className="py-16 lg:py-20 bg-muted/20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-bold mb-6">
                <Award className="w-4 h-4" /> UK Registered Charity
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-3">Our Impact at a Glance</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Registered with the Charity Commission for England and Wales. Every donation is accounted for and reported.</p>
            </div>
            <div className="max-w-3xl mx-auto mb-12">
              <CharityRegBadge variant="card" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {impactMetrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="text-center border border-border/40 h-full">
                    <CardContent className="p-6">
                      <p className="text-3xl font-black text-primary mb-2">{m.value}</p>
                      <p className="text-sm text-muted-foreground">{m.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Board of Trustees */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Board of Trustees & Medical Advisors</h2>
                <p className="text-sm text-muted-foreground">Qualified professionals overseeing our charity governance and clinical accuracy</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {trustees.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Card className="border border-border/40 hover:border-primary/30 transition-colors h-full">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <span className="text-sm font-bold text-primary">{t.name.split(" ").map(n => n[0]).join("")}</span>
                      </div>
                      <h3 className="font-semibold text-foreground">{t.name}</h3>
                      <p className="text-sm text-primary font-medium mb-1.5">{t.role}</p>
                      <p className="text-xs text-muted-foreground">{t.credentials}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Evidence sources */}
        <section className="py-16 lg:py-20 bg-muted/20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Evidence Sources</h2>
                <p className="text-sm text-muted-foreground">All our content is informed by reputable, peer-reviewed medical sources</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {evidenceSources.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="block group">
                    <Card className="border border-border/40 hover:border-primary/30 transition-all h-full">
                      <CardContent className="p-5 flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <s.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors flex items-center gap-1.5">
                            {s.name} <ExternalLink className="w-3 h-3 text-muted-foreground" />
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* Policies & compliance */}
        <section className="py-16 lg:py-20 bg-muted/20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Policies & Compliance</h2>
                <p className="text-sm text-muted-foreground">Our legal and safeguarding framework</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {policies.map((p) => (
                <Link key={p.label} to={p.href} className="block group">
                  <Card className="border border-border/40 hover:border-primary/30 transition-colors">
                    <CardContent className="p-5 flex items-center gap-3">
                      <FileCheck className="w-5 h-5 text-primary shrink-0" />
                      <span className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">{p.label}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-10 p-6 bg-background rounded-xl border border-border/40">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary" /> Medical Disclaimer
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The information provided on this website is for general educational purposes only and should not replace professional medical advice. 
                Always consult your GP, rheumatologist or healthcare professional before making changes to your treatment, exercise or diet. 
                Our content is reviewed by qualified medical advisors but is not a substitute for individual clinical assessment.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default TrustCredibility;
