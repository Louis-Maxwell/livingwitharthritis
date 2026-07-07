import { memo } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Building2, Stethoscope, HeartPulse, ArrowRight } from "lucide-react";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

const partners = [
  {
    icon: ShieldCheck,
    title: "Insurance partners",
    body:
      "Health and income-protection insurers commission our MSK content and self-management pathways for their members, so policyholders get expert arthritis support the moment they need it.",
  },
  {
    icon: Building2,
    title: "Hospitals & trusts",
    body:
      "We subcontract patient-facing arthritis and MSK education that sits alongside clinical care, helping waiting lists feel shorter and recovery feel clearer.",
  },
  {
    icon: Stethoscope,
    title: "Healthcare providers",
    body:
      "Private clinics, physiotherapy groups and primary-care networks license our HCPC-reviewed resources to use with their own MSK patients.",
  },
];

const HowWeAreFundedSection = memo(() => {
  return (
    <section
      id="how-we-are-funded"
      aria-labelledby="how-we-are-funded-heading"
      className="py-24 lg:py-32 bg-background relative"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl">
        <RevealOnScroll>
          <div className="max-w-3xl">
            <span className="section-label text-primary/60 mb-5 block">
              How we're funded
            </span>
            <h2
              id="how-we-are-funded-heading"
              className="font-display text-3xl sm:text-4xl md:text-[3.25rem] font-bold mb-8 text-foreground leading-[1.06] tracking-tight"
            >
              We don't rely on{" "}
              <span className="text-primary italic">donations alone.</span>
            </h2>
            <div className="w-20 h-[2px] bg-primary/15 mb-9" />
            <p className="text-muted-foreground leading-[1.9] text-base sm:text-lg">
              The charity is sustained through subcontracting partnerships with
              insurance companies, hospitals, and healthcare providers who serve
              musculoskeletal (MSK) patients. They commission us to deliver
              education, self-management resources, triage support and
              physiotherapist-led guidance for their patient populations — and
              that work funds the free public service everyone else enjoys.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-14 lg:mt-20">
          {partners.map(({ icon: Icon, title, body }, i) => (
            <RevealOnScroll key={title} delay={i * 120}>
              <article className="h-full p-10 rounded-2xl bg-card border border-border/10 hover:shadow-large hover:-translate-y-1 transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-primary/[0.04] flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3 tracking-tight">
                  {title}
                </h3>
                <p className="text-sm sm:text-[15px] text-muted-foreground leading-[1.75]">
                  {body}
                </p>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={200}>
          <div className="mt-14 lg:mt-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pt-10 border-t border-border/10">
            <p className="flex items-start gap-3 text-sm sm:text-[15px] text-muted-foreground max-w-2xl leading-[1.75]">
              <HeartPulse className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                Every partnership is reviewed for clinical independence. Our
                guidance is never influenced by who funds us.
              </span>
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/corporate-giving"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition"
              >
                Partner with us
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
});

HowWeAreFundedSection.displayName = "HowWeAreFundedSection";
export default HowWeAreFundedSection;
