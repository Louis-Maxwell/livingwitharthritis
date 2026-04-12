import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, Users, FlaskConical, RefreshCw, Eye, Lock, ShieldCheck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const principles = [
  {
    icon: <Users className="w-5 h-5 text-primary" />,
    title: "People-First Design",
    desc: "We place individuals at the centre of everything we build. Our AI tools are designed to genuinely understand and support human needs, championing inclusivity and fairness by respecting the rich diversity of those living with arthritis — while actively working to eliminate bias.",
  },
  {
    icon: <Shield className="w-5 h-5 text-primary" />,
    title: "Safety by Design",
    desc: "Our AI features are developed alongside healthcare professionals and subject-matter experts, following strict safety protocols. We align with NHS Digital guidelines, WHO health-AI ethics frameworks, and UK data protection regulations to safeguard every interaction.",
  },
  {
    icon: <FlaskConical className="w-5 h-5 text-primary" />,
    title: "Evidence-Led Approach",
    desc: "Every recommendation and response is grounded in peer-reviewed research and clinical best practice. Our content team continuously reviews the latest scientific evidence to ensure our AI delivers accurate, up-to-date information.",
  },
  {
    icon: <RefreshCw className="w-5 h-5 text-primary" />,
    title: "Continuous Improvement",
    desc: "We are committed to ongoing refinement — learning from user feedback, usage patterns, and evolving ethical standards. Rigorous testing and active monitoring help us prevent potential harm and maintain the highest quality of support.",
  },
  {
    icon: <Eye className="w-5 h-5 text-primary" />,
    title: "Transparency & Accountability",
    desc: "We are open about what our AI can and cannot do. Clear guidance is provided so users understand the nature and limitations of automated support, building trust through honest communication and robust technology.",
  },
  {
    icon: <Lock className="w-5 h-5 text-primary" />,
    title: "Privacy & Security",
    desc: "We uphold strict data protection standards to keep personal and sensitive information secure. We comply with UK GDPR, follow NHS data security best practices, and never use personal health data for model training.",
  },
];

const faqs = [
  {
    q: "How does the AI Assistant work?",
    a: "Our AI Assistant was developed in collaboration with physiotherapists and arthritis specialists. It uses advanced language models combined with carefully crafted clinical guardrails to provide supportive, evidence-based guidance. The assistant understands natural language and responds in a conversational, empathetic manner.",
  },
  {
    q: "How do you ensure the advice is appropriate?",
    a: "The AI Assistant is designed to provide general support and direct users to relevant resources vetted by our clinical team. It will not provide medical diagnoses, prescribe treatment, or replace professional medical advice. We employ multiple safeguards including manual testing by healthcare professionals, automated safety checks on every response, and adherence to strict content policies set by our clinical advisory board.",
  },
  {
    q: "What happens with my data? Is it kept private?",
    a: "Conversations with our AI Assistant are treated with the utmost confidentiality. We use strong encryption to protect all data in transit and at rest. Any data shared with third-party AI providers is anonymised and is not used for model training. Your privacy is always our priority, and we comply fully with UK GDPR requirements.",
  },
  {
    q: "How does Living With Arthritis approach AI ethics?",
    a: "We are committed to the safe, ethical, and responsible use of AI in healthcare. We believe AI should make arthritis support more accessible, fair, and inclusive. Our approach is guided by evidence-based principles, continuous feedback loops, and alignment with internationally recognised frameworks including WHO guidelines on AI ethics in health and the UK Government's AI regulation principles.",
  },
];

const certifications = [
  "UK GDPR Compliant",
  "NHS Data Security Standards",
  "WCAG 2.1 AA Accessible",
  "WHO AI Ethics Guidelines",
  "UK AI Regulation Principles",
];

const AITrustSafetyModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-foreground/70 hover:text-primary transition-colors duration-200 text-[13px] text-left">
          AI Trust &amp; Safety
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <ShieldCheck className="w-6 h-6 text-primary" />
            AI Trust &amp; Safety
          </DialogTitle>
        </DialogHeader>

        {/* Intro */}
        <div className="mt-2 space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            At Living With Arthritis, we are dedicated to supporting the wellbeing of people affected by arthritis.
            Our commitment to safety and responsibility shapes every aspect of our AI-powered tools, ensuring they
            serve our mission of providing accessible, evidence-based support to everyone who needs it.
          </p>
        </div>

        {/* Principles */}
        <div className="mt-6">
          <h3 className="text-base font-semibold text-foreground mb-4">Our Principles</h3>
          <div className="grid gap-4">
            {principles.map((p) => (
              <div key={p.title} className="flex gap-3 p-3 rounded-lg bg-muted/40">
                <div className="mt-0.5 shrink-0">{p.icon}</div>
                <div>
                  <h4 className="font-medium text-sm text-foreground">{p.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-6">
          <h3 className="text-base font-semibold text-foreground mb-3">Compliance &amp; Standards</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Our AI tools are built with strict confidentiality and top-tier security, following established
            healthcare AI ethics and data governance frameworks.
          </p>
          <div className="flex flex-wrap gap-2">
            {certifications.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-6">
          <h3 className="text-base font-semibold text-foreground mb-3">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Closing note */}
        <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-xs text-muted-foreground leading-relaxed italic">
            Our AI Assistant is designed to complement — never replace — professional medical advice.
            If you have concerns about your health, please consult your GP or specialist.
            We are committed to continuously improving our AI tools based on user feedback and the latest research.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AITrustSafetyModal;
