import { memo } from "react";
import { Helmet } from "react-helmet-async";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";

/** People-Also-Ask style questions, each pointing at a full FAQ guide. */
const faqs = [
  {
    q: "Can I claim PIP for arthritis in the UK?",
    a: "If arthritis makes daily living or walking a real struggle, you may qualify for Personal Independence Payment (PIP). The claim is based on how you function day to day, not on your diagnosis. In Scotland the equivalent is Adult Disability Payment. Citizens Advice or the DWP can walk you through the form for free.",
    moreHref: "/faq/arthritis-disability-benefits-uk",
    moreLabel: "Read the PIP and benefits guide",
  },
  {
    q: "Is arthritis a disability in the UK?",
    a: "It can be. Arthritis counts as a disability under the Equality Act 2010 when it has a substantial, long-term effect on day-to-day activities. That can open the door to workplace adjustments, and it is separate from whether you also qualify for PIP.",
    moreHref: "/faq/is-arthritis-a-disability",
    moreLabel: "Read the disability rights answer",
  },
  {
    q: "What are the best exercises for arthritis?",
    a: "Gentle, regular movement is usually safer than rest. Walking, swimming, cycling and strength work for the muscles around a sore joint are the usual starting points. Our exercise guides are written for UK readers and aligned with NICE osteoarthritis advice.",
    moreHref: "/faq/best-exercises-arthritis",
    moreLabel: "See the exercise FAQ",
  },
  {
    q: "What is osteoarthritis?",
    a: "Osteoarthritis is the most common type of arthritis in the UK. It happens when the cartilage that cushions a joint wears down, so the joint can ache, stiffen and swell — often in the knees, hips, hands or spine. Morning stiffness that eases within about half an hour is a typical early sign.",
    moreHref: "/faq/what-is-osteoarthritis",
    moreLabel: "Read what osteoarthritis is",
  },
  {
    q: "How can I reduce arthritis pain without extra tablets?",
    a: "Pacing, heat or ice, sleep, an anti-inflammatory eating pattern, and a graded exercise plan help many people. Tablets still have a place — this is extra, not a replacement for what your GP has prescribed.",
    moreHref: "/faq/reduce-arthritis-pain-naturally",
    moreLabel: "Read the natural-pain FAQ",
  },
  {
    q: "What are my employment rights with arthritis?",
    a: "The Equality Act 2010 can require your employer to make reasonable adjustments. Access to Work may fund equipment or travel. You do not have to tell an employer before a job offer, but adjustments usually start once they know.",
    moreHref: "/faq/arthritis-employment-rights-uk",
    moreLabel: "Read the work-rights FAQ",
  },
  {
    q: "Is everything on this site really free?",
    a: "Yes. Every guide, exercise page and help-chat answer is free. Donations and volunteers keep it that way. You do not need a GP referral to start reading.",
    moreHref: "/donate",
    moreLabel: "See how donations keep it free",
  },
  {
    q: "Is the help chat the same as seeing a doctor?",
    a: "No, and we would never pretend it is. It can answer general questions from trusted UK sources. Please keep speaking to your GP or specialist about anything personal to you.",
    moreHref: "/editorial-standards",
    moreLabel: "Read our editorial standards",
  },
] as const;

const FAQSection = memo(() => {
  const navigate = useNavigate();
  return (
  <>
    <Helmet>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": "https://livingwitharthritis.org.uk/#homepage-faq",
        url: "https://livingwitharthritis.org.uk/",
        inLanguage: "en-GB",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
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
          <AccordionItem key={faq.q} value={`faq-${i}`} className="bg-card border border-border/8 rounded-2xl px-8 data-[state=open]:shadow-lg transition-all duration-500 data-[state=open]:border-primary/6">
            <AccordionTrigger className="text-start text-[15px] font-semibold hover:no-underline py-7 tracking-tight">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm leading-[1.9] pb-7">
              <p>{faq.a}</p>
              <Link
                to={faq.moreHref}
                className="mt-3 inline-flex items-center gap-1 font-semibold text-primary hover:underline"
              >
                {faq.moreLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-20 text-center space-y-5">
        <p className="text-sm text-muted-foreground tracking-wide">
          Still wondering about something? Browse every in-depth answer, or ask the help chat.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/faq">
            <Button variant="outline" className="rounded-full h-[54px] px-10 text-sm font-bold tracking-wider border-2 border-primary/15 text-primary hover:bg-primary/[0.03]">
              All arthritis FAQs <ArrowRight className="w-4 h-4 ms-2 rtl:rotate-180" />
            </Button>
          </Link>
          <Button
            onClick={() => navigate("/chat")}
            className="rounded-full h-[54px] px-10 btn-primary-cta text-sm font-bold tracking-wider"
          >
            <MessageCircle className="w-4 h-4 me-2" />
            Ask our help chat helper
          </Button>
        </div>
      </div>
    </div>
  </section>
  </>
  );
});

FAQSection.displayName = "FAQSection";
export default FAQSection;
