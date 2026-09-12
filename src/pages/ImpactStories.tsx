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
  Heart, Star, Quote, CheckCircle,
  Activity, BookOpen, Shield, Target, Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

const situations = [
  {
    title: "Knee osteoarthritis",
    text: "Morning stiffness, stairs that feel steeper, and a wait for NHS physio. Our knee exercise guides and waiting-list page are written for that gap.",
    href: "/conditions/knee-arthritis",
    links: ["Knee exercises", "Waiting-list help", "Self-help tool"],
  },
  {
    title: "Rheumatoid arthritis",
    text: "A new diagnosis can feel lonely. We publish plain-English RA guides, diet notes and a help chat — not a claimed community membership total.",
    href: "/conditions/rheumatoid-arthritis",
    links: ["RA guide", "Diet hub", "Help chat"],
  },
  {
    title: "Hands at work",
    text: "Teachers, joiners and anyone who uses their hands all day. Hand exercises, pacing and workplace adjustments — general information, not a case study.",
    href: "/conditions/hand-arthritis",
    links: ["Hand exercises", "Work & rights", "Self-help tool"],
  },
];

const impactNotes = [
  { value: "Free", label: "Guides you can read without a paywall", icon: BookOpen },
  { value: "UK", label: "National charity, independent of Arthritis UK", icon: Shield },
  { value: "2026", label: "Registered on 15 June (charity 1218461)", icon: Heart },
];

const publicBenefitEvidence = [
  {
    title: "Who Benefits",
    points: [
      "Anyone in the UK affected by osteoarthritis, rheumatoid arthritis, or psoriatic arthritis",
      "Family members and carers seeking information and support",
      "Healthcare professionals looking for patient education resources",
      "People on health service waiting lists who need immediate support",
    ],
  },
  {
    title: "How They Benefit",
    points: [
      "Free access to clinically reviewed exercise and diet guides",
      "Plain-English help you can read while you wait for a health service appointment",
      "Community pages without a claimed membership total",
    ],
  },
  {
    title: "What we will not claim",
    points: [
      "We do not publish visitor counts, people-supported totals or satisfaction scores we cannot verify",
      "We do not claim a panel of specialists or a measured pages-per-visit figure",
      "The charity was registered on 15 June 2026. We will not invent earlier reach",
    ],
  },
];

const ImpactStories = () => {
  return (
    <>
      <Helmet>
        <title>Patient Stories & Impact | Living With Arthritis UK</title>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Impact & Patient Stories",
          "url": "https://livingwitharthritis.org.uk/impact",
          "inLanguage": "en-GB",
          "description": "Situations Living With Arthritis UK writes about. Not a count of people supported.",
          "isPartOf": { "@type": "WebSite", "name": "Living With Arthritis UK", "url": "https://livingwitharthritis.org.uk" }
        })}</script>
        <meta name="description" content="Situations Living With Arthritis UK writes about. Charity 1218461. We do not publish unverified support totals." />
        <meta property="og:locale" content="en_GB" />
        <meta name="geo.region" content="GB" />
      <meta property="og:title" content="Our Impact & Patient Stories | Living With Arthritis UK Charity" />
      <meta property="og:description" content="Situations Living With Arthritis UK writes about. Young independent charity 1218461. Not audited outcomes." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/impact" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Impact Stories | Living With Arthritis UK" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Our Impact & Patient Stories | Living With Arthritis UK Charity" />
      <meta name="twitter:description" content="Situations Living With Arthritis UK writes about. Young independent charity 1218461. Not audited outcomes." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
    </Helmet>

      <Header />

      <PageHero
        badge={
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
            <Heart className="w-3.5 h-3.5 mr-1.5" /> Honest notes, not audited outcomes
          </Badge>
        }
        title={<>What this charity <span className="text-primary">is for</span></>}
        subtitle="We write free UK guides for people living with arthritis. The notes below are illustrative, not a count of people we have supported."
      />
      <div className="container mx-auto px-6 md:px-10 max-w-5xl mt-2 mb-6 overflow-visible">
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Activity className="w-3 h-3" /> Registered charity 1218461 · 15 June 2026
        </p>
      </div>

      <main id="main-content">
        {/* Impact Numbers */}
        <section className="py-14 lg:py-20 bg-muted/20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-2">What we can say honestly</h2>
              <p className="text-sm text-muted-foreground">No invented visitor counts, specialist panels or engagement scores</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {impactNotes.map((m, i) => (
                <motion.div key={m.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <Card className="text-center border border-border/40 h-full">
                    <CardContent className="p-5">
                      <m.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-black text-primary mb-1">{m.value}</p>
                      <p className="text-xs text-muted-foreground">{m.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-14 lg:py-20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Quote className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Situations these guides are for</h2>
                <p className="text-sm text-muted-foreground">Everyday situations we write about. Not named patients, not audited outcomes, not a measure of reach.</p>
              </div>
            </div>

            <div className="space-y-5">
              {situations.map((cs, i) => (
                <motion.div
                  key={cs.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="border border-border/40 hover:border-primary/20 transition-colors overflow-hidden">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-foreground mb-2">{cs.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{cs.text}</p>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {cs.links.map((s) => (
                              <Badge key={s} variant="secondary" className="text-[10px] font-medium">{s}</Badge>
                            ))}
                          </div>
                          <Link to={cs.href} className="text-sm font-semibold text-primary hover:underline">Open the guide</Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Public Benefit Evidence */}
        <section className="py-14 lg:py-20 bg-muted/20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Public Benefit Evidence</h2>
                <p className="text-sm text-muted-foreground">Demonstrating who benefits from our charity and how, as required by the Charity Commission</p>
              </div>
            </div>

            <div className="space-y-5">
              {publicBenefitEvidence.map((section, i) => (
                <motion.div key={section.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card className="border border-border/40">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-foreground text-base mb-4 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" /> {section.title}
                      </h3>
                      <ul className="space-y-2.5">
                        {section.points.map((point) => (
                          <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials / Survey Results */}
        <section className="py-14 lg:py-20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">We do not publish a satisfaction survey</h2>
                <p className="text-sm text-muted-foreground">There is no verified 2024/25 survey behind earlier percentages on this page. If something on the site helped or missed the mark, write to us.</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground max-w-2xl">
              Email info@livingwitharthritis.org.uk. We will not turn that correspondence into a public percentage.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 lg:py-20 bg-muted/20">
          <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
            <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3">Help Us Support More People</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              Every donation helps us reach more people living with arthritis across the UK with free, evidence-based support.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/donate">
                <Button className="btn-primary-cta rounded-full px-8 h-11 text-sm font-bold">
                  <Heart className="w-4 h-4 mr-2" /> Donate Now
                </Button>
              </Link>
              <Link to="/governance">
                <Button variant="outline" className="rounded-full px-6 h-10 text-sm font-medium">
                  <Shield className="w-4 h-4 mr-2" /> Our Governance
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

export default ImpactStories;
