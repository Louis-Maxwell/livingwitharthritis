import { memo } from "react";
import { ShieldCheck, Lock, FileCheck, Accessibility, Globe2, Scale } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CONTACT_EMAIL = "info@livingwitharthritis.org.uk";

const standards = [
  { icon: Lock, label: "UK GDPR Compliant", note: "Data protected to ICO standards" },
  { icon: ShieldCheck, label: "TLS 1.3 + AES-256", note: "Encrypted in transit and at rest" },
  { icon: FileCheck, label: "NICE Guideline Aligned", note: "Recommendations cross-checked" },
  { icon: Accessibility, label: "WCAG 2.2 AA", note: "Accessible to assistive tech" },
  { icon: Globe2, label: "WHO AI in Health Ethics", note: "Aligned to global guidance" },
  { icon: Scale, label: "EU AI Act Ready", note: "High-risk safeguards in place" },
];

const faqs = [
  {
    q: "How does the AI assistant actually work?",
    a: "The assistant combines a large language model with a clinical guardrail layer written by HCPC-registered physiotherapists. Every response is shaped by safety prompts that prevent it from giving a diagnosis, prescribing treatment, or replacing a clinician. It points you to the right next step — an exercise, a self-management tool, or, when needed, a real human.",
  },
  {
    q: "Can it diagnose my arthritis or change my medication?",
    a: "No. The assistant does not diagnose conditions, interpret scans, or change prescribed treatment. It can help you understand a condition, prepare for a GP appointment, find an evidence-based exercise, or recognise when symptoms need urgent review.",
  },
  {
    q: "What happens to my conversations?",
    a: "Conversations are stored encrypted and treated as confidential health information under UK GDPR. A small group of authorised clinicians may review anonymised samples to improve safety and accuracy. We never sell data, and we never use your conversations to train third-party commercial models. You can request a full export or permanent deletion at any time by emailing " + CONTACT_EMAIL + ".",
  },
  {
    q: "How do you stop the AI from inventing facts?",
    a: "Three layers. First, the system prompt instructs the model to refuse fact-based medical claims it cannot verify. Second, clinical content is grounded in our own NICE-aligned knowledge base rather than the open internet. Third, a dedicated review team continuously tests the assistant with known-risk prompts and edge cases before any update goes live.",
  },
  {
    q: "What happens in an emergency or if I describe a serious symptom?",
    a: "The assistant is trained to recognise red-flag symptoms — sudden severe joint swelling, signs of infection, loss of function, suspected fracture, or signs of self-harm — and will direct you immediately to NHS 111, your GP, or A&E. It will not attempt to manage urgent presentations itself.",
  },
  {
    q: "How do you make sure the AI is fair across different groups?",
    a: "We audit the assistant quarterly for differences in recommendation quality across age, sex, ethnicity and region. If a disparity is found, the affected pathway is paused, investigated and retrained before being released again. Audit summaries are available on request.",
  },
  {
    q: "Where can I read more?",
    a: "Our AI guardrails, data handling practices and clinical review process are documented in full on this site. For specific questions about how your data is handled, contact " + CONTACT_EMAIL + ".",
  },
];

const AISafetyExtras = memo(() => {
  return (
    <>
      {/* Compliance strip */}
      <section
        aria-labelledby="ai-standards-heading"
        className="relative py-20 lg:py-24 bg-background"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary/70 mb-3 block">
              Standards & Safeguards
            </span>
            <h2
              id="ai-standards-heading"
              className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight"
            >
              Private, safe, and accountable —{" "}
              <span className="text-primary italic">for everyone.</span>
            </h2>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed">
              Strict confidentiality, top-tier security, and clinical accountability sit behind every interaction.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {standards.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="group p-6 rounded-2xl border border-border/30 bg-card hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/[0.06] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-bold text-foreground leading-tight">{s.label}</p>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-snug">{s.note}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section
        aria-labelledby="ai-faqs-heading"
        className="relative py-20 lg:py-28 bg-warm"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary/70 mb-3 block">
              Frequently Asked
            </span>
            <h2
              id="ai-faqs-heading"
              className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight"
            >
              Honest answers about our AI.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              The questions clinicians, regulators and people living with arthritis ask us most.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border/30 rounded-xl bg-card px-5 data-[state=open]:border-primary/30 data-[state=open]:shadow-sm transition-all"
              >
                <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-foreground hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-[1.75] pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Closing pledge */}
      <section className="relative py-20 lg:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-6">
            Our Pledge
          </div>
          <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-[1.25] tracking-tight">
            “Our AI exists to make calm, evidence-based arthritis support reach every person in the UK — never to replace the clinician sitting opposite you.”
          </blockquote>
          <div className="mt-8 inline-flex flex-col items-center">
            <span className="w-10 h-[2px] bg-primary/40 mb-4" />
            <p className="text-xs font-bold text-foreground tracking-wide">Clinical Lead</p>
            <p className="text-[11px] text-muted-foreground tracking-[0.15em] uppercase mt-1">
              Living With Arthritis UK
            </p>
          </div>
        </div>
      </section>
    </>
  );
});

AISafetyExtras.displayName = "AISafetyExtras";
export default AISafetyExtras;
