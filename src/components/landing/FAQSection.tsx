import { memo } from "react";
import { Helmet } from "react-helmet-async";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";

const faqs = [
  { q: "Is everything really free?", a: "Yes — every guide, exercise video, and bit of help we share is free for you, always. Kind donors and volunteers keep it that way." },
  { q: "Do I need a GP referral to use this?", a: "Not at all. You can start whenever you feel ready. We'd always gently encourage you to keep your GP or specialist in the loop too." },
  { q: "What types of arthritis can you help with?", a: "We cover osteoarthritis, rheumatoid arthritis, and more than a hundred other forms — focusing on the everyday questions people in the UK ask us most." },
  { q: "Can diet really make a difference?", a: "It can. Many people find that gentle, anti-inflammatory eating — the Mediterranean way — helps ease stiffness and pain over time. Small changes, kept up, add up." },
  { q: "Is your help chat the same as seeing a doctor?", a: "No, and we'd never pretend it is. It can answer general questions based on trusted research, but please keep speaking to your GP or specialist for anything personal." },
  { q: "What are the first signs of osteoarthritis?", a: "Usually a dull ache during or after moving, stiffness in the morning that eases within half an hour, swelling, or a feeling of grating. Knees, hips and hands are most often the first to complain." },
  { q: "Can I claim PIP for arthritis in the UK?", a: "If arthritis is making daily life a real struggle, you may qualify for Personal Independence Payment (PIP). Citizens Advice or the DWP can walk you through the application kindly and free." },
  { q: "At what age does arthritis usually start?", a: "Osteoarthritis often shows up after 50, but rheumatoid arthritis can begin much younger — often between 30 and 50. Younger people can be affected too, especially after a joint injury." },
  { q: "Does turmeric actually help with joint pain?", a: "There's good evidence that curcumin (the active part of turmeric) can ease pain for many people. Around 1,000 mg a day, taken with a little black pepper for absorption, is a common starting point. Always check with your GP if you take other medicines." },
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
            <AccordionContent className="text-muted-foreground text-sm leading-[1.9] pb-7">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

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
          <Link to="/blog">
            <Button variant="outline" className="rounded-full h-[54px] px-10 text-sm font-bold tracking-wider border-2 border-primary/15 text-primary hover:bg-primary/[0.03]">
              Read our gentle guides <ArrowRight className="w-4 h-4 ms-2 rtl:rotate-180" />
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
