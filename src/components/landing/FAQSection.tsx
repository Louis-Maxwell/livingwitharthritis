import { memo } from "react";
import { Helmet } from "react-helmet-async";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";

const faqs: { q: string; a: string; href?: string; linkLabel?: string }[] = [
  { q: "Is everything really free?", a: "Yes — every guide, exercise video, and bit of help we share is free for you, always. Kind donors and volunteers keep it that way.", href: "/donate", linkLabel: "Donate to keep it free" },
  { q: "Do I need a GP referral to use this?", a: "Not at all. You can start whenever you feel ready. We'd always gently encourage you to keep your GP or specialist in the loop too." },
  { q: "What types of arthritis can you help with?", a: "We cover osteoarthritis, rheumatoid arthritis, and more than a hundred other forms — focusing on the everyday questions people in the UK ask us most.", href: "/conditions/arthritis", linkLabel: "Browse condition guides" },
  { q: "Can diet really make a difference?", a: "It can. Many people find that gentle, anti-inflammatory eating — the Mediterranean way — helps ease stiffness and pain over time. Small changes, kept up, add up.", href: "/diet", linkLabel: "Read the diet guide" },
  { q: "Is your help chat the same as seeing a doctor?", a: "No, and we'd never pretend it is. It can answer general questions based on trusted research, but please keep speaking to your GP or specialist for anything personal.", href: "/chat", linkLabel: "Open the help chat" },
  { q: "What are the first signs of osteoarthritis?", a: "Usually a dull ache during or after moving, stiffness in the morning that eases within half an hour, swelling, or a feeling of grating. Knees, hips and hands are most often the first to complain.", href: "/conditions/osteoarthritis", linkLabel: "Read the osteoarthritis guide" },
  { q: "Can I claim PIP for arthritis in the UK?", a: "PIP is assessed on how arthritis affects daily living and mobility, not on the diagnosis name. Scotland uses Adult Disability Payment instead of PIP. Citizens Advice can help with the form for free.", href: "/guides/benefits-pip", linkLabel: "PIP and benefits guide" },
  { q: "Can I get a Blue Badge for arthritis?", a: "You may qualify if walking is substantially difficult. Local councils decide using national criteria. Our benefits guide explains how this sits alongside PIP and other support.", href: "/guides/benefits-pip", linkLabel: "Blue Badge and benefits" },
  { q: "What can I do while waiting for rheumatology or physiotherapy?", a: "Keep moving gently, pace yourself, and ask your GP surgery to flag worsening symptoms. Some areas allow physiotherapy self-referral. Go back to your GP if pain, function or sleep get worse.", href: "/arthritis-waiting-list-help", linkLabel: "Waiting-list help" },
  { q: "Does the Equality Act cover arthritis at work?", a: "Often yes, when arthritis has a substantial, long-term effect on day-to-day activities. That can mean reasonable adjustments and, in some cases, Access to Work funding.", href: "/blog/working-with-arthritis-uk-rights", linkLabel: "Work rights guide" },
  { q: "At what age does arthritis usually start?", a: "Osteoarthritis often shows up after 50, but rheumatoid arthritis can begin much younger — often between 30 and 50. Younger people can be affected too, especially after a joint injury." },
  { q: "Does turmeric actually help with joint pain?", a: "Some people find curcumin (from turmeric) helpful for joint pain, but it is not a substitute for prescribed treatment. Check with your GP or pharmacist if you take other medicines — especially blood thinners.", href: "/supplements/turmeric", linkLabel: "Turmeric guide" },
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
            "text": faq.href ? `${faq.a} ${faq.linkLabel}: https://livingwitharthritis.org.uk${faq.href}` : faq.a
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
              {faq.a}
              {faq.href && faq.linkLabel ? (
                <>
                  {" "}
                  <Link to={faq.href} className="text-primary font-semibold underline underline-offset-2">
                    {faq.linkLabel}
                  </Link>
                </>
              ) : null}
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
          { href: "/blog", label: "Read the arthritis blog" },
          { href: "/donate", label: "Donate to keep guides free" },
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
