import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";
import { Heart, ArrowLeft, Shield, Users, Sparkles, Award, ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InternalLinks from "@/components/InternalLinks";

const values = [
  {
    title: "Evidence-led",
    body: "Every guide, exercise and recommendation is reviewed by HCPC-registered clinicians and aligned with NICE guidance.",
  },
  {
    title: "Free, always",
    body: "No paywalls. No subscriptions. The cost of living with arthritis is high enough — knowledge shouldn't add to it.",
  },
  {
    title: "Patient-first",
    body: "Built around the lived experience of people in pain. Calm interfaces, plain language, dignity in every interaction.",
  },
  {
    title: "Independent",
    body: "Politically neutral. No corporate sponsors steering our content. Funded by donations and public-grant support.",
  },
];

const milestones = [
  { year: "2020", title: "Founded inside the NHS", body: "Started by First Contact Practitioners who saw patients leaving clinic with no reliable place to learn more." },
  { year: "2022", title: "Virtual physiotherapy", body: "Launched free, remote physio consultations — removing geography as a barrier to care." },
  { year: "2024", title: "10,000 people supported", body: "Crossed ten thousand people using our exercise libraries, diet guides and AI symptom companion." },
  { year: "2025", title: "National reach", body: "Working alongside NHS trusts and rheumatology bodies to extend our evidence-based content UK-wide." },
];

const team = [
  { role: "Operations Director", credentials: "NHS First Contact Practitioner · HCPC Registered", bio: "Founded Living With Arthritis to give NHS patients a place to turn after the appointment ends." },
  { role: "Clinical Lead", credentials: "MSc Musculoskeletal · HCPC Registered", bio: "Oversees clinical accuracy and develops the evidence-based exercise programmes." },
  { role: "Nutrition Advisor", credentials: "Registered Dietitian · BSc Nutrition", bio: "Designs the anti-inflammatory diet plans and Mediterranean meal guides for joint health." },
  { role: "Digital Health Lead", credentials: "MSc Health Informatics", bio: "Builds the AI symptom companion and the digital experience patients use every day." },
];

const AboutUs = () => {
  const { data: sections = [] } = useQuery({
    queryKey: ["about_us_sections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("about_us_sections")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      <Helmet>
        <title>About Living With Arthritis — Our Mission & Story | UK</title>
        <meta name="description" content="Living With Arthritis is a UK initiative founded by NHS First Contact Practitioners. Free, evidence-based support for over 10,000 people learning to live well with arthritis." />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/about" />
        <meta property="og:title" content="About Living With Arthritis — Our Mission & Story" />
        <meta property="og:description" content="Founded by NHS First Contact Practitioners. Free physio, nutrition and community support for people with arthritis across the UK." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        {/* ─── 1. Editorial hero — calm, generous whitespace ─── */}
        <section className="pt-12 lg:pt-20 pb-20 lg:pb-28">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              Back to home
            </Link>

            <p className="font-sans text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-8">
              About — Est. 2020
            </p>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.02] tracking-tight text-foreground mb-10 max-w-4xl">
              We exist so that nobody faces arthritis <em className="text-primary font-normal">alone</em>.
            </h1>

            <p className="font-sans text-lg sm:text-xl text-muted-foreground leading-[1.7] max-w-2xl font-light">
              Living With Arthritis is a UK initiative founded inside the NHS. We turn the very best clinical
              knowledge into calm, plain-spoken guidance — and we give it away, for free, to anyone who needs it.
            </p>
          </div>
        </section>

        {/* ─── 2. Impact strip — quiet numbers, no pomp ─── */}
        <section className="border-y border-border/40 bg-warm">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl py-14 lg:py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
              {[
                { v: "10,000+", l: "People supported" },
                { v: "50+", l: "Exercise guides" },
                { v: "100%", l: "Free to access" },
                { v: "UK-wide", l: "Coverage" },
              ].map((s) => (
                <div key={s.l} className="text-center md:text-left">
                  <p className="font-display text-4xl md:text-5xl text-foreground leading-none mb-3">{s.v}</p>
                  <p className="font-sans text-[11px] font-semibold tracking-[0.18em] uppercase text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 3. Mission — pull quote, magazine style ─── */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <Quote className="w-10 h-10 text-primary/30 mb-8" strokeWidth={1.2} />
            <blockquote className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.18] tracking-tight text-foreground">
              The best arthritis care in the country sits behind clinic doors.
              <span className="text-muted-foreground"> Our job is to bring it out — to your kitchen, your sofa, your phone — at the moment you need it most.</span>
            </blockquote>
            <p className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mt-10">
              — Our founding mission
            </p>
          </div>
        </section>

        {/* ─── 4. What we believe — values ─── */}
        <section className="py-20 lg:py-28 bg-warm border-y border-border/40">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="mb-16 max-w-2xl">
              <p className="font-sans text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-5">
                What we believe
              </p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-foreground tracking-tight">
                Four principles that shape every decision we make.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-x-16 gap-y-14">
              {values.map((v, i) => (
                <div key={v.title} className="border-t border-border/50 pt-8">
                  <p className="font-display text-3xl text-primary mb-3">0{i + 1}</p>
                  <h3 className="font-display text-2xl text-foreground mb-3 leading-tight">{v.title}</h3>
                  <p className="font-sans text-base text-muted-foreground leading-[1.8] font-light">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 5. CMS sections (Our Story / Mission etc.) — quiet long-read ─── */}
        {sections.length > 0 && (
          <section className="py-20 lg:py-28">
            <div className="container mx-auto px-6 md:px-10 max-w-3xl">
              <div className="mb-16">
                <p className="font-sans text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-5">
                  In our own words
                </p>
                <h2 className="font-display text-4xl sm:text-5xl leading-[1.05] text-foreground tracking-tight">
                  The longer story.
                </h2>
              </div>

              <div className="space-y-14">
                {sections.map((section) => (
                  <article key={section.id} className="border-t border-border/50 pt-10">
                    <h3 className="font-display text-3xl text-foreground mb-5 leading-tight">{section.title}</h3>
                    <p className="font-sans text-base sm:text-lg text-muted-foreground leading-[1.85] font-light whitespace-pre-line">
                      {section.content}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── 6. Milestones — horizontal editorial timeline ─── */}
        <section className="py-20 lg:py-28 bg-warm border-y border-border/40">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="mb-16 max-w-2xl">
              <p className="font-sans text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-5">
                Our journey
              </p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-foreground tracking-tight">
                From one clinic room to a national platform.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
              {milestones.map((m) => (
                <div key={m.year} className="border-t border-foreground/80 pt-6">
                  <p className="font-sans text-[11px] font-semibold tracking-[0.25em] uppercase text-primary mb-4">{m.year}</p>
                  <h3 className="font-display text-2xl text-foreground mb-3 leading-tight">{m.title}</h3>
                  <p className="font-sans text-sm text-muted-foreground leading-[1.75] font-light">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 7. Team — quiet credentials, no headshots ─── */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="mb-16 max-w-2xl">
              <p className="font-sans text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-5">
                The team
              </p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-foreground tracking-tight">
                Led by clinicians. Built with care.
              </h2>
              <p className="font-sans text-base text-muted-foreground mt-6 leading-[1.8] font-light max-w-xl">
                A multidisciplinary team of HCPC-registered physiotherapists, NHS First Contact Practitioners,
                registered dietitians and digital health specialists.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-12">
              {team.map((m) => (
                <div key={m.role} className="border-t border-border/50 pt-7">
                  <Award className="w-4 h-4 text-primary mb-4" strokeWidth={1.5} />
                  <h3 className="font-display text-2xl text-foreground mb-2 leading-tight">{m.role}</h3>
                  <p className="font-sans text-[11px] font-semibold tracking-[0.18em] uppercase text-muted-foreground mb-4">
                    {m.credentials}
                  </p>
                  <p className="font-sans text-base text-muted-foreground leading-[1.8] font-light">{m.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 8. Governance + registered details ─── */}
        <section className="py-20 lg:py-24 bg-warm border-y border-border/40">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 md:gap-20 items-start">
              <div>
                <Shield className="w-5 h-5 text-primary mb-5" strokeWidth={1.5} />
                <p className="font-sans text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-4">
                  Governance
                </p>
                <h2 className="font-display text-3xl md:text-4xl leading-[1.1] text-foreground tracking-tight">
                  Transparent by default.
                </h2>
              </div>

              <div className="font-sans text-sm">
                <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-6 mb-10">
                  <div>
                    <dt className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-2">Operating name</dt>
                    <dd className="text-foreground">Living With Arthritis</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-2">Registered address</dt>
                    <dd className="text-foreground not-italic leading-relaxed">
                      <address className="not-italic">
                        Oswestry Health Centre<br />
                        Thomas Savin Road, Off Gobowen Road<br />
                        Oswestry SY11 1GA<br />
                        England
                      </address>
                    </dd>
                  </div>
                </dl>

                <div className="flex flex-wrap gap-x-6 gap-y-3 pt-6 border-t border-border/50">
                  <Link to="/governance" className="text-sm text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 group">
                    Governance <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link to="/finances" className="text-sm text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 group">
                    Finances <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link to="/safeguarding" className="text-sm text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 group">
                    Safeguarding <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 9. Closing CTA — soft, single ask ─── */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
            <Heart className="w-7 h-7 text-primary mx-auto mb-8" strokeWidth={1.5} />
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-foreground tracking-tight mb-8">
              Help us reach the next ten thousand.
            </h2>
            <p className="font-sans text-base sm:text-lg text-muted-foreground leading-[1.8] font-light max-w-xl mx-auto mb-12">
              Every donation funds another guide written, another video filmed, another person who finds calm
              instead of confusion when they search for help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link to="/donate">
                <Button className="rounded-full px-8 h-12 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-none">
                  Support our work
                </Button>
              </Link>
              <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 group px-6 h-12 leading-[3rem]">
                Or explore what we offer <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>

        <InternalLinks />
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
