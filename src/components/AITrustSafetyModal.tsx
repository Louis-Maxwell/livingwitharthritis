import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Shield, Users, FlaskConical, RefreshCw, Eye, Lock, ShieldCheck,
  AlertTriangle, Bot, Heart, CheckCircle, Loader2,
} from "lucide-react";
import { memo } from "react";

/* ── Icon resolver ── */
const ICON_MAP: Record<string, React.ReactNode> = {
  users: <Users className="w-5 h-5" />,
  shield: <Shield className="w-5 h-5" />,
  "flask-conical": <FlaskConical className="w-5 h-5" />,
  "refresh-cw": <RefreshCw className="w-5 h-5" />,
  eye: <Eye className="w-5 h-5" />,
  lock: <Lock className="w-5 h-5" />,
  heart: <Heart className="w-5 h-5" />,
  bot: <Bot className="w-5 h-5" />,
  "alert-triangle": <AlertTriangle className="w-5 h-5" />,
  "check-circle": <CheckCircle className="w-5 h-5" />,
};

const resolveIcon = (name: string) => ICON_MAP[name] ?? <Shield className="w-5 h-5" />;

/* ── Error fallback ── */
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex items-center gap-2 py-4 px-3 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive">
    <AlertTriangle className="w-4 h-4 shrink-0" />
    <span>{message}</span>
  </div>
);

/* ── Sub-components ── */
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
    {children}
  </h3>
);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-6">
    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
  </div>
);

/* ── Main modal ── */
const AITrustSafetyModal = memo(() => {
  const [open, setOpen] = useState(false);

  const principles = useQuery({
    queryKey: ["ai-safety-principles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ai_safety_principles")
        .select("*")
        .eq("is_active", true)
        .order("display_order");
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 30,
    enabled: open,
  });

  const faqs = useQuery({
    queryKey: ["ai-safety-faqs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ai_safety_faqs")
        .select("*")
        .eq("is_active", true)
        .order("display_order");
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 30,
    enabled: open,
  });

  const certs = useQuery({
    queryKey: ["ai-safety-certifications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ai_safety_certifications")
        .select("*")
        .eq("is_active", true)
        .order("display_order");
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 30,
    enabled: open,
  });

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
            Responsible AI at Living With Arthritis
          </DialogTitle>
        </DialogHeader>

        {/* ── Hero intro ── */}
        <div className="mt-2 rounded-xl bg-primary/5 border border-primary/10 p-5 space-y-3">
          <div className="flex items-start gap-3">
            <Bot className="w-8 h-8 text-primary shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              <p>
                At Living With Arthritis, we harness the power of artificial intelligence to provide
                accessible, evidence-based support for people affected by arthritis across the UK.
                Our commitment to safety, transparency, and clinical integrity shapes every aspect of
                our AI-powered tools.
              </p>
              <p>
                We believe technology should empower — never replace — the vital relationship between
                patients and healthcare professionals. Every feature we build is guided by this principle.
              </p>
            </div>
          </div>
        </div>

        {/* ── Principles ── */}
        <div className="mt-6">
          <SectionHeading>
            <Shield className="w-4 h-4 text-primary" />
            Our Core Principles
          </SectionHeading>

          {principles.isLoading ? (
            <LoadingSpinner />
          ) : principles.isError ? (
            <ErrorMessage message="Unable to load principles. Please try again later." />
          ) : (
            <div className="grid gap-3">
              {principles.data?.map((p) => (
                <div
                  key={p.id}
                  className="flex gap-3 p-4 rounded-xl bg-muted/40 border border-border/30 hover:border-primary/20 transition-colors"
                >
                  <div className="mt-0.5 shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {resolveIcon(p.icon_name)}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-foreground">{p.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Certifications ── */}
        <div className="mt-6">
          <SectionHeading>
            <CheckCircle className="w-4 h-4 text-primary" />
            Compliance &amp; Standards
          </SectionHeading>

          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Our AI tools are built with strict confidentiality and top-tier security, following
            established healthcare AI ethics and data governance frameworks recognised across the UK
            and internationally.
          </p>

          {certs.isLoading ? (
            <LoadingSpinner />
          ) : certs.isError ? (
            <ErrorMessage message="Unable to load certifications. Please try again later." />
          ) : (
            <div className="grid sm:grid-cols-2 gap-2.5">
              {certs.data?.map((c) => (
                <div
                  key={c.id}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-primary/5 border border-primary/10"
                >
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-medium text-foreground">{c.title}</span>
                    {c.description && (
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                        {c.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── FAQs ── */}
        <div className="mt-6">
          <SectionHeading>
            <Heart className="w-4 h-4 text-primary" />
            Frequently Asked Questions
          </SectionHeading>

          {faqs.isLoading ? (
            <LoadingSpinner />
          ) : faqs.isError ? (
            <ErrorMessage message="Unable to load FAQs. Please try again later." />
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {faqs.data?.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-sm text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>

        {/* ── Clinical disclaimer ── */}
        <div className="mt-6 p-4 rounded-xl bg-accent/40 border border-accent/60">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-accent-foreground/70 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-xs font-medium text-accent-foreground">
                Important Clinical Disclaimer
              </p>
              <p className="text-xs text-accent-foreground/70 leading-relaxed">
                Our AI Assistant is designed to complement — never replace — professional medical advice.
                It does not diagnose conditions, prescribe treatments, or access your medical records.
                If you have concerns about your health, please consult your GP, rheumatologist, or
                call NHS 111 for urgent guidance.
              </p>
            </div>
          </div>
        </div>

        {/* ── Feedback footer ── */}
        <div className="mt-4 pt-4 border-t border-border/20 text-center">
          <p className="text-[11px] text-muted-foreground/60">
            We are committed to continuously improving our AI tools based on user feedback and the
            latest clinical research. If you have concerns about our AI systems, please{" "}
            <a href="/complaints" className="text-primary hover:underline">
              contact us
            </a>.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
});

AITrustSafetyModal.displayName = "AITrustSafetyModal";
export default AITrustSafetyModal;
