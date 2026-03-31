import { memo } from "react";
import { Helmet } from "react-helmet-async";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";

const faqs = [
  { q: "Is this service free?", a: "Yes, all our resources including virtual physiotherapy consultations, nutrition guides, and exercise plans are completely free for UK residents." },
  { q: "Do I need a GP referral?", a: "No referral is needed. You can access our resources directly, though we always encourage working alongside your GP or specialist." },
  { q: "What types of arthritis do you cover?", a: "We provide resources for over 100 types of arthritis, with a focus on osteoarthritis and rheumatoid arthritis — the most common forms affecting UK adults." },
  { q: "How does the virtual physiotherapy work?", a: "Book a free consultation through our platform. You'll connect with a registered physiotherapist via video call who'll create a personalised exercise plan." },
  { q: "Can diet really help with arthritis?", a: "Research shows an anti-inflammatory diet, particularly the Mediterranean diet, can reduce pain, stiffness, and inflammation associated with arthritis." },
  { q: "Is the AI assistant a replacement for medical advice?", a: "No. Our AI assistant provides general information and guidance based on published research. Always consult your healthcare professional for personalised medical advice." },
  { q: "What are the early signs of osteoarthritis?", a: "Early signs include joint pain during or after movement, morning stiffness lasting under 30 minutes, tenderness, loss of flexibility, and a grating sensation. Knees, hips and hands are most commonly affected in the UK." },
  { q: "Can I claim PIP for arthritis in the UK?", a: "If arthritis has a substantial, long-term effect on your daily activities, you may be eligible for Personal Independence Payment (PIP). Contact Citizens Advice or the DWP for guidance on applying." },
  { q: "What age does arthritis usually start?", a: "Osteoarthritis is most common after age 50, but rheumatoid arthritis often begins between 30 and 50. Younger people can develop arthritis after injuries or due to autoimmune conditions." },
  { q: "Does turmeric help with joint pain?", a: "Research suggests curcumin (the active compound in turmeric) has anti-inflammatory properties. A systematic review supports around 1,000 mg/day of curcumin extract for arthritis symptom relief. Use with piperine for better absorption." },
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
  <section className="py-14 lg:py-20 bg-tint-violet section-divider">
    <div className="container mx-auto px-6 md:px-10 max-w-3xl">
      <div className="text-center mb-16">
        <span className="section-label text-primary mb-4 block">Common Questions</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
          Frequently <span className="text-primary italic">asked</span>
        </h2>
        <div className="luxury-divider">
          <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
        </div>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i}>
            <AccordionItem value={`faq-${i}`} className="bg-card border border-border/15 rounded-2xl px-7 data-[state=open]:shadow-medium transition-all duration-500 data-[state=open]:border-primary/10">
              <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline py-6">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-[1.8] pb-6">{faq.a}</AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>

      <div className="mt-12 text-center space-y-4 animate-in fade-in duration-500" style={{ animationDelay: "400ms" }}>
        <p className="text-sm text-muted-foreground">
          Still have questions? Our AI assistant can help.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate("/chat")}
            className="rounded-full h-11 px-6 btn-primary-cta text-xs font-bold tracking-wide"
          >
            <MessageCircle className="w-3.5 h-3.5 mr-2" />
            Ask Our AI Assistant
          </Button>
          <Link to="/blog">
            <Button variant="outline" className="rounded-full h-11 px-6 text-xs font-bold tracking-wide border-2 border-primary/20 text-primary hover:bg-primary/5">
              Browse Articles <ArrowRight className="w-3.5 h-3.5 ml-2" />
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
