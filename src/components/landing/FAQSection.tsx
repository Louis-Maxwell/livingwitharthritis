import { memo } from "react";
import { Helmet } from "react-helmet-async";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";

const faqs = [
  {
    q: "Is everything really free?",
    a: "Yes — every guide, exercise video, and bit of help we share is free for you, always. Kind donors and volunteers keep it that way.",
    href: "/faq",
    linkLabel: "Browse all FAQs",
  },
  {
    q: "Do I need a GP referral to use this?",
    a: "Not at all. You can start whenever you feel ready. We'd always gently encourage you to keep your GP or specialist in the loop too.",
    href: "/guides/newly-diagnosed",
    linkLabel: "Newly diagnosed checklist",
  },
  {
    q: "What types of arthritis can you help with?",
    a: "We cover osteoarthritis, rheumatoid arthritis, and more than a hundred other forms — focusing on the everyday questions people in the UK ask us most.",
    href: "/conditions/osteoarthritis",
    linkLabel: "Osteoarthritis guide",
  },
  {
    q: "Can diet really make a difference?",
    a: "It can. Many people find that gentle, anti-inflammatory eating — the Mediterranean way — helps ease stiffness and pain over time. Small changes, kept up, add up. No diet cures arthritis.",
    href: "/diet",
    linkLabel: "Open the diet hub",
  },
  {
    q: "Is your help chat the same as seeing a doctor?",
    a: "No, and we'd never pretend it is. It can answer general questions based on trusted research, but please keep speaking to your GP or specialist for anything personal.",
    href: "/chat",
    linkLabel: "Open the help chat",
  },
  {
    q: "What are the first signs of osteoarthritis?",
    a: "Usually a dull ache during or after moving, stiffness in the morning that eases within half an hour, swelling, or a feeling of grating. Knees, hips and hands are most often the first to complain.",
    href: "/conditions/osteoarthritis",
    linkLabel: "Read the osteoarthritis page",
  },
  {
    q: "Can I claim PIP for arthritis in the UK?",
    a: "If arthritis is making daily life a real struggle, you may qualify for Personal Independence Payment (PIP). Citizens Advice or the DWP can walk you through the application kindly and free.",
    href: "/benefits-pip",
    linkLabel: "Start the PIP hub",
  },
  {
    q: "What can I do while waiting for rheumatology or physiotherapy?",
    a: "Keep gently active, ask about physiotherapy self-referral where your area allows it, and go back to your GP surgery if pain, sleep or function get worse so the referral can be reviewed.",
    href: "/arthritis-waiting-list-help",
    linkLabel: "Waiting-list help",
  },
  {
    q: "What workplace rights do I have with arthritis?",
    a: "Arthritis can be a disability under the Equality Act 2010 when it has a substantial, long-term effect on day-to-day activities. That can trigger reasonable adjustments. Access to Work may fund extra support.",
    href: "/blog/working-with-arthritis-uk-rights",
    linkLabel: "Work rights explainer",
  },
  {
    q: "Does turmeric actually help with joint pain?",
    a: "Some enhanced-absorption curcumin extracts have trial evidence for osteoarthritis pain; kitchen turmeric powder is not the same. It is not a substitute for prescribed care — check with your GP or pharmacist if you take other medicines.",
    href: "/blog/turmeric-for-arthritis",
    linkLabel: "Turmeric evidence",
  },
];

const FAQSection = memo(() => {
  const navigate = useNavigate();
  return (
  <>
    <Helmet>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      })}</script>
    </Helmet>
  <section className="py-24 lg:py-32 bg-background">
    <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-3xl">
      <div className="text-center mb-20">
        <span className="section-label text-primary mb-5 block">Things people often ask us</span>
        <h2 className="text-3xl sm:text-4xl md:text-[3.5rem] font-display font-bold text-foreground mb-6 tracking-tight leading-[1.06]">
          Questions you may be <span className="text-primary italic">wondering about</span>
        </h2>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border/8 rounded-2xl px-8 data-[state=open]:shadow-lg transition-all duration-500 data-[state=open]:border-primary/6">
            <AccordionTrigger className="text-start text-[15px] font-semibold hover:no-underline py-7 tracking-tight">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm leading-[1.9] pb-7">
              <p className="m-0">{faq.a}</p>
              <Link
                to={faq.href}
                className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4 hover:no-underline"
              >
                {faq.linkLabel}
              </Link>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-12 grid sm:grid-cols-2 gap-3 text-start">
        {[
          { href: "/faq/what-is-osteoarthritis", label: "What is osteoarthritis?" },
          { href: "/faq/what-is-rheumatoid-arthritis", label: "What is rheumatoid arthritis?" },
          { href: "/faq/arthritis-and-cold-weather", label: "Why does cold weather worsen arthritis?" },
          { href: "/faq/arthritis-disability-benefits-uk", label: "Can I claim PIP for arthritis?" },
          { href: "/diet", label: "Diet and arthritis" },
          { href: "/chat", label: "Help chat" },
          { href: "/arthritis-waiting-list-help", label: "Waiting-list help" },
          { href: "/blog/working-with-arthritis-uk-rights", label: "Work rights" },
        ].map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="rounded-xl border border-border/60 bg-card px-4 py-3 text-sm font-semibold text-primary hover:border-primary/40 hover:bg-primary/[0.03]"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="mt-20 text-center space-y-5">
        <p className="text-sm text-muted-foreground tracking-wide">
          Still wondering about something? Our help chat is here whenever you need a kind, quick answer.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate("/chat")}
            className="rounded-full h-[54px] px-10 btn-primary-cta text-sm font-bold tracking-wider"
          >
            <MessageCircle className="w-4 h-4 me-2" />
            Ask our help chat helper
          </Button>
          <Link to="/faq">
            <Button variant="outline" className="rounded-full h-[54px] px-10 text-sm font-bold tracking-wider border-2 border-primary/15 text-primary hover:bg-primary/[0.03]">
              Browse all FAQs <ArrowRight className="w-4 h-4 ms-2 rtl:rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
  </>
  );
});

FAQSection.displayName = "FAQSection";
export default FAQSection;
