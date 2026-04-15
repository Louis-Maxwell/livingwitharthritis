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
  Heart, Users, Star, Quote, CheckCircle,
  Activity, BookOpen, MessageCircle, Shield, Target, Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

const caseStudies = [
  {
    name: "Margaret T.",
    age: 67,
    location: "Birmingham",
    condition: "Knee Osteoarthritis",
    quote: "Before finding Living With Arthritis, I was barely able to walk to the shops. The exercise guides and virtual physiotherapy gave me a structured plan. Within 3 months, I was walking 2 miles daily and my pain had reduced significantly.",
    outcome: "Regained mobility and reduced pain medication by 50%",
    services: ["Virtual Physiotherapy", "Knee Exercise Programme", "Anti-Inflammatory Diet Plan"],
  },
  {
    name: "David R.",
    age: 54,
    location: "Manchester",
    condition: "Rheumatoid Arthritis",
    quote: "The community forum changed everything for me. I felt completely alone with my diagnosis. Connecting with others who understood what I was going through made a huge difference to my mental health and helped me manage my condition better.",
    outcome: "Improved mental health and better disease management",
    services: ["Community Forum", "Peer Support", "RA Information Hub"],
  },
  {
    name: "Fatima K.",
    age: 42,
    location: "London",
    condition: "Psoriatic Arthritis",
    quote: "The nutrition resources were a game-changer. I didn't realise how much my diet was affecting my inflammation. The Mediterranean diet plan and anti-inflammatory smoothie recipes have genuinely helped reduce my flare-ups.",
    outcome: "Fewer flare-ups and improved quality of life",
    services: ["Diet & Nutrition Hub", "Anti-Inflammatory Recipes", "Pain Journal"],
  },
  {
    name: "John W.",
    age: 72,
    location: "Leeds",
    condition: "Hip Osteoarthritis",
    quote: "I was on the NHS waiting list for a physiotherapy referral for months. The virtual physio service meant I could start exercises immediately. The chair exercises were perfect for my level and gave me confidence to move more.",
    outcome: "Started rehabilitation 4 months earlier than NHS appointment",
    services: ["Virtual Physiotherapy", "Chair Exercises", "Hip Exercise Programme"],
  },
  {
    name: "Sarah M.",
    age: 38,
    location: "Bristol",
    condition: "Osteoarthritis (hands)",
    quote: "As a teacher, my hand arthritis was threatening my career. The hand exercise programme and the self-help tool helped me manage my symptoms. I've been able to continue teaching with much less pain.",
    outcome: "Maintained employment and reduced hand pain",
    services: ["Hand Exercise Programme", "Self-Help Tool", "Workplace Guidance"],
  },
];

const impactNumbers = [
  { value: "10,000+", label: "People supported since 2020", icon: Users },
  { value: "3,200", label: "Virtual physio consultations (2024/25)", icon: Activity },
  { value: "4,500", label: "Active community forum members", icon: MessageCircle },
  { value: "18,000+", label: "AI symptom checker uses", icon: Target },
  { value: "50+", label: "Evidence-based exercise guides", icon: BookOpen },
  { value: "92%", label: "Users who would recommend us", icon: Star },
];

const publicBenefitEvidence = [
  {
    title: "Who Benefits",
    points: [
      "Anyone in the UK affected by osteoarthritis, rheumatoid arthritis, or psoriatic arthritis",
      "Family members and carers seeking information and support",
      "Healthcare professionals looking for patient education resources",
      "People on NHS waiting lists who need immediate support",
    ],
  },
  {
    title: "How They Benefit",
    points: [
      "Free 24/7 access to clinically reviewed exercise programmes for all major joints",
      "Virtual physiotherapy consultations removing geographic and mobility barriers",
      "Evidence-based nutrition guidance including anti-inflammatory diet plans",
      "Peer support community reducing isolation and improving mental wellbeing",
      "AI-powered symptom guidance helping users understand their condition",
      "Pain journal for tracking symptoms and sharing with their GP or rheumatologist",
    ],
  },
  {
    title: "Evidence of Impact",
    points: [
      "92% of users report improved understanding of their condition",
      "78% report reduced pain after following exercise programmes for 8+ weeks",
      "85% of community members say the forum has reduced their sense of isolation",
      "Average user visits 4.2 pages per session, indicating genuine engagement",
      "Users from every region of the UK, including rural and underserved areas",
    ],
  },
];

const ImpactStories = () => {
  return (
    <>
      <Helmet>
        <title>Our Impact & Patient Stories | Living With Arthritis UK Charity</title>
        <meta name="description" content="Real stories from people we've helped. See how Living With Arthritis has supported over 10,000 people across the UK with free physiotherapy, nutrition guidance, and community support." />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/impact" />
        <meta property="og:locale" content="en_GB" />
        <meta name="geo.region" content="GB" />
      </Helmet>

      <Header />

      <PageHero
        badge={
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
            <Heart className="w-3.5 h-3.5 mr-1.5" /> Real Impact, Real Stories
          </Badge>
        }
        title={<>The People <span className="text-primary">We've Helped</span></>}
        subtitle="Every statistic represents a real person whose life has been improved. Here are their stories — and the evidence of our public benefit."
      />
      <div className="container mx-auto px-6 md:px-10 max-w-5xl -mt-4 mb-6">
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Activity className="w-3 h-3" /> Last updated: March 2026
        </p>
      </div>

      <main id="main-content">
        {/* Impact Numbers */}
        <section className="py-14 lg:py-20 bg-muted/20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-2">Our Impact in Numbers</h2>
              <p className="text-sm text-muted-foreground">Measurable outcomes demonstrating our public benefit</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {impactNumbers.map((m, i) => (
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
                <h2 className="text-2xl font-bold text-foreground">Patient Case Studies</h2>
                <p className="text-sm text-muted-foreground">Real stories from people we've supported (names changed for privacy)</p>
              </div>
            </div>

            <div className="space-y-5">
              {caseStudies.map((cs, i) => (
                <motion.div
                  key={cs.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="border border-border/40 hover:border-primary/20 transition-colors overflow-hidden">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-48 shrink-0">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-lg mb-3">
                            {cs.name[0]}
                          </div>
                          <h3 className="font-bold text-foreground">{cs.name}, {cs.age}</h3>
                          <p className="text-xs text-muted-foreground">{cs.location}</p>
                          <Badge variant="outline" className="mt-2 text-xs">{cs.condition}</Badge>
                        </div>
                        <div className="flex-1 min-w-0">
                          <blockquote className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-primary/30 pl-4 mb-4">
                            "{cs.quote}"
                          </blockquote>
                          <div className="flex items-start gap-2 mb-3">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <p className="text-sm font-semibold text-foreground">{cs.outcome}</p>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {cs.services.map((s) => (
                              <Badge key={s} variant="secondary" className="text-[10px] font-medium">{s}</Badge>
                            ))}
                          </div>
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
                <h2 className="text-2xl font-bold text-foreground">User Satisfaction Survey (2024/25)</h2>
                <p className="text-sm text-muted-foreground">Based on 847 responses from our annual user survey</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { question: "Would you recommend Living With Arthritis?", result: "92% Yes", bar: 92 },
                { question: "Did our resources help you manage your condition?", result: "87% Yes", bar: 87 },
                { question: "Is the information easy to understand?", result: "94% Yes", bar: 94 },
                { question: "Has your quality of life improved?", result: "78% Yes", bar: 78 },
              ].map((q) => (
                <Card key={q.question} className="border border-border/40">
                  <CardContent className="p-5">
                    <p className="text-sm font-medium text-foreground mb-2">{q.question}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${q.bar}%` }} />
                      </div>
                      <span className="text-sm font-bold text-primary">{q.result}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
              <Link to="/#involved">
                <Button className="btn-primary-cta rounded-full px-8 h-11 text-sm font-bold">
                  <Heart className="w-4 h-4 mr-2" /> Donate Now
                </Button>
              </Link>
              <Link to="/finances">
                <Button variant="outline" className="rounded-full px-6 h-10 text-sm font-medium">
                  <BookOpen className="w-4 h-4 mr-2" /> View Our Finances
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
