import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import InternalLinks from "@/components/InternalLinks";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Shield, Users, FileText, Download, MapPin, Mail, Phone,
  Scale, BookOpen, CheckCircle, Building2, Gavel, Heart, Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import { CONTACT_EMAILS } from "@/config/contact";
import CharityRegBadge from "@/components/CharityRegBadge";
import { buildCharitySchema, injectJsonLd } from "@/lib/jsonLd";

const trustees = [
  {
    name: "Dr Amina Patel",
    role: "Chair of Trustees",
    credentials: "MBBS, FRCP — Consultant Rheumatologist, Public Health",
    bio: "Dr Patel has over 20 years' experience in rheumatology across local health trusts. She co-founded Living With Arthritis to bridge the gap between clinical care and patient education. She chairs our quarterly board meetings and oversees clinical governance.",
    appointed: "2020",
  },
  {
    name: "James Whitfield",
    role: "Treasurer",
    credentials: "FCA — Chartered Accountant, 20+ years charity finance",
    bio: "James brings extensive experience in charity financial management, having served as treasurer for three UK health charities. He ensures all funds are allocated transparently and prepares our annual accounts for Charity Commission submission.",
    appointed: "2020",
  },
  {
    name: "Dr Priya Sharma",
    role: "Trustee – Research & Education",
    credentials: "PhD Physiotherapy — University of Birmingham",
    bio: "Dr Sharma leads our evidence review process, ensuring all exercise programmes and physiotherapy content meets national clinical standards. She has published 15+ peer-reviewed papers on musculoskeletal rehabilitation.",
    appointed: "2021",
  },
  {
    name: "Sarah Okonkwo",
    role: "Trustee – Patient Advocacy",
    credentials: "Living with RA since 2015, certified peer mentor",
    bio: "Sarah provides the patient perspective on our board, ensuring our services genuinely meet the needs of people living with arthritis. She coordinates our peer support programme and reviews all patient-facing materials.",
    appointed: "2021",
  },
  {
    name: "Dr Michael Chen",
    role: "Trustee – Nutrition & Wellbeing",
    credentials: "RD, PhD — Anti-inflammatory diet researcher",
    bio: "Dr Chen oversees our dietary guidance, ensuring all nutrition content is evidence-based and aligned with current research on anti-inflammatory diets for arthritis management. He reviews our meal plans and supplement guidance.",
    appointed: "2022",
  },
  {
    name: "Helen Barker",
    role: "Trustee – Safeguarding & Compliance",
    credentials: "MSW — 15 years in health charity governance",
    bio: "Helen oversees our safeguarding policies, GDPR compliance, and organisational risk management. She ensures we meet all regulatory requirements and best practices for health charities operating in England and Wales.",
    appointed: "2022",
  },
];

const governancePolicies = [
  { title: "Conflict of Interest Policy", desc: "All trustees declare interests annually. No trustee may benefit financially from the charity." },
  { title: "Safeguarding Policy", desc: "Comprehensive DBS checks and safeguarding procedures for all staff and volunteers working with vulnerable adults." },
  { title: "Financial Controls Policy", desc: "Dual-signatory banking, quarterly financial reviews, and annual independent examination of accounts." },
  { title: "Data Protection (GDPR)", desc: "Full compliance with UK GDPR. Data Protection Officer appointed. Privacy Impact Assessments conducted." },
  { title: "Complaints Procedure", desc: "Formal complaints process with acknowledgement within 5 working days and resolution within 28 days." },
  { title: "Equality & Diversity", desc: "Committed to equal access regardless of age, disability, ethnicity, gender, religion, or sexual orientation." },
];

const meetingSchedule = [
  { quarter: "Q1 (Jan–Mar)", focus: "Annual planning, budget approval, strategy review" },
  { quarter: "Q2 (Apr–Jun)", focus: "Programme evaluation, risk assessment, partnership review" },
  { quarter: "Q3 (Jul–Sep)", focus: "Mid-year financial review, impact measurement, AGM preparation" },
  { quarter: "Q4 (Oct–Dec)", focus: "Annual accounts review, annual report drafting, forward planning" },
];

const Governance = () => {
  useEffect(() => injectJsonLd("ld-charity-governance", buildCharitySchema()), []);
  const handleDownloadConstitution = () => {
    // Generate a simple text-based constitution document
    const constitutionText = `
CONSTITUTION OF LIVING WITH ARTHRITIS
======================================
A Charitable Incorporated Organisation (CIO)

Date of Registration: 15 March 2020

1. NAME
The name of the Charitable Incorporated Organisation is "Living With Arthritis" ("the CIO").

2. NATIONAL LOCATION
The CIO's principal office is in England and Wales.

3. OBJECTS
The objects of the CIO are:
(a) To relieve the suffering of people affected by arthritis and related musculoskeletal conditions through the provision of information, education, and support services;
(b) To advance the education of the general public about arthritis, its causes, prevention, treatment, and management;
(c) To promote research into the causes, treatment, and management of arthritis and to publish the useful results thereof.

4. POWERS
The CIO has power to do anything which is calculated to further its objects or is conducive or incidental to doing so.

5. APPLICATION OF INCOME AND PROPERTY
(a) The income and property of the CIO shall be applied solely towards the promotion of the objects.
(b) No part of the income or property shall be paid or transferred to the trustees except in payment of reasonable expenses.

6. BENEFITS AND PAYMENTS TO TRUSTEES
No trustee may receive any payment of money or benefit in kind from the CIO except:
(a) Reimbursement of reasonable out-of-pocket expenses;
(b) Interest on money lent to the CIO at a reasonable rate.

7. MEMBERSHIP
The CIO does not have a wider membership beyond the charity trustees.

8. CHARITY TRUSTEES
(a) The CIO shall have a minimum of three and a maximum of twelve charity trustees.
(b) Trustees are appointed for a term of three years, renewable once.
(c) The board shall meet at least quarterly.

9. DECISION MAKING
(a) Decisions may be taken at meetings or by written resolution.
(b) Each trustee has one vote. Decisions require a simple majority.
(c) The chair has a casting vote.

10. AMENDMENT
This constitution may be amended by a resolution agreed by not less than two-thirds of the trustees.

11. DISSOLUTION
(a) If the CIO is wound up, any remaining assets shall be given to another charity with similar purposes.
(b) Assets may not be distributed to trustees or members.

Adopted on 15 March 2020.
Amended on 1 January 2024.

Registered address:
Living With Arthritis
Oswestry Health Centre
Thomas Savin Road, Off Gobowen Road
Oswestry SY11 1GA (SatNav: SY11 1HS)
England

Regulated by the Charity Commission for England and Wales.
    `.trim();

    const blob = new Blob([constitutionText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Living-With-Arthritis-Constitution.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>Governance & Constitution | Living With Arthritis UK Charity</title>
        <meta name="description" content="Our charity governance structure, board of trustees, constitution, and policies. Regulated by the Charity Commission for England and Wales." />
        <meta name="keywords" content="charity governance, trustees, constitution, charity commission, registered charity UK, arthritis charity governance" />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/governance" />
        <meta property="og:title" content="Governance & Constitution | Living With Arthritis UK" />
        <meta property="og:description" content="Full transparency on our charity governance, trustees, and constitution." />
        <meta property="og:locale" content="en_GB" />
        <meta name="geo.region" content="GB" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Governance & Constitution",
          url: "https://livingwitharthritis.org.uk/governance",
          isPartOf: { "@type": "WebSite", name: "Living With Arthritis", url: "https://livingwitharthritis.org.uk" },
          about: {
            "@type": "NGO",
            name: "Living With Arthritis",
            foundingDate: "2020",
            areaServed: { "@type": "Country", name: "United Kingdom" },
            address: { "@type": "PostalAddress", streetAddress: "Oswestry Health Centre, Thomas Savin Road, Off Gobowen Road", addressLocality: "Oswestry", postalCode: "SY11 1GA", addressCountry: "GB" },
          }
        })}</script>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Governance & Constitution | Living With Arthritis UK Charity" />
      <meta name="twitter:description" content="Our charity governance structure, board of trustees, constitution, and policies. Regulated by the Charity Commission for England and Wales." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.webp" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.webp" />
    </Helmet>

      <Header />

      <PageHero
        badge={
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
              <Shield className="w-3.5 h-3.5 mr-1.5" /> Charity Governance
            </Badge>
          </div>
        }
        title={<>Our <span className="text-primary">Governance</span> & Constitution</>}
        subtitle="Full transparency on how Living With Arthritis is governed, our board of trustees, and our founding constitution. Regulated by the Charity Commission for England and Wales."
      />
      <div className="container mx-auto px-6 md:px-10 max-w-5xl -mt-4 mb-6">
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Clock className="w-3 h-3" /> Last updated: March 2026
        </p>
      </div>

      <main id="main-content">
        {/* Registered Details */}
        <section className="py-14 lg:py-20 bg-muted/20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="mb-8">
              <CharityRegBadge variant="card" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border border-border/40">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-lg font-bold text-foreground">Registered Details</h2>
                  </div>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="font-semibold text-foreground">Charity Name</dt>
                      <dd className="text-muted-foreground">Living With Arthritis</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-foreground">Structure</dt>
                      <dd className="text-muted-foreground">Charitable Incorporated Organisation (CIO)</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-foreground">Date of Registration</dt>
                      <dd className="text-muted-foreground">15 March 2020</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-foreground">Regulator</dt>
                      <dd className="text-muted-foreground">Charity Commission for England and Wales</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card className="border border-border/40">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-lg font-bold text-foreground">Registered Address</h2>
                  </div>
                  <address className="not-italic text-sm text-muted-foreground leading-relaxed mb-5">
                    Living With Arthritis<br />
                    Oswestry Health Centre<br />
                    Thomas Savin Road, Off Gobowen Road<br />
                    Oswestry SY11 1GA (SatNav: SY11 1HS)<br />
                    England
                  </address>
                  <div className="space-y-2.5">
                    <a href={`mailto:${CONTACT_EMAILS.info}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <Mail className="w-4 h-4" /> {CONTACT_EMAILS.info}
                    </a>
                    <a href="tel:07760512084" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <Phone className="w-4 h-4" /> 07760 512 084
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Constitution Download */}
        <section className="py-14 lg:py-20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <Card className="border border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <CardContent className="p-6 md:p-10 flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl font-bold text-foreground mb-2">Our Governing Document</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                    Our constitution sets out our charitable objects, trustee responsibilities, and how the organisation is governed.
                    It is publicly available as required by the Charity Commission.
                  </p>
                </div>
                <Button onClick={handleDownloadConstitution} className="rounded-full px-6 h-11 font-semibold shrink-0">
                  <Download className="w-4 h-4 mr-2" /> Download Constitution
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Charitable Objects */}
        <section className="py-14 lg:py-20 bg-muted/20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Gavel className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Charitable Objects</h2>
                <p className="text-sm text-muted-foreground">Our legally defined purposes as registered with the Charity Commission</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { title: "Relief of Suffering", desc: "To relieve the suffering of people affected by arthritis and related musculoskeletal conditions through the provision of information, education, and support services." },
                { title: "Advancement of Education", desc: "To advance the education of the general public about arthritis, its causes, prevention, treatment, and management through evidence-based resources." },
                { title: "Promotion of Research", desc: "To promote research into the causes, treatment, and management of arthritis and to publish the useful results thereof for public benefit." },
              ].map((obj, i) => (
                <motion.div
                  key={obj.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="border border-border/40">
                    <CardContent className="p-5 flex items-start gap-4">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground text-sm mb-1">{obj.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{obj.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Board of Trustees with full bios */}
        <section className="py-14 lg:py-20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Board of Trustees</h2>
                <p className="text-sm text-muted-foreground">Our board meets quarterly to review finances, impact, strategy, and compliance</p>
              </div>
            </div>

            <div className="space-y-4">
              {trustees.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Card className="border border-border/40 hover:border-primary/20 transition-colors">
                    <CardContent className="p-5 md:p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                          {t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <h3 className="font-bold text-foreground">{t.name}</h3>
                            <span className="text-xs text-primary font-semibold">{t.role}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 mb-2">{t.credentials}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{t.bio}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            <Clock className="w-3 h-3 inline mr-1" />Appointed {t.appointed}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Meeting Schedule */}
        <section className="py-14 lg:py-20 bg-muted/20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Quarterly Board Meetings</h2>
                <p className="text-sm text-muted-foreground">Our trustees meet four times a year to govern the charity</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {meetingSchedule.map((m) => (
                <Card key={m.quarter} className="border border-border/40">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground text-sm mb-1">{m.quarter}</h3>
                    <p className="text-sm text-muted-foreground">{m.focus}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Governance Policies */}
        <section className="py-14 lg:py-20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Governance Policies</h2>
                <p className="text-sm text-muted-foreground">Key policies ensuring we operate responsibly and transparently</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {governancePolicies.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="border border-border/40 h-full">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground text-sm mb-1.5 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0" /> {p.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 lg:py-20 bg-muted/20">
          <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
            <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3">Questions About Our Governance?</h2>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-md mx-auto">
              We welcome enquiries about how we operate. Contact our trustees directly or view our other compliance pages.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/finances">
                <Button variant="outline" className="rounded-full px-6 h-10 text-sm font-medium">
                  <BookOpen className="w-4 h-4 mr-2" /> View Our Finances
                </Button>
              </Link>
              <Link to="/trust">
                <Button variant="outline" className="rounded-full px-6 h-10 text-sm font-medium">
                  <Shield className="w-4 h-4 mr-2" /> Trust & Credibility
                </Button>
              </Link>
              <Link to="/impact">
                <Button variant="outline" className="rounded-full px-6 h-10 text-sm font-medium">
                  <Heart className="w-4 h-4 mr-2" /> Our Impact
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <InternalLinks />
      <Footer />
    </>
  );
};

export default Governance;
