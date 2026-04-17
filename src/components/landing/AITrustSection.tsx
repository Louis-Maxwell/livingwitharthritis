import { memo, useState } from "react";
import { ShieldCheck, Eye, Server, BarChart3, Lightbulb, ArrowRight } from "lucide-react";
import GridBg from "./GridBg";
import GlassCard from "./GlassCard";
import PageModal from "./PageModal";
import { Ltr } from "@/components/ui/Ltr";

const CONTACT_EMAIL = "info@livingwitharthritis.org.uk";

const pillars = [
  {
    id: "clinical",
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Co-Designed with Clinicians",
    desc: "Our AI health assistant was built hand-in-hand with HCPC-registered physiotherapists and rheumatologists. It acts as a supportive triage tool to guide you — never as a replacement for professional medical judgement.",
    modalContent: (
      <>
        <p className="lead">We firmly believe technology in healthcare should augment — never replace — the human touch.</p>
        <h3>The Development Process</h3>
        <p>Our AI models were developed using anonymised, clinically reviewed data sets approved by practising rheumatologists and physiotherapists across the UK. Every exercise suggestion, dietary recommendation, and management strategy was validated against current NICE guidelines before deployment.</p>
        <h3>Boundaries of Use</h3>
        <p>The AI is explicitly designed to guide users toward appropriate care pathways. If it detects indicators of a flare-up that requires urgent medical attention, it will immediately advise you to contact your GP or rheumatology team.</p>
      </>
    ),
  },
  {
    id: "transparent",
    icon: <Eye className="w-8 h-8 text-violet" />,
    title: "Zero Black Boxes",
    desc: "You deserve to know why a specific exercise or dietary change is suggested. Our algorithms provide clear, jargon-free explanations — so you remain in complete control of your own care journey.",
    modalContent: (
      <>
        <h3>Explainable AI (XAI)</h3>
        <p>Unlike many health apps that simply output a result, our system breaks down its reasoning. When we suggest a specific joint mobility exercise, we explain the clinical rationale in plain English.</p>
        <h3>Auditable Algorithms</h3>
        <p>Our decision-making logic is documented and available for review by regulatory bodies and clinical partners. We maintain an audit trail of every model update.</p>
      </>
    ),
  },
  {
    id: "privacy",
    icon: <Server className="w-8 h-8 text-sky" />,
    title: "UK Data Sovereignty",
    desc: "Your health data is encrypted, stored within the UK, and governed strictly by UK GDPR and ICO standards. We will never sell, share, or misuse your personal information — ever.",
    modalContent: (
      <>
        <h3>Infrastructure & Encryption</h3>
        <p>All personal health data is encrypted in transit (TLS 1.3) and at rest (AES-256). Our servers are physically located within the United Kingdom.</p>
        <h3>Data Minimisation</h3>
        <p>We collect only data strictly necessary to provide our service. You can request a full export or permanent deletion of your data at any time by emailing <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
        <h3>ICO Compliance</h3>
        <p>We are registered with the Information Commissioner's Office (ICO) and undergo regular compliance audits.</p>
      </>
    ),
  },
  {
    id: "fairness",
    icon: <BarChart3 className="w-8 h-8 text-amber" />,
    title: "Mitigated Bias",
    desc: "Trained on diverse UK health demographics, our AI undergoes rigorous continuous audits to ensure equitable care recommendations — regardless of age, ethnicity, or location.",
    modalContent: (
      <>
        <h3>Inclusive Training Data</h3>
        <p>We actively ensured our training data represents the diverse population of the UK, including variations in how arthritis presents across different ethnicities and age groups.</p>
        <h3>Ongoing Bias Audits</h3>
        <p>We conduct quarterly algorithmic audits. If a disparity is found, we pause deployment, investigate, and retrain before going live again.</p>
      </>
    ),
  },
];

const AITrustSection = memo(() => {
  const [modal, setModal] = useState<string | null>(null);
  const closeModal = () => setModal(null);

  return (
    <section
      aria-labelledby="ai-trust-heading"
      className="relative py-24 bg-gradient-to-b from-accent via-background to-accent overflow-hidden"
    >
      <GridBg />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
            <Lightbulb className="w-4 h-4" aria-hidden="true" /> <Ltr>Responsible AI</Ltr>
          </div>
          <h2 id="ai-trust-heading" className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            <Ltr>
              Intelligence you can{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet">trust.</span>
            </Ltr>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            <Ltr>Our AI Health Assistant was engineered and co-designed with clinical experts to serve you safely, transparently, and fairly.</Ltr>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((p) => (
            <GlassCard
              key={p.id}
              className="p-8 sm:p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group cursor-pointer"
              onClick={() => setModal(p.id)}
            >
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" aria-hidden="true">
                {p.icon}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-bold text-foreground"><Ltr>{p.title}</Ltr></h3>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-all" aria-hidden="true" />
              </div>
              <p className="text-muted-foreground leading-relaxed"><Ltr>{p.desc}</Ltr></p>
              <span className="sr-only">Click to read more about {p.title}</span>
            </GlassCard>
          ))}
        </div>

        {pillars.map((p) => (
          <PageModal key={p.id} isOpen={modal === p.id} onClose={closeModal} title={p.title}>
            {p.modalContent}
          </PageModal>
        ))}
      </div>
    </section>
  );
});

AITrustSection.displayName = "AITrustSection";
export default AITrustSection;
